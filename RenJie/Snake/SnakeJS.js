
const EASY = 150;
const MED = 100;
const HARD = 50;
const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = "white";
const SNAKE_COLOUR = 'lightgreen';
const SNAKE_BORDER_COLOUR = 'darkgreen';
const FOOD_COLOUR = 'red';
const FOOD_BORDER_COLOUR = 'darkred';

let snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 }
]

// The game speed
let GAME_SPEED = MED;
// The user's scores
let highscore = 0;
let score = 0;
// When set to true the snake is changing direction
let changingDirection = false;
// Food x-coordinate
let foodX;
// Food bonus x-coordinate
let bonusFoodX;
// Food y-coordinate
let foodY;
// Food bonus y-coordinate
let bonusFoodY;
// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0;
// Pause boolean variable
let paused = true;
// counter is to allow for bonusFood to extend snake length by >1, counter = 2 means
// that snake length is extended by 2
let counter = 0;
// foodcounter is number of game iterations till bonusFood respawns somewhr else
let foodcounter = 16;

// Get the canvas element
const gameCanvas = document.getElementById("gameCanvas");
// Return a two dimensional drawing context
const ctx = gameCanvas.getContext("2d");

// this sets the starting page of snake, "press 's' to start game"
beforeStart();

// Start game
main();
// Create the first food location
createFood();
createBonusFood();

document.addEventListener('keydown', function (e) {
    var key = e.key;
    if (key == 'p')// p key
    {
        togglePause();
        main();
    }

    else if (key == 's')
    {
        if (paused) {
            paused = false;
            main();
        }

    }
    else if (key == 'r')
    {
        if (didGameEnd()) {
            paused = false;
            dx = 10;
            dy = 0;
            snake = [
                { x: 150, y: 150 },
                { x: 140, y: 150 },
                { x: 130, y: 150 },
                { x: 120, y: 150 },
                { x: 110, y: 150 }
            ]
            score = 0;
            document.getElementById('score').innerHTML = "Score:<br />" + score;
            main();
            createFood();
            createBonusFood();

        }

    }
    changeDirection(e);

});


/**
    * Main function of the game
    * called repeatedly to advance the game
    */
function main() {
    // If the game ended return early to stop game
    if (didGameEnd()) {

        afterEnd();
        return
    };
    // If game is paused do not allow for the the below statements to be executed
    if (paused) {
        return;
    }
    setTimeout(function onTick() {
        
        changingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        drawPaused();
        foodcounter -= 1;

        // Call game again
        main();
    }, GAME_SPEED)

}

/**
    * Change the background colour of the canvas to CANVAS_BACKGROUND_COLOUR and
    * draw a border around it
    */
function clearCanvas() {

    
    //  Select the colour to fill the drawing
    ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
    //  Select the colour for the border of the canvas
    ctx.strokestyle = CANVAS_BORDER_COLOUR;

    // Draw a "filled" rectangle to cover the entire canvas
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    // Draw a "border" around the entire canvas
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);

}

/**
    * Draw the food on the canvas
    */
function drawFood() {
    // draw food
    ctx.fillStyle = FOOD_COLOUR;
    ctx.strokestyle = FOOD_BORDER_COLOUR;
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);

    // draw bonusFood
    ctx.fillStyle = 'purple';
    ctx.strokestyle = 'purple';
    ctx.fillRect(bonusFoodX, bonusFoodY, 10, 10);
    ctx.strokeRect(bonusFoodX, bonusFoodY, 10, 10);

}

/**
    * Advances the snake by changing the x-coordinates of its parts
    * according to the horizontal velocity and the y-coordinates of its parts
    * according to the vertical veolocity
    */
function advanceSnake() {
    // Create the new Snake's head
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    // Add the new head to the beginning of snake body
    snake.unshift(head);
    

    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    const didEatBonusFood = snake[0].x === bonusFoodX && snake[0].y === bonusFoodY;
    if (didEatFood) {
        // Increase score
        score += 10;
        // Display score on screen
        document.getElementById('score').innerHTML = 'Score:<br />' + score;
        if (score >= highscore) {
            highscore = score;
        }
        document.getElementById('highscore').innerHTML = 'High Score:<br />' + highscore;

        // Generate new food location
        createFood();
        /*createBonusFood();*/
    } else if (didEatBonusFood) {
        // Increase score
        score += 20;
        // Display score on screen
        document.getElementById('score').innerHTML = 'Score:<br />' + score;
        if (score >= highscore) {
            highscore = score;
        }
        document.getElementById('highscore').innerHTML = 'High Score:<br />' + highscore;
        //for foodcounter

        // Generate new food location
        createBonusFood();
        counter += 2;
    }

    else {
        // Remove the last part of snake body
        if (foodcounter <= 0) {
            createBonusFood();
        }
        if (counter == 0) {
            snake.pop();
        }
        else {
            counter -= 1;
        }
        
    }

    

}

/**
    * Returns true if the head of the snake touched another part of the game
    * or any of the walls
    */
function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height - 10;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

/**
    * Generates a random number that is a multiple of 10 given a minumum
    * and a maximum number
    * @param { number } min - The minimum number the random number can be
    * @param { number } max - The maximum number the random number can be
    */
function randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

/**
    * Creates random set of coordinates for the snake food.
    */
function createFood() {
    // Generate a random number the food x-coordinate
    foodX = randomTen(0, gameCanvas.width - 10);
    // Generate a random number for the food y-coordinate
    foodY = randomTen(0, gameCanvas.height - 10);

    // if the new food location is where the snake currently is, generate a new food location
    snake.forEach(function isFoodOnSnake(part) {
        const foodIsoNsnake = part.x == foodX && part.y == foodY;
        if (foodIsoNsnake) createFood();
    });
}

function createBonusFood() {
    // Generate a random number the food x-coordinate

    bonusFoodX = randomTen(0, gameCanvas.width - 10);
    // Generate a random number for the food y-coordinate
    bonusFoodY = randomTen(0, gameCanvas.height - 10);

    // if the new food location is where the snake currently is, generate a new food location
    snake.forEach(function isFoodOnSnake(part) {
        const foodIsoNsnake = part.x == bonusFoodX && part.y == bonusFoodY;
        if (foodIsoNsnake) createBonusFood();

    });
    //next check
    if (foodX == bonusFoodX && foodY == bonusFoodY) {
        createBonusFood();
    }
    foodcounter = 16;
}

/**
    * Draws the snake on the canvas
    */
function drawSnake() {
    // loop through the snake parts drawing each part on the canvas
    snake.forEach(drawSnakePart)

}

function drawPaused() {
    if (paused == true) {
        ctx.fillStyle = "grey";
        ctx.font = "30px Times New Roman";
        ctx.textAlign = 'center';
        ctx.fillText("Paused", gameCanvas.width / 2, gameCanvas.height / 2);
    }
}

/**
    * Draws a part of the snake on the canvas
    * @param { object } snakePart - The coordinates where the part should be drawn
    */
function drawSnakePart(snakePart) {
    // Set the colour of the snake part
    ctx.fillStyle = SNAKE_COLOUR;

    // Set the border colour of the snake part
    ctx.strokestyle = SNAKE_BORDER_COLOUR;

    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);

    // Draw a border around the snake part
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

/**
    * Changes the vertical and horizontal velocity of the snake according to the
    * key that was pressed.
    * The direction cannot be switched to the opposite direction, to prevent the snake
    * from reversing
    * For example if the the direction is 'right' it cannot become 'left'
    * @param { object } event - The keydown event
    */
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    /**
    * Prevent the snake from reversing
    * Example scenario:
    * Snake is moving to the right. User presses down and immediately left
    * and the snake immediately changes direction without taking a step down first
    */
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

function togglePause() {
    if (!paused) {
        paused = true;
    } else {
        paused = false;
    }
}
function beforeStart() {

    changingDirection = false;
    //  Select the colour to fill the drawing
    ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
    //  Select the colour for the border of the canvas
    ctx.strokestyle = CANVAS_BORDER_COLOUR;

    // Draw a "filled" rectangle to cover the entire canvas
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    // Draw a "border" around the entire canvas
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
    /*drawFood();
    *//*advanceSnake();*//*
    drawSnake();*/

    ctx.fillStyle = "black";
    ctx.font = "14px Times New Roman";
    ctx.textAlign = 'center';
    ctx.fillText("Press 's' to start the game", gameCanvas.width / 2, gameCanvas.height / 2);
}
function afterEnd() {
    changingDirection = false;
    //  Select the colour to fill the drawing
    ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
    //  Select the colour for the border of the canvas
    ctx.strokestyle = CANVAS_BORDER_COLOUR;

    // Draw a "filled" rectangle to cover the entire canvas
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    // Draw a "border" around the entire canvas
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
    /*drawFood();
    *//*advanceSnake();*//*
    drawSnake();*/

    ctx.fillStyle = "black";
    ctx.font = "14px Times New Roman";
    ctx.textAlign = 'center';
    ctx.fillText("Press 'r' to restart the game", gameCanvas.width / 2, gameCanvas.height / 2);
    
}

function switchdiff() {
    switch (document.getElementById('selectSpd').value) {
        case 'easy':
            GAME_SPEED = EASY;
            break;
        case 'medium':
            GAME_SPEED = MED;
            break;
        case 'hard':
            GAME_SPEED = HARD;
            break;
    }

    
    

     
}