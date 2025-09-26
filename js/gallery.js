// js/gallery.js
(() => {
    // -----------------------------
    // 요소 캐싱
    // -----------------------------
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDescription');
    const closeBtn = document.querySelector('.lightbox-close');
    const scrollBar = document.getElementById('scrollProgress');

    let lastFocused = null;     // 접근성: 라이트박스 닫은 후 포커스 복귀용
    let currentIdx = -1;       // 선택 이미지 인덱스
    let galleryImgs = [];       // 갤러리 내 <img> 목록

    // -----------------------------
    // 유틸
    // -----------------------------
    const qsAll = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    // 구글 드라이브 썸네일이면 더 큰 사이즈로 시도
    function getBestSrc(src) {
        try {
            const url = new URL(src);
            if (url.hostname.includes('drive.google.com') && url.pathname.includes('/thumbnail')) {
                // 기존 sz 값을 크게 교체
                url.searchParams.set('sz', 'w4000');
                return url.toString();
            }
        } catch (_) { }
        return src;
    }

    // -----------------------------
    // 라이트박스 열기/닫기
    // -----------------------------
    window.openModal = function (imgEl) {
        if (!imgEl) return;

        // 갤러리 이미지 목록 갱신 및 현재 인덱스 파악
        galleryImgs = qsAll('#gallery-container .gallery-page img');
        currentIdx = Math.max(0, galleryImgs.indexOf(imgEl));

        lastFocused = document.activeElement;

        const src = getBestSrc(imgEl.getAttribute('src'));
        const alt = imgEl.getAttribute('alt') || '';

        lightboxImage.src = src;
        lightboxImage.alt = alt;
        lightboxTitle.textContent = alt;
        lightboxDesc.textContent = ''; // 필요 시 설명 채워 넣기

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        // ARIA 보강
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('role', 'dialog');

        // 닫기 버튼 포커스
        setTimeout(() => closeBtn?.focus(), 0);
    };

    window.closeLightbox = function () {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxImage.src = '';
        lightbox.removeAttribute('aria-modal');
        lightbox.removeAttribute('role');

        if (lastFocused && typeof lastFocused.focus === 'function') {
            lastFocused.focus();
        }
    };

    // -----------------------------
    // 이벤트 바인딩
    // -----------------------------
    document.addEventListener('DOMContentLoaded', () => {
        // 1) 위임 클릭: .image-card 클릭 시 내부 img로 openModal
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.image-card');
            if (card) {
                const img = card.querySelector('img');
                if (img) openModal(img);
            }
        });

        // 2) 닫기 버튼
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeLightbox());
        }

        // 3) 오버레이 클릭 닫기
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // 4) 키보드: ESC 닫기, 좌우 화살표 이동(옵션)
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') {
                e.preventDefault();
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                // 다음 이미지 (옵션)
                if (galleryImgs.length > 0) {
                    currentIdx = (currentIdx + 1) % galleryImgs.length;
                    openModal(galleryImgs[currentIdx]);
                }
            } else if (e.key === 'ArrowLeft') {
                // 이전 이미지 (옵션)
                if (galleryImgs.length > 0) {
                    currentIdx = (currentIdx - 1 + galleryImgs.length) % galleryImgs.length;
                    openModal(galleryImgs[currentIdx]);
                }
            }
        });

        // 5) 이미지 로딩 실패 대비
        lightboxImage.addEventListener('error', () => {
            lightboxDesc.textContent = '이미지를 불러오지 못했습니다.';
        });

        // -----------------------------
        // 스크롤 인디케이터
        // -----------------------------
        let ticking = false;
        function onScroll() {
            if (!scrollBar) return;

            const docEl = document.documentElement;
            const scrollTop = window.scrollY || docEl.scrollTop;
            const maxScroll = (docEl.scrollHeight - window.innerHeight);
            const ratio = maxScroll > 0 ? (scrollTop / maxScroll) : 0;
            const percent = Math.min(100, Math.max(0, ratio * 100));

            scrollBar.style.height = percent + '%';
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    onScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // 초기값
        onScroll();
    });
})();
