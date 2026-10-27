from pathlib import Path
from html import escape

RACINE = Path(__file__).resolve().parent
DOMAINE = "https://mathphix.fr"

# Ancienne adresse : nouvelle adresse
REDIRECTIONS = {
    "ensembles.html": "seconde/ensembles.html",
    "fonctions.html": "seconde/fonctions.html",
    "puissances.html": "seconde/puissances.html",
    "geometrie.html": "seconde/geometrie.html",
}

for ancienne, nouvelle in REDIRECTIONS.items():
    source = RACINE / ancienne
    destination = RACINE / nouvelle

    if not destination.is_file():
        print(f"IGNORÉ : destination absente → {nouvelle}")
        continue

    # Ne pas écraser un fichier existant.
    if source.exists():
        print(f"IGNORÉ : fichier déjà présent → {ancienne}")
        continue

    url = escape(f"{DOMAINE}/{nouvelle}", quote=True)

    contenu = f"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Page déplacée — MathPhiX</title>
  <link rel="canonical" href="{url}">
  <meta http-equiv="refresh" content="0; url={url}">
</head>
<body></body>
</html>
"""

    source.parent.mkdir(parents=True, exist_ok=True)
    source.write_text(contenu, encoding="utf-8")
    print(f"CRÉÉ : {ancienne} → {nouvelle}")

