const API_URL = 'https://jsonplaceholder.typicode.com/todos';
//비동기함수를 사용하는 이유는 시간이 걸리는 작업을 할때 사용된다.




// 데이터 상태값
function getErrorMsg(status){
    switch (status){
        case 404:
            return '데이터업슴'
        case 500:
            return '서버오류'
        default:
            return `http ${status}`
    }
}


// 데이터 비동기(asyonc)
// 응답 > 응답받기(fetch) > 응답상태확인(!.response.ok) > json로 객체화 > 데이터 반환
// 응답 없을시 에러를 throw해줘야 한다.
async function originalData(){
    const response = await fetch(API_URL)
    if(!response.ok){
        const error = getErrorMsg(response.status)
        throw new Error(error)
    }else{
        const data = await response.json()
        return data
    }
}


//리스트 아이템생성
// 브라우저에 뿌릴 태그 생성 > 클래스 추가 > 텍스트 추가(title) > li안에 p추가 > li 반환
function makeItem(title){
    const li = document.createElement('li');
    const p = document.createElement('p');
    li.classList.add('_item');
    p.classList.add('_title');
    p.textContent = title;
    li.appendChild(p);
    return li
}




//생성한 아이템 렌더링
// 추가할위치 태그인자받기,데이터받기 > 데이터가 없다면 empty를 아이템에 추가후  아이템생성, 반복문으로 아이템타이틀 넣어서 아이템생성
function renderList(listBox, data){
    listBox.innerHTML = ''
    if(data.length === 0){
        const empty = makeItem('검색에 해당하는 데이터 없음');
        listBox.appendChild(empty)
    }else{
        data.forEach((item) => {
            const realItem = makeItem(item.title);
            listBox.appendChild(realItem);
        })
    }
}


// 데이터를 뿌려줄 부모태그 변수로 변환(.search_list)
const listUl = document.querySelector('.search_list');


//기본 데이터 뿌려주기(async)
// 오리지널데이터 렌더링해주기
//async는 비동기함수를 만들때 사용 await를 사용하기 위해
async function putData(){
    try{
        const data = await originalData();
        renderList(listUl, data);
    } catch(error){
        console.error('데이터오류')
    }
}

//실제 입력을 위한 기능
// search_text,search_btn 실제 입력값을 받아오기위한 대상자 변수 처리
const searchText = document.querySelector('.search_text');
const searchBtn = document.querySelector('.search_btn');

// 데이터 배열에서 title에 keyword가 포함된 항목만 반환
// 대소문자 구분을 하지 않기 위해 title과 keyword를 모두 소문자로 변환 후 비교
// 인자는 데이터와 비교할 키워드
//filter 사용시 꼭 return 넣기, toLowerCase, includes
function matchSearch(data, keyword){
    return data.filter((item)=>{
        return item.title.toLowerCase().includes(keyword.toLowerCase())
    })
}


// 키워드 입력없이 겁색했을때 alert 보여주고 이함 수를 호출한 함수의 진행 멈추기
//그래서 반환을 true/false를 해주는 것, 이것을 실행시킨 함수를 멈추기 위해
function putSearchQuery(keyword){
    if(!keyword || keyword.trim() === ''){
        alert('키워드 입력');
        return false;
    }
    return true;
}

// 검색 실행 함수(async)
// input에서 검색어 가져오기 > 검색어 유효성 검사 (없거나 공백이면 중단) > 원본 데이터 가져오기
// > 검색어가 포함된 데이터 필터링 > 필터된 데이터 화면에 렌더링
// 검색어를 입력했는지 확인을 해줘야한다.
async function searchFn(){
    const keyword = searchText.value.trim();
    if(!putSearchQuery(keyword)){
        return
    }else{
        try{
            const data = await originalData();
            const matchData = matchSearch(data, keyword);
            renderList(listUl, matchData);
        } catch(error){
            console.error('검색함수오류',error.message)
        }
    }
}

// 실제 동작 이벤트 넣어주기
// 버튼 클릭시 검색실행함수 실행
searchBtn.addEventListener('click',searchFn);

// 키보드 엔터 눌를 시 검색실행함수 실행
// preventDefault
searchText.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'){
        e.preventDefault();
        searchFn()
    }
})

// 검색어 입력 시 리스트 없애기
searchText.addEventListener('input',()=>{
    const realInput = searchText.value.trim();
    if(realInput){
        listUl.innerHTML = ''
    }
})

putData()