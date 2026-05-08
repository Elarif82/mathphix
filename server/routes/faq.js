// =====================================================
// routes/faq.js — MathPhiX FAQ intelligente
// =====================================================

const express = require("express");
const router = express.Router();

const { findBestFaqMatch } = require("../services/faqMatcher");
const { askOpenAI } = require("../services/openaiService");

function detectNotion(text) {
  const q = text.toLowerCase();

  if (q.includes("inéquation") || q.includes("inequation") || /[<>≤≥]/.test(q)) {
    return "inequation";
  }

  if (q.includes("équation") || q.includes("equation") || q.includes("=")) {
    return "equation";
  }

  if (q.includes("intervalle") || q.includes("intervalles")) {
    return "intervalle";
  }

  if (q.includes("fonction") || q.includes("f(x)")) {
    return "fonction";
  }

  if (q.includes("fraction") || q.includes("fractions")) {
    return "fraction";
  }

  if (q.includes("puissance") || q.includes("puissances")) {
    return "puissance";
  }

  if (q.includes("racine carrée") || q.includes("racine carree")) {
    return "racine";
  }

  return "autre";
}

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        error: "Veuillez entrer une question."
      });
    }

    const localMatch = findBestFaqMatch(question);

    if (localMatch) {
      const userNotion = detectNotion(question);
      const faqNotion = detectNotion(localMatch.question + " " + localMatch.answer);

      const notionCompatible =
        userNotion === "autre" ||
        faqNotion === "autre" ||
        userNotion === faqNotion;

      if (notionCompatible) {
        return res.json({
          success: true,
          source: "faq_locale",
          question: localMatch.question,
          answer: localMatch.answer
        });
      }

      console.log("FAQ locale ignorée : notion différente", {
        questionUtilisateur: question,
        notionUtilisateur: userNotion,
        questionFaq: localMatch.question,
        notionFaq: faqNotion
      });
    }

    const aiAnswer = await askOpenAI(question);

    return res.json({
      success: true,
      source: "openai",
      question,
      answer: aiAnswer
    });
  } catch (error) {
    console.error("Erreur FAQ :", error);
    return res.status(500).json({
      success: false,
      error: "Une erreur est survenue côté serveur."
    });
  }
});

module.exports = router;

