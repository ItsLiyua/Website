import {COOKIES_STATUS_ENABLED, COOKIES_STATUS_NAME} from "./constants.js";

/**
 * This function sets a cookie as long as cookies are enabled.
 * @param cname The name of the cookie that is to be set.
 * @param cvalue The value which is stored inside the cookie.
 * @param exdays The duration until the cookie expires in days.
 */
export function setCookie(cname, cvalue, exdays) {
    if (sessionStorage.getItem(COOKIES_STATUS_NAME) === COOKIES_STATUS_ENABLED) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    } else console.warn("Tried setting cookie \"" + cname + "\" but cookies are disabled.")
}

/**
 * This function retrieves the value of a cookie from the cookie cache of the browser.
 * @param cname The name of the cookie you're trying to retrieve.
 * @returns {string} The value of the cookie you're trying to retrieve. If the cookie doesn't exist this method returns an empty string.
 */
export function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}
