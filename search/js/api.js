// API URL 상수화
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// 에러 메시지 생성 함수 - 상태 코드에 따른 에러 메시지 반환
function getErrorMessage(status) {
    switch (status) {
        case 404:
            return '요청한 데이터를 찾을 수 없습니다.';
        case 500:
            return '서버에 오류가 발생했습니다.';
        default:
            return `HTTP 오류! 상태: ${status}`;
    }
}

// 공통 API 호출 함수 - response를 한 번만 선언하여 재사용
async function fetchTodosData() {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
        const errorMessage = getErrorMessage(response.status);
        throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return data;
}
