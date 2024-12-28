function firstPageAnim(){
    var t1 = gsap.timeline();
    t1.from("#nav",{
            y:'-10',
            opacity: 0,
            duration: 2,
            ease: Expo.easeInOut
    })
    .to(".boundingElem",
        {
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,
            delay: -.1,
            stagger: .2
        }
    )
    .from("#heroFooter",
        {
            y: -10,
            ease: Expo.easeInOut,
            opacity:  0,
            delay: -1.2,
            duration: 2,
        }
    )
    
}


function circleMouseFollower(){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#miniCircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
    })
}

function circleMouseFollower() {
    
}
circleMouseFollower();
firstPageAnim();