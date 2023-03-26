const IMAGES = [
    "https://www.24hamburg.de/bilder/2022/09/14/91787865/27294424-zwei-koenigskobras-zeigen-sich-in-voller-breite-dfe.jpg",
    "https://media0.faz.net/ppmedia/aktuell/2994436304/1.7524600/default-retina/bei-geoeffnetem-maul-werden.jpg",
    "https://blog.wwf.de/wp-content/uploads/2021/07/1920-blog-Blau-Insularis-Schlange-1125893226-c-Ikhsan-Yohanda-iStock-Getty-Images.jpg",
    "https://cdn.discordapp.com/attachments/1060986691399204864/1089487534523945041/Unbenannt.jpg",
    "https://cdn.discordapp.com/attachments/1060986691399204864/1089487596633202778/images.jpg",
    "https://cdn.discordapp.com/attachments/1060986691399204864/1089487624374341632/images.jpg",
    "https://cdn.discordapp.com/attachments/1060986691399204864/1089487694389846067/images.jpg",
    "https://cdn.discordapp.com/attachments/1060986691399204864/1089487730628632627/images.jpg",
    "https://cdn.discordapp.com/attachments/1060986691399204864/1089487757610586112/images.jpg",
    "https://cdn.discordapp.com/attachments/1060986691399204864/1089487805568270457/images.jpg"
]
const FUNFACTS = [
    "Schlangen in Flüssen oder Sümpfen beißen nicht, da sie sonst ertrinken würden",
    "Schlangen wachsen ihr ganzes leben lang",
    "Die meisten Schlangenarten können ein ganzes jahr ohne Nahrung überleben",
    "Der Magen einer Schlange ist langgezogen und mit muskulösen Wänden ausgestattet",
    "Der einzige Kontinent ohne Schlangen oder Reptilien ist die Antarktis",
    "Das Gift der Königskobra ist so giftig, dass 1 Gramm 150 Menschen töten kann",
    "Die einzige giftige Schlange in Großbritannien ist die Natter",
    "Die fliegende Schlange aus Java und Malaysia kann ihren Körper ausbreiten und von Baum zu Baum segeln",
    "Schlangen die den genetischen Defekt haben mit zwei Köpfen geboren zu werden haben Probleme zu essen, da sich beide Köpfe um das Essen streiten"
]

window.onload = () => {
    const randomTextIndex = Math.floor(Math.random() * FUNFACTS.length)
    document.getElementById("snake-text-1").innerText = FUNFACTS[randomTextIndex]
    document.getElementById("snake-text-2").innerText = FUNFACTS[(randomTextIndex + 1) % FUNFACTS.length]

    const randomImageIndex = Math.floor(Math.random() * IMAGES.length)
    document.getElementById("snake-image-1").src = IMAGES[randomImageIndex]
    document.getElementById("snake-image-2").src = IMAGES[(randomImageIndex + 1) % IMAGES.length]
}