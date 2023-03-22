import * as c from "../../scripts/cookie-util.js";
import {
    COOKIE_POPUP_HIDDEN,
    COOKIE_POPUP_STATUS,
    COOKIES_STATUS_ENABLED,
    COOKIES_STATUS_NAME
} from "../../scripts/constants.js";

document.getElementById("accept").onclick = () => {
    close()
    sessionStorage.setItem(COOKIES_STATUS_NAME, COOKIES_STATUS_ENABLED)
    c.setCookie(COOKIES_STATUS_NAME, COOKIES_STATUS_ENABLED, 365)
    console.log("Cookies accepted")
}

document.getElementById("decline").onclick = () => {
    close()
    console.log("Cookies declined")
}

function close() {
    sessionStorage.setItem(COOKIE_POPUP_STATUS, COOKIE_POPUP_HIDDEN)
}
