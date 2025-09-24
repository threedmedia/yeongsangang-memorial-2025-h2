// sidebar-header 클릭 시 메인 페이지로 이동
document.getElementById("sidebar-header").addEventListener("click", function () {
    window.location.href = "index.html"; // 메인 페이지 경로
});


// 사이드바 토글 (모바일)
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');

    if (sidebar.classList.contains('open')) {
        setTimeout(() => {
            document.addEventListener('click', closeSidebarOnOutsideClick);
        }, 100);
    } else {
        document.removeEventListener('click', closeSidebarOnOutsideClick);
    }
}

function closeSidebarOnOutsideClick(event) {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');

    if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        sidebar.classList.remove('open');
        document.removeEventListener('click', closeSidebarOnOutsideClick);
    }
}

// 스크롤 진행률 표시
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    document.getElementById('scrollProgress').style.height = scrolled + '%';
});

// 갤러리 필터 기능
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 활성 버튼 변경
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // 아이템 필터링
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// 라이트박스 기능
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');

galleryGrid.addEventListener('click', (e) => {
    const galleryItem = e.target.closest('.gallery-item');
    if (galleryItem) {
        const img = galleryItem.querySelector('img');
        const title = galleryItem.querySelector('.gallery-item-title').textContent;
        const description = galleryItem.querySelector('.gallery-item-description').textContent;

        if (img) {
            lightboxImage.src = img.src;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ESC 키로 라이트박스 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// 라이트박스 배경 클릭으로 닫기
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// 네비게이션 활성 상태 관리
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = link.getAttribute('href').substring(1);

        // 해당 필터 버튼 클릭
        const targetBtn = document.querySelector(`[data-filter="${filter}"]`) || document.querySelector('[data-filter="all"]');
        targetBtn.click();

        // 모바일에서 사이드바 닫기
        if (window.innerWidth <= 768) {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('open');
            document.removeEventListener('click', closeSidebarOnOutsideClick);
        }
    });
});