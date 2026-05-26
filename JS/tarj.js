document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-preview-card");

  cards.forEach((card) => {
    const images = card.querySelectorAll(".slider-img");
    const prevBtn = card.querySelector(".prev-btn");
    const nextBtn = card.querySelector(".next-btn");
    
    // Si no hay imágenes o botones en este bloque, saltar
    if (images.length === 0 || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    function showImage(index) {
      // Remover clase activa de la imagen actual
      images[currentIndex].classList.remove("active");
      
      // Calcular el nuevo índice de forma cíclica
      currentIndex = (index + images.length) % images.length;
      
      // Añadir clase activa a la nueva imagen
      images[currentIndex].classList.add("active");
    }

    // Evento Flecha Siguiente
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Evita comportamientos raros
      showImage(currentIndex + 1);
    });

    // Evento Flecha Anterior
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showImage(currentIndex - 1);
    });
  });
});