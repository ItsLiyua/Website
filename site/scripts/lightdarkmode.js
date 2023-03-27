import {LDMS_MODE_DARK, LDMS_MODE_LIGHT, LIGHT_DARK_MODE_STATE} from "./constants.js";
import {getCookie, setCookie} from "./cookie-util.js";

const CSS_ROOT = document.querySelector(":root").style

export function light() {
    sessionStorage.setItem(LIGHT_DARK_MODE_STATE, LDMS_MODE_LIGHT)
    setCookie(LIGHT_DARK_MODE_STATE, LDMS_MODE_LIGHT)
    CSS_ROOT.setProperty("--bg", "var(--bg-light)")
    CSS_ROOT.setProperty("--accent", "var(--accent-light)")
    CSS_ROOT.setProperty("--accent-opaque", "var(--accent-opaque-light)")
}
export function dark() {
    sessionStorage.setItem(LIGHT_DARK_MODE_STATE, LDMS_MODE_DARK)
    setCookie(LIGHT_DARK_MODE_STATE, LDMS_MODE_DARK)
    CSS_ROOT.setProperty("--bg", "var(--bg-dark)")
    CSS_ROOT.setProperty("--accent", "var(--accent-dark)")
    CSS_ROOT.setProperty("--accent-opaque", "var(--accent-opaque-dark)")
}

function init() {
    sessionStorage.setItem(LIGHT_DARK_MODE_STATE, getCookie(LIGHT_DARK_MODE_STATE))
}

function loop() {
    if (sessionStorage.getItem(LIGHT_DARK_MODE_STATE) === LDMS_MODE_DARK) dark()
    else if (sessionStorage.getItem(LIGHT_DARK_MODE_STATE) === LDMS_MODE_LIGHT) light()
    else dark()
    setTimeout(loop, 200)
}

init()
loop()