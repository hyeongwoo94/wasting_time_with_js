// 1. 전체 api 받아와서 리스트 보여주기
// 1-1 데이터 api 는 api.js에서 fetchTdodsData가 있다.
// 1-2 이 data를 화면에 렌더링 해줄  함수가 필요하다.

function uiListData(실제api타이틀){
    const 생성된li = document.createElement('li');
    생성된li.classList.add('_item');
    const 생성된p = document.createElement('p');
    생성된p.classList.add('_title');
    생성된p.textContent = 실제api타이틀;
    생성된li.appendChild(생성된p);
    return 생성된li
}

//2. 데이터가 들어가 li를 ul에 붙여 보자.
const 생성된li가들어갈곳 = document.querySelector('.search_list');
function renderData(생성된li가들어갈곳, 실제데이터){
    생성된li가들어갈곳.innerHTML = '';
    if(실제데이터.length === 0){
        const 데이터가없을경우의li = uiListData('검색결과 없음');
        생성된li가들어갈곳.appendChild(데이터가없을경우의li);
    }else{
        실제데이터.forEach(데이터하나의객체 => {
            const 데이터가있을경우의li = uiListData(데이터하나의객체.title);
            생성된li가들어갈곳.appendChild(데이터가있을경우의li)
        })
    }
}

async function createlistData(){
    try{
        const 실제데이터 = await fetchTodosData();
        renderData(생성된li가들어갈곳,실제데이터)
    } catch(error){
        console.error('오류',error.message)
    }
}
createlistData()

// 여기까지 데이터 렌더링 성공

// 2. 검색 input에 입력 감지하기
// 2-1 input 타이핑이 들어갈경우 리스트 없애기.
const SearchText = document.querySelector('.search_text');
const searchBtn = document.querySelector('.search_btn');


SearchText.addEventListener('input',()=>{
    const 검색어공백제거 = SearchText.value.trim();
    if(검색어공백제거){
        생성된li가들어갈곳.innerHTML = '';
    }
})

// 엔터를 치거나 버튼을 클릭하면 검색기능 함수를 실행해라.
searchBtn.addEventListener('click',searchFn);
SearchText.addEventListener('keypress',(e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
        searchFn();
    }
});

// 검색 필터 함수 - 검색어로 데이터 필터링
//filter는 true인것을 모두 배열로 내본낸다. 이게 검색된데이터가 된다.
function filterTodosByQuery(원본데이터, 검색어) {
    return 원본데이터.filter(원본데이터의객체하나 => 
        원본데이터의객체하나.title.toLowerCase().includes(검색어.toLowerCase())
    );
}
// 데이터랑 입력값이랑 비교해야지
async function searchFn(){
    const 검색할키워드 = SearchText.value.trim();
    try{
        const 원본데이터 = await fetchTodosData();
        const 검색된데이터 = filterTodosByQuery(원본데이터, 검색할키워드);

        renderData(생성된li가들어갈곳,검색된데이터)
    } catch (error){
        console.error('오류발생', error.message);
        alert(error.message)
    }
}