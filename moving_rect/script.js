window.addEventListener('mousemove', (e) => {

    let box = document.querySelector('#box');

    let xval = gsap.utils.mapRange(
        0,
        window.innerWidth,
        100 + box.getBoundingClientRect().width / 2,
        window.innerWidth - (100 + box.getBoundingClientRect().width),
        e.clientX
    );

    gsap.to('#box', {
        left: xval,
        ease: Power3
    });
});

gsap.utils.mapRange()