// ===============================
// PORTFOLIO JS - main.js
// ===============================

// ===== CURSOR PERSONALIZADO =====
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

window.addEventListener("mousemove", (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorRing.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    {
      duration: 250,
      fill: "forwards",
    }
  );
});

// Hover en links y botones
const hoverElements = document.querySelectorAll(
  "a, button, .tool-icon, .project-card, .bento-card"
);

hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorRing.classList.add("cursor-hover");
  });

  el.addEventListener("mouseleave", () => {
    cursorRing.classList.remove("cursor-hover");
  });
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("nav-scrolled");
  } else {
    navbar.classList.remove("nav-scrolled");
  }
});

// ===== MOBILE MENU =====
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Cerrar menú al hacer click
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===== LINKS ACTIVOS NAV =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 200;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.dataset.section === current) {
      link.classList.add("active");
    }
  });
});

// ===== REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.style.getPropertyValue("--delay");

        setTimeout(() => {
          entry.target.classList.add("active");
        }, parseFloat(delay || 0) * 1000);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((el) => {
  revealObserver.observe(el);
});

// ===== CERTIFICADOS ANIM =====
const certs = document.querySelectorAll(".reveal-cert");

const certObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("active");
        }, index * 200);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

certs.forEach((cert) => {
  certObserver.observe(cert);
});

// ===== SKILL BARS =====
const skillFills = document.querySelectorAll(".skill-fill");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        entry.target.style.width = width + "%";
      }
    });
  },
  {
    threshold: 0.5,
  }
);

skillFills.forEach((bar) => {
  skillObserver.observe(bar);
});

// ===== EFECTO TYPING HERO =====
const heroName = document.querySelector(".name-main");

if (heroName) {
  const originalText = heroName.innerHTML;

  heroName.innerHTML = "";

  let i = 0;

  function typeEffect() {
    if (i < originalText.length) {
      heroName.innerHTML += originalText.charAt(i);
      i++;
      setTimeout(typeEffect, 40);
    }
  }

  setTimeout(typeEffect, 500);
}

// ===== PARALLAX HERO =====
const heroSection = document.querySelector(".hero-section");

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  heroSection.style.backgroundPositionY = `${scroll * 0.5}px`;
});

// ===== EFECTO GLOW EN TARJETAS =====
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

// ===== TEXTO STATUS ANIMADO =====
const statusDot = document.querySelector(".status-dot");

setInterval(() => {
  statusDot.classList.toggle("pulse");
}, 1000);

// ===== PRELOADER SIMPLE =====
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ===== CONSOLE MESSAGE =====
console.log(`
██████╗ ███████╗██╗   ██╗
██╔══██╗██╔════╝██║   ██║
██║  ██║█████╗  ██║   ██║
██║  ██║██╔══╝  ╚██╗ ██╔╝
██████╔╝███████╗ ╚████╔╝
╚═════╝ ╚══════╝  ╚═══╝

Portfolio Loaded Successfully 🚀
`);