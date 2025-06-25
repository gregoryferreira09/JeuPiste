// catalogue-phrases.js

const QUEST_TEXTS = {
  photo: {
    arthurien: [
      "Pour plaire à la Table Ronde, capturez en image [objet].",
      "La Dame du Lac attend la preuve : photographiez [objet] sans délai.",
      "Merlin t’a lancé un défi : immortalise [objet] pour recevoir la prochaine énigme."
    ],
    pirate: [
      "Un vrai pirate n’avance jamais sans preuve : prends une photo de [objet] et poursuis ta route !",
      "Ton trésor reste caché tant que tu n’as pas immortalisé [objet] sur ta carte."
    ],
    prison: [
      "Pour tromper le geôlier, capture la preuve de [objet]. Cette image sera ton passe vers la liberté.",
      "Un complice attend une photo de [objet] pour préparer ta fuite."
    ],
    sorcier: [
      "Le professeur t’ordonne d’immortaliser [objet] pour ta prochaine potion.",
      "Un sortilège ne s’accomplit qu’avec la photo de [objet]."
    ],
    super_heros: [
      "Une menace plane ! Prends une photo de [objet] pour l’analyse du QG.",
      "Le QG attend la preuve que tu as bien trouvé [objet]."
    ],
    zombie: [
      "Photographie [objet] : chaque trace peut sauver un survivant.",
      "Un antidote ne pourra être conçu qu’avec la photo de [objet]."
    ],
    archeologue: [
      "Immortalisez [objet] pour compléter le carnet de fouilles.",
      "Le musée attend la photo de [objet] pour valider votre découverte."
    ]
  },
  photo_inconnus: {
    arthurien: [
      "Pars à la rencontre d’âmes en quête d’aventure. Prends une photo avec [nbPersonnes] inconnus remplissant ce critère : [critere].",
      "Seul un vrai chevalier sait s’entourer : immortalise-toi avec [critere] ([nbPersonnes] personnes différentes)."
    ],
    pirate: [
      "Réalise un portrait avec [nbPersonnes] matelots remplissant ce critère : [critere]."
    ],
    prison: [
      "Pour le plan d’évasion, photographiez-vous avec [nbPersonnes] détenus qui [critere]."
    ],
    sorcier: [
      "Compose une photo de groupe avec [nbPersonnes] élèves qui [critere]."
    ]
  },
  video: {
    arthurien: [
      "Le roi Arthur veut voir ta prouesse : filme-toi en train de [consigne].",
      "La légende s’écrit en images : tourne une vidéo où tu [consigne]."
    ],
    pirate: [
      "Le capitaine exige une preuve vidéo de [consigne].",
      "Tourne une vidéo de toi en train de [consigne] pour passer à l’étape suivante."
    ],
    prison: [
      "Le gardien n’est convaincu que par la vidéo : filme-toi en train de [consigne]."
    ],
    super_heros: [
      "Filme ton exploit : [consigne] pour sauver la ville !"
    ]
  },
  collecte_objet: {
    arthurien: [
      "Ramène [objet] à la fée Morgane pour gagner sa bénédiction.",
      "Le roi réclame [objet] pour poursuivre la quête."
    ],
    pirate: [
      "Trouve et rapporte [objet] à ton équipage.",
      "Le coffre ne s’ouvrira qu’avec [objet] en main."
    ],
    prison: [
      "Pour fabriquer une clé, il te faut [objet]. Ramène-le discrètement."
    ],
    zombie: [
      "Trouve [objet] pour survivre à l’invasion."
    ]
  },
  audio: {
    arthurien: [
      "Enregistre le cri de guerre des chevaliers, ou imite [consigne].",
      "Le mage veut entendre : [consigne]."
    ],
    pirate: [
      "Enregistre ton chant de marin ou [consigne] pour gagner la confiance du capitaine."
    ],
    sorcier: [
      "Capture un message magique : [consigne]."
    ],
    zombie: [
      "Imite le cri d’un zombie ou [consigne] pour effrayer les morts-vivants."
    ]
  },
  gps: {
    arthurien: [
      "Chevalier, rends-toi à [lieu] pour recevoir ta quête.",
      "La magie t’appelle : pose le pied à [lieu] pour avancer dans l’aventure."
    ],
    pirate: [
      "Mets le cap sur [lieu] : là se cache la prochaine carte au trésor.",
      "Le compas indique [lieu]. Seul un vrai flibustier s’y rendra."
    ],
    prison: [
      "Le tunnel secret commence ici : atteins [lieu] sans te faire repérer.",
      "Un surveillant t’attend à [lieu] mais gare à ne pas te faire remarquer."
    ],
    super_heros: [
      "Le QG t’attend à [lieu] pour une mission top secrète."
    ],
    archeologue: [
      "Le prochain vestige est visible à [lieu]."
    ]
  },
  mot_de_passe: {
    arthurien: [
      "Seul le mot magique révélé par Merlin ouvrira la voie. Résous l’énigme et prononce le mot sacré.",
      "Une formule secrète protège le chemin : trouve-la pour avancer !"
    ],
    pirate: [
      "Le perroquet du capitaine ne confie le code qu’aux vrais pirates. Décroche le mot de passe caché dans l’énigme.",
      "Le coffre reste fermé tant que le code secret n’est pas murmuré..."
    ],
    prison: [
      "Décrypte le message codé pour forcer la serrure de ta cellule.",
      "Seul le bon mot de passe te libérera des chaînes."
    ],
    archeologue: [
      "Décryptez l’inscription antique et tapez le mot secret pour accéder à la salle suivante."
    ]
  },
  anagramme: {
    arthurien: [
      "Merlin a brouillé les mots : trouve la solution à l’anagramme et poursuis ton périple.",
      "Un sort de confusion a frappé la phrase suivante. Résous-la et avance !"
    ],
    pirate: [
      "Le parchemin du trésor est codé. Résous l’anagramme pour continuer la chasse.",
      "Un vrai pirate sait déchiffrer les messages secrets…"
    ],
    prison: [
      "Le plan d’évasion est crypté : résous l’anagramme pour ouvrir la voie."
    ]
  },
  puzzle_visuel: {
    arthurien: [
      "Observe attentivement cette image : une erreur s’y cache. Trouve-la et révèle ton sens de l’observation.",
      "Le vieux grimoire te défie : reconstitue la photo pour obtenir la prochaine énigme."
    ],
    pirate: [
      "Un indice du trésor est caché dans ce puzzle visuel. Résous-le pour avancer."
    ],
    prison: [
      "Le plan de la prison a été déchiré. Reconstitue-le pour découvrir la sortie."
    ]
  },
  signature_inconnu: {
    arthurien: [
      "Fais écrire un mot à un inconnu du royaume : [consigne].",
      "Va à la rencontre d’un voyageur et fais-lui écrire [consigne]."
    ],
    pirate: [
      "Obtiens la signature d’un matelot en lui demandant [consigne]."
    ],
    prison: [
      "Trouve un codétenu prêt à écrire [consigne] pour t’aider."
    ]
  },
  defi_collectif: {
    arthurien: [
      "Unissez vos forces pour relever ce défi collectif : [consigne]. Preuve à fournir : [preuve].",
      "La Table Ronde n’est complète que si tous participent à [consigne]."
    ],
    pirate: [
      "L’équipage doit réussir ensemble : [consigne] (preuve : [preuve])."
    ],
    prison: [
      "Tous les détenus doivent participer à [consigne]."
    ]
  },
  observation: {
    arthurien: [
      "Sous le regard des druides, compte les [objet] autour de [lieu]. Leur nombre est la clef de ta progression.",
      "Observe attentivement : quel est le détail caché à [lieu] ?"
    ],
    pirate: [
      "Les pirates doivent être observateurs : combien de [objet] veillent sur [lieu] ?"
    ],
    prison: [
      "Repère le nombre de [objet] dans la cour de la prison."
    ]
  },
  chasse_tresor: {
    arthurien: [
      "Lance-toi dans une chasse au trésor. Suis les indices en résolvant chaque énigme !",
      "Le Graal attend le plus persévérant. À chaque étape, trouve la clef suivante."
    ],
    pirate: [
      "Chaque indice te rapproche du trésor. Résous-les tous pour découvrir le butin final !"
    ]
  },
  combo: {
    arthurien: [
      "Accomplis ces épreuves en une seule étape : [actions].",
      "Le vrai héros ne recule pas devant la difficulté : combine [actions] pour impressionner le royaume."
    ],
    pirate: [
      "Un vrai corsaire doit prouver sa valeur en combinant : [actions]."
    ]
  },
  chrono: {
    arthurien: [
      "Le sablier est lancé : tu as [duree] secondes pour réussir cette mission.",
      "Le temps presse, chevalier ! Accomplis la tâche en moins de [duree] secondes."
    ],
    pirate: [
      "Le compte à rebours est lancé : dépêche-toi !"
    ]
  },
  duel: {
    arthurien: [
      "Affronte une autre équipe dans ce duel : [type_duel]. Le vainqueur aura droit à la gloire, le perdant à une épreuve supplémentaire.",
      "La Table Ronde aime les défis : [type_duel], critère : [critere_victoire]."
    ],
    pirate: [
      "Un duel pour l’honneur : [type_duel]."
    ]
  },
  pendu: {
    arthurien: [
      "Le bourreau attend : devine le mot mystère avant que la corde ne se resserre !",
      "Un sort maléfique ne sera levé qu’en découvrant le mot du pendu."
    ],
    pirate: [
      "Évite la planche : devine le mot ou rejoins les requins…"
    ]
  }
  // Ajoute ici d'autres types ou d'autres modes à volonté !
};
// Fin du fichier :
window.QUEST_TEXTS = QUEST_TEXTS;
