let textArea = document.querySelector('.text-area');
let textElement = document.querySelector('p');
let timer = document.querySelector('#timer');
let restartBtn = document.querySelector('#restart');
let wpmElement = document.getElementById("wpm");
let accuracyElement = document.getElementById("accuracy");
let originalText = textElement.textContent; // store original paragraph

let startTime;
let timerInterval;
let timeStarted = false;

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(() => {
        const currTime = new Date().getTime();
        const timeElapsed = ((currTime - startTime) / 1000).toFixed(2);
        timer.textContent = timeElapsed;
    }, 100);
}

function stopTimer() {
    clearInterval(timerInterval);
}

textArea.addEventListener('input', () => {
    const typedText = textArea.value;
    const paraText = originalText;

    if (!timeStarted && typedText.length > 0) {
        startTimer();
        timeStarted = true;
    }

    let displayText = '';
    let correctLetters = 0;

    for (let i = 0; i < paraText.length; i++) {
        if (i < typedText.length) {
            if (typedText[i] === paraText[i]) {
                displayText += `<span style="color: lightgreen;">${paraText[i]}</span>`;
                correctLetters++;
            } else {
                displayText += `<span style="color: red;">${paraText[i]}</span>`;
            }
        } else {
            displayText += `<span style="color: white;">${paraText[i]}</span>`;
        }
    }

    textElement.innerHTML = displayText;


    const timeElapsed = ((new Date().getTime() - startTime) / 1000) / 60; // in minutes
    const wordsTyped = typedText.trim().split(" ").length;
    const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    const accuracy = typedText.length > 0 ? Math.round((correctLetters / typedText.length) * 100) : 0;

    wpmElement.textContent = wpm;
    accuracyElement.textContent = accuracy;

    if (typedText === paraText) {
        stopTimer();
        textArea.disabled = true;
        alert(`🎉 Finished! WPM: ${wpm}, Accuracy: ${accuracy}%`);
    }

});

restartBtn.addEventListener('click', () => {
    stopTimer();
    timer.textContent = '0:00';
    textArea.value = '';
    textArea.disabled = false;
    timeStarted = false;
    textElement.innerHTML = originalText;
    wpmElement.textContent = 0;
    accuracyElement.textContent = 0;
});


