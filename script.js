let lastScrollTop = 0; // Keeps track of the last scroll position
const hero = document.querySelector('.hero');

window.addEventListener("scroll", function () {
    const topBar = document.querySelector(".top-bar");
    const title = document.querySelector(".title");

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
        topBar.classList.add("shrunk");
        title.classList.add("title-shrunk");
    } else {
        topBar.classList.remove("shrunk");
        title.classList.remove("title-shrunk");
        hero.classList.add('expanded'); // Slide back in the hero content
    }
});

// Slideshow functionality
window.addEventListener('load', function () {
    hero.classList.add('expanded');

    const images = document.querySelectorAll('.hero-image img');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let currentIndex = 0;
    let slideInterval; // Store the interval ID

    function updateSlideshow(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });

        indicators.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlideshow(currentIndex);
        resetInterval(); // Reset the interval on manual change
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlideshow(currentIndex);
        resetInterval(); // Reset the interval on manual change
    }

    // Add event listeners to buttons
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

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
            currentIndex = (currentIndex + 1) % images.length; // Go to the next image
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