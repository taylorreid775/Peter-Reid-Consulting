document.addEventListener('DOMContentLoaded', () => {
    const heroTitleContainer = document.querySelector('.hero-title');
    const mainTitle = document.querySelector('.main-title');
    const consultingTitle = document.querySelector('.consulting-title');
    const heroQuote = document.querySelector('.hero-quote');
    const heroButtons = document.querySelector('.hero-buttons');
    const scrollIndicator = document.querySelector('.scroll-down-indicator');

    // Trigger animations with staggered delay
    requestAnimationFrame(() => {
        // First fade in the background
        heroTitleContainer.style.opacity = '1';

        // Then animate the text elements
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

        // Finally, animate the scroll indicator
        setTimeout(() => {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateY(0)';
        }, 1100);
    });
}); 