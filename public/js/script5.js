document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     MENU MOBILE + DROPDOWN
  ========================= */
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const navDropdown = document.querySelector(".nav-dropdown");
  const dropdownToggle = document.querySelector(".dropdown-toggle");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  if (navDropdown && dropdownToggle) {
    dropdownToggle.addEventListener("click", () => {
      if (window.innerWidth <= 780) {
        const isOpen = navDropdown.classList.toggle("open");
        dropdownToggle.setAttribute("aria-expanded", String(isOpen));
      }
    });
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 780) {
      mainNav?.classList.remove("open");
      navDropdown?.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      dropdownToggle?.setAttribute("aria-expanded", "false");
    }
  });

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

  /* =========================
     GÉNÉRATEUR D’EXERCICES
  ========================= */
  const exerciseBank = {
    "base-python": [
      "Écris un programme qui demande un nombre à l’utilisateur puis affiche son double.",
      "Déclare deux variables a et b puis affiche leur somme.",
      "Écris un programme qui stocke un âge dans une variable puis affiche une phrase avec cet âge.",
      "Corrige cette ligne : if x = 4 :",
      "Écris une condition qui affiche « positif » si un nombre est supérieur à 0.",
      "Écris une boucle for qui affiche les nombres de 1 à 5.",
      "Crée une fonction carre(x) qui renvoie le carré d’un nombre.",
      "Écris un programme qui teste si un nombre est pair ou impair.",
      "Fais un programme qui affiche les multiples de 2 de 2 à 12.",
      "Explique le rôle de print() dans un programme Python.",
      "Écris un programme qui calcule le produit de deux variables.",
      "Complète une boucle for pour afficher 0, 1, 2, 3, 4."
    ],
    "applications-maths": [
      "Écris un programme qui calcule l’image de 4 par la fonction f(x)=2x+3.",
      "Programme le calcul du périmètre d’un rectangle de longueur 7 et largeur 3.",
      "Écris un script qui calcule la moyenne de trois notes : 11, 14 et 17.",
      "Teste par programme si 6 est solution de l’équation x + 4 = 10.",
      "Écris un programme qui calcule l’aire d’un disque de rayon 5 avec π = 3,14.",
      "Programme une boucle qui affiche les carrés des entiers de 1 à 6.",
      "Écris un script qui calcule la distance avec la formule d = v × t.",
      "Crée un programme qui compare deux nombres et affiche le plus grand.",
      "Simule 5 lancers d’une pièce avec randint(0,1).",
      "Programme le calcul de f(x)=x²−4x+1 pour x = 3.",
      "Écris un programme qui calcule une hausse de 20 % sur un prix donné.",
      "Fais un script qui calcule l’aire d’un triangle à partir de sa base et de sa hauteur."
    ]
  };

  const themeSelect = document.getElementById("themeSelect");
  const generateBtn = document.getElementById("generateBtn");
  const exerciseList = document.getElementById("exerciseList");
  const chapterLink = document.getElementById("chapterLink");

  function updateChapterLink() {
    if (!themeSelect || !chapterLink) return;
    const selectedOption = themeSelect.options[themeSelect.selectedIndex];
    chapterLink.href = selectedOption.dataset.link || "#";
  }

  function renderExercises() {
    if (!themeSelect || !exerciseList) return;

    const selectedTheme = themeSelect.value;
    const exercises = exerciseBank[selectedTheme] || [];
    const randomExercises = getRandomItems(exercises, 3);

    exerciseList.innerHTML = "";

    randomExercises.forEach((exercise, index) => {
      const article = document.createElement("article");
      article.className = "exercise-item";
      article.innerHTML = `
        <h4>Exercice ${index + 1}</h4>
        <p>${exercise}</p>
      `;
      exerciseList.appendChild(article);
    });

    updateChapterLink();
  }

  if (generateBtn && themeSelect && exerciseList && chapterLink) {
    generateBtn.addEventListener("click", renderExercises);

    themeSelect.addEventListener("change", () => {
      updateChapterLink();
      exerciseList.innerHTML = `
        <p>Sélection effectuée. Clique sur le bouton pour afficher 3 nouveaux exercices.</p>
      `;
    });

    updateChapterLink();
  }

  /* =========================
     QUIZ ALÉATOIRE
  ========================= */
  const quizBank = [
    {
      question: "À quoi sert une variable en Python ?",
      options: [
        "À stocker une valeur",
        "À effacer le programme",
        "À dessiner une figure",
        "À ouvrir un site internet"
      ],
      answer: 0,
      explanation: "Une variable permet de mémoriser une valeur pour la réutiliser plus tard."
    },
    {
      question: "Quelle fonction permet d’afficher un résultat à l’écran ?",
      options: ["show()", "display()", "print()", "screen()"],
      answer: 2,
      explanation: "La fonction print() sert à afficher du texte ou le contenu d’une variable."
    },
    {
      question: "Que fait une instruction if ?",
      options: [
        "Elle répète une action",
        "Elle teste une condition",
        "Elle crée une fonction",
        "Elle ferme Python"
      ],
      answer: 1,
      explanation: "if permet d’exécuter un bloc d’instructions seulement si une condition est vraie."
    },
    {
      question: "Que fait une boucle for ?",
      options: [
        "Elle répète une action plusieurs fois",
        "Elle compare deux nombres",
        "Elle crée un tableau",
        "Elle remplace une variable"
      ],
      answer: 0,
      explanation: "Une boucle for permet de répéter une instruction ou un groupe d’instructions."
    },
    {
      question: "Quelle écriture est correcte pour tester si x est égal à 5 ?",
      options: ["if x = 5:", "if x == 5:", "if x := 5:", "if x equal 5:"],
      answer: 1,
      explanation: "En Python, on utilise == pour tester une égalité."
    },
    {
      question: "Que renvoie 2 ** 3 ?",
      options: ["5", "6", "8", "9"],
      answer: 2,
      explanation: "L’écriture 2 ** 3 signifie 2 puissance 3, donc 8."
    },
    {
      question: "Combien de fois s’exécute la boucle for i in range(4) ?",
      options: ["3 fois", "4 fois", "5 fois", "6 fois"],
      answer: 1,
      explanation: "range(4) produit 0, 1, 2, 3, soit 4 valeurs."
    },
    {
      question: "À quoi sert une fonction en Python ?",
      options: [
        "À regrouper des instructions réutilisables",
        "À changer la couleur de l’écran",
        "À écrire plus lentement",
        "À supprimer les variables"
      ],
      answer: 0,
      explanation: "Une fonction permet de réutiliser facilement un même bloc d’instructions."
    },
    {
      question: "Que peut faire Python en maths ?",
      options: [
        "Seulement écrire du texte",
        "Calculer, tester et simuler",
        "Uniquement tracer des droites",
        "Remplacer complètement le raisonnement"
      ],
      answer: 1,
      explanation: "Python aide à effectuer des calculs, à tester des idées et à simuler des expériences."
    },
    {
      question: "Quel est le rôle d’un algorithme ?",
      options: [
        "Décorer le programme",
        "Donner une suite d’étapes pour résoudre un problème",
        "Créer uniquement des boucles",
        "Faire disparaître les erreurs"
      ],
      answer: 1,
      explanation: "Un algorithme décrit une suite d’étapes ordonnées pour résoudre un problème."
    },
    {
      question: "Dans print(i), que représente i dans une boucle for ?",
      options: [
        "Le nom du programme",
        "Une variable de boucle",
        "Une vidéo",
        "Une erreur"
      ],
      answer: 1,
      explanation: "Dans une boucle for, i est souvent la variable qui prend successivement plusieurs valeurs."
    },
    {
      question: "Quel module peut être utilisé pour des tirages aléatoires simples ?",
      options: ["math", "random", "python", "loop"],
      answer: 1,
      explanation: "Le module random permet de faire des tirages aléatoires."
    }
  ];

  const quizForm = document.getElementById("quizForm");
  const quizQuestions = document.getElementById("quizQuestions");
  const quizResult = document.getElementById("quizResult");
  const restartQuizBtn = document.getElementById("restartQuizBtn");
  const quizScorePercent = document.getElementById("quizScorePercent");
  const quizProgressText = document.getElementById("quizProgressText");
  const quizProgressFill = document.getElementById("quizProgressFill");

  let currentQuiz = [];

  function updateQuizProgress() {
    if (!quizForm || !quizProgressText || !quizProgressFill) return;

    const checkedAnswers = quizForm.querySelectorAll('input[type="radio"]:checked').length;
    quizProgressText.textContent = `${checkedAnswers} / 3`;
    quizProgressFill.style.width = `${(checkedAnswers / 3) * 100}%`;
  }

  function renderQuiz() {
    if (!quizQuestions || !quizResult || !quizScorePercent || !quizProgressText || !quizProgressFill) return;

    currentQuiz = getRandomItems(quizBank, 3);
    quizQuestions.innerHTML = "";
    quizResult.innerHTML = "";
    quizScorePercent.textContent = "0%";
    quizProgressText.textContent = "0 / 3";
    quizProgressFill.style.width = "0%";

    currentQuiz.forEach((item, index) => {
      const block = document.createElement("div");
      block.className = "quiz-question";

      const optionsHTML = item.options
        .map(
          (option, optionIndex) => `
            <label class="quiz-option" data-question="${index}" data-option="${optionIndex}">
              <input type="radio" name="question-${index}" value="${optionIndex}">
              <span>${option}</span>
            </label>
          `
        )
        .join("");

      block.innerHTML = `
        <h4>${index + 1}. ${item.question}</h4>
        <div class="quiz-options">${optionsHTML}</div>
        <div class="quiz-explanation" id="explanation-${index}" hidden></div>
      `;

      quizQuestions.appendChild(block);
    });

    const radios = quizForm.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
      radio.addEventListener("change", updateQuizProgress);
    });
  }

  function correctQuiz(event) {
    event.preventDefault();

    if (!quizForm || !quizResult || !quizScorePercent) return;

    let score = 0;
    let answered = 0;

    currentQuiz.forEach((item, index) => {
      const selected = quizForm.querySelector(`input[name="question-${index}"]:checked`);
      const optionLabels = quizForm.querySelectorAll(`label[data-question="${index}"]`);
      const explanationBox = document.getElementById(`explanation-${index}`);

      optionLabels.forEach((label) => {
        label.classList.remove("correct", "wrong");
      });

      if (selected) {
        answered++;
        const selectedValue = Number(selected.value);

        optionLabels.forEach((label) => {
          const optionIndex = Number(label.dataset.option);

          if (optionIndex === item.answer) {
            label.classList.add("correct");
          }

          if (optionIndex === selectedValue && selectedValue !== item.answer) {
            label.classList.add("wrong");
          }
        });

        if (selectedValue === item.answer) {
          score++;
        }
      } else {
        optionLabels.forEach((label) => {
          const optionIndex = Number(label.dataset.option);
          if (optionIndex === item.answer) {
            label.classList.add("correct");
          }
        });
      }

      if (explanationBox) {
        explanationBox.hidden = false;
        explanationBox.innerHTML = `<strong>Explication :</strong> ${item.explanation}`;
      }
    });

    const percent = Math.round((score / 3) * 100);
    quizScorePercent.textContent = `${percent}%`;

    let resultClass = "result-mid";
    let message = `Tu as obtenu ${score} / 3.`;

    if (score === 3) {
      resultClass = "result-good";
      message += " Excellent travail, tu maîtrises très bien ces notions.";
    } else if (score === 2) {
      resultClass = "result-mid";
      message += " C’est bien, tu es sur la bonne voie.";
    } else {
      resultClass = "result-bad";
      message += " Continue à t’entraîner pour progresser.";
    }

    if (answered < 3) {
      message += " Tu n’avais pas répondu à toutes les questions, mais les bonnes réponses sont maintenant affichées.";
    }

    quizResult.className = `quiz-result ${resultClass}`;
    quizResult.textContent = message;
  }

  if (quizForm && quizQuestions && restartQuizBtn) {
    quizForm.addEventListener("submit", correctQuiz);
    restartQuizBtn.addEventListener("click", renderQuiz);
    renderQuiz();
  }
});
