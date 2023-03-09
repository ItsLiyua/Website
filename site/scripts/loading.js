function prefetch(url) {
    const ln = document.createElement('link')
    ln.rel = 'prefetch'
    ln.href = url
    document.head.appendChild(ln)
}

document.title = "Voxel Games"

const icon = document.createElement('link');
icon.rel = 'icon'
icon.href = 'assets/images/favicon.png'
document.head.appendChild(icon)
