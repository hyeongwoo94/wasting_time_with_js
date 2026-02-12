const API_URL = 'https://jsonplaceholder.typicode.com/todos';

interface Todo{
    userId : number;
    id:number;
    title: string;
    completed :boolean;
}

function getErrorMessage(status:number):string{
    switch(status){
        case 404:
            return '데이터없음';
        case 500:
            return '서버에오류';
        default:
            return `서버오류${status}`;
    }
}

async function fetchTodosData(): Promise<Todo[]>{
    const response = await fetch(API_URL); //fetch는 자동으로 정의되어 있음.
    if(!response.ok){
        const errorMessage = getErrorMessage(response.status);
        throw new Error(errorMessage);
    }
    const data: Todo[] = await response.json();
    return data;
}


function createListItem(title:string):HTMLLIElement{
    const li = document.createElement('li');
    li.classList.add('_item');
    const p = document.createElement('p');
    p.classList.add('_title');
    p.textContent = title;
    li.appendChild(p);
    return li;
}

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

const listBox = document.querySelector<HTMLUListElement>('.search_list')!;
const searchInput = document.querySelector<HTMLInputElement>('.search_text')!;
const searchBtn = document.querySelector<HTMLButtonElement>('.search_btn')!;

async function createListData(): Promise<void>{
    try{
        const data = await fetchTodosData();
        renderlist(listBox, data);
    }catch(error){
        console.error('오류발생:',(error as Error).message)
    }
}
createListData();

function filterTodosByQuery(data:Todo[],searchQuery:string): Todo[]{
    return data.filter((item: Todo)=>{
        return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    })
}
function validateSearchQuery(query: string): boolean{
    if(!query || query.trim() === ''){
        alert('검색어입력');
        return false;
    }
    return true;
}

async function searchFn(): Promise<void>{
    const searchQuery= searchInput.value.trim();

    if(!validateSearchQuery(searchQuery)){
        return;
    }
    try{
        const data = await fetchTodosData();
        const filteredData = filterTodosByQuery(data, searchQuery);
        renderlist(listBox, filteredData);
    } catch(error){
        console.error('오류발생',(error as Error).message);
        alert((error as Error).message);
    }
}

searchInput.addEventListener('input', () =>{
    const inputValue = searchInput.value.trim();
    if(inputValue){
        listBox.innerHTML = '';
    }
})
searchBtn.addEventListener('click',searchFn);
searchInput.addEventListener('keypress',(e: Event)=>{
    const keyEvent = e as KeyboardEvent;
    if(keyEvent.key === 'Enter'){
        keyEvent.preventDefault();
        searchFn()
    }
})
// 모듈로 만들어서 같은 폴더의 .js와 변수/함수 이름이 겹치지 않게 함
export {};