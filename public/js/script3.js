document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const navDropdown = document.querySelector(".nav-dropdown");

  const themeSelect = document.getElementById("themeSelect");
  const generateBtn = document.getElementById("generateBtn");
  const exerciseList = document.getElementById("exerciseList");
  const chapterLink = document.getElementById("chapterLink");

  const quizForm = document.getElementById("quizForm");
  const quizQuestions = document.getElementById("quizQuestions");
  const quizResult = document.getElementById("quizResult");
  const newQuizBtn = document.getElementById("newQuizBtn");

  const chapterLinks = {
    "fonctions-reference": "fonctions-reference.html",
    "fonctions-representation": "fonctions-representation.html",
    "variations-extremums": "variations-extremums.html"
  };

  const exerciseBank = {
    "fonctions-reference": [
      "Détermine l’image de 3 par la fonction f(x) = 2x + 1.",
      "Calcule l’image de -2 par la fonction g(x) = x².",
      "La fonction h(x) = √x est-elle définie pour x = -4 ? Justifie.",
      "Donne l’ensemble de définition de la fonction k(x) = 1/x.",
      "Calcule l’image de 9 par la fonction r(x) = √x.",
      "Donne l’antécédent de 7 par la fonction f(x) = x + 2.",
      "Pour la fonction c(x) = x³, calcule l’image de -2.",
      "Complète : dans une fonction, à un nombre de départ on associe une image.",
      "Calcule l’image de 5 par la fonction t(x) = -3x + 4.",
      "La valeur 0 admet-elle un antécédent par la fonction f(x) = x² ?"
    ],
    "fonctions-representation": [
      "Sur une courbe, explique comment lire l’image d’un nombre x.",
      "Sur une courbe, explique comment retrouver un antécédent d’un nombre y.",
      "Résoudre graphiquement f(x) = 3, c’est chercher quelles coordonnées ?",
      "Résoudre graphiquement f(x) > 2, c’est comparer la courbe avec quelle droite ?",
      "Comment reconnaître sur un graphique que f(2) = 5 ?",
      "Sur un repère, que représente l’ensemble des points d’une fonction ?",
      "Explique comment résoudre graphiquement une équation de type f(x) = g(x).",
      "Que signifie le point A(4 ; -1) sur la courbe d’une fonction f ?",
      "Pour lire un antécédent, faut-il partir de l’axe des abscisses ou des ordonnées ?",
      "Résoudre f(x) = 0 graphiquement revient à chercher les points où la courbe coupe quel axe ?"
    ],
    "variations-extremums": [
      "Indique si la fonction carré est croissante, décroissante ou ni l’un ni l’autre sur ℝ.",
      "Sur [0 ; +∞[, la fonction carré est-elle croissante ou décroissante ?",
      "Quel extremum admet la fonction f(x) = x² sur ℝ ?",
      "La fonction inverse est-elle croissante sur ]0 ; +∞[ ?",
      "Que signifie dire qu’une fonction est croissante sur un intervalle ?",
      "Que signifie dire qu’une fonction est décroissante sur un intervalle ?",
      "Comment repère-t-on un maximum sur une courbe ?",
      "Comment repère-t-on un minimum sur une courbe ?",
      "Sur ]-∞ ; 0], la fonction carré est-elle croissante ou décroissante ?",
      "La fonction racine carrée est-elle croissante sur son ensemble de définition ?"
    ]
  };

  const quizBank = [
    {
      question: "La fonction <strong>f(x)=√x</strong> est définie :",
      options: [
        "pour tous les réels",
        "pour x ≥ 0",
        "pour x ≠ 0"
      ],
      answer: 1,
      explanation: "La racine carrée n’existe dans ℝ que pour les nombres positifs ou nuls."
    },
    {
      question: "La fonction <strong>f(x)=x²</strong> admet :",
      options: [
        "un maximum en 0",
        "un minimum en 0",
        "aucun extremum"
      ],
      answer: 1,
      explanation: "Comme x² ≥ 0 pour tout réel x, la plus petite valeur est 0, obtenue pour x = 0."
    },
    {
      question: "Résoudre graphiquement <strong>f(x)=2</strong>, c’est :",
      options: [
        "chercher les ordonnées égales à 0",
        "chercher les abscisses des points où l’ordonnée vaut 2",
        "calculer une dérivée"
      ],
      answer: 1,
      explanation: "On cherche les points de la courbe dont l’ordonnée vaut 2, puis on lit leurs abscisses."
    },
    {
      question: "L’image de 4 par la fonction <strong>f(x)=x+3</strong> vaut :",
      options: [
        "1",
        "7",
        "12"
      ],
      answer: 1,
      explanation: "f(4) = 4 + 3 = 7."
    },
    {
      question: "Pour la fonction <strong>f(x)=1/x</strong>, la valeur interdite est :",
      options: [
        "1",
        "0",
        "-1"
      ],
      answer: 1,
      explanation: "On ne peut jamais diviser par 0, donc x = 0 est interdit."
    },
    {
      question: "Dire qu’une fonction est croissante sur un intervalle signifie que :",
      options: [
        "quand x augmente, f(x) diminue",
        "quand x augmente, f(x) augmente",
        "la courbe coupe l’axe des ordonnées"
      ],
      answer: 1,
      explanation: "Une fonction croissante prend des valeurs de plus en plus grandes lorsque x augmente."
    },
    {
      question: "La fonction <strong>f(x)=x²</strong> sur l’intervalle [0 ; +∞[ est :",
      options: [
        "croissante",
        "décroissante",
        "constante"
      ],
      answer: 0,
      explanation: "Sur [0 ; +∞[, quand x augmente, x² augmente aussi."
    },
    {
      question: "Graphiquement, résoudre <strong>f(x)=0</strong> revient à chercher :",
      options: [
        "les intersections avec l’axe des abscisses",
        "les intersections avec l’axe des ordonnées",
        "les points de maximum"
      ],
      answer: 0,
      explanation: "Quand f(x)=0, l’ordonnée vaut 0 : on cherche donc les points où la courbe coupe l’axe des abscisses."
    },
    {
      question: "L’antécédent de 5 par la fonction <strong>f(x)=x+2</strong> est :",
      options: [
        "7",
        "3",
        "2,5"
      ],
      answer: 1,
      explanation: "On cherche x tel que x + 2 = 5, donc x = 3."
    },
    {
      question: "La fonction racine carrée est croissante :",
      options: [
        "sur x ≥ 0",
        "sur tous les réels",
        "sur x ≤ 0"
      ],
      answer: 0,
      explanation: "La fonction √x est définie seulement pour x ≥ 0 et elle y est croissante."
    }
  ];

  let currentQuiz = [];

  function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function getRandomItems(array, count) {
    return shuffleArray(array).slice(0, count);
  }

  function updateChapterLink() {
    const selectedTheme = themeSelect.value;
    chapterLink.href = chapterLinks[selectedTheme];
  }

  function generateExercises() {
    const selectedTheme = themeSelect.value;
    const exercises = exerciseBank[selectedTheme];
    const randomExercises = getRandomItems(exercises, 3);

    exerciseList.innerHTML = "";

    const list = document.createElement("ol");
    list.className = "generated-exercises";

    randomExercises.forEach((exercise) => {
      const item = document.createElement("li");
      item.textContent = exercise;
      list.appendChild(item);
    });

    exerciseList.appendChild(list);
    updateChapterLink();
  }

  function getResultClass(score, total) {
    const ratio = score / total;
    if (ratio >= 0.8) return "result-good";
    if (ratio >= 0.5) return "result-mid";
    return "result-bad";
  }

  function getFeedbackMessage(score, total) {
    const ratio = score / total;
    if (ratio === 1) return "Excellent, tout est correct !";
    if (ratio >= 0.8) return "Très bon travail, tu maîtrises bien ces notions.";
    if (ratio >= 0.5) return "C’est encourageant, continue à t’entraîner.";
    return "Ce n’est pas grave, relis le cours et réessaie.";
  }

  function renderQuiz() {
    currentQuiz = getRandomItems(quizBank, 3);
    quizQuestions.innerHTML = "";
    quizResult.innerHTML = "";
    quizResult.className = "quiz-result";

    const scoreCard = document.createElement("div");
    scoreCard.className = "quiz-score-card";
    scoreCard.innerHTML = `
      <div class="quiz-score-percent" id="quizScorePercent">0%</div>
      <p>Score actuel</p>
    `;
    quizQuestions.appendChild(scoreCard);

    const progress = document.createElement("div");
    progress.className = "quiz-progress";
    progress.innerHTML = `
      <div class="quiz-progress-head">
        <span>Progression</span>
        <span id="quizProgressText">0 / 3 réponses</span>
      </div>
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" id="quizProgressFill"></div>
      </div>
    `;
    quizQuestions.appendChild(progress);

    currentQuiz.forEach((item, index) => {
      const questionBlock = document.createElement("div");
      questionBlock.className = "quiz-question";
      questionBlock.dataset.index = index;

      const title = document.createElement("h4");
      title.innerHTML = `${index + 1}. ${item.question}`;
      questionBlock.appendChild(title);

      const optionsContainer = document.createElement("div");
      optionsContainer.className = "quiz-options";

      item.options.forEach((option, optionIndex) => {
        const label = document.createElement("label");
        label.className = "quiz-option";
        label.innerHTML = `
          <input type="radio" name="q${index}" value="${optionIndex}">
          <span>${option}</span>
        `;
        optionsContainer.appendChild(label);
      });

      questionBlock.appendChild(optionsContainer);
      quizQuestions.appendChild(questionBlock);
    });

    addQuizOptionListeners();
    updateProgress();
  }

  function addQuizOptionListeners() {
    const radios = quizForm.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        updateProgress();

        const name = radio.name;
        const group = quizForm.querySelectorAll(`input[name="${name}"]`);
        group.forEach((input) => {
          const label = input.closest(".quiz-option");
          if (label) {
            label.classList.remove("selected");
          }
        });

        const selectedLabel = radio.closest(".quiz-option");
        if (selectedLabel) {
          selectedLabel.classList.add("selected");
        }
      });
    });
  }

  function updateProgress() {
    const answered = currentQuiz.filter((_, index) => {
      return quizForm.querySelector(`input[name="q${index}"]:checked`);
    }).length;

    const total = currentQuiz.length;
    const percent = total > 0 ? (answered / total) * 100 : 0;

    const progressText = document.getElementById("quizProgressText");
    const progressFill = document.getElementById("quizProgressFill");

    if (progressText) {
      progressText.textContent = `${answered} / ${total} réponses`;
    }

    if (progressFill) {
      progressFill.style.width = `${percent}%`;
    }
  }

  function correctQuiz(event) {
    event.preventDefault();

    let score = 0;
    let answered = 0;

    currentQuiz.forEach((item, index) => {
      const selected = quizForm.querySelector(`input[name="q${index}"]:checked`);
      const questionBlock = quizQuestions.querySelector(`.quiz-question[data-index="${index}"]`);
      const labels = questionBlock.querySelectorAll(".quiz-option");

      labels.forEach((label, labelIndex) => {
        label.classList.remove("correct", "wrong");
        const existingExplanation = questionBlock.querySelector(".quiz-explanation");
        if (existingExplanation) {
          existingExplanation.remove();
        }

        if (labelIndex === item.answer) {
          label.classList.add("correct");
        }
      });

      if (selected) {
        answered++;
        const selectedValue = Number(selected.value);

        if (selectedValue === item.answer) {
          score++;
        } else {
          const selectedLabel = selected.closest(".quiz-option");
          if (selectedLabel) {
            selectedLabel.classList.add("wrong");
          }
        }
      }

      const explanation = document.createElement("div");
      explanation.className = "quiz-explanation";
      explanation.innerHTML = `<strong>Correction :</strong> ${item.explanation}`;
      questionBlock.appendChild(explanation);
    });

    if (answered < currentQuiz.length) {
      quizResult.textContent = "Merci de répondre aux 3 questions avant de corriger.";
      quizResult.className = "quiz-result result-bad";
      return;
    }

    const percent = Math.round((score / currentQuiz.length) * 100);
    const scorePercent = document.getElementById("quizScorePercent");

    if (scorePercent) {
      scorePercent.textContent = `${percent}%`;
    }

    quizResult.className = `quiz-result ${getResultClass(score, currentQuiz.length)}`;
    quizResult.innerHTML = `
      Score : <strong>${score}/${currentQuiz.length}</strong><br>
      ${getFeedbackMessage(score, currentQuiz.length)}
    `;
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  if (dropdownToggle && navDropdown) {
    dropdownToggle.addEventListener("click", () => {
      const isOpen = navDropdown.classList.toggle("open");
      dropdownToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  if (themeSelect) {
    themeSelect.addEventListener("change", updateChapterLink);
  }

  if (generateBtn) {
    generateBtn.addEventListener("click", generateExercises);
  }

  if (quizForm) {
    quizForm.addEventListener("submit", correctQuiz);
  }

  if (newQuizBtn) {
    newQuizBtn.addEventListener("click", renderQuiz);
  }

  updateChapterLink();
  renderQuiz();
});
