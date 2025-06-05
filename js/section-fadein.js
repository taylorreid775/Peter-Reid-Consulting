// section-fadein.js
// Simple staggered fade-in for all .section-card elements on page load

document.addEventListener('DOMContentLoaded', function() {
    const sections = Array.from(document.querySelectorAll('.section-card'));
    // Set initial state (no transition)
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'none';
    });
    // Force reflow and then apply transition and animate in
    requestAnimationFrame(() => {
        sections.forEach(section => {
            section.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)';
        });
        sections.forEach((section, i) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, i * 120);
        });
    });
}); 