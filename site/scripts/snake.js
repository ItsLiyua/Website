const BOARD = document.getElementById('board')
const BOARD_CTX = BOARD.getContext('2d')
const GRID_WIDTH = 24
const GRID_HEIGHT = 24
const ELEMENT_WIDTH = BOARD.width / GRID_WIDTH
const ELEMENT_HEIGHT = BOARD.height / GRID_HEIGHT
const Direction = {
    UP: [0, -1],
    DOWN: [0, 1],
    LEFT: [-1, 0],
    RIGHT: [1, 0]
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
        this.x += this.dir[0]
        this.y += this.dir[1]
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
        this.tails.add(new Tail(parent))
    }
}

function ptc(v) {
    return v * 32 + 10
}

const SNAKE = new Snake(GRID_WIDTH / 2, GRID_HEIGHT / 2)

function draw() {
    BOARD_CTX.fillStyle = '#dddddd'
    BOARD_CTX.fillRect(0, 0, BOARD.width, BOARD.height)

    BOARD_CTX.fillStyle = '#111111'
    BOARD_CTX.fillRect(10, 10, BOARD.width - 20, BOARD.height - 20)

    BOARD_CTX.fillStyle = '#61D224'
    SNAKE.tails.forEach(t => BOARD_CTX.fillRect(ptc(t.x), ptc(t.y), 32, 32))

    BOARD_CTX.fillStyle = '#55B422'
    BOARD_CTX.fillRect(ptc(SNAKE.head.x), ptc(SNAKE.head.y), 32, 32)

    BOARD_CTX.fillStyle = '#ff3333'
    BOARD_CTX.fillRect(ptc(SNAKE.pickup.x), ptc(SNAKE.pickup.y), 32, 32)
}

function loop() {
    SNAKE.move()
    draw()
    setTimeout(loop, 250)
}

document.addEventListener('keypress', event => {
    function changeDir(newDir) {
        if (newDir[0] + SNAKE.head.dir[0] !== 0 || newDir[1] + SNAKE.head.dir[1] !== 0) {
            SNAKE.head.dir = newDir
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

loop()