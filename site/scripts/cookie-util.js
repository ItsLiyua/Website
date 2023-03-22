let cookieStatus = false;

export function setCookie(cname, cvalue, exdays) {
    if (cookieStatus) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    } else console.warn("Tried setting cookie \"" + cname + "\" but cookies are disabled.")
}

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

export function setCookieStatus(val) {
    cookieStatus = val
}

export function getCookieStatus() {
    return cookieStatus
}
