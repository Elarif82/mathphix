// =====================================================
// server.js — API de la FAQ intelligente MathPhiX
// =====================================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const faqRoutes = require("./routes/faq");

const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Vérification du fonctionnement du serveur
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API MathPhiX opérationnelle",
  });
});

app.get("/health", (req, res) => {
  res.json({ success: true });
});

// Routes de la FAQ
app.use("/api/faq", faqRoutes);

// Route introuvable
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route introuvable",
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error("Erreur serveur :", {
    name: err.name,
    status: err.status || 500,
  });

  res.status(err.status || 500).json({
    success: false,
    error: "Une erreur est survenue côté serveur.",
  });
});

// Démarrage compatible avec Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API MathPhiX démarrée sur le port ${PORT}`);
});
