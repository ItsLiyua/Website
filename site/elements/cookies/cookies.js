import * as c from "../../scripts/cookie.js";

const COOKIES_ACCEPTED = "cookies-accepted"

document.getElementById("accept").onclick = () => {
    close()
    c.setCookie(COOKIES_ACCEPTED, "true", 365)
    console.log("Cookies accepted")
}

document.getElementById("decline").onclick = () => {
    close()
    console.log("Cookies declined")
}

function close() {
    document.body.style.display = "none"
}

// if (c.getCookie(COOKIES_ACCEPTED) === "true")
close()
