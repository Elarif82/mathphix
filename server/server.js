// =====================================================
// server.js — MathPhiX FAQ intelligente
// =====================================================

// 🔥 1. Charger les variables d'environnement EN PREMIER
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// 🔥 2. Import des routes APRÈS dotenv
const faqRoutes = require("./routes/faq");

const app = express();

// 🔎 3. Debug temporaire
console.log(
  "OPENAI_API_KEY =",
  process.env.OPENAI_API_KEY ? "chargée ✅" : "absente ❌"
);

// 🔧 4. Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📁 5. Dossier frontend
app.use(express.static(path.join(__dirname, "../public")));

// 🔗 6. Routes API
app.use("/api/faq", faqRoutes);

// 🏠 7. Page d'accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// ❌ 8. Route introuvable API
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Route API introuvable",
  });
});

// 🌐 9. Fallback frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// 🚀 10. Lancement serveur
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur MathPhiX lancé sur http://localhost:${PORT}`);
});
