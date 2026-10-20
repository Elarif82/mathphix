// =====================================================
// services/faqMatcher.js — MathPhiX
// Matching FAQ avec pertinence + type de question
// =====================================================

const faqData = require("../data/faqData");

function normalizeText(text = "") {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, " ")
    .replace(/[?!.,;:()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOP_WORDS = [
  "comment", "quoi", "qu", "que", "qui", "est", "ce", "une", "un",
  "des", "les", "la", "le", "du", "de", "d", "par", "pour", "avec",
  "dans", "faire", "savoir", "peux", "peut", "on", "tu", "je", "me",
  "moi", "math", "maths", "mathematiques"
];

function getImportantWords(text = "") {
  return normalizeText(text)
    .split(" ")
    .filter((word) => word.length >= 3 && !STOP_WORDS.includes(word));
}

function detectQuestionType(text = "") {
  const q = normalizeText(text);

  if (
    q.startsWith("qu est ce") ||
    q.startsWith("c est quoi") ||
    q.includes("definition") ||
    q.includes("definir")
  ) {
    return "definition";
  }

  if (
    q.startsWith("comment") ||
    q.includes("calculer") ||
    q.includes("resoudre") ||
    q.includes("additionner") ||
    q.includes("soustraire") ||
    q.includes("multiplier") ||
    q.includes("diviser")
  ) {
    return "methode";
  }

  if (
    q.includes("erreur") ||
    q.includes("faux") ||
    q.includes("corriger") ||
    q.includes("mauvais") ||
    q.includes("mauvaise")
  ) {
    return "correction";
  }

  return "autre";
}

function findBestFaqMatch(userQuestion) {
  const normalizedQuestion = normalizeText(userQuestion);
  const questionWords = getImportantWords(userQuestion);
  const questionType = detectQuestionType(userQuestion);

  if (!normalizedQuestion) return null;

  let bestMatch = null;
  let bestScore = 0;

  for (const item of faqData) {
    if (!Array.isArray(item.keywords)) continue;

    let score = 0;

    const searchableText = normalizeText(
      `${item.question} ${item.answer} ${item.keywords.join(" ")}`
    );

    const faqType = detectQuestionType(item.question);

    if (questionType !== "autre" && questionType === faqType) {
      score += 6;
    }

    for (const keyword of item.keywords) {
      const normalizedKeyword = normalizeText(keyword);
      if (!normalizedKeyword) continue;

      if (normalizedQuestion.includes(normalizedKeyword)) {
        score += 10;
        continue;
      }

      const keywordWords = getImportantWords(keyword);
      const matchedWords = keywordWords.filter((word) =>
        normalizedQuestion.includes(word)
      );

      if (keywordWords.length > 0) {
        const ratio = matchedWords.length / keywordWords.length;

        if (ratio === 1) score += 6;
        else if (ratio >= 0.66) score += 4;
        else if (ratio >= 0.5) score += 2;
      }
    }

    for (const word of questionWords) {
      if (searchableText.includes(word)) {
        score += 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && bestScore >= 8) {
    return {
      ...bestMatch,
      matchScore: bestScore
    };
  }

  return null;
}

module.exports = {
  findBestFaqMatch,
  normalizeText,
  detectQuestionType
};

