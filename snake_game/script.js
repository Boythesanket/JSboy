let board = document.querySelector('.board');
const startBtn = document.querySelector('.btn-start');
const over = document.querySelector('.over');
const gameStartScreen = document.querySelector('.start-game');
const gameOverScreen = document.querySelector('.game-over');
const gameRestartButton = document.querySelector('.btn-over');
let highScoreElem = document.getElementById('hscore');
let scoreElem = document.getElementById('score');
let timeElem = document.getElementById('time');

let blockHeight = 30;
let blockWidth = 30;
let highScore = localStorage.getItem('highScore') || 0;
let score = 0;
let time = `00-00`;

highScoreElem.innerText = highScore;

let rows = Math.floor(board.clientHeight / blockHeight);
let cols = Math.floor(board.clientWidth / blockWidth);

let blocks = [];
let snake = [
    { x: 1, y: 3 }
];
let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };

let direction = 'right';
let intervalId = null;
let timeIntervalId = null;

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        let block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }
}

function render() {

    let head = null;

    blocks[`${food.x}-${food.y}`].classList.add('food');

    if (direction === 'left') {
        head = { x: snake[0].x, y: snake[0].y - 1 };
    } else if (direction === 'right') {
        head = { x: snake[0].x, y: snake[0].y + 1 };
    } else if (direction === 'down') {
        head = { x: snake[0].x + 1, y: snake[0].y };
    } else if (direction === 'up') {
        head = { x: snake[0].x - 1, y: snake[0].y };
    }

    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        clearInterval(intervalId);

        over.style.display = 'flex';
        gameStartScreen.style.display = 'none';
        gameOverScreen.style.display = 'flex';

        return;

    }

    if (head.x == food.x && head.y == food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove('food');
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
        blocks[`${food.x}-${food.y}`].classList.add('food');
        snake.unshift(head);

        score += 10;
        scoreElem.textContent = score;
    }

    let startCheckIndex = 0;
    if (snake.length && snake[0].x === head.x && snake[0].y === head.y) {
        startCheckIndex = 1;
    }

    for (let i = startCheckIndex; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            clearInterval(intervalId);
            clearInterval(timeIntervalId);
            over.style.display = 'flex';
            gameStartScreen.style.display = 'none';
            gameOverScreen.style.display = 'flex';
            return;
        }
    }
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill');
    });

    snake.unshift(head);
    snake.pop();

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add('fill');
    });
}

intervalId = setInterval(() => {
}, 100);


startBtn.addEventListener('click', () => {
    over.style.display = 'none';
    intervalId = setInterval(() => { render() }, 100);
    timeIntervalId = setInterval(() => {
        let [min, sec] = time.split('-').map(Number);

        if (sec == 59) {
            min += 1;
            sec = 0
        } else {
            sec += 1;
        }

        time = `${min}-${sec}`;
        timeElem.innerText = time;
        
    }, 1000);
});


function restartGame() {

    blocks[`${food.x}-${food.y}`].classList.remove('food');
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill');
    });

    over.style.display = 'none';
    snake = [{ x: 1, y: 3 }];
    direction = 'down';
    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
    score = 0;
    time = `00-00`
    timeElem.innerText = time;
    scoreElem.textContent = score;
    highScoreElem.innerText = highScore;
    intervalId = setInterval(() => { render() }, 100);
}

gameRestartButton.addEventListener('click', restartGame);

addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w') {
        direction = 'up';
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        direction = 'right';
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        direction = 'left';
    } else if (e.key === 'ArrowDown' || e.key === 's') {
        direction = 'down';
    }
});
