// ============================================
// 연습용 파일 - 여기에 함수들을 작성하세요
// ============================================

// ============================================
// render.js 연습 공간
// ============================================
// createListItem(title) 함수를 작성하세요
// - title을 받아서 li 요소를 생성하고 반환
// - li 요소는 '_item' 클래스를 가져야 함
// - li 안에 p 요소를 넣고, p는 '_title' 클래스를 가져야 함
// - p의 textContent는 title이어야 함

function createListItem(title) {
    // 여기에 코드를 작성하세요
}

// renderList(listBoxElement, data) 함수를 작성하세요
// - listBoxElement는 ul 요소
// - data는 배열 (각 항목은 { title: '...' } 형태)
// - data가 빈 배열이면 '검색 결과가 없습니다.' 메시지 표시
// - 기존 내용을 지우고 새로 렌더링해야 함

function renderList(listBoxElement, data) {
    // 여기에 코드를 작성하세요
}

// ============================================
// utils.js 연습 공간
// ============================================
// validateSearchQuery(query) 함수를 작성하세요
// - query가 빈 문자열이거나 공백만 있으면 alert('검색어를 입력해주세요.') 호출 후 false 반환
// - 유효한 검색어면 true 반환

function validateSearchQuery(query) {
    // 여기에 코드를 작성하세요
}

// filterTodosByQuery(data, searchQuery) 함수를 작성하세요
// - data 배열에서 searchQuery와 일치하는 항목만 필터링
// - 대소문자 구분 없이 검색 (부분 일치도 가능)
// - 각 항목은 { title: '...' } 형태

function filterTodosByQuery(data, searchQuery) {
    // 여기에 코드를 작성하세요
}

// ============================================
// result.js 연습 공간
// ============================================
// createListData() 함수를 작성하세요
// - fetchTodosData()를 사용하여 데이터를 가져옴
// - 가져온 데이터를 renderList()를 사용하여 화면에 표시
// - 에러 발생 시 console.error로 에러 메시지 출력
// - 비동기 함수(async/await)로 작성

async function createListData() {
    // 여기에 코드를 작성하세요
}

// searchFn() 함수를 작성하세요
// - SearchText.value.trim()으로 검색어 가져오기
// - validateSearchQuery()로 검색어 유효성 검사
// - 유효하지 않으면 함수 종료
// - fetchTodosData()로 데이터 가져오기
// - filterTodosByQuery()로 검색어에 맞는 데이터 필터링
// - renderList()로 필터링된 데이터 화면에 표시
// - 에러 발생 시 console.error와 alert로 에러 메시지 표시
// - 비동기 함수(async/await)로 작성

async function searchFn() {
    // 여기에 코드를 작성하세요
}
