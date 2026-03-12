// Email Functionality - handler is attached only after EmailJS loads (from cookie-consent when user accepts cookies)
function capitalizeName(name) {
    return name.replace(/\b\w/g, char => char.toUpperCase()).replace(/\B\w/g, char => char.toLowerCase());
}

function attachContactFormHandler() {
    if (typeof emailjs === 'undefined') return;
    emailjs.init("5FsB_4WIQNIEQOmz5");

    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    // Avoid attaching the same handler twice
    if (contactForm.dataset.emailHandlerAttached === 'true') return;
    contactForm.dataset.emailHandlerAttached = 'true';

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const templateParams = {
            name: capitalizeName(document.getElementById('name').value),
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        emailjs.send('service_4hntcjv', 'template_cp0p4lr', templateParams)
            .then(function () {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        'event_category': 'contact',
                        'event_label': 'contact_form',
                        'value': 1
                    });
                }

                const responseMessage = document.getElementById("response-message");
                if (responseMessage) {
                    responseMessage.textContent = "Message sent successfully!";
                    responseMessage.classList.remove("invisible", "error");
                    responseMessage.classList.add("visible", "success");
                }
                contactForm.reset();

                setTimeout(function () {
                    if (responseMessage) {
                        responseMessage.classList.remove("visible", "success");
                        responseMessage.classList.add("invisible");
                    }
                }, 5000);
            })
            .catch(function (error) {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit_error', {
                        'event_category': 'contact',
                        'event_label': 'contact_form_error',
                        'value': 1
                    });
                }

                const responseMessage = document.getElementById("response-message");
                console.error("EmailJS Error:", error);
                if (responseMessage) {
                    responseMessage.textContent = "An error occurred: " + (error.text || error.message || "Please try again.");
                    responseMessage.classList.remove("invisible", "success");
                    responseMessage.classList.add("visible", "error");

                    setTimeout(function () {
                        responseMessage.classList.remove("visible", "error");
                        responseMessage.classList.add("invisible");
                    }, 5000);
                }
            });
    });
}

// Expose so cookie-consent can call after EmailJS script loads
window.attachContactFormHandler = attachContactFormHandler;