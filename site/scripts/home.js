const btn = document.getElementById("icon-button")
const img = document.getElementById('icon-image')
const text = document.getElementById('icon-text')

btn.onmouseover = () => {
    img.src = '../../../assets/images/furnace_on.png';
    text.style.color = 'white'
    text.style.textDecoration = 'underline white'
}

btn.onmouseout = () => {
    img.src = '../../../assets/images/furnace_off.png';
    text.style.color = '#dddddd'
    text.style.textDecoration = 'none'
}