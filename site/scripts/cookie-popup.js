import {COOKIE_POPUP_HIDDEN, COOKIE_POPUP_SHOWN, COOKIE_POPUP_STATUS} from "./constants.js";

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

function loop() {
    if (sessionStorage.getItem(COOKIE_POPUP_STATUS) === COOKIE_POPUP_SHOWN) show()
    else if (sessionStorage.getItem(COOKIE_POPUP_STATUS) === COOKIE_POPUP_HIDDEN) hide()
    setTimeout(loop, 250)
}

loop()