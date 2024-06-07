const slider = document.querySelector(".slides");
const images = [...document.querySelectorAll(".slide")];
let steps = 0;

setInterval(function () {
  let widthAvailable = slider.offsetWidth;
  console.log(widthAvailable);
  steps++;

  if (steps > images.length - 1) {
    steps = 0;
  }

  slider.style.transform = `translateX(${-steps * widthAvailable}px)`;
}, 4000);
