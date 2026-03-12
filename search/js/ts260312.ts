// npx tsc -w를 실행해줘야 컴파일로 js로 변환해준다.
// API 요청 주소
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Todo 타입 정의: API에서 내려오는 객체 형태를 지정해 타입 안정성 확보
interface Todo{
    userId : number;
    id:number;
    title:  string;
    completed: boolean;
}

// HTTP 상태코드에 따라 에러 메시지 문자열 반환 (인자: number, 반환: string)
function getErrorMessage(status:number):string{
    switch (status){
        case 404:
            return '데이터없음';
        case 500:
            return '서버에오류';
        default:
            return `서버오류${status}`
    }
}

// API에서 Todo 목록을 가져오는 비동기 함수. Promise<Todo[]> = 성공 시 Todo 배열 반환
async function fetchTodosData():Promise<Todo[]>{
    const response = await fetch(API_URL);
    if(!response.ok){
        const errorMessage = getErrorMessage(response.status);
        throw new Error(errorMessage);
    }
    const data: Todo[] = await response.json();
    return data;
}

// li 요소 하나를 만들어 반환. 반환 타입이 li이므로 HTMLLIElement
function createListItem(title:string):HTMLLIElement{
    const li = document.createElement('li');
    li.classList.add('_item');
    const p = document.createElement('p');
    p.classList.add('_title');
    p.textContent = title;
    li.appendChild(p);
    return li;
}

// 리스트 컨테이너에 데이터를 렌더링. 반환값 없음이므로 void
// listBoxElement는 ul 등 다양한 요소가 올 수 있어 HTMLElement로 지정
function renderlist(listBoxElement:HTMLElement, data:Todo[]):void{
    listBoxElement.innerHTML = '';
    if(data.length === 0){
        const emptyItem = createListItem('데이터없음');
        listBoxElement.appendChild(emptyItem);
    }else{
        data.forEach((item:Todo) =>{
            const listItem = createListItem(item.title);
            listBoxElement.appendChild(listItem)
        })
    }
}

// DOM 요소 참조. 제네릭으로 반환 타입 지정, !는 null이 아님 단언
const listBox = document.querySelector<HTMLUListElement>('.search_list')!;
const searchInput = document.querySelector<HTMLInputElement>('.search_text')!;
const searchBtn = document.querySelector<HTMLButtonElement>('.search_btn')!;


// 초기 로드 시 전체 Todo 목록을 가져와 화면에 뿌림. 반환값 없음 → Promise<void>
async function createListData() : Promise<void>{
    try{
        const data = await fetchTodosData();
        renderlist(listBox, data);
    }catch(error){
        console.error('오류발생',(error as Error).message)
    }
}


// data 중 title에 keyword가 포함된 항목만 필터링해 새 배열 반환 (대소문자 무시)
function filterTodosByQuery(data:Todo[],searchQuery:string): Todo[]{
    return data.filter((item:Todo) =>{
        return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    })
}
function validataeSearchQuery(query: string): boolean{
    if(!query || query.trim() === ''){
        alert('검색어입력');
        return false;
    }
    return true
}
// 검색어 유효성 검사. 비어 있으면 alert 후 false, 있으면 true 반환
async function searchFn(): Promise<void>{
    const searchQuery = searchInput.value.trim();
    if(!validataeSearchQuery(searchQuery)){
        return;
    }
    try{
        const data = await fetchTodosData();
    }catch(error){
        console.error('오류발생',(error as Error).message);
        alert((error as Error).message);
    }
}

// 검색 버튼/엔터 시 실행. 검색어 검사 → API 조회 → 필터링 → 렌더링. 실패 시 catch에서 alert
searchInput.addEventListener('input', (e: Event)=>{
    const keyEvent = e as KeyboardEvent;
    if(keyEvent.key === 'Enter'){
        keyEvent.preventDefault();
        searchFn()
    }
})
export {}

createListData()