// 스크롤 진행률 표시
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    document.getElementById('scrollProgress').style.height = scrolled + '%';
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