// navbar.js
// Controla o comportamento de esconder/mostrar a navbar ao scroll.
//
// Lógica:
//   - Scrollar para baixo → esconde a navbar
//   - Scrollar para cima mais do que THRESHOLD pixels → mostra a navbar

const THRESHOLD = 10;

export function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  let lastScrollY = window.scrollY;

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;
      const scrolledUp = lastScrollY - currentScrollY > THRESHOLD;
      const scrolledDown = currentScrollY > lastScrollY;

      if (scrolledUp) {
        navbar.classList.remove("navbar-hidden");
      } else if (scrolledDown) {
        navbar.classList.add("navbar-hidden");
      }

      lastScrollY = currentScrollY;
    },
    { passive: true },
  );
}
