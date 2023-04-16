"use strict";

/* handle typing */
function typeWriter() {
  let i = 0;
  let txt = "I'm Sohyun, a Software Engineer!";
  return function type() {
    if (i < txt.length) {
      document.getElementById("typing").innerHTML += txt.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  };
}

let type = typeWriter();
type();

/* handle scrolling*/
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}

const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link);
});

const contactBtn = document.querySelector(".about__contact");
contactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

/* show arrow button when scrolling down */
const about = document.querySelector("#about");
const aboutHeight = about.getBoundingClientRect().height;
const arrowBtn = document.querySelector(".arrow-btn");
document.addEventListener("scroll", () => {
  if (window.scrollY > aboutHeight / 2) {
    arrowBtn.classList.add("visible");
  } else {
    arrowBtn.classList.remove("visible");
  }
});

/* scrolling when click arrow button */
arrowBtn.addEventListener("click", () => {
  scrollIntoView("#about");
});
