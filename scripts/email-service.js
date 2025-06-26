// Email Functionality
window.onload = function () {
    emailjs.init("5FsB_4WIQNIEQOmz5");

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Capitalize first letter of each word in a name string
        function capitalizeName(name) {
            return name.replace(/\b\w/g, char => char.toUpperCase()).replace(/\B\w/g, char => char.toLowerCase());
        }
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const templateParams = {
                name: capitalizeName(document.getElementById('name').value),
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            emailjs.send('service_4hntcjv', 'template_cp0p4lr', templateParams)
                .then(response => {
                    const responseMessage = document.getElementById("response-message");
                    responseMessage.textContent = "Message sent successfully!";
                    responseMessage.classList.remove("invisible", "error");
                    responseMessage.classList.add("visible", "success");
                    contactForm.reset();

                    // After 5 seconds, fade out the message
                    setTimeout(() => {
                        responseMessage.classList.remove("visible", "success");
                        responseMessage.classList.add("invisible");
                    }, 5000);
                })
                .catch(error => {
                    const responseMessage = document.getElementById("response-message");
                    console.error("EmailJS Error:", error);
                    responseMessage.textContent = "An error occurred: " + error.text;
                    responseMessage.classList.remove("invisible", "success");
                    responseMessage.classList.add("visible", "error");

                    // After 5 seconds, fade out the message
                    setTimeout(() => {
                        responseMessage.classList.remove("visible", "error");
                        responseMessage.classList.add("invisible");
                    }, 5000);
                });
        });
    }
};