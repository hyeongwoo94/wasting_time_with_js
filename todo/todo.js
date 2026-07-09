document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 가져오기
    const form = document.querySelector('.todo-form');
    const input = document.querySelector('.todo-input');
    const ul = document.querySelector('.todo-list');

    // 할 일 데이터를 배열로 관리 (객체 형태: { id, text, done })
    let todos = [];

    // 화면에 할 일 목록을 그리는 함수
    function renderTodos() {
        // 배열을 map으로 돌면서 각 할 일에 맞는 HTML 문자열 생성
        const html = todos
            .map((todo) => {
                return `
                    <li class="todo-item" data-id="${todo.id}">
                        <p>${todo.text}</p>
                        <button type="button" class="todo-done-button">완료</button>
                    </li>
                `;
            })
            .join(''); // join('')으로 문자열들을 하나로 합침

        // ul 안의 내용을 한 번에 교체
        ul.innerHTML = html;
    }

    // 완료 버튼 클릭 시 해당 할 일 삭제 (이벤트 위임)
    // ul에 한 번만 등록해두면, 나중에 추가되는 li에도 동작함
    ul.addEventListener('click', (e) => {
        const doneButton = e.target.closest('.todo-done-button');
        if (!doneButton) return;

        // 클릭한 버튼이 속한 li의 data-id로 어떤 할 일인지 찾기
        const li = doneButton.closest('.todo-item');
        const id = Number(li.dataset.id);

        // 해당 id를 제외한 배열로 갱신 (= 삭제)
        todos = todos.filter((todo) => todo.id !== id);

        renderTodos();
    });

    // 폼 제출(추가 버튼 클릭) 시 실행
    form.addEventListener('submit', (e) => {
        // form 기본 동작(페이지 새로고침) 막기
        e.preventDefault();

        const text = input.value.trim();

        // 빈 값이면 추가하지 않음
        if (!text) return;

        // 새 할 일 객체를 배열에 추가
        todos.push({
            id: Date.now(), // 고유 id (나중에 삭제/완료 처리에 사용)
            text,
            done: false,
        });

        // 배열이 바뀌었으니 화면 다시 그리기
        renderTodos();

        // 입력창 비우기
        input.value = '';
        input.focus();
    });

    // 처음 로드 시 목록 렌더링 (빈 배열이면 ul도 비어 있음)
    renderTodos();
});
