import {getCookie} from "./cookie-util.js";
import {
    COOKIE_POPUP_HIDDEN,
    COOKIE_POPUP_SHOWN,
    COOKIE_POPUP_STATUS,
    COOKIES_STATUS_ENABLED,
    COOKIES_STATUS_NAME
} from "./constants.js";

function loadScript(path) {
    const script = document.createElement("script");
    script.src = path;
    script.type = "module"
    document.body.appendChild(script);
}

/**
 * This line sets the website on every site.
 */
document.title = "Voxel Games"

/**
 * This block of code sets the website's favicon.
 */
const icon = document.createElement('link');
icon.rel = 'icon'
icon.href = '/assets/images/favicon.png'
document.head.appendChild(icon)

/**
 * Load the cookie-popup-script.
 */
loadScript("/Website/site/scripts/cookie-popup.js")
/**
 * Load the light-dark-mode-script.
 */
loadScript("/Website/site/scripts/lightdarkmode.js")

if (getCookie(COOKIES_STATUS_NAME) === COOKIES_STATUS_ENABLED) {
    sessionStorage.setItem(COOKIES_STATUS_NAME, COOKIES_STATUS_ENABLED)
    sessionStorage.setItem(COOKIE_POPUP_STATUS, COOKIE_POPUP_HIDDEN)
} else sessionStorage.setItem(COOKIE_POPUP_STATUS, COOKIE_POPUP_SHOWN)
