document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     MENU MOBILE
  ========================= */
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* =========================
     DROPDOWN MENU
  ========================= */
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const navDropdown = document.querySelector(".nav-dropdown");

  if (dropdownToggle && navDropdown) {
    dropdownToggle.addEventListener("click", () => {
      const isOpen = navDropdown.classList.toggle("open");
      dropdownToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    document.addEventListener("click", (event) => {
      if (!navDropdown.contains(event.target)) {
        navDropdown.classList.remove("open");
        dropdownToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* =========================
     OUTILS
  ========================= */
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

  function vector(text) {
    return `<span class="math-vector">${text}</span>`;
  }

  /* =========================
     GENERATEUR D'EXERCICES
  ========================= */
  const exercisesBank = {
    trigonometrie: [
      "Dans un triangle rectangle, calcule le cosinus d’un angle sachant que le côté adjacent mesure 4 cm et l’hypoténuse 5 cm.",
      "Dans un triangle rectangle, calcule la longueur du côté opposé à un angle de 30° si l’hypoténuse mesure 10 cm.",
      "Dans un triangle rectangle, exprime la tangente d’un angle aigu.",
      "Un triangle rectangle a pour côtés 6 cm, 8 cm et 10 cm. Vérifie qu’il est rectangle puis calcule le sinus d’un angle aigu adapté.",
      "Dans un triangle rectangle, l’angle α a pour cosinus 0,8. Que peux-tu dire du rapport entre le côté adjacent et l’hypoténuse ?",
      "Calcule la valeur approchée de tan(45°)."
    ],
    reperage: [
      "Place les points A(2 ; 3), B(-1 ; 4) et C(0 ; -2) dans un repère.",
      "Donne les coordonnées du milieu du segment reliant A(2 ; 6) et B(4 ; 10).",
      "Lis les coordonnées d’un point situé sur l’axe des abscisses. Que vaut alors son ordonnée ?",
      "Deux points ont pour coordonnées A(-3 ; 5) et B(1 ; 5). Que peux-tu dire du segment [AB] ?",
      "Calcule la distance sur un axe entre les points d’abscisses -2 et 7.",
      "Détermine dans quel quadrant se situe le point M(-4 ; -3)."
    ],
    vecteurs: [
      `Recopie et complète : deux vecteurs sont égaux s’ils ont la même direction, le même sens et la même longueur.`,
      `Dans un repère, A(1 ; 2) et B(4 ; 6). Donne les coordonnées du vecteur ${vector("AB")}.`,
      `On sait que le vecteur ${vector("AB")} = (3 ; -2). Si A(1 ; 5), quelles sont les coordonnées de B ?`,
      `Explique la relation de Chasles avec les points A, B et C.`,
      `Les vecteurs u(2 ; 3) et v(4 ; 6) sont-ils colinéaires ?`,
      `Soit A(0 ; 1) et B(6 ; 5). Détermine les coordonnées du milieu de [AB].`
    ],
    droites: [
      "Détermine le coefficient directeur de la droite passant par les points A(1 ; 2) et B(3 ; 6).",
      "Une droite a pour équation y = 2x + 5. Donne son coefficient directeur et son ordonnée à l’origine.",
      "Les droites y = 3x - 1 et y = 3x + 4 sont-elles parallèles ? Justifie.",
      "Une droite verticale passe par le point A(4 ; 2). Quelle relation vérifient les points de cette droite ?",
      "Une droite horizontale passe par le point B(-1 ; 7). Quelle est son équation ?",
      "La droite d’équation y = -x + 2 passe-t-elle par le point C(3 ; -1) ?"
    ]
  };

  const themeSelect = document.getElementById("themeSelect");
  const generateBtn = document.getElementById("generateBtn");
  const exerciseList = document.getElementById("exerciseList");
  const chapterLink = document.getElementById("chapterLink");

  function updateChapterLink() {
    if (!themeSelect || !chapterLink) return;
    const selectedOption = themeSelect.options[themeSelect.selectedIndex];
    const link = selectedOption.dataset.link || "#";
    chapterLink.setAttribute("href", link);
  }

  function generateExercises() {
    if (!themeSelect || !exerciseList) return;

    const selectedTheme = themeSelect.value;
    const exercises = exercisesBank[selectedTheme] || [];
    const randomExercises = getRandomItems(exercises, 3);
    const selectedLabel = themeSelect.options[themeSelect.selectedIndex].text;

    if (randomExercises.length === 0) {
      exerciseList.innerHTML = `
        <p class="generator-placeholder">
          Aucun exercice disponible pour ce thème.
        </p>
      `;
      return;
    }

    exerciseList.innerHTML = `
      <div class="generated-content">
        <p class="generated-title">Thème sélectionné : ${selectedLabel}</p>
        <ol>
          ${randomExercises.map((exercise) => `<li>${exercise}</li>`).join("")}
        </ol>
      </div>
    `;
  }

  if (themeSelect) {
    updateChapterLink();
    themeSelect.addEventListener("change", updateChapterLink);
  }

  if (generateBtn) {
    generateBtn.addEventListener("click", generateExercises);
  }

  /* =========================
     QUIZ
  ========================= */
  const quizBank = [
    {
      question: "Dans un triangle rectangle, le cosinus d’un angle aigu est :",
      options: [
        "côté opposé / hypoténuse",
        "côté adjacent / hypoténuse",
        "côté opposé / côté adjacent"
      ],
      answer: 1,
      explanation: "Le cosinus d’un angle aigu dans un triangle rectangle est égal au rapport côté adjacent / hypoténuse."
    },
    {
      question: "Le milieu du segment reliant A(2 ; 4) et B(6 ; 8) est :",
      options: [
        "(4 ; 6)",
        "(8 ; 12)",
        "(2 ; 2)"
      ],
      answer: 0,
      explanation: "On calcule le milieu en faisant la moyenne des abscisses et la moyenne des ordonnées : ((2+6)/2 ; (4+8)/2) = (4 ; 6)."
    },
    {
      question: "Deux droites non verticales sont parallèles si :",
      options: [
        "elles ont la même ordonnée à l’origine",
        "elles passent par l’origine",
        "elles ont le même coefficient directeur"
      ],
      answer: 2,
      explanation: "Deux droites non verticales sont parallèles lorsqu’elles ont le même coefficient directeur."
    },
    {
      question: "Si un point est sur l’axe des ordonnées, alors :",
      options: [
        "son abscisse est nulle",
        "son ordonnée est nulle",
        "ses deux coordonnées sont nulles"
      ],
      answer: 0,
      explanation: "Tout point situé sur l’axe des ordonnées a une abscisse égale à 0."
    },
    {
      question: `Le vecteur ${vector("AB")} allant de A(1 ; 2) vers B(5 ; 7) a pour coordonnées :`,
      options: [
        "(4 ; 5)",
        "(6 ; 9)",
        "(-4 ; -5)"
      ],
      answer: 0,
      explanation: `On calcule les coordonnées du vecteur ${vector("AB")} en faisant B - A : (5-1 ; 7-2) = (4 ; 5).`
    },
    {
      question: "La droite d’équation y = 3x + 2 a pour coefficient directeur :",
      options: [
        "2",
        "3",
        "-3"
      ],
      answer: 1,
      explanation: "Dans une équation de la forme y = mx + p, le coefficient directeur est m. Ici, m = 3."
    },
    {
      question: "Une droite horizontale a pour équation :",
      options: [
        "x = a",
        "y = b",
        "y = ax + b avec a non nul"
      ],
      answer: 1,
      explanation: "Une droite horizontale a une ordonnée constante, donc une équation de la forme y = b."
    },
    {
      question: "Dans un repère, le point M(-3 ; 4) se situe :",
      options: [
        "dans le 1er quadrant",
        "dans le 2e quadrant",
        "dans le 4e quadrant"
      ],
      answer: 1,
      explanation: "Abscisse négative et ordonnée positive : le point est dans le 2e quadrant."
    },
    {
      question: "La relation de Chasles s’écrit :",
      options: [
        `${vector("AB")} + ${vector("BC")} = ${vector("AC")}`,
        `${vector("AB")} + ${vector("AC")} = ${vector("BC")}`,
        `${vector("BA")} + ${vector("BC")} = ${vector("AC")}`
      ],
      answer: 0,
      explanation: `La relation de Chasles est : ${vector("AB")} + ${vector("BC")} = ${vector("AC")}.`
    },
    {
      question: "Dans un triangle rectangle, la tangente d’un angle aigu est :",
      options: [
        "côté opposé / côté adjacent",
        "côté adjacent / hypoténuse",
        "côté opposé / hypoténuse"
      ],
      answer: 0,
      explanation: "La tangente d’un angle aigu est égale au rapport côté opposé / côté adjacent."
    }
  ];

  const quizForm = document.getElementById("quizForm");
  const quizQuestions = document.getElementById("quizQuestions");
  const quizResult = document.getElementById("quizResult");
  const newQuizBtn = document.getElementById("newQuizBtn");
  const quizScorePercent = document.getElementById("quizScorePercent");
  const quizScoreText = document.getElementById("quizScoreText");
  const quizProgressText = document.getElementById("quizProgressText");
  const quizProgressFill = document.getElementById("quizProgressFill");

  let currentQuizQuestions = [];

  function updateProgress() {
    if (!quizForm || !quizProgressText || !quizProgressFill) return;

    const checkedInputs = quizForm.querySelectorAll('#quizQuestions input[type="radio"]:checked');
    const answeredCount = checkedInputs.length;
    const total = currentQuizQuestions.length || 3;
    const percent = total > 0 ? (answeredCount / total) * 100 : 0;

    quizProgressText.textContent = `${answeredCount} / ${total} répondues`;
    quizProgressFill.style.width = `${percent}%`;
  }

  function resetScoreDisplay() {
    if (quizScorePercent) quizScorePercent.textContent = "0%";
    if (quizScoreText) quizScoreText.textContent = "0 bonne réponse sur 3";
    if (quizProgressText) quizProgressText.textContent = "0 / 3 répondues";
    if (quizProgressFill) quizProgressFill.style.width = "0%";
    if (quizResult) quizResult.innerHTML = "";
  }

  function renderQuiz() {
    if (!quizQuestions) return;

    currentQuizQuestions = getRandomItems(quizBank, 3);
    resetScoreDisplay();

    quizQuestions.innerHTML = currentQuizQuestions
      .map((item, questionIndex) => {
        const optionsHtml = item.options
          .map((option, optionIndex) => {
            const inputId = `q${questionIndex}_option${optionIndex}`;
            return `
              <label for="${inputId}">
                <input
                  type="radio"
                  id="${inputId}"
                  name="q${questionIndex}"
                  value="${optionIndex}"
                >
                <span>${option}</span>
              </label>
            `;
          })
          .join("");

        return `
          <div class="quiz-question" data-question-index="${questionIndex}">
            <p><strong>${questionIndex + 1}.</strong> ${item.question}</p>
            <div class="quiz-options">
              ${optionsHtml}
            </div>
            <div class="quiz-feedback" id="feedback-${questionIndex}" style="display:none;"></div>
          </div>
        `;
      })
      .join("");

    const radios = quizQuestions.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
      radio.addEventListener("change", updateProgress);
    });
  }

  function correctQuiz(event) {
    event.preventDefault();
    if (!quizForm || !quizResult || currentQuizQuestions.length === 0) return;

    let score = 0;
    let answeredCount = 0;

    currentQuizQuestions.forEach((item, index) => {
      const selected = quizForm.querySelector(`input[name="q${index}"]:checked`);
      const feedbackBox = document.getElementById(`feedback-${index}`);
      const questionBox = quizForm.querySelector(`[data-question-index="${index}"]`);
      const labels = questionBox ? questionBox.querySelectorAll("label") : [];

      if (questionBox) {
        questionBox.classList.remove("correct", "incorrect", "unanswered");
      }

      labels.forEach((label) => {
        label.classList.remove("option-correct", "option-wrong", "option-answer");
      });

      if (feedbackBox) {
        feedbackBox.style.display = "block";
        feedbackBox.innerHTML = "";
      }

      if (!selected) {
        const correctLabel = labels[item.answer];
        if (correctLabel) {
          correctLabel.classList.add("option-answer");
        }

        if (questionBox) {
          questionBox.classList.add("unanswered");
        }

        if (feedbackBox) {
          feedbackBox.innerHTML = `
            <p><strong>Question non répondue.</strong></p>
            <p><strong>Bonne réponse :</strong> ${item.options[item.answer]}</p>
            <div class="quiz-explanation">
              <strong>Explication :</strong> ${item.explanation}
            </div>
          `;
        }
        return;
      }

      answeredCount++;
      const selectedValue = Number(selected.value);

      if (selectedValue === item.answer) {
        score++;
        if (questionBox) {
          questionBox.classList.add("correct");
        }

        labels[selectedValue]?.classList.add("option-correct");

        if (feedbackBox) {
          feedbackBox.innerHTML = `
            <p><strong>Bonne réponse.</strong></p>
            <div class="quiz-explanation">
              <strong>Explication :</strong> ${item.explanation}
            </div>
          `;
        }
      } else {
        if (questionBox) {
          questionBox.classList.add("incorrect");
        }

        labels[selectedValue]?.classList.add("option-wrong");
        labels[item.answer]?.classList.add("option-answer");

        if (feedbackBox) {
          feedbackBox.innerHTML = `
            <p><strong>Réponse incorrecte.</strong></p>
            <p><strong>Bonne réponse :</strong> ${item.options[item.answer]}</p>
            <div class="quiz-explanation">
              <strong>Explication :</strong> ${item.explanation}
            </div>
          `;
        }
      }
    });

    const total = currentQuizQuestions.length;
    const percent = total > 0 ? Math.round((score / total) * 100) : 0;

    if (quizScorePercent) quizScorePercent.textContent = `${percent}%`;
    if (quizScoreText) {
      quizScoreText.textContent = `${score} bonne${score > 1 ? "s" : ""} réponse${score > 1 ? "s" : ""} sur ${total}`;
    }

    let appreciation = "";
    let resultClass = "";

    if (score === 3) {
      appreciation = "Excellent, tu maîtrises très bien ces notions de géométrie.";
      resultClass = "result-good";
    } else if (score === 2) {
      appreciation = "Bon travail, encore un petit effort pour tout réussir.";
      resultClass = "result-mid";
    } else if (score === 1) {
      appreciation = "Tu as quelques bases, continue à t’entraîner.";
      resultClass = "result-mid";
    } else {
      appreciation = "Ce n’est pas grave, relis le cours et recommence avec un nouveau quiz.";
      resultClass = "result-bad";
    }

    quizResult.innerHTML = `
      <p><strong>Score final : ${score}/${total}</strong></p>
      <p class="${resultClass}">${appreciation}</p>
      <p>Questions répondues : ${answeredCount}/${total}</p>
    `;
  }

  if (quizForm) {
    quizForm.addEventListener("submit", correctQuiz);
  }

  if (newQuizBtn) {
    newQuizBtn.addEventListener("click", renderQuiz);
  }

  renderQuiz();
});
