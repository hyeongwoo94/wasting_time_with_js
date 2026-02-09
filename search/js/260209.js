const API = 'https://jsonplaceholder.typicode.com/todos';

function getErrorMessage(status){
    switch(status){
        case 404:
            return '데이터오류';
        case 500:
            return '서버오류';
        default:
            return `http오류상태: ${status}`;
    }
}

async function fetchTodosData(){
    const response = await fetch(API);

    if(!response.ok){
        const errorMessage = getErrorMessage(response.status);
        throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
}


function createListItem(title){
    const li = document.createElement('li');
    li.classList.add('_item');
    const p = document.createElement('p');
    p.classList.add('_title');
    p.textContent = title;
    li.appendChild(p);
    return li;
}

function renderList(listBoxElement, data) {
    listBoxElement.innerHTML = ''; // 기존 리스트 비우기
    
    if (data.length === 0) {
        const emptyItem = createListItem('검색 결과가 없습니다.');
        listBoxElement.appendChild(emptyItem);
    } else {
        data.forEach(item => {
            const listItem = createListItem(item.title);
            listBoxElement.appendChild(listItem);
        });
    }
}

function validateSearchQuery(query){
    if (!query || query.trim()=== ''){
        alert('검색어를 입력');
        return false;
    }
    return true;
}

function filterTodosByQuery(data, searchQuery){
    return data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())

    )
}

const listBox = document.querySelector('.search_list');
const SearchText = document.querySelector('.search_text');
const searchBtn = document.querySelector('.search_btn');

async function createListData(){
    try{
        const data = await fetchTodosData();
        renderList(listBox, data);
    } catch(error){
        console.error('오류 발생:', error.message);
    }
}

async function searchFn(){
    const searchQuery = SearchText.value.trim();
    if(!validateSearchQuery(searchQuery)){
        return;
    }
    try{
        const data = await fetchTodosData();
        const filteredData = filterTodosByQuery(data, searchQuery);
        renderList(listBox, filteredData);
    }catch(error){
        console.error('오류발생2');
        alert(error.message);
    }
}

SearchText.addEventListener('input', () => {
    const inputValue = SearchText.value.trim();
    if(inputValue){
        listBox.innerHTML = '';
    }
})

searchBtn.addEventListener('click', searchFn);
SearchText.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'){
        e.preventDefault();
        searchFn();
    }
})
createListData()