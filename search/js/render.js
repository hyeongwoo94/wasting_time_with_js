// 리스트 아이템 생성 함수 - 재사용 가능하도록 분리
function createListItem(title) {
    const li = document.createElement('li');
    li.classList.add('_item');
    const p = document.createElement('p');
    p.classList.add('_title');
    p.textContent = title;
    li.appendChild(p);
    return li;
}

// 리스트 렌더링 함수
function renderList(listBoxElement, data) {
    listBoxElement.innerHTML = ''; // 기존 리스트 비우기
    
    if (data.length === 0) {
        const emptyItem = createListItem('검색 결과가 없습니다.');
        listBoxElement.appendChild(emptyItem);
    } else {
        data.forEach(item => {
            const listItem = createListItem(item.title);
            listBoxElement.appendChild(listItem);
        });
    }
}
