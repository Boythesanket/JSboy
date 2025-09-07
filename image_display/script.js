

function throttle(fn, delay) {
    let isThr = false;

    return function (...args) {
        if (!isThr) {
            fn.apply(this, args);
            isThr = true;

            setTimeout(() => {
                isThr = false;
            }, delay);
        }
    };
}

let box = document.querySelector('.center').addEventListener('mousemove', throttle((e) => {
    console.log('Scroll event triggered!');

    let div = document.createElement('div');
    div.classList.add('imgDiv');
    div.style.left = e.clientX + 'px';
    div.style.top = e.clientY + 'px';

    let images = [
        'https://images.unsplash.com/photo-1757050888249-2d32505646cd?q=80&w=366&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1756990637536-714b76296a30?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1756578903633-a3fee9956c78?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1753998218460-4bbac7c9fc5e?q=80&w=415&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1756181211518-0118bf069878?q=80&w=397&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1755418486211-9d5929884e19?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ];

    let randomIndex = Math.floor(Math.random() * images.length); // Random index from 0 to 5
    let randomImage = images[randomIndex]; // Pick random image

    let img = document.createElement('img');
    img.setAttribute('src', randomImage);
    div.appendChild(img);

    document.body.appendChild(div);

    gsap.to(img, {
        y: '0',
        ease: Power2,
        duration: .3
    });

    gsap.to(img, {
        y: '100%',
        ease: Power2,
        duration: 1,
        delay: .3
    })

    setTimeout(function () {
        div.remove();
    }, 800);

}, 100));