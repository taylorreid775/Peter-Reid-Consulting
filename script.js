// window.addEventListener("scroll", function () {
//     const topBar = document.querySelector(".top-bar");
//     const title = document.querySelector(".title");

//     const titleHeight = title.offsetHeight;
//     const topBarHeight = topBar.offsetHeight;
//     const titlePosition = title.getBoundingClientRect().top;

//     // Find the center of the top bar
//     const topBarMiddle = topBar.getBoundingClientRect().top + topBarHeight / 2;

//     // Find the vertical center of the title
//     const titleMiddle = titlePosition + titleHeight / 2;

//     // When the title's vertical center reaches the center of the top bar
//     if (titleMiddle <= topBarMiddle) {
//         // The title has reached the middle of the menu bar, show the top bar
//         topBar.classList.add("shrunk");
//         title.classList.add("title-shrunk");
//     } else {
//         // The title has not yet reached the middle, keep top bar transparent
//         topBar.classList.remove("shrunk");
//         title.classList.remove("title-shrunk");
//     }
// });

let lastScrollTop = 0; // Keeps track of the last scroll position

window.addEventListener("scroll", function () {
    const topBar = document.querySelector(".top-bar");
    const title = document.querySelector(".title");
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight; // Height of the hero image
    const heroTop = hero.offsetTop; // Top position of the hero image
    const heroContent = document.querySelector('.hero-content');

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
        heroContent.classList.add('expanded'); // Slide back in the hero content
    }
});

window.addEventListener('load', function () {
    const heroContent = document.querySelector('.hero-content');
    heroContent.classList.add('expanded'); // Show the hero content on page load
});