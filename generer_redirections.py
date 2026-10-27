from pathlib import Path
from html import escape

RACINE = Path(__file__).resolve().parent
DOSSIER = RACINE / "seconde"
DOMAINE = "https://mathphix.fr"
MARQUEUR = "<!-- Redirection generee MathPhiX -->"

if not DOSSIER.is_dir():
    raise SystemExit("Le dossier seconde est introuvable.")

nombre = 0

for destination in sorted(DOSSIER.glob("*.html")):
    if destination.name.lower() == "index.html":
        continue

    ancienne = RACINE / destination.name

    # Préserver les vrais fichiers déjà présents à la racine.
    if ancienne.exists():
        contenu_existant = ancienne.read_text(encoding="utf-8")
        if MARQUEUR not in contenu_existant:
            print(f"À VÉRIFIER : {ancienne.name} existe déjà, non modifié.")
            continue

    url = escape(
        f"{DOMAINE}/seconde/{destination.name}",
        quote=True
    )

    contenu = f"""<!DOCTYPE html>
{MARQUEUR}
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Page déplacée — MathPhiX</title>
  <link rel="canonical" href="{url}">
  <meta http-equiv="refresh" content="0; url={url}">
</head>
<body>
  <p>Cette page a changé d’adresse.
    <a href="{url}">Consulter le cours</a>.
  </p>
</body>
</html>
"""

    ancienne.write_text(contenu, encoding="utf-8")
    nombre += 1
    print(f"PRÊT : /{ancienne.name} → /seconde/{destination.name}")

print(f"\n{nombre} fichiers de redirection préparés.")
