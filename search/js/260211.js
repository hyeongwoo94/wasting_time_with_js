var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// 이 파일만 단독으로 타입 체크하려면 tsconfig에서 "include": ["260211.ts"] 권장
const API_URL = 'https://jsonplaceholder.typicode.com/todos';
function getErrorMessage(status) {
    switch (status) {
        case 404:
            return '요청한 데이터를 찾을 수 없음';
        case 500:
            return '서버에 오류';
        default:
            return `http상태${status}`;
    }
}
function fetchTodosData() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(API_URL);
        if (!response.ok) {
            const errorMessage = getErrorMessage(response.status);
            throw new Error(errorMessage);
        }
        const data = yield response.json();
        return data;
    });
}
function createListItem(title) {
    const li = document.createElement('li');
    li.classList.add('_item');
    const p = document.createElement('p');
    p.classList.add('_title');
    p.textContent = title;
    li.appendChild(p);
    return li;
}
function renderlist(listBoxElement, data) {
    listBoxElement.innerHTML = '';
    if (data.length === 0) {
        const emptyItem = createListItem('데이터 없음');
        listBoxElement.appendChild(emptyItem);
    }
    else {
        data.forEach((item) => {
            const listItem = createListItem(item.title);
            listBoxElement.appendChild(listItem);
        });
    }
}
const listBox = document.querySelector('.search_list');
const searchInput = document.querySelector('.search_text');
const searchBtn = document.querySelector('.search_btn');
function createListData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fetchTodosData();
            renderlist(listBox, data);
        }
        catch (error) {
            console.error('오류 발생:', error.message);
        }
    });
}
createListData();
function filterTodosByQuery(data, searchQuery) {
    return data.filter((item) => {
        return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
}
function validateSearchQuery(query) {
    if (!query || query.trim() === '') {
        alert('검색어입력');
        return false;
    }
    return true;
}
function searchFn() {
    return __awaiter(this, void 0, void 0, function* () {
        const searchQuery = searchInput.value.trim();
        if (!validateSearchQuery(searchQuery)) {
            return;
        }
        try {
            const data = yield fetchTodosData();
            const filteredData = filterTodosByQuery(data, searchQuery);
            renderlist(listBox, filteredData);
        }
        catch (error) {
            console.error('오류발생', error.message);
            alert(error.message);
        }
    });
}
searchInput.addEventListener('input', () => {
    const inputValue = searchInput.value.trim();
    if (inputValue) {
        listBox.innerHTML = '';
    }
});
searchBtn.addEventListener('click', searchFn);
searchInput.addEventListener('keypress', (e) => {
    const keyEvent = e;
    if (keyEvent.key === 'Enter') {
        keyEvent.preventDefault();
        searchFn();
    }
});
export {};
