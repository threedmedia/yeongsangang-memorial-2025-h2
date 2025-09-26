// 사이드바 열기/닫기
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// 바깥 클릭 시 닫기
document.addEventListener('click', function (e) {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.querySelector('.menu-toggle');

    if (sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        !toggleBtn.contains(e.target)) {
        sidebar.classList.remove('open');
    }
});

// 메뉴 항목 클릭 시 닫기 (모바일 UX 개선)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.remove('open');
        }
    });
});

// 스크롤 진행률 표시
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    document.getElementById('scrollProgress').style.height = scrolled + '%';
});

// 네비게이션 활성 상태 관리
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// 부드러운 스크롤
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// DOM 로드 후 햄버거 메뉴 이벤트 바인딩
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // 이벤트 버블링 방지
            toggleSidebar();
        });
    }
});
