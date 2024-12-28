// Variable to store timeout for mousemove event handling
var timeout;

// Initialize Locomotive Scroll with smooth scrolling on the #main element
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// Function to animate the first page elements
function firstPageAnim() {
  var tl = gsap.timeline();

  // Animate navigation bar with a slide-down effect
  tl.from("#nav", {
    y: "-10", // Initial position is slightly above
    opacity: 0, // Start with transparency
    duration: 1.5, // Duration of the animation
    ease: Expo.easeInOut, // Smooth easing effect
  })
    // Animate bounding elements to their original position
    .to(".boundingElem", {
      y: 0, // Reset vertical position
      ease: Expo.easeInOut, // Smooth easing effect
      duration: 2, // Duration of the animation
      delay: -1, // Overlap with the previous animation
      stagger: 0.2, // Stagger animation for each element
    })
    // Animate hero footer section with a fade-in and slide-up effect
    .from("#heroFooter", {
      y: -10, // Initial position is slightly above
      opacity: 0, // Start with transparency
      duration: 1.5, // Duration of the animation
      delay: -1, // Overlap with the previous animation
      ease: Expo.easeInOut, // Smooth easing effect
    });
}

// Function to handle cursor scaling and positioning based on mouse movement
function circleChaptaKaro() {
  var xscale = 1; // Default horizontal scale
  var yscale = 1; // Default vertical scale
  var xprev = 0; // Store previous X position of the cursor
  var yprev = 0; // Store previous Y position of the cursor

  // Add event listener for mousemove
  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout); // Clear the timeout for delayed reset

    // Calculate scale based on the difference between current and previous positions
    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX; // Update previous X position
    yprev = dets.clientY; // Update previous Y position

    // Call the function to update cursor scaling
    circleMouseFollower(xscale, yscale);

    // Reset cursor scale after 100ms
    timeout = setTimeout(function () {
      document.querySelector(
        "#miniCircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

// Function to update cursor scaling dynamically
function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#miniCircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

// Initialize custom cursor behavior and animations
circleChaptaKaro();
circleMouseFollower();
firstPageAnim();

// Add event listeners to all elements with the class "elem"
document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0; // Initialize rotation angle
  var diffrot = 0; // Initialize rotation difference

  // Event listener for mouse leaving the element
  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0, // Fade out the image
      ease: Power3, // Smooth easing effect
    });
  });

  // Event listener for mouse moving over the element
  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top; // Calculate vertical distance
    diffrot = dets.clientX - rotate; // Calculate rotation difference
    rotate = dets.clientX; // Update rotation angle

    gsap.to(elem.querySelector("img"), {
      opacity: 1, // Fade in the image
      ease: Power3, // Smooth easing effect
      top: diff, // Move image vertically based on mouse position
      left: dets.clientX, // Move image horizontally based on mouse position
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.8), // Rotate the image within bounds
    });
  });
});

// Function to display the current time in IST
function currTime() {
  var time = document.getElementById("time");
  var t = new Date();

  // Update the time element with the current hours and minutes
  time.innerHTML = `${t.getHours()} : ${t.getMinutes()} IST`;
}

// Call the time function to display the initial time
currTime();
