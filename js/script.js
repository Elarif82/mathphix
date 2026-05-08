document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // MENU MOBILE + DROPDOWN
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

    if (
      mainNav &&
      menuToggle &&
      window.innerWidth <= 780 &&
      !mainNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  // =========================
  // BANQUE D'EXERCICES
  // =========================
  const exerciseBanks = {
    "nombres-relatifs": {
      label: "Nombres relatifs",
      link: "nombres-relatifs.html#ressources-relatifs",
      questions: [
        "Calcule : (-4) + 9",
        "Calcule : 7 - 12",
        "Calcule : (-3) × 5",
        "Calcule : (-18) ÷ 6",
        "Compare : -7 et 2",
        "Range dans l’ordre croissant : -2 ; 5 ; -8 ; 1",
        "Calcule : (-6) + (-11)",
        "Calcule : 15 + (-9)",
        "Calcule : (-4) × (-3)",
        "Calcule : 20 - (-6)"
      ]
    },
    "fractions": {
      label: "Fractions",
      link: "fractions.html#operations",
      questions: [
        "Simplifie la fraction : 12/18",
        "Calcule : 1/2 + 1/3",
        "Calcule : 3/4 + 1/2",
        "Calcule : 5/6 - 1/3",
        "Calcule : 2/3 × 3/5",
        "Calcule : 2/3 ÷ 4/5",
        "Calcule : 3/5 ÷ 2/7",
        "Écris 3 sous forme de fraction",
        "Compare : 5/8 et 3/4",
        "Réduis au même dénominateur : 1/2 et 3/5",
        "Calcule : 7/10 + 2/10",
        "Simplifie : 24/36"
      ]
    },
    "puissances-base": {
      label: "Puissances",
      link: "puissances.html#ressources-puissances",
      questions: [
        "Calcule : 10^3",
        "Calcule : 2^4",
        "Écris sous la forme d’une puissance de 10 : 100000",
        "Calcule : 10^5 × 10^2",
        "Calcule : 10^7 ÷ 10^3",
        "Calcule : (10^2)^3",
        "Écris en notation scientifique : 4500000",
        "Écris 0,00034 en notation scientifique",
        "Calcule : 3^2 + 2^3",
        "Complète : 10^__ = 1000"
      ]
    },
    "calcul": {
      label: "Calcul littéral",
      link: "calcul-litteral.html#ressources-calcul",
      questions: [
        "Réduis : 3x + 5x",
        "Réduis : 7a - 2a + a",
        "Développe : 3(x + 4)",
        "Développe : 2(5x - 1)",
        "Factorise : 4x + 8",
        "Factorise : 3x² + 6x",
        "Calcule pour x = 2 : 3x + 1",
        "Calcule pour a = -1 : 2a - 5",
        "Réduis : 4y + 2 - y",
        "Développe : -(x + 3)"
      ]
    },
    "equations-base": {
      label: "Équations",
      link: "equations.html#ressources-equations",
      questions: [
        "Résous : x + 5 = 12",
        "Résous : x - 7 = 3",
        "Résous : 3x = 15",
        "Résous : x/4 = 6",
        "Résous : 2x + 3 = 11",
        "Résous : 5x - 1 = 9",
        "Résous : 7 - x = 2",
        "Résous : 4x + 8 = 0",
        "Résous : 6x = 42",
        "Résous : 3x - 6 = 12"
      ]
    }
  };

  const themeSelect = document.getElementById("themeSelect");
  const generateBtn = document.getElementById("generateBtn");
  const newSeriesBtn = document.getElementById("newSeriesBtn");
  const exerciseThemeTitle = document.getElementById("exerciseThemeTitle");
  const exerciseList = document.getElementById("exerciseList");
  const chapterLink = document.getElementById("chapterLink");

  function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function pickRandomItems(array, count) {
    return shuffleArray(array).slice(0, count);
  }

  function updateExerciseMeta() {
    const selectedTheme = themeSelect.value;
    const bank = exerciseBanks[selectedTheme];

    exerciseThemeTitle.textContent = `Thème sélectionné : ${bank.label}`;
    chapterLink.href = bank.link;
    chapterLink.textContent = `Ouvrir la page du chapitre : ${bank.label}`;
  }

  function generateExercises() {
    const selectedTheme = themeSelect.value;
    const bank = exerciseBanks[selectedTheme];
    const selectedQuestions = pickRandomItems(bank.questions, 3);

    updateExerciseMeta();
    exerciseList.innerHTML = "";

    selectedQuestions.forEach((question, index) => {
      const item = document.createElement("div");
      item.className = "exercise-item";
      item.innerHTML = `
        <strong>Exercice ${index + 1}</strong>
        <span>${question}</span>
      `;
      exerciseList.appendChild(item);
    });
  }

  if (themeSelect) {
    updateExerciseMeta();
    themeSelect.addEventListener("change", updateExerciseMeta);
  }

  if (generateBtn) {
    generateBtn.addEventListener("click", generateExercises);
  }

  if (newSeriesBtn) {
    newSeriesBtn.addEventListener("click", generateExercises);
  }

  // =========================
  // BANQUE DE QUIZ
  // =========================
  const quizBank = [
    {
      theme: "Nombres relatifs",
      question: "Quel est le résultat de (-3) + 7 ?",
      options: ["10", "4", "-4", "-10"],
      answer: "4",
      explanation: "On ajoute 7 à -3, donc on obtient 4."
    },
    {
      theme: "Nombres relatifs",
      question: "Quel est le résultat de (-5) × (-2) ?",
      options: ["-10", "10", "7", "-7"],
      answer: "10",
      explanation: "Le produit de deux nombres négatifs est positif."
    },
    {
      theme: "Fractions",
      question: "Quelle fraction est égale à 1/2 ?",
      options: ["2/4", "3/5", "4/10", "5/12"],
      answer: "2/4",
      explanation: "2/4 se simplifie en 1/2."
    },
    {
      theme: "Fractions",
      question: "Combien vaut 1/4 + 1/4 ?",
      options: ["1/8", "2/8", "1/2", "3/4"],
      answer: "1/2",
      explanation: "1/4 + 1/4 = 2/4 = 1/2."
    },
    {
      theme: "Fractions",
      question: "Combien vaut 1/2 + 1/3 ?",
      options: ["2/5", "5/6", "1/5", "3/6"],
      answer: "5/6",
      explanation: "On prend le dénominateur commun 6 : 1/2 = 3/6 et 1/3 = 2/6, donc 3/6 + 2/6 = 5/6."
    },
    {
      theme: "Fractions",
      question: "Pour calculer 2/3 ÷ 4/5, que faut-il faire ?",
      options: [
        "Multiplier par 4/5",
        "Retourner les deux fractions",
        "Multiplier 2/3 par 5/4",
        "Additionner les deux fractions"
      ],
      answer: "Multiplier 2/3 par 5/4",
      explanation: "Diviser par une fraction revient à multiplier par son inverse."
    },
    {
      theme: "Fractions",
      question: "Quelle est la forme simplifiée de 6/8 ?",
      options: ["3/4", "2/3", "4/5", "1/2"],
      answer: "3/4",
      explanation: "On divise le numérateur et le dénominateur par 2."
    },
    {
      theme: "Puissances",
      question: "Combien vaut 10^3 ?",
      options: ["30", "100", "1000", "10000"],
      answer: "1000",
      explanation: "10^3 = 10 × 10 × 10 = 1000."
    },
    {
      theme: "Puissances",
      question: "Combien vaut 10^2 × 10^3 ?",
      options: ["10^5", "10^6", "10^1", "10^9"],
      answer: "10^5",
      explanation: "Quand on multiplie des puissances de 10, on additionne les exposants."
    },
    {
      theme: "Calcul littéral",
      question: "Réduis : 3x + 2x",
      options: ["5x", "6x", "3x²", "5"],
      answer: "5x",
      explanation: "3x + 2x = 5x."
    },
    {
      theme: "Calcul littéral",
      question: "Développe : 2(x + 3)",
      options: ["2x + 3", "2x + 6", "x + 6", "2x² + 3"],
      answer: "2x + 6",
      explanation: "On distribue 2 à chaque terme : 2×x + 2×3."
    },
    {
      theme: "Équations",
      question: "La solution de x + 4 = 9 est :",
      options: ["13", "5", "6", "4"],
      answer: "5",
      explanation: "On enlève 4 des deux côtés : x = 5."
    },
    {
      theme: "Équations",
      question: "La solution de 3x = 12 est :",
      options: ["4", "9", "3", "12"],
      answer: "4",
      explanation: "On divise les deux membres par 3."
    },
    {
      theme: "Nombres relatifs",
      question: "Quel nombre est le plus petit ?",
      options: ["2", "-1", "0", "5"],
      answer: "-1",
      explanation: "Un nombre négatif est plus petit que 0 et que les nombres positifs."
    }
  ];

  const quizForm = document.getElementById("quizForm");
  const quizQuestions = document.getElementById("quizQuestions");
  const generateQuizBtn = document.getElementById("generateQuizBtn");
  const restartQuizBtn = document.getElementById("restartQuizBtn");
  const quizScoreCard = document.getElementById("quizScoreCard");
  const quizScorePercent = document.getElementById("quizScorePercent");
  const quizProgressText = document.getElementById("quizProgressText");
  const quizProgressFill = document.getElementById("quizProgressFill");

  let currentQuizQuestions = [];

  function updateQuizProgress() {
    if (!currentQuizQuestions.length) {
      quizProgressText.textContent = "0 / 3";
      quizProgressFill.style.width = "0%";
      return;
    }

    let answered = 0;

    currentQuizQuestions.forEach((_, index) => {
      const checked = document.querySelector(`input[name="question-${index}"]:checked`);
      if (checked) answered++;
    });

    quizProgressText.textContent = `${answered} / ${currentQuizQuestions.length}`;
    quizProgressFill.style.width = `${(answered / currentQuizQuestions.length) * 100}%`;
  }

  function renderQuiz() {
    currentQuizQuestions = pickRandomItems(quizBank, 3);
    quizQuestions.innerHTML = "";
    quizScoreCard.hidden = true;

    currentQuizQuestions.forEach((item, index) => {
      const questionBlock = document.createElement("div");
      questionBlock.className = "quiz-question";

      const optionsHtml = item.options
        .map((option) => {
          return `
            <label class="quiz-option">
              <input
                type="radio"
                name="question-${index}"
                value="${option}"
              >
              <span>${option}</span>
            </label>
          `;
        })
        .join("");

      questionBlock.innerHTML = `
        <div class="quiz-theme">${item.theme}</div>
        <p class="quiz-question-title">${index + 1}. ${item.question}</p>
        <div class="quiz-options">
          ${optionsHtml}
        </div>
        <div class="quiz-correction" id="quiz-correction-${index}"></div>
      `;

      quizQuestions.appendChild(questionBlock);
    });

    const allInputs = quizQuestions.querySelectorAll('input[type="radio"]');
    allInputs.forEach((input) => {
      input.addEventListener("change", updateQuizProgress);
    });

    updateQuizProgress();
  }

  function correctQuiz(event) {
    event.preventDefault();

    if (!currentQuizQuestions.length) {
      return;
    }

    let score = 0;

    currentQuizQuestions.forEach((item, index) => {
      const selected = document.querySelector(`input[name="question-${index}"]:checked`);
      const userAnswer = selected ? selected.value : null;
      const isCorrect = userAnswer === item.answer;
      const correctionBox = document.getElementById(`quiz-correction-${index}`);

      if (isCorrect) score++;

      correctionBox.className = `quiz-correction ${isCorrect ? "correct" : "incorrect"}`;
      correctionBox.innerHTML = `
        <p><strong>${isCorrect ? "Bonne réponse" : "Réponse incorrecte"}</strong></p>
        <p>Ta réponse : ${userAnswer ? userAnswer : "Aucune réponse"}</p>
        <p>Bonne réponse : ${item.answer}</p>
        <p>Explication : ${item.explanation}</p>
      `;
    });

    const percent = Math.round((score / currentQuizQuestions.length) * 100);
    quizScorePercent.textContent = `${percent}%`;
    quizScoreCard.hidden = false;
  }

  if (generateQuizBtn) {
    generateQuizBtn.addEventListener("click", renderQuiz);
  }

  if (restartQuizBtn) {
    restartQuizBtn.addEventListener("click", renderQuiz);
  }

  if (quizForm) {
    quizForm.addEventListener("submit", correctQuiz);
  }
});
