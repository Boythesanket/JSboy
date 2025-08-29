let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll('.choice');
const msg = document.querySelector('#msg');
const userScorePara = document.querySelector('#my-score');
const CompScorePara = document.querySelector('#comp-score');
const resetBtn = document.querySelector('#reset');

let resetGame = () => {
    resetBtn.addEventListener('click', () => {
        userScore = 0;
        compScore = 0;
        userScorePara.innerText = 0;
        CompScorePara.innerText = 0;
        msg.classList.remove('win', 'lose', 'draw');
        msg.classList.add('reset-msg');
        msg.innerText = "Game reset. Play again!";

    });
}

resetGame();

const genCompChoice = () => {
    let moves = ['rock', 'paper', 'scissor'];
    let idx = Math.floor(Math.random() * 3);
    return moves[idx];
}

const drawGame = () => {
    msg.innerText = 'Game was draw.';
    msg.classList.remove('lose');
    msg.classList.remove('win');
    msg.classList.add('draw');
    msg.classList.remove('reset-msg');
}

const showWinner = (userWin) => {
    if (userWin) {
        msg.innerText = 'You win';
        msg.classList.add('win');
        msg.classList.remove('lose');
        msg.classList.remove('draw');
        msg.classList.remove('reset-msg');
        userScore++;
        userScorePara.innerText = userScore;
    } else {
        msg.innerText = 'You Lose';
        msg.classList.add('lose');
        msg.classList.remove('win');
        msg.classList.remove('draw');
        msg.classList.remove('reset-msg');
        compScore++;
        CompScorePara.innerText = compScore;
    }
}

const playGame = (userChoice) => {
    console.log('userchoice = ', userChoice);
    const compChoice = genCompChoice();
    console.log('comp choice = ', compChoice);

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === 'rock') {
            userWin = compChoice === 'paper' ? false : true;
        } else if (userChoice === 'paper') {
            userWin = compChoice === 'scissor' ? false : true;
        } else {
            userWin = compChoice === 'rock' ? false : true;
        }
        showWinner(userWin);
    }
};

choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute('id');
        playGame(userChoice);
    });
});