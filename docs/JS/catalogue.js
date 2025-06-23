const QUESTS_CATALOGUE = [
  {
    id: "photo",
    nom: "Photo à prendre",
    description: "Prendre une photo selon le scénario et le thème choisi.",
    parametres: [
      { key: "nbPhotos", type: "number", label: "Nombre de photos", default: 1, min: 1, max: 10 },
      { key: "consigne", type: "text", label: "Consigne ou thème", placeholder: "ex : un arbre" }
    ],
    combinable: ["gps", "chrono", "mot_de_passe"],
    preview: "photo",
    scenarios: {
      arthurien: [
        {
          titre: "L'épreuve du Vaillant",
          metaphore: "La lumière du Graal ne brille que pour ceux qui osent s’élever.",
          objectif: "Grimper au sommet de la toile.",
          defi: "Prenez une photo de votre équipe tout en haut.",
          gps: "47.477821,-0.577896"
        },
        {
          titre: "L’œil de Merlin",
          metaphore: "Le vieux mage observe qui sait ouvrir les yeux sur le monde.",
          objectif: "Repérer un symbole caché.",
          defi: "Prenez la photo du symbole secret de Merlin.",
          gps: "47.478000,-0.578000"
        },
        {
          titre: "La Relique cachée",
          metaphore: "Les vestiges du passé n’attendent que d’être révélés.",
          objectif: "Trouver et immortaliser un objet ancien.",
          defi: "Prenez une photo de l’objet le plus ancien du site.",
          gps: "47.478500,-0.577500"
        },
        {
          titre: "La Bête Mystique",
          metaphore: "Celui qui débusque l’animal sacré saura guider sa quête.",
          objectif: "Photographier un animal du parc choisi par Merlin.",
          defi: "Prenez une photo du chevreau ou de la tortue.",
          gps: "47.479000,-0.577600"
        },
        {
          titre: "Le Passage Secret",
          metaphore: "L’entrée cachée n’apparaît qu’aux yeux des justes.",
          objectif: "Découvrir un passage ou un abri discret.",
          defi: "Prenez une photo de l’entrée cachée.",
          gps: "47.480000,-0.578200"
        }
      ],
      pirate: [
        {
          titre: "Le Trésor Enfoui",
          metaphore: "Le sable garde jalousement ses secrets.",
          objectif: "Localiser l’emplacement du coffre.",
          defi: "Prenez une photo d’un X ou d’un indice au sol.",
          gps: "47.480200,-0.578300"
        },
        {
          titre: "Le Drapeau Noir",
          metaphore: "Le pavillon flotte toujours là où le danger rôde.",
          objectif: "Repérer un drapeau ou un symbole pirate.",
          defi: "Prenez une photo du drapeau hissé.",
          gps: "47.480800,-0.579000"
        },
        {
          titre: "La Bouteille à la Mer",
          metaphore: "Un message flotte sur les flots, perdu mais pas oublié.",
          objectif: "Trouver un message caché dans une bouteille.",
          defi: "Prenez une photo de la bouteille et du message.",
          gps: "47.481000,-0.579200"
        },
        {
          titre: "L’Accostage",
          metaphore: "La terre promise s’annonce par l’ancre jetée.",
          objectif: "Montrer l’arrivée de l’équipage à bon port.",
          defi: "Prenez une photo de votre équipe devant la berge ou la rive.",
          gps: "47.481500,-0.579800"
        },
        {
          titre: "Le Compas d’Or",
          metaphore: "Sans compas, point de fortune !",
          objectif: "Trouver un objet en forme de cercle ou de compas.",
          defi: "Prenez une photo de l’objet trouvé par l’équipe.",
          gps: "47.482000,-0.580000"
        }
      ],
      prison: [
        {
          titre: "L’ombre des barreaux",
          metaphore: "Même derrière les barreaux, la lumière trouve son chemin.",
          objectif: "Trouver le passage secret de la prison.",
          defi: "Prenez une photo de l’ouverture cachée.",
          gps: "47.471000,-0.576000"
        },
        {
          titre: "Évasion en image",
          metaphore: "Un cliché vaut parfois toutes les complicités.",
          objectif: "Immortaliser le plan d’évasion dessiné sur le mur.",
          defi: "Prenez une photo du schéma ou du plan secret.",
          gps: "47.471200,-0.576200"
        },
        {
          titre: "La Sentinelle",
          metaphore: "Repérer qui surveille, c’est déjà s’en libérer.",
          objectif: "Trouver un poste de garde ou une caméra factice.",
          defi: "Prenez une photo du poste de surveillance.",
          gps: "47.471900,-0.576800"
        },
        {
          titre: "La Clé du Passage",
          metaphore: "La clé de la liberté se cache là où on ne l’attend pas.",
          objectif: "Repérer une clé ou un objet symbolique.",
          defi: "Prenez une photo de la clé ou de l’objet.",
          gps: "47.472300,-0.576300"
        },
        {
          titre: "Trace de liberté",
          metaphore: "Même une trace de pas peut ouvrir la voie.",
          objectif: "Suivre une série de marques jusqu’à la sortie.",
          defi: "Prenez une photo de la trace la plus éloignée.",
          gps: "47.472900,-0.577000"
        }
      ],
      sorcier: [
        {
          titre: "La Pierre Philosophale",
          metaphore: "Le secret de la magie se cache dans la matière.",
          objectif: "Trouver une pierre ou un objet mystérieux.",
          defi: "Prenez une photo de la pierre la plus étrange.",
          gps: "47.475100,-0.580100"
        },
        {
          titre: "Herbier magique",
          metaphore: "Chaque feuille porte la mémoire d’un sort.",
          objectif: "Trouver trois plantes différentes.",
          defi: "Prenez en photo trois feuilles ou fleurs inhabituelles.",
          gps: "47.475600,-0.580600"
        },
        {
          titre: "Baguette du hasard",
          metaphore: "La magie se choisit parfois elle-même.",
          objectif: "Chercher un bâton ou une branche à la forme étrange.",
          defi: "Prenez une photo de la baguette improvisée.",
          gps: "47.476100,-0.581100"
        },
        {
          titre: "L’ingrédient secret",
          metaphore: "Pas de potion sans ingrédient rare.",
          objectif: "Trouver un ingrédient unique pour une potion.",
          defi: "Prenez une photo de l’ingrédient le plus insolite.",
          gps: "47.476800,-0.581800"
        },
        {
          titre: "Le miroir du mage",
          metaphore: "Le reflet révèle parfois l’invisible.",
          objectif: "Trouver un endroit qui réfléchit la lumière.",
          defi: "Prenez une photo du reflet le plus surprenant.",
          gps: "47.477400,-0.582400"
        }
      ],
      super_heros: [
        {
          titre: "La Planque Secrète",
          metaphore: "Chaque héros a son repaire, caché aux yeux du monde.",
          objectif: "Identifier un lieu discret du parc.",
          defi: "Prenez une photo de l’endroit le plus secret.",
          gps: "47.480000,-0.585000"
        },
        {
          titre: "Signal d’Alerte",
          metaphore: "Un signe lumineux appelle toujours les justiciers.",
          objectif: "Trouver un objet lumineux ou haut perché.",
          defi: "Prenez une photo de la lumière ou de la tour la plus haute.",
          gps: "47.480800,-0.585800"
        },
        {
          titre: "Camouflage Express",
          metaphore: "Un vrai héros sait se fondre dans le décor.",
          objectif: "Trouver un endroit où se cacher.",
          defi: "Prenez une photo de votre équipe camouflée.",
          gps: "47.481500,-0.586500"
        },
        {
          titre: "L’Artefact Perdu",
          metaphore: "Le pouvoir sommeille dans l’objet le plus anodin.",
          objectif: "Trouver un objet insolite ou coloré.",
          defi: "Prenez une photo de votre découverte.",
          gps: "47.482300,-0.587300"
        },
        {
          titre: "La Mission Sauvetage",
          metaphore: "Un héros n’abandonne jamais un allié.",
          objectif: "Mettre en scène un sauvetage dans le décor.",
          defi: "Prenez une photo de l’équipe en pleine action de sauvetage.",
          gps: "47.482900,-0.587900"
        }
      ],
      zombie: [
        {
          titre: "La Cabane Assiégée",
          metaphore: "Parfois, la survie tient à une porte bien fermée.",
          objectif: "Trouver un abri et prouver qu’il est sécurisé.",
          defi: "Prenez une photo de votre équipe barricadant une cabane.",
          gps: "47.485100,-0.590100"
        },
        {
          titre: "L’Objet de l’Antidote",
          metaphore: "La vie ne tient qu’à un fil… ou à une fiole.",
          objectif: "Trouver l’objet qui pourrait servir d’antidote.",
          defi: "Prenez une photo de l’objet choisi.",
          gps: "47.486100,-0.591100"
        },
        {
          titre: "Trace de Survivant",
          metaphore: "Une trace peut sauver un groupe entier.",
          objectif: "Repérer une marque étrange au sol.",
          defi: "Prenez une photo de l’empreinte ou de la trace.",
          gps: "47.487100,-0.592100"
        },
        {
          titre: "Le Cercle de Protection",
          metaphore: "Un cercle peut repousser la horde.",
          objectif: "Dessiner ou trouver un cercle sur le terrain.",
          defi: "Prenez une photo du cercle protecteur.",
          gps: "47.488100,-0.593100"
        },
        {
          titre: "Le Survivant Masqué",
          metaphore: "Se cacher, c’est parfois survivre.",
          objectif: "Mettre en scène une cachette efficace.",
          defi: "Prenez une photo de l’équipe dissimulée au maximum.",
          gps: "47.489100,-0.594100"
        }
      ],
      archeologue: [
        {
          titre: "La Relique Disparue",
          metaphore: "Sous la terre, l’histoire attend d’être révélée.",
          objectif: "Trouver et photographier une relique du passé.",
          defi: "Prenez une photo d’un objet ancien trouvé sur le terrain.",
          gps: "47.490100,-0.595100"
        },
        {
          titre: "Le Manuscrit Caché",
          metaphore: "Les secrets sont faits pour être découverts.",
          objectif: "Trouver un texte ou une inscription ancienne.",
          defi: "Prenez une photo d’un texte gravé ou manuscrit.",
          gps: "47.491100,-0.596100"
        },
        {
          titre: "Fossile ou Fantaisie",
          metaphore: "Un œil attentif distingue le vrai du faux.",
          objectif: "Repérer une forme fossile ou inhabituelle.",
          defi: "Prenez une photo de la découverte insolite.",
          gps: "47.492100,-0.597100"
        },
        {
          titre: "Le Mystère des Pierres",
          metaphore: "Chaque pierre raconte une histoire.",
          objectif: "Trouver deux pierres de forme étrange.",
          defi: "Prenez une photo des deux pierres côte à côte.",
          gps: "47.493100,-0.598100"
        },
        {
          titre: "L’Objet du Savoir",
          metaphore: "La connaissance se transmet par les objets.",
          objectif: "Trouver un objet qui pourrait appartenir à un chercheur.",
          defi: "Prenez une photo de l’objet et expliquez sa fonction.",
          gps: "47.494100,-0.599100"
       }
     ] 
  }
,
        
  {
  id: "photo_inconnus",
  nom: "Photo avec des inconnus",
  description: "Prendre une ou plusieurs photos avec des personnes différentes ou répondant à un critère déterminé. (Qui porte des lunettes ; qui a plus de 50 ans ; qui porte une chemise blanche, etc.)",
  parametres: [
    { key: "nbPersonnes", type: "number", label: "Nombre de personnes/photos", default: 1, min: 1, max: 10 },
    { key: "critere", type: "text", label: "Critère ou consigne", placeholder: "ex : Personne qui porte un chapeau" }
  ],
  combinable: ["gps", "chrono"],
  preview: "photo",
  scenarios: {
    arthurien: [
      {
        titre: "La Fraternité des Chevaliers",
        metaphore: "Un vrai chevalier sait s’entourer des âmes vaillantes.",
        objectif: "Rencontrer des inconnus dignes de la Table Ronde.",
        defi: "Prenez une photo avec [nbPersonnes] personnes portant un vêtement rouge.",
        gps: "47.477900,-0.577950"
      },
      {
        titre: "L’Alliance des Bravest",
        metaphore: "La quête s’accomplit rarement seul.",
        objectif: "Former une alliance temporaire avec des passants.",
        defi: "Prenez une photo de groupe avec des inconnus mimant une épée.",
        gps: "47.478900,-0.578800"
      },
      {
        titre: "Rencontre en Carmélide",
        metaphore: "Les terres lointaines offrent toujours de nouveaux alliés.",
        objectif: "Trouver des inconnus prêts à relever un défi.",
        defi: "Prenez une photo avec [nbPersonnes] personnes faisant une grimace.",
        gps: "47.479900,-0.579800"
      },
      {
        titre: "Le Conseil des Sages",
        metaphore: "L’expérience s’échange au détour d’un sourire.",
        objectif: "Rencontrer des personnes de plus de 50 ans.",
        defi: "Photographiez-vous avec deux inconnus ayant des cheveux gris ou blancs.",
        gps: "47.480900,-0.580800"
      },
      {
        titre: "L’Émissaire du Royaume",
        metaphore: "La paix se construit par l’ouverture à l’autre.",
        objectif: "Saluer de nouveaux visages.",
        defi: "Prenez une photo avec des inconnus faisant le signe de la paix.",
        gps: "47.481900,-0.581800"
      }
    ],
    pirate: [
      {
        titre: "Portraits de Matelots",
        metaphore: "Un bon équipage se compose sur les quais.",
        objectif: "Trouver des complices de fortune.",
        defi: "Prenez une photo avec [nbPersonnes] personnes portant un chapeau.",
        gps: "47.482900,-0.582800"
      },
      {
        titre: "La Frimousse du Flibustier",
        metaphore: "Le sourire d’un pirate cache mille ruses.",
        objectif: "Repérer des passants déguisés ou originaux.",
        defi: "Prenez une photo avec deux inconnus arborant un accessoire insolite.",
        gps: "47.483900,-0.583800"
      },
      {
        titre: "La Taverne Animée",
        metaphore: "C’est à la taverne qu’on trouve les meilleurs alliés.",
        objectif: "Faire la connaissance de nouveaux moussaillons.",
        defi: "Prenez une photo avec des inconnus levant un verre (même d’eau !).",
        gps: "47.484900,-0.584800"
      },
      {
        titre: "Complices de Fortune",
        metaphore: "Parfois, un trésor se cache dans la rencontre.",
        objectif: "Trouver des inconnus prêts à faire le salut pirate.",
        defi: "Prenez une photo avec [nbPersonnes] personnes faisant le salut pirate.",
        gps: "47.485900,-0.585800"
      },
      {
        titre: "La Chasse aux Barbes",
        metaphore: "Chaque barbe raconte un voyage.",
        objectif: "Trouver des inconnus barbus.",
        defi: "Prenez une photo avec au moins deux personnes à la barbe fournie.",
        gps: "47.486900,-0.586800"
      }
    ],
    prison: [
      {
        titre: "Complices de Cavale",
        metaphore: "Pour s’évader, il faut des alliés inattendus.",
        objectif: "Trouver des inconnus prêts à jouer les complices.",
        defi: "Prenez une photo avec des inconnus mimant des menottes.",
        gps: "47.487900,-0.587800"
      },
      {
        titre: "Les Fugitifs Solidaires",
        metaphore: "L’union fait la force même derrière les barreaux.",
        objectif: "Trouver des inconnus prêts à courir.",
        defi: "Prenez une photo avec des inconnus en position de départ de course.",
        gps: "47.488900,-0.588800"
      },
      {
        titre: "Évasion Collective",
        metaphore: "Une évasion réussie se prépare à plusieurs.",
        objectif: "Créer une chaîne humaine avec des passants.",
        defi: "Prenez une photo avec [nbPersonnes] personnes se tenant la main.",
        gps: "47.489900,-0.589800"
      },
      {
        titre: "Le Garde et le Prisonnier",
        metaphore: "Les rôles s’inversent parfois dans une photo.",
        objectif: "Photographiez-vous avec un inconnu mimant un gardien.",
        defi: "Un inconnu fait le regard sévère, l’équipe feint la peur.",
        gps: "47.490900,-0.590800"
      },
      {
        titre: "Sourires derrière les Barreaux",
        metaphore: "Même en prison, un sourire franchit toutes les grilles.",
        objectif: "Photographier des inconnus affichant leur plus beau sourire.",
        defi: "Prenez une photo avec deux passants souriants.",
        gps: "47.491900,-0.591800"
      }
    ],
    sorcier: [
      {
        titre: "Le Conseil des Sorciers",
        metaphore: "Une magie nouvelle naît de la diversité.",
        objectif: "Composer une assemblée magique.",
        defi: "Prenez une photo avec [nbPersonnes] personnes tenant une baguette imaginaire.",
        gps: "47.492900,-0.592800"
      },
      {
        titre: "La Potion Collective",
        metaphore: "Les meilleures potions se partagent.",
        objectif: "Trouver des inconnus prêts à mimer la préparation d’une potion.",
        defi: "Prenez une photo de groupe en pleine concoction imaginaire.",
        gps: "47.493900,-0.593800"
      },
      {
        titre: "Le Sabbat Improbable",
        metaphore: "Même les moldus peuvent participer au sabbat.",
        objectif: "Trouver des inconnus acceptant de faire le signe magique.",
        defi: "Prenez une photo avec des inconnus faisant le geste du sort.",
        gps: "47.494900,-0.594800"
      },
      {
        titre: "Le Rassemblement des Enchanteurs",
        metaphore: "Chaque sourire peut cacher un pouvoir.",
        objectif: "Photographier des inconnus qui acceptent de se faire appeler Merlin.",
        defi: "Prenez une photo de groupe avec au moins un inconnu 'Merlin'.",
        gps: "47.495900,-0.595800"
      },
      {
        titre: "L’École des Apprentis",
        metaphore: "Chaque rencontre est une leçon.",
        objectif: "Assembler des inconnus pour une photo de classe improvisée.",
        defi: "Prenez une photo de groupe avec la pose la plus sérieuse possible.",
        gps: "47.496900,-0.596800"
      }
    ],
    super_heros: [
      {
        titre: "La Ligue des Justiciers",
        metaphore: "Chaque héros a besoin d’alliés.",
        objectif: "Trouver des inconnus prêts à faire le signe de super-héros.",
        defi: "Prenez une photo de groupe avec les bras croisés façon justicier.",
        gps: "47.497900,-0.597800"
      },
      {
        titre: "La Recrue Mystère",
        metaphore: "Le prochain héros se cache peut-être parmi la foule.",
        objectif: "Inviter un inconnu à rejoindre l’équipe pour la photo.",
        defi: "Prenez une photo avec un passant imitant un pouvoir imaginaire.",
        gps: "47.498900,-0.598800"
      },
      {
        titre: "Le Selfie de la Victoire",
        metaphore: "Une victoire partagée est deux fois plus belle.",
        objectif: "Faire un selfie de groupe avec des inconnus levants les poings.",
        defi: "Levez tous les poings au ciel pour la photo.",
        gps: "47.499900,-0.599800"
      },
      {
        titre: "La Pause Camouflage",
        metaphore: "Un vrai héros sait se fondre dans la foule.",
        objectif: "Se cacher parmi les passants et faire une photo collective.",
        defi: "Prenez une photo où l’équipe est difficile à repérer.",
        gps: "47.500900,-0.600800"
      },
      {
        titre: "Le Signal Héroïque",
        metaphore: "Un appel au secours rassemble toujours des héros.",
        objectif: "Faire le signal de détresse avec des inconnus.",
        defi: "Prenez une photo de groupe mimant un appel à l’aide.",
        gps: "47.501900,-0.601800"
      }
    ],
    zombie: [
      {
        titre: "Le Clan des Survivants",
        metaphore: "L’union fait la survie.",
        objectif: "Trouver d’autres survivants du parc.",
        defi: "Prenez une photo de groupe avec des inconnus mimant la peur.",
        gps: "47.502900,-0.602800"
      },
      {
        titre: "Les Alliés Inespérés",
        metaphore: "Dans la nuit, chaque visage peut sauver.",
        objectif: "Photographier des inconnus grimés ou effrayés.",
        defi: "Prenez une photo de groupe avec le maquillage le plus effrayant.",
        gps: "47.503900,-0.603800"
      },
      {
        titre: "Le Festin du Zombie",
        metaphore: "Un vrai zombie ne dîne jamais seul.",
        objectif: "Trouver des inconnus prêts à jouer les zombies.",
        defi: "Prenez une photo avec des passants imitant la marche des zombies.",
        gps: "47.504900,-0.604800"
      },
      {
        titre: "Le Refuge Commun",
        metaphore: "Un abri n’est sûr que s’il est partagé.",
        objectif: "Faire entrer des inconnus dans la photo d’abri.",
        defi: "Prenez une photo avec des inconnus cachés dans la cabane.",
        gps: "47.505900,-0.605800"
      },
      {
        titre: "Le Cri de la Horde",
        metaphore: "Plus on crie fort, plus on fait peur aux morts.",
        objectif: "Faire pousser un cri collectif.",
        defi: "Prenez une photo pile au moment du cri.",
        gps: "47.506900,-0.606800"
      }
    ],
    archeologue: [
      {
        titre: "Les Découvreurs du Jour",
        metaphore: "À plusieurs, on déterre mieux les secrets.",
        objectif: "Prendre une photo de groupe avec des inconnus autour d’une trouvaille.",
        defi: "Tous pointent l’objet de la découverte.",
        gps: "47.507900,-0.607800"
      },
      {
        titre: "La Transmission du Savoir",
        metaphore: "Le passé s’apprend en écoutant les autres.",
        objectif: "Photographier des inconnus expliquant leur objet favori.",
        defi: "Prenez une photo de groupe avec chacun tenant un objet.",
        gps: "47.508900,-0.608800"
      },
      {
        titre: "Le Savoir-Partagé",
        metaphore: "Chaque main aide à creuser plus profond.",
        objectif: "Faire une chaîne humaine de chercheurs.",
        defi: "Prenez une photo de groupe se tenant la main autour d’un objet.",
        gps: "47.509900,-0.609800"
      },
      {
        titre: "La Photo du Savant Fou",
        metaphore: "Un peu de folie fait parfois avancer la science.",
        objectif: "Chercher des inconnus prêts à faire la grimace du savant fou.",
        defi: "Prenez une photo de groupe grimaçant au maximum.",
        gps: "47.510900,-0.610800"
      },
      {
        titre: "L’Équipe des Découvreurs",
        metaphore: "La gloire est plus grande à plusieurs.",
        objectif: "Faire participer des inconnus à la découverte.",
        defi: "Prenez une photo de groupe avec deux visiteurs différents sur le site.",
        gps: "47.511900,-0.611800"
      }
     ] 
  }
,


    

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
  preview: "objet",
  scenarios: {
    arthurien: [
      {
        titre: "L'Herbier de Merlin",
        metaphore: "La magie commence par la cueillette des simples.",
        objectif: "Ramasser trois plantes différentes pour l'élixir du magicien.",
        defi: "Rapportez trois feuilles ou fleurs variées trouvées dans le parc.",
        gps: "47.478100,-0.580100"
      },
      {
        titre: "La Pierre du Destin",
        metaphore: "Sous la pierre la plus banale se cache parfois le pouvoir.",
        objectif: "Trouver la pierre la plus originale du parcours.",
        defi: "Ramenez la pierre ayant une forme ou une couleur particulière.",
        gps: "47.478800,-0.580800"
      },
      {
        titre: "La Plume du Phénix",
        metaphore: "Un oiseau sacré laisse parfois derrière lui un indice.",
        objectif: "Trouver une plume pour compléter la collection de Merlin.",
        defi: "Rapportez une plume ramassée dans le parc.",
        gps: "47.479500,-0.581500"
      },
      {
        titre: "L’Écorce du Chêne",
        metaphore: "La force du roi réside dans les racines profondes.",
        objectif: "Ramener un morceau d’écorce pour la potion de force.",
        defi: "Cherchez et rapportez un morceau d’écorce de chêne ou d’un autre arbre.",
        gps: "47.480200,-0.582200"
      },
      {
        titre: "Les Fruits de l’Aventure",
        metaphore: "Le voyageur avisé ne repart jamais les mains vides.",
        objectif: "Trouver un fruit tombé ou une graine rare.",
        defi: "Ramenez un fruit ou une graine trouvée lors de votre quête.",
        gps: "47.480900,-0.582900"
      }
    ],
    pirate: [
      {
        titre: "Le Butin du Rivage",
        metaphore: "Le vrai trésor vient parfois de la plage.",
        objectif: "Ramener un coquillage ou une pierre polie.",
        defi: "Rapportez un objet que la mer aurait pu déposer.",
        gps: "47.481600,-0.583600"
      },
      {
        titre: "L’Œuf du Perroquet",
        metaphore: "Le compagnon du capitaine n’a pas tout livré.",
        objectif: "Trouver un objet rond et coloré pour le perroquet.",
        defi: "Rapportez un objet sphérique, coloré ou brillant.",
        gps: "47.482300,-0.584300"
      },
      {
        titre: "Le Morceau de Voile",
        metaphore: "Un pirate malin garde toujours un bout de voile sur lui.",
        objectif: "Trouver un morceau de tissu flottant ou tombé.",
        defi: "Ramenez un morceau de tissu trouvé sur votre route.",
        gps: "47.483000,-0.585000"
      },
      {
        titre: "La Clef du Coffre",
        metaphore: "Sans clef, pas de trésor !",
        objectif: "Trouver un objet en métal pouvant servir de clef.",
        defi: "Rapportez un objet métallique ressemblant à une clef.",
        gps: "47.483700,-0.585700"
      },
      {
        titre: "Le Filet du Marin",
        metaphore: "Le filet ramène parfois plus qu’on ne croit.",
        objectif: "Trouver un morceau de ficelle, corde ou filet.",
        defi: "Ramenez un morceau de ficelle ou de corde trouvé sur le site.",
        gps: "47.484400,-0.586400"
      }
    ],
    prison: [
      {
        titre: "La Paille du Matelas",
        metaphore: "La fuite se prépare avec les moyens du bord.",
        objectif: "Trouver un brin de paille ou d’herbe pour le grand escape.",
        defi: "Rapportez un brin de paille ou d’herbe long.",
        gps: "47.485100,-0.587100"
      },
      {
        titre: "L’Outil de la Cavale",
        metaphore: "Un bon outil peut ouvrir toutes les portes.",
        objectif: "Trouver un objet rigide pour tenter une évasion.",
        defi: "Ramenez un bâton ou un objet solide trouvé sur place.",
        gps: "47.485800,-0.587800"
      },
      {
        titre: "Le Caillou de la Révolte",
        metaphore: "Même une petite pierre peut renverser un mur.",
        objectif: "Chercher un caillou plat pour faire diversion.",
        defi: "Ramenez un caillou plat ou de forme spéciale.",
        gps: "47.486500,-0.588500"
      },
      {
        titre: "Le Message Caché",
        metaphore: "Un bout de papier peut tout changer.",
        objectif: "Trouver un morceau de papier pour écrire un message.",
        defi: "Rapportez un morceau de papier ou carton trouvé sur le chemin.",
        gps: "47.487200,-0.589200"
      },
      {
        titre: "La Clé du Gardien",
        metaphore: "La clef se cache parfois dans la nature.",
        objectif: "Trouver un objet métallique ou brillant.",
        defi: "Ramenez un objet en métal ou qui brille.",
        gps: "47.487900,-0.589900"
      }
    ],
    sorcier: [
      {
        titre: "L’Ingrédient Secret",
        metaphore: "La potion la plus puissante se fait d’un rien.",
        objectif: "Trouver un ingrédient insolite pour une potion magique.",
        defi: "Rapportez un objet naturel d’aspect étrange.",
        gps: "47.488600,-0.590600"
      },
      {
        titre: "La Graine du Savoir",
        metaphore: "Chaque graine contient une magie à révéler.",
        objectif: "Trouver une graine ou un noyau original.",
        defi: "Ramenez une graine trouvée dans le parc.",
        gps: "47.489300,-0.591300"
      },
      {
        titre: "La Racine d’Envoûtement",
        metaphore: "Sous terre, la magie s’accumule.",
        objectif: "Trouver une racine ou un petit morceau de bois.",
        defi: "Rapportez une racine ou une branche tordue.",
        gps: "47.490000,-0.592000"
      },
      {
        titre: "Le Cristal du Destin",
        metaphore: "Un éclat de lumière peut changer le futur.",
        objectif: "Trouver un caillou translucide ou coloré.",
        defi: "Ramenez un caillou ou morceau de verre coloré trouvé à terre.",
        gps: "47.490700,-0.592700"
      },
      {
        titre: "La Fleur de Lune",
        metaphore: "La nuit porte conseil à qui sait écouter les fleurs.",
        objectif: "Trouver une fleur blanche ou très claire.",
        defi: "Ramenez une fleur blanche trouvée sur le chemin.",
        gps: "47.491400,-0.593400"
      }
    ],
    super_heros: [
      {
        titre: "L’Objet Mystérieux",
        metaphore: "Un super-héros sait reconnaître un artefact unique.",
        objectif: "Trouver un objet brillant ou coloré.",
        defi: "Ramenez un objet insolite déniché dans le parc.",
        gps: "47.492100,-0.594100"
      },
      {
        titre: "Le Bouclier d’Urgence",
        metaphore: "Un rien peut devenir un puissant bouclier.",
        objectif: "Trouver un objet rond ou plat.",
        defi: "Rapportez un objet pouvant servir de bouclier improvisé.",
        gps: "47.492800,-0.594800"
      },
      {
        titre: "La Pierre d’Énergie",
        metaphore: "L’énergie se trouve là où on la cherche le moins.",
        objectif: "Ramener une pierre colorée ou lumineuse.",
        defi: "Rapportez une pierre d’une couleur vive.",
        gps: "47.493500,-0.595500"
      },
      {
        titre: "La Corde de Sauvetage",
        metaphore: "Une corde suffit parfois à sauver le monde.",
        objectif: "Trouver un morceau de ficelle ou de corde.",
        defi: "Rapportez un morceau de ficelle trouvé sur le terrain.",
        gps: "47.494200,-0.596200"
      },
      {
        titre: "Le Badge du Héros",
        metaphore: "Tout héros arbore fièrement son insigne.",
        objectif: "Trouver un objet avec un logo ou un symbole.",
        defi: "Rapportez un objet comportant un dessin ou un symbole.",
        gps: "47.494900,-0.596900"
      }
    ],
    zombie: [
      {
        titre: "L’Antidote de Fortune",
        metaphore: "Chaque objet peut servir à survivre.",
        objectif: "Ramener un objet qui pourrait sauver la vie.",
        defi: "Rapportez un objet qui pourrait servir de remède ou d’arme.",
        gps: "47.495600,-0.597600"
      },
      {
        titre: "Le Repas du Survivant",
        metaphore: "Un vrai survivant sait reconnaître ce qui se mange.",
        objectif: "Ramener un fruit ou une plante comestible.",
        defi: "Rapportez un fruit ou une baie trouvée sans danger.",
        gps: "47.496300,-0.598300"
      },
      {
        titre: "Le Talisman Anti-Zombie",
        metaphore: "Il faut toujours un grigri pour repousser le mal.",
        objectif: "Trouver un objet de forme étrange.",
        defi: "Ramenez un objet insolite qui pourrait servir de talisman.",
        gps: "47.497000,-0.599000"
      },
      {
        titre: "Le Message d’Espoir",
        metaphore: "Un message peut tout changer.",
        objectif: "Trouver un morceau de papier ou écrire un mot d’encouragement.",
        defi: "Rapportez un papier avec un mot positif dessus.",
        gps: "47.497700,-0.599700"
      },
      {
        titre: "La Cachette Portable",
        metaphore: "Il vaut mieux avoir de quoi se cacher en cas de danger.",
        objectif: "Trouver un objet qui aide à se camoufler.",
        defi: "Rapportez un objet qui pourrait servir à se cacher (feuille, écharpe, etc.).",
        gps: "47.498400,-0.600400"
      }
    ],
    archeologue: [
      {
        titre: "La Relique du Site",
        metaphore: "Le passé n’attend qu’à être déterré.",
        objectif: "Trouver un objet ancien ou insolite.",
        defi: "Rapportez un objet qui semble venir d’une autre époque.",
        gps: "47.499100,-0.601100"
      },
      {
        titre: "Le Fragment de Pot",
        metaphore: "Un tesson raconte toute une histoire.",
        objectif: "Trouver un morceau de poterie ou de brique.",
        defi: "Rapportez un fragment de poterie trouvé sur le terrain.",
        gps: "47.499800,-0.601800"
      },
      {
        titre: "La Perle du Sable",
        metaphore: "Petite, elle attire l’œil du chercheur attentif.",
        objectif: "Trouver une bille, une perle ou un objet rond.",
        defi: "Rapportez une petite bille ou perle trouvée dans le sable.",
        gps: "47.500500,-0.602500"
      },
      {
        titre: "Le Bois Fossile",
        metaphore: "Le bois garde mémoire du temps.",
        objectif: "Trouver un morceau de bois très vieux ou étrange.",
        defi: "Rapportez un morceau de bois original.",
        gps: "47.501200,-0.603200"
      },
      {
        titre: "Le Trésor du Chercheur",
        metaphore: "La valeur d’un objet tient parfois à son histoire.",
        objectif: "Ramener un objet et expliquer pourquoi il est précieux.",
        defi: "Rapportez l’objet trouvé et racontez son histoire.",
        gps: "47.501900,-0.603900"
      }
     ] 
  }
,


    

  // === AUDIO ===
  {
  id: "audio",
  nom: "Enregistrement audio",
  description: "Capturer un son, un message, une chanson, un cri de guerre, une imitation, etc.",
  parametres: [
    { key: "consigne", type: "text", label: "Consigne audio", placeholder: "ex : imite le cri du hibou" }
  ],
  combinable: ["chrono"],
  preview: "audio",
  scenarios: {
    arthurien: [
      {
        titre: "Le Chant des Chevaliers",
        metaphore: "Le Graal écoute ceux qui chantent vrai.",
        objectif: "Chanter un hymne de Camelot.",
        defi: "Envoyez un enregistrement de votre équipe chantant un chant médiéval ou inventé.",
        gps: "47.478000,-0.580000"
      },
      {
        titre: "L’Appel de Merlin",
        metaphore: "Un simple mot peut ouvrir la voie de la magie.",
        objectif: "Imiter l’appel de Merlin pour convoquer les esprits.",
        defi: "Enregistrez un cri ou une incantation collective.",
        gps: "47.478800,-0.580800"
      },
      {
        titre: "Le Rire du Roi",
        metaphore: "Le rire chasse les ténèbres.",
        objectif: "Faire résonner le rire d’Arthur dans le royaume.",
        defi: "Envoyez un enregistrement du rire le plus communicatif de l’équipe.",
        gps: "47.479500,-0.581500"
      },
      {
        titre: "La Prophétie",
        metaphore: "La voix du futur résonne dans le vent.",
        objectif: "Inventer et déclamer une prophétie.",
        defi: "Enregistrez une prophétie solennelle sur la réussite de votre quête.",
        gps: "47.480200,-0.582200"
      },
      {
        titre: "Cri de Guerre",
        metaphore: "Avant l’assaut, le cri galvanise les troupes.",
        objectif: "Unir l’équipe autour d’un cri de guerre.",
        defi: "Enregistrez le cri de guerre collectif le plus puissant.",
        gps: "47.480900,-0.582900"
      }
    ],
    pirate: [
      {
        titre: "Chant de la Mer",
        metaphore: "Les vagues résonnent au son des chants marins.",
        objectif: "Entonner un chant de pirate traditionnel.",
        defi: "Enregistrez votre équipe chantant un air de marin ou inventé.",
        gps: "47.481600,-0.583600"
      },
      {
        titre: "Le Rire du Capitaine",
        metaphore: "Un bon capitaine fait trembler ses ennemis d’un rire sonore.",
        objectif: "Faire le rire le plus impressionnant du groupe.",
        defi: "Enregistrez le rire de pirate le plus tonitruant.",
        gps: "47.482300,-0.584300"
      },
      {
        titre: "Message Codé",
        metaphore: "Un message secret circule entre les matelots.",
        objectif: "Inventer une phrase codée.",
        defi: "Enregistrez une phrase mystérieuse à faire deviner aux autres équipes.",
        gps: "47.483000,-0.585000"
      },
      {
        titre: "L’Appel du Large",
        metaphore: "Quand la mer appelle, tout l’équipage répond.",
        objectif: "Imiter un cri d’appel à l’abordage.",
        defi: "Enregistrez un cri collectif façon pirate.",
        gps: "47.483700,-0.585700"
      },
      {
        titre: "Sifflet du Quartier-Maître",
        metaphore: "Un sifflet, et toute la cale s’agite.",
        objectif: "Siffler ou imiter le bruit du vent en mer.",
        defi: "Enregistrez un sifflet ou bruit de vent collectif.",
        gps: "47.484400,-0.586400"
      }
    ],
    prison: [
      {
        titre: "Chanson de la Liberté",
        metaphore: "Même derrière les barreaux, la voix porte loin.",
        objectif: "Inventer un chant sur la liberté.",
        defi: "Enregistrez votre équipe chantant une chanson sur l’évasion.",
        gps: "47.485100,-0.587100"
      },
      {
        titre: "Message aux Alliés",
        metaphore: "Une voix peut traverser les murs.",
        objectif: "Envoyer un message codé à un complice.",
        defi: "Enregistrez un message codé destiné à une autre équipe.",
        gps: "47.485800,-0.587800"
      },
      {
        titre: "Alarme du Gardien",
        metaphore: "Un cri peut déclencher l’alerte.",
        objectif: "Imiter une sirène ou un bruit d’alarme.",
        defi: "Enregistrez la meilleure imitation d’alarme de prison.",
        gps: "47.486500,-0.588500"
      },
      {
        titre: "Le Chuchotement Secret",
        metaphore: "Certains secrets ne s’échangent qu’à voix basse.",
        objectif: "Inventer et enregistrer un code chuchoté.",
        defi: "Enregistrez votre équipe murmurant un mot-code.",
        gps: "47.487200,-0.589200"
      },
      {
        titre: "Le Rire de la Libération",
        metaphore: "Un rire peut briser toutes les chaînes.",
        objectif: "Faire le plus grand éclat de rire collectif.",
        defi: "Enregistrez le rire collectif le plus joyeux.",
        gps: "47.487900,-0.589900"
      }
    ],
    sorcier: [
      {
        titre: "Incantation Magique",
        metaphore: "Les mots ont le pouvoir de changer le réel.",
        objectif: "Inventer une formule magique.",
        defi: "Enregistrez une incantation originale à voix grave.",
        gps: "47.488600,-0.590600"
      },
      {
        titre: "Cri du Banshee",
        metaphore: "Certaines créatures se manifestent par leur cri.",
        objectif: "Imiter le cri d’une créature magique.",
        defi: "Enregistrez le cri le plus étrange de l’équipe.",
        gps: "47.489300,-0.591300"
      },
      {
        titre: "Mot de Passe Secret",
        metaphore: "Un mot chuchoté peut ouvrir toutes les portes.",
        objectif: "Inventer un mot de passe magique.",
        defi: "Enregistrez le mot de passe à voix basse.",
        gps: "47.490000,-0.592000"
      },
      {
        titre: "Chant des Apprentis",
        metaphore: "On apprend la magie en chantant.",
        objectif: "Créer et chanter l’hymne des apprentis sorciers.",
        defi: "Enregistrez votre équipe chantant un air magique.",
        gps: "47.490700,-0.592700"
      },
      {
        titre: "Le Conseil du Mage",
        metaphore: "Les conseils les plus sages sont parfois murmurés.",
        objectif: "Enregistrer une maxime ou un conseil magique.",
        defi: "Enregistrez un conseil imaginaire à donner à Merlin.",
        gps: "47.491400,-0.593400"
      }
    ],
    super_heros: [
      {
        titre: "Le Cri de la Victoire",
        metaphore: "Chaque héros célèbre ses victoires à sa façon.",
        objectif: "Inventer un cri de victoire collectif.",
        defi: "Enregistrez le cri de victoire de l’équipe.",
        gps: "47.492100,-0.594100"
      },
      {
        titre: "L’Appel à l’Aide",
        metaphore: "Un cri peut sauver des vies.",
        objectif: "Simuler un appel à l’aide.",
        defi: "Enregistrez l’appel à l’aide le plus convaincant.",
        gps: "47.492800,-0.594800"
      },
      {
        titre: "Message du QG",
        metaphore: "Le QG communique toujours par messages secrets.",
        objectif: "Inventer un message codé à destination du QG.",
        defi: "Enregistrez le message secret le plus mystérieux.",
        gps: "47.493500,-0.595500"
      },
      {
        titre: "Signal Sonore",
        metaphore: "Un son peut déclencher la mission.",
        objectif: "Imiter un bruit ou un signal de super-héros.",
        defi: "Enregistrez un bruitage inventé (sirène, laser, etc.).",
        gps: "47.494200,-0.596200"
      },
      {
        titre: "Slogan de la Justice",
        metaphore: "Un héros a toujours une devise.",
        objectif: "Créer et enregistrer le slogan de l’équipe.",
        defi: "Enregistrez votre slogan héroïque à l’unisson.",
        gps: "47.494900,-0.596900"
      }
    ],
    zombie: [
      {
        titre: "Cri du Survivant",
        metaphore: "Un cri peut sauver ou condamner.",
        objectif: "Imiter un cri de détresse ou d’alerte.",
        defi: "Enregistrez le cri le plus fort de l’équipe.",
        gps: "47.495600,-0.597600"
      },
      {
        titre: "Gémissement de Zombie",
        metaphore: "Un bon survivant sait imiter ses ennemis.",
        objectif: "Imiter le gémissement d’un zombie.",
        defi: "Enregistrez un bruitage de zombie effrayant.",
        gps: "47.496300,-0.598300"
      },
      {
        titre: "Message de la Résistance",
        metaphore: "La résistance s’organise dans l’ombre.",
        objectif: "Inventer un message d’espoir à transmettre.",
        defi: "Enregistrez un message vocal destiné aux autres survivants.",
        gps: "47.497000,-0.599000"
      },
      {
        titre: "Le Dernier Chant",
        metaphore: "On chante parfois pour oublier la peur.",
        objectif: "Entonner un chant de survivants.",
        defi: "Enregistrez le chant le plus émouvant ou drôle.",
        gps: "47.497700,-0.599700"
      },
      {
        titre: "Sifflet d’Alerte",
        metaphore: "Un sifflet peut avertir de l’arrivée de la horde.",
        objectif: "Imiter un sifflet d’alerte.",
        defi: "Enregistrez le meilleur sifflement de l’équipe.",
        gps: "47.498400,-0.600400"
      }
    ],
    archeologue: [
      {
        titre: "Histoire du Passé",
        metaphore: "Les objets racontent des histoires à qui sait écouter.",
        objectif: "Inventer l’histoire d’un objet trouvé.",
        defi: "Enregistrez un membre racontant l’histoire de la découverte.",
        gps: "47.499100,-0.601100"
      },
      {
        titre: "Chant des Chercheurs",
        metaphore: "Les chercheurs chantent parfois pour se donner du courage.",
        objectif: "Inventer un chant d’exploration.",
        defi: "Enregistrez l’équipe chantant son hymne d’archéologues.",
        gps: "47.499800,-0.601800"
      },
      {
        titre: "Message à la Postérité",
        metaphore: "Un message bien conservé traverse les siècles.",
        objectif: "Créer un message à destination des générations futures.",
        defi: "Enregistrez un message vocal à transmettre au futur.",
        gps: "47.500500,-0.602500"
      },
      {
        titre: "Découverte Insolite",
        metaphore: "Une trouvaille étonnante mérite un commentaire.",
        objectif: "Décrire une découverte avec enthousiasme.",
        defi: "Enregistrez une réaction sonore à la découverte la plus étrange.",
        gps: "47.501200,-0.603200"
      },
      {
        titre: "L’Appel de la Forêt",
        metaphore: "La nature aussi a sa voix…",
        objectif: "Imiter le cri d’un animal ou d’un oiseau.",
        defi: "Enregistrez une imitation collective d’un animal.",
        gps: "47.501900,-0.603900"
      }
     ] 
  }
,


    
  // === GPS (1 ou plusieurs points) ===
 {
  id: "gps",
  nom: "Déplacement GPS",
  description: "Se rendre à un ou plusieurs points précis sur la carte. La position doit être validée.",
  parametres: [
    { key: "points", type: "list_gps", label: "Liste des points GPS (lat, lon, nom)", min: 1 }
  ],
  combinable: ["photo", "audio", "chrono", "mot_de_passe"],
  preview: "gps",
  scenarios: {
    arthurien: [
      {
        titre: "Le Sentier d'Avalon",
        metaphore: "La magie ne guide que les pas décidés.",
        objectif: "Atteindre le point mystique d’Avalon.",
        defi: "Validez votre position GPS à l’endroit précis indiqué sur la carte.",
        gps: "47.477100,-0.579300"
      },
      {
        titre: "La Clairière des Druides",
        metaphore: "C’est au cœur de la forêt que naissent les légendes.",
        objectif: "Trouver la clairière secrète.",
        defi: "Rendez-vous au point GPS transmis par Merlin.",
        gps: "47.478500,-0.580500"
      },
      {
        titre: "La Fontaine Enchantée",
        metaphore: "Celui qui trouve la source trouve la sagesse.",
        objectif: "Atteindre la fontaine cachée.",
        defi: "Validez votre présence à la fontaine grâce au GPS.",
        gps: "47.479800,-0.581800"
      },
      {
        titre: "Le Pont du Destin",
        metaphore: "Il faut traverser pour avancer dans la légende.",
        objectif: "Franchir le pont indiqué sur la carte.",
        defi: "Activez le GPS sur le pont pour débloquer l’énigme suivante.",
        gps: "47.480900,-0.582900"
      },
      {
        titre: "Le Chêne Séculaire",
        metaphore: "Les racines du passé guident l’avenir.",
        objectif: "Retrouver l’arbre le plus ancien du domaine.",
        defi: "Validez votre passage devant le grand chêne en activant le GPS.",
        gps: "47.481700,-0.583700"
      }
    ],
    pirate: [
      {
        titre: "La Plage aux Trésors",
        metaphore: "Un vrai pirate sait lire une carte et suivre la boussole.",
        objectif: "Atteindre la plage secrète où dort le trésor.",
        defi: "Activez le GPS sur la plage pour valider la trouvaille.",
        gps: "47.482300,-0.584300"
      },
      {
        titre: "Le Rocher du Capitaine",
        metaphore: "Le capitaine vous attend au sommet.",
        objectif: "Gravir le rocher repéré sur la carte.",
        defi: "Validez votre position GPS au sommet du rocher.",
        gps: "47.483100,-0.585100"
      },
      {
        titre: "L’Anse aux Corsaires",
        metaphore: "Les corsaires se rassemblent là où la mer se retire.",
        objectif: "Trouver l’anse secrète.",
        defi: "Rendez-vous au point GPS indiqué sur la carte au trésor.",
        gps: "47.484000,-0.586000"
      },
      {
        titre: "La Grotte Oubliée",
        metaphore: "Dans l’ombre, les secrets dorment.",
        objectif: "Découvrir l’entrée de la grotte cachée.",
        defi: "Activez le GPS devant la grotte pour débloquer l’énigme.",
        gps: "47.484900,-0.586900"
      },
      {
        titre: "Le Quai des Marins",
        metaphore: "Tout équipage se rassemble avant de lever l’ancre.",
        objectif: "Rejoindre le quai du port.",
        defi: "Validez votre présence au quai grâce au GPS.",
        gps: "47.485800,-0.587800"
      }
    ],
    prison: [
      {
        titre: "La Cour de la Liberté",
        metaphore: "La première étape de la fuite est toujours la cour.",
        objectif: "Atteindre la cour centrale sans se faire repérer.",
        defi: "Validez votre position GPS dans la cour.",
        gps: "47.486700,-0.588700"
      },
      {
        titre: "Le Tunnel Secret",
        metaphore: "La liberté s’atteint par des chemins cachés.",
        objectif: "Trouver l’entrée du tunnel d’évasion.",
        defi: "Activez le GPS à proximité de l’entrée secrète.",
        gps: "47.487600,-0.589600"
      },
      {
        titre: "La Tour du Gardien",
        metaphore: "Un œil vigilant surveille toujours les prisonniers.",
        objectif: "Rejoindre la tour sans être vu.",
        defi: "Validez votre passage devant la tour grâce au GPS.",
        gps: "47.488500,-0.590500"
      },
      {
        titre: "La Grille Oubliée",
        metaphore: "Il suffit parfois d’un passage dérobé.",
        objectif: "Atteindre la grille à l’arrière du bâtiment.",
        defi: "Activez le GPS devant la grille pour progresser.",
        gps: "47.489400,-0.591400"
      },
      {
        titre: "Le Point de Ralliement",
        metaphore: "Un bon plan d’évasion se termine toujours par un point de chute.",
        objectif: "Trouver le point de rendez-vous final.",
        defi: "Validez votre présence au point GPS final.",
        gps: "47.490300,-0.592300"
      }
    ],
    sorcier: [
      {
        titre: "Le Cercle d'Invocation",
        metaphore: "Les puissances magiques n’agissent que là où les cercles sont tracés.",
        objectif: "Trouver et rejoindre le cercle magique.",
        defi: "Activez le GPS au centre du cercle.",
        gps: "47.491200,-0.593200"
      },
      {
        titre: "Le Laboratoire Caché",
        metaphore: "Chaque sorcier a besoin de son antre secret.",
        objectif: "Atteindre le laboratoire dissimulé.",
        defi: "Validez votre position GPS dans le laboratoire.",
        gps: "47.492100,-0.594100"
      },
      {
        titre: "La Bibliothèque Interdite",
        metaphore: "Les plus grands secrets dorment sur les rayons oubliés.",
        objectif: "Trouver la bibliothèque secrète.",
        defi: "Activez le GPS dans la bibliothèque pour débloquer le grimoire.",
        gps: "47.493000,-0.595000"
      },
      {
        titre: "Le Pont des Illusions",
        metaphore: "La magie crée des ponts là où il n’y a que des abysses.",
        objectif: "Traverser le pont magique.",
        defi: "Validez votre passage sur le pont avec le GPS.",
        gps: "47.493900,-0.595900"
      },
      {
        titre: "L’Arbre des Sortilèges",
        metaphore: "Sous chaque feuille, un secret.",
        objectif: "Trouver l’arbre magique du domaine.",
        defi: "Activez le GPS à l’arbre pour révéler l’énigme suivante.",
        gps: "47.494800,-0.596800"
      }
    ],
    super_heros: [
      {
        titre: "QG d’Urgence",
        metaphore: "Chaque héros répond à l’appel du QG.",
        objectif: "Se rendre au QG pour recevoir la mission.",
        defi: "Validez votre présence au QG grâce au GPS.",
        gps: "47.495700,-0.597700"
      },
      {
        titre: "Toit de la Ville",
        metaphore: "Un héros surveille toujours la ville de haut.",
        objectif: "Atteindre le point le plus élevé.",
        defi: "Activez le GPS sur le toit ou la butte du parc.",
        gps: "47.496600,-0.598600"
      },
      {
        titre: "Le Lieu de l’Incident",
        metaphore: "C’est là que tout a commencé.",
        objectif: "Rejoindre le lieu d’un incident fictif.",
        defi: "Validez votre position GPS sur la scène.",
        gps: "47.497500,-0.599500"
      },
      {
        titre: "La Base Secrète",
        metaphore: "Seuls les héros connaissent le chemin.",
        objectif: "Trouver la base secrète.",
        defi: "Activez le GPS à l’emplacement caché.",
        gps: "47.498400,-0.600400"
      },
      {
        titre: "Le Parcours de Sauvetage",
        metaphore: "Il faut parfois traverser toute la ville pour sauver une vie.",
        objectif: "Parcourir plusieurs points GPS en un temps limité.",
        defi: "Validez chaque étape sur la carte.",
        gps: "47.499300,-0.601300"
      }
    ],
    zombie: [
      {
        titre: "Le Refuge",
        metaphore: "Pour survivre, il faut trouver un abri sûr.",
        objectif: "Atteindre le refuge indiqué sur la carte.",
        defi: "Activez le GPS à l’entrée du refuge.",
        gps: "47.500200,-0.602200"
      },
      {
        titre: "Zone de Fouille",
        metaphore: "Chaque recoin peut cacher un précieux indice.",
        objectif: "Explorer une zone précise.",
        defi: "Validez votre passage dans la zone grâce au GPS.",
        gps: "47.501100,-0.603100"
      },
      {
        titre: "Point de Ravitaillement",
        metaphore: "Le ravitaillement assure la survie.",
        objectif: "Atteindre le point de ravitaillement.",
        defi: "Activez le GPS sur le lieu pour débloquer la suite.",
        gps: "47.502000,-0.604000"
      },
      {
        titre: "Le Campement Abandonné",
        metaphore: "Ce que d’autres ont laissé peut vous sauver.",
        objectif: "Découvrir un ancien campement.",
        defi: "Validez votre position GPS au campement.",
        gps: "47.502900,-0.604900"
      },
      {
        titre: "Dernière Chance",
        metaphore: "La sortie n’est peut-être pas aussi loin qu’il n’y paraît.",
        objectif: "Atteindre la sortie du périmètre en urgence.",
        defi: "Activez le GPS à la sortie pour terminer la mission.",
        gps: "47.503800,-0.605800"
      }
    ],
    archeologue: [
      {
        titre: "Site de Fouille",
        metaphore: "C’est là que commence toute découverte.",
        objectif: "Rejoindre le site de fouille principal.",
        defi: "Validez votre arrivée sur le site via le GPS.",
        gps: "47.504700,-0.606700"
      },
      {
        titre: "La Pierre Gravée",
        metaphore: "Les pierres racontent leur histoire à qui sait les écouter.",
        objectif: "Trouver la pierre gravée signalée sur la carte.",
        defi: "Activez le GPS devant la pierre.",
        gps: "47.505600,-0.607600"
      },
      {
        titre: "Vestige Caché",
        metaphore: "Certains vestiges ne se révèlent qu’aux plus attentifs.",
        objectif: "Découvrir l’emplacement secret d’un artefact.",
        defi: "Validez votre passage devant le vestige grâce au GPS.",
        gps: "47.506500,-0.608500"
      },
      {
        titre: "La Salle du Trésor",
        metaphore: "La recherche aboutit toujours à un trésor.",
        objectif: "Atteindre l’emplacement final du trésor.",
        defi: "Activez le GPS à la salle du trésor pour débloquer la victoire.",
        gps: "47.507400,-0.609400"
      },
      {
        titre: "Le Chemin des Explorateurs",
        metaphore: "Chaque pas est une histoire à écrire.",
        objectif: "Suivre un itinéraire à plusieurs points GPS.",
        defi: "Validez chaque point de passage.",
        gps: "47.508300,-0.610300"
      }
     ] 
  }
,
 

    
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
  preview: "enigme",
  scenarios: {
    arthurien: [
      {
        titre: "L'Énigme de Merlin",
        metaphore: "Un mot murmuré ouvre plus de portes qu’une épée.",
        objectif: "Trouver le mot de passe caché par le mage.",
        defi: "Résolvez l’énigme inscrite sur la pierre et tapez le mot magique pour avancer.",
        gps: "47.478300,-0.580300"
      },
      {
        titre: "Le Secret de la Table Ronde",
        metaphore: "Seuls les vrais chevaliers connaissent le mot sacré.",
        objectif: "Découvrir le mot de passe à partir des indices disséminés.",
        defi: "Récupérez les indices et saisissez le mot pour révéler la suite.",
        gps: "47.478900,-0.580900"
      },
      {
        titre: "La Formule Mystique",
        metaphore: "Les mots les plus puissants sont souvent les plus simples.",
        objectif: "Trouver la formule magique cachée dans l’environnement.",
        defi: "Observez autour de vous et entrez la formule dans le champ prévu.",
        gps: "47.479500,-0.581500"
      },
      {
        titre: "La Porte du Savoir",
        metaphore: "Chaque porte a sa clé, chaque énigme son mot.",
        objectif: "Trouver le mot qui ouvre la porte du prochain défi.",
        defi: "Décryptez la devinette et entrez le mot pour avancer.",
        gps: "47.480100,-0.582100"
      },
      {
        titre: "La Sentence du Druide",
        metaphore: "Le druide ne livre son secret qu’aux esprits affûtés.",
        objectif: "Résoudre une énigme posée par le druide du royaume.",
        defi: "Tapez le mot réponse pour prouver votre valeur.",
        gps: "47.480700,-0.582700"
      }
    ],
    pirate: [
      {
        titre: "Le Code du Capitaine",
        metaphore: "Le perroquet ne parle qu’aux vrais pirates.",
        objectif: "Décoder le mot de passe du coffre.",
        defi: "Résolvez l’énigme et tapez le mot pour ouvrir le coffre.",
        gps: "47.481300,-0.583300"
      },
      {
        titre: "La Devise des Flibustiers",
        metaphore: "Seul l’initié connaît la phrase secrète.",
        objectif: "Trouver la devise cachée sur la carte au trésor.",
        defi: "Collectez les indices et saisissez la devise pour continuer.",
        gps: "47.481900,-0.583900"
      },
      {
        titre: "L’Enigme du Trésor",
        metaphore: "Le trésor ne s’ouvre qu’à la bonne combinaison.",
        objectif: "Résoudre une énigme pour obtenir le code secret.",
        defi: "Résolvez la devinette pirate et tapez le bon mot.",
        gps: "47.482500,-0.584500"
      },
      {
        titre: "Le Sésame du Coffre",
        metaphore: "Chaque coffre a son sésame.",
        objectif: "Trouver le mot de passe à partir d’indices dans le décor.",
        defi: "Observez bien les alentours, puis tapez le mot dans l’application.",
        gps: "47.483100,-0.585100"
      },
      {
        titre: "Le Mot du Vieux Boucanier",
        metaphore: "Parfois, la sagesse d’un ancien vaut un coffre d’or.",
        objectif: "Résoudre la devinette du vieux marin.",
        defi: "Entrez le mot trouvé pour prouver votre ruse.",
        gps: "47.483700,-0.585700"
      }
    ],
    prison: [
      {
        titre: "Le Code du Gardien",
        metaphore: "Derrière chaque grille, un code secret.",
        objectif: "Trouver le mot de passe pour ouvrir la porte.",
        defi: "Résolvez l’énigme affichée sur le mur et saisissez le code.",
        gps: "47.484300,-0.586300"
      },
      {
        titre: "L’Indice du Complice",
        metaphore: "Un complice laisse toujours un message codé.",
        objectif: "Décoder le mot de passe caché dans une lettre.",
        defi: "Trouvez le mot dans le message et tapez-le pour déverrouiller la cellule.",
        gps: "47.484900,-0.586900"
      },
      {
        titre: "L’Énigme de la Surveillance",
        metaphore: "Le surveillant ne dort que d’un œil.",
        objectif: "Trouver le mot de passe à partir d’indices dans la pièce.",
        defi: "Cherchez les indices et tapez le mot de passe pour sortir.",
        gps: "47.485500,-0.587500"
      },
      {
        titre: "Le Sésame de la Liberté",
        metaphore: "La liberté s’achète au prix de la réflexion.",
        objectif: "Résoudre la devinette pour obtenir le sésame.",
        defi: "Tapez le mot trouvé pour débloquer la suite.",
        gps: "47.486100,-0.588100"
      },
      {
        titre: "Le Code de la Nuit",
        metaphore: "La nuit porte conseil, mais jamais le même mot.",
        objectif: "Trouver le mot de passe du jour.",
        defi: "Observez les indices autour de vous et tapez le mot pour continuer.",
        gps: "47.486700,-0.588700"
      }
    ],
    sorcier: [
      {
        titre: "La Formule Interdite",
        metaphore: "Un mot de pouvoir change le destin.",
        objectif: "Trouver la formule magique cachée.",
        defi: "Résolvez l’énigme et tapez la formule dans le champ prévu.",
        gps: "47.487300,-0.589300"
      },
      {
        titre: "L’Incantation d’Avalon",
        metaphore: "Seuls les initiés connaissent le bon mot.",
        objectif: "Découvrir le mot de passe du grimoire.",
        defi: "Cherchez l’incantation, puis tapez-la pour ouvrir le livre.",
        gps: "47.487900,-0.589900"
      },
      {
        titre: "Le Mot du Mage",
        metaphore: "Chaque mage a son secret.",
        objectif: "Trouver le mot magique caché dans un indice.",
        defi: "Résolvez la devinette magique et tapez le mot.",
        gps: "47.488500,-0.590500"
      },
      {
        titre: "L’Énigme du Chaudron",
        metaphore: "Dans les bulles de la potion, un mot apparaît.",
        objectif: "Observer et trouver le mot dans la potion.",
        defi: "Entrez le mot découvert pour passer à l’étape suivante.",
        gps: "47.489100,-0.591100"
      },
      {
        titre: "Le Sceau du Cercle",
        metaphore: "Briser le sceau, c’est révéler le mot caché.",
        objectif: "Décoder le mot de passe du cercle magique.",
        defi: "Trouvez le mot secret et tapez-le pour briser le sort.",
        gps: "47.489700,-0.591700"
      }
    ],
    super_heros: [
      {
        titre: "Le Code du QG",
        metaphore: "Chaque mission commence par un mot secret.",
        objectif: "Trouver le mot de passe pour débloquer la mission.",
        defi: "Résolvez l’énigme et tapez le mot dans l’application.",
        gps: "47.490300,-0.592300"
      },
      {
        titre: "L’Ordre de Mission",
        metaphore: "Un héros n’agit jamais sans consigne secrète.",
        objectif: "Décoder la phrase du QG.",
        defi: "Cherchez la phrase cachée et tapez-la pour continuer.",
        gps: "47.490900,-0.592900"
      },
      {
        titre: "Le Mot du Sauvetage",
        metaphore: "Le mot de la victoire n’est jamais le même.",
        objectif: "Résoudre l’énigme du sauvetage.",
        defi: "Tapez le mot trouvé pour débloquer la suite.",
        gps: "47.491500,-0.593500"
      },
      {
        titre: "La Formule du Justicier",
        metaphore: "Chaque héros a sa devise.",
        objectif: "Découvrir la devise magique.",
        defi: "Résolvez l’énigme et tapez la devise de l’équipe.",
        gps: "47.492100,-0.594100"
      },
      {
        titre: "Le Sésame du Quartier",
        metaphore: "Les rues cachent toujours un mot clé.",
        objectif: "Trouver le mot secret dans le décor.",
        defi: "Tapez le mot trouvé pour continuer l’aventure.",
        gps: "47.492700,-0.594700"
      }
    ],
    zombie: [
      {
        titre: "Le Sésame du Refuge",
        metaphore: "Un mot bien choisi peut sauver une vie.",
        objectif: "Trouver le mot de passe pour entrer dans le refuge.",
        defi: "Résolvez l’énigme affichée à l’entrée et tapez le mot.",
        gps: "47.493300,-0.595300"
      },
      {
        titre: "Le Code d’Alerte",
        metaphore: "La survie dépend parfois d’un simple code.",
        objectif: "Décoder le mot d’alerte.",
        defi: "Cherchez le mot secret et tapez-le pour lancer l’alerte.",
        gps: "47.493900,-0.595900"
      },
      {
        titre: "Le Message du Survivant",
        metaphore: "Chaque survivant laisse une trace.",
        objectif: "Trouver le mot de passe dans un message caché.",
        defi: "Résolvez la devinette et tapez le mot trouvé.",
        gps: "47.494500,-0.596500"
      },
      {
        titre: "Le Mot du Remède",
        metaphore: "Pour obtenir l’antidote, il faut le bon mot.",
        objectif: "Découvrir le mot de passe de la pharmacie.",
        defi: "Tapez le mot découvert sur le flacon.",
        gps: "47.495100,-0.597100"
      },
      {
        titre: "Le Sésame de la Zone Sûre",
        metaphore: "Une zone sûre n’est jamais accessible sans mot de passe.",
        objectif: "Trouver le mot pour entrer dans la zone protégée.",
        defi: "Résolvez l’énigme et tapez le mot pour entrer.",
        gps: "47.495700,-0.597700"
      }
    ],
    archeologue: [
      {
        titre: "L’Inscription Oubliée",
        metaphore: "Le passé livre ses secrets à ceux qui savent lire.",
        objectif: "Trouver le mot de passe caché dans une inscription ancienne.",
        defi: "Décryptez l’inscription et tapez le mot pour continuer.",
        gps: "47.496300,-0.598300"
      },
      {
        titre: "Le Code du Temple",
        metaphore: "Chaque temple garde jalousement son secret.",
        objectif: "Décoder le mot de passe du temple.",
        defi: "Résolvez l’énigme gravée dans la pierre et tapez le mot.",
        gps: "47.496900,-0.598900"
      },
      {
        titre: "Le Sésame de la Crypte",
        metaphore: "Les cryptes ne s’ouvrent qu’à ceux qui savent observer.",
        objectif: "Trouver le mot de passe dans les symboles.",
        defi: "Tapez le mot trouvé parmi les symboles anciens.",
        gps: "47.497500,-0.599500"
      },
      {
        titre: "La Clé des Archives",
        metaphore: "Les archives cachent toujours un mot clé.",
        objectif: "Trouver le mot de passe parmi les vieux papiers.",
        defi: "Tapez le mot trouvé sur le parchemin.",
        gps: "47.498100,-0.600100"
      },
      {
        titre: "L’Énigme du Scribe",
        metaphore: "Un scribe laisse toujours un indice.",
        objectif: "Résoudre l’énigme du scribe.",
        defi: "Tapez le mot découvert pour valider l’étape.",
        gps: "47.498700,-0.600700"
      }
     ] 
  }
 ,
 

    

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
  preview: "enigme",
  scenarios: {
    arthurien: [
      {
        titre: "Le Sort de Confusion",
        metaphore: "Merlin a brouillé les mots pour tester les plus sages.",
        objectif: "Résoudre l’anagramme pour poursuivre la quête.",
        defi: "Décodifiez l’anagramme magique affichée et tapez la bonne réponse.",
        gps: "47.478300,-0.580300"
      },
      {
        titre: "L'Énigme du Grimoire",
        metaphore: "Un vieux grimoire renferme des mots inversés.",
        objectif: "Trouver le véritable mot caché dans l’anagramme.",
        defi: "Résolvez l’anagramme tirée du grimoire de Merlin.",
        gps: "47.479000,-0.581000"
      },
      {
        titre: "Le Message Codé du Druide",
        metaphore: "Les druides parlent parfois à mots cachés.",
        objectif: "Décoder la phrase secrète du druide.",
        defi: "Trouvez le mot derrière l’anagramme sur la pierre sacrée.",
        gps: "47.479700,-0.581700"
      },
      {
        titre: "La Formule Inversée",
        metaphore: "Les plus malins lisent à l’envers.",
        objectif: "Retrouver la formule magique cachée.",
        defi: "Reconstituez la formule magique à partir de l’anagramme.",
        gps: "47.480400,-0.582400"
      },
      {
        titre: "L’Oracle Incompréhensible",
        metaphore: "Même les prophéties se cachent dans le désordre.",
        objectif: "Comprendre le message de l’oracle en résolvant l’anagramme.",
        defi: "Tapez la solution pour découvrir la suite de la prophétie.",
        gps: "47.481100,-0.583100"
      }
    ],
    pirate: [
      {
        titre: "Le Parchemin Codé",
        metaphore: "Le trésor n’est offert qu’aux plus rusés.",
        objectif: "Déchiffrer l’anagramme sur le parchemin du capitaine.",
        defi: "Résolvez l’énigme et tapez le mot pour continuer la chasse.",
        gps: "47.482300,-0.584300"
      },
      {
        titre: "L’Énigme du Flibustier",
        metaphore: "Les pirates codent toujours leurs secrets.",
        objectif: "Trouver le mot caché dans l’anagramme.",
        defi: "Décodifiez l’anagramme laissée par le flibustier.",
        gps: "47.483000,-0.585000"
      },
      {
        titre: "Le Code du Butin",
        metaphore: "Le code du butin se cache dans un mot brouillé.",
        objectif: "Résoudre l’anagramme pour accéder au trésor.",
        defi: "Tapez le mot trouvé pour ouvrir la prochaine étape.",
        gps: "47.483700,-0.585700"
      },
      {
        titre: "La Boussole Déroutée",
        metaphore: "Même la boussole pirate perd le nord dans les mots.",
        objectif: "Remettre de l’ordre dans l’anagramme.",
        defi: "Résolvez l’anagramme pour retrouver le bon cap.",
        gps: "47.484400,-0.586400"
      },
      {
        titre: "Le Secret du Vieux Loup de Mer",
        metaphore: "Seuls ceux qui comprennent la langue du vieux marin avanceront.",
        objectif: "Trouver le mot caché dans la phrase brouillée.",
        defi: "Tapez la solution pour prouver que vous êtes dignes de l’équipage.",
        gps: "47.485100,-0.587100"
      }
    ],
    prison: [
      {
        titre: "Le Plan Crypté",
        metaphore: "Le plan d’évasion n’est jamais écrit clairement.",
        objectif: "Retrouver le mot clé pour sortir de la cellule.",
        defi: "Décodifiez l’anagramme trouvée sous la paillasse.",
        gps: "47.485800,-0.587800"
      },
      {
        titre: "L’Énigme du Codétenu",
        metaphore: "Les complices communiquent en langage secret.",
        objectif: "Trouver le mot caché dans l’anagramme du message.",
        defi: "Tapez la réponse pour continuer le plan d’évasion.",
        gps: "47.486500,-0.588500"
      },
      {
        titre: "Le Message de la Cour",
        metaphore: "Les murs ont des oreilles et les mots se mélangent.",
        objectif: "Démêler l’anagramme laissée dans la cour.",
        defi: "Résolvez-la pour trouver le prochain indice.",
        gps: "47.487200,-0.589200"
      },
      {
        titre: "L’Ordre du Gardien",
        metaphore: "Même les ordres sont codés en prison.",
        objectif: "Décoder le mot d’ordre du gardien.",
        defi: "Trouvez le mot pour obtenir la clé.",
        gps: "47.487900,-0.589900"
      },
      {
        titre: "Le Sésame de la Liberté",
        metaphore: "La liberté se gagne à la force du cerveau.",
        objectif: "Résoudre l’anagramme pour ouvrir la grille.",
        defi: "Tapez la solution pour avancer vers la sortie.",
        gps: "47.488600,-0.590600"
      }
    ],
    sorcier: [
      {
        titre: "Le Grimoire Brouillé",
        metaphore: "Les mots de pouvoir se cachent dans le désordre.",
        objectif: "Trouver le mot magique dans l’anagramme.",
        defi: "Résolvez l’anagramme du grimoire pour lancer le sort.",
        gps: "47.489300,-0.591300"
      },
      {
        titre: "L’Incantation Perdue",
        metaphore: "Une incantation mal prononcée devient une énigme.",
        objectif: "Reconstituer l’incantation correcte.",
        defi: "Décodifiez la phrase pour obtenir le mot de pouvoir.",
        gps: "47.490000,-0.592000"
      },
      {
        titre: "Le Message du Mage",
        metaphore: "Le mage teste l’esprit de ses apprentis.",
        objectif: "Trouver le mot caché dans la phrase magique.",
        defi: "Tapez la solution pour recevoir la bénédiction du mage.",
        gps: "47.490700,-0.592700"
      },
      {
        titre: "La Potion Inversée",
        metaphore: "Certaines recettes ne se lisent qu’à l’envers.",
        objectif: "Décoder le nom de l’ingrédient secret.",
        defi: "Résolvez l’anagramme pour compléter la potion.",
        gps: "47.491400,-0.593400"
      },
      {
        titre: "L’Oracle Embrouillé",
        metaphore: "Même les oracles aiment jouer avec les mots.",
        objectif: "Trouver le mot caché de la prophétie.",
        defi: "Tapez la solution pour déchiffrer la vision.",
        gps: "47.492100,-0.594100"
      }
    ],
    super_heros: [
      {
        titre: "Le Message Crypté du QG",
        metaphore: "Les super-héros ne communiquent jamais sans code.",
        objectif: "Décoder le message du quartier général.",
        defi: "Résolvez l’anagramme pour révéler la prochaine mission.",
        gps: "47.492800,-0.594800"
      },
      {
        titre: "L’Identité Secrète",
        metaphore: "Le vrai héros sait toujours lire entre les lignes.",
        objectif: "Trouver l’identité secrète cachée dans l’anagramme.",
        defi: "Tapez la solution pour lever le masque.",
        gps: "47.493500,-0.595500"
      },
      {
        titre: "Le Signal de Détresse",
        metaphore: "Parfois, le signal est brouillé pour tromper l’ennemi.",
        objectif: "Décoder l’appel à l’aide.",
        defi: "Résolvez l’anagramme pour lancer la mission de sauvetage.",
        gps: "47.494200,-0.596200"
      },
      {
        titre: "Le Code du Vilain",
        metaphore: "Les vilains laissent toujours des indices codés.",
        objectif: "Trouver le nom du vilain dans l’anagramme.",
        defi: "Tapez le nom trouvé pour poursuivre la mission.",
        gps: "47.494900,-0.596900"
      },
      {
        titre: "La Formule du Bouclier",
        metaphore: "Un bon super-héros connaît tous les codes.",
        objectif: "Résoudre l’anagramme pour activer le bouclier.",
        defi: "Tapez la solution pour protéger l’équipe.",
        gps: "47.495600,-0.597600"
      }
    ],
    zombie: [
      {
        titre: "L’Énigme du Survivant",
        metaphore: "Parfois, un mot brouillé sauve la vie.",
        objectif: "Décoder le message pour trouver la cachette.",
        defi: "Résolvez l’anagramme pour accéder au refuge.",
        gps: "47.496300,-0.598300"
      },
      {
        titre: "Le Code de la Horde",
        metaphore: "Les zombies ne comprennent pas les anagrammes… mais vous oui.",
        objectif: "Trouver le mot de passe de la zone sûre.",
        defi: "Tapez la solution pour débloquer la porte.",
        gps: "47.497000,-0.599000"
      },
      {
        titre: "Le Message de la Résistance",
        metaphore: "La Résistance brouille ses transmissions.",
        objectif: "Décoder un appel d’urgence.",
        defi: "Résolvez l’anagramme pour transmettre le message.",
        gps: "47.497700,-0.599700"
      },
      {
        titre: "Le Nom du Remède",
        metaphore: "Il faut lire entre les lignes pour guérir.",
        objectif: "Trouver le nom du remède dans l’anagramme.",
        defi: "Tapez la solution pour sauver votre équipe.",
        gps: "47.498400,-0.600400"
      },
      {
        titre: "Le Sésame du Tunnel",
        metaphore: "La sortie n’est accessible qu’aux esprits vifs.",
        objectif: "Résoudre l’anagramme pour débloquer l’accès secret.",
        defi: "Tapez la solution pour ouvrir le tunnel.",
        gps: "47.499100,-0.601100"
      }
    ],
    archeologue: [
      {
        titre: "Le Cryptogramme Ancien",
        metaphore: "Les anciens cachaient leurs secrets dans le désordre.",
        objectif: "Décoder le cryptogramme gravé sur la pierre.",
        defi: "Résolvez l’anagramme pour accéder à la salle suivante.",
        gps: "47.499800,-0.601800"
      },
      {
        titre: "L’Énigme du Scribe",
        metaphore: "Un scribe malin brouille toujours ses messages.",
        objectif: "Trouver le vrai mot dans la phrase inversée.",
        defi: "Tapez la solution pour continuer l’exploration.",
        gps: "47.500500,-0.602500"
      },
      {
        titre: "La Devise du Temple",
        metaphore: "Un temple n’ouvre qu’à ceux qui comprennent ses mots.",
        objectif: "Décrypter la devise gravée.",
        defi: "Résolvez l’anagramme pour percer le mystère du temple.",
        gps: "47.501200,-0.603200"
      },
      {
        titre: "Le Mot de l’Explorateur",
        metaphore: "Chaque explorateur laisse derrière lui des indices codés.",
        objectif: "Trouver le mot caché dans les archives.",
        defi: "Tapez la solution de l’anagramme pour obtenir une récompense.",
        gps: "47.501900,-0.603900"
      },
      {
        titre: "Le Code de la Crypte",
        metaphore: "La crypte ne s’ouvre qu’aux érudits.",
        objectif: "Décoder le mot de passe caché.",
        defi: "Résolvez l’anagramme pour ouvrir la crypte.",
        gps: "47.502600,-0.604600"
      }
     ] 
  }
,
    
    

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
  preview: "image",
  scenarios: {
    arthurien: [
      {
        titre: "Le Blason Mystérieux",
        metaphore: "Seuls les plus attentifs reconnaîtront l’erreur du royaume.",
        objectif: "Repérer l’anomalie sur le blason exposé.",
        defi: "Sur l’image du blason, trouvez et indiquez l’élément qui ne devrait pas s’y trouver.",
        gps: "47.478300,-0.580300"
      },
      {
        titre: "La Table Ronde Troublée",
        metaphore: "La légende veut que la Table soit parfaite… mais l’est-elle vraiment ?",
        objectif: "Trouver l’erreur sur l’image de la Table Ronde.",
        defi: "Trouvez ce qui cloche sur la photo de la Table Ronde.",
        gps: "47.478900,-0.580900"
      },
      {
        titre: "Le Graal Détourné",
        metaphore: "Le Graal apparaît… mais quelque chose ne va pas.",
        objectif: "Déceler l’élément anormal sur l’image du Graal.",
        defi: "Repérez et décrivez l’objet insolite sur la photo du Graal.",
        gps: "47.479500,-0.581500"
      },
      {
        titre: "L’Armure Magique",
        metaphore: "Même le chevalier le plus valeureux peut faire une erreur d’équipement.",
        objectif: "Trouver l’objet anachronique sur l’image de l’armure.",
        defi: "Trouvez l’intrus sur la photo du chevalier en armure.",
        gps: "47.480100,-0.582100"
      },
      {
        titre: "Le Château Miroir",
        metaphore: "Tout n’est pas toujours dans le bon sens.",
        objectif: "Repérer la partie inversée ou dupliquée sur l’image du château.",
        defi: "Indiquez où se trouve la partie truquée sur la photo.",
        gps: "47.480700,-0.582700"
      }
    ],
    pirate: [
      {
        titre: "La Carte au Trésor Piégée",
        metaphore: "Un vrai pirate ne se laisse pas tromper par les fausses pistes.",
        objectif: "Trouver la différence sur la carte au trésor.",
        defi: "Quelle est la fausse île sur la carte ?",
        gps: "47.481300,-0.583300"
      },
      {
        titre: "La Barque Anachronique",
        metaphore: "Certains objets n’ont rien à faire sur le navire.",
        objectif: "Repérer l’objet moderne sur l’image du bateau.",
        defi: "Quel objet est de trop sur la barque des pirates ?",
        gps: "47.481900,-0.583900"
      },
      {
        titre: "Le Drapeau Pirate Mystère",
        metaphore: "Le pavillon n’est pas tout à fait comme il devrait l’être.",
        objectif: "Trouver l’erreur sur le drapeau pirate.",
        defi: "Quel détail n’appartient pas au drapeau ?",
        gps: "47.482500,-0.584500"
      },
      {
        titre: "Le Coffre aux Mille Pièces",
        metaphore: "Tous les trésors ne sont pas ce qu’ils semblent être.",
        objectif: "Repérer la pièce étrange dans le coffre.",
        defi: "Quelle pièce n’a pas sa place dans le coffre sur l’image ?",
        gps: "47.483100,-0.585100"
      },
      {
        titre: "L’Île aux Deux Palmiers",
        metaphore: "Regardez bien, quelque chose cloche sur l’île.",
        objectif: "Trouver la partie de l’île copiée ou déplacée.",
        defi: "Où est l’erreur visuelle sur l’île ?",
        gps: "47.483700,-0.585700"
      }
    ],
    prison: [
      {
        titre: "La Clé Camouflée",
        metaphore: "Parfois, la clé de la liberté se cache à la vue de tous.",
        objectif: "Trouver la clé cachée sur une image de la cellule.",
        defi: "Où est dissimulée la clé sur la photo de la cellule ?",
        gps: "47.484300,-0.586300"
      },
      {
        titre: "Le Couloir Trompeur",
        metaphore: "Les couloirs semblent identiques… mais le sont-ils ?",
        objectif: "Repérer la différence entre deux images de couloir.",
        defi: "Quelle est la différence entre les deux photos ?",
        gps: "47.484900,-0.586900"
      },
      {
        titre: "La Grille Inversée",
        metaphore: "Un détail inversé peut tout changer.",
        objectif: "Trouver la grille inversée ou dupliquée sur l’image.",
        defi: "Montrez où se trouve la grille truquée.",
        gps: "47.485500,-0.587500"
      },
      {
        titre: "La Caméra Absente",
        metaphore: "La surveillance est-elle vraiment totale ?",
        objectif: "Détecter la caméra manquante ou déplacée.",
        defi: "Indiquez la caméra mal placée ou absente sur la photo.",
        gps: "47.486100,-0.588100"
      },
      {
        titre: "Le Visiteur Mystère",
        metaphore: "Un personnage s’est glissé là où il ne fallait pas.",
        objectif: "Repérer l’intrus sur la photo de la cour.",
        defi: "Qui est l’intrus sur l’image ?",
        gps: "47.486700,-0.588700"
      }
    ],
    sorcier: [
      {
        titre: "Le Livre Ensorcelé",
        metaphore: "Les pages tournent… mais pas toutes dans le bon ordre.",
        objectif: "Retrouver la page déplacée ou inversée.",
        defi: "Quelle page du grimoire est à l’envers ?",
        gps: "47.487300,-0.589300"
      },
      {
        titre: "Le Chaudron Fantôme",
        metaphore: "Un ingrédient de trop rend la potion suspecte.",
        objectif: "Trouver l’objet anormal dans le chaudron.",
        defi: "Quel ingrédient étrange voyez-vous dans la potion ?",
        gps: "47.487900,-0.589900"
      },
      {
        titre: "La Baguette Maladroite",
        metaphore: "Toutes les baguettes ne sont pas magiques.",
        objectif: "Repérer la baguette qui n’est pas comme les autres.",
        defi: "Quelle baguette est différente sur la photo ?",
        gps: "47.488500,-0.590500"
      },
      {
        titre: "Le Chapeau Disparu",
        metaphore: "Un chapeau de sorcier a disparu.",
        objectif: "Identifier l’endroit où il manque un chapeau.",
        defi: "Où manque-t-il un chapeau sur l’image ?",
        gps: "47.489100,-0.591100"
      },
      {
        titre: "Le Miroir Déformant",
        metaphore: "Le reflet ne montre pas toujours la vérité.",
        objectif: "Trouver la différence entre l’objet et son reflet.",
        defi: "Quelle anomalie voyez-vous dans le miroir sur la photo ?",
        gps: "47.489700,-0.591700"
      }
    ],
    super_heros: [
      {
        titre: "Le Costume Détourné",
        metaphore: "Un super-héros ne perd jamais son style… sauf ici.",
        objectif: "Trouver le détail anormal sur le costume.",
        defi: "Quel accessoire n’a rien à faire sur ce super-héros ?",
        gps: "47.490300,-0.592300"
      },
      {
        titre: "La Ville Inversée",
        metaphore: "La ville n’est pas tout à fait comme d’habitude.",
        objectif: "Repérer la partie de la ville inversée sur l’image.",
        defi: "Où la ville a-t-elle été modifiée sur la photo ?",
        gps: "47.490900,-0.592900"
      },
      {
        titre: "Le Logo Caché",
        metaphore: "Le symbole du héros n’est pas toujours bien placé.",
        objectif: "Trouver le logo bien ou mal caché.",
        defi: "Où est caché ou déplacé le logo du super-héros ?",
        gps: "47.491500,-0.593500"
      },
      {
        titre: "Le Double du Héros",
        metaphore: "Deux fois le même héros, c’est louche.",
        objectif: "Repérer la duplication ou l’intrus sur l’image.",
        defi: "Où voyez-vous le double sur la photo ?",
        gps: "47.492100,-0.594100"
      },
      {
        titre: "Le Gadget Mystère",
        metaphore: "Certains gadgets sortent de l’ordinaire.",
        objectif: "Repérer l’objet futuriste ou déplacé.",
        defi: "Quel gadget n’a rien à faire sur cette image ?",
        gps: "47.492700,-0.594700"
      }
    ],
    zombie: [
      {
        titre: "Le Survivant Caché",
        metaphore: "Un survivant sait toujours se cacher.",
        objectif: "Repérer le survivant dissimulé dans le décor.",
        defi: "Où se cache le survivant sur la photo ?",
        gps: "47.493300,-0.595300"
      },
      {
        titre: "La Horde Incomplète",
        metaphore: "Un zombie manque à l’appel.",
        objectif: "Trouver le zombie absent ou masqué.",
        defi: "Où manque-t-il un zombie sur l’image ?",
        gps: "47.493900,-0.595900"
      },
      {
        titre: "La Ville Déserte",
        metaphore: "Même les villes désertes cachent des indices.",
        objectif: "Trouver l’objet anormal dans la ville.",
        defi: "Quel élément n’a rien à faire dans la ville sur la photo ?",
        gps: "47.494500,-0.596500"
      },
      {
        titre: "La Porte Barricadée",
        metaphore: "Une porte mal barricadée ne protège personne.",
        objectif: "Identifier l’erreur sur la barricade.",
        defi: "Quel élément rend la barricade inefficace ?",
        gps: "47.495100,-0.597100"
      },
      {
        titre: "Le Remède Égaré",
        metaphore: "Le remède est sous vos yeux… ou pas.",
        objectif: "Trouver où a été volontairement caché le remède.",
        defi: "Où se trouve le remède sur la photo ?",
        gps: "47.495700,-0.597700"
      }
    ],
    archeologue: [
      {
        titre: "Le Fragment Anachronique",
        metaphore: "Un fragment venu d’un autre temps s’est glissé sur la photo.",
        objectif: "Repérer l’objet anachronique dans la scène archéologique.",
        defi: "Quel objet ne devrait pas être là ?",
        gps: "47.496300,-0.598300"
      },
      {
        titre: "Le Squelette Incomplet",
        metaphore: "Un os manque à l’appel.",
        objectif: "Trouver la pièce manquante du squelette.",
        defi: "Quelle partie du squelette est absente sur la photo ?",
        gps: "47.496900,-0.598900"
      },
      {
        titre: "L’Outil Intrus",
        metaphore: "Les outils modernes n’ont rien à faire ici.",
        objectif: "Repérer l’outil moderne sur le site antique.",
        defi: "Quel outil est anachronique sur l’image ?",
        gps: "47.497500,-0.599500"
      },
      {
        titre: "La Stèle Dédoublée",
        metaphore: "Même les pierres peuvent être copiées…",
        objectif: "Trouver la stèle dupliquée ou déplacée.",
        defi: "Où voyez-vous la stèle copiée sur la photo ?",
        gps: "47.498100,-0.600100"
      },
      {
        titre: "Le Manuscrit Détourné",
        metaphore: "Un mot de trop peut tout changer dans l’histoire.",
        objectif: "Repérer le mot ou le symbole anormal sur le manuscrit.",
        defi: "Quel est l’élément étrange sur le manuscrit sur la photo ?",
        gps: "47.498700,-0.600700"
      }
     ] 
  }
,

    

  // === CHASSE AU TRESOR ===
 {
  id: "chasse_tresor",
  nom: "Chasse au trésor",
  description: "Plusieurs étapes, chaque indice mène à la suivante.",
  parametres: [
    { key: "etapes", type: "list", label: "Liste d’énigmes/indices", itemType: "texte_ou_gps" }
  ],
  combinable: ["chrono"],
  preview: "multi",
  scenarios: {
    arthurien: [
      {
        titre: "La Quête du Graal",
        metaphore: "Seuls les plus persévérants atteignent le Graal.",
        objectif: "Suivre une série d’indices pour découvrir l’emplacement du Graal.",
        defi: "Récupérez chaque indice sur le parcours et trouvez le point final pour valider la quête.",
        gps: "47.482000,-0.583000"
      },
      {
        titre: "Les Reliques Perdues",
        metaphore: "Le passé n’attend que d’être retrouvé.",
        objectif: "Retrouver trois objets cachés représentant les armoiries du royaume.",
        defi: "Trouvez les trois reliques dans la zone indiquée par la carte.",
        gps: "47.482700,-0.583700"
      },
      {
        titre: "Le Secret de la Forêt",
        metaphore: "La forêt cache ses secrets aux yeux inattentifs.",
        objectif: "Déchiffrer une carte pour localiser un trésor caché.",
        defi: "Suivez la carte, trouvez le trésor caché et prouvez votre découverte.",
        gps: "47.483400,-0.584400"
      },
      {
        titre: "Le Coffre de Merlin",
        metaphore: "La magie protège ce qui a de la valeur.",
        objectif: "Trouver le coffre magique caché par Merlin.",
        defi: "Résolvez l’énigme pour obtenir la localisation du coffre, puis trouvez-le.",
        gps: "47.484100,-0.585100"
      },
      {
        titre: "Le Trésor du Chevalier Noir",
        metaphore: "L’ombre recèle parfois des richesses insoupçonnées.",
        objectif: "Explorer la zone sombre de la carte pour trouver le trésor.",
        defi: "Cherchez dans la zone indiquée et révélez le trésor du Chevalier Noir.",
        gps: "47.484800,-0.585800"
      }
    ],
    pirate: [
      {
        titre: "Le Trésor du Capitaine",
        metaphore: "Un vrai pirate sait lire entre les lignes de la carte.",
        objectif: "Suivre une carte au trésor et trouver le coffre enfoui.",
        defi: "Collectez les indices, trouvez le coffre et ouvrez-le pour gagner.",
        gps: "47.485500,-0.586500"
      },
      {
        titre: "L’Île au Secret",
        metaphore: "Chaque île a son secret bien gardé.",
        objectif: "Repérer l’île sur la carte et y trouver un objet caché.",
        defi: "Trouvez l’objet caché sur l’île désignée par la carte.",
        gps: "47.486200,-0.587200"
      },
      {
        titre: "La Boussole Perdue",
        metaphore: "Seule la boussole mène au vrai trésor.",
        objectif: "Trouver la boussole cachée pour accéder à la dernière étape.",
        defi: "Cherchez la boussole puis trouvez le trésor grâce à elle.",
        gps: "47.486900,-0.587900"
      },
      {
        titre: "Le Message dans la Bouteille",
        metaphore: "Un ancien message peut changer le destin d’une équipe.",
        objectif: "Trouver la bouteille cachée avec un indice à l’intérieur.",
        defi: "Trouvez la bouteille, décodez l’indice puis trouvez le trésor.",
        gps: "47.487600,-0.588600"
      },
      {
        titre: "Le Duel des Trésors",
        metaphore: "Le plus rapide remporte la mise.",
        objectif: "Rivaliser avec une autre équipe pour trouver le trésor en premier.",
        defi: "Suivez les indices avant l’autre équipe pour décrocher le trésor.",
        gps: "47.488300,-0.589300"
      }
    ],
    prison: [
      {
        titre: "La Clé du Gardien",
        metaphore: "La liberté se cache parfois dans les détails.",
        objectif: "Trouver la clé cachée dans la cour de la prison.",
        defi: "Résolvez les indices pour localiser la clé et simuler votre évasion.",
        gps: "47.489000,-0.590000"
      },
      {
        titre: "La Planque du Complice",
        metaphore: "Un complice a toujours un plan de secours.",
        objectif: "Trouver la planque secrète où est caché un objet.",
        defi: "Suivez les indices et trouvez la planque pour valider la mission.",
        gps: "47.489700,-0.590700"
      },
      {
        titre: "Le Message Codé",
        metaphore: "Un bon message vaut toutes les serrures.",
        objectif: "Trouver un message caché contenant la localisation du trésor.",
        defi: "Décryptez le message pour trouver le trésor.",
        gps: "47.490400,-0.591400"
      },
      {
        titre: "L’Évasion Finale",
        metaphore: "La dernière étape mène vers la liberté… ou pas.",
        objectif: "Parcourir le parcours secret pour trouver le butin.",
        defi: "Trouvez chaque indice et récupérez le trésor d’évasion.",
        gps: "47.491100,-0.592100"
      },
      {
        titre: "La Cachette du Directeur",
        metaphore: "Le directeur cache bien ses secrets.",
        objectif: "Trouver la cachette du directeur dans son bureau.",
        defi: "Récupérez l’objet caché pour valider cette étape.",
        gps: "47.491800,-0.592800"
      }
    ],
    sorcier: [
      {
        titre: "Les Reliques Magiques",
        metaphore: "La puissance se trouve dans trois objets cachés.",
        objectif: "Trouver les trois reliques magiques disséminées.",
        defi: "Suivez la carte et trouvez chaque relique pour valider le défi.",
        gps: "47.492500,-0.593500"
      },
      {
        titre: "L’Enigme du Grimoire",
        metaphore: "Les plus grands secrets sont bien gardés.",
        objectif: "Trouver le grimoire caché dans la bibliothèque.",
        defi: "Résolvez l’énigme pour découvrir la cachette du grimoire.",
        gps: "47.493200,-0.594200"
      },
      {
        titre: "La Baguette Disparue",
        metaphore: "Sans baguette, pas de magie.",
        objectif: "Trouver la baguette magique cachée par un rival.",
        defi: "Suivez les indices pour retrouver la baguette.",
        gps: "47.493900,-0.594900"
      },
      {
        titre: "Le Cristal du Destin",
        metaphore: "Le destin brille pour ceux qui le cherchent.",
        objectif: "Trouver le cristal caché dans la salle des sorts.",
        defi: "Trouvez le cristal caché grâce à la carte des indices.",
        gps: "47.494600,-0.595600"
      },
      {
        titre: "L’Herbier de Mandragore",
        metaphore: "Les plantes rares valent tous les trésors.",
        objectif: "Trouver une mandragore cachée dans le parc.",
        defi: "Parcourez le parc et trouvez la plante rare.",
        gps: "47.495300,-0.596300"
      }
    ],
    super_heros: [
      {
        titre: "La Pierre d’Énergie",
        metaphore: "Un héros doit retrouver sa source de pouvoir.",
        objectif: "Trouver la pierre d’énergie cachée.",
        defi: "Suivez les indices et trouvez la pierre pour recharger vos pouvoirs.",
        gps: "47.496000,-0.597000"
      },
      {
        titre: "Le Costume Disparu",
        metaphore: "Impossible d’être un héros sans son costume.",
        objectif: "Retrouver l’élément manquant du costume dans le parc.",
        defi: "Trouvez le costume caché à l’aide d’une série d’indices.",
        gps: "47.496700,-0.597700"
      },
      {
        titre: "La Base Secrète",
        metaphore: "Chaque héros a une base cachée.",
        objectif: "Trouver la base secrète à partir d’un plan codé.",
        defi: "Décryptez le plan et trouvez la base.",
        gps: "47.497400,-0.598400"
      },
      {
        titre: "Le Gadget Perdu",
        metaphore: "Un super-héros n’est rien sans ses gadgets.",
        objectif: "Trouver le gadget caché par un vilain.",
        defi: "Suivez la piste pour récupérer le gadget.",
        gps: "47.498100,-0.599100"
      },
      {
        titre: "La Mission Impossible",
        metaphore: "Une mission complexe attend l’équipe.",
        objectif: "Trouver un objet caché en résolvant plusieurs énigmes.",
        defi: "Résolvez chaque énigme pour accéder au trésor final.",
        gps: "47.498800,-0.599800"
      }
    ],
    zombie: [
      {
        titre: "Le Refuge Caché",
        metaphore: "Seuls les survivants trouvent l’abri secret.",
        objectif: "Trouver le refuge en suivant des indices dispersés.",
        defi: "Collectez les indices et trouvez la cachette.",
        gps: "47.499500,-0.600500"
      },
      {
        titre: "Le Remède Oublié",
        metaphore: "La survie dépend d’un détail caché.",
        objectif: "Retrouver le remède caché dans la zone rouge.",
        defi: "Suivez la carte, trouvez le remède et sauvez votre équipe.",
        gps: "47.500200,-0.601200"
      },
      {
        titre: "La Clé du Convoi",
        metaphore: "Sans clé, pas d’évasion.",
        objectif: "Trouver la clé de la voiture cachée.",
        defi: "Récupérez la clé en résolvant l’énigme pour partir en convoi.",
        gps: "47.500900,-0.601900"
      },
      {
        titre: "Le Stock de Vivres",
        metaphore: "Seuls les débrouillards survivent.",
        objectif: "Trouver le stock de vivres caché dans le parc.",
        defi: "Trouvez le stock avant les autres équipes.",
        gps: "47.501600,-0.602600"
      },
      {
        titre: "Le Dernier Passage",
        metaphore: "La sortie n’est visible qu’aux plus attentifs.",
        objectif: "Trouver le passage secret pour sortir de la zone.",
        defi: "Collectez tous les indices pour ouvrir le passage et vous échapper.",
        gps: "47.502300,-0.603300"
      }
    ],
    archeologue: [
      {
        titre: "La Tombe Oubliée",
        metaphore: "Les plus grands trésors dorment sous terre.",
        objectif: "Trouver la tombe cachée sur le site.",
        defi: "Suivez la carte et trouvez l’endroit exact.",
        gps: "47.503000,-0.604000"
      },
      {
        titre: "L’Idole Mystérieuse",
        metaphore: "Une idole ancienne attend d’être découverte.",
        objectif: "Retrouver l’idole cachée dans la zone de fouilles.",
        defi: "Cherchez l’idole en suivant les indices.",
        gps: "47.503700,-0.604700"
      },
      {
        titre: "Le Fragment Perdu",
        metaphore: "Le puzzle du passé n’est jamais complet d’emblée.",
        objectif: "Trouver un fragment d’objet antique caché.",
        defi: "Rassemblez les morceaux et complétez l’objet.",
        gps: "47.504400,-0.605400"
      },
      {
        titre: "La Carte Disparue",
        metaphore: "Sans carte, pas de découverte.",
        objectif: "Retrouver la carte antique cachée dans le site.",
        defi: "Trouvez la carte puis suivez-la jusqu’au trésor.",
        gps: "47.505100,-0.606100"
      },
      {
        titre: "L’Amulette du Scribe",
        metaphore: "Le scribe a laissé une trace pour les chercheurs du futur.",
        objectif: "Trouver l’amulette cachée selon la description donnée.",
        defi: "Trouvez l’amulette grâce à la devinette sur le site.",
        gps: "47.505800,-0.606800"
      }
     ] 
  }
,
      

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
}
     ] 
  }
,


    
  // === CHRONOMETRE ===
 {
  id: "chrono",
  nom: "Défi chronométré",
  description: "Réaliser une action, résoudre une énigme ou accomplir un défi en un temps limité.",
  parametres: [
    { key: "duree", type: "number", label: "Durée en secondes", default: 60, min: 5, max: 600 }
  ],
  combinable: ["photo", "audio", "gps", "mot_de_passe"],
  preview: "chrono",
  scenarios: {
    arthurien: [
      {
        titre: "L’Épreuve du Graal",
        metaphore: "Seuls les plus rapides s’approchent du Graal.",
        objectif: "Résoudre une énigme en moins de 2 minutes.",
        defi: "Votre équipe doit donner la bonne réponse avant la fin du chrono.",
        gps: "47.478100,-0.580100"
      },
      {
        titre: "La Traversée Éclair",
        metaphore: "La bravoure se mesure à la vitesse d’exécution.",
        objectif: "Traverser un parcours désigné en moins de 1 minute.",
        defi: "Réalisez le parcours balisé le plus vite possible.",
        gps: "47.478800,-0.580800"
      },
      {
        titre: "La Quête Express",
        metaphore: "Une quête menée tambour battant mène à la victoire.",
        objectif: "Trouver un objet précis en moins de 90 secondes.",
        defi: "Ramenez l’objet demandé avant la fin du temps imparti.",
        gps: "47.479500,-0.581500"
      },
      {
        titre: "Le Duel des Sablier",
        metaphore: "Le temps s’écoule aussi vite qu’une épée frappe.",
        objectif: "Réaliser une épreuve face à une autre équipe en 30 secondes.",
        defi: "Soyez les plus rapides à réussir le défi proposé.",
        gps: "47.480200,-0.582200"
      },
      {
        titre: "Le Cri du Temps",
        metaphore: "Un cri libère la pression du temps.",
        objectif: "Faire le cri de guerre le plus rapide à l’unisson.",
        defi: "Synchronisez un cri collectif en moins de 10 secondes.",
        gps: "47.480900,-0.582900"
      }
    ],
    pirate: [
      {
        titre: "Course au Trésor",
        metaphore: "Le premier arrivé rafle le butin.",
        objectif: "Trouver le trésor caché en moins de 2 minutes.",
        defi: "Suivez la carte et mettez la main sur le trésor avant la fin du chrono.",
        gps: "47.481600,-0.583600"
      },
      {
        titre: "Le Nœud Marin",
        metaphore: "La vie d’un pirate dépend de la rapidité de ses mains.",
        objectif: "Faire un nœud de marin en moins de 30 secondes.",
        defi: "Réalisez un nœud de huit avant la fin du temps imparti.",
        gps: "47.482300,-0.584300"
      },
      {
        titre: "L’Abordage Express",
        metaphore: "Un abordage ne dure jamais longtemps.",
        objectif: "Simuler un abordage en équipe en 1 minute.",
        defi: "Votre équipe doit envahir la zone désignée en moins de 60 secondes.",
        gps: "47.483000,-0.585000"
      },
      {
        titre: "La Chasse aux Pièces",
        metaphore: "Chaque seconde compte pour remplir le coffre.",
        objectif: "Ramasser le plus de pièces en 45 secondes.",
        defi: "Ramenez un maximum de jetons dans le temps imparti.",
        gps: "47.483700,-0.585700"
      },
      {
        titre: "Le Chant du Quartier-Maître",
        metaphore: "Il faut parfois chanter vite pour éviter la tempête.",
        objectif: "Chanter la chanson du navire en moins de 1 minute.",
        defi: "L’équipe doit terminer la chanson avant la fin du chrono.",
        gps: "47.484400,-0.586400"
      }
    ],
    prison: [
      {
        titre: "Évasion Chronométrée",
        metaphore: "Une évasion ne laisse pas le temps à l’hésitation.",
        objectif: "Simuler une évasion en moins de 2 minutes.",
        defi: "Votre équipe doit franchir la ligne d’arrivée avant la fin du chrono.",
        gps: "47.485100,-0.587100"
      },
      {
        titre: "Le Message Secret",
        metaphore: "Il faut vite transmettre avant que le gardien ne revienne.",
        objectif: "Faire passer un message codé en moins de 30 secondes.",
        defi: "Faites circuler le message à toute l’équipe avant la fin du chrono.",
        gps: "47.485800,-0.587800"
      },
      {
        titre: "La Fouille Rapide",
        metaphore: "Chaque seconde compte pour trouver la sortie.",
        objectif: "Trouver un objet caché en moins de 1 minute.",
        defi: "Ramenez l’objet secret dans le temps imparti.",
        gps: "47.486500,-0.588500"
      },
      {
        titre: "Le Mur de la Liberté",
        metaphore: "La liberté se gagne à la vitesse du mur franchi.",
        objectif: "Passer tous un obstacle en moins de 90 secondes.",
        defi: "Toute l’équipe doit franchir l’obstacle avant la fin du chrono.",
        gps: "47.487200,-0.589200"
      },
      {
        titre: "Le Rassemblement Express",
        metaphore: "Se regrouper sans tarder est vital.",
        objectif: "Se rassembler sur un point précis en moins de 45 secondes.",
        defi: "Toute l’équipe doit être réunie sur le point GPS avant la fin du temps.",
        gps: "47.487900,-0.589900"
      }
    ],
    sorcier: [
      {
        titre: "Sortilège Éclair",
        metaphore: "La magie la plus puissante est celle qui fuse.",
        objectif: "Inventer un sort et le réciter en moins de 30 secondes.",
        defi: "Chaque équipe doit réciter un sort inédit avant la fin du chrono.",
        gps: "47.488600,-0.590600"
      },
      {
        titre: "Potion Minute",
        metaphore: "Une potion pressée peut sauver la situation.",
        objectif: "Mimer la préparation d’une potion en moins d’1 minute.",
        defi: "Faites la meilleure imitation de potion avant la fin du temps.",
        gps: "47.489300,-0.591300"
      },
      {
        titre: "Le Grimoire Volé",
        metaphore: "Il ne faut pas traîner pour récupérer un grimoire.",
        objectif: "Trouver et rapporter un grimoire caché en 1 minute.",
        defi: "Récupérez l’objet secret avant la fin du chrono.",
        gps: "47.490000,-0.592000"
      },
      {
        titre: "La Formule Oubliée",
        metaphore: "Il faut vite retrouver la mémoire !",
        objectif: "Retrouver et réciter une formule apprise plus tôt en moins de 40 sec.",
        defi: "Récitez la formule à voix haute avant la fin du chrono.",
        gps: "47.490700,-0.592700"
      },
      {
        titre: "L’Éclair Collectif",
        metaphore: "Quand la magie fuse, tout le monde s’illumine.",
        objectif: "Faire un geste magique collectif synchronisé en 15 sec.",
        defi: "Toute l’équipe doit réaliser le geste ensemble avant la fin du chrono.",
        gps: "47.491400,-0.593400"
      }
    ],
    super_heros: [
      {
        titre: "Sauvetage Express",
        metaphore: "Un héros n’attend jamais pour sauver.",
        objectif: "Simuler un sauvetage de victime en moins d’1 minute.",
        defi: "Menez à bien la mission de sauvetage avant la fin du chrono.",
        gps: "47.492100,-0.594100"
      },
      {
        titre: "Sprint de la Justice",
        metaphore: "La justice va plus vite que l’ombre.",
        objectif: "Parcourir une distance définie en moins de 30 secondes.",
        defi: "Faites le sprint le plus rapide possible.",
        gps: "47.492800,-0.594800"
      },
      {
        titre: "Défi du QG",
        metaphore: "Le QG n’attend pas les retardataires.",
        objectif: "Rassembler tous les membres au QG en 1 minute.",
        defi: "Tous présents au QG avant la fin du chrono.",
        gps: "47.493500,-0.595500"
      },
      {
        titre: "Le Signal Lumineux",
        metaphore: "Le signal doit être lancé à temps.",
        objectif: "Créer un signal de détresse avec le corps en 20 secondes.",
        defi: "Formez le signal lumineux collectif avant la fin du chrono.",
        gps: "47.494200,-0.596200"
      },
      {
        titre: "Transformation Flash",
        metaphore: "Un super-héros se transforme en un clin d’œil.",
        objectif: "Changer d’apparence ou de pose en moins de 10 secondes.",
        defi: "Montrez votre transformation la plus rapide.",
        gps: "47.494900,-0.596900"
      }
    ],
    zombie: [
      {
        titre: "Fuite Chrono",
        metaphore: "Une seconde de trop et c’est la fin.",
        objectif: "Fuir une zone en moins de 45 secondes.",
        defi: "Toute l’équipe doit sortir de la zone avant la fin du chrono.",
        gps: "47.495600,-0.597600"
      },
      {
        titre: "Le Remède Minute",
        metaphore: "Trop tard et tout est perdu.",
        objectif: "Préparer une « potion » de survie en moins d’1 minute.",
        defi: "Inventez et mimez la préparation du remède dans le temps imparti.",
        gps: "47.496300,-0.598300"
      },
      {
        titre: "Alerte à la Horde",
        metaphore: "Prévenir à temps, c’est survivre.",
        objectif: "Lancer un cri d’alerte collectif en moins de 15 secondes.",
        defi: "Tous crient “Attention !” avant la fin du chrono.",
        gps: "47.497000,-0.599000"
      },
      {
        titre: "Cachette Express",
        metaphore: "Trouver refuge avant l’arrivée de la horde.",
        objectif: "Trouver une cachette et s’y regrouper en 30 secondes.",
        defi: "Toute l’équipe doit être cachée avant la fin.",
        gps: "47.497700,-0.599700"
      },
      {
        titre: "Collecte Rapide",
        metaphore: "Ramasser des ressources, mais vite !",
        objectif: "Ramasser le plus d’objets en 1 minute.",
        defi: "Faites la plus grosse collecte possible en 60 secondes.",
        gps: "47.498400,-0.600400"
      }
    ],
    archeologue: [
      {
        titre: "Fouille Express",
        metaphore: "La découverte appartient aux plus rapides.",
        objectif: "Trouver un objet enfoui en moins de 2 minutes.",
        defi: "Ramenez l’objet caché avant la fin du chrono.",
        gps: "47.499100,-0.601100"
      },
      {
        titre: "Montage Antique",
        metaphore: "Assembler vite pour sauver le patrimoine.",
        objectif: "Reconstituer un puzzle en 1 minute.",
        defi: "Assemblez toutes les pièces avant la fin du chrono.",
        gps: "47.499800,-0.601800"
      },
      {
        titre: "Message du Passé",
        metaphore: "Transmettre l’histoire avant qu’elle ne s’efface.",
        objectif: "Faire passer un message d’un membre à l’autre en 30 sec.",
        defi: "Le message doit faire le tour de l’équipe avant la fin du temps.",
        gps: "47.500500,-0.602500"
      },
      {
        titre: "Photo d’Équipe",
        metaphore: "Un cliché rapide capture l’instant.",
        objectif: "Faire une photo d’équipe en moins de 20 secondes.",
        defi: "Tous sur la photo avant la fin du chrono.",
        gps: "47.501200,-0.603200"
      },
      {
        titre: "Relais de la Découverte",
        metaphore: "La collaboration accélère la trouvaille.",
        objectif: "Faire passer un objet à tous les membres en 40 secondes.",
        defi: "L’objet doit passer dans toutes les mains avant la fin.",
        gps: "47.501900,-0.603900"
      }
     ] 
  }
,
  

  // === DEFI EN DUEL ===
 {
  id: "duel",
  nom: "Duel",
  description: "Affronter un/e ou plusieurs adversaires sur un défi physique, intellectuel, artistique ou ludique.",
  parametres: [
    { key: "type_duel", type: "text", label: "Type de duel (ex : mime, bagarre, quiz…)", placeholder: "ex : mime, quiz, course..." }
  ],
  combinable: ["chrono", "photo", "audio"],
  preview: "duel",
  scenarios: {
    arthurien: [
      {
        titre: "Duel d’Escrime",
        metaphore: "Seuls les plus adroits touchent la victoire.",
        objectif: "Affronter un membre d’une autre équipe dans un duel de bâtons.",
        defi: "Premier à toucher l’adversaire (en toute sécurité) l’emporte.",
        gps: "47.478100,-0.580100"
      },
      {
        titre: "Énigme des Sages",
        metaphore: "L’esprit est parfois plus affûté que l’épée.",
        objectif: "Deux membres s’affrontent à coups d’énigmes.",
        defi: "Posez une énigme à l’adversaire : premier qui échoue perd.",
        gps: "47.478800,-0.580800"
      },
      {
        titre: "Course au Graal",
        metaphore: "Le plus rapide approche la légende.",
        objectif: "Course de rapidité entre deux équipes vers un point GPS.",
        defi: "Première équipe à scanner le QR code l’emporte.",
        gps: "47.479500,-0.581500"
      },
      {
        titre: "Chant des Hérauts",
        metaphore: "La voix peut terrasser l’ennemi.",
        objectif: "Concours de cri ou de chant le plus puissant.",
        defi: "Le groupe qui crie ou chante le plus fort gagne.",
        gps: "47.480200,-0.582200"
      },
      {
        titre: "Duel de Mémoire",
        metaphore: "La mémoire est une arme redoutable.",
        objectif: "Affronter un adversaire dans un jeu de mémoire.",
        defi: "Enchaînez les mots sur un thème : celui qui bloque perd.",
        gps: "47.480900,-0.582900"
      }
    ],
    pirate: [
      {
        titre: "Duel de Sabres",
        metaphore: "Le capitaine ne recule jamais devant un défi.",
        objectif: "Duel de bâtons ou d’épées en mousse entre deux pirates.",
        defi: "Premier à toucher gagne le duel.",
        gps: "47.481600,-0.583600"
      },
      {
        titre: "Bras de Fer Marin",
        metaphore: "La force fait la loi sur le pont.",
        objectif: "Bras de fer entre deux membres.",
        defi: "Celui qui plie le bras de l’autre l’emporte.",
        gps: "47.482300,-0.584300"
      },
      {
        titre: "Concours de Grimaces",
        metaphore: "Le pirate le plus effrayant gagne la peur du trésor.",
        objectif: "Duel de grimaces entre deux adversaires.",
        defi: "Le public désigne la grimace la plus terrifiante.",
        gps: "47.483000,-0.585000"
      },
      {
        titre: "Course à la Corde",
        metaphore: "Qui sera le plus rapide sur le pont ?",
        objectif: "Course en ligne droite entre deux membres.",
        defi: "Premier arrivé à la corde gagne.",
        gps: "47.483700,-0.585700"
      },
      {
        titre: "Duel de Blagues",
        metaphore: "Le rire peut désarmer l’ennemi.",
        objectif: "S’affronter à coups de blagues : qui rira en premier ?",
        defi: "Celui qui fait rire l’autre le premier gagne.",
        gps: "47.484400,-0.586400"
      }
    ],
    prison: [
      {
        titre: "Duel de Regard",
        metaphore: "Le premier à baisser les yeux perd.",
        objectif: "Affrontement du regard entre deux détenus.",
        defi: "Celui qui détourne le regard perd le duel.",
        gps: "47.485100,-0.587100"
      },
      {
        titre: "Épreuve de Rapidité",
        metaphore: "Il faut être le plus prompt à saisir sa chance.",
        objectif: "Attraper un objet posé au centre avant l’adversaire.",
        defi: "Le plus rapide à saisir l’objet remporte le duel.",
        gps: "47.485800,-0.587800"
      },
      {
        titre: "Quiz du Gardien",
        metaphore: "La culture fait parfois la différence.",
        objectif: "S’affronter sur des questions de culture générale.",
        defi: "Celui qui répond juste en premier marque le point.",
        gps: "47.486500,-0.588500"
      },
      {
        titre: "Pierre-Feuille-Ciseaux",
        metaphore: "Le hasard est parfois le meilleur complice.",
        objectif: "Affrontement classique à Pierre-Feuille-Ciseaux.",
        defi: "Meilleur sur trois manches remporte le duel.",
        gps: "47.487200,-0.589200"
      },
      {
        titre: "Duel de Mimes",
        metaphore: "L’expression corporelle comme seule arme.",
        objectif: "Imiter ou mimer un objet ou un animal : deviner le plus vite.",
        defi: "Celui qui devine le plus de mimes l’emporte.",
        gps: "47.487900,-0.589900"
      }
    ],
    sorcier: [
      {
        titre: "Duel de Sorts",
        metaphore: "La magie la plus créative l’emporte.",
        objectif: "Inventer et mimer un sort face à l’adversaire.",
        defi: "Le public désigne le sort le plus spectaculaire.",
        gps: "47.488600,-0.590600"
      },
      {
        titre: "Concours de Potions",
        metaphore: "Le meilleur alchimiste est aussi le plus rapide.",
        objectif: "Simuler la préparation d’une potion magique.",
        defi: "Celui qui mime la potion la plus originale gagne.",
        gps: "47.489300,-0.591300"
      },
      {
        titre: "Duel d’Incantations",
        metaphore: "Les mots ont parfois plus de pouvoir que les gestes.",
        objectif: "Créer une incantation en rime sur le thème donné.",
        defi: "Le jury désigne la meilleure incantation.",
        gps: "47.490000,-0.592000"
      },
      {
        titre: "Duel de Télékinésie",
        metaphore: "L’imagination déplace des montagnes.",
        objectif: "Faire léviter (imiter) un objet de la manière la plus créative.",
        defi: "Celui qui impressionne le plus le public l’emporte.",
        gps: "47.490700,-0.592700"
      },
      {
        titre: "Duel de Grimaces Magiques",
        metaphore: "Même les sorciers savent se moquer de l’adversaire.",
        objectif: "Faire la meilleure grimace magique.",
        defi: "Le public désigne la plus drôle ou la plus effrayante.",
        gps: "47.491400,-0.593400"
      }
    ],
    super_heros: [
      {
        titre: "Duel de Super-Pouvoirs",
        metaphore: "Le plus spectaculaire éblouit la foule.",
        objectif: "Mimer un super-pouvoir face à l’adversaire.",
        defi: "Le jury vote pour le mime le plus impressionnant.",
        gps: "47.492100,-0.594100"
      },
      {
        titre: "Course Flash",
        metaphore: "La vitesse, c’est la vie d’un héros.",
        objectif: "Course de vitesse entre deux membres.",
        defi: "Première équipe à franchir la ligne gagne.",
        gps: "47.492800,-0.594800"
      },
      {
        titre: "Quiz des Héros",
        metaphore: "Le cerveau aussi est un super-pouvoir.",
        objectif: "S’affronter sur des questions de culture comics.",
        defi: "Premier à répondre marque le point.",
        gps: "47.493500,-0.595500"
      },
      {
        titre: "Duel de Poses",
        metaphore: "La pose du héros fait la différence.",
        objectif: "Faire la plus belle pose héroïque.",
        defi: "Le public désigne la pose la plus originale.",
        gps: "47.494200,-0.596200"
      },
      {
        titre: "Bataille de Slogans",
        metaphore: "Un bon slogan peut changer le cours du combat.",
        objectif: "Inventer un slogan de super-héros.",
        defi: "Le slogan le plus marquant gagne le duel.",
        gps: "47.494900,-0.596900"
      }
    ],
    zombie: [
      {
        titre: "Duel de Survivants",
        metaphore: "Un contre un, seul le plus malin survit.",
        objectif: "Duel de rapidité pour ramasser un objet.",
        defi: "Premier à attraper l’objet l’emporte.",
        gps: "47.495600,-0.597600"
      },
      {
        titre: "Duel de Gémissements",
        metaphore: "Le zombie le plus effrayant gagne.",
        objectif: "Duel de bruitages de zombies.",
        defi: "Le public vote pour le meilleur bruit.",
        gps: "47.496300,-0.598300"
      },
      {
        titre: "Course à la Cachette",
        metaphore: "La cachette la plus rapide est la meilleure.",
        objectif: "Deux équipes se cachent, le juge compte.",
        defi: "Celle qui se cache le plus vite et le mieux gagne.",
        gps: "47.497000,-0.599000"
      },
      {
        titre: "Duel de Messages Codés",
        metaphore: "Mieux vaut transmettre vite pour survivre.",
        objectif: "Faire passer un message secret à son équipe.",
        defi: "L’équipe qui transmet le message le plus vite gagne.",
        gps: "47.497700,-0.599700"
      },
      {
        titre: "Duel de Résistance",
        metaphore: "Le dernier debout gagne.",
        objectif: "Faire la planche le plus longtemps possible.",
        defi: "Celui qui tient la position le plus longtemps l’emporte.",
        gps: "47.498400,-0.600400"
      }
    ],
    archeologue: [
      {
        titre: "Duel des Découvreurs",
        metaphore: "La science avance par défi.",
        objectif: "Trouver un objet caché avant l’adversaire.",
        defi: "Premier à découvrir l’objet gagne.",
        gps: "47.499100,-0.601100"
      },
      {
        titre: "Quiz du Savoir",
        metaphore: "La connaissance est une arme redoutable.",
        objectif: "S’affronter sur des questions sur l’histoire ou l’archéologie.",
        defi: "Premier à répondre juste marque le point.",
        gps: "47.499800,-0.601800"
      },
      {
        titre: "Concours de Fouille",
        metaphore: "Le plus rapide trouve la trace du passé.",
        objectif: "Fouiller une zone en même temps, le plus rapide gagne.",
        defi: "Celui qui extrait l’objet le premier l’emporte.",
        gps: "47.500500,-0.602500"
      },
      {
        titre: "Mimes du Passé",
        metaphore: "L’histoire s’anime avec le corps.",
        objectif: "Deviner le plus de mimes historiques.",
        defi: "Celui qui fait deviner le plus d’objets ou personnages gagne.",
        gps: "47.501200,-0.603200"
      },
      {
        titre: "Duel de Reconstitution",
        metaphore: "La précision est la clé de la victoire.",
        objectif: "Reconstituer un puzzle ou un objet plus vite que l’adversaire.",
        defi: "Premier à finir la reconstitution remporte le duel.",
        gps: "47.501900,-0.603900"
      }
     ] 
  }
,


    // === Jeu du pendu ===
 {
  id: "pendu",
  nom: "Jeu du pendu",
  description: "Deviner un mot ou une phrase en proposant des lettres, chaque erreur rapproche de la défaite.",
  parametres: [
    { key: "mot", type: "text", label: "Mot ou phrase à deviner" },
    { key: "indice", type: "text", label: "Indice ou aide (facultatif)", optional: true }
  ],
  combinable: ["chrono"],
  preview: "texte",
  scenarios: {
    arthurien: [
      {
        titre: "Le Mot Secret du Graal",
        metaphore: "Un mot mal deviné, et la quête s’arrête.",
        objectif: "Deviner un mot mystère lié à la légende arthurienne.",
        defi: "Jouez au pendu : chaque mauvaise lettre rapproche de la défaite !",
        gps: "47.478300,-0.580300"
      },
      {
        titre: "La Sentence du Druide",
        metaphore: "Le druide ne tolère aucune erreur dans le mot sacré.",
        objectif: "Deviner le mot magique du druide.",
        defi: "Trouvez le mot lettre par lettre avant d’être pendu.",
        gps: "47.478900,-0.580900"
      },
      {
        titre: "L’Énigme du Chevalier",
        metaphore: "Un mot perdu, une armure rouillée.",
        objectif: "Découvrir le nom d’un chevalier caché.",
        defi: "Devinez le mot au pendu, sinon l’armure se brise.",
        gps: "47.479500,-0.581500"
      },
      {
        titre: "Le Sceau de Merlin",
        metaphore: "Le mot juste ouvre la porte magique.",
        objectif: "Deviner le mot de passe secret du magicien.",
        defi: "Chaque erreur rapproche de la malédiction du pendu.",
        gps: "47.480100,-0.582100"
      },
      {
        titre: "La Devise de Camelot",
        metaphore: "La devise oubliée doit ressurgir.",
        objectif: "Deviner la devise de Camelot.",
        defi: "Retrouvez la phrase complète avant d’être pendu.",
        gps: "47.480700,-0.582700"
      }
    ],
    pirate: [
      {
        titre: "Le Sésame du Trésor",
        metaphore: "Un mot de travers, et le trésor s’envole.",
        objectif: "Deviner le mot clé du coffre pirate.",
        defi: "Jouez au pendu version pirate pour gagner le butin.",
        gps: "47.481300,-0.583300"
      },
      {
        titre: "Le Cri du Perroquet",
        metaphore: "Le perroquet ne répète qu’aux bons devins.",
        objectif: "Trouver le nom du perroquet du capitaine.",
        defi: "Devinez le nom lettre par lettre avant d’être pendu.",
        gps: "47.481900,-0.583900"
      },
      {
        titre: "L’Île Mystérieuse",
        metaphore: "Un nom d’île perdu, et la carte est inutile.",
        objectif: "Deviner le nom de l’île au trésor.",
        defi: "Chaque erreur rapproche du naufrage du pendu.",
        gps: "47.482500,-0.584500"
      },
      {
        titre: "Le Navire Fantôme",
        metaphore: "Oublier le nom, c’est croiser la malédiction.",
        objectif: "Deviner le nom du navire pirate.",
        defi: "Jouez au pendu pour éviter la malédiction.",
        gps: "47.483100,-0.585100"
      },
      {
        titre: "Le Code du Capitaine",
        metaphore: "Un mauvais code, et c’est la planche.",
        objectif: "Deviner le code secret du capitaine.",
        defi: "Lettre après lettre, trouvez le mot avant la fin.",
        gps: "47.483700,-0.585700"
      }
    ],
    prison: [
      {
        titre: "La Liberté au Bout du Mot",
        metaphore: "Un mot mal deviné, et la cellule reste fermée.",
        objectif: "Trouver le mot clé pour s’évader.",
        defi: "Jouez au pendu pour ouvrir la porte.",
        gps: "47.484300,-0.586300"
      },
      {
        titre: "Le Mot du Complice",
        metaphore: "Le complice ne donne qu’un seul mot.",
        objectif: "Deviner le mot secret de l’évasion.",
        defi: "Chaque erreur prolonge la peine !",
        gps: "47.484900,-0.586900"
      },
      {
        titre: "Le Surnom du Directeur",
        metaphore: "Deviner le surnom, c’est amadouer le gardien.",
        objectif: "Trouver le surnom caché du directeur.",
        defi: "Trouvez le mot au pendu pour obtenir un indice.",
        gps: "47.485500,-0.587500"
      },
      {
        titre: "L’Objet Interdit",
        metaphore: "Le nom de l’objet interdit circule en secret.",
        objectif: "Deviner le nom d’un objet interdit en prison.",
        defi: "Trouvez le mot avant de vous faire attraper.",
        gps: "47.486100,-0.588100"
      },
      {
        titre: "La Devise de la Cour",
        metaphore: "Un mot d’ordre pour se rassembler.",
        objectif: "Trouver la devise des prisonniers.",
        defi: "Devinez la phrase au pendu avant la fin.",
        gps: "47.486700,-0.588700"
      }
    ],
    sorcier: [
      {
        titre: "L’Incantation Perdue",
        metaphore: "Un mot oublié et la magie s’éteint.",
        objectif: "Deviner une incantation magique.",
        defi: "Jouez au pendu : chaque erreur affaiblit le sort.",
        gps: "47.487300,-0.589300"
      },
      {
        titre: "Le Nom du Dragon",
        metaphore: "Nommer le dragon, c’est le dompter.",
        objectif: "Deviner le nom secret du dragon.",
        defi: "Lettre après lettre, trouvez le mot avant la défaite.",
        gps: "47.487900,-0.589900"
      },
      {
        titre: "La Potion Mystère",
        metaphore: "Une potion sans nom manque de pouvoir.",
        objectif: "Deviner le nom d’une potion magique.",
        defi: "Chaque mauvaise lettre rend la potion instable.",
        gps: "47.488500,-0.590500"
      },
      {
        titre: "Le Sceau du Mage",
        metaphore: "Deviner le mot protège la magie.",
        objectif: "Trouver le mot secret du mage.",
        defi: "Jouez au pendu pour révéler le sceau.",
        gps: "47.489100,-0.591100"
      },
      {
        titre: "La Devise du Cercle",
        metaphore: "Le cercle ne s’ouvre qu’au bon mot.",
        objectif: "Deviner la devise magique du cercle.",
        defi: "Devinez la phrase avant d’être éliminé.",
        gps: "47.489700,-0.591700"
      }
    ],
    super_heros: [
      {
        titre: "Le Nom du Super-Héros",
        metaphore: "Sans son nom, aucun pouvoir.",
        objectif: "Deviner le nom d’un super-héros.",
        defi: "Jouez au pendu pour révéler l’identité secrète.",
        gps: "47.490300,-0.592300"
      },
      {
        titre: "Le Nom du Vilain",
        metaphore: "Connaître l’ennemi, c’est le vaincre.",
        objectif: "Deviner le nom du méchant.",
        defi: "Chaque erreur rapproche du piège du vilain.",
        gps: "47.490900,-0.592900"
      },
      {
        titre: "Le Pouvoir Secret",
        metaphore: "Le pouvoir n’appartient qu’à celui qui le nomme.",
        objectif: "Deviner le nom d’un super-pouvoir.",
        defi: "Devinez le mot au pendu avant la défaite.",
        gps: "47.491500,-0.593500"
      },
      {
        titre: "Le QG Mystère",
        metaphore: "Trouver le lieu, c’est sauver la mission.",
        objectif: "Deviner le nom du QG caché.",
        defi: "Lettre après lettre, trouvez le mot avant la fin.",
        gps: "47.492100,-0.594100"
      },
      {
        titre: "Le Slogan de la Justice",
        metaphore: "La justice a toujours le dernier mot.",
        objectif: "Deviner un slogan de justicier.",
        defi: "Jouez au pendu pour trouver la devise.",
        gps: "47.492700,-0.594700"
      }
    ],
    zombie: [
      {
        titre: "Le Mot du Remède",
        metaphore: "Un mot oublié condamne l’équipe.",
        objectif: "Deviner le nom du remède.",
        defi: "Chaque erreur rapproche de la contamination.",
        gps: "47.493300,-0.595300"
      },
      {
        titre: "Le Refuge Secret",
        metaphore: "Le refuge n’ouvre qu’avec le bon mot.",
        objectif: "Deviner le nom du refuge.",
        defi: "Devinez le mot au pendu pour entrer dans la zone sûre.",
        gps: "47.493900,-0.595900"
      },
      {
        titre: "Nom de Code Survivant",
        metaphore: "Un code mal deviné attire la horde.",
        objectif: "Trouver le nom de code d’un survivant.",
        defi: "Jouez au pendu pour transmettre le code.",
        gps: "47.494500,-0.596500"
      },
      {
        titre: "L’Objet Vital",
        metaphore: "Un objet oublié, une équipe perdue.",
        objectif: "Deviner le nom d’un objet indispensable.",
        defi: "Trouvez le mot avant la fin du chrono.",
        gps: "47.495100,-0.597100"
      },
      {
        titre: "La Ville Maudite",
        metaphore: "Nommer la ville, c’est conjurer le sort.",
        objectif: "Deviner le nom de la ville infestée.",
        defi: "Chaque erreur rapproche de l’invasion.",
        gps: "47.495700,-0.597700"
      }
    ],
    archeologue: [
      {
        titre: "Le Site Mystère",
        metaphore: "Un site oublié à retrouver lettre par lettre.",
        objectif: "Deviner le nom d’un site archéologique.",
        defi: "Jouez au pendu pour dévoiler l’emplacement.",
        gps: "47.496300,-0.598300"
      },
      {
        titre: "L’Idole Sacrée",
        metaphore: "Nommer l’idole, c’est l’honorer.",
        objectif: "Deviner le nom d’une idole antique.",
        defi: "Chaque erreur fait perdre la trace du passé.",
        gps: "47.496900,-0.598900"
      },
      {
        titre: "La Civilisation Perdue",
        metaphore: "Un mot oublié, une civilisation disparue.",
        objectif: "Trouver le nom d’une civilisation ancienne.",
        defi: "Lettre après lettre, retrouvez le bon mot.",
        gps: "47.497500,-0.599500"
      },
      {
        titre: "Le Sceau Caché",
        metaphore: "Le sceau ne révèle son nom qu’aux persévérants.",
        objectif: "Deviner le nom d’un sceau archéologique.",
        defi: "Jouez au pendu pour révéler le secret.",
        gps: "47.498100,-0.600100"
      },
      {
        titre: "Le Manuscrit Oublié",
        metaphore: "Un mot retrouvé, une histoire sauvée.",
        objectif: "Deviner le titre d’un manuscrit ancien.",
        defi: "Chaque erreur efface un peu plus l’histoire.",
        gps: "47.498700,-0.600700"
      }
     ] 
  }
  },
