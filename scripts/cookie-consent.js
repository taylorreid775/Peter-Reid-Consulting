window.cookieconsent.initialise({
    "palette": {
        "popup": {
            "background": "rgba(255, 255, 255, 0.95)",
            "text": "#333"
        },
        "button": {
            "background": "#207a3c",
            "text": "#ffffff"
        }
    },
    "type": "opt-in",
    "content": {
        "message": "We use cookies to enhance your browsing experience and analyze our traffic. By clicking 'Accept', you consent to our use of cookies in accordance with Canadian privacy laws.",
        "dismiss": "Decline",
        "allow": "Accept",
        "link": "Learn more",
        "href": "cookie-policy.html"
    },
    "cookie": {
        "name": "cookieconsent_status",
        "domain": window.location.hostname
    },
    "position": "top",
    "theme": "classic",
    "onInitialise": function (status) {
        var type = this.options.type;
        var didConsent = this.hasConsented();
        if (didConsent) {
            enableCookies();
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
    }
    .cc-message {
        font-size: 0.95rem !important;
        line-height: 1.5 !important;
        color: #333 !important;
        margin-bottom: 0.8rem !important;
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
            padding: 0.6rem 1rem !important;
            border-radius: 10px 10px 0 0 !important;
            top: auto !important;
            bottom: 0 !important;
            box-shadow: 0 -4px 24px rgba(0,0,0,0.08) !important;
            border-bottom: none !important;
            border-top: 1px solid rgba(32,122,60,0.1) !important;
        }
        .cc-message {
            font-size: 0.85rem !important;
            margin-bottom: 0.6rem !important;
        }
        .cc-btn {
            font-size: 0.8rem !important;
            padding: 0.5rem 1rem !important;
            min-width: unset;
            width: 100%;
        }
        .cc-compliance {
            flex-direction: column;
            gap: 8px;
        }
        .cc-revoke {
            right: auto !important;
            bottom: 18px !important;
            left: 18px !important;
            font-size: 0.98rem !important;
            padding: 8px 12px !important;
            transform: none !important;
            background: rgba(255,255,255,0.92) !important;
            color: #207a3c !important;
            font-family: 'Poppins', 'Josefin Sans', sans-serif !important;
            font-weight: 500 !important;
            border-radius: 8px !important;
            box-shadow: 0 2px 12px rgba(32,122,60,0.10) !important;
            z-index: 10002 !important;
            pointer-events: none;
            transition: opacity 0.3s, transform 0.3s ease;
            opacity: 0;
            letter-spacing: 0.01em !important;
            min-width: unset !important;
            text-align: center !important;
        }
        .cc-revoke.visible {
            opacity: 1;
            pointer-events: auto;
        }
        .cc-revoke:hover {
            background: rgba(245,245,245,0.92) !important;
            transform: scale(1.03) !important;
        }
    }
    @media (max-width: 500px) {
        .cc-revoke {
            right: auto !important;
            bottom: 10px !important;
            left: 10px !important;
            font-size: 0.9rem !important;
            padding: 6px 10px !important;
            border-radius: 6px !important;
            box-shadow: 0 2px 8px rgba(32,122,60,0.08) !important;
        }
    }
`;
document.head.appendChild(style);

// Add scroll-based visibility logic for cookie policy button
window.addEventListener('scroll', function() {
    const ccRevokeBtn = document.querySelector('.cc-revoke');
    if (ccRevokeBtn) {
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
    }
});

function enableCookies() {
    // Enable Google Fonts
    document.querySelectorAll('link[href*="fonts.googleapis.com"]').forEach(function(link) {
        link.setAttribute('rel', 'stylesheet');
    });
    
    // Enable Google Analytics if it exists
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    }
}

function disableCookies() {
    // Disable Google Fonts
    document.querySelectorAll('link[href*="fonts.googleapis.com"]').forEach(function(link) {
        link.setAttribute('rel', 'preconnect');
    });
    
    // Disable Google Analytics if it exists
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });
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