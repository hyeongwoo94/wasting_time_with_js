const API_URL = 'https://jsonplaceholder.typicode.com/todos';

function getError(status){
    switch(status){
        case 404:
            return '요청 데이터 없음';
        case 500:
            return '서버오류';
        default:
            return `상태${status}`
    }
}

async function fetchTodosData(){
    const response = await fetch(API_URL);

    if(!response.ok){
        const errorMsg = getError(response.status);
        throw new ErrorEvent(errorMsg);
    }
    const data = await response.json();
    return data;
}

function createListItem(title){
    const li = document.createElement('li');
    li.classList.add('_item');
    const p = document.createElement('p');
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
        data.forEach(item =>{
            const listItem = createListItem(item.title);
            listBoxElement.appendChild(listItem);
        })
    }
}

const listBox = document.querySelector('.search_list');
async function createListData(){
    try{
        const data = await fetchTodosData();
        renderlist(listBox, data);
    }catch(error){
        console.error('오류발생', error.message)
    }
}


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

        renderlist(listBox,filteredData);
    }catch(error){
        console.error('오류발생', error.message);
    }
}

SearchText.addEventListener('input', () => {
    const inputValue = SearchText.value.trim();
    if(inputValue){
        listBox.innerHTML = '';
    }
})

searchBtn.addEventListener('click',searchFn);

SearchText.addEventListener('keypress',(e)=> {
    if(e.key === 'Enter'){
        e.preventDefault();
        searchFn();
    }
})

createListData();