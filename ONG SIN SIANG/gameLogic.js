

const GAME_SPEED = 100; //100 milliseconds
const CANVAS_BORDER_COLOUR = 'solid black' ;
const CANVAS_BACKGROUND_COLOUR = 'burlywood';
const SNAKE_COLOUR = 'lightgreen';
const SNAKE_BORDER_COLOUR = 'darkgreen';
const FOOD_COLOUR = 'red';
const FOOD_BORDER_COLOUR = 'darkred';




// Representing the Snake's Location
let snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 }

]

// Gamer's Score
let score = 0;

// Direction
let changingDirection = false;



//food
let foodX;
let foodY;

// Horizontal and vertical velocity
let dx = 10;
let dy = 0;

// Canvas Element
const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext("2d");

// Start Game
main();
//window.alert("Ready"); // Experimenting

createFood();
document.addEventListener("keydown", changeDirection);



// Function of the maIN GAME
function main() {
    if (didGameEnd()) {
        window.alert('Better Luck Next Time!!');
     



        return;  // take note
    }
    setTimeout(function onTick() {
        changingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();

        //Call Game Main
        main();
    }, GAME_SPEED) // timeout - 100ms elapsed
}

// Changing the colour of the canvas, specifically background color
function clearCanvas() {
    ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
    ctx.strokeStyle = CANVAS_BORDER_COLOUR;

    ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
    ctx.strokeRect(0, 0, gameBoard.width, gameBoard.height);
}

function drawFood() {
    ctx.fillStyle = FOOD_COLOUR;
    ctx.strokeStyle = FOOD_BORDER_COLOUR;
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

function advanceSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // when the snake eats, the user score points
    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if (didEatFood) {
        score += 10;
        document.getElementById("ScoreBoard").innerHTML = score;

        createFood();
    } else {
        snake.pop();
    }
}




function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameBoard.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameBoard.height - 10;
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}


function randomTen(min, max) {
    return Math.round((Math.random() * (max-min) + min) /10)* 10;
}

function createFood() {
    // Randomise the location of the food
    foodX = randomTen(0, gameBoard.width - 10);
    foodY = randomTen(0, gameBoard.height - 10);

    snake.forEach(function isFoodOnSnake(part) {
        const foodIsoNsnake = part.x == foodX && part.y == foodY;
        if (foodIsoNsnake) createFood();

    });
}


function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = SNAKE_COLOUR;
    ctx.strokeStyle = SNAKE_BORDER_COLOUR;
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}




function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.keyCode;

    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}

