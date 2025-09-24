// 사이드바 토글 (모바일) - 개선된 버전
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');

    // 사이드바가 열렸을 때 배경 클릭으로 닫기
    if (sidebar.classList.contains('open')) {
        setTimeout(() => {
            document.addEventListener('click', closeSidebarOnOutsideClick);
        }, 100);
    } else {
        document.removeEventListener('click', closeSidebarOnOutsideClick);
    }
}

// 사이드바 외부 클릭시 닫기
function closeSidebarOnOutsideClick(event) {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');

    if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        sidebar.classList.remove('open');
        document.removeEventListener('click', closeSidebarOnOutsideClick);
    }
}

// 모바일에서 네비게이션 클릭 시 사이드바 자동 닫기
const navLinksForMobile = document.querySelectorAll('.nav-link');
navLinksForMobile.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('open');
            document.removeEventListener('click', closeSidebarOnOutsideClick);
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