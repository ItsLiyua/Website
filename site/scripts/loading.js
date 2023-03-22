import {getCookie} from "./cookie-util.js";
import {
    COOKIE_POPUP_HIDDEN,
    COOKIE_POPUP_SHOWN,
    COOKIE_POPUP_STATUS,
    COOKIES_STATUS_ENABLED,
    COOKIES_STATUS_NAME
} from "./constants.js";

function prefetch(url) {
    const ln = document.createElement('link')
    ln.rel = 'prefetch'
    ln.href = url
    document.head.appendChild(ln)
}

document.title = "Voxel Games"

const icon = document.createElement('link');
icon.rel = 'icon'
icon.href = '/assets/images/favicon.png'
document.head.appendChild(icon)

const cookiePopupScript = document.createElement("script");
cookiePopupScript.type = "text/javascript";
cookiePopupScript.src = "/Website/site/scripts/cookie-popup.js";
cookiePopupScript.type = "module"
document.body.appendChild(cookiePopupScript);

if (getCookie(COOKIES_STATUS_NAME) === COOKIES_STATUS_ENABLED) {
    sessionStorage.setItem(COOKIES_STATUS_NAME, COOKIES_STATUS_ENABLED)
    sessionStorage.setItem(COOKIE_POPUP_STATUS, COOKIE_POPUP_HIDDEN)
} else {
    sessionStorage.setItem(COOKIE_POPUP_STATUS, COOKIE_POPUP_SHOWN)
}
