function onmouseover() {
    document.getElementById('icon-image').src = '../../../assets/images/furnace_on.png';
    document.getElementById('icon-text').style.color = 'white'
    document.getElementById('icon-text').style.textDecoration = 'underline white'
}

function onmouseout() {
    document.getElementById('icon-image').src = '../../../assets/images/furnace_off.png';
    document.getElementById('icon-text').style.color = '#dddddd'
    document.getElementById('icon-text').style.textDecoration = 'none'
}

const btn = document.getElementById("icon-button")
btn.onmouseover = onmouseover
btn.onmouseout = onmouseout