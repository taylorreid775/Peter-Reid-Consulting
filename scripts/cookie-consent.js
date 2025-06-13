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
        padding: 0.8rem 1.5rem !important; /* Adjusted padding for smaller size */
        box-shadow: 0 4px 24px rgba(0,0,0,0.08) !important; /* Adjusted shadow for top */
        border-bottom: 1px solid rgba(32,122,60,0.1) !important; /* Border at bottom for top position */
        border-radius: 0 0 18px 18px !important; /* Rounded bottom corners */
        top: 0 !important; /* Ensure it's at the very top */
        margin-top: 0 !important;
    }
    .cc-message {
        font-size: 0.95rem !important; /* Smaller font size */
        line-height: 1.5 !important;
        color: #333 !important;
        margin-bottom: 0.8rem !important; /* Smaller margin */
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
        font-size: 0.85rem !important; /* Smaller font size */
        padding: 0.6rem 1.2rem !important; /* Smaller padding */
        border-radius: 6px !important;
        transition: all 0.2s ease !important;
        min-width: 90px; /* Adjusted min-width */
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
        gap: 10px; /* Smaller gap between buttons */
        justify-content: flex-end;
        flex-wrap: wrap;
    }
    @media (max-width: 700px) {
        .cc-window {
            padding: 0.6rem 1rem !important; /* Adjusted padding for mobile */
            border-radius: 0 0 10px 10px !important;
        }
        .cc-message {
            font-size: 0.85rem !important; /* Smaller font size for mobile */
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
            gap: 8px; /* Smaller gap for mobile */
        }
    }
`;
document.head.appendChild(style);

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