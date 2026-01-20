// 자바스크립트로 투뎁스 메뉴 만들기

const mainMenu = [
    {
        title: '큰메뉴1',
        url: '/menu1',
        subMenu: [
        { title: '작은메뉴1', url: '/menu1/sub1' },
        { title: '작은메뉴2', url: '/menu1/sub2' },
        ],
    },
    {
        title: '큰메뉴2',
        url: '/menu1',
        subMenu: [
        { title: '작은메뉴1', url: '/menu1/sub1' },
        { title: '작은메뉴2', url: '/menu1/sub2' },
        ],
    },
    {
        title: '큰메뉴3',
        url: '/menu1',
        subMenu: [
        { title: '작은메뉴1', url: '/menu1/sub1' },
        { title: '작은메뉴2', url: '/menu1/sub2' },
        ],
    },
    {
        title: '큰메뉴4',
        url: '/menu1',
        subMenu: [
        { title: '작은메뉴1', url: '/menu1/sub1' },
        { title: '작은메뉴2', url: '/menu1/sub2' },
        ],
    },
]

// 메뉴 렌더링 함수
function renderMenu() {
    const dep1 = document.querySelector('.dep_1')
    
    // HTML 문자열을 생성하여 한 번에 삽입
    let menuHTML = ''
    
    // mainMenu 배열을 순회하며 HTML 문자열 생성
    mainMenu.forEach(menu => {
        // 서브메뉴 HTML 생성
        let subMenuHTML = ''
        menu.subMenu.forEach(subMenu => {
            subMenuHTML += `
                <li class="dep_2_item">
                    <a href="${subMenu.url}">${subMenu.title}</a>
                </li>
            `
        })
        
        // 큰 메뉴 HTML 생성
        menuHTML += `
            <li class="dep_1_item">
                <a href="${menu.url}">${menu.title}</a>
                <ul class="dep_2">
                    ${subMenuHTML}
                </ul>
            </li>
        `
    })
    
    // 생성된 HTML을 한 번에 삽입
    dep1.innerHTML = menuHTML
}

// 메뉴 이벤트 처리 함수
function initMenuEvents() {
    const dep1Items = document.querySelectorAll('.dep_1_item')
    
    dep1Items.forEach(item => {
        const dep2 = item.querySelector('.dep_2')
        
        item.addEventListener('mouseenter', () => {
            dep2.style.display = 'flex'
        })
        
        item.addEventListener('mouseleave', () => {
            dep2.style.display = 'none'
        })
    })
}

// 초기화 함수
function init() {
    renderMenu()
    initMenuEvents()
}

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', init)

// 모듈로 export (다른 파일에서 사용할 수 있도록)
export { init, renderMenu, initMenuEvents }
