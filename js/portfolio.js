document.addEventListener("DOMContentLoaded", function() {
    const grid = document.querySelector('.grid');
    grid.classList.add("visible");
    const gridItems = document.querySelectorAll('.grid-item');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Optionally, set a staggered delay based on index
                entry.target.style.setProperty('--delay', `${(i % 3) * 0.1 + Math.floor(i / 3) * 0.05}s`);
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1
    });

    gridItems.forEach(item => observer.observe(item));
});