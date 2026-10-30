/* ==========================================================================
   Lógica de Programação — Unidade 3
   Comportamento da apresentação: navegação entre slides e gabaritos
   ========================================================================== */

(() => {
  "use strict";

  // ------------------------------------------------------------------------
  // Elementos da página
  // ------------------------------------------------------------------------
  const slides = Array.from(document.querySelectorAll(".slide"));
  const bar = document.getElementById("bar");
  const counter = document.getElementById("counter");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  // Índice do slide exibido no momento
  let current = 0;

  // ------------------------------------------------------------------------
  // Atualiza a tela de acordo com o slide atual
  // ------------------------------------------------------------------------
  function render() {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === current);
    });

    const isLast = current === slides.length - 1;

    counter.textContent = `${current + 1} / ${slides.length}`;
    bar.style.width = `${((current + 1) / slides.length) * 100}%`;
    prevButton.disabled = current === 0;
    nextButton.textContent = isLast ? "Concluir ✓" : "Próximo →";
  }

  // ------------------------------------------------------------------------
  // Avança ou retorna slides, respeitando os limites da apresentação
  // ------------------------------------------------------------------------
  function move(step) {
    current = Math.max(0, Math.min(slides.length - 1, current + step));
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ------------------------------------------------------------------------
  // Mostra ou oculta a sugestão de resposta de um exercício
  // ------------------------------------------------------------------------
  function toggleAnswer(id) {
    const answer = document.getElementById(id);

    if (answer) {
      answer.classList.toggle("show");
    }
  }

  // ------------------------------------------------------------------------
  // Eventos
  // ------------------------------------------------------------------------
  prevButton.addEventListener("click", () => move(-1));
  nextButton.addEventListener("click", () => move(1));

  // Cada botão de gabarito indica o alvo pelo atributo data-answer
  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => toggleAnswer(button.dataset.answer));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      move(1);
    }

    if (event.key === "ArrowLeft") {
      move(-1);
    }
  });

  // ------------------------------------------------------------------------
  // Estado inicial
  // ------------------------------------------------------------------------
  render();
})();
