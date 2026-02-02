// 리스트 추가시 ui 생성
function createListItem(title){
    const li = document.createElement('li');
    li.classList.add('_item');
    const p = document.createElement('p');
    p.classList.add('_title');
    p.textContent = title;
    li.appendChild(p);
    return p
}
//리스트 렌더링 함수
function renderList(listBoxElement, data){
    listBoxElement.innerHTML = '';

    // 데이터가 없을때 listBoxEleemnt에 emptyitem를 추가
    if(data.length === 0){
        const emptyItem = createListItem('검색결과 없음');
        listBoxElement.appendChild(emptyItem);
        
    // 데이터가 있을때 위에 ui 생성 함수를 추가.하고 데이터의 title를 넣어줌
    }else{
        data.forEach(item => {
            const listItem = createListItem(item.title);
            listBoxElement.appendChild(listItem);
        })
    }
}

// DOM 요소 선택
const listBox = document.querySelector('.search_list');
const SearchText = document.querySelector('.search_text');
const SearchBtn = document.querySelector('.search_btn');

// 초기 데이터 렌더링
async function createListData(){
    try{
        const data = await fetchTodosData();
        renderList(listBox, data);
    }catch(error){
        console.error('오류발생', error.message);
    }
}

// 검기능 함수
function filterTodosByQuery(data, searchQuery) {
    return data.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
}
// 버튼 기능 함수
async function searchFn(){
    const searchQuery = SearchText.value.trim();
    try{
        const data = await fetchTodosData(); //기본 데이터
        const filteredData = filterTodosByQuery(data, searchQuery); //검색해서 나온 데이터
        renderList(listBox, filteredData); //검색해서 나온데이터 화면에 렌더링
    }catch(error){
        console.error('오류 발생:', error.message);
        alert(error.message);
    }
}
//검색어작성시 기존의 리스트 비우기
SearchText.addEventListener('input', ()=>{
    const inputText = SearchText.value.trim();
    if(inputText){
        listBox.innerHTML='';
    }
})
SearchBtn.addEventListener('click',searchFn);
// key에는 enter말고 다른 key들도 있기때문에 enter를 지정해주기 위해서 e를 작성해준 것이ㄷ다.
SearchText.addEventListener('keypress',(e)=>{
    if (e.key === 'Enter') {
        e.preventDefault();
        searchFn();
    }
})
createListData();


//e를 넣을지 뺄지 구분하는 법
// 이벤트에 대해 “궁금한 게 있으면” e가 필요하고, “궁금한 게 없으면” e는 안 써도 된다.
// ex) e 필요함 - e.target 사용
// addEventListener('click', (e) => {
//     console.log('클릭된 요소:', e.target);
// });


