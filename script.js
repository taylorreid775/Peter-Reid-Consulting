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
const allImages = document.querySelectorAll('.image-grid .image');

function showImagesForTab(tabIndex) {
    allImages.forEach((img, i) => {
        const groupIndex = Math.floor(i / 5);
        if (groupIndex === tabIndex) {
            img.classList.add('visible');
        } else {
            img.classList.remove('visible');
        }
    });
}

radioTabs.forEach((radio, index) => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            showImagesForTab(index);
        }
    });
});

// Show initial images
showImagesForTab(0);