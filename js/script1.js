document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // MENU MOBILE
  // =========================
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const navDropdown = document.querySelector(".nav-dropdown");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  if (dropdownToggle && navDropdown) {
    dropdownToggle.addEventListener("click", () => {
      const isOpen = navDropdown.classList.toggle("open");
      dropdownToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  document.addEventListener("click", (event) => {
    if (navDropdown && !navDropdown.contains(event.target)) {
      navDropdown.classList.remove("open");
      if (dropdownToggle) {
        dropdownToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  // =========================
  // OUTILS
  // =========================
  function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function pickRandomItems(array, count) {
    return shuffleArray(array).slice(0, Math.min(count, array.length));
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // =========================
  // GÉNÉRATEUR D'EXERCICES
  // =========================
  const exerciseBank = {
    ensembles: [
      "Indique à quel ensemble appartient le nombre 5 : ℕ, ℤ, ℚ ou ℝ.",
      "Le nombre -3 appartient-il à ℕ ? à ℤ ? à ℚ ? à ℝ ?",
      "Explique pourquoi 2,5 appartient à ℚ.",
      "Le nombre √2 est-il rationnel ? Dans quel ensemble peut-on le placer ?",
      "Classe les nombres suivants dans le plus petit ensemble possible : -7 ; 3/4 ; π ; 12.",
      "Vrai ou faux : tout entier relatif est un nombre réel."
    ],
    intervalles: [
      "Écris sous forme d’intervalle l’ensemble des nombres x tels que 2 ≤ x < 7.",
      "Écris sous forme d’inégalité l’intervalle ]-3 ; 5].",
      "Donne l’intersection de [1 ; 6] et [4 ; 9].",
      "Donne la réunion de ]-∞ ; 2] et [2 ; +∞[.",
      "Représente sur une droite graduée l’intervalle [-2 ; 4[.",
      "Traduis en intervalle : x est strictement inférieur à 8."
    ],
    arithmetique: [
      "Décompose 36 en produit de facteurs premiers.",
      "Indique si 45 est divisible par 3, par 5 et par 9.",
      "Donne tous les diviseurs de 18.",
      "Le nombre 97 est-il premier ?",
      "Trouve le PGCD de 18 et 24.",
      "Détermine si 121 est un nombre premier ou non."
    ],
    developper: [
      "Développe : 3(x + 5).",
      "Développe : 2(4x - 3).",
      "Développe et réduis : (x + 2)(x + 5).",
      "Développe : (x - 4)².",
      "Développe : (2x + 1)(x + 3).",
      "Développe et réduis : 4(2x - 1) - 3x."
    ],
    factoriser: [
      "Factorise : 3x + 12.",
      "Factorise : 5x² + 10x.",
      "Factorise : 7x - 14.",
      "Factorise : x² + 6x.",
      "Factorise : 2x(3x + 5) + 7(3x + 5).",
      "Factorise : x² - 16."
    ],
    racines: [
      "Calcule √49.",
      "Simplifie √36.",
      "Indique si √20 est un entier.",
      "Compare √9 et 4.",
      "Calcule √100 + √25.",
      "Donne un encadrement simple de √10 entre deux entiers."
    ],
    puissances: [
      "Calcule 10³.",
      "Écris 2 × 2 × 2 × 2 sous forme de puissance.",
      "Calcule 5².",
      "Simplifie 10² × 10³.",
      "Simplifie 7⁵ / 7².",
      "Écris 0,001 sous forme de puissance de 10."
    ],
    equations: [
      "Résous : x + 5 = 12.",
      "Résous : 3x = 21.",
      "Résous : 2x - 4 = 10.",
      "Résous : 5x + 3 = 18.",
      "Résous : 4x + 1 = 13.",
      "Vérifie si x = 3 est solution de 2x + 1 = 7."
    ],
    inequations: [
      "Résous : x + 4 > 9.",
      "Résous : 2x ≤ 8.",
      "Résous : 3x - 1 < 11.",
      "Résous : 5 - x ≥ 2.",
      "Traduis la solution de x ≥ 3 sous forme d’intervalle.",
      "Traduis la solution de x < -2 sous forme d’intervalle."
    ]
  };

  const themeLinks = {
    ensembles: "ensembles.html",
    intervalles: "intervalles.html",
    arithmetique: "arithmetique.html",
    developper: "developper.html",
    factoriser: "factoriser.html",
    racines: "racines.html",
    puissances: "puissances2.html",
    equations: "equations2.html",
    inequations: "inequations.html"
  };

  const themeSelect = document.getElementById("themeSelect");
  const generateBtn = document.getElementById("generateBtn");
  const exerciseList = document.getElementById("exerciseList");
  const chapterLink = document.getElementById("chapterLink");

  function updateChapterLink() {
    if (!themeSelect || !chapterLink) return;
    chapterLink.href = themeLinks[themeSelect.value] || "ensembles.html";
  }

  function renderExercises() {
    if (!themeSelect || !exerciseList) return;

    const selectedTheme = themeSelect.value;
    const exercises = exerciseBank[selectedTheme] || [];
    const randomExercises = pickRandomItems(exercises, 3);

    exerciseList.innerHTML = "";

    randomExercises.forEach((exercise, index) => {
      const item = document.createElement("div");
      item.className = "exercise-item";
      item.innerHTML = `
        <h4>Exercice ${index + 1}</h4>
        <p>${escapeHtml(exercise)}</p>
      `;
      exerciseList.appendChild(item);
    });
  }

  if (themeSelect) {
    updateChapterLink();
    themeSelect.addEventListener("change", updateChapterLink);
  }

  if (generateBtn) {
    generateBtn.addEventListener("click", renderExercises);
  }

  // =========================
  // QUIZ
  // =========================
  const quizBank = [
    {
      question: "Quel ensemble contient les entiers naturels ?",
      options: ["ℕ", "ℚ", "ℝ"],
      answer: "ℕ",
      explanation: "ℕ est l’ensemble des entiers naturels."
    },
    {
      question: "Le nombre -4 appartient à quel ensemble ?",
      options: ["ℤ", "ℕ", "Aucun"],
      answer: "ℤ",
      explanation: "-4 est un entier relatif, donc il appartient à ℤ."
    },
    {
      question: "L’intervalle des nombres supérieurs ou égaux à 3 est :",
      options: ["[3 ; +∞[", "]3 ; +∞[", "]-∞ ; 3]"],
      answer: "[3 ; +∞[",
      explanation: "Le crochet fermé sur 3 signifie que 3 est inclus."
    },
    {
      question: "36 est divisible par 9 car :",
      options: [
        "3 + 6 = 9",
        "36 est pair",
        "36 se termine par 6"
      ],
      answer: "3 + 6 = 9",
      explanation: "Un nombre est divisible par 9 si la somme de ses chiffres est un multiple de 9."
    },
    {
      question: "Développer 3(x + 2) donne :",
      options: ["3x + 2", "3x + 6", "x + 6"],
      answer: "3x + 6",
      explanation: "On distribue 3 à chaque terme de la parenthèse."
    },
    {
      question: "Factoriser 4x + 8 donne :",
      options: ["4(x + 2)", "8(x + 1)", "2(x + 8)"],
      answer: "4(x + 2)",
      explanation: "On met 4 en facteur commun."
    },
    {
      question: "La racine carrée de 81 est :",
      options: ["9", "-9", "8"],
      answer: "9",
      explanation: "La racine carrée principale de 81 est 9."
    },
    {
      question: "10³ vaut :",
      options: ["100", "1000", "30"],
      answer: "1000",
      explanation: "10³ = 10 × 10 × 10 = 1000."
    },
    {
      question: "La solution de x + 7 = 10 est :",
      options: ["x = 17", "x = 3", "x = -3"],
      answer: "x = 3",
      explanation: "On soustrait 7 aux deux membres : x = 3."
    },
    {
      question: "La solution de x > 2 s’écrit :",
      options: ["[2 ; +∞[", "]2 ; +∞[", "]-∞ ; 2["],
      answer: "]2 ; +∞[",
      explanation: "2 n’est pas inclus, donc on utilise un crochet ouvert."
    }
  ];

  const generateQuizBtn = document.getElementById("generateQuizBtn");
  const newQuizBtn = document.getElementById("newQuizBtn");
  const quizForm = document.getElementById("quizForm");
  const quizContainer = document.getElementById("quizContainer");
  const quizActions = document.getElementById("quizActions");
  const quizResult = document.getElementById("quizResult");

  let currentQuizQuestions = [];

  function ensureQuizHeader() {
    if (!quizForm) return;

    let scoreCard = document.getElementById("quizScoreCard");
    if (!scoreCard) {
      scoreCard = document.createElement("div");
      scoreCard.id = "quizScoreCard";
      scoreCard.className = "quiz-score-card";
      scoreCard.innerHTML = `
        <p id="quizScorePercent">0%</p>
        <p id="quizScoreText">Score : 0/3</p>
      `;
      quizForm.insertBefore(scoreCard, quizForm.firstChild);
    }

    let progressBlock = document.getElementById("quizProgress");
    if (!progressBlock) {
      progressBlock = document.createElement("div");
      progressBlock.id = "quizProgress";
      progressBlock.className = "quiz-progress";
      progressBlock.innerHTML = `
        <div class="quiz-progress-top">
          <span>Progression</span>
          <span id="quizProgressText">0/3 répondues</span>
        </div>
        <div class="quiz-progress-bar">
          <div id="quizProgressFill" class="quiz-progress-fill"></div>
        </div>
      `;
      scoreCard.insertAdjacentElement("afterend", progressBlock);
    }
  }

  function updateQuizProgress() {
    const progressText = document.getElementById("quizProgressText");
    const progressFill = document.getElementById("quizProgressFill");

    if (!progressText || !progressFill || currentQuizQuestions.length === 0) return;

    let answered = 0;

    currentQuizQuestions.forEach((_, index) => {
      const checked = document.querySelector(`input[name="question-${index}"]:checked`);
      if (checked) answered += 1;
    });

    const percent = Math.round((answered / currentQuizQuestions.length) * 100);
    progressText.textContent = `${answered}/${currentQuizQuestions.length} répondues`;
    progressFill.style.width = `${percent}%`;
  }

  function updateScore(score) {
    const quizScorePercent = document.getElementById("quizScorePercent");
    const quizScoreText = document.getElementById("quizScoreText");

    if (!quizScorePercent || !quizScoreText || currentQuizQuestions.length === 0) return;

    const percent = Math.round((score / currentQuizQuestions.length) * 100);
    quizScorePercent.textContent = `${percent}%`;
    quizScoreText.textContent = `Score : ${score}/${currentQuizQuestions.length}`;
  }

  function renderQuiz() {
    if (!quizContainer || !quizActions || !quizResult) return;

    ensureQuizHeader();

    currentQuizQuestions = pickRandomItems(quizBank, 3);
    quizContainer.innerHTML = "";
    quizResult.innerHTML = "";

    currentQuizQuestions.forEach((item, questionIndex) => {
      const questionBlock = document.createElement("div");
      questionBlock.className = "quiz-question";
      questionBlock.id = `question-block-${questionIndex}`;

      const optionsHtml = item.options
        .map((option, optionIndex) => {
          return `
            <label class="quiz-option" id="option-${questionIndex}-${optionIndex}">
              <input
                type="radio"
                name="question-${questionIndex}"
                value="${escapeHtml(option)}"
              />
              <span>${escapeHtml(option)}</span>
            </label>
          `;
        })
        .join("");

      questionBlock.innerHTML = `
        <p><strong>${questionIndex + 1}.</strong> ${escapeHtml(item.question)}</p>
        <div class="quiz-options">
          ${optionsHtml}
        </div>
        <div class="quiz-feedback" id="feedback-${questionIndex}" style="display:none;"></div>
      `;

      quizContainer.appendChild(questionBlock);
    });

    const allInputs = quizContainer.querySelectorAll('input[type="radio"]');
    allInputs.forEach((input) => {
      input.addEventListener("change", updateQuizProgress);
    });

    quizActions.style.display = "grid";
    updateQuizProgress();
    updateScore(0);
  }

  function correctQuiz(event) {
    event.preventDefault();

    if (!quizContainer || !quizResult || currentQuizQuestions.length === 0) return;

    let score = 0;

    currentQuizQuestions.forEach((item, questionIndex) => {
      const questionBlock = document.getElementById(`question-block-${questionIndex}`);
      const feedback = document.getElementById(`feedback-${questionIndex}`);
      const selected = document.querySelector(`input[name="question-${questionIndex}"]:checked`);
      const options = document.querySelectorAll(`input[name="question-${questionIndex}"]`);

      if (!questionBlock || !feedback) return;

      questionBlock.classList.remove("correct", "incorrect", "unanswered");

      options.forEach((input) => {
        const label = input.closest(".quiz-option");
        if (label) {
          label.classList.remove("option-correct", "option-wrong", "option-answer");
        }
      });

      let userAnswer = "";

      if (!selected) {
        questionBlock.classList.add("unanswered");
        feedback.style.display = "block";
        feedback.innerHTML = `
          <p><strong>Ta réponse :</strong> aucune réponse choisie.</p>
          <p><strong>Bonne réponse :</strong> ${escapeHtml(item.answer)}</p>
          <p><strong>Explication :</strong> ${escapeHtml(item.explanation)}</p>
        `;

        options.forEach((input) => {
          const label = input.closest(".quiz-option");
          if (label && input.value === item.answer) {
            label.classList.add("option-answer");
          }
        });

        return;
      }

      userAnswer = selected.value;

      if (userAnswer === item.answer) {
        score += 1;
        questionBlock.classList.add("correct");
      } else {
        questionBlock.classList.add("incorrect");
      }

      options.forEach((input) => {
        const label = input.closest(".quiz-option");
        if (!label) return;

        if (input.value === item.answer) {
          label.classList.add("option-correct");
        }

        if (input.checked && input.value !== item.answer) {
          label.classList.add("option-wrong");
        }
      });

      feedback.style.display = "block";
      feedback.innerHTML = `
        <p><strong>Ta réponse :</strong> ${escapeHtml(userAnswer)}</p>
        <p><strong>Bonne réponse :</strong> ${escapeHtml(item.answer)}</p>
        <p><strong>Résultat :</strong> ${userAnswer === item.answer ? "Bonne réponse ✅" : "Réponse incorrecte ❌"}</p>
        <p><strong>Explication :</strong> ${escapeHtml(item.explanation)}</p>
      `;
    });

    updateScore(score);

    let resultClass = "result-bad";
    let resultMessage = "Continue, tu es en train d’apprendre.";

    if (score === 3) {
      resultClass = "result-good";
      resultMessage = "Excellent travail !";
    } else if (score === 2) {
      resultClass = "result-mid";
      resultMessage = "Bon résultat, encore un petit effort.";
    } else if (score === 1) {
      resultClass = "result-mid";
      resultMessage = "Tu as quelques bases, continue l’entraînement.";
    }

    quizResult.innerHTML = `
      <p class="${resultClass}"><strong>Score final :</strong> ${score}/3</p>
      <p>${resultMessage}</p>
    `;
  }

  if (generateQuizBtn) {
    generateQuizBtn.addEventListener("click", renderQuiz);
  }

  if (newQuizBtn) {
    newQuizBtn.addEventListener("click", renderQuiz);
  }

  if (quizForm) {
    quizForm.addEventListener("submit", correctQuiz);
  }
});
