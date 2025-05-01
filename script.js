const hamburger = document.getElementById('hamburger-menu');
const sidebar = document.querySelector('.sidebar');

hamburger.addEventListener('click', function () {
    sidebar.classList.toggle('open');  // Toggle visibility of the sidebar
    hamburger.classList.toggle('open'); // Animate the hamburger icon
});

let lastScrollTop = 0; // Keeps track of the last scroll position
const hero = document.querySelector('.hero');

window.addEventListener("scroll", function () {
    const topBar = document.querySelector(".top-bar");
    const title = document.querySelector(".nav-title");

    const heroHeight = hero.offsetHeight; // Height of the hero image
    const heroTop = hero.offsetTop; // Top position of the hero image

    const scrollPosition = window.scrollY + window.innerHeight; // Current scroll position
    const bottomOfImage = hero.offsetTop + heroHeight; // Bottom position of the hero section

    const scrollThreshold = 50; // Trigger sliding earlier when scrolled 50px down
    const lockThreshold = heroTop + heroHeight + 250; // Near the bottom of the hero image (adjustable threshold)

    // Only trigger lock when scrolling up and near the bottom of the hero section
    if (window.scrollY < lastScrollTop && scrollPosition <= lockThreshold) {
        // Lock to the top of the hero section if conditions are met
        window.scrollTo(0, heroTop);
    }

    // Update last scroll position
    lastScrollTop = window.scrollY <= 0 ? 0 : window.scrollY;

    // Handle the header and title shrink on scroll
    if (window.scrollY > scrollThreshold) {
        topBar.classList.remove("transparent");
        title.classList.remove("transparent");
    } else {
        topBar.classList.add("transparent");
        title.classList.add("transparent");
        hero.classList.add('expanded'); // Slide back in the hero content
    }
});

// Slideshow functionality
window.addEventListener('load', function () {
    hero.classList.add('expanded');

    const heroImages = document.querySelectorAll('img.hero-image');
    const indicators = document.querySelectorAll('.indicator');

    let currentIndex = 0;
    let slideInterval; // Store the interval ID

    function updateSlideshow(index) {
        heroImages.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });

        indicators.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Add click event listeners to dots
    indicators.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlideshow(currentIndex);
            resetInterval(); // Reset the interval on dot click
        });
    });

    // Function to start the slideshow
    function startInterval() {
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % heroImages.length; // Go to the next image
            updateSlideshow(currentIndex);
        }, 5000); // Adjust the interval as needed
    }

    // Function to reset the interval
    function resetInterval() {
        clearInterval(slideInterval); // Clear the existing interval
        startInterval(); // Start a new interval
    }

    // Initialize the slideshow
    updateSlideshow(currentIndex);
    startInterval(); // Start the interval when the page loads
});

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
let masonryInstances = {};

// Initialize Masonry for each grid
function initializeMasonry(grid, index) {
    const gutter = 10;

    masonryInstances[index] = new Masonry(grid, {
        itemSelector: '.grid-item',
        gutter: gutter,
        transitionDuration: 0, // Remove transition to prevent bouncing
        fitWidth: true
    });
}

allGrids.forEach((grid, index) => {
    // Make grid temporarily visible for initial layout
    const wasHidden = grid.style.display === 'none';
    if (wasHidden) {
        grid.style.visibility = 'hidden';
        grid.style.display = 'block';
    }

    initializeMasonry(grid, index);

    // Return to original state if it was hidden
    if (wasHidden) {
        grid.style.display = 'none';
        grid.style.visibility = 'visible';
    }
});

// Ensure tab1 is checked on page load
document.getElementById('tab1').checked = true;
showGridForTab(0);

function showGridForTab(tabIndex) {
    // Hide all grids first without removing their layout
    allGrids.forEach(grid => {
        grid.classList.remove('active');
        grid.style.visibility = 'hidden';
        grid.style.display = 'block';
    });
    
    // Layout all grids while they're visible
    allGrids.forEach((grid, i) => {
        masonryInstances[i].layout();
    });

    // Show the selected grid and hide others
    allGrids.forEach((grid, i) => {
        if (i === tabIndex) {
            grid.style.visibility = 'visible';
            grid.style.display = 'block';
            grid.classList.add('active');
        } else {
            grid.style.display = 'none';
        }
    });
}

radioTabs.forEach((radio, index) => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            showGridForTab(index);
        }
    });
});

// Re-layout Masonry when images are loaded
allGrids.forEach((grid, index) => {
    imagesLoaded(grid, () => {
        // Make grid temporarily visible for layout
        const wasHidden = grid.style.display === 'none';
        if (wasHidden) {
            grid.style.visibility = 'hidden';
            grid.style.display = 'block';
        }

        masonryInstances[index].layout();

        // Return to original state if it was hidden
        if (wasHidden) {
            grid.style.display = 'none';
            grid.style.visibility = 'visible';
        }
    });
});

// Improved resize handler with layout for all grids
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    
    // Disable transitions during resize
    allGrids.forEach(grid => {
        grid.style.transition = 'none';
    });
    
    resizeTimer = setTimeout(() => {
        allGrids.forEach((grid, index) => {
            // Re-enable transitions
            grid.style.transition = '';
            
            // Reinitialize masonry with new column width
            initializeMasonry(grid, index);
            masonryInstances[index].layout();
        });
    }, 250); // Longer delay for smoother resizing
});