window.startHeroTitleAnimation = function startHeroTitleAnimation(prefersReducedMotion) {
    const heroTitleContainer = document.querySelector('.hero-title');
    const mainTitle = document.querySelector('.main-title');
    const consultingTitle = document.querySelector('.consulting-title');
    const heroQuote = document.querySelector('.hero-quote');
    const heroButtons = document.querySelector('.hero-buttons');
    const scrollIndicator = document.querySelector('.scroll-down-indicator');

    if (!heroTitleContainer) {
        return;
    }

    const reveal = (element, delay) => {
        if (!element) {
            return;
        }

        if (prefersReducedMotion) {
            element.classList.add('hero-animate-in');
            return;
        }

        window.setTimeout(() => {
            element.classList.add('hero-animate-in');
        }, delay);
    };

    requestAnimationFrame(() => {
        heroTitleContainer.classList.add('hero-animate-in');
        reveal(mainTitle, 300);
        reveal(consultingTitle, 500);
        reveal(heroQuote, 700);
        reveal(heroButtons, 900);
        reveal(scrollIndicator, 1100);
    });
};
