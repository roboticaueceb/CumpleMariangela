// Banco de 15 enigmas (las pistas viven en el ESP32)
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
    title: "Alianzas Pasadas",
    text: "Mucho antes de las victorias actuales, hubo alianzas y equipos hermanos. ¿Cuál es el primer nombre de la coach de Adagroup?",
    answers: ["daniela", "Daniela"]
  },
  {
    phase: "FASE 1: ORÍGENES DEL CLUB",
    title: "El primer gran escenario",
    text: "El escenario donde el club dejó de ser un proyecto local y se midió a nivel nacional por primera vez. Son solo cuatro letras:",
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
    text: "Toda historia necesita un antagonista clásico. ¿Quiénes son nuestros enemigos jurados más cercanos en cada competencia?",
    answers: ["adakademy", "adacademy", "Adakademy"]
  },

  // FASE 2: ERA MODERNA
  {
    phase: "FASE 2: ERA MODERNA",
    title: "El Génesis del Mando",
    text: "Nuestro líder comenzó como todos, con algo sencillo. ¿Qué es?",
    answers: ["teclado"]
  },
  {
    phase: "FASE 2: ERA MODERNA",
    title: "El Alias Secreto",
    text: "Todos los miembros tienen un apodo. Sin embargo, entre los Blenderizados, hay uno que es el menos conocido de todos. ¿Cuál es?",
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
    title: "El Alma de un equipo",
    text: "Uno de nuestros equipos tiene en realidad 4 miembros. No programa ni suelda, pero su presencia siempre está. ¿Quién es esta mascota?",
    answers: ["rossi", "Rossi", "Rossy", "rossy"]
  },

  // FASE 3: LA BÚSQUEDA FÍSICA
  {
    phase: "FASE 3: LA BÚSQUEDA EN EL OTRO MUNDO",
    title: "Coordenada Cotidiana",
    text: "Convives en él todo el tiempo. Siempre está a la vista. Uno de los puestos esconde un secreto. El dueño original del sitio es la clave.",
    answers: ["Zoe", "zoe"] 
  },
  {
    phase: "FASE 3: LA BÚSQUEDA EN EL OTRO MUNDO",
    title: "Azules en el Patio",
    text: "Siempre estamos en ellas. Azules, pero translúcidas. En una de ellas encontrarás una calcomanía del club señalando un juego.",
    answers: ["ludo", "Ludo"]
  },
  {
    phase: "FASE 3: LA BÚSQUEDA EN EL OTRO MUNDO",
    title: "La Terminal Traicionera",
    text: "Está a la vista de todos sin llamar la atención. Traicionera en apagones. Supera el desafío en tu ESP32 para descubrir la terminal a revisar.",
    answers: ["pinton"] 
  },
  {
    phase: "FASE 3: LA BÚSQUEDA EN EL OTRO MUNDO",
    title: "La Estación Olvidada",
    text: "Siempre las tienes cerca y las ves a diario. Ya no las usas, pero siguen allí esperando por ti. Debes ver DEBAJO de la calcomanía.",
    answers: ["circuito", "resistencia", "clave15"]
  },
  {
    phase: "FASE 3: LA BÚSQUEDA EN EL OTRO MUNDO",
    title: "La Cuarta Pared",
    text: "Para romper la cuarta pared, debes lograr ver detrás de la pantalla del salón de robótica. Algo sobresaliente se nota demasiado.",
    answers: ["smraza", "SMRAZA", "Smraza"]
  }
];

let currentIndex = 0;

const introScreen = document.getElementById("introScreen");
const gameScreen = document.getElementById("gameScreen");
const finalCard = document.getElementById("finalCard");
const startQuestBtn = document.getElementById("startQuestBtn");

const challengeContainer = document.getElementById("challengeContainer");
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

startQuestBtn.addEventListener("click", () => {
  introScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  loadChallenge(0);
});

function loadChallenge(index) {
  if (index >= challenges.length) {
    showFinalReward();
    return;
  }

  const q = challenges[index];
  const stageNum = String(index + 1).padStart(2, '0');
  questionStage.textContent = `PUERTA #${stageNum} DE 15`;
  phaseTag.textContent = q.phase;
  questionTitle.textContent = q.title;
  questionText.textContent = q.text;

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
  progressText.textContent = `${index} / ${challenges.length} LLAVES ENCONTRADAS`;

  if (index < 5) {
    levelBadge.textContent = "FASE 1: ORÍGENES";
    levelBadge.style.color = "var(--coraline-cyan)";
  } else if (index < 10) {
    levelBadge.textContent = "FASE 2: ERA MODERNA";
    levelBadge.style.color = "var(--coraline-yellow)";
  } else {
    levelBadge.textContent = "FASE 3: BÚSQUEDA FÍSICA";
    levelBadge.style.color = "#f43f5e";
  }
}

answerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const rawInput = answerInput.value;
  const processed = cleanString(rawInput);

  if (!processed) return;

  const validAnswers = challenges[currentIndex].answers.map(cleanString);

  if (validAnswers.includes(processed)) {
    feedbackMessage.textContent = "¡LLAVE CORRECTA! ABRIENDO PUERTA...";
    feedbackMessage.className = "feedback-msg success";

    setTimeout(() => {
      currentIndex++;
      loadChallenge(currentIndex);
    }, 600);
  } else {
    feedbackMessage.textContent = "CANDADO CERRADO // RESPUESTA INCORRECTA";
    feedbackMessage.className = "feedback-msg error";
    answerInput.select();
  }
});

function showFinalReward() {
  updateProgress(challenges.length);
  gameScreen.classList.add("hidden");
  finalCard.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  finalCard.classList.add("hidden");
  introScreen.classList.remove("hidden");
});