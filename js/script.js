const hamburger = document.getElementById('hamburger-menu');
const sidebar = document.querySelector('.sidebar');

hamburger.addEventListener('click', function () {
    sidebar.classList.toggle('open');  // Toggle visibility of the sidebar
    hamburger.classList.toggle('open'); // Animate the hamburger icon
    topBar.classList.toggle('transparent');
    title.classList.toggle('transparent');
    navLinks.classList.toggle('transparent');
});

let lastScrollTop = 0; // Keeps track of the last scroll position
const hero = document.querySelector('.hero');
const topBar = document.querySelector(".top-bar");
const title = document.querySelector(".nav-title");
const navLinks = document.querySelector(".top-bar nav");

window.addEventListener("scroll", function () {
    const heroHeight = hero.offsetHeight;
    const heroTop = hero.offsetTop;
    const scrollPosition = window.scrollY + window.innerHeight;
    const bottomOfImage = hero.offsetTop + heroHeight;
    const scrollThreshold = 50;
    const lockThreshold = heroTop + heroHeight + 250;

    // Batch DOM updates by using requestAnimationFrame
    requestAnimationFrame(() => {
        if (window.scrollY > scrollThreshold) {
            topBar.classList.remove("transparent");
            title.classList.remove("transparent");
            navLinks.classList.remove("transparent");
            hamburger.classList.remove("transparent");
        } else {
            topBar.classList.add("transparent");
            title.classList.add("transparent");
            navLinks.classList.add("transparent");
            hamburger.classList.add("transparent");
            hero.classList.add('expanded');
        }
    });
});


// Sidebar
const sidebarLinks = document.querySelectorAll('.sidebar a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', function () {
        sidebar.classList.remove('open');
        hamburger.classList.remove('open');
    });
});

// Modal functionality
const modalOverlay = document.querySelector('.modal-overlay');
const modalImg = modalOverlay.querySelector('img');
const closeModal = document.querySelector('.close-modal');

console.log('Modal elements:', { modalOverlay, modalImg, closeModal }); // Debug log

// Add click event to all grid images
const gridImages = document.querySelectorAll('.grid-item img');
console.log('Found grid images:', gridImages.length); // Debug log

gridImages.forEach(img => {
    img.addEventListener('click', function(e) {
        console.log('Image clicked:', this.src); // Debug log
        e.preventDefault();
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        modalImg.classList.add('modal-img-scaled'); // Add scale-up class
        console.log('Before adding active class'); // Debug log
        modalOverlay.classList.add('active');
        console.log('After adding active class, current classes:', modalOverlay.classList); // Debug log
        document.body.style.overflow = 'hidden';
    });
});

// Close modal when clicking the X or overlay
closeModal.addEventListener('click', function(e) {
    console.log('Close button clicked'); // Debug log
    e.preventDefault();
    modalOverlay.classList.remove('active');
    modalImg.classList.remove('modal-img-scaled'); // Remove scale-up class
    document.body.style.overflow = '';
});

modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        console.log('Overlay clicked'); // Debug log
        modalOverlay.classList.remove('active');
        modalImg.classList.remove('modal-img-scaled'); // Remove scale-up class
        document.body.style.overflow = '';
    }
});

// Close modal when pressing Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        console.log('Escape key pressed'); // Debug log
        modalOverlay.classList.remove('active');
        modalImg.classList.remove('modal-img-scaled'); // Remove scale-up class
        document.body.style.overflow = '';
    }
});

// Add scroll down chevron functionality
const chevron = document.querySelector('.chevron');
if (chevron) {
    chevron.addEventListener('click', () => {
        const introLead = document.querySelector('.intro-lead-block');
        if (introLead) {
            const offset = 90; // Height of fixed header or desired space
            const elementTop = introLead.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementTop - offset,
                behavior: 'smooth'
            });
        }
    });
}

// Make Learn More button scroll to the same section
const learnMoreBtn = document.querySelector('.hero-btn[href="#first-section"]');
if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const introLead = document.querySelector('.intro-lead-block');
        if (introLead) {
            const offset = 90; // Height of fixed header or desired space
            const elementTop = introLead.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementTop - offset,
                behavior: 'smooth'
            });
        }
    });
}

// Back to Top Button functionality
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Section scroll-in animation for all pages
(function() {
    const sections = Array.from(document.querySelectorAll('.section-card')).filter(
        el => !el.closest('.grid') // Exclude grid items
    );
    sections.forEach(section => {
        section.classList.add('section-hidden');
    });
    const observer = new window.IntersectionObserver((entries, observer) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger based on index in the NodeList
                entry.target.style.setProperty('--section-delay', `${i * 0.12}s`);
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    sections.forEach(section => observer.observe(section));
})();


