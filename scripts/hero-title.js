document.addEventListener('DOMContentLoaded', () => {
    const heroTitleContainer = document.querySelector('.hero-title');
    const mainTitle = document.querySelector('.main-title');
    const consultingTitle = document.querySelector('.consulting-title');
    const heroQuote = document.querySelector('.hero-quote');
    const heroButtons = document.querySelector('.hero-buttons');
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    const heroImg = document.querySelector('.hero-image img');

    function startHeroTitleAnimation() {
        requestAnimationFrame(() => {
            heroTitleContainer.style.opacity = '1';

            setTimeout(() => {
                mainTitle.style.opacity = '1';
                mainTitle.style.transform = 'translateY(0)';
            }, 300);

            setTimeout(() => {
                consultingTitle.style.opacity = '1';
                consultingTitle.style.transform = 'translateY(0)';
            }, 500);

            setTimeout(() => {
                heroQuote.style.opacity = '1';
                heroQuote.style.transform = 'translateY(0)';
            }, 700);

            setTimeout(() => {
                heroButtons.style.opacity = '1';
                heroButtons.style.transform = 'translateY(0)';
            }, 900);

            setTimeout(() => {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateY(0)';
            }, 1100);
        });
    }

    if (heroImg) {
        if (heroImg.complete && heroImg.naturalWidth !== 0) {
            // Image already loaded (from cache)
            startHeroTitleAnimation();
        } else {
            // Wait for image to load
            heroImg.addEventListener('load', startHeroTitleAnimation);
        }
    } else {
        // Fallback: if image not found, run animation anyway
        startHeroTitleAnimation();
    }
}); 