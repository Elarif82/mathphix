document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // MENU MOBILE
  // =========================
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // =========================
  // MENU DÉROULANT
  // =========================
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const navDropdown = document.querySelector(".nav-dropdown");

  if (dropdownToggle && navDropdown) {
    dropdownToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = navDropdown.classList.toggle("open");
      dropdownToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
      if (!navDropdown.contains(event.target)) {
        navDropdown.classList.remove("open");
        dropdownToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

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

  function getRandomItems(array, count) {
    return shuffleArray(array).slice(0, count);
  }

  // =========================
  // GÉNÉRATEUR D'EXERCICES
  // =========================
  const themeSelect = document.getElementById("themeSelect");
  const generateBtn = document.getElementById("generateBtn");
  const exerciseList = document.getElementById("exerciseList");
  const chapterLink = document.getElementById("chapterLink");

  const exerciseBank = {
    "information-chiffree": [
      {
        title: "Exercice 1",
        content: "Un article coûte 80 €. Son prix augmente de 15 %. Calcule le nouveau prix."
      },
      {
        title: "Exercice 2",
        content: "La population d’une ville passe de 12 000 à 13 200 habitants. Calcule le taux d’évolution."
      },
      {
        title: "Exercice 3",
        content: "Un t-shirt subit une réduction de 20 %. Son prix initial est de 35 €. Calcule son nouveau prix."
      },
      {
        title: "Exercice 4",
        content: "Le prix d’un produit est multiplié par 1,08. Que représente ce coefficient multiplicateur ?"
      },
      {
        title: "Exercice 5",
        content: "Un salaire augmente de 5 % puis de 10 %. S’agit-il d’une hausse totale de 15 % ? Justifie."
      },
      {
        title: "Exercice 6",
        content: "Un ordinateur coûte 600 € après une baisse de 25 %. Quel était son prix initial ?"
      }
    ],
    statistiques: [
      {
        title: "Exercice 1",
        content: "Calcule la moyenne de la série : 8 ; 10 ; 12 ; 14 ; 16."
      },
      {
        title: "Exercice 2",
        content: "Détermine la médiane de la série : 3 ; 7 ; 9 ; 10 ; 15."
      },
      {
        title: "Exercice 3",
        content: "Dans une classe, les notes sont : 6 ; 8 ; 8 ; 10 ; 12 ; 12 ; 15. Donne l’étendue."
      },
      {
        title: "Exercice 4",
        content: "Un sondage donne les effectifs suivants : A = 12, B = 8, C = 5. Calcule la fréquence de B."
      },
      {
        title: "Exercice 5",
        content: "Voici une série : 4 ; 4 ; 5 ; 6 ; 6 ; 6 ; 9. Détermine le mode."
      },
      {
        title: "Exercice 6",
        content: "Calcule la moyenne pondérée des notes 8, 10 et 14 avec coefficients 1, 2 et 3."
      }
    ],
    probabilites: [
      {
        title: "Exercice 1",
        content: "On lance un dé équilibré à 6 faces. Quelle est la probabilité d’obtenir un nombre pair ?"
      },
      {
        title: "Exercice 2",
        content: "Dans une urne, il y a 3 boules rouges, 2 bleues et 5 vertes. Quelle est la probabilité de tirer une boule bleue ?"
      },
      {
        title: "Exercice 3",
        content: "On tire une carte au hasard dans un jeu de 4 cartes numérotées 1 à 4. Quelle est la probabilité d’obtenir un nombre supérieur à 2 ?"
      },
      {
        title: "Exercice 4",
        content: "On lance une pièce équilibrée. Quelle est la probabilité d’obtenir face ?"
      },
      {
        title: "Exercice 5",
        content: "On choisit au hasard un jour de la semaine. Quelle est la probabilité de choisir un week-end ?"
      },
      {
        title: "Exercice 6",
        content: "Dans un sac, il y a 7 billes jaunes et 3 billes noires. Quelle est la probabilité de tirer une bille noire ?"
      }
    ],
    echantillonnage: [
      {
        title: "Exercice 1",
        content: "Dans un échantillon de 100 élèves, 42 portent des lunettes. Quelle est la fréquence observée ?"
      },
      {
        title: "Exercice 2",
        content: "On répète une expérience aléatoire 200 fois et un événement se produit 58 fois. Calcule la fréquence de cet événement."
      },
      {
        title: "Exercice 3",
        content: "Explique la différence entre une probabilité théorique et une fréquence observée."
      },
      {
        title: "Exercice 4",
        content: "Dans un sondage de 500 personnes, 275 répondent “oui”. Quelle proportion cela représente-t-il ?"
      },
      {
        title: "Exercice 5",
        content: "Pourquoi la fréquence observée se rapproche-t-elle souvent de la probabilité lorsque le nombre d’essais augmente ?"
      },
      {
        title: "Exercice 6",
        content: "Dans un échantillon de 50 objets, 4 sont défectueux. Donne la fréquence des objets défectueux."
      }
    ]
  };

  const chapterLinks = {
    "information-chiffree": "information-chiffree.html",
    statistiques: "statistiques.html",
    probabilites: "probabilites.html",
    echantillonnage: "echantillonnage.html"
  };

  function generateExercises() {
    if (!themeSelect || !exerciseList || !chapterLink) return;

    const selectedTheme = themeSelect.value;
    const exercises = exerciseBank[selectedTheme] || [];
    const randomExercises = getRandomItems(exercises, 3);

    exerciseList.innerHTML = "";

    if (randomExercises.length === 0) {
      exerciseList.innerHTML = "<p>Aucun exercice disponible pour ce thème.</p>";
      return;
    }

    const title = document.createElement("p");
    title.className = "generated-title";
    title.textContent = "Voici 3 exercices aléatoires :";
    exerciseList.appendChild(title);

    const list = document.createElement("ol");
    list.className = "generated-exercises";

    randomExercises.forEach((exercise) => {
      const item = document.createElement("li");
      item.innerHTML = `<strong>${exercise.title} :</strong> ${exercise.content}`;
      list.appendChild(item);
    });

    exerciseList.appendChild(list);

    if (chapterLinks[selectedTheme]) {
      chapterLink.href = chapterLinks[selectedTheme];
    }
  }

  if (generateBtn) {
    generateBtn.addEventListener("click", generateExercises);
  }

  if (themeSelect && chapterLink) {
    themeSelect.addEventListener("change", () => {
      const selectedTheme = themeSelect.value;
      chapterLink.href = chapterLinks[selectedTheme] || "#";
    });
  }

  // =========================
  // QUIZ ALÉATOIRE
  // =========================
  const quizQuestionsContainer = document.getElementById("quizQuestions");
  const quizForm = document.getElementById("quizForm");
  const quizResult = document.getElementById("quizResult");
  const restartQuizBtn = document.getElementById("restartQuizBtn");
  const quizScorePercent = document.getElementById("quizScorePercent");
  const quizProgressText = document.getElementById("quizProgressText");
  const quizProgressFill = document.getElementById("quizProgressFill");

  const quizBank = [
    {
      question: "Une série est : 5 ; 7 ; 9. Quelle est sa moyenne ?",
      options: ["6", "7", "8"],
      answer: "7",
      explanation: "La moyenne est (5 + 7 + 9) ÷ 3 = 21 ÷ 3 = 7."
    },
    {
      question: "Dans la série 2 ; 4 ; 6 ; 8 ; 10, quelle est la médiane ?",
      options: ["4", "6", "8"],
      answer: "6",
      explanation: "La valeur centrale est 6."
    },
    {
      question: "On lance une pièce équilibrée. Quelle est la probabilité d’obtenir pile ?",
      options: ["1/2", "1/3", "2"],
      answer: "1/2",
      explanation: "Il y a 2 issues équiprobables : pile ou face."
    },
    {
      question: "Dans une urne avec 2 boules rouges et 3 boules bleues, quelle est la probabilité de tirer une boule rouge ?",
      options: ["2/5", "3/5", "1/5"],
      answer: "2/5",
      explanation: "Il y a 2 boules rouges sur 5 boules au total."
    },
    {
      question: "Une fréquence observée de 18 sur 60 vaut :",
      options: ["0,3", "0,4", "0,2"],
      answer: "0,3",
      explanation: "18 ÷ 60 = 0,3."
    },
    {
      question: "L’étendue d’une série vaut :",
      options: [
        "la plus grande valeur moins la plus petite",
        "la somme des valeurs",
        "la valeur du milieu"
      ],
      answer: "la plus grande valeur moins la plus petite",
      explanation: "L’étendue mesure l’écart entre la valeur maximale et la valeur minimale."
    },
    {
      question: "Un prix augmente de 10 %. Le coefficient multiplicateur associé est :",
      options: ["1,1", "0,9", "10"],
      answer: "1,1",
      explanation: "Pour une hausse de 10 %, on multiplie par 1 + 0,10 = 1,1."
    },
    {
      question: "La probabilité d’un événement impossible est :",
      options: ["0", "1", "1/2"],
      answer: "0",
      explanation: "Un événement impossible ne peut jamais se produire."
    },
    {
      question: "Dans la série 1 ; 1 ; 2 ; 3 ; 3 ; 3 ; 5, le mode est :",
      options: ["1", "3", "5"],
      answer: "3",
      explanation: "Le mode est la valeur la plus fréquente dans la série."
    },
    {
      question: "Si un événement se réalise 45 fois sur 100 essais, la fréquence observée est :",
      options: ["0,45", "45", "4,5"],
      answer: "0,45",
      explanation: "La fréquence observée est égale à 45 ÷ 100 = 0,45."
    },
    {
      question: "Dans une classe de 20 élèves, 5 ont eu plus de 15. Quelle est la fréquence correspondante ?",
      options: ["0,25", "0,5", "0,75"],
      answer: "0,25",
      explanation: "La fréquence est 5 ÷ 20 = 0,25."
    },
    {
      question: "On lance un dé équilibré. Quelle est la probabilité d’obtenir un nombre strictement supérieur à 4 ?",
      options: ["1/3", "1/2", "2/3"],
      answer: "1/3",
      explanation: "Les nombres strictement supérieurs à 4 sont 5 et 6, soit 2 issues sur 6, donc 2/6 = 1/3."
    }
  ];

  let currentQuiz = [];
  let quizLocked = false;

  function updateProgress(answeredCount = 0) {
    if (!quizProgressText || !quizProgressFill) return;

    const total = currentQuiz.length || 3;
    const percent = (answeredCount / total) * 100;

    quizProgressText.textContent = `${answeredCount} / ${total}`;
    quizProgressFill.style.width = `${percent}%`;
  }

  function countAnsweredQuestions() {
    return currentQuiz.filter((_, index) => {
      return document.querySelector(`input[name="question-${index}"]:checked`);
    }).length;
  }

  function renderQuiz() {
    if (!quizQuestionsContainer || !quizResult || !quizScorePercent) return;

    currentQuiz = getRandomItems(quizBank, 3);
    quizLocked = false;

    quizQuestionsContainer.innerHTML = "";
    quizResult.innerHTML = "";
    quizScorePercent.textContent = "0%";
    updateProgress(0);

    currentQuiz.forEach((item, index) => {
      const questionBlock = document.createElement("div");
      questionBlock.className = "quiz-question";

      const title = document.createElement("h3");
      title.textContent = `Question ${index + 1}`;
      questionBlock.appendChild(title);

      const statement = document.createElement("p");
      statement.textContent = item.question;
      questionBlock.appendChild(statement);

      const choices = document.createElement("div");
      choices.className = "quiz-options";

      item.options.forEach((option) => {
        const label = document.createElement("label");
        label.className = "quiz-option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = `question-${index}`;
        input.value = option;

        input.addEventListener("change", () => {
          if (quizLocked) return;
          updateProgress(countAnsweredQuestions());
        });

        const span = document.createElement("span");
        span.textContent = option;

        label.appendChild(input);
        label.appendChild(span);
        choices.appendChild(label);
      });

      const feedback = document.createElement("div");
      feedback.className = "quiz-feedback";
      feedback.id = `feedback-${index}`;

      questionBlock.appendChild(choices);
      questionBlock.appendChild(feedback);

      quizQuestionsContainer.appendChild(questionBlock);
    });
  }

  function clearOptionStyles(questionIndex) {
    const options = document.querySelectorAll(`input[name="question-${questionIndex}"]`);
    options.forEach((input) => {
      const label = input.closest(".quiz-option");
      if (label) {
        label.classList.remove("correct", "wrong");
      }
    });
  }

  function correctQuiz(event) {
    event.preventDefault();

    if (quizLocked) return;

    let score = 0;
    let answeredCount = 0;

    currentQuiz.forEach((item, index) => {
      const selected = document.querySelector(`input[name="question-${index}"]:checked`);
      const feedback = document.getElementById(`feedback-${index}`);
      const allOptions = document.querySelectorAll(`input[name="question-${index}"]`);

      clearOptionStyles(index);

      if (!feedback) return;

      allOptions.forEach((input) => {
        const label = input.closest(".quiz-option");
        if (!label) return;

        if (input.value === item.answer) {
          label.classList.add("correct");
        }
      });

      if (!selected) {
        feedback.innerHTML = `
          <p>⚠️ Tu n’as pas répondu à cette question.</p>
          <p><strong>Bonne réponse :</strong> ${item.answer}</p>
          <p>${item.explanation}</p>
        `;
        return;
      }

      answeredCount++;

      if (selected.value === item.answer) {
        score++;
        feedback.innerHTML = `
          <p>✅ Bonne réponse !</p>
          <p>${item.explanation}</p>
        `;
      } else {
        const selectedLabel = selected.closest(".quiz-option");
        if (selectedLabel) {
          selectedLabel.classList.add("wrong");
        }

        feedback.innerHTML = `
          <p>❌ Mauvaise réponse.</p>
          <p><strong>Bonne réponse :</strong> ${item.answer}</p>
          <p>${item.explanation}</p>
        `;
      }

      allOptions.forEach((input) => {
        input.disabled = true;
      });
    });

    quizLocked = true;

    const total = currentQuiz.length;
    const percentage = Math.round((score / total) * 100);
    quizScorePercent.textContent = `${percentage}%`;
    updateProgress(answeredCount);

    let resultClass = "result-bad";
    let resultMessage = "Continue, tu vas progresser avec l’entraînement.";

    if (percentage >= 80) {
      resultClass = "result-good";
      resultMessage = "Excellent travail ! Tu maîtrises bien ces notions.";
    } else if (percentage >= 50) {
      resultClass = "result-mid";
      resultMessage = "C’est bien, tu avances. Encore un peu d’entraînement pour consolider.";
    }

    quizResult.innerHTML = `
      <p class="${resultClass}"><strong>Résultat :</strong> ${score} bonne(s) réponse(s) sur ${total}.</p>
      <p>${resultMessage}</p>
    `;
  }

  if (quizForm) {
    quizForm.addEventListener("submit", correctQuiz);
  }

  if (restartQuizBtn) {
    restartQuizBtn.addEventListener("click", renderQuiz);
  }

  // =========================
  // INITIALISATION
  // =========================
  renderQuiz();
});
