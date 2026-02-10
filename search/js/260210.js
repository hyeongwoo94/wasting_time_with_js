const API_URL = 'https://jsonplaceholder.typicode.com/todos';

function getErrorMessage(status){
    switch(status){
        case 404:
            return '요청한 데이터를 찾을 수 없음';
        case 500:
            return '서버에 오류';
        default:
            return `http상태${status}`
    }
}

async function fetchTodosData(){
    const response = await fetch(API_URL);

    if(!response.ok){
        const errorMessage = getErrorMEsseage(response.status);
        throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
}

function createListItem(title){
    const li = document.createElement("li");
    li.classList.add('_item');
    const p = document.createElement("p");
    p.classList.add('_title')
    p.textContent = title;
    li.appendChild(p);
    return li
}

function renderlist(listBoxElement, data){
    listBoxElement.innerHTML = '';
    if(data.length === 0){
        const emptyItem = createListItem('데이터 없음');
        listBoxElement.appendChild(emptyItem);
    }else{
        data.forEach(item => {
            const listItem = createListItem(item.title);
            listBoxElement.appendChild(listItem);
        })
    }
}
// li 생성 렌더링
const listBox = document.querySelector('.search_list');
// 초기데이터실행
async function createListData(){
    try{
        const data = await fetchTodosData();
        renderlist(listBox, data);
    }catch(error){
        console.error('오류 발생:', error.message);
    }
}
createListData();


function filterTodosByQuery(data, searchQuery){
    return data.filter(item =>{
        return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    })
}

function validateSearchQuery(query){
    if(!query || query.trim() === ''){
        alert('검색어입력');
        return false;
    }
    return true;
}

// DOM 요소 선택
const SearchText = document.querySelector('.search_text');
const searchBtn = document.querySelector('.search_btn');

async function searchFn(){
    const searchQuery = SearchText.value.trim();

    if(!validateSearchQuery(searchQuery)){
        return
    }
    try{
        const data = await fetchTodosData();
        const filteredData = filterTodosByQuery(data, searchQuery);

        renderlist(listBox, filteredData)
    }catch(error){
        console.error('오류발생',error.message);
        alert(error.message);
    }
}
SearchText.addEventListener('input', () => {
    const inputValue = SearchText.value.trim();
    if (inputValue) {
        listBox.innerHTML = ''; // 리스트 아이템 모두 제거
    }
});

// 버튼 클릭 이벤트
searchBtn.addEventListener('click', searchFn);

// Enter 키 입력 시에도 검색 실행
SearchText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchFn();
    }
});



// 1. try / catch는 비동기 전용 문법이 아니다

// try / catch는 원래 동기 함수의 에러 처리 문법

// async/await에서 쓰이는 이유는
// → await가 Promise의 reject를 throw처럼 바꿔주기 때문

// 2. try가 있다고 비동기가 되는 건 아니다

// 비동기를 만드는 건 Promise / async / await

// try / catch는 비동기 여부와 무관

// 역할은 오직 에러를 잡는 것

// 3. if문과 try/catch의 본질적인 차이
// if문

// 값이나 상태를 미리 검사

// 예상 가능한 흐름 제어

// 에러가 나기 전에 분기 처리

// if (!query) return;
// if (data.length === 0) return;

// try / catch

// 실행 중 발생한 실패를 복구

// 네트워크 오류, 런타임 에러, Promise reject 처리

// 에러가 이미 발생한 후에 대응

// try {
//   const data = await fetchData();
// } catch (e) {
//   alert("서버 오류");
// }

// 4. if문은 에러를 “잡지” 못한다

// if는 에러를 발생시키거나 처리하지 않는다

// 에러를 만드는 건 throw

// 에러를 잡는 건 try / catch

// if (!response.ok) {
//   throw new Error("요청 실패"); // 에러 생성
// }

// 5. try/catch가 못 잡는 경우

// setTimeout, 이벤트 콜백 등 실행 흐름이 분리된 비동기

// 이유: try 블록이 이미 종료된 뒤 실행되기 때문

// 6. 핵심 한 줄 요약

// if문은 에러를 방지

// try/catch는 에러에 대응

// await 덕분에 비동기 에러를 동기처럼 catch 가능