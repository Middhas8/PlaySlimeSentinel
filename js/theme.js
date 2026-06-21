// theme.js
// Controla o tema claro/escuro do site.
//
// Funcionamento:
//   1. Na primeira visita, verifica se o utilizador já escolheu um tema (localStorage)
//   2. Se não, usa a preferência do sistema operativo
//   3. Aplica o tema como atributo data-theme no <html>
//   4. Sempre que o tema muda, salva a escolha no localStorage

const STORAGE_KEY = "theme";
const root = document.documentElement;

// Ícones em texto — sem bibliotecas externas
const ICONS = {
  dark: "☀️", // mostrado quando o tema é escuro (clica para ir ao claro)
  light: "🌙", // mostrado quando o tema é claro  (clica para ir ao escuro)
};

function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return saved;

  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)",
  ).matches;
  return prefersLight ? "light" : "dark";
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);

  const button = document.getElementById("theme-toggle");
  if (button) button.textContent = ICONS[theme];
}

export function initTheme() {
  const theme = getInitialTheme();
  applyTheme(theme);

  const button = document.getElementById("theme-toggle");
  if (!button) return;

  button.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
}
