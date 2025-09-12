let password = document.querySelector('#password');
let eyeicon = document.querySelector('#eyeicon');

eyeicon.addEventListener('click', () => {
    if(password.type == 'password'){
        password.type = 'text';
        eyeicon.setAttribute('src', 'https://cdn-icons-png.flaticon.com/128/2767/2767146.png');
    } else {
        password.type = 'password';
        eyeicon.setAttribute('src', 'https://cdn-icons-png.flaticon.com/128/709/709612.png');
    }
});