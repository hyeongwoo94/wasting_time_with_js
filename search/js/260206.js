// API URL 상수화
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

function getErrorMessage(상태){
    switch(상태){
        case 404:
            return '데이터 못찾음';
        case 500:
            return '서버오류';
        default:
            return `http 오류:${상태}`;
    }
}

async function api가져오기(){
    const 자료 = await fetch(API_URL);
    if(!자료.ok){
        const 에러메시지 = getErrorMessage(자료.status);
        throw new Error(에러메시지);
    }

    const 데이터 = await 자료.json();
    return 데이터
}


const listBox = document.querySelector('.search_list');
const SearchText = document.querySelector('.search_text');
const searchBtn = document.querySelector('.search_btn');

function 생성태그(title){
    const li = document.createElement('li');
    const p = document.createElement('p');
    li.classList.add('_item');
    p.classList.add('_title');
    p.textContent = title;
    li.appendChild(p);
    return li;
}

function 렌더링태그(추가할곳, data){
    추가할곳.innerHTML = '';

    if(data.length === 0){
        const emptyItem = 생성태그('검색결과 없음');
        추가할곳.appendChild(emptyItem)
    }else{
        data.forEach(item =>{
            const listItem = 생성태그(item.title)
            추가할곳.appendChild(listItem)
        })
    }
}


function 유효성검사(검색어){
    if(!검색어 || 검색어.trim() === ''){
        alert('검색어 입력해');
        return false;
    }
    return true
}

function 검색된데이터 (data, searchQuery){
    return data.filter(item =>{
        return item.title.toLowerCase().includes(searchQuery.toLowerCase())
    })
}
async function 데이터렌더링(){
    try{
        const data = await api가져오기();
        렌더링태그(listBox, data);
    }catch(error){
        console.log('데이터렌더링 실패')
    }
}
async function 검색기능(){
    const 검색키워드 = SearchText.value.trim();

    if(!유효성검사(검색키워드)){
        return;
    }
    try{
        const 원본데이터 = await api가져오기();
        const 필터링된데이터 = 검색된데이터(원본데이터, 검색키워드);
        렌더링태그(listBox, 필터링된데이터)
    }catch(error){
        console.log('검색기능오류')
    }
}
SearchText.addEventListener('input', () => {
    const 검색어 = SearchText.value.trim();
    if(검색어){
        listBox.innerHTML = '';
    }
})
searchBtn.addEventListener('click',검색기능);
SearchText.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
        검색기능();
    }
})
데이터렌더링()