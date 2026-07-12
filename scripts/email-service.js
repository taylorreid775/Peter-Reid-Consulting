function capitalizeName(name) {
    return name.replace(/\b\w/g, char => char.toUpperCase()).replace(/\B\w/g, char => char.toLowerCase());
}

function getFieldValue(id) {
    const field = document.getElementById(id);
    return field ? field.value.trim() : '';
}

function buildInquiryMessage(fields) {
    const lines = [
        `Name: ${fields.name}`,
        `Email: ${fields.email}`,
        `Phone: ${fields.phone}`,
        `Property location: ${fields.location}`,
        `Project type: ${fields.projectType}`,
        `Timeline: ${fields.timeline}`
    ];

    if (fields.budget) {
        lines.push(`Budget range: ${fields.budget}`);
    }
    if (fields.referral) {
        lines.push(`How they heard about us: ${fields.referral}`);
    }

    lines.push('', fields.message);
    return lines.join('\n');
}

function trackFormEvent(eventName) {
    if (typeof window.va === 'function') {
        window.va('event', { name: eventName });
    }
}

function showResponseMessage(text, type) {
    const responseMessage = document.getElementById('response-message');
    if (!responseMessage) {
        return;
    }

    responseMessage.textContent = text;
    responseMessage.classList.remove('invisible', 'success', 'error');
    responseMessage.classList.add('visible', type);

    setTimeout(function () {
        responseMessage.classList.remove('visible', type);
        responseMessage.classList.add('invisible');
    }, 8000);
}

function attachContactFormHandler() {
    if (typeof emailjs === 'undefined') {
        return;
    }

    emailjs.init('5FsB_4WIQNIEQOmz5');

    const contactForm = document.getElementById('contact-form');
    if (!contactForm || contactForm.dataset.emailHandlerAttached === 'true') {
        return;
    }

    contactForm.dataset.emailHandlerAttached = 'true';

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const fields = {
            name: capitalizeName(getFieldValue('name')),
            email: getFieldValue('email'),
            phone: getFieldValue('phone'),
            location: getFieldValue('location'),
            projectType: getFieldValue('project-type'),
            timeline: getFieldValue('timeline'),
            budget: getFieldValue('budget'),
            referral: getFieldValue('referral'),
            message: getFieldValue('message')
        };

        const templateParams = {
            name: fields.name,
            email: fields.email,
            phone: fields.phone,
            location: fields.location,
            project_type: fields.projectType,
            timeline: fields.timeline,
            budget: fields.budget || 'Not provided',
            referral: fields.referral || 'Not provided',
            message: buildInquiryMessage(fields)
        };

        emailjs.send('service_4hntcjv', 'template_cp0p4lr', templateParams)
            .then(function () {
                trackFormEvent('contact_form_submit');
                showResponseMessage(
                    'Thank you! Peter will review your inquiry and respond within 1–2 business days. Need a faster reply? Call (902) 441-2424.',
                    'success'
                );
                contactForm.reset();
            })
            .catch(function (error) {
                trackFormEvent('contact_form_submit_error');
                console.error('EmailJS Error:', error);
                showResponseMessage(
                    'Something went wrong sending your message. Please call (902) 441-2424 or email peter@preidconsulting.com.',
                    'error'
                );
            });
    });
}

function loadEmailJS() {
    return new Promise(function (resolve) {
        if (typeof emailjs !== 'undefined') {
            resolve();
            return;
        }

        const existingScript = document.querySelector('script[src*="email.min.js"]');
        if (existingScript) {
            existingScript.addEventListener('load', resolve, { once: true });
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = resolve;
        document.body.appendChild(script);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('contact-form')) {
        return;
    }

    loadEmailJS().then(attachContactFormHandler);
});
