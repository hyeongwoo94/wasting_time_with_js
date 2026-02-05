// API URL 상수화
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const list = document.querySelector('.search_list');
const searchInput = document.querySelector('.search_text');
const searchBtn = document.querySelector('.searchBtn');
function 태그생성 (title){
    const li = document.createElement('li');
    const p = document.createElement('p');
    li.classList.add('_item');
    p.classList.add('_title');
    p.textContent = title;
    li.appendChild(p);
    return list.appendChild(li);

}
async function 원본데이터 (){
    const response = await fetch(API_URL);
    
    if(!response.ok){
        throw new Error('api 못받아옴')
    }
    
    const orignalData = await response.json();
    return orignalData
}
function 검색데이터(data, keyword){
    return data.filter(apiItem =>{
        apiItem.title.toLowerCase().includes(keyword.toLowerCase());
    })
}
async function 검색하기(){
    const 검색단어 = searchInput.value.trim();
    const data = await 원본데이터();
    const 검색된데이터 = 검색데이터(data,검색단어)

    return 검색된데이터
}
searchInput.addEventListener('input', ()=>{
    list.innerHTML = '';
    검색하기()
})


원본데이터()