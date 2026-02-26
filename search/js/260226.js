const API_URL = 'https://jsonplaceholder.typicode.com/todos';

function getErrormsg(status){
    switch (status){
        case 404:
            return '요청 데이터없음';
        case 500:
            return '서버오류';
        default:
            return `http오류 ${status}`
    }
}

async function originalData(){
    const apiResponse = await fetch(API_URL);
    if(!apiResponse.ok){
        const error = getErrormsg(apiResponse.status)
        throw new Error(error)
    }
    const data = await apiResponse.json()
    return data;
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

function renderList(listBox,data){
    listBox.innerHTML = '';
    if(data.length === 0){
        const empty = makeITem('데이터없음');
        listBox.appendChild(empty);
    }else{
        data.forEach((item)=>{
            data.forEach((item)=>{
                const realItem = makeItem(item.title);
                listBox.appendChild(realItem);
            })
        })
    }
}

const listUl = document.querySelector('.search_list');

async function putData(){
    try{
        const data = await originalData();
        renderList(listUl,data);
    }catch(error){
        console.error('오류발생',error.message);
    }
}

function matchSearch(data, searchQuery){
    return data.filter((item)=> {
        return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    })
}

function putSearchQuery(query){
    if(!query || query.trim() === ''){
        alert('검색어 입력');
        return false
    }
    return true;
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
    } catch(error){
        console.error('오류발생',error.message);
    }
}

searchText.addEventListener('keypress', (e) =>{
    if(e.key === 'Enter'){
        e.preventDefault();
        searchFn();
    }
})


searchBtn.addEventListener('click', searchFn);
searchText.addEventListener('input', ()=>{
    const inputValue = searchText.value.trim();
    if(inputValue){
        listUl.inner = ''
    }
})
putData();