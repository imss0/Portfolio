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

/*navbar toggle*/
const navbarMenu = document.querySelector(".navbar__menu");
const navbarBtn = document.querySelector(".navbar__btn");
navbarBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

/* handle scrolling*/
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}

navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link);
  navbarMenu.classList.remove("open");
});

const contactBtn = document.querySelector(".about__contact");
contactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// show arrow button when scrolling down
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

// scrolling when click arrow button
arrowBtn.addEventListener("click", () => {
  scrollIntoView("#about");
});

// scroll section -> activate nav
const sectionIds = ["#about", "#skills", "#projects", "#contact"];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((item) =>
  document.querySelector(`[data-link="${item}"]`)
);

let selectedNavItem = navItems[0];
let selectedNavIndex;
function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("scroll", () => {
  selectNavItem(navItems[selectedNavIndex]);
});

/* copy to clipboard*/
const clipboard = new ClipboardJS(".contact__email__text");
clipboard.on("success", function (e) {
  document.getElementById("copy__email").innerText = "Copied!";
  setTimeout(function () {
    document.getElementById("copy__email").innerText = "Click email to copy";
  }, 1200);
  e.clearSelection();
});

clipboard.on("error", function (e) {
  alert("copy failed");
});
