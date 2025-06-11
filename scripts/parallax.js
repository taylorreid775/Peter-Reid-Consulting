document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    let ticking = false;

    function updateParallax() {
        const scrolled = window.scrollY;
        const heroHeight = hero.offsetHeight;
        const baseTransform = 'translateZ(-0.089px) scale(1.2)';

        if (scrolled < heroHeight) {
            const translateY = scrolled * 0.5;
            heroImage.style.transform = `${baseTransform} translateY(${translateY}px)`;
        }

        ticking = false;
    }

    // Initial call to set the correct position on load
    updateParallax();

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}); 