// =====================================================
// routes/faq.js — MathPhiX FAQ intelligente
// =====================================================

const express = require("express");
const router = express.Router();

const { findBestFaqMatch } = require("../services/faqMatcher");
const { askOpenAI } = require("../services/openaiService");

const MAX_QUESTION_LENGTH = 2000;

// Normaliser les accents et la casse pour la détection.
function normalizeText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// Détecter les notions explicites avant les symboles.
// Plusieurs notions sont possibles dans une même question.
function detectNotions(text) {
  const q = normalizeText(text);
  const notions = new Set();

  const rules = [
    ["inequation", /\binequations?\b/],
    ["equation", /\bequations?\b/],
    ["intervalle", /\bintervalles?\b/],
    ["fonction", /\bfonctions?\b|\bimages?\b|\bantecedents?\b/],
    ["fraction", /\bfractions?\b/],
    ["puissance", /\bpuissances?\b/],
    ["racine", /\bracines?\b/],
    ["expression", /\bexpressions?\b/],
  ];

  for (const [notion, pattern] of rules) {
    if (pattern.test(q)) {
      notions.add(notion);
    }
  }

  // Les symboles servent uniquement en l'absence
  // d'une notion explicitement nommée.
  if (notions.size === 0) {
    if (/\bf\s*\(\s*x\s*\)/.test(q)) {
      notions.add("fonction");
    } else if (/[<>≤≥]/.test(q)) {
      notions.add("inequation");
    } else if (q.includes("=")) {
      notions.add("equation");
    }
  }

  return notions;
}

function notionsAreCompatible(userNotions, faqNotions) {
  // Conserver le comportement du matcher pour les questions
  // générales sur le fonctionnement du site.
  if (userNotions.size === 0) {
    return true;
  }

  // Si la FAQ n'est pas classifiable, privilégier l'IA.
  if (faqNotions.size === 0) {
    return false;
  }

  // Pour une question comparant plusieurs notions,
  // la FAQ doit couvrir toutes les notions détectées.
  return [...userNotions].every((notion) => faqNotions.has(notion));
}

router.post("/", async (req, res) => {
  try {
    const question = req.body?.question;

    if (typeof question !== "string" || !question.trim()) {
      return res.status(400).json({
        success: false,
        error: "Veuillez entrer une question.",
      });
    }

    const cleanQuestion = question.trim();

    if (cleanQuestion.length > MAX_QUESTION_LENGTH) {
      return res.status(400).json({
        success: false,
        error: `Votre question doit contenir au maximum ${MAX_QUESTION_LENGTH} caractères.`,
      });
    }

    // 1. Chercher une réponse dans la FAQ locale.
    const localMatch = findBestFaqMatch(cleanQuestion);

    const validLocalMatch =
      localMatch &&
      typeof localMatch.question === "string" &&
      typeof localMatch.answer === "string" &&
      localMatch.answer.trim().length > 0;

    if (validLocalMatch) {
      const userNotions = detectNotions(cleanQuestion);

      // Classer la FAQ à partir de sa question uniquement :
      // un "=" dans l'exemple de réponse ne doit pas
      // transformer une FAQ sur les fonctions en équation.
      const faqNotions = detectNotions(localMatch.question);

      if (notionsAreCompatible(userNotions, faqNotions)) {
        return res.json({
          success: true,
          source: "faq_locale",
          question: localMatch.question,
          answer: localMatch.answer,
        });
      }
    }

    // 2. Interroger l'IA si aucune réponse locale compatible.
    const aiAnswer = await askOpenAI(cleanQuestion);

    if (typeof aiAnswer !== "string" || !aiAnswer.trim()) {
      console.error("Erreur FAQ :", {
        code: "empty_ai_response",
      });

      return res.status(502).json({
        success: false,
        error: "L’assistant n’a pas pu produire de réponse. Veuillez réessayer.",
      });
    }

    return res.json({
      success: true,
      source: "openai",
      question: cleanQuestion,
      answer: aiAnswer.trim(),
    });
  } catch (error) {
    // Ne pas journaliser l'objet complet :
    // il peut contenir des informations sensibles.
    const status = Number(error?.status);

    const safeCodes = new Set([
      "invalid_api_key",
      "token_invalidated",
      "insufficient_quota",
      "rate_limit_exceeded",
      "model_not_found",
    ]);

    console.error("Erreur FAQ :", {
      status: Number.isInteger(status) ? status : null,
      code: safeCodes.has(error?.code) ? error.code : "faq_request_failed",
    });

    if (status === 401 || status === 403) {
      return res.status(503).json({
        success: false,
        error: "L’assistant IA est temporairement indisponible.",
      });
    }

    if (status === 429) {
      return res.status(503).json({
        success: false,
        error: "L’assistant IA est momentanément indisponible. Veuillez réessayer plus tard.",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Une erreur est survenue côté serveur.",
    });
  }
});

module.exports = router;
