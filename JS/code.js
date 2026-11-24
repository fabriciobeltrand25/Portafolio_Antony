/* =============================================
   PORTFOLIO FABRICIO ANTONIO — code.js
   Efecto Matrix Code Rain
============================================= */
(() => {
  'use strict';

  const start = () => {
    // Si la canvas ya existe, evitamos duplicarla
    if (document.getElementById('codeRainCanvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'codeRainCanvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
      canvas.remove();
      return;
    }

    const glyphs = '01010 11011001101011101110100011 10010101{}[]<>/\\;:=+-*const let function return PHP JS HTML CSS';
    
    const fontSize = 28;

    let columns = 0;
    let drops = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationId = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      // Calculamos el ancho y el alto TOTAL de todo el documento navegable
      width = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
      );
      
      height = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      columns = Math.ceil(width / fontSize);
      drops = Array.from(
        { length: columns },
        () => Math.random() * (height / fontSize)
      );
    };

    const draw = () => {
      if (!running) return;

      frame++;

      // Dibujamos cada 2 fotogramas para rendimiento óptimo
      if (frame % 2 === 0) {
        // Relleno semitransparente oscuro para crear el efecto de estela
        ctx.fillStyle = 'rgba(24, 25, 29, 0.27)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = `${fontSize}px monospace`;
        ctx.fillStyle = 'rgb(237, 248, 244)'; // Color verde acento (#10b981)

        for (let i = 0; i < drops.length; i++) {
          const char = glyphs[
            Math.floor(Math.random() * glyphs.length)
          ];

          const x = i * fontSize;
          const y = drops[i] * fontSize;

          ctx.fillText(char, x, y);

          if (y > height && Math.random() > 0.675) {
            drops[i] = 0;
          }

          drops[i] += 0.50 + Math.random() * 0.35;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    const pause = () => {
      running = false;
      cancelAnimationFrame(animationId);
    };

    const resume = () => {
      if (running || document.hidden) return;

      running = true;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    animationId = requestAnimationFrame(draw);

    window.addEventListener('resize', resize, { passive: true });

    document.addEventListener('visibilitychange', () => {
      document.hidden ? pause() : resume();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();