const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// 데이터 받아오기
async function apiData(){
    const response = await fetch(API_URL);
    if(!response){
        const errMesg = 'api에러남'
        throw new Error (errMesg);
    }
    const data = await response.json()
    return data;
}
// 생성 ui
function createListUI(title){
    const li = document.createElement("li");
    li.classList.add('_item');
    const p = document.createElement('p');
    p.classList.add('_title');
    p.textContent = title;
    li.appendChild(p);
    return li;
}
// 렌더 ui
function renderList(listUi ,data){
    listUi.innerHTML = '';
    if(data.length === 0){
        const empty = createListUI('데이터 없음')
        listUi.appendChild(empty);
    }else{
        data.forEach(item =>{
            const liItem = createListUI(item.title);
            listUi.appendChild(liItem);
        })
    }
}
const listBox = document.querySelector('.search_list');
const SearchText = document.querySelector('.search_text');
const SearchBtn = document.querySelector('.search_btn');

async function renderData(){
    try{
        const data = await apiData();
        renderList(listBox,data)
    } catch (error){
        console.error('렌더 에러남')
    }
}
// 검색이 기능의 함수
async function searchFn (){
    const keyword = SearchText.value.trim();
    try{
        const orginalData = await apiData();
        const filterData = orginalData.filter(item => {
            return item.title.toLowerCase().includes(keyword.toLowerCase());
        });
        renderList(listBox, filterData)
    }catch(error){
        console.error('오류 발생:', error.message);
    }
}




// 검색할 이벤트들
SearchText.addEventListener('input', ()=>{
    const searchWord = SearchText.value.trim();
    if(searchWord){
        listBox.innerHTML = ''
    }
})
SearchBtn.addEventListener('click',searchFn);

SearchText.addEventListener('keypress', (e) =>{
    if(e.key === 'Enter'){
        e.preventDefault();
        searchFn();
    }
})

renderData()


// 비동기함수에서 try/catch를 쓰는경우와 안쓰는 경우
// error를 해당 함수에서 처리할때는 try/catch를 사용하고 
// 그냥 던지기만할때는 사용안한다.API_URL

// 항상자기 자신 함수에서 처리하는게 유지보수하기에 더 좋지 않나?

// ==>아니다 상황만다 다른다.

// 위의 apiData는 여러곳에서 호출이 발생한다.
// 근데 apiData에서 에러를 잡아버리면 다른 호출이 난곳에서도 항상 같은 에러처리방식이 나오게 된다.

// 그럼 에러를 던져야만 하는 상황 예시를 보자.
// 로그인
// 결제/송금/저장
// 인증 토큰 만료
// 여러 비동기작업중 하나라도 실패하면 중단해야할때

// hrow는 에러를 알리는 게 아니라
// “여기서 흐름을 멈춰라”는 신호다.