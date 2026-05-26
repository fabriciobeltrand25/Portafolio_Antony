/* =============================================
   PORTFOLIO FABRICIO ANTONIO — main.js
   Bootstrap 5 Edition
============================================= */

/* ─────────────────────────────
   1. CURSOR PERSONALIZADO
───────────────────────────── */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorDot) {
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  }
});

// Ring sigue al cursor con lag suave
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (cursorRing) {
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
  }
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover effect en elementos interactivos
document.querySelectorAll(
  'a, button, .tool-icon-box, .bento-card, .stat-card, .hero-card, .social-btn'
).forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing && cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing && cursorRing.classList.remove('hover'));
});


/* ─────────────────────────────
   2. SCROLL PROGRESS BAR
───────────────────────────── */
const progressBar = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const docEl   = document.documentElement;
  const scrolled = (docEl.scrollTop || document.body.scrollTop);
  const total    = docEl.scrollHeight - docEl.clientHeight;
  if (progressBar) progressBar.style.width = ((scrolled / total) * 100) + '%';
}, { passive: true });


/* ─────────────────────────────
   3. NAVBAR AL HACER SCROLL
───────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });


/* ─────────────────────────────
   4. LINK ACTIVO EN NAVBAR
───────────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}, { passive: true });


/* ─────────────────────────────
   5. SMOOTH SCROLL
───────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Cierra el menú mobile de Bootstrap
    const navCollapse = document.getElementById('navMenu');
    if (navCollapse && navCollapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
      if (bsCollapse) bsCollapse.hide();
    }
  });
});


/* ─────────────────────────────
   6. REVEAL ON SCROLL
───────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Dejar de observar después de animar (performance)
      // revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});


/* ─────────────────────────────
   7. SKILL BARS ANIMADAS
───────────────────────────── */
const skillBarObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.dataset.width;
      entry.target.style.width = width + '%';
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.skill-bar-fill').forEach(bar => {
  skillBarObserver.observe(bar);
});


/* ─────────────────────────────
   8. COUNTER ANIMATION (stats)
───────────────────────────── */
function animateCounter(el, target, suffix = '') {
  if (el.dataset.counted) return;
  el.dataset.counted = '1';
  let current   = 0;
  const duration = 1400;
  const steps    = 60;
  const increment = target / steps;
  const interval  = duration / steps;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
  }, interval);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('.stat-num');
      if (!numEl || numEl.textContent === '∞') return;
      const raw    = numEl.textContent.trim();
      const target = parseInt(raw);
      const suffix = raw.replace(String(target), '');
      animateCounter(numEl, target, suffix);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => statObserver.observe(card));


/* ─────────────────────────────
   9. BENTO CARD SPOTLIGHT GLOW
───────────────────────────── */
document.querySelectorAll('.bento-card, .hero-card, .stat-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--my', (e.clientY - rect.top)  + 'px');
  });
});


/* ─────────────────────────────
   10. HERO PARALLAX SUTIL
───────────────────────────── */
const heroSection = document.querySelector('#home');

window.addEventListener('scroll', () => {
  if (!heroSection) return;
  const scroll = window.scrollY;
  const grid   = heroSection.querySelector('.hero-grid');
  if (grid) grid.style.transform = `translateY(${scroll * 0.15}px)`;
}, { passive: true });


/* ─────────────────────────────
   11. FORMULARIO DE CONTACTO
───────────────────────────── */
const contactForm   = document.getElementById('contactForm');
const sendBtn       = document.getElementById('sendBtn');
const btnText       = document.getElementById('btnText');
const btnLoading    = document.getElementById('btnLoading');
const formFeedback  = document.getElementById('formFeedback');

function showFeedback(message, type) {
  if (!formFeedback) return;
  formFeedback.textContent  = message;
  formFeedback.className    = 'form-feedback ' + type;
  formFeedback.style.display = 'block';
  setTimeout(() => { formFeedback.style.display = 'none'; }, 5000);
}

function setLoading(loading) {
  if (loading) {
    btnText.style.display    = 'none';
    btnLoading.style.display = 'inline-flex';
    sendBtn.disabled = true;
  } else {
    btnText.style.display    = 'inline-flex';
    btnLoading.style.display = 'none';
    sendBtn.disabled = false;
  }
}

function validateForm() {
  const nombre  = document.getElementById('inputNombre');
  const email   = document.getElementById('inputEmail');
  const asunto  = document.getElementById('inputAsunto');
  const mensaje = document.getElementById('inputMensaje');

  if (!nombre.value.trim()) {
    nombre.focus();
    showFeedback('⚠ Por favor ingresa tu nombre.', 'error');
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    email.focus();
    showFeedback('⚠ Ingresa un email válido.', 'error');
    return false;
  }
  if (!asunto.value.trim()) {
    asunto.focus();
    showFeedback('⚠ Indica el asunto del mensaje.', 'error');
    return false;
  }
  if (mensaje.value.trim().length < 10) {
    mensaje.focus();
    showFeedback('⚠ El mensaje debe tener al menos 10 caracteres.', 'error');
    return false;
  }
  return true;
}

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    /*
      ─── INTEGRACIÓN REAL ───────────────────────────────
      Puedes conectar este form con:

      A) Formspree (gratis, sin backend):
         const res = await fetch('https://formspree.io/f/TU_ID', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             nombre:  document.getElementById('inputNombre').value,
             email:   document.getElementById('inputEmail').value,
             asunto:  document.getElementById('inputAsunto').value,
             mensaje: document.getElementById('inputMensaje').value
           })
         });
         if (res.ok) { ... éxito ... }

      B) EmailJS (envío desde el cliente):
         emailjs.send('SERVICE_ID', 'TEMPLATE_ID', { ... })

      C) Tu propio backend PHP / Node.js
      ───────────────────────────────────────────────────
    */

    // SIMULACIÓN: espera 1.5s y muestra éxito
    await new Promise(resolve => setTimeout(resolve, 1500));

    setLoading(false);
    showFeedback('✓ ¡Mensaje enviado! Te responderé pronto.', 'success');
    contactForm.reset();
  });
}


/* ─────────────────────────────
   12. ANIMACIÓN INPUT FOCUS
───────────────────────────── */
document.querySelectorAll('.form-input-custom').forEach(input => {
  input.addEventListener('focus', () => {
    const icon = input.parentElement.querySelector('.input-icon');
    if (icon) icon.style.color = 'var(--accent)';
  });
  input.addEventListener('blur', () => {
    const icon = input.parentElement.querySelector('.input-icon');
    if (icon) icon.style.color = 'var(--text-secondary)';
  });
});


/* ─────────────────────────────
   13. CONSOLE SIGNATURE
───────────────────────────── */
console.log(
  '%c⚡ FABRICIO ANTONIO — Portfolio v2.0\n%cBootstrap 5 + Premium Animations\nOpen to Work 🚀',
  'color:#10b981;font-weight:700;font-size:15px;',
  'color:#94a3b8;font-size:12px;'
);