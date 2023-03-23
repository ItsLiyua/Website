import {getCookie, setCookie} from "../../scripts/cookie-util.js"

const BOARD = document.getElementById('board')
const BOARD_CTX = BOARD.getContext('2d')
const GRID_WIDTH = 24
const GRID_HEIGHT = 24
const ELEMENT_SIZE = 32
const Direction = {
    UP: {x: 0, y: -1},
    DOWN: {x: 0, y: 1},
    LEFT: {x: -1, y: 0},
    RIGHT: {x: 1, y: 0}
}

class Element {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Tail extends Element {
    constructor(parent) {
        super(parent.x, parent.y)
        this.parent = parent
        this.wait = true
    }

    move() {
        if (!this.wait) {
            this.x = this.parent.x
            this.y = this.parent.y
        } else this.wait = false
        this.parent.move()
    }
}

class Head extends Element {
    constructor(x, y, dir) {
        super(x, y);
        this.dir = dir
    }

    move() {
        this.x += this.dir.x
        this.y += this.dir.y
    }
}

class Pickup extends Element {
    constructor() {
        super(Math.floor(Math.random() * 24), Math.floor(Math.random() * 24));
    }

    move() {
        this.x = Math.floor(Math.random() * 24)
        this.y = Math.floor(Math.random() * 24)
    }
}

class Snake {
    constructor(x, y) {
        this.head = new Head(x, y, Direction.RIGHT)
        this.pickup = new Pickup()
        this.tails = []
    }

    move() {
        if (this.tails.length > 0) this.tails[this.tails.length - 1].move()
        else this.head.move()
    }

    addTail() {
        let parent = this.tails.length === 0 ? this.head : this.tails[this.tails.length - 1];
        this.tails.push(new Tail(parent))
    }

    reset() {
        while (this.tails.length > 0) this.tails.pop()
        this.head.x = GRID_WIDTH / 2
        this.head.y = GRID_HEIGHT / 2
        this.head.dir = Direction.RIGHT
        score = 0
    }
}

function ptc(v) {
    return v * ELEMENT_SIZE + 10
}

let score = 0
let highscore = 0
const SNAKE = new Snake(GRID_WIDTH / 2, GRID_HEIGHT / 2)
const INPUT_QUEUE = []

function loadHighscore() {
    if (getCookie('hs') !== '') {
        highscore = parseInt(getCookie('hs'))
    }
}

function updateDir() {
    if (INPUT_QUEUE.length > 0) {
        SNAKE.head.dir = INPUT_QUEUE.shift()
    }
}

function checkPickupCollision() {
    if (SNAKE.head.x === SNAKE.pickup.x && SNAKE.head.y === SNAKE.pickup.y) {
        SNAKE.pickup.move()
        SNAKE.addTail()
        score++
        if (score > highscore) setCookie('hs', ++highscore, 365)
    }
}

function checkSelfCollision() {
    if (SNAKE.tails.filter(t => t.x === SNAKE.head.x && t.y === SNAKE.head.y).filter(t => !t.wait).length > 0) {
        SNAKE.reset()
    }
}

function checkWallCollision() {
    if (SNAKE.head.x < 0 || SNAKE.head.x >= GRID_WIDTH || SNAKE.head.y < 0 || SNAKE.head.y >= GRID_HEIGHT) {
        SNAKE.reset()
    }
}

function draw() {
    BOARD_CTX.fillStyle = '#dddddd'
    BOARD_CTX.fillRect(0, 0, BOARD.width, BOARD.height)

    BOARD_CTX.fillStyle = '#111111'
    BOARD_CTX.fillRect(10, 10, BOARD.width - 20, BOARD.height - 20)

    BOARD_CTX.fillStyle = '#61D224'
    SNAKE.tails.forEach(t => BOARD_CTX.fillRect(ptc(t.x), ptc(t.y), ELEMENT_SIZE, ELEMENT_SIZE))

    BOARD_CTX.fillStyle = '#55B422'
    BOARD_CTX.fillRect(ptc(SNAKE.head.x), ptc(SNAKE.head.y), ELEMENT_SIZE, ELEMENT_SIZE)

    BOARD_CTX.fillStyle = '#ff3333'
    BOARD_CTX.fillRect(ptc(SNAKE.pickup.x), ptc(SNAKE.pickup.y), ELEMENT_SIZE, ELEMENT_SIZE)
}

function loop() {
    updateDir()
    SNAKE.move()
    checkPickupCollision()
    checkWallCollision()
    checkSelfCollision()
    draw()
    setTimeout(loop, 250)
}

document.addEventListener('keypress', event => {
    function changeDir(newDir) {
        if (newDir.x + SNAKE.head.dir.x !== 0 || newDir.y + SNAKE.head.dir.y !== 0) {
            INPUT_QUEUE.push(newDir)
        }
    }

    switch (event.code) {
        case 'KeyW':
            changeDir(Direction.UP)
            break
        case 'KeyS':
            changeDir(Direction.DOWN)
            break
        case 'KeyA':
            changeDir(Direction.LEFT)
            break
        case 'KeyD':
            changeDir(Direction.RIGHT)
            break
    }
})

loadHighscore()
loop()
