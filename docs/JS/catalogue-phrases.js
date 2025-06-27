// catalogue-phrases.js

const QUEST_TEXTS = {
  photo: {
    arthurien: [
      "Capture la magie d'Avalon en photographiant [objet].",
      "Une image de [objet] pourrait attirer la bénédiction de Merlin.",
      "La Table Ronde attend la preuve : prends une photo de [objet].",
      "Un bon chevalier immortalise toujours [objet] pour la postérité.",
      "La Dame du Lac veut contempler une image de [objet] prise par tes soins."
    ],
    pirate: [
      "Un vrai pirate n'avance jamais sans preuve : prends une photo de [objet].",
      "Photographie [objet] pour prouver ta valeur à l'équipage.",
      "Le capitaine exige une image claire de [objet].",
      "Le trésor reste caché tant que tu n'as pas immortalisé [objet] sur ta carte.",
      "Un cliché de [objet] sera la clef de ta fortune."
    ],
    prison: [
      "Pour tromper le geôlier, capture la preuve de [objet].",
      "Un complice attend une photo de [objet] pour préparer ta fuite.",
      "Photographie [objet] sans te faire repérer par les surveillants.",
      "Une image de [objet] pourra servir d'alibi.",
      "Tu dois montrer [objet] à travers ta photo pour avancer vers la liberté."
    ],
    sorcier: [
      "Le professeur t'ordonne d'immortaliser [objet] pour ta prochaine potion.",
      "Un sortilège ne s'accomplit qu'avec la photo de [objet].",
      "Capture [objet] en image pour activer la magie du grimoire.",
      "Photographie [objet] sous une lumière étrange pour révéler son pouvoir.",
      "L'esprit du lieu attend une image de [objet] pour ouvrir le portail."
    ],
    super_heros: [
      "Une menace plane ! Prends une photo de [objet] pour l'analyse du QG.",
      "Le QG attend la preuve que tu as bien trouvé [objet].",
      "Immortalise [objet] pour compléter ta mission héroïque.",
      "Un super-héros sait toujours capturer [objet] sous son meilleur angle.",
      "Prends la pose avec [objet] pour inspirer la prochaine génération."
    ],
    zombie: [
      "Photographie [objet] : chaque trace peut sauver un survivant.",
      "Un antidote ne pourra être conçu qu'avec la photo de [objet].",
      "Capture [objet] pour avertir la communauté de survivants.",
      "Une image de [objet] pourrait contenir un indice vital.",
      "Montre à tous que [objet] existe encore grâce à ta photo."
    ],
    archeologue: [
      "Immortalisez [objet] pour compléter le carnet de fouilles.",
      "Le musée attend la photo de [objet] pour valider votre découverte.",
      "Photographie [objet] afin de documenter la fouille scientifique.",
      "Une image nette de [objet] révélera son secret au monde.",
      "Le guide archéologique recommande une photo de [objet] pour les archives."
    ]
  },

  photo_inconnus: {
    arthurien: [
      "Pars à la rencontre d’âmes en quête d’aventure : prends une photo avec [nbPersonnes] inconnu(e)[s] remplissant ce critère : [critere].",
      "Seul un vrai chevalier sait s’entourer : immortalise-toi avec [critere] ([nbPersonnes] personne[s] différente[s]).",
      "La Table Ronde accueille volontiers de nouveaux visages : photographie [nbPersonnes] inconnu[s] qui [critere].",
      "Le destin d'Avalon se joue parfois sur une photo : pose avec [nbPersonnes] inconnu(s) qui [critere].",
      "La magie d'une rencontre se révèle avec une photo de [nbPersonnes] inconnu(s) qui [critere]."
    ],
    pirate: [
      "Réalise un portrait avec [nbPersonnes] matelot(s) remplissant ce critère : [critere].",
      "Pour impressionner le capitaine, prends une photo avec [nbPersonnes] inconnu(s) qui [critere].",
      "L’équipage cherche de nouveaux membres : photographie [nbPersonnes] inconnu(s) qui [critere].",
      "Un vrai pirate n’a peur de poser avec [nbPersonnes] inconnu(s) qui [critere].",
      "Le trésor des relations commence par une photo de [nbPersonnes] inconnu(s) qui [critere]."
    ],
    prison: [
      "Pour le plan d’évasion, photographiez-vous avec [nbPersonnes] détenu(e)[s] qui [critere].",
      "Un cliché avec [nbPersonnes] complice(s) qui [critere] pourrait t’ouvrir des portes.",
      "La solidarité s’affiche sur une photo avec [nbPersonnes] détenu(s) qui [critere].",
      "Une photo collective peut tromper les surveillants : trouve [nbPersonnes] inconnu(s) qui [critere].",
      "Ton alibi sera béton avec une image de [nbPersonnes] détenu(s) qui [critere]."
    ],
    sorcier: [
      "Compose une photo de groupe avec [nbPersonnes] élève(s) qui [critere].",
      "Pour compléter ton rituel, photographie-toi avec [nbPersonnes] inconnu(s) qui [critere].",
      "Un cercle magique se forme avec [nbPersonnes] inconnu(s) qui [critere].",
      "L’initiation exige une photo de [nbPersonnes] inconnu(s) qui [critere].",
      "Le grimoire réclame une image de [nbPersonnes] inconnu(s) qui [critere]."
    ],
    super_heros: [
      "Un vrai héros doit s’entourer : photographie-toi avec [nbPersonnes] personne(s) qui [critere].",
      "Le QG apprécie les photos d’équipe : trouve [nbPersonnes] inconnu(s) qui [critere].",
      "Un super-héros sait reconnaître [critere] chez [nbPersonnes] inconnu(s).",
      "La mission d’aujourd’hui : un selfie avec [nbPersonnes] inconnu(s) qui [critere].",
      "Le journal attend une photo de [nbPersonnes] inconnu(s) qui [critere]."
    ],
    zombie: [
      "Pour survivre, prends une photo avec [nbPersonnes] survivant(s) qui [critere].",
      "L’union fait la force : immortalise [nbPersonnes] inconnu(s) qui [critere].",
      "Un témoignage rare : pose avec [nbPersonnes] inconnu(s) qui [critere].",
      "Raconte l’apocalypse avec une photo de [nbPersonnes] inconnu(s) qui [critere].",
      "Un cliché de [nbPersonnes] inconnu(s) qui [critere] pourra aider les rescapés."
    ],
    archeologue: [
      "Documente ta découverte : photographie-toi avec [nbPersonnes] inconnu(s) qui [critere].",
      "Une équipe soudée : pose avec [nbPersonnes] inconnu(s) qui [critere].",
      "Une archive précieuse : une photo de [nbPersonnes] inconnu(s) qui [critere].",
      "Le musée appréciera une image de [nbPersonnes] inconnu(s) qui [critere].",
      "La science avance grâce à un cliché de [nbPersonnes] inconnu(s) qui [critere]."
    ]
  },

  collecte_objet: {
    arthurien: [
      "Ramène [objet] à la fée Morgane pour gagner sa bénédiction.",
      "Le roi réclame [objet] pour poursuivre la quête.",
      "Trouve [objet] sacré pour honorer la Table Ronde.",
      "Chaque objet trouvé renforce ta légende à Camelot.",
      "Un vestige d’Avalon : rapporte [objet] à ton clan."
    ],
    pirate: [
      "Trouve et rapporte [objet] à ton équipage.",
      "Le coffre ne s’ouvrira qu’avec [objet] en main.",
      "Rapporte [objet] pour obtenir ta part du butin.",
      "Chaque objet collecté rapproche du trésor.",
      "Le capitaine raffole de [objet] : fais-lui plaisir !"
    ],
    prison: [
      "Pour fabriquer une clé, il te faut [objet]. Ramène-le discrètement.",
      "Rapporte [objet] à ton complice pour avancer dans le plan d’évasion.",
      "Chaque objet trouvé te rapproche de la liberté.",
      "Un vrai détenu ne laisse jamais passer [objet].",
      "Le plan d’évasion dépend de ta collecte de [objet]."
    ],
    sorcier: [
      "Collecte [objet] pour ta prochaine potion magique.",
      "Le grimoire exige [objet] pour compléter le rituel.",
      "Un ingrédient rare : ramène [objet] au laboratoire magique.",
      "Chaque objet magique complète ta formule.",
      "Le professeur n’attend que [objet] pour valider l’expérience."
    ],
    super_heros: [
      "Récupère [objet] pour le QG, c’est vital pour la mission.",
      "Chaque objet trouvé peut sauver la ville : rapporte [objet].",
      "Un gadget manquant ? Cherche [objet] pour le QG.",
      "La prochaine victoire dépend de ta collecte de [objet].",
      "Un héros prévoyant n’oublie jamais [objet]."
    ],
    zombie: [
      "Trouve [objet] pour survivre à l’invasion.",
      "Rapporte [objet] à la communauté pour renforcer les défenses.",
      "Chaque objet trouvé augmente tes chances.",
      "La survie dépend de [objet] : ne tarde pas.",
      "Un bon survivant ne néglige jamais [objet]."
    ],
    archeologue: [
      "Ramène [objet] pour enrichir la collection du musée.",
      "Chaque [objet] trouvé éclaire l’histoire du site.",
      "Un artefact en main vaut mieux que dix sur le plan.",
      "Le passé se cache parfois dans [objet] : rapporte-le.",
      "Documente ta découverte en ramenant [objet] intact."
    ]
  },

  audio: {
    arthurien: [
      "Enregistre le cri de guerre des chevalier(s), ou imite [consigne].",
      "Le mage veut entendre : [consigne].",
      "Le barde attend ta chanson : chante [consigne].",
      "Un sort ne s’active qu’avec une voix : prononce [consigne].",
      "Le grimoire réclame la trace audio de [consigne]."
    ],
    pirate: [
      "Enregistre ton chant de marin ou [consigne] pour gagner la confiance du capitaine.",
      "Fais entendre [consigne] à toute la cale.",
      "Un vrai pirate sait imiter [consigne].",
      "Le perroquet du capitaine adore entendre [consigne].",
      "Raconte une histoire de mer en enregistrant [consigne]."
    ],
    prison: [
      "Enregistre discrètement [consigne] sans alerter les surveillants.",
      "Fais passer un message codé : [consigne].",
      "Le plan d’évasion commence par un son : capture [consigne].",
      "Ton complice attend un signal audio : [consigne].",
      "Enregistre une confession ou [consigne] pour distraire le gardien."
    ],
    sorcier: [
      "Capture un message magique : [consigne].",
      "Prononce l’incantation suivante à voix haute : [consigne].",
      "Le sortilège ne fonctionne qu’avec le bon timbre : [consigne].",
      "Le professeur attend la preuve sonore de [consigne].",
      "Un bon sorcier conserve toujours l’enregistrement de [consigne]."
    ],
    super_heros: [
      "Enregistre une alerte sonore ou [consigne] pour prévenir le QG.",
      "Fais entendre [consigne] à tes alliés.",
      "Un héros laisse un message vocal de [consigne] pour la postérité.",
      "Le QG valide la mission avec l’audio de [consigne].",
      "Crée une ambiance sonore de victoire avec [consigne]."
    ],
    zombie: [
      "Imite le cri d’un zombie ou [consigne] pour effrayer les mort(s)-vivant(s).",
      "Lance un SOS audio : [consigne].",
      "Enregistre un bruit suspect : [consigne].",
      "Le refuge attend une alerte sonore : [consigne].",
      "Un survivant malin sait transmettre [consigne] discrètement."
    ],
    archeologue: [
      "Enregistre ta découverte sur le terrain : [consigne].",
      "Fais entendre [consigne] pour documenter la fouille.",
      "Le musée apprécie un témoignage vocal de [consigne].",
      "Note une ambiance sonore caractéristique : [consigne].",
      "Chaque fouille mérite un enregistrement de [consigne]."
    ]
  },

  gps: {
    arthurien: [
      "Chevalier, rends-toi à [lieu] pour recevoir ta quête.",
      "La magie t’appelle : pose le pied à [lieu] pour avancer dans l’aventure.",
      "Un ancien druide t’attend à [lieu].",
      "Le chemin du Graal passe par [lieu].",
      "La Table Ronde a caché un indice à [lieu]."
    ],
    pirate: [
      "Mets le cap sur [lieu] : là se cache la prochaine carte au trésor.",
      "Le compas indique [lieu]. Seul un vrai flibustier s’y rendra.",
      "Trouve l’île secrète à [lieu] pour ton équipage.",
      "Un trésor attend à [lieu], mais la route est périlleuse.",
      "Le capitaine a marqué [lieu] sur la carte."
    ],
    prison: [
      "Le tunnel secret commence ici : atteins [lieu] sans te faire repérer.",
      "Un surveillant t’attend à [lieu] mais gare à ne pas te faire remarquer.",
      "La cour de la prison à [lieu] est sous surveillance.",
      "Un complice t’attend à [lieu] : sois discret.",
      "Le plan d’évasion te mène droit à [lieu]."
    ],
    sorcier: [
      "Suis le cercle magique jusqu’à [lieu] pour compléter le rituel.",
      "Le pentacle t’indique une destination : [lieu].",
      "Le prochain ingrédient se trouve à [lieu].",
      "Le grimoire révèle une page cachée à [lieu].",
      "La magie s’intensifie à l’approche de [lieu]."
    ],
    super_heros: [
      "Le QG t’attend à [lieu] pour une mission top secrète.",
      "Rends-toi à [lieu] pour stopper la menace.",
      "Un super-héros doit toujours savoir où se trouve [lieu].",
      "Le sort de la ville dépend de ta présence à [lieu].",
      "Le QG a repéré une anomalie à [lieu] : fonce !"
    ],
    zombie: [
      "Trouve le refuge à [lieu] avant la prochaine attaque.",
      "Atteins [lieu] pour rejoindre les autres survivants.",
      "Un stock de vivres a été repéré à [lieu].",
      "Le groupe attend des nouvelles de [lieu].",
      "Le chemin est risqué, mais [lieu] est vital pour la survie."
    ],
    archeologue: [
      "Le prochain vestige est visible à [lieu].",
      "Va à [lieu] pour découvrir un artefact oublié.",
      "Le plan de fouille commence à [lieu].",
      "La découverte du siècle se cache à [lieu].",
      "Le chantier archéologique principal est à [lieu]."
    ]
  },

  anagramme: {
    arthurien: [
      "Merlin a brouillé les mots : trouve la solution à l’anagramme et poursuis ton périple.",
      "Un sort de confusion a frappé la phrase suivante. Résous-la et avance !",
      "La Table Ronde teste ton esprit : résous cet anagramme.",
      "Un secret d’Avalon est caché dans cette énigme.",
      "Le grimoire ne s’ouvre qu’avec la bonne solution."
    ],
    pirate: [
      "Le parchemin du trésor est codé. Résous l’anagramme pour continuer la chasse.",
      "Un vrai pirate sait déchiffrer les messages secrets…",
      "Le capitaine adore les énigmes : relève le défi !",
      "Un coffre ne s’ouvre qu’avec le bon mot.",
      "Trouve la clé du butin cachée dans cette anagramme."
    ],
    prison: [
      "Le plan d’évasion est crypté : résous l’anagramme pour ouvrir la voie.",
      "Décrypte la phrase pour obtenir la clé de la cellule.",
      "Ton complice a laissé un message codé.",
      "Le directeur a piégé l’indice dans une anagramme.",
      "Un gardien malin saura te piéger avec ce jeu de lettres."
    ],
    sorcier: [
      "Résous ce cryptogramme pour activer le sort.",
      "Reconstitue la formule magique cachée dans l’anagramme.",
      "Le professeur attend la phrase correcte.",
      "Un sort ancien ne se révèle qu’aux esprits vifs.",
      "Les lettres dansent sous tes yeux, sauras-tu les ordonner ?"
    ],
    super_heros: [
      "Le QG a intercepté un message codé. Trouve la solution !",
      "Résous l’anagramme pour obtenir la localisation du danger.",
      "Un super-héros ne recule pas devant les jeux de lettres.",
      "La mission ne continue qu’avec la bonne réponse.",
      "Le sort de la ville dépend de ton esprit."
    ],
    zombie: [
      "Un survivant a laissé un message codé. Déchiffre-le pour trouver la sortie.",
      "Résous l’énigme pour connaître le mot de passe du refuge.",
      "Ta survie dépend de ce jeu de lettres.",
      "Le chaos cache parfois une solution simple.",
      "Un bon survivant sait lire entre les lignes."
    ],
    archeologue: [
      "Résous l’anagramme pour révéler le nom du vestige.",
      "Un cryptogramme antique te barre la route. Décode-le !",
      "Chaque site cache une énigme.",
      "Les anciens aimaient les jeux de mots : relève le défi.",
      "Un artefact ne se dévoile qu’à l’esprit vif."
    ]
  },

  chrono: {
    arthurien: [
      "Le sablier est lancé : tu as [duree] secondes pour réussir cette mission.",
      "Le temps presse, chevalier ! Accomplis la tâche en moins de [duree] secondes.",
      "Merlin chronomètre ton exploit : sois rapide.",
      "La magie s’estompe dans [duree] secondes.",
      "Le Graal n’attend pas les retardataires !"
    ],
    pirate: [
      "Le compte à rebours est lancé : dépêche-toi !",
      "Ramène [objet] avant la marée dans [duree] secondes.",
      "Le capitaine n’aime pas attendre.",
      "Le sablier du pont s’écoule vite.",
      "Le trésor disparaîtra si tu n’agis pas vite !"
    ],
    prison: [
      "Échappe-toi avant la prochaine ronde : il te reste [duree] secondes.",
      "Agis vite, la liberté n’attend pas !",
      "Le temps joue contre toi : fonce.",
      "Les surveillants arrivent dans [duree] secondes.",
      "Un bon détenu ne perd jamais une seconde."
    ],
    sorcier: [
      "Le rituel doit être accompli en moins de [duree] secondes.",
      "Le temps est compté avant la fermeture du cercle magique.",
      "La potion explose dans [duree] secondes si tu échoues !",
      "Le grimoire se referme bientôt.",
      "Chaque seconde compte pour sauver l’incantation."
    ],
    super_heros: [
      "Sauve la ville en moins de [duree] secondes !",
      "Le QG lance le chrono : agis vite.",
      "Ta mission est chronométrée.",
      "Un héros ne laisse jamais filer les secondes.",
      "Le compte à rebours est lancé pour sauver le monde."
    ],
    zombie: [
      "Le refuge ferme ses portes dans [duree] secondes : dépêche-toi !",
      "Le chrono démarre : chaque seconde compte pour ta survie.",
      "Les zombies approchent : fonce !",
      "Un survivant ne traîne jamais.",
      "La pénurie arrive dans [duree] secondes."
    ],
    archeologue: [
      "Découvre l’artefact avant la fin du chrono : [duree] secondes.",
      "La fouille est chronométrée : agis vite.",
      "Le chef du chantier surveille le temps.",
      "Un bon archéologue doit être aussi rapide que précis.",
      "Le site ferme dans [duree] secondes."
    ]
  },

  duel: {
    arthurien: [
      "Affronte une autre équipe dans ce duel : [type_duel]. Le vainqueur aura droit à la gloire, le perdant à une épreuve supplémentaire.",
      "La Table Ronde aime les défis : [type_duel], critère : [critere_victoire].",
      "Le roi regarde ce duel avec attention.",
      "Ton honneur est en jeu dans ce duel.",
      "Prépare-toi à défendre ta place avec [type_duel] !"
    ],
    pirate: [
      "Un duel pour l’honneur : [type_duel].",
      "Le capitaine observe le duel : [type_duel], critère : [critere_victoire].",
      "La mer choisit toujours le plus fort.",
      "Un sabre bien aiguisé ou un esprit vif : à toi de choisir.",
      "Le gagnant aura une part de rhum en plus."
    ],
    prison: [
      "Le bloc retient son souffle pour ce duel : [type_duel].",
      "Sors vainqueur du duel : [type_duel], critère : [critere_victoire].",
      "La hiérarchie du bloc se joue ici.",
      "Le respect se gagne dans ce face-à-face.",
      "Le surveillant parie sur le résultat !"
    ],
    sorcier: [
      "Le cercle magique accueille un duel exceptionnel : [type_duel].",
      "Montre ta puissance dans ce duel : [type_duel], critère : [critere_victoire].",
      "Les arcanes désignent leur champion.",
      "Un duel magique ne tolère aucune erreur.",
      "Le professeur observe le duel avec intérêt."
    ],
    super_heros: [
      "Le QG organise un affrontement : [type_duel].",
      "Le destin de la ville se joue sur ce duel : [type_duel], critère : [critere_victoire].",
      "Un justicier n’a peur de rien.",
      "Le public attend un spectacle héroïque.",
      "Le vainqueur sera le chef de la prochaine mission."
    ],
    zombie: [
      "Un duel pour la survie : [type_duel].",
      "Le gagnant de ce duel : [type_duel], critère : [critere_victoire], pourra rejoindre le refuge.",
      "Les zombies observent… qui sera encore vivant à la fin ?",
      "Le chaos ne laisse pas le temps de réfléchir.",
      "Un survivant n’abandonne jamais dans un duel."
    ],
    archeologue: [
      "Affronte un rival pour la découverte : [type_duel].",
      "Le site archéologique est le théâtre d’un duel : [type_duel], critère : [critere_victoire].",
      "Seul le meilleur découvreur sera reconnu.",
      "La science progresse dans la confrontation.",
      "Ton prestige dépend du résultat de ce duel."
    ]
  },

  pendu: {
    arthurien: [
      "Le bourreau attend : devine le mot mystère avant que la corde ne se resserre !",
      "Un sort maléfique ne sera levé qu’en découvrant le mot du pendu.",
      "La Table Ronde te met à l’épreuve du pendu.",
      "Chaque lettre trouvée rapproche du Graal.",
      "Un chevalier de légende sait sauver sa tête avec les mots."
    ],
    pirate: [
      "Évite la planche : devine le mot ou rejoins les requins…",
      "Un pirate averti sait deviner les mots du pendu pour garder sa place à bord.",
      "Le capitaine adore les jeux de lettres.",
      "Le trésor n’est accessible qu’avec le bon mot.",
      "Une erreur de lettre et c’est la mer qui t’attend."
    ],
    prison: [
      "Le gardien teste ta vivacité d’esprit : trouve le mot du pendu pour sortir du bloc.",
      "Seul le mot découvert te fera éviter la cellule d’isolement.",
      "Le pendu du quartier est redoutable.",
      "Chaque lettre compte pour ta libération.",
      "Un détenu malin gagne toujours au pendu."
    ],
    sorcier: [
      "Le grimoire magique te défie : découvre le mot caché pour lever le sort.",
      "Un apprenti sorcier doit percer le secret du pendu pour progresser.",
      "La baguette ne répond qu’aux esprits aiguisés.",
      "Chaque lettre trouvée libère un pouvoir.",
      "Le cercle magique attend ta réponse."
    ],
    super_heros: [
      "Le QG t’impose une énigme : devine le mot avant la fin du chrono.",
      "Un super-héros résout toujours le pendu pour sauver la ville.",
      "Chaque lettre découverte est une victoire sur le mal.",
      "Le pendu du QG est réservé aux meilleurs.",
      "Un justicier ne recule jamais devant un mot secret."
    ],
    zombie: [
      "Trouve le mot du pendu pour ouvrir la porte du refuge.",
      "Un survivant ne recule jamais devant une énigme du pendu.",
      "Chaque lettre trouvée repousse les zombies.",
      "Le refuge reste fermé sans le bon mot.",
      "Le pendu du chaos sauve parfois la vie."
    ],
    archeologue: [
      "Devine le mot secret pour révéler un trésor archéologique.",
      "Le pendu antique te réserve un mot-clef à découvrir.",
      "Chaque lettre retrouvée éclaire le passé.",
      "Le musée adore les solutions du pendu.",
      "Un archéologue ne recule pas devant le jeu du pendu."
    ]
  }
};

window.QUEST_TEXTS = QUEST_TEXTS;
