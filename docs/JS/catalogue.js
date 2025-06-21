// quests-catalogue.js

const QUESTS_CATALOGUE = [
  // === PHOTO SIMPLE ===
  {
    id: "photo",
    nom: "Photo à prendre",
    description: "Prendre une ou plusieurs photos d’un lieu, d’un objet, d’une personne ou d’une situation.",
    parametres: [
      { key: "nbPhotos", type: "number", label: "Nombre de photos", default: 1, min: 1, max: 10 },
      { key: "consigne", type: "text", label: "Consigne ou thème", placeholder: "Ex: photo d’un arbre" }
    ],
    combinable: ["gps", "chrono", "mot_de_passe"],
    preview: "photo"
  },

  // === PHOTO AVEC INCONNU/CRITÈRE ===
  {
    id: "photo_inconnus",
    nom: "Photo avec des inconnus",
    description: "Prendre une ou plusieurs photos avec des personnes différentes ou répondant à un critère.",
    parametres: [
      { key: "nbPersonnes", type: "number", label: "Nombre de personnes/photos", default: 1, min: 1, max: 10 },
      { key: "critere", type: "text", label: "Critère ou consigne", placeholder: "Ex: quelqu’un qui porte un chapeau" }
    ],
    combinable: ["gps", "chrono"],
    preview: "photo"
  },

  // === VIDEO ===
  {
    id: "video",
    nom: "Vidéo à tourner",
    description: "Se filmer en train de réaliser une action précise, une ou plusieurs fois.",
    parametres: [
      { key: "nbVideos", type: "number", label: "Nombre de vidéos", default: 1, min: 1, max: 5 },
      { key: "consigne", type: "text", label: "Consigne vidéo", placeholder: "Ex: filme-toi en train de faire 3 tractions" }
    ],
    combinable: ["gps", "chrono"],
    preview: "video"
  },

  // === COLLECTE OBJET ===
  {
    id: "collecte_objet",
    nom: "Collecte d’objet",
    description: "Ramener un ou plusieurs objets physiques (ex : feuille, caillou, papier, etc.).",
    parametres: [
      { key: "nbObjets", type: "number", label: "Nombre d’objets", default: 1, min: 1, max: 15 },
      { key: "objet", type: "text", label: "Consigne ou type d’objet", placeholder: "Ex: une feuille d’érable" }
    ],
    combinable: ["chrono"],
    preview: "objet"
  },

  // === AUDIO ===
  {
    id: "audio",
    nom: "Enregistrement audio",
    description: "Capturer un son, un message, une chanson, un cri de guerre, une imitation, etc.",
    parametres: [
      { key: "consigne", type: "text", label: "Consigne audio", placeholder: "Ex: imite le cri du hibou" }
    ],
    combinable: ["chrono"],
    preview: "audio"
  },

  // === GPS (1 ou plusieurs points) ===
  {
    id: "gps",
    nom: "Déplacement GPS",
    description: "Se rendre à un ou plusieurs points précis sur la carte. La position doit être validée.",
    parametres: [
      { key: "points", type: "list_gps", label: "Liste des points GPS (lat, lon, nom)", min: 1 }
    ],
    combinable: ["photo", "audio", "chrono", "mot_de_passe"],
    preview: "gps"
  },

  // === MOT DE PASSE / ENIGME ===
  {
    id: "mot_de_passe",
    nom: "Mot de passe à deviner",
    description: "Résoudre une énigme pour trouver le mot de passe.",
    parametres: [
      { key: "enigme", type: "textarea", label: "Énigme à résoudre" },
      { key: "solution", type: "text", label: "Mot de passe attendu" }
    ],
    combinable: ["gps", "chrono"],
    preview: "enigme"
  },

  // === ANAGRAMME/CRYPTAGE ===
  {
    id: "anagramme",
    nom: "Anagramme / Cryptogramme",
    description: "Décoder une phrase, déchiffrer un code (César, etc.).",
    parametres: [
      { key: "texte_code", type: "textarea", label: "Texte codé à afficher" },
      { key: "solution", type: "text", label: "Réponse attendue" },
      { key: "indice", type: "text", label: "Indice ou aide (facultatif)", optional: true }
    ],
    combinable: ["chrono", "gps"],
    preview: "enigme"
  },

  // === PUZZLE VISUEL ===
  {
    id: "puzzle_visuel",
    nom: "Puzzle visuel",
    description: "Trouver l’erreur sur une image, reconstituer une photo, etc.",
    parametres: [
      { key: "image", type: "file", label: "Image à afficher" },
      { key: "question", type: "text", label: "Question à poser" },
      { key: "solution", type: "text", label: "Réponse attendue" }
    ],
    combinable: ["chrono"],
    preview: "image"
  },

  // === SIGNATURE INCONNU ===
  {
    id: "signature_inconnu",
    nom: "Signature/message d’inconnu",
    description: "Faire écrire un mot/une signature/un dessin à quelqu’un.",
    parametres: [
      { key: "consigne", type: "text", label: "Consigne à l’inconnu", placeholder: "Ex: écris ton plat préféré" }
    ],
    combinable: ["chrono", "photo"],
    preview: "texte"
  },

  // === DEFI COLLECTIF ===
  {
    id: "defi_collectif",
    nom: "Défi collectif",
    description: "Réaliser une action ensemble ou avec des inconnus.",
    parametres: [
      { key: "consigne", type: "text", label: "Consigne du défi", placeholder: "Ex: pyramide humaine, saute-mouton..." },
      { key: "preuve", type: "select", label: "Preuve à fournir", options: ["photo", "video", "audio", "texte"], default: "photo" }
    ],
    combinable: ["chrono", "gps"],
    preview: "collectif"
  },

  // === OBSERVATION ===
  {
    id: "observation",
    nom: "Trouver un détail sur place",
    description: "Repérer un symbole, mot, nombre, couleur, statue, etc.",
    parametres: [
      { key: "question", type: "text", label: "Question à poser", placeholder: "Ex: quelle couleur sur la porte ?" },
      { key: "solution", type: "text", label: "Bonne réponse" }
    ],
    combinable: ["gps", "chrono"],
    preview: "texte"
  },

  // === CHASSE AU TRESOR ===
  {
    id: "chasse_tresor",
    nom: "Chasse au trésor",
    description: "Plusieurs étapes, chaque indice mène à la suivante.",
    parametres: [
      { key: "etapes", type: "list", label: "Liste d’énigmes/indices", itemType: "texte_ou_gps" }
    ],
    combinable: ["chrono"],
    preview: "multi"
  },

  // === COMBO (Plusieurs actions sur la même étape) ===
  {
    id: "combo",
    nom: "Combinaison d’actions",
    description: "Réaliser plusieurs actions à la suite ou en même temps (photo + GPS + mot de passe…).",
    parametres: [
      { key: "actions", type: "list", label: "Liste d’actions à combiner", itemType: "reference_autre_quete" }
    ],
    combinable: [],
    preview: "multi"
  },

  // === CHRONOMETRE ===
  {
    id: "chrono",
    nom: "Chronométré",
    description: "Réaliser une action ou une série de quêtes en un temps imparti.",
    parametres: [
      { key: "duree", type: "number", label: "Temps imparti (secondes)", default: 60, min: 10, max: 3600 }
    ],
    combinable: []
  },

  // === DEFI EN DUEL ===
  {
    id: "duel",
    nom: "Défi en duel",
    description: "Deux équipes s’affrontent sur un mini-jeu (score, rapidité, etc.).",
    parametres: [
      { key: "type_duel", type: "text", label: "Type de duel", placeholder: "Course, quizz, etc." },
      { key: "critere_victoire", type: "text", label: "Critère de victoire", placeholder: "Premier à finir, meilleur score, etc." }
    ],
    combinable: [],
    preview: "duel"
  }
];
