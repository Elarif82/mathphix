document.addEventListener("DOMContentLoaded", () => {
  const faqForm = document.getElementById("faqForm");
  const questionInput = document.getElementById("questionInput");

  const faqResult = document.getElementById("faqResult");
  const faqSource = document.getElementById("faqSource");
  const faqQuestion = document.getElementById("faqQuestion");
  const faqAnswer = document.getElementById("faqAnswer");

  const faqLoading = document.getElementById("faqLoading");
  const faqError = document.getElementById("faqError");

  const suggestionButtons = document.querySelectorAll(".suggestion-btn");

  if (!faqForm || !questionInput || !faqResult || !faqLoading || !faqError) {
    console.warn("FAQ MathPhiX : certains éléments HTML sont manquants.");
    return;
  }

  function hideAllMessages() {
    faqResult.classList.add("hidden");
    faqLoading.classList.add("hidden");
    faqError.classList.add("hidden");
    faqError.textContent = "";
  }

  function showError(message = "Impossible d’obtenir une réponse. Réessaie.") {
    faqLoading.classList.add("hidden");
    faqResult.classList.add("hidden");
    faqError.textContent = message;
    faqError.classList.remove("hidden");
  }

  async function askFaq(question) {
    hideAllMessages();
    faqLoading.classList.remove("hidden");

    try {
      const response = await fetch("/api/faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      });

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error("Réponse serveur invalide.");
      }

      faqLoading.classList.add("hidden");

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Erreur inconnue.");
      }

      faqSource.textContent =
        data.source === "faq_locale"
          ? "Réponse issue de la FAQ MathPhiX"
          : "Réponse générée par l’assistant IA";

      faqQuestion.textContent = data.question || question;
      faqAnswer.textContent = data.answer || "Aucune réponse disponible.";

      faqResult.classList.remove("hidden");

      if (window.MathJax && typeof MathJax.typesetPromise === "function") {
        MathJax.typesetPromise([faqAnswer]).catch((error) => {
          console.warn("Erreur MathJax :", error);
        });
      }
    } catch (error) {
      console.error("Erreur FAQ frontend :", error);
      showError(error.message || "Impossible d’obtenir une réponse. Réessaie.");
    }
  }

  faqForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const question = questionInput.value.trim();

    if (!question) {
      showError("Merci d’écrire une question.");
      return;
    }

    askFaq(question);
    questionInput.value = "";
  });

  suggestionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const question = button.textContent.trim();

      if (!question) return;

      questionInput.value = question;
      askFaq(question);
      questionInput.value = "";
    });
  });
});

