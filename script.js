// Definición de los 15 retos (las pistas ahora viven exclusivamente en el ESP32)
const challenges = [
  // FASE 1: HISTORIA DEL CLUB
  {
    phase: "FASE 1: ORÍGENES DEL CLUB",
    title: "El Compañero de Trapo",
    text: "Todo gran mentor tiene un alter ego... a veces hecho de tela y fibra. ¿Cuál es el nombre del títere de media favorito del profe Ramsés?",
    answers: ["gaussin", "gausin"]
  },
  {
    phase: "FASE 1: ORÍGENES DEL CLUB",
    title: "Alianzas Pasadas (y amargas)",
    text: "Mucho antes de las victorias actuales, hubo alianzas y equipos hermanos. ¿Cuál es el primer nombre de la coach de Adagroup?",
    answers: ["daniela", "Daniela"]
  },
  {
    phase: "FASE 1: ORÍGENES DEL CLUB",
    title: "Nuestro primer gran escenario",
    text: "El escenario donde el club dejó de ser un proyecto local y se midió a nivel nacional por primera vez. Cuatro letras marcaron el inicio:",
    answers: ["ivic", "IVIC", "Ivic"]
  },
  {
    phase: "FASE 1: ORÍGENES DEL CLUB",
    title: "Emprendimiento Emergente",
    text: "Cuando el profe Sircar apareció en nuestras vidas no traía robots... traía mercancía. ¿Qué intentaba vender?",
    answers: ["llaveros", "llavero", "llaveritos", "llaverito"]
  },
  {
    phase: "FASE 1: ORÍGENES DEL CLUB",
    title: "Némesis",
    text: "Toda historia necesita un antagonista clásico. ¿Quiénes son nuestros enemigos jurados?",
    answers: ["adakademy", "adacademy"]
  },

  // FASE 2: ERA MODERNA
  {
    phase: "FASE 2: ERA MODERNA",
    title: "El nacimiento de un Líder",
    text: "Todos los líderes comienzan con algo sencillo y cotidiano. ¿Qué es?",
    answers: ["teclado"]
  },
  {
    phase: "FASE 2: ERA MODERNA",
    title: "El Alias Secreto",
    text: "Todos los miembros tienen un apodo. Entre los Blenderizados hay uno que es el menos conocido de todos. ¿Cuál es?",
    answers: ["la barbarita", "barbarita"]
  },
  {
    phase: "FASE 2: ERA MODERNA",
    title: "El Nombre Descartado",
    text: "A veces los robots explotan, y los nombres también. Entre los Luthieres, un nombre destacaba aunque fue descartado por demolición:",
    answers: ["c4bot", "c4 bot", "c-4 bot", "c4"]
  },
  {
    phase: "FASE 2: ERA MODERNA",
    title: "La Ley de Murphy",
    text: "Algunos artefactos son conocidos por fallar en el momento menos indicado y en el escenario más desafortunado. ¿Qué componente traicionó al equipo?",
    answers: ["rele", "relé"]
  },
  {
    phase: "FASE 2: ERA MODERNA",
    title: "La mascota del Club",
    text: "No programa ni conecta, pero es la inspiración principal de un equipo. ¿Conoces la mascota del Club?",
    answers: ["rossi"]
  },

  // FASE 3: LA BÚSQUEDA FÍSICA
  {
    phase: "FASE 3: LA BÚSQUEDA FÍSICA",
    title: "Coordenada Cotidiana",
    text: "Convives en él todo el tiempo. Siempre está a la vista. Uno de los puestos esconde un secreto. El dueño original del sitio es la clave.",
    answers: ["zoe"] 
  },
  {
    phase: "FASE 3: LA BÚSQUEDA FÍSICA",
    title: "Azules en el Patio",
    text: "Siempre estamos en ellas. Azules, pero translúcidas. En una de ellas encontrarás una calcomanía del club señalando un juego.",
    answers: ["ludo"]
  },
  {
    phase: "FASE 3: LA BÚSQUEDA FÍSICA",
    title: "La Terminal Traicionera",
    text: "Está a la vista de todos sin llamar la atención. Traicionera en apagones. Supera el desafío en tu ESP32 para descubrir la terminal a revisar.",
    answers: ["reset15", "cambur", "pinton"] 
  },
  {
    phase: "FASE 3: LA BÚSQUEDA FÍSICA",
    title: "La Estación Olvidada",
    text: "Siempre las sueles tener muy cerca. Ya no las usas, pero siguen allí esperando por ti. Debes ver debajo de la calcomanía.",
    answers: ["circuito", "resistencia", "clave15"]
  },
  {
    phase: "FASE 3: LA BÚSQUEDA FÍSICA",
    title: "La Cuarta Pared",
    text: "Para romper la cuarta pared, debes lograr ver detrás de la pantalla del salón de robótica. Algo sobresaliente se nota demasiado.",
    answers: ["smraza"]
  }
];

let currentIndex = 0;

// Elementos del DOM
const challengeContainer = document.getElementById("challengeContainer");
const finalCard = document.getElementById("finalCard");
const questionStage = document.getElementById("questionStage");
const phaseTag = document.getElementById("phaseTag");
const questionTitle = document.getElementById("questionTitle");
const questionText = document.getElementById("questionText");
const hardwareNote = document.getElementById("hardwareNote");
const answerForm = document.getElementById("answerForm");
const answerInput = document.getElementById("answerInput");
const feedbackMessage = document.getElementById("feedbackMessage");
const progressBarFill = document.getElementById("progressBarFill");
const progressText = document.getElementById("progressText");
const levelBadge = document.getElementById("levelBadge");
const restartBtn = document.getElementById("restartBtn");

function cleanString(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function loadChallenge(index) {
  if (index >= challenges.length) {
    showFinalReward();
    return;
  }

  const q = challenges[index];
  const stageNum = String(index + 1).padStart(2, '0');
  questionStage.textContent = `DESAFÍO #${stageNum} DE 15`;
  phaseTag.textContent = q.phase;
  questionTitle.textContent = q.title;
  questionText.textContent = q.text;

  // El recordatorio en la web ahora solo le dice qué buscar en su pantalla
  hardwareNote.textContent = `Sincroniza con el descifrador en [PISTA #${stageNum}] usando el botón.`;

  answerInput.value = "";
  feedbackMessage.textContent = "";
  feedbackMessage.className = "feedback-msg";
  answerInput.focus();

  updateProgress(index);
}

function updateProgress(index) {
  const percentage = (index / challenges.length) * 100;
  progressBarFill.style.width = `${percentage}%`;
  progressText.textContent = `${index} / ${challenges.length} DESBLOQUEADOS`;

  if (index < 5) {
    levelBadge.textContent = "FASE 1: HISTORIA";
    levelBadge.style.color = "var(--accent-cyan)";
  } else if (index < 10) {
    levelBadge.textContent = "FASE 2: ERA MODERNA";
    levelBadge.style.color = "var(--accent-amber)";
  } else {
    levelBadge.textContent = "FASE 3: BÚSQUEDA FÍSICA";
    levelBadge.style.color = "var(--accent-green)";
  }
}

answerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const rawInput = answerInput.value;
  const processed = cleanString(rawInput);

  if (!processed) return;

  const validAnswers = challenges[currentIndex].answers.map(cleanString);

  if (validAnswers.includes(processed)) {
    feedbackMessage.textContent = "¡CÓDIGO CORRECTO! AVANZANDO AL SIGUIENTE NIVEL...";
    feedbackMessage.className = "feedback-msg success";

    setTimeout(() => {
      currentIndex++;
      loadChallenge(currentIndex);
    }, 600);
  } else {
    feedbackMessage.textContent = "ACCESO DENEGADO // CLAVE INCORRECTA";
    feedbackMessage.className = "feedback-msg error";
    answerInput.select();
  }
});

function showFinalReward() {
  updateProgress(challenges.length);
  challengeContainer.classList.add("hidden");
  finalCard.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  finalCard.classList.add("hidden");
  challengeContainer.classList.remove("hidden");
  loadChallenge(0);
});

loadChallenge(currentIndex);