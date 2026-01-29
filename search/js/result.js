// DOM 요소 선택
const listBox = document.querySelector('.search_list');
const SearchText = document.querySelector('.search_text');
const searchBtn = document.querySelector('.search_btn');

// 초기 데이터 로드 함수
async function createListData() {
    try {
        const data = await fetchTodosData(); // 공통 함수 사용
        renderList(listBox, data); // renderList에 listBox 전달
    } catch (error) {
        console.error('오류 발생:', error.message);
    }
}

// 검색 함수 - 버튼 클릭 시 실행
async function searchFn() {
    const searchQuery = SearchText.value.trim();
    
    // 검색어 유효성 검사
    if (!validateSearchQuery(searchQuery)) {
        return;
    }
    
    try {
        // 공통 API 호출 함수 사용 - response를 한 번만 선언
        const data = await fetchTodosData();
        
        // 검색 필터 함수 사용
        const filteredData = filterTodosByQuery(data, searchQuery);
        
        // 공통 리스트 렌더링 함수 사용
        renderList(listBox, filteredData); // renderList에 listBox 전달
        
    } catch (error) {
        console.error('오류 발생:', error.message);
        alert(error.message);
    }
}

// input에 입력값이 있으면 리스트 비우기
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

// 페이지 로드 시 초기 데이터 표시
createListData();
