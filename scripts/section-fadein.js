// section-fadein.js
// Simple staggered fade-in for all .section-card elements on page load

let isInitialized = false;

function initializeSectionFadeIn() {
    if (isInitialized) return;
    
    const sections = Array.from(document.querySelectorAll('.section-card'));
    if (sections.length === 0) return;

    // Set initial state (no transition)
    sections.forEach(section => {
        // Only set initial state if not already visible
        if (section.style.opacity !== '1') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(40px)';
            section.style.transition = 'none';
        }
    });

    // Force reflow and then apply transition and animate in
    requestAnimationFrame(() => {
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

    isInitialized = true;
}

// Watch for dynamically added sections
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            const hasNewSections = Array.from(mutation.addedNodes).some(node => {
                if (node.nodeType === 1) { // Element node
                    return node.classList?.contains('section-card') || 
                           node.querySelector?.('.section-card');
                }
                return false;
            });
            
            if (hasNewSections) {
                initializeSectionFadeIn();
            }
        }
    });
});

// Start observing the document with the configured parameters
observer.observe(document.body, { 
    childList: true, 
    subtree: true 
});

// Try to initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSectionFadeIn);
} else {
    initializeSectionFadeIn();
}

// Backup initialization in case the above fails
window.addEventListener('load', function() {
    const sections = document.querySelectorAll('.section-card');
    if (sections.length > 0 && !isInitialized) {
        initializeSectionFadeIn();
    }
}); 