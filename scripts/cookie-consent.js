// Check for existing cookie consent status
function getCookieConsentStatus() {
    const name = 'cookieconsent_status=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

// Initialize the page based on cookie consent status
function initializePage() {
    const consentStatus = getCookieConsentStatus();
    if (consentStatus === 'allow') {
        enableCookies();
    } else {
        disableCookies();
    }
}

// Initialize cookie consent
window.cookieconsent.initialise({
    "palette": {
        "popup": {
            "background": "#ffffff",
            "text": "#000000",
            "link": "#4CAF50"
        },
        "button": {
            "background": "#4CAF50",
            "text": "#ffffff"
        }
    },
    "type": "opt-in",
    "content": {
        "message": "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
        "dismiss": "Decline",
        "allow": "Accept",
        "link": "Learn more",
        "href": "/cookie-policy/"
    },
    "cookie": {
        "name": "cookieconsent_status",
        "domain": window.location.hostname,
        "expiryDays": 365 // Cookie will persist for 1 year
    },
    "position": "top",
    "theme": "classic",
    "onInitialise": function (status) {
        var type = this.options.type;
        var didConsent = this.hasConsented();
        if (didConsent) {
            enableCookies();
        } else {
            disableCookies();
        }
        initialiseCcRevokeButton();
    },
    "onStatusChange": function(status, chosenBefore) {
        var type = this.options.type;
        var didConsent = this.hasConsented();
        if (didConsent) {
            enableCookies();
        } else {
            disableCookies();
        }
    },
    "onRevokeChoice": function() {
        var type = this.options.type;
        disableCookies();
    }
});

// Add custom styles
const style = document.createElement('style');
style.textContent = `
    .cc-window {
        font-family: 'Poppins', sans-serif !important;
        max-width: 92vw !important;
        width: 100% !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        padding: 0.8rem 1.5rem !important;
        box-shadow: 0 4px 24px rgba(0,0,0,0.08) !important;
        border-bottom: 1px solid rgba(32,122,60,0.1) !important;
        border-radius: 0 0 18px 18px !important;
        top: 0 !important;
        bottom: auto !important;
        margin-top: 0 !important;
        display: flex !important;
        align-items: center !important;
        z-index: 10001 !important;
        opacity: 1 !important;
        transform: translateX(-50%) translateY(0) !important;
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out !important;
    }
    .cc-window.cc-invisible {
        opacity: 0 !important;
        transform: translateX(-50%) translateY(-20px) !important;
        pointer-events: none !important;
    }
    .cc-overlay {
        display: none !important;
    }
    .cc-message {
        font-size: 0.95rem !important;
        line-height: 1.5 !important;
        color: #333 !important;
        margin-bottom: 0 !important;
        display: flex !important;
        align-items: center !important;
    }
    .cc-link {
        color: #207a3c !important;
        text-decoration: underline !important;
        font-weight: 500 !important;
    }
    .cc-link:hover {
        color: #145a28 !important;
    }
    .cc-btn {
        font-family: 'Poppins', sans-serif !important;
        font-weight: 600 !important;
        font-size: 0.85rem !important;
        padding: 0.6rem 1.2rem !important;
        border-radius: 6px !important;
        transition: all 0.2s ease !important;
        min-width: 90px;
    }
    .cc-allow {
        background: #207a3c !important;
        color: white !important;
    }
    .cc-allow:hover {
        background: #145a28 !important;
        transform: scale(1.02) !important;
    }
    .cc-dismiss {
        background: transparent !important;
        color: #666 !important;
        border: 2px solid #ddd !important;
    }
    .cc-dismiss:hover {
        background: #f5f5f5 !important;
        color: #333 !important;
    }
    .cc-compliance {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        flex-wrap: wrap;
    }
    .cc-revoke {
        right: auto !important;
        bottom: 32px !important;
        left: 32px !important;
        top: auto !important;
        background: rgba(255,255,255,0.92) !important;
        color: #207a3c !important;
        font-family: 'Poppins', 'Josefin Sans', sans-serif !important;
        font-size: 1.08rem !important;
        font-weight: 500 !important;
        border-radius: 8px !important;
        box-shadow: 0 2px 12px rgba(32,122,60,0.10) !important;
        padding: 12px 22px !important;
        z-index: 10002 !important;
        pointer-events: none;
        transition: opacity 0.3s, transform 0.3s ease;
        opacity: 0;
        letter-spacing: 0.01em !important;
        min-width: unset !important;
        text-align: center !important;
        transform: none !important;
    }
    .cc-revoke.visible {
        opacity: 1;
        pointer-events: auto;
    }
    .cc-revoke:hover {
        background: rgba(245,245,245,0.92) !important;
        transform: scale(1.03) !important;
    }
    @media (max-width: 700px) {
        .cc-window {
            padding: 0.5rem 0.7rem !important;
            border-radius: 12px 12px 0 0 !important;
            top: auto !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 96vw !important;
            max-width: 420px !important;
            margin: 0 auto 2vw auto !important;
            box-shadow: 0 -2px 16px rgba(0,0,0,0.10) !important;
            border-bottom: none !important;
            border-top: 1px solid rgba(32,122,60,0.1) !important;
            z-index: 20000 !important;
            transform: translateY(100%) !important;
            opacity: 0;
            transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s cubic-bezier(0.4,0,0.2,1) !important;
        }
        .cc-window.cc-invisible {
            opacity: 0 !important;
            transform: translateY(100%) !important;
        }
        .cc-window:not(.cc-invisible) {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .cc-message {
            font-size: 0.95rem !important;
            margin-bottom: 0.5rem !important;
            line-height: 1.4 !important;
            text-align: left !important;
        }
        .cc-btn {
            font-size: 1rem !important;
            padding: 0.7rem 0 !important;
            min-width: unset !important;
            width: 100% !important;
            margin: 0 !important;
            border-radius: 7px !important;
        }
        .cc-compliance {
            flex-direction: column !important;
            gap: 7px !important;
            width: 100% !important;
            align-items: stretch !important;
        }
        .cc-dismiss {
            background: #f5f5f5 !important;
            color: #222 !important;
            border: 1.5px solid #ccc !important;
        }
        .cc-link {
            font-size: 0.92em !important;
            color: #207a3c !important;
            margin-left: 6px !important;
            opacity: 0.8 !important;
            text-decoration: underline !important;
        }
    }
    
`;
document.head.appendChild(style);

// Add scroll-based visibility logic for cookie policy button
function updateRevokeButtonVisibility() {
    const ccRevokeBtn = document.querySelector('.cc-revoke');
    if (ccRevokeBtn) {
        // Only apply scroll-based visibility on index.html
        if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
            const scrolledDown = window.scrollY > 200;
            const atBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 2);

            if (scrolledDown || atBottom) {
                // Ensure transition is set when making visible
                ccRevokeBtn.style.transition = 'opacity 0.3s, transform 0.3s ease';
                ccRevokeBtn.style.opacity = '1';
                ccRevokeBtn.style.pointerEvents = 'auto';
            } else {
                ccRevokeBtn.style.opacity = '0';
                ccRevokeBtn.style.pointerEvents = 'none';
            }
        } else {
            // Always show on other pages
            ccRevokeBtn.style.transition = 'opacity 0.3s, transform 0.3s ease';
            ccRevokeBtn.style.opacity = '1';
            ccRevokeBtn.style.pointerEvents = 'auto';
        }
    }
}

// Initialize page state immediately
initializePage();

// Update revoke button visibility on scroll
window.addEventListener('scroll', updateRevokeButtonVisibility);

function enableCookies() {
    // Remove all existing placeholders
    document.querySelectorAll('.cookie-consent-placeholder').forEach(placeholder => {
        placeholder.remove();
    });

    // Show contact form and load EmailJS
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.style.display = 'block';
        
        // Load EmailJS script dynamically
        if (!document.querySelector('script[src*="email.min.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = function() {
                // Initialize EmailJS after script loads
                emailjs.init("5FsB_4WIQNIEQOmz5");
            };
            document.body.appendChild(script);
        }
    }
}

function disableCookies() {
    // Remove all existing placeholders
    document.querySelectorAll('.cookie-consent-placeholder').forEach(placeholder => {
        placeholder.remove();
    });

    // Create placeholder for contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const placeholder = document.createElement('div');
        placeholder.className = 'cookie-consent-placeholder';
        placeholder.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 200px;
            background: #f5f5f5;
            border-radius: 8px;
            margin: 20px 0;
            padding: 20px;
            text-align: center;
        `;
        placeholder.innerHTML = `
            <p>Please accept cookies to use the contact form.</p>
        `;
        contactForm.style.display = 'none';
        contactForm.parentNode.insertBefore(placeholder, contactForm);

        // Remove EmailJS script if it exists
        const emailjsScript = document.querySelector('script[src*="email.min.js"]');
        if (emailjsScript) {
            emailjsScript.remove();
        }
    }
}

// Function to initialize button state for smooth transition
function initialiseCcRevokeButton() {
    const ccRevokeBtn = document.querySelector('.cc-revoke');
    if (ccRevokeBtn) {
        // Ensure initial state is hidden with transitions enabled
        ccRevokeBtn.style.opacity = '0';
        ccRevokeBtn.style.transition = 'opacity 0.3s, transform 0.3s ease';
        ccRevokeBtn.style.pointerEvents = 'none'; // Ensure it's not clickable when hidden
    }
}

// Call the initialization function immediately
initialiseCcRevokeButton();

// Add fade out effect before hiding
const originalHide = window.cookieconsent.hide;
window.cookieconsent.hide = function() {
    const popup = document.querySelector('.cc-window');
    if (popup) {
        popup.classList.add('cc-invisible');
        setTimeout(() => {
            originalHide.call(this);
        }, 300); // Match the transition duration
    } else {
        originalHide.call(this);
    }
}; 