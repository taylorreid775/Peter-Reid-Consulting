// Check for existing cookie consent status
function getCookieConsentStatus() {
    const name = 'cookieconsent_status=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

let cookiePopup = null;

function loadScript(src, id) {
    if (document.querySelector(`script[src="${src}"]`) || (id && document.getElementById(id))) {
        return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    if (id) {
        script.id = id;
    }
    document.head.appendChild(script);
}

function removeScript(src, id) {
    const bySrc = document.querySelector(`script[src="${src}"]`);
    if (bySrc) {
        bySrc.remove();
    }
    if (id) {
        const byId = document.getElementById(id);
        if (byId) {
            byId.remove();
        }
    }
}

function enableAnalytics() {
    window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
    loadScript('https://cdn.vercel-insights.com/v1/script.js', 'vercel-analytics');
    loadScript('/_vercel/speed-insights/script.js', 'vercel-speed-insights');
}

function disableAnalytics() {
    removeScript('https://cdn.vercel-insights.com/v1/script.js', 'vercel-analytics');
    removeScript('/_vercel/speed-insights/script.js', 'vercel-speed-insights');
}

function initializePage() {
    const consentStatus = getCookieConsentStatus();
    if (consentStatus === 'allow') {
        enableAnalytics();
    } else {
        disableAnalytics();
    }
}

const cookieConsentOptions = {
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
        "message": "We use optional analytics cookies to understand site usage. The contact form always works.",
        "dismiss": "Decline",
        "allow": "Accept",
        "link": "Learn more",
        "href": "/cookie-policy/"
    },
    "cookie": {
        "name": "cookieconsent_status",
        "domain": window.location.hostname,
        "expiryDays": 365
    },
    "law": {
        "countryCode": "CA",
        "regionalLaw": false
    },
    "position": "bottom-right",
    "theme": "classic",
    "revokable": false,
    "onInitialise": function () {
        if (this.hasConsented()) {
            enableAnalytics();
        } else {
            disableAnalytics();
        }
    },
    "onStatusChange": function () {
        if (this.hasConsented()) {
            enableAnalytics();
        } else {
            disableAnalytics();
        }
    },
    "onRevokeChoice": function () {
        disableAnalytics();
    }
};

window.cookieconsent.initialise(cookieConsentOptions, function (popup) {
    cookiePopup = popup;
});

const style = document.createElement('style');
style.textContent = `
    .cc-window {
        font-family: 'Poppins', sans-serif !important;
        position: fixed !important;
        top: auto !important;
        bottom: 24px !important;
        left: auto !important;
        right: 24px !important;
        width: min(360px, calc(100vw - 32px)) !important;
        max-width: 360px !important;
        margin: 0 !important;
        padding: 1rem 1.15rem !important;
        box-shadow: 0 10px 36px rgba(0, 0, 0, 0.14) !important;
        border: 1px solid rgba(32, 122, 60, 0.14) !important;
        border-radius: 14px !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 12px !important;
        z-index: 19995 !important;
        opacity: 1 !important;
        transform: none !important;
        transition: opacity 0.3s ease, transform 0.3s ease !important;
    }
    .cc-window.cc-invisible {
        opacity: 0 !important;
        transform: translateY(10px) !important;
        pointer-events: none !important;
    }
    .cc-overlay {
        display: none !important;
    }
    .cc-revoke {
        display: none !important;
    }
    .cc-message {
        font-size: 0.9rem !important;
        line-height: 1.45 !important;
        color: #333 !important;
        margin: 0 !important;
        display: block !important;
    }
    .cc-link {
        color: #207a3c !important;
        text-decoration: underline !important;
        font-weight: 500 !important;
        white-space: nowrap;
    }
    .cc-link:hover {
        color: #145a28 !important;
    }
    .cc-btn {
        font-family: 'Poppins', sans-serif !important;
        font-weight: 600 !important;
        font-size: 0.82rem !important;
        padding: 0.55rem 0.9rem !important;
        border-radius: 6px !important;
        transition: all 0.2s ease !important;
        min-width: 0 !important;
        flex: 1 1 0;
    }
    .cc-allow {
        background: #207a3c !important;
        color: white !important;
    }
    .cc-allow:hover {
        background: #145a28 !important;
    }
    .cc-dismiss {
        background: #f5f5f5 !important;
        color: #444 !important;
        border: 1px solid #ddd !important;
    }
    .cc-dismiss:hover {
        background: #ebebeb !important;
        color: #222 !important;
    }
    .cc-compliance {
        display: flex !important;
        flex-direction: row !important;
        gap: 8px !important;
        justify-content: stretch !important;
        width: 100% !important;
    }
    @media (max-width: 768px) {
        .cc-window {
            right: 12px !important;
            left: 12px !important;
            bottom: calc(68px + env(safe-area-inset-bottom)) !important;
            width: auto !important;
            max-width: none !important;
        }
        .cc-message {
            font-size: 0.88rem !important;
        }
        .cc-compliance {
            flex-direction: column !important;
        }
        .cc-btn {
            width: 100% !important;
            font-size: 0.92rem !important;
            padding: 0.65rem 0.9rem !important;
        }
    }
    
`;
document.head.appendChild(style);

document.addEventListener('click', function (event) {
    const link = event.target.closest('.cookie-settings-link');
    if (!link) {
        return;
    }
    event.preventDefault();
    if (cookiePopup) {
        cookiePopup.revokeChoice();
    }
});

initializePage();
