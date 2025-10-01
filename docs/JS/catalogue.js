// quests-catalogue.js

const QUESTS_CATALOGUE = [
  // === PHOTO SIMPLE ===
  {
    id: "photo",
    nom: "Photo à prendre",
    description: "Prendre une ou plusieurs photos différentes d’un lieu, d’un objet, d’une personne ou d’une situation.",
    parametres: [
      { key: "nbPhotos", type: "number", label: "Nombre de photos", default: 1, min: 1, max: 10 },
      { key: "consigne", type: "text", label: "Consigne ou thème", placeholder: "ex : un arbre" }
    ],
    combinable: ["gps", "chrono", "mot_de_passe"],
    preview: "photo"
  },

  // === PHOTO AVEC INCONNU/CRITÈRE ===
  {
    id: "photo_inconnus",
    nom: "Photo avec des inconnus",
    description: "Prendre une ou plusieurs photos avec des personnes différentes ou répondant à un critère déterminé. (Qui porte des lunettes ; qui a plus de 50 ans ; qui pore une chemise blanche ...",
    parametres: [
      { key: "nbPersonnes", type: "number", label: "Nombre de personnes/photos", default: 1, min: 1, max: 10 },
      { key: "critere", type: "text", label: "Critère ou consigne", placeholder: "ex : Personne qui porte un chapeau" }
    ],
    combinable: ["gps", "chrono"],
    preview: "photo"
  },


  // === COLLECTE OBJET ===
  {
    id: "collecte_objet",
    nom: "Collecte d’objet",
    description: "Ramener un ou plusieurs objets physiques (ex : feuille, caillou, papier, etc.).",
    parametres: [
      { key: "nbObjets", type: "number", label: "Nombre d’objets", default: 1, min: 1, max: 15 },
      { key: "objet", type: "text", label: "Consigne ou type d’objet", placeholder: "ex : une feuille d’érable" }
    ],
    combinable: ["chrono"],
    preview: "objet"
  },

  // === AUDIO ===
{
  id: "audio",
  nom: "Enregistrement audio",
  description: "Capturer un ou plusieurs sons, messages, chansons, cris de guerre, imitations, etc.",
  parametres: [
    { key: "nbAudio", type: "number", label: "Nombre d'audios", default: 1, min: 1, max: 10 }
    // plus de champ "consigne" ici, c'est géré dynamiquement comme photo/duel
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





  // === CHRONOMETRE ===
  {
    id: "chrono",
    nom: "Chronométré",
    description: "Réaliser une action ou une série de quêtes en un temps imparti.",
    parametres: [
      { key: "duree", type: "number", label: "Temps imparti (secondes)", default: 60, min: 1, max: 3600 }
    ],
    combinable: []
  },

  // === DEFI EN DUEL ===
{
  id: "duel",
  nom: "Défi en duel",
  description: "Deux équipes s’affrontent sur un mini-jeu (score, rapidité, etc.). L'équipe perdante perd une minute à devoir attendre sur place.",
  parametres: [
    { key: "nombre", type: "number", label: "Nombre de duels", min: 1, max: 10 }
  ],
  combinable: [],
  preview: "duel"
},
  
  {
    id: "pendu",
    nom: "Le Jeu du Pendu", // mettre "nom" pour l'affichage, pas "titre"
    description: "Rendez-vous à l’endroit précis indiqué pour activer le jeu du pendu. Une fois sur place, vous aurez un temps limité pour deviner un mot français de 6 ou 7 lettres.",
    lieu: "À définir", // Remplace par l’identifiant ou la description du lieu précis
    type: "mini-jeu",
    tempsLimite: 120, // en secondes, à ajuster selon la difficulté souhaitée
    genererMot: function() {
      const mots = ["fromages", "lunettes", "chiffres", "parcours", "bouchons", "dessiner"];
      return mots[Math.floor(Math.random() * mots.length)];
    },
    boutonAleatoire: {
      label: "Nouveau mot",
      action: function() {}
    },
    visuel: function(container) {},
    instructions: "Devinez le mot de 8 lettres en proposant des lettres une par une. Attention au temps limité !",
    preview: "pendu"
  }
];


// Suggestions pour les quêtes photos
const SUGGESTIONS = {
  photo: [
    "Un arbre remarquable ou original",
    "Une fleur de couleur vive",
    "Une feuille d'une forme étrange",
    "Un animal exotique (oiseau, écureuil, insecte…)",
    "Un banc vide ou occupé",
    "Un panneau d’information du parc",
    "Une sculpture ou une œuvre d’art",
    "Une fontaine ou un point d’eau",
    "Un membre de l’équipe camouflé dans la nature",
    "Un insecte en gros plan (sans lui faire de mal)",
    "Une pomme de pin posée sur la tête d’un membre de l’équipe",
    "Une ombre rigolote projetée par le soleil",
    "Un “cercle” formé avec des éléments naturels",
    "Un objet en forme de cœur trouvé sur place",
    "Un membre de l’équipe sous un abri ou une cabane naturelle",
    "Une trace d’animal ou d’oiseau au sol",
    "Deux arbres enlacés ou très proches",
    "Un nuage ayant une forme amusante",
    "Un animal en train de manger",
    "Le plus grand arbre du parc que vous trouverez",
    "Le plus petit arbre du parc que vous trouverez",
    "Un trou ou passage secret (naturel ou artificiel)",
    "Un objet polluant la zone (vous avez le droit de le mettre à la poubelle après ça)",
    "Un “selfie” de l’équipe groupe devant un joli paysage",
    "Un animal en train de dormir ou se reposer",
    "Une feuille tombante (essayez de la capturer en plein vol)",
    "Un membre de l’équipe le plus haut possible",
    "Une photo prise “à travers” quelque chose (trou, branches…)",
    "Un monument ou vestige caché du parc"
  ],

 
  photo_inconnus: [
    "Avec une personne portant un chapeau",
    "Avec quelqu’un ayant une barbe remarquable",
    "Avec un inconnu qui tient une fleur",
    "Avec une personne en train de lire ou d’écrire",
    "Avec un groupe en train de pique-niquer",
    "Avec une personne qui sourit à pleines dents",
    "Avec une personne dont le tee-shirt est d’une couleur primaire (rouge, jaune, vert…)",
    "Avec deux inconnus qui acceptent de faire une grimace",
    "Avec une personne qui a un animal de compagnie",
    "Avec une personne âgée (toujours avec respect et accord)",
    "Avec un inconnu qui porte des lunettes",
    "Avec une personne qui accepte de sauter en l’air pour la photo",
    "Avec une personne qui accepte de former un cœur avec ses mains",
    "Avec quelqu’un qui fait semblant de téléphoner avec sa chaussure",
    "Avec une personne qui accepte de faire une pose de super-héros",
    "Avec un inconnu qui a un tatouage visible",
    "Avec quelqu’un qui accepte de mimer la peur ou la surprise",
    "Avec toute une famille comme si vous en étiez un membre",
    "Avec la plus belle personne du parc"
  ],


  collecte_objet: [
    "Une feuille d’arbre d’une forme originale",
    "Le plus beau caillou que vous trouverez",
    "Une plume tombée au sol",
    "Un gland, une pomme de pin ou une noisette",
    "Un objet en forme de cœur trouvé dans la nature",
    "Un fruit tombé (châtaigne, baie non toxique…)",
    "Un brin d’herbe le plus long possible",
    "Une graine ou un noyau trouvé au sol",
    "La pierre la plus plate que vous trouverez",
    "Un objet brillant ou métallique trouvé (bouchon, papier alu…)",
    "Une coquille d’escargot vide",
    "Un objet rond (galet, bille, balle…)",
    "Une feuille rouge, jaune ou violette",
    "Le plus long morceau de bois que vous trouverez au sol",
    "L’objet le plus insolite que vous trouverez autour de vous",
    "Un objet qui sent bon (naturel, feuille, fleur tombée…)",
    "La pierre avec la couleur la plus vive que vous trouverez",
    "Un objet “porte-bonheur” trouvé sur place",
    "Un objet qui roule",
    "Un objet qui porte une trace d’animal (coquille, plume…)",
    "Trois objets que tu mets en histoire durant deux minutes",
    "Un objet qui pourrait appartenir à un pirate/sorcier/héros…"
  ],

  

  audio: [
    "Chanter le refrain de la musique qui apparait sous vos yeux",
    "Murmurer un secret à l’enregistreur",
    "Faire une imitation d’un personnage célèbre (dessin animé, cinéma…)",
    "Chanter une note qui tient le plus longtemps possible en un seul souffle"
  ],

  gps_chaud_froid: [
    "Trouve le banc caché au centre du parc",
    "Atteins la fontaine au nord sans la carte, en mode chaud/froid",
    "Trouve la sculpture cachée derrière les arbres",
    "Cherche le point GPS près de l’aire de jeux",
    "Retrouve la zone où pousse le plus grand arbre",
    "Atteins l’entrée secrète du parc indiquée par le jeu",
    "Trouve l’endroit exact où la vue est la plus belle",
    "Rends-toi au point GPS caché à moins de 30 pas d’ici",
    "Découvre la cachette sous le vieux pont",
    "Trouve la zone d’ombre la plus fraîche du parc"
  ],

    

  enigme: [
    "Anagramme d’un mot en rapport avec le parc (ex : « RVABE » —> Réponse : “Arbre”)",
    "Décrypter un message codé avec un code César (décale chaque lettre de +3 par exemple)",
    "Trouver la phrase cachée dans un acrostiche (première lettre de chaque ligne)",
    "Traduire un mot écrit en morse (utilise . et -)",
    "Trouver le mot mystère à partir d’une définition (ex : Je tombe en automne, je suis… ?)",
    "Deviner un mot en lisant une charade (ex : Mon premier est un animal, mon second est une couleur…)",
    "Résoudre une énigme logique simple (ex : J’ai 4 pattes et je porte des gens, qui suis-je ?)",
    "Trouver le nom d’un monument caché dans un texte",
    "Trouver le nombre exact d’objets d’une couleur dans la zone",
    "Trouver l’intrus dans une liste d’éléments naturels"
  ],

  
  chrono: [
    "Ramasser et rapporter 3 objets différents en moins de 30 secondes et prendre la photo",
    "Prendre une photo d’un animal ou d’un insecte en moins de 40 secondes et prendre la photo",
    "Trouver 5 feuilles de formes différentes en moins de 60 secondes",
    "Récupérer un objet de couleur particulière en moins de 20 secondes",
    "Chanter le refrain d’une chanson connue en moins de 15 secondes (propose la musique)",
    "Se cacher derrière un arbre avec uniquement la tête qui dépasse en 30 secondes",
    "Prendre en photo un inconnu qui accepte de faire une grimace, en moins de 2 minutes (toujours avec respect)",
    "Dessiner un cœur au sol avec des objets trouvés en moins de 60 secondes et prendre la photo",
    "Trouver et ramasser un déchet en moins de 40 secondes et prendre la photo",
    "Faire la photo la plus sexy de vous en 10 secondes",
    "Faire la pire grimace de vous en 10 secondes"
  ],



  duel: [
    "Pierre-Feuille-Ciseaux (classique, un tour ou en 2 manches gagnantes)",
    "Duel de regard (le premier qui cligne des yeux a perdu)",
    "Barbichette (le premier qui rit ou sourit perd)",
    "Feuille la plus grande (chacun a 30 secondes pour ramener la plus grande feuille trouvée)",
    "Course à la branche (le premier à ramener la plus grande branche gagne le duel)",
    "Pierre la plus lourde (ramener la pierre la plus lourde trouvée en 1 minute)",
    "Course à cloche-pied (sur une courte distance)",
    "Cri le plus long (qui tient un cri ou une note la plus longue)",
    "Pierre-feuille-ciseaux en relais (enchaîner 3 duels en équipe)"
  ]
}
  
