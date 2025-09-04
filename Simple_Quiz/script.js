const questions = [
    {
        question : 'Which is the largest animal in the world?',
        answers : [
            { text: 'Shark', correct: false},
            { text: 'Monkey', correct: false},
            { text: 'Elephant', correct: true},
            { text: 'Giraffe', correct: false},
        ]
    },
    {
        question : 'Which is the smallest country in the world?',
        answers : [
            { text: 'Nepal', correct: false},
            { text: 'Bhutan', correct: false},
            { text: 'Sri Lanka', correct: false},
            { text: 'Vatican City', correct: true},
        ]
    },
    {
        question : 'Which is the largest desert in the world?',
        answers : [
            { text: 'Sahara', correct: true},
            { text: 'Gobi', correct: false},
            { text: 'Thar', correct: false},
            { text: 'Gobi', correct: false},
        ]
    },
    {
        question : 'Which is the smallest continent in the world?',
        answers : [
            { text: 'Asia', correct: false},
            { text: 'Europe', correct: false},
            { text: 'Australia', correct: true},
            { text: 'Africa', correct: false},
        ]
    }

    
];

const questionText = document.querySelector('.question');
const nextBtn = document.querySelector('.next');
const answerBtns = document.querySelector('#answer-btns');

let questionNum = 0;
let score = 0;

function startQuiz() {
    questionNum = 0;
    score = 0;
    nextBtn.innerHTML = 'Next';
    showQuestions();
}

function showQuestions() {
    resetBtn();
    let currQues = questions[questionNum];
    let questionIndex = questionNum + 1;
    questionText.innerHTML = questionIndex + '. ' + currQues.question;

    currQues.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerBtns.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
       button.addEventListener('click', (e) => {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === 'true';
        if(isCorrect){
            selectedBtn.classList.add('correct');
            score++;
        } else{
            selectedBtn.classList.add('incorrect');
        }

        Array.from(answerBtns.children).forEach(button => {
            if(button.dataset.correct === 'true'){
                button.classList.add('correct');
            }
            button.disabled = true;
        });
        nextBtn.style.display = 'block';

       }); 
    });
}


function showScore(){
    resetBtn();
    questionText.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML = 'Play Again';
    nextBtn.style.display = 'block';
}

function handleNextBtn() {
    questionNum++;
    if(questionNum < questions.length){
        showQuestions();
    } else{
        showScore();
    }
}

nextBtn.addEventListener('click', () => {
    if(questionNum < questions.length){
        handleNextBtn();
    } else{
        startQuiz();
    }
})

function resetBtn() {
    nextBtn.style.display = 'none';
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

startQuiz();