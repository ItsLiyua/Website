import {getCookie, setCookie} from "../../scripts/cookie-util.js"

const BOARD = document.getElementById('board')
const BOARD_CTX = BOARD.getContext('2d')
const GRID_WIDTH = 24
const GRID_HEIGHT = 24
const ELEMENT_SIZE = 32

/**
 * This function returns a random x coordinate based on the GRID_WIDTH field.
 * @returns {number} A random number between 0 (inclusive) and GRID_WIDTH (exclusive)
 */
const randomX = () => Math.floor(Math.random() * GRID_WIDTH)
/**
 * This function returns a random y coordinate based on the GRID_HEIGHT field.
 * @returns {number} A random number between 0 (inclusive) and GRID_HEIGHT (exclusive)
 */
const randomY = () => Math.floor(Math.random() * GRID_HEIGHT)

/**
 * A list of different directions the snake can take.
 * x represents the amount of fields the snake should move on the x-axis per tick.
 * y is the same but for the y-axis.
 * Both of these values can be negative to make the snake move backwards.
 */
const Direction = {
    UP: {x: 0, y: -1},
    DOWN: {x: 0, y: 1},
    LEFT: {x: -1, y: 0},
    RIGHT: {x: 1, y: 0}
}

/**
 * This is the baseclass for anything on the snake grid.
 * It holds an x and y coordinate.
 */
class Element {
    /**
     * This constructor sets the initial values for x and y.
     * @param x The initial x value.
     * @param y The initial y value.
     */
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

/**
 * This class represents all the pieces of the snake which aren't the head or the pickup.
 * They will be a new one instantiated whenever the snake consumes a pickup.
 *
 * These tail elements work by being spawned at the same location as the previous tail element without moving the next tick.
 */
class Tail extends Element {
    /**
     * This constructor creates a new tail element at the location of the previous element.
     * @param parent The previous element of the snake. This can be both the head or another tail.
     */
    constructor(parent) {
        super(parent.x, parent.y)
        this.parent = parent
        this.wait = true
    }

    /**
     * This method moves the tail to the location of the previous element.
     * If the tailpiece was just spawned it waits the first movement tick and begins to move on the second one to prevent the tailpieces from being in the same place for the entire game.
     */
    move() {
        if (!this.wait) {
            this.x = this.parent.x
            this.y = this.parent.y
        } else this.wait = false
    }
}

/**
 * This is the head of the snake.
 * Instead of moving to a parent element like the snake tails it moves in a direction given.
 */
class Head extends Element {
    /**
     * This constructor sets the initial x and y coordinates as well as the initial direction.
     * @param x Initial x.
     * @param y Initial y.
     * @param dir Initial direction.
     */
    constructor(x, y, dir) {
        super(x, y);
        this.dir = dir
    }

    /**
     * This method moves the head by adding the x and y component of the direction to the heads location.
     */
    move() {
        this.x += this.dir.x
        this.y += this.dir.y
    }
}

/**
 * This is the little pickup the snake has to eat to grow.
 * It spawns at a random location on the board.
 */
class Pickup extends Element {
    /**
     * Spawns the pickup at a random location on the board.
     */
    constructor() {
        super(randomX(), randomY());
    }

    /**
     * Moves the pickup to a random location on the board.
     */
    move() {
        this.x = randomX()
        this.y = randomY()
    }
}

/**
 * This class manages all the tails, the head and the pickup of the snake.
 */
class Snake {
    /**
     * This creates a new snake with its head at these coordinates.
     * @param x The initial x location.
     * @param y The initial y location.
     * @param dir The initial direction.
     */
    constructor(x, y, dir) {
        this.head = new Head(x, y, dir)
        this.pickup = new Pickup()
        this.tails = []
        this.initX = x
        this.initY = y
        this.initDir = dir
    }

    /**
     * This method calls all the move methods of the different snake elements one by one to make the snake move correctly.
     */
    move() {
        if (this.tails.length > 0) {
            let current = this.tails[this.tails.length - 1]
            while (!(current instanceof Head)) {
                current.move()
                current = current.parent
            }
        }
        this.head.move()
    }

    /**
     * This method creates a new tail element and adds it to the snake.
     */
    addTail() {
        let parent = this.tails.length === 0 ? this.head : this.tails[this.tails.length - 1];
        this.tails.push(new Tail(parent))
    }

    /**
     * This method resets the snake to the starting position and deletes the score.
     */
    reset() {
        while (this.tails.length > 0) this.tails.pop()
        this.head.x = this.initX
        this.head.y = this.initY
        this.head.dir = this.initDir
        score = 0
    }
}

/**
 * This util function calculates the x or y pixel component associated with an x or y box element coordinate.
 * @param element The element component.
 * @returns {number} The pixel of the top-left corner of the canvas.
 */
function ptc(element) {
    return element * ELEMENT_SIZE + 10
}

let score = 0
let highscore = 0
const SNAKE = new Snake(GRID_WIDTH / 2, GRID_HEIGHT / 2, Direction.RIGHT)
const INPUT_QUEUE = []

/**
 * This method attempts to load the previous highscore from the website cookies.
 */
function loadHighscore() {
    if (getCookie('hs') !== '') {
        highscore = parseInt(getCookie('hs'))
    }
}

/**
 * This method loads, if available, a new direction from the queue and applies it to the snake.
 */
function updateDir() {
    if (INPUT_QUEUE.length > 0) {
        SNAKE.head.dir = INPUT_QUEUE.shift()
    }
}

/**
 * This method checks if the snake collides with the pickup and moves the pickup after the collision,
 */
function checkPickupCollision() {
    if (SNAKE.head.x === SNAKE.pickup.x && SNAKE.head.y === SNAKE.pickup.y) {
        SNAKE.pickup.move()
        SNAKE.addTail()
        score++
        if (score > highscore) setCookie('hs', ++highscore, 365)
    }
}

/**
 * This method checks if the snake collided with itself and resets it if a collision occurred.
 */
function checkSelfCollision() {
    if (SNAKE.tails.filter(t => t.x === SNAKE.head.x && t.y === SNAKE.head.y).filter(t => !t.wait).length > 0) {
        SNAKE.reset()
    }
}

/**
 * This method checks if the snake collided with a wall and resets it if a collision occurred.
 */
function checkWallCollision() {
    if (SNAKE.head.x < 0 || SNAKE.head.x >= GRID_WIDTH || SNAKE.head.y < 0 || SNAKE.head.y >= GRID_HEIGHT) {
        SNAKE.reset()
    }
}

/**
 * This method is responsible for drawing all the different elements to the screen.
 */
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

    document.getElementById('score').innerHTML = 'Score: ' + score + '<br>Highscore: ' + highscore
}

/**
 * This is the main gameloop of the snake game.
 */
function loop() {
    updateDir()
    SNAKE.move()
    checkPickupCollision()
    checkWallCollision()
    checkSelfCollision()
    draw()
    setTimeout(loop, 250)
}

/**
 * This is a keylistener which checks if the key pressed is associated with a direction.
 * If that's the case and the direction isn't a 180° turn to the previous direction in the queue the direction will be added to the queue.
 */
document.addEventListener('keypress', event => {
    function changeDir(newDir) {
        let last = null
        if (INPUT_QUEUE.length > 0) last = INPUT_QUEUE[INPUT_QUEUE.length - 1]
        else last = SNAKE.head.dir
        if (newDir.x + last.x !== 0 || newDir.y + last.y !== 0) {
            if (INPUT_QUEUE.length < 4) {
                INPUT_QUEUE.push(newDir)
            }
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

/**
 * Loading the highscore.
 */
loadHighscore()
/**
 * Starting the gameloop.
 */
loop()
