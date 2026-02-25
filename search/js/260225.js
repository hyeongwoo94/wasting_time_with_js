const API_URL = 'https://jsonplaceholder.typicode.com/todos';

function errorMessage(status){
    switch (status){
        case 404:
            return '데이터없음';
        case 500:
            return '서버오류';
        default:
            return `http ${status}`;
    }
}

async function originalData(){
    const response = await fetch(API_URL);
    if(!response.ok){
        const errorMsg = getErrorMsg(response.status);
        throw new Error(errorMsg);
    }
    const data = await response.json();
    return data
}

function makeItem(title){
    const li = document.createElement('li');
    const p = document.createElement('p');
    li.classList.add('_item');
    p.classList.add('_title');
    p.textContent = title;
    li.appendChild(p);
    return li
}

function renderList(a, b){
    a.innerHTML = '';
    if(b.length === 0){
        const empty = makeItem('데이터없음');
        a.appendChild(empty);
    }else{
        b.forEach((item)=>{
            const realItem = makeItem(item.title);
            a.appendChild(realItem);
        })
    }
}

const listUl = document.querySelector('.search_list');

async function putData(){
    try{
        const data = await originalData();
        renderList(listUl,data);
    }catch(error){
        console.log('오류발생', error.message)
    }
}


function matchSearch(a,b){
    return a.filter((item)=>{
        return item.title.toLowerCase().includes(b.toLowerCase());
    })
}

function putSearchQuery(a){
    if(!a || a.trim() === ''){
        alert('입력후 검색');
        return flase
    }
    return(true);
}

const searchText = document.querySelector('.search_text');
const searchBtn = document.querySelector('.search_btn');

async function searchFn(){
    const searchQuery = searchText.value.trim();
    if(!putSearchQuery(searchQuery)){
        return
    }
    try{
        const data = await originalData();
        const matchData = matchSearch(data, searchQuery);
        renderList(listUl, matchData);
    }catch(error){
        console.log('오류발생',error.message);
    }
}
searchText.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'){
        e.preventDefault();
        searchFn();
    }
})

searchBtn.addEventListener('click', searchFn);
searchText.addEventListener('input', ()=>{
    const inputValue = searchText.value.trim();
    if(inputValue){
        listUl.innerHTML = ''
    }
})
putData();