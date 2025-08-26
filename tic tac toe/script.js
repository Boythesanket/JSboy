let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('#reset');
let newGame = document.querySelector('.new-game');
let msgBox = document.querySelector('.msg-box');
let msg = document.querySelector('#msg');


let turnO = true;

let winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];


boxes.forEach((box) => {
    box.addEventListener('click', () => {
        console.log(box);
        if(turnO) {
            box.innerText = 'O';
            turnO = false;
        } else{
            box.innerText = 'X';
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    })
});

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgBox.classList.add('hide');
};


const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = '';
    }
}

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgBox.classList.remove('hide'); 
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != '' && pos2Val != '' && pos3Val != '') {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
    
}

newGame.addEventListener('click', resetGame);
reset.addEventListener('click', resetGame);
