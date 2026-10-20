const faqData = [
  {
    keywords: ["intervalle", "crochets", "parenthèses", "]2;5]", "[2;5["],
    question: "Quelle différence entre ]2;5] et [2;5[ ?",
    answer:
      "Un intervalle est une partie de l’ensemble des nombres réels \\(\\mathbb{R}\\).\n\nDans \\(]2;5]\\), les nombres strictement supérieurs à 2 et inférieurs ou égaux à 5 sont pris : 2 est exclu et 5 est inclus.\n\nDans \\([2;5[\\), les nombres supérieurs ou égaux à 2 et strictement inférieurs à 5 sont pris : 2 est inclus et 5 est exclu.\n\nUn crochet fermé indique que la borne appartient à l’intervalle. Un crochet ouvert indique que la borne n’appartient pas à l’intervalle."
  },
  {
    keywords: ["ensemble de nombres", "nombres réels", "naturels", "entiers", "rationnels", "irrationnels"],
    question: "Quels sont les principaux ensembles de nombres ?",
    answer:
      "En seconde, on utilise plusieurs ensembles de nombres.\n\n\\(\\mathbb{N}\\) désigne les entiers naturels : 0, 1, 2, 3...\n\\(\\mathbb{Z}\\) désigne les entiers relatifs : ..., -2, -1, 0, 1, 2...\n\\(\\mathbb{D}\\) désigne les nombres décimaux.\n\\(\\mathbb{Q}\\) désigne les nombres rationnels, qui peuvent s’écrire sous forme de quotient \\(\\frac{a}{b}\\), avec \\(a\\) et \\(b\\) entiers et \\(b \\neq 0\\).\n\\(\\mathbb{R}\\) désigne l’ensemble des nombres réels.\n\nOn a : \\(\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}\\)."
  },
  {
    keywords: ["équation", "résoudre une équation", "solution équation"],
    question: "Qu’est-ce qu’une équation ?",
    answer:
      "Une équation est une égalité contenant une ou plusieurs inconnues.\n\nRésoudre une équation, c’est déterminer toutes les valeurs de l’inconnue qui rendent l’égalité vraie. Ces valeurs s’appellent les solutions de l’équation.\n\nPar exemple, résoudre \\(2x+3=7\\), c’est chercher le nombre \\(x\\) tel que l’égalité soit vraie. Ici, la solution est \\(x=2\\)."
  },
  {
    keywords: ["inéquation", "résoudre une inéquation", "solution inéquation"],
    question: "Qu’est-ce qu’une inéquation ?",
    answer:
      "Une inéquation est une comparaison contenant une inconnue, avec un symbole comme \\(<\\), \\(>\\), \\(\\leq\\) ou \\(\\geq\\).\n\nRésoudre une inéquation, c’est trouver l’ensemble des valeurs de l’inconnue qui rendent la comparaison vraie.\n\nLes solutions d’une inéquation sont souvent représentées par un intervalle ou une réunion d’intervalles."
  },
  {
    keywords: ["fonction", "image", "antécédent", "définition fonction"],
    question: "Qu’est-ce qu’une fonction ?",
    answer:
      "Une fonction est un procédé qui associe à chaque nombre d’un ensemble de départ au plus un nombre image.\n\nSi une fonction \\(f\\) associe au nombre \\(x\\) le nombre \\(f(x)\\), alors \\(f(x)\\) est l’image de \\(x\\) par la fonction \\(f\\).\n\nSi \\(f(a)=b\\), alors \\(a\\) est un antécédent de \\(b\\) par \\(f\\)."
  },
  {
    keywords: ["courbe", "représentation graphique", "fonction graphique"],
    question: "Qu’est-ce que la courbe représentative d’une fonction ?",
    answer:
      "Dans un repère, la courbe représentative d’une fonction \\(f\\) est l’ensemble des points de coordonnées \\((x ; f(x))\\), où \\(x\\) appartient à l’ensemble de définition de la fonction.\n\nAutrement dit, chaque point de la courbe correspond à une valeur de \\(x\\) et à son image \\(f(x)\\)."
  },
  {
    keywords: ["variations", "fonction croissante", "fonction décroissante"],
    question: "Que signifie étudier les variations d’une fonction ?",
    answer:
      "Étudier les variations d’une fonction, c’est déterminer sur quels intervalles ses valeurs augmentent ou diminuent.\n\nUne fonction est croissante sur un intervalle si, lorsque \\(x\\) augmente, \\(f(x)\\) augmente aussi.\n\nUne fonction est décroissante sur un intervalle si, lorsque \\(x\\) augmente, \\(f(x)\\) diminue."
  },
  {
    keywords: ["extremum", "maximum", "minimum"],
    question: "Qu’est-ce qu’un maximum ou un minimum d’une fonction ?",
    answer:
      "Un maximum d’une fonction sur un intervalle est la plus grande valeur atteinte par cette fonction sur cet intervalle.\n\nUn minimum est la plus petite valeur atteinte par cette fonction sur cet intervalle.\n\nUn maximum ou un minimum s’appelle un extremum."
  },
  {
    keywords: ["vecteur", "définition vecteur", "seconde vecteur", "cours vecteur"],
    question: "Qu’est-ce qu’un vecteur ?",
    answer:
      "Un vecteur est un objet mathématique qui modélise un déplacement.\n\nIl est caractérisé par trois éléments : une direction, un sens et une norme, c’est-à-dire une longueur.\n\nLe vecteur \\(\\overrightarrow{AB}\\) représente le déplacement du point A vers le point B.\n\nDeux vecteurs sont égaux lorsqu’ils ont la même direction, le même sens et la même norme."
  },
  {
    keywords: ["norme vecteur", "longueur vecteur"],
    question: "Qu’est-ce que la norme d’un vecteur ?",
    answer:
      "La norme d’un vecteur est sa longueur.\n\nLa norme du vecteur \\(\\overrightarrow{AB}\\) est la distance entre les points A et B. On la note \\(||\\overrightarrow{AB}||\\).\n\nAinsi : \\(||\\overrightarrow{AB}|| = AB\\)."
  },
  {
    keywords: ["coordonnées vecteur", "vecteur coordonnées"],
    question: "Comment définir les coordonnées d’un vecteur ?",
    answer:
      "Dans un repère, si \\(A(x_A ; y_A)\\) et \\(B(x_B ; y_B)\\), alors le vecteur \\(\\overrightarrow{AB}\\) a pour coordonnées :\n\n\\(\\overrightarrow{AB}(x_B - x_A ; y_B - y_A)\\).\n\nCes coordonnées indiquent le déplacement horizontal et le déplacement vertical pour aller de A vers B."
  },
  {
    keywords: ["droite", "définition droite", "vecteur directeur", "droite mathématiques"],
    question: "Qu’est-ce qu’une droite en mathématiques ?",
    answer:
      "Une droite est un ensemble infini de points alignés.\n\nDe manière rigoureuse, une droite peut être définie par un point et un vecteur directeur non nul.\n\nSi A est un point et \\(\\vec{u}\\) un vecteur non nul, la droite passant par A et de vecteur directeur \\(\\vec{u}\\) est l’ensemble des points M tels que :\n\n\\(\\overrightarrow{AM} = k\\vec{u}\\), avec \\(k\\) un nombre réel.\n\nLe point A fixe la position de la droite et le vecteur \\(\\vec{u}\\) fixe sa direction."
  },
  {
    keywords: ["coefficient directeur", "pente", "droite affine"],
    question: "Qu’est-ce que le coefficient directeur d’une droite ?",
    answer:
      "Dans un repère, une droite non verticale peut avoir une équation de la forme \\(y = mx + p\\).\n\nLe nombre \\(m\\) s’appelle le coefficient directeur. Il mesure la pente de la droite.\n\nSi \\(m > 0\\), la droite monte lorsqu’on va vers la droite. Si \\(m < 0\\), elle descend. Si \\(m = 0\\), elle est horizontale."
  },
  {
    keywords: ["équation de droite", "droite y=mx+p"],
    question: "Qu’est-ce qu’une équation de droite ?",
    answer:
      "Une équation de droite est une relation vérifiée par les coordonnées de tous les points de cette droite.\n\nDans un repère, une droite non verticale peut s’écrire sous la forme :\n\n\\(y = mx + p\\).\n\nLe nombre \\(m\\) est le coefficient directeur et \\(p\\) est l’ordonnée à l’origine."
  },
  {
    keywords: ["statistiques", "moyenne", "médiane", "quartiles"],
    question: "Que faut-il connaître en statistiques en seconde ?",
    answer:
      "En statistiques, on étudie une série de données.\n\nLa moyenne est la somme des valeurs divisée par le nombre de valeurs.\n\nLa médiane est une valeur qui partage la série ordonnée en deux groupes de même effectif.\n\nLe premier quartile \\(Q_1\\) est une valeur telle qu’au moins 25 % des données lui sont inférieures ou égales.\n\nLe troisième quartile \\(Q_3\\) est une valeur telle qu’au moins 75 % des données lui sont inférieures ou égales."
  },
  {
    keywords: ["probabilité", "événement", "issue", "expérience aléatoire"],
    question: "Qu’est-ce qu’une probabilité ?",
    answer:
      "Une expérience aléatoire est une expérience dont on ne peut pas prévoir avec certitude le résultat.\n\nUne issue est un résultat possible de cette expérience.\n\nUn événement est un ensemble d’issues.\n\nLa probabilité d’un événement est un nombre compris entre 0 et 1 qui mesure les chances que cet événement se réalise.\n\nUn événement impossible a une probabilité égale à 0. Un événement certain a une probabilité égale à 1."
  },
  {
    keywords: ["algorithme", "programmation", "python", "variable"],
    question: "À quoi sert l’algorithmique en maths ?",
    answer:
      "Un algorithme est une suite finie d’instructions permettant de résoudre un problème ou d’effectuer un calcul.\n\nEn seconde, l’algorithmique et la programmation, souvent avec Python, permettent de tester des conjectures, automatiser des calculs, simuler des expériences aléatoires et mieux comprendre certaines notions mathématiques."
  },
  {
    keywords: ["mathphix", "site", "comment utiliser"],
    question: "Comment utiliser MathPhix ?",
    answer:
      "MathPhix permet de revoir les notions de mathématiques étape par étape.\n\nTu peux lire une leçon, étudier une méthode, faire des exercices, puis poser une question à la FAQ intelligente si tu bloques sur un point précis."
  },
  {
    keywords: ["programme de seconde", "chapitres seconde", "cours seconde"],
    question: "Quels sont les grands chapitres du programme de seconde ?",
    answer:
      "Le programme de mathématiques de seconde générale et technologique s’organise autour de cinq grands domaines : nombres et calculs, géométrie, fonctions, statistiques et probabilités, algorithmique et programmation.\n\nCes domaines sont liés entre eux : par exemple, les fonctions utilisent le calcul littéral, les statistiques peuvent utiliser Python, et la géométrie utilise les coordonnées et les vecteurs."
  },
  {
    keywords: ["confiance", "reprendre confiance", "nul en maths", "mauvais en maths"],
    question: "Et si je pense être mauvais en maths ?",
    answer:
      "Beaucoup d’élèves ne sont pas mauvais en mathématiques : ils ont souvent besoin de reprendre les bases avec une méthode claire.\n\nSur MathPhix, l’objectif est d’avancer progressivement : comprendre la définition, voir un exemple, appliquer une méthode, puis s’entraîner avec des exercices."
  }
];

module.exports = faqData;

