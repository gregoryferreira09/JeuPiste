// catalogue-atmospheres.js

const ATMOSPHERE_QUESTS = {
  photo: {
    arthurien: {
      titres: [
        "Quête du regard féérique",
        "L’œil de Merlin",
        "Souvenir d’Avalon",
        "Lumière du Graal",
        "Portraits des chevaliers"
      ],
      phrases: [
        "Les souvenirs d’Avalon ne vivent que dans les images : saurez-vous capturer la magie du royaume ?",
        "C’est par l’œil du mage que s’ouvre la voie des héros.",
        "Un cliché peut révéler plus de secrets qu’un tome entier des druides.",
        "Chaque image rapproche votre équipe du Graal sacré.",
        "La lumière du Graal se reflète dans chaque photo prise par les braves."
      ]
    },
    pirate: {
      titres: [
        "Chasse à l’instant pirate",
        "Regard du flibustier",
        "Cliché de corsaire",
        "Souvenir des mers",
        "Trésors en images"
      ],
      phrases: [
        "Les légendes des mers s’écrivent en clichés volés au vent salé.",
        "Un vrai pirate immortalise ses exploits et ses trouvailles.",
        "Le trésor n’est rien sans un portrait de l’aventure.",
        "Chaque image prise repousse la malédiction des îles perdues.",
        "Sans preuve, la fortune s’envole comme le vent marin."
      ]
    },
    prison: {
      titres: [
        "Regard d’évasion",
        "Preuve du détenu",
        "Lueur d’espoir",
        "Ombres sur pellicule",
        "Visages derrière les barreaux"
      ],
      phrases: [
        "Dans l’ombre des barreaux, chaque preuve est une lueur d’espoir.",
        "Un cliché peut s’avérer précieux pour sortir d’ici vivant.",
        "Chaque photo renforce le plan d’évasion, soyez discret !",
        "Un visage, un geste, une faille : observez et capturez.",
        "L’appareil photo devient la clé de la liberté."
      ]
    },
    sorcier: {
      titres: [
        "L’œil du sorcier",
        "Vision magique",
        "Instant ensorcelé",
        "Cliché surnaturel",
        "Preuve pour le grimoire"
      ],
      phrases: [
        "Les potions les plus puissantes naissent d’images insolites, volées au cœur du mystère.",
        "Une photo peut révéler l’invisible aux yeux profanes.",
        "Chaque cliché renforce votre apprentissage magique.",
        "L’image capturée nourrit les grimoires ancestraux.",
        "Saurez-vous trouver l’angle qui dévoile le secret ?"
      ]
    },
    super_heros: {
      titres: [
        "Dossier top secret",
        "Preuve de mission",
        "Instant de bravoure",
        "Photo du QG",
        "Flash héroïque"
      ],
      phrases: [
        "Chaque cliché peut sauver la ville : soyez l’œil vigilant que le QG attend.",
        "Un héros n’a rien à cacher… sauf sa véritable identité.",
        "Le QG attend vos preuves pour activer la prochaine mission.",
        "Les alliés ont besoin d’une image pour y croire.",
        "La lumière du flash révèle parfois les dangers cachés."
      ]
    },
    zombie: {
      titres: [
        "Survivance en images",
        "Trace des vivants",
        "Cliché de l’apocalypse",
        "Photo de survie",
        "Instant crucial"
      ],
      phrases: [
        "Un instant capturé, c’est un indice de plus pour survivre à l’apocalypse.",
        "Photographiez tout ce qui peut servir à sauver un survivant.",
        "Les images sont la mémoire des époques perdues.",
        "Un cliché vaut parfois une vie dans ce monde en ruines.",
        "La preuve photographique est rare… ne la gaspillez pas."
      ]
    },
    archeologue: {
      titres: [
        "Témoin du passé",
        "Photo d’explorateur",
        "Souvenir du site sacré",
        "Cliché archéologique",
        "Preuve pour le musée"
      ],
      phrases: [
        "Chaque photo rapproche votre équipe du secret enfoui des anciens.",
        "Un bon archéologue ne part jamais sans son appareil.",
        "L’image du vestige est la clef de la découverte.",
        "Votre cliché servira de preuve pour la postérité.",
        "Un trésor n’est valide que s’il est immortalisé."
      ]
    }
  },

  video: {
    arthurien: {
      titres: [
        "Preuve de bravoure",
        "Acte héroïque filmé",
        "Exploit du chevalier",
        "Légende en images",
        "Mémoire d’aventure"
      ],
      phrases: [
        "Seuls les exploits immortalisés pourront convaincre Merlin de votre valeur.",
        "La Table Ronde n’oublie jamais les prouesses filmées.",
        "Un héros se révèle dans l’action autant que dans la légende.",
        "Gravez votre nom dans l’histoire par une vidéo inoubliable.",
        "L’aventure ne vit que si elle est racontée… filmez-la !"
      ]
    },
    pirate: {
      titres: [
        "Film de corsaire",
        "Duel filmé",
        "Vidéo de l’abordage",
        "Mémoire du capitaine",
        "Séquence des flibustiers"
      ],
      phrases: [
        "Un vrai pirate laisse toujours une trace… surtout en vidéo !",
        "L’abordage ne s’oublie pas quand il est filmé.",
        "La légende s’écrit en images mouvantes.",
        "Seule la caméra peut prouver votre réussite.",
        "La mer aime ceux qui savent raconter leurs exploits."
      ]
    },
    prison: {
      titres: [
        "Évasion en direct",
        "Caméra cachée",
        "Séquence clandestine",
        "Vidéo d’alibi",
        "Preuve audiovisuelle"
      ],
      phrases: [
        "Le moindre geste est surveillé : prouvez votre audace devant la caméra clandestine.",
        "Une vidéo peut servir d’alibi ou d’ultime preuve.",
        "Filmez votre plan, mais attention aux surveillants.",
        "Le dispositif secret attend d’être activé.",
        "L’image en mouvement sera votre passeport vers la sortie."
      ]
    },
    super_heros: {
      titres: [
        "Héroïsme filmé",
        "Exploits en direct",
        "Acte de bravoure",
        "Sauvetage vidéo",
        "Séquence du QG"
      ],
      phrases: [
        "C’est sous l’œil des caméras que naissent les légendes.",
        "Un vrai héros n’a pas peur de la lumière.",
        "Le QG compile les vidéos des meilleurs exploits.",
        "Votre vidéo sera diffusée à tous les justiciers.",
        "Le monde a besoin de voir ses héros à l’œuvre."
      ]
    }
    // ... Ajoute d'autres modes si besoin
  },

  collecte_objet: {
    arthurien: {
      titres: [
        "Chasse aux reliques",
        "Collection du druide",
        "Récolte sacrée",
        "Trésor caché",
        "Butin de la forêt"
      ],
      phrases: [
        "Chaque objet est un vestige sacré : seul celui qui rassemble saura triompher.",
        "Les trésors d’Avalon sont parfois cachés dans la mousse ou sous les pierres.",
        "Ramenez ces artefacts pour gagner la faveur de la magie ancienne.",
        "Ceux qui trouvent les objets secrets s’attirent la bienveillance des esprits.",
        "Votre sacoche deviendra la légende de demain."
      ]
    },
    pirate: {
      titres: [
        "Butin du flibustier",
        "Butin du capitaine",
        "Chasse au trésor",
        "Récolte des mers",
        "Trouvailles pirates"
      ],
      phrases: [
        "Sur le sable ou dans la cale, le pirate rusé trouve des trésors là où d’autres voient des cailloux.",
        "Un objet rapporté peut sauver l’équipage tout entier.",
        "Rapportez vos trouvailles, et la fortune vous sourira.",
        "Le coffre du capitaine attend vos découvertes.",
        "Le vrai trésor est parfois sous vos pieds."
      ]
    },
    prison: {
      titres: [
        "Outils de la liberté",
        "Récolte clandestine",
        "Trouvaille du détenu",
        "Butin de cellule",
        "Objets d’espoir"
      ],
      phrases: [
        "Un caillou, une plume, une chance de s’évader… chaque trouvaille compte.",
        "Chaque objet trouvé peut servir à tromper la vigilance des gardiens.",
        "Le plan d’évasion commence par une bonne collecte.",
        "Les objets ramassés sont parfois plus utiles que les clés.",
        "Un œil attentif trouve toujours un outil pour s’échapper."
      ]
    },
    zombie: {
      titres: [
        "Survie matérielle",
        "Chasse à l’indice",
        "Butin apocalyptique",
        "Trophées de survivant",
        "Collecte vitale"
      ],
      phrases: [
        "Parmi les ruines, seul le collecteur malin verra le jour se lever.",
        "Chaque objet trouvé augmente vos chances de survie.",
        "Rapportez tout ce qui peut servir : la pénurie est partout.",
        "Un bon survivant ne laisse rien au hasard.",
        "La collecte peut faire la différence entre la vie et la mort."
      ]
    }
    // ... autres modes si besoin
  },

  // Ajoute ici tous les autres types de missions, toujours sur la même logique :
  // mot_de_passe, anagramme, puzzle_visuel, gps, audio, duel, chrono, defi_collectif, observation, etc.
  // Pour chaque type, crée un objet "mode" (arthurien, pirate, etc.), avec 5 titres et 5 phrases.

};

// Utilitaire pour tirer au hasard un titre/ambiance :
function getRandomAtmosphere(type, mode) {
  const titres = ATMOSPHERE_QUESTS?.[type]?.[mode]?.titres || [];
  const phrases = ATMOSPHERE_QUESTS?.[type]?.[mode]?.phrases || [];
  const titre = titres.length ? titres[Math.floor(Math.random() * titres.length)] : "";
  const phrase = phrases.length ? phrases[Math.floor(Math.random() * phrases.length)] : "";
  return { titre, phrase };
}

window.ATMOSPHERE_QUESTS = ATMOSPHERE_QUESTS;
window.getRandomAtmosphere = getRandomAtmosphere;
