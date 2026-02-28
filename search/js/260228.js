const API_URL = 'https://jsonplaceholder.typicode.com/todos';

function getErrormsg(status) {
    switch (status) {
        case 404:
            return '요청데이터없음';
        case 500:
            return '서버오류';
        default:
            return `http상태 ${status}`;
    }
}

async function originalData() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        const errorMsg = getErrormsg(response.status);
        throw new Error(errorMsg);
    }
    const data = await response.json();
    return data;
}
function makeItem(title) {
    const li = document.createElement('li');
    const p = document.createElement('p');
    li.classList.add('_item');
    p.classList.add('_title');
    p.textContent = title;
    li.appendChild(p);
    return li;
}
function renderList(listBox, data) {
    listBox.innerHTML = '';
    if (data.length === 0) {
        const empty = makeItem('데이터없음');
        listBox.appendChild(empty);
    } else {
        data.forEach((item) => {
            const realItem = makeItem(item.title);
            listBox.appendChild(realItem);
        });
    }
}
const listUl = document.querySelector('.search_list');
async function putData() {
    try {
        const data = await originalData();
        renderList(listUl, data);
    } catch (error) {
        console.error('오류발샹', error.message);
    }
}

const searchText = document.querySelector('.search_text');
const searchBtn = document.querySelector('.search_btn');

function matchSearch(data, searchQuery) {
    return data.filter((item) => {
        return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
}
function putSearchQuery(query) {
    if (!query || query.trim() === '') {
        alert('검색어 입력후 검색');
        return false;
    }
    return true;
}
async function searchFn() {
    const searchQuery = searchText.value.trim();
    if (!putSearchQuery(searchQuery)) {
        return;
    } else {
        try {
            const data = await originalData();
            const matchData = matchSearch(data, searchQuery);
            renderList(listUl, matchData);
        } catch (error) {
            console.error('오류발생', error.message);
        }
    }
}

searchBtn.addEventListener('click', searchFn);
searchText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchFn();
    }
});
searchText.addEventListener('input', () => {
    const inputValue = searchText.value.trim();
    if (inputValue) {
        listUl.innerHTML = '';
    }
});
putData();
