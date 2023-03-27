import {LDMS_MODE_DARK, LDMS_MODE_LIGHT, LIGHT_DARK_MODE_STATE} from "./constants.js";
import {getCookie, setCookie} from "./cookie-util.js";

/**
 * This is the CSS element, which defines the background and accent colors.
 */
const CSS_ROOT = document.querySelector(":root").style

/**
 * This function enables light-mode globally.
 */
export function light() {
    sessionStorage.setItem(LIGHT_DARK_MODE_STATE, LDMS_MODE_LIGHT)
    setCookie(LIGHT_DARK_MODE_STATE, LDMS_MODE_LIGHT)
    CSS_ROOT.setProperty("--bg", "var(--bg-light)")
    CSS_ROOT.setProperty("--accent", "var(--accent-light)")
    CSS_ROOT.setProperty("--accent-opaque", "var(--accent-opaque-light)")
}

/**
 * This function enables dark-=mode globally.
 */
export function dark() {
    sessionStorage.setItem(LIGHT_DARK_MODE_STATE, LDMS_MODE_DARK)
    setCookie(LIGHT_DARK_MODE_STATE, LDMS_MODE_DARK)
    CSS_ROOT.setProperty("--bg", "var(--bg-dark)")
    CSS_ROOT.setProperty("--accent", "var(--accent-dark)")
    CSS_ROOT.setProperty("--accent-opaque", "var(--accent-opaque-dark)")
}

function loop() {
    if (sessionStorage.getItem(LIGHT_DARK_MODE_STATE) === LDMS_MODE_DARK) dark()
    else if (sessionStorage.getItem(LIGHT_DARK_MODE_STATE) === LDMS_MODE_LIGHT) light()
    else dark()
    setTimeout(loop, 200)
}

/**
 * Enable dark-mode by default.
 */
sessionStorage.setItem(LIGHT_DARK_MODE_STATE, getCookie(LIGHT_DARK_MODE_STATE))
loop()