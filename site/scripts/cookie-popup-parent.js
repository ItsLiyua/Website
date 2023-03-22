export function loop() {
    if (sessionStorage.getItem("show-cookie-popup") === "0") {
        console.log("Minimizing iframe.")
        const iframe = document.getElementById("cookies")
        if (iframe == null) {
            console.error("No iframe found.")
            return
        }
        iframe.style.display = "none"
        iframe.style.width = "0px"
        iframe.style.height = "0px"
        iframe.style.zIndex = "-1"
        return;
    }
    setTimeout(loop, 250)
}

loop()
