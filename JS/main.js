// ==========================================
// PORTFOLIO MAIN JS - FIXED VERSION
// ==========================================

// ===============================
// CUSTOM CURSOR
// ===============================
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

window.addEventListener("mousemove", (e) => {

  const posX = e.clientX;
  const posY = e.clientY;

  if(cursorDot){
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
  }

  if(cursorRing){
    cursorRing.style.left = `${posX}px`;
    cursorRing.style.top = `${posY}px`;
  }

});

// Hover effect
const hoverItems = document.querySelectorAll(
  "a, button, .tool-icon, .bento-card, .project-card"
);

hoverItems.forEach((item) => {

  item.addEventListener("mouseenter", () => {
    if(cursorRing){
      cursorRing.classList.add("hover");
    }
  });

  item.addEventListener("mouseleave", () => {
    if(cursorRing){
      cursorRing.classList.remove("hover");
    }
  });

});

// ===============================
// NAVBAR SCROLL
// ===============================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

  if(window.scrollY > 40){
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

});

// ===============================
// MOBILE MENU
// ===============================
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

if(navToggle){

  navToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");
    navToggle.classList.toggle("active");

  });

}

// Close mobile menu
document.querySelectorAll(".mobile-link").forEach((link) => {

  link.addEventListener("click", () => {

    mobileMenu.classList.remove("open");
    navToggle.classList.remove("active");

  });

});

// ===============================
// SMOOTH SCROLL
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function(e){

    e.preventDefault();

    const target = document.querySelector(
      this.getAttribute("href")
    );

    if(target){

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});

// ===============================
// ACTIVE NAV LINKS
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {

    const sectionTop = section.offsetTop - 200;

    if(scrollY >= sectionTop){
      current = section.getAttribute("id");
    }

  });

  navLinks.forEach((link) => {

    link.classList.remove("active");

    const href = link.getAttribute("href").replace("#","");

    if(href === current){
      link.classList.add("active");
    }

  });

});

// ===============================
// REVEAL ANIMATION
// ===============================
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if(entry.isIntersecting){

      entry.target.classList.add("visible");

    }

  });

},{
  threshold: 0.15
});

revealElements.forEach((el) => {
  revealObserver.observe(el);
});

// ===============================
// CERTIFICATES ANIMATION
// ===============================
const certElements = document.querySelectorAll(".reveal-cert");

const certObserver = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if(entry.isIntersecting){

      entry.target.classList.add("visible");

    }

  });

},{
  threshold: 0.2
});

certElements.forEach((cert) => {
  certObserver.observe(cert);
});

// ===============================
// SKILL BARS ANIMATION
// ===============================
const skillBars = document.querySelectorAll(".skill-fill");

const skillObserver = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if(entry.isIntersecting){

      const width = entry.target.dataset.width;

      entry.target.style.width = width + "%";

    }

  });

},{
  threshold: 0.5
});

skillBars.forEach((bar) => {
  skillObserver.observe(bar);
});

// ===============================
// CARD GLOW EFFECT
// ===============================
const cards = document.querySelectorAll(".bento-card");

cards.forEach((card) => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);

  });

});

// ===============================
// PARALLAX HERO
// ===============================
const heroSection = document.querySelector(".hero-section");

window.addEventListener("scroll", () => {

  const scroll = window.scrollY;

  if(heroSection){

    heroSection.style.backgroundPositionY =
      `${scroll * 0.3}px`;

  }

});

// ===============================
// PAGE LOADED
// ===============================
window.addEventListener("load", () => {

  document.body.classList.add("loaded");

});

// ===============================
// CONSOLE MESSAGE
// ===============================
console.log(`
███████╗ █████╗ ██████╗ ██████╗ ██╗ ██████╗██╗ ██████╗ 
██╔════╝██╔══██╗██╔══██╗██╔══██╗██║██╔════╝██║██╔═══██╗
█████╗  ███████║██████╔╝██████╔╝██║██║     ██║██║   ██║
██╔══╝  ██╔══██║██╔══██╗██╔══██╗██║██║     ██║██║   ██║
██║     ██║  ██║██████╔╝██║  ██║██║╚██████╗██║╚██████╔╝
╚═╝     ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝ ╚═════╝ 

Portfolio Loaded Successfully 🚀
`);