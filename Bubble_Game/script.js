
let countdown = 60;
let score = 0;
let hitNum = 0;

function getHit() {
    hitNum = Math.floor(Math.random()*10);
    document.querySelector('#hit').textContent = hitNum;
}

function increaseScore() {
    score+=10;
    document.querySelector('#score').textContent = score;
}

function makeBubbles() {
    let bubbles = '';

    for (let i = 1; i <= 144; i++) {
        let num = Math.floor(Math.random() * 10);
        bubbles += `<div class="bubble">${num}</div>`;
    }

    document.querySelector('.box-bottom').innerHTML = bubbles;
}

function runTimer() {
    let timer = setInterval(() => {
        if (countdown > 0) {
            countdown--;
            document.querySelector('#timer').textContent = countdown;
        } else {
            clearInterval(timer);
            document.querySelector('.box-bottom').innerHTML = `<h1>Game Over</h1>`;
        }

    }, 1000);
}

document.querySelector('.box-bottom').addEventListener('click', (e) => {
    let clickedBubble = Number(e.target.textContent);
    if(clickedBubble === hitNum){
        increaseScore();
        makeBubbles();
        getHit();
    }
});
    

getHit();
runTimer();
makeBubbles();