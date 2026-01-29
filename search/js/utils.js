// 검색어 유효성 검사 함수
function validateSearchQuery(query) {
    if (!query || query.trim() === '') {
        alert('검색어를 입력해주세요.');
        return false;
    }
    return true;
}

// 검색 필터 함수 - 검색어로 데이터 필터링
function filterTodosByQuery(data, searchQuery) {
    return data.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
}
