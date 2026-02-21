const API_URL = 'https://jsonplaceholder.typicode.com/todos';

function getErrorMsg(status) {
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
    const apiResponse = await fetch(API_URL);
    if (!apiResponse.ok) {
        const errorMsg = getErrorMsg(apiResponse.status);
        throw new Error(errorMsg);
    }
    const data = await apiResponse.json();
    return data;
}
// fetch는 네트워크 오류가 없으면 HTTP 에러 상태(404, 500 등)에서도 Response 객체를 반환합니다. response.ok로 성공 여부를 확인해야 합니다.
// 여기서 apiResponse는 Response 객체야.
// 이 객체 안에는 이런 정보들이 들어 있어:
// status → HTTP 상태 코드 (200, 404, 500 등)
// headers
// body
// ok ← 지금 네가 궁금한 것
//response.ok 는 HTTP 요청이 "성공 상태 코드인지"를 boolean으로 알려주는 값이야.
//고로 해석은 응답은 왔지만 성공상태 코드가 아니면 실행해라.

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
        //li 하나 생성하고 그거의 타이틀은 데이터 없음이다.
        const empty = makeItem('데이터없음');
        //ul에 li를 넣어줘야겟지?
        //ul은 listBox에 들어갈 변수가 될것이다. 재사용하기위해서 인자로 둠
        listBox.appendChild(empty);
    } else {
        //데이터가 있다면 forEach반복문으로 반복해서 li를 listBox에 추가
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
        console.log('오류발생, ', error.message);
    }
}
// 데이터와 검색어를 인자로 넣어둠
function matchSearch(data, searchQuery) {
    return data.filter((item) => {
        return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
}

function putSearchQuery(query) {
    if (!query || query.trim() === '') {
        alert('입력후 검색하셈');
        return false;
    }
    return true;
}

const searchText = document.querySelector('.search_text');
const searchBtn = document.querySelector('.search_btn');

async function searchFn() {
    //검색어 변수
    const searchQuery = searchText.value.trim();
    //검색어를 입력안했으면 이 함수를 멈춰라.
    if (!putSearchQuery(searchQuery)) {
        return;
    }
    try {
        const data = await originalData();
        const matchData = matchSearch(data, searchQuery);
        renderList(listUl, matchData);
    } catch (error) {
        console.error('오류발생', error.message);
    }
}
searchText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchFn();
    }
});

searchBtn.addEventListener('click', searchFn);

searchText.addEventListener('input', () => {
    const inputValue = searchText.value.trim();
    if (inputValue) {
        listUl.innerHTML = '';
    }
});
putData();
