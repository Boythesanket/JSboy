const box = document.querySelector('#center');

box.addEventListener('mousemove', (e) => {
    let boxLocation = box.getBoundingClientRect();
    let insideBox = e.clientX - boxLocation.left;

    if(insideBox < boxLocation.width / 2){
        let GreenColor = gsap.utils.mapRange(0, boxLocation.width / 2, 255, 0, insideBox);
        gsap.to(box, {
            backgroundColor: `rgb(0, ${GreenColor}, 0)`,
            ease: Power4,
        });
         
    } else {
        let BlueColor = gsap.utils.mapRange(boxLocation.width / 2,boxLocation.width , 0, 255, insideBox);
        gsap.to(box, {
            backgroundColor: `rgb(0, 0, ${BlueColor})`,
            ease: Power4,
        });
        
    }
});

box.addEventListener('mouseleave', () => {
    gsap.to(box, {
        backgroundColor: 'white',
    })
});


