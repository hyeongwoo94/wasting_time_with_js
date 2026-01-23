// 모달 팝업 자동 표시 기능

// DOM 요소 가져오기
const modalOverlay = document.getElementById('modalOverlay')
const modalCloseBtn = document.getElementById('modalCloseBtn')
const modalConfirmBtn = document.getElementById('modalConfirmBtn')

// 모달 열기 함수
function openModal() {
    modalOverlay.classList.add('show')
    // body 스크롤 방지
    document.body.style.overflow = 'hidden'
}

// 모달 닫기 함수
function closeModal() {
    modalOverlay.classList.remove('show')
    // body 스크롤 복구
    document.body.style.overflow = ''
}

// 닫기 버튼 클릭 이벤트
modalCloseBtn.addEventListener('click', closeModal)

// 확인 버튼 클릭 이벤트
modalConfirmBtn.addEventListener('click', closeModal)

// 오버레이 클릭 시 모달 닫기 (모달 컨테이너 클릭은 제외)
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal()
    }
})

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
        closeModal()
    }
})

// 페이지 로드 후 5초 뒤에 모달 자동 표시
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        openModal()
    }, 5000) // 5초 = 5000밀리초
})
