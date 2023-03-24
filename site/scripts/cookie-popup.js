import {COOKIE_POPUP_HIDDEN, COOKIE_POPUP_SHOWN, COOKIE_POPUP_STATUS} from "./constants.js";

/**
 * This function displays the cookie popup.
 */
function show() {
    const f = document.getElementById("cookies");
    if (f === null) {
        console.error("Could not find iframe with ID \"cookies\".")
        return
    }
    f.style.width = "100vw"
    f.style.height = "100vh"
    f.style.display = "block"
    document.body.style.overflow = 'hidden'
}

/**
 * This function hides the cookie popup.
 */
function hide() {
    const f = document.getElementById("cookies");
    if (f === null) {
        console.error("Could not find iframe with ID \"cookies\".")
        return
    }
    f.style.width = "0"
    f.style.height = "0"
    f.style.display = "none"
    document.body.style.overflow = 'scroll'
}

/**
 * This function runs 4 times a second and updates the visibility of the cookie popup by checking the session storage for the key which contains the popup status.
 */
function loop() {
    if (sessionStorage.getItem(COOKIE_POPUP_STATUS) === COOKIE_POPUP_SHOWN) show()
    else if (sessionStorage.getItem(COOKIE_POPUP_STATUS) === COOKIE_POPUP_HIDDEN) hide()
    setTimeout(loop, 250)
}

loop()