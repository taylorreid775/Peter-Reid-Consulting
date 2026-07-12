document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('page-loader');
    const body = document.body;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isIndexPage = body.classList.contains('index-page');

    if (!loader || !isIndexPage) {
        body.classList.remove('is-loading');
        return;
    }

    const heroImg = document.querySelector('.hero-image img');
    const MIN_LOADER_MS = prefersReducedMotion ? 0 : 500;
    const MAX_LOADER_MS = 8000;
    const loadStartedAt = performance.now();

    function finishLoading() {
        const elapsed = performance.now() - loadStartedAt;
        const remaining = prefersReducedMotion ? 0 : Math.max(0, MIN_LOADER_MS - elapsed);

        window.setTimeout(() => {
            loader.classList.add('page-loader--hidden');
            body.classList.remove('is-loading');
            body.classList.add('is-loaded');

            loader.addEventListener('transitionend', () => {
                loader.remove();
            }, { once: true });

            if (typeof window.startHeroTitleAnimation === 'function') {
                window.startHeroTitleAnimation(prefersReducedMotion);
            }
        }, remaining);
    }

    const heroReady = new Promise((resolve) => {
        if (!heroImg) {
            resolve();
            return;
        }

        if (heroImg.complete && heroImg.naturalWidth !== 0) {
            resolve();
            return;
        }

        heroImg.addEventListener('load', () => resolve(), { once: true });
        heroImg.addEventListener('error', () => resolve(), { once: true });
    });

    const fontsReady = document.fonts && document.fonts.ready
        ? document.fonts.ready.catch(() => undefined)
        : Promise.resolve();

    Promise.race([
        Promise.all([heroReady, fontsReady]),
        new Promise((resolve) => window.setTimeout(resolve, MAX_LOADER_MS))
    ]).then(finishLoading);
});
