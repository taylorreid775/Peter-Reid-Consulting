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
        // Don't show topbar if sidebar is open
        if (sidebar.classList.contains('open')) {
            return;
        }
        
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

// Close sidebar when clicking outside
document.addEventListener('click', function(e) {
    if (sidebar.classList.contains('open') && 
        !sidebar.contains(e.target) && 
        !hamburger.contains(e.target)) {
        sidebar.classList.remove('open');
        hamburger.classList.remove('open');
        
        // Handle topbar visibility based on page type
        if (hero) {
            // On index page, respect scroll position
            const scrollThreshold = 50;
            if (window.scrollY <= scrollThreshold) {
                topBar.classList.add('transparent');
                title.classList.add('transparent');
                navLinks.classList.add('transparent');
                hamburger.classList.add('transparent');
            } else {
                topBar.classList.remove('transparent');
                title.classList.remove('transparent');
                navLinks.classList.remove('transparent');
                hamburger.classList.remove('transparent');
            }
        } else {
            // On other pages, always show topbar
            topBar.classList.remove('transparent');
            title.classList.remove('transparent');
            navLinks.classList.remove('transparent');
            hamburger.classList.remove('transparent');
        }
    }
});

// Modal functionality
const modalOverlay = document.querySelector('.modal-overlay');
const modalImg = modalOverlay.querySelector('img');
const closeModal = document.querySelector('.close-modal');

// Add next/prev buttons to modal
let modalPrev = document.createElement('button');
modalPrev.className = 'modal-nav modal-prev';
modalPrev.innerHTML = '&#8592;';
let modalNext = document.createElement('button');
modalNext.className = 'modal-nav modal-next';
modalNext.innerHTML = '&#8594;';
modalOverlay.querySelector('.modal-content').appendChild(modalPrev);
modalOverlay.querySelector('.modal-content').appendChild(modalNext);

// Add acknowledgement box to modal
let modalAcknowledgement = document.createElement('div');
modalAcknowledgement.className = 'modal-acknowledgement';
modalOverlay.querySelector('.modal-content').appendChild(modalAcknowledgement);

// Add click event to all grid images
const gridImages = document.querySelectorAll('.grid-item img');
let currentImgIndex = -1;
let imagesArr = Array.from(gridImages);
let currentGrid = null;

function openModalAtIndex(idx, grid) {
    if (!grid) return;
    imagesArr = Array.from(grid.querySelectorAll('img'));
    if (idx < 0 || idx >= imagesArr.length) return;
    currentImgIndex = idx;
    currentGrid = grid;
    const img = imagesArr[idx];
    // Fade out current image
    modalImg.classList.remove('modal-img-fadein');
    modalImg.classList.add('modal-img-fadeout');
    setTimeout(() => {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalImg.classList.remove('modal-img-fadeout');
        modalImg.classList.add('modal-img-fadein');
        // Set acknowledgement text
        const company = img.getAttribute('data-company');
        const companyUrl = img.getAttribute('data-company-url');
        if (company) {
            if (companyUrl) {
                modalAcknowledgement.innerHTML = `Installed by: <a href="${companyUrl}" target="_blank" rel="noopener noreferrer">${company}</a>`;
            } else {
                modalAcknowledgement.textContent = `Installed by: ${company}`;
            }
            modalAcknowledgement.style.display = 'block';
        } else {
            modalAcknowledgement.textContent = '';
            modalAcknowledgement.style.display = 'none';
        }
    }, 180);
    modalImg.classList.add('modal-img-scaled');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Hide back-to-top
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) backToTopBtn.style.display = 'none';
}

gridImages.forEach((img) => {
    img.addEventListener('click', function(e) {
        e.preventDefault();
        const grid = img.closest('ul.grid');
        const imgsInGrid = Array.from(grid.querySelectorAll('img'));
        const idx = imgsInGrid.indexOf(img);
        openModalAtIndex(idx, grid);
    });
});

function closeModalFunc() {
    modalOverlay.classList.remove('active');
    modalImg.classList.remove('modal-img-scaled', 'modal-img-fadein', 'modal-img-fadeout');
    document.body.style.overflow = '';
    // Show back-to-top
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) backToTopBtn.style.display = '';
}

closeModal.addEventListener('click', function(e) {
    e.preventDefault();
    closeModalFunc();
});

modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModalFunc();
    }
});

document.addEventListener('keydown', function(e) {
    if (!modalOverlay.classList.contains('active')) return;
    if (e.key === 'Escape') {
        closeModalFunc();
    } else if (e.key === 'ArrowLeft') {
        showPrevImg();
    } else if (e.key === 'ArrowRight') {
        showNextImg();
    }
});

function showPrevImg() {
    if (!currentGrid) return;
    imagesArr = Array.from(currentGrid.querySelectorAll('img'));
    if (currentImgIndex > 0) {
        openModalAtIndex(currentImgIndex - 1, currentGrid);
    } else {
        openModalAtIndex(imagesArr.length - 1, currentGrid); // wrap around
    }
}
function showNextImg() {
    if (!currentGrid) return;
    imagesArr = Array.from(currentGrid.querySelectorAll('img'));
    if (currentImgIndex < imagesArr.length - 1) {
        openModalAtIndex(currentImgIndex + 1, currentGrid);
    } else {
        openModalAtIndex(0, currentGrid); // wrap around
    }
}
modalPrev.addEventListener('click', function(e) {
    e.stopPropagation();
    showPrevImg();
});
modalNext.addEventListener('click', function(e) {
    e.stopPropagation();
    showNextImg();
});

// Touch swipe support for mobile
let touchStartX = null;
modalImg.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
    }
});
modalImg.addEventListener('touchend', function(e) {
    if (touchStartX === null) return;
    let touchEndX = e.changedTouches[0].clientX;
    let dx = touchEndX - touchStartX;
    if (Math.abs(dx) > 40) {
        if (dx > 0) {
            showPrevImg();
        } else {
            showNextImg();
        }
    }
    touchStartX = null;
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
        const scrolledDown = window.scrollY > 200;
        const atBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 2);
        if (scrolledDown || atBottom) {
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


