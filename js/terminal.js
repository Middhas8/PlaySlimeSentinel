// terminal.js
// Replica o "pitch_terminal.cpp" como animação no browser.
//
// Estrutura:
//   - SCRIPT: lista de linhas na ordem em que aparecem.
//     Cada linha tem um "tipo" que decide a cor (mesmos nomes do C++: white, gray, cyan, amber).
//   - As respostas dos 3 "cin" do programa original estão fixas aqui,
//     pois o site não tem como capturar input de voz/texto do visitante nesses pontos.
//
// Para editar o conteúdo do terminal, mexa só no array SCRIPT abaixo.

const TYPE_SPEED = 22; // ms por caractere — mesma ideia do C++, valor único simplificado

const SCRIPT = [
  { text: "C:\\> launch dev_career.exe", type: "white" },
  { text: "", type: "blank" },
  { text: '[ERRO] Licença "Game Developer" não encontrada.', type: "amber" },
  { text: "A redirecionar para verificação de identidade...", type: "gray" },
  { text: "", type: "blank" },
  { text: "Apelido de utilizador: Middhas", type: "white" },
  { text: "", type: "blank" },
  { text: "A processar... utilizador reconhecido.", type: "gray" },
  { text: "", type: "blank" },
  { text: "Linguagens detetadas no histórico: C++, C#, GML", type: "cyan" },
  { text: "", type: "blank" },
  {
    text: "Ocupação atual: Estudante do Curso Profissional de Programador de Informática",
    type: "white",
  },
  {
    text: "Motivo de interesse no sistema: Interesse em jogos desde pequeno",
    type: "white",
  },
  { text: "", type: "blank" },
  { text: "A analisar histórico de commits...", type: "gray" },
  { text: "", type: "blank" },
  { text: "[PADRÃO DETETADO] Revisão repetida do mesmo trecho", type: "amber" },
  { text: "antes de avançar para o próximo.", type: "amber" },
  {
    text: "[PADRÃO DETETADO] Arquitetura segue princípios SRP.",
    type: "amber",
  },
  { text: "Baixa incidência de bugs reportados.", type: "amber" },
  { text: "", type: "blank" },
  {
    text: "Conclusão: lento a entregar, mas estável quando entrega.",
    type: "white",
  },
  { text: "", type: "blank" },
  { text: "A compilar...", type: "gray" },
  { text: "__PROGRESS_BAR__", type: "progress" }, // tratado de forma especial, veja runProgressBar()
  { text: "", type: "blank" },
  { text: "ACESSO CONCEDIDO", type: "cyan" },
  { text: "──────────────────────────────────", type: "gray" },
  { text: "", type: "blank" },
  { text: "$ cat slime_sentinel.md", type: "white" },
  { text: "", type: "blank" },
  { text: "O jogo é sobre um slime que precisa proteger a sua", type: "white" },
  {
    text: "única fonte de vida, uma Chama. Se ela apagar, acabou.",
    type: "white",
  },
  { text: "", type: "blank" },
  {
    text: "De dia recolhes materiais, à tarde fortificas a base,",
    type: "white",
  },
  {
    text: "à noite a Chama é atacada e estás lá para a defender.",
    type: "white",
  },
  { text: "", type: "blank" },
  { text: "[em desenvolvimento, mecânicas ainda a mudar]", type: "gray" },
  { text: "", type: "blank" },
  { text: "──────────────────────────────────", type: "gray" },
  { text: "", type: "blank" },
  { text: "| https://github.com/Middhas8 |", type: "cyan" },
];

// Pausa simples — usada entre linhas
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Digita um texto caractere por caractere dentro de um elemento <p>
async function typeLine(container, text, type) {
  const line = document.createElement("p");
  line.className = `terminal-line t-${type} terminal-cursor`;
  container.appendChild(line);

  for (const char of text) {
    line.textContent += char;
    container.scrollTop = container.scrollHeight; // mantém scroll no fim
    await wait(TYPE_SPEED);
  }

  line.classList.remove("terminal-cursor"); // remove o cursor piscando ao terminar a linha
}

// Replica a progressBar() do C++ — mesma lista de % e pausas "stutter"
async function runProgressBar(container) {
  const STEPS = [
    [14, 90],
    [27, 90],
    [39, 100],
    [58, 450],
    [58, 450],
    [64, 90],
    [64, 550],
    [79, 90],
    [91, 90],
    [91, 600],
    [100, 90],
  ];
  const WIDTH = 26;

  const line = document.createElement("p");
  line.className = "terminal-line t-cyan";
  container.appendChild(line);

  for (const [pct, delay] of STEPS) {
    const filled = Math.round((WIDTH * pct) / 100);
    const bar = "█".repeat(filled) + "░".repeat(WIDTH - filled);
    line.textContent = `[${bar}] ${pct}%`;
    container.scrollTop = container.scrollHeight;
    await wait(delay);
  }
}

// Roda o script inteiro do início ao fim
async function runScript(container, button) {
  container.innerHTML = ""; // limpa execuções anteriores
  button.disabled = true;
  button.textContent = "▶ A executar...";

  for (const item of SCRIPT) {
    if (item.type === "blank") {
      container.appendChild(document.createElement("br"));
    } else if (item.type === "progress") {
      await runProgressBar(container);
    } else {
      await typeLine(container, item.text, item.type);
    }
  }

  button.disabled = false;
  button.textContent = "↻ Executar novamente";
}

export function initTerminal() {
  const body = document.getElementById("terminal-body");
  const button = document.getElementById("terminal-run-btn");
  if (!body || !button) return;

  button.addEventListener("click", () => runScript(body, button));
}
