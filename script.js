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

    // if (window.scrollY < lastScrollTop && scrollPosition <= lockThreshold) {
    //     window.scrollTo(0, heroTop);
    // }

    // lastScrollTop = window.scrollY <= 0 ? 0 : window.scrollY;

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

// Slideshow functionality
// window.addEventListener('load', function () {
//     hero.classList.add('expanded');

//     const heroImages = document.querySelectorAll('img.hero-image');
//     const indicators = document.querySelectorAll('.indicator');

//     let currentIndex = 0;
//     let slideInterval; // Store the interval ID

//     function updateSlideshow(index) {
//         heroImages.forEach((img, i) => {
//             img.classList.toggle('active', i === index);
//         });

//         indicators.forEach((dot, i) => {
//             dot.classList.toggle('active', i === index);
//         });
//     }

//     // Add click event listeners to dots
//     indicators.forEach((dot, index) => {
//         dot.addEventListener('click', () => {
//             currentIndex = index;
//             updateSlideshow(currentIndex);
//             resetInterval(); // Reset the interval on dot click
//         });
//     });

//     // Function to start the slideshow
//     function startInterval() {
//         slideInterval = setInterval(() => {
//             currentIndex = (currentIndex + 1) % heroImages.length; // Go to the next image
//             updateSlideshow(currentIndex);
//         }, 5000); // Adjust the interval as needed
//     }

//     // Function to reset the interval
//     function resetInterval() {
//         clearInterval(slideInterval); // Clear the existing interval
//         startInterval(); // Start a new interval
//     }

//     // Initialize the slideshow
//     updateSlideshow(currentIndex);
//     startInterval(); // Start the interval when the page loads
// });

window.onload = function () {
    emailjs.init("5FsB_4WIQNIEQOmz5");

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const templateParams = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            emailjs.send('service_4hntcjv', 'template_cp0p4lr', templateParams)
                .then(response => {
                    const responseMessage = document.getElementById("response-message");
                    responseMessage.textContent = "Message sent successfully!";
                    responseMessage.classList.remove("invisible");
                    responseMessage.classList.add("visible");
                    contactForm.reset();

                    // After 3 seconds, fade out the message
                    setTimeout(() => {
                        responseMessage.classList.remove("visible");
                        responseMessage.classList.add("invisible");
                    }, 5000); // 5000ms = 3 seconds
                })
                .catch(error => {
                    const responseMessage = document.getElementById("response-message");
                    console.error("EmailJS Error:", error);
                    responseMessage.textContent = "An error occurred: " + error.text;
                    responseMessage.classList.remove("invisible");
                    responseMessage.classList.add("visible");

                    // After 3 seconds, fade out the message
                    setTimeout(() => {
                        responseMessage.classList.remove("visible");
                        responseMessage.classList.add("invisible");
                    }, 5000); // 5000ms = 5 seconds
                });
        });
    }
};

const sidebarLinks = document.querySelectorAll('.sidebar a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', function () {
        sidebar.classList.remove('open');
        hamburger.classList.remove('open');
    });
});

const radioTabs = document.querySelectorAll('input[name="tab"]');
const allGrids = document.querySelectorAll('.grid');

// Ensure tab1 is checked on page load
document.getElementById('tab1').checked = true;
showGridForTab(0);

function showGridForTab(tabIndex) {
    allGrids.forEach((grid, i) => {
        grid.classList.remove('active', 'visible');
        grid.style.display = 'none';
    });

    const targetGrid = allGrids[tabIndex];
    targetGrid.style.display = 'grid';

    // Force reflow to prep for transition
    void targetGrid.offsetWidth;

    // Then activate
    targetGrid.classList.add('active');

    // Add 'visible' on next tick to trigger the transition
    setTimeout(() => {
        targetGrid.classList.add('visible');
    }, 10); // 10ms is enough
}

radioTabs.forEach((radio, index) => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            showGridForTab(index);
        }
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


