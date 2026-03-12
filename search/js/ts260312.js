var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// npx tsc -w를 실행해줘야 컴파일로 js로 변환해준다.
// API 요청 주소
const API_URL = 'https://jsonplaceholder.typicode.com/todos';
// HTTP 상태코드에 따라 에러 메시지 문자열 반환 (인자: number, 반환: string)
function getErrorMessage(status) {
    switch (status) {
        case 404:
            return '데이터없음';
        case 500:
            return '서버에오류';
        default:
            return `서버오류${status}`;
    }
}
// API에서 Todo 목록을 가져오는 비동기 함수. Promise<Todo[]> = 성공 시 Todo 배열 반환
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
// li 요소 하나를 만들어 반환. 반환 타입이 li이므로 HTMLLIElement
function createListItem(title) {
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
function renderlist(listBoxElement, data) {
    listBoxElement.innerHTML = '';
    if (data.length === 0) {
        const emptyItem = createListItem('데이터없음');
        listBoxElement.appendChild(emptyItem);
    }
    else {
        data.forEach((item) => {
            const listItem = createListItem(item.title);
            listBoxElement.appendChild(listItem);
        });
    }
}
// DOM 요소 참조. 제네릭으로 반환 타입 지정, !는 null이 아님 단언
const listBox = document.querySelector('.search_list');
const searchInput = document.querySelector('.search_text');
const searchBtn = document.querySelector('.search_btn');
// 초기 로드 시 전체 Todo 목록을 가져와 화면에 뿌림. 반환값 없음 → Promise<void>
function createListData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fetchTodosData();
            renderlist(listBox, data);
        }
        catch (error) {
            console.error('오류발생', error.message);
        }
    });
}
// data 중 title에 keyword가 포함된 항목만 필터링해 새 배열 반환 (대소문자 무시)
function filterTodosByQuery(data, searchQuery) {
    return data.filter((item) => {
        return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
}
function validataeSearchQuery(query) {
    if (!query || query.trim() === '') {
        alert('검색어입력');
        return false;
    }
    return true;
}
// 검색어 유효성 검사. 비어 있으면 alert 후 false, 있으면 true 반환
function searchFn() {
    return __awaiter(this, void 0, void 0, function* () {
        const searchQuery = searchInput.value.trim();
        if (!validataeSearchQuery(searchQuery)) {
            return;
        }
        try {
            const data = yield fetchTodosData();
        }
        catch (error) {
            console.error('오류발생', error.message);
            alert(error.message);
        }
    });
}
// 검색 버튼/엔터 시 실행. 검색어 검사 → API 조회 → 필터링 → 렌더링. 실패 시 catch에서 alert
searchInput.addEventListener('input', (e) => {
    const keyEvent = e;
    if (keyEvent.key === 'Enter') {
        keyEvent.preventDefault();
        searchFn();
    }
});
createListData();
export {};
