const passBox = document.querySelector('#password');
const copy = document.querySelector('#copy');
const generate = document.querySelector('.gen-pass');

const length = 12;

const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+?/><:;"{}[]~';

const allChar = uppercase + lowercase + numbers + symbols;

function genPass() {
    let password = '';
    while(length > password.length) {
        password += allChar[Math.floor(Math.random() * allChar.length)];
    }

    passBox.value = password;
}

function copyPass() {
    passBox.select();
    document.execCommand('copy');
}
