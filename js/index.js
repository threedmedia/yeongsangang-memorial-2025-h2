function showCategory(category) {
            // 메인 페이지 숨기기
            document.getElementById('main-page').style.display = 'none';
            
            // 모든 서브 페이지 숨기기
            const subPages = document.querySelectorAll('.sub-page');
            subPages.forEach(page => page.classList.remove('active'));
            
            // 해당 카테고리 페이지 보이기
            const targetPage = document.getElementById(category + '-page');
            if (targetPage) {
                targetPage.classList.add('active');
            }
            
            // 페이지 최상단으로 스크롤
            window.scrollTo(0, 0);
        }
        
        function showMainPage() {
            // 모든 서브 페이지 숨기기
            const subPages = document.querySelectorAll('.sub-page');
            subPages.forEach(page => page.classList.remove('active'));
            
            // 메인 페이지 보이기
            document.getElementById('main-page').style.display = 'block';
            
            // 페이지 최상단으로 스크롤
            window.scrollTo(0, 0);
        }
        
        // 페이지 로드 시 애니메이션 효과
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.category-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.8s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            });
        });
        
        // 서브 네비게이션 활성화 처리
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('sub-nav-item')) {
                e.preventDefault();
                
                // 같은 네비게이션 그룹에서 active 클래스 제거
                const parentNav = e.target.closest('.sub-nav-list');
                parentNav.querySelectorAll('.sub-nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // 클릭된 항목에 active 클래스 추가
                e.target.classList.add('active');
            }
        });