// catalogue-atmospheres.js

const ATMOSPHERE_QUESTS = {
  // PHOTOS
  photo: {
    arthurien: {
      titres: ["Quête du regard féérique","L’œil de Merlin","Souvenir d’Avalon","Lumière du Graal","Portraits des chevaliers"],
      phrases: [
        "Les souvenirs d’Avalon ne vivent que dans les images : saurez-vous capturer la magie du royaume ?",
        "C’est par l’œil du mage que s’ouvre la voie des héros.",
        "Un cliché peut révéler plus de secrets qu’un tome entier des druides.",
        "Chaque image rapproche votre équipe du Graal sacré.",
        "La lumière du Graal se reflète dans chaque photo prise par les braves."
      ]
    },
    pirate: {
      titres: ["Chasse à l’instant pirate","Regard du flibustier","Cliché de corsaire","Souvenir des mers","Trésors en images"],
      phrases: [
        "Les légendes des mers s’écrivent en clichés volés au vent salé.",
        "Un vrai pirate immortalise ses exploits et ses trouvailles.",
        "Le trésor n’est rien sans un portrait de l’aventure.",
        "Chaque image prise repousse la malédiction des îles perdues.",
        "Sans preuve, la fortune s’envole comme le vent marin."
      ]
    },
    prison: {
      titres: ["Regard d’évasion","Preuve du détenu","Lueur d’espoir","Ombres sur pellicule","Visages derrière les barreaux"],
      phrases: [
        "Dans l’ombre des barreaux, chaque preuve est une lueur d’espoir.",
        "Un cliché peut s’avérer précieux pour sortir d’ici vivant.",
        "Chaque photo renforce le plan d’évasion, soyez discret !",
        "Un visage, un geste, une faille : observez et capturez.",
        "L’appareil photo devient la clé de la liberté."
      ]
    },
    sorcier: {
      titres: ["L’œil du sorcier","Vision magique","Instant ensorcelé","Cliché surnaturel","Preuve pour le grimoire"],
      phrases: [
        "Les potions les plus puissantes naissent d’images insolites, volées au cœur du mystère.",
        "Une photo peut révéler l’invisible aux yeux profanes.",
        "Chaque cliché renforce votre apprentissage magique.",
        "L’image capturée nourrit les grimoires ancestraux.",
        "Saurez-vous trouver l’angle qui dévoile le secret ?"
      ]
    },
    super_heros: {
      titres: ["Dossier top secret","Preuve de mission","Instant de bravoure","Photo du QG","Flash héroïque"],
      phrases: [
        "Chaque cliché peut sauver la ville : soyez l’œil vigilant que le QG attend.",
        "Un héros n’a rien à cacher… sauf sa véritable identité.",
        "Le QG attend vos preuves pour activer la prochaine mission.",
        "Les alliés ont besoin d’une image pour y croire.",
        "La lumière du flash révèle parfois les dangers cachés."
      ]
    },
    zombie: {
      titres: ["Survivance en images","Trace des vivants","Cliché de l’apocalypse","Photo de survie","Instant crucial"],
      phrases: [
        "Un instant capturé, c’est un indice de plus pour survivre à l’apocalypse.",
        "Photographiez tout ce qui peut servir à sauver un survivant.",
        "Les images sont la mémoire des époques perdues.",
        "Un cliché vaut parfois une vie dans ce monde en ruines.",
        "La preuve photographique est rare… ne la gaspillez pas."
      ]
    },
    archeologue: {
      titres: ["Témoin du passé","Photo d’explorateur","Souvenir du site sacré","Cliché archéologique","Preuve pour le musée"],
      phrases: [
        "Chaque photo rapproche votre équipe du secret enfoui des anciens.",
        "Un bon archéologue ne part jamais sans son appareil.",
        "L’image du vestige est la clef de la découverte.",
        "Votre cliché servira de preuve pour la postérité.",
        "Un trésor n’est valide que s’il est immortalisé."
      ]
    }
  },

  photo_inconnus: {
    arthurien: {
      titres: ["Rencontres d’un autre temps","Portraits énigmatiques","Clichés mystérieux","Visages du royaume","Inconnus d’Avalon"],
      phrases: [
        "Croiser un inconnu, c’est peut-être rencontrer la destinée.",
        "Capturez l’essence de l’inconnu pour percer les secrets du royaume.",
        "Chaque inconnu cache une légende… Oserez-vous l’approcher ?",
        "Les visages inconnus sont parfois ceux des héros oubliés.",
        "Un cliché mystérieux vaut parfois plus que mille mots."
      ]
    },
    pirate: {
      titres: ["Portraits d’étrangers","Rencontres sur le quai","Inconnus du port","Mystérieux passagers","Visages du large"],
      phrases: [
        "Sur chaque quai, un inconnu peut changer le cours de la traversée.",
        "Les inconnus sont la clef des plus grands trésors.",
        "Un pirate sait reconnaître ceux qui valent la peine d’être approchés.",
        "Un visage mystérieux cache parfois une fortune.",
        "La mer regorge d’étrangers… à vous de les apprivoiser."
      ]
    },
    prison: {
      titres: ["Inconnus du bloc","Visiteurs imprévus","Portraits suspects","Rencontres du couloir","Mystères de la cour"],
      phrases: [
        "Chaque inconnu peut être un allié ou un danger.",
        "Observez discrètement pour ne pas attirer l’attention.",
        "La prison regorge de visages dont il faut se méfier.",
        "Un portrait peut devenir un atout pour l’évasion.",
        "Les inconnus ont parfois les clés de la liberté."
      ]
    },
    sorcier: {
      titres: ["Étrangers magiques","Visiteurs de l’ombre","Rencontres du sabbat","Cliché occulte","Mystère du cercle"],
      phrases: [
        "Un inconnu dans la forêt peut être un esprit ou un mage.",
        "Capturez la magie de la rencontre inattendue.",
        "Les visages inconnus portent souvent un message secret.",
        "L’ombre d’un sorcier en dit long sur ses pouvoirs.",
        "Le grimoire s’ouvre à ceux qui savent observer les autres."
      ]
    },
    super_heros: {
      titres: ["Témoin masqué","Rencontre super-héroïque","Étranger du QG","Mystère urbain","Visage du jour"],
      phrases: [
        "Un inconnu peut être un allié ou un ennemi caché.",
        "Votre mission : débusquer les héros sous couverture.",
        "Le QG surveille discrètement chaque nouveau venu.",
        "Le quotidien d’un super-héros est fait de rencontres mystérieuses.",
        "Photographiez l’inconnu pour lever le voile sur l’intrigue."
      ]
    },
    zombie: {
      titres: ["Inconnu infecté","Rencontres du chaos","Visages survivants","Cliché de l’urgence","Portrait apocalyptique"],
      phrases: [
        "Un inconnu peut cacher une morsure… soyez prudents.",
        "Dans l’apocalypse, chaque visage compte.",
        "Photographiez les survivants pour témoigner de leur passage.",
        "Un cliché peut sauver une vie ou révéler un danger.",
        "L’inconnu d’aujourd’hui est peut-être l’allié de demain."
      ]
    },
    archeologue: {
      titres: ["Rencontres sur le site","Portraits du passé","Visage du vestige","Inconnu de la fouille","Cliché d’expédition"],
      phrases: [
        "Un inconnu peut être porteur de tradition ou d’indice.",
        "Chaque rencontre sur le chantier est une nouvelle piste.",
        "Un portrait peut révéler l’origine d’un artefact.",
        "Les vestiges humains sont aussi précieux que les objets.",
        "Photographiez l’inconnu pour documenter la découverte."
      ]
    }
  },

  video: {
    arthurien: {
      titres: [
        "Preuve de bravoure","Acte héroïque filmé","Exploit du chevalier","Légende en images","Mémoire d’aventure"
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
        "Film de corsaire","Duel filmé","Vidéo de l’abordage","Mémoire du capitaine","Séquence des flibustiers"
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
        "Évasion en direct","Caméra cachée","Séquence clandestine","Vidéo d’alibi","Preuve audiovisuelle"
      ],
      phrases: [
        "Le moindre geste est surveillé : prouvez votre audace devant la caméra clandestine.",
        "Une vidéo peut servir d’alibi ou d’ultime preuve.",
        "Filmez votre plan, mais attention aux surveillants.",
        "Le dispositif secret attend d’être activé.",
        "L’image en mouvement sera votre passeport vers la sortie."
      ]
    },
    sorcier: {
      titres: [
        "Sort filmé","Rituel en vidéo","Enregistrement magique","Séance occulte","Preuve pour le grimoire"
      ],
      phrases: [
        "Une séquence filmée peut révéler la puissance cachée.",
        "Le grimoire attend la preuve de votre rituel.",
        "Chaque magie mérite d’être immortalisée.",
        "Les esprits ne croient qu’aux images mouvantes.",
        "Votre sort ne sera validé qu’en vidéo."
      ]
    },
    super_heros: {
      titres: [
        "Héroïsme filmé","Exploits en direct","Acte de bravoure","Sauvetage vidéo","Séquence du QG"
      ],
      phrases: [
        "C’est sous l’œil des caméras que naissent les légendes.",
        "Un vrai héros n’a pas peur de la lumière.",
        "Le QG compile les vidéos des meilleurs exploits.",
        "Votre vidéo sera diffusée à tous les justiciers.",
        "Le monde a besoin de voir ses héros à l’œuvre."
      ]
    },
    zombie: {
      titres: [
        "Preuve de survie","Vidéo d’alerte","Séquence apocalyptique","Filmé pour la postérité","Instant crucial"
      ],
      phrases: [
        "Un enregistrement vidéo peut sauver des vies.",
        "Prouvez à la communauté que vous êtes encore en vie.",
        "Chaque séquence compte dans ce monde dévasté.",
        "La preuve vidéo est la clef de la survie.",
        "Partagez votre lutte en images."
      ]
    },
    archeologue: {
      titres: [
        "Découverte filmée","Exploration en vidéo","Séance archéologique","Témoin du passé","Mémoire de fouille"
      ],
      phrases: [
        "Filmez votre découverte pour la science.",
        "Une vidéo permet de valider la trouvaille.",
        "Chaque scène filmée éclaire le passé.",
        "L’histoire se raconte aussi en vidéo.",
        "Votre témoignage servira aux générations futures."
      ]
    }
  },

  audio: {
    arthurien: {
      titres: [
        "Chant du barde","Écho de la forêt","Témoignage magique","Murmure d’Avalon","Message secret"
      ],
      phrases: [
        "Enregistrez la mélodie qui apaise les esprits d’Avalon.",
        "Votre voix sera le sésame des druides, parlez avec sagesse.",
        "Le barde attend votre chanson pour transmettre la légende.",
        "Un message audio peut déjouer les pièges magiques.",
        "Le sort ne s’active qu’à travers un écho sonore."
      ]
    },
    pirate: {
      titres: [
        "Chant du marin","Sifflement du vent","Murmure de la cale","Message du capitaine","Écho des flibustiers"
      ],
      phrases: [
        "Enregistrez un chant digne des plus grands pirates.",
        "Le vent portera votre message à l’équipage.",
        "Un bon pirate sait écouter et transmettre les rumeurs.",
        "Le capitaine n’obéit qu’aux chants courageux.",
        "Votre voix peut guider le navire vers le trésor."
      ]
    },
    prison: {
      titres: [
        "Appel du cachot","Message codé","Chuchotement discret","Témoignage du détenu","Écho de la liberté"
      ],
      phrases: [
        "Un simple murmure peut changer le destin d’un détenu.",
        "Chuchotez votre plan à travers les barreaux.",
        "Un message audio peut traverser les murs.",
        "Chaque parole enregistrée peut servir d’alibi.",
        "La liberté commence par un témoignage discret."
      ]
    },
    sorcier: {
      titres: [
        "Incantation sonore","Sortilège vocal","Chant occulte","Écho mystique","Enregistrement magique"
      ],
      phrases: [
        "Prononcez la formule et gravez-la dans le grimoire.",
        "Un sort ne fonctionne que s’il est bien prononcé.",
        "Chantez pour activer la magie des anciens.",
        "Les esprits ne croient qu’aux invocations enregistrées.",
        "Votre voix porte la puissance des arcanes."
      ]
    },
    super_heros: {
      titres: [
        "Message pour le QG","Slogan héroïque","Alerte sonore","Témoignage de mission","Enregistrement secret"
      ],
      phrases: [
        "Envoyez un message vocal à la base pour déclencher l’alerte.",
        "Votre cri de guerre inspirera toute l’équipe.",
        "Le QG attend votre rapport audio.",
        "Un vrai héros sait passer un message codé.",
        "Votre voix peut sauver la ville."
      ]
    },
    zombie: {
      titres: [
        "SOS sonore","Alerte des survivants","Écho apocalyptique","Message de détresse","Chuchotement de la survie"
      ],
      phrases: [
        "Un message audio peut attirer ou repousser les zombies.",
        "Prévenez vos alliés du danger à venir.",
        "Laissez une trace vocale de votre passage.",
        "Un appel de détresse peut sauver des vies.",
        "Dans le silence, un bruit peut tout changer."
      ]
    },
    archeologue: {
      titres: [
        "Enregistrement de terrain","Témoignage archéologique","Interview du passé","Notes vocales","Mémoire sonore"
      ],
      phrases: [
        "Enregistrez le témoignage pour la science.",
        "Chaque bruit du site est une découverte.",
        "Votre voix racontera l’histoire aux générations futures.",
        "Un bon archéologue ne quitte jamais le terrain sans son dictaphone.",
        "Le passé résonne dans chaque parole enregistrée."
      ]
    }
  },

  fichier: {
    arthurien: {
      titres: [
        "Parchemin sacré","Document perdu","Charte du royaume","Manuscrit secret","Lettre du mage"
      ],
      phrases: [
        "Transmettez le parchemin qui prouve votre valeur.",
        "Un document peut ouvrir les portes du château.",
        "Le secret du royaume se cache dans ces lignes.",
        "Chaque lettre porte un message crypté.",
        "Un vrai héros sait protéger la connaissance écrite."
      ]
    },
    pirate: {
      titres: [
        "Carte au trésor","Journal de bord","Lettre du capitaine","Document de butin","Papier d’abordage"
      ],
      phrases: [
        "La carte révèle le chemin vers la fortune.",
        "Chaque document trouvé est une victoire sur l’ennemi.",
        "Le capitaine n’abandonne jamais un papier précieux.",
        "Un pirate sait lire entre les lignes.",
        "Le journal de bord est la mémoire du navire."
      ]
    },
    prison: {
      titres: [
        "Ordre d’évasion","Lettre codée","Document du détenu","Note secrète","Dossier du directeur"
      ],
      phrases: [
        "Un document bien caché peut sauver votre peau.",
        "Les plans d’évasion passent parfois par les archives.",
        "La preuve écrite fait la différence au tribunal.",
        "Un mot sur papier peut être un appel à l’aide.",
        "Prenez garde à qui lit vos messages…"
      ]
    },
    sorcier: {
      titres: [
        "Grimoire oublié","Page ensorcelée","Manuscrit interdit","Formule écrite","Parchemin du mage"
      ],
      phrases: [
        "Chaque page peut receler une magie ancienne.",
        "Écrivez la formule pour activer le sort.",
        "Le grimoire n’accepte que les manuscrits authentiques.",
        "Une note magique peut changer le destin du groupe.",
        "Protégez vos secrets dans des parchemins bien gardés."
      ]
    },
    super_heros: {
      titres: [
        "Dossier confidentiel","Rapport du QG","Note stratégique","Fichier de mission","Message codé"
      ],
      phrases: [
        "Le QG n’accepte que les rapports en bonne et due forme.",
        "Un document secret peut sauver la ville.",
        "La mission n’est validée qu’avec le bon fichier.",
        "Protégez vos données des mains ennemies.",
        "Un héros garde toujours une copie de ses plans."
      ]
    },
    zombie: {
      titres: [
        "Journal de survie","Note d’alerte","Consigne apocalyptique","Dossier contaminé","Lettre du dernier jour"
      ],
      phrases: [
        "Consignez tout ce qui peut aider les survivants.",
        "Un journal peut sauver des vies.",
        "Chaque consigne écrite compte dans le chaos.",
        "Laissez une trace avant de partir.",
        "Un dossier bien caché peut contenir un remède."
      ]
    },
    archeologue: {
      titres: [
        "Rapport de fouille","Carnet d’expédition","Dossier scientifique","Note du découvreur","Lettre du passé"
      ],
      phrases: [
        "Transmettez vos découvertes aux générations futures.",
        "Un bon rapport fait avancer la science.",
        "Chaque note contribue à la réussite de l’expédition.",
        "Le carnet d’expédition est la mémoire du site.",
        "Rédigez comme un vrai archéologue !"
      ]
    }
  },

  collecte_objet: {
    arthurien: {
      titres: [
        "Chasse aux reliques","Collection du druide","Récolte sacrée","Trésor caché","Butin de la forêt"
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
        "Butin du flibustier","Butin du capitaine","Chasse au trésor","Récolte des mers","Trouvailles pirates"
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
        "Outils de la liberté","Récolte clandestine","Trouvaille du détenu","Butin de cellule","Objets d’espoir"
      ],
      phrases: [
        "Un caillou, une plume, une chance de s’évader… chaque trouvaille compte.",
        "Chaque objet trouvé peut servir à tromper la vigilance des gardiens.",
        "Le plan d’évasion commence par une bonne collecte.",
        "Les objets ramassés sont parfois plus utiles que les clés.",
        "Un œil attentif trouve toujours un outil pour s’échapper."
      ]
    },
    sorcier: {
      titres: [
        "Récolte magique","Ingrédients secrets","Butin du grimoire","Collecte d’artefacts","Trésors occultes"
      ],
      phrases: [
        "Cueillez les ingrédients pour la potion ancestrale.",
        "Chaque objet magique complète la formule.",
        "Le grimoire exige des artefacts rares.",
        "Un bon sorcier ne sort jamais sans sa sacoche.",
        "La réussite du sort dépend de votre collecte."
      ]
    },
    super_heros: {
      titres: [
        "Récupération héroïque","Collecte de gadgets","Butin du QG","Mission d’approvisionnement","Trouvailles stratégiques"
      ],
      phrases: [
        "Le QG a besoin de tous les gadgets pour l’opération.",
        "Un héros ne laisse jamais traîner un objet utile.",
        "Chaque trouvaille peut sauver la ville.",
        "Ramassez tout ce qui peut servir à la mission.",
        "Votre sac est la clef de la prochaine victoire."
      ]
    },
    zombie: {
      titres: [
        "Survie matérielle","Chasse à l’indice","Butin apocalyptique","Trophées de survivant","Collecte vitale"
      ],
      phrases: [
        "Parmi les ruines, seul le collecteur malin verra le jour se lever.",
        "Chaque objet trouvé augmente vos chances de survie.",
        "Rapportez tout ce qui peut servir : la pénurie est partout.",
        "Un bon survivant ne laisse rien au hasard.",
        "La collecte peut faire la différence entre la vie et la mort."
      ]
    },
    archeologue: {
      titres: [
        "Récolte d’artefacts","Butin du site","Découverte précieuse","Objets anciens","Trésors du passé"
      ],
      phrases: [
        "Chaque artefact trouvé éclaire le mystère du site.",
        "Un bon explorateur ne laisse rien derrière lui.",
        "Ramassez les objets pour compléter la collection du musée.",
        "Un artefact en main vaut mieux que dix sur le plan.",
        "Le passé se trouve parfois sous une simple pierre."
      ]
    }
  },

  gps: {
    arthurien: {
      titres: [
        "Boussole du Graal","Chemin du druide","Lieu sacré retrouvé","Périple d’Avalon","Marche des chevaliers"
      ],
      phrases: [
        "L’aventure vous attend au bout du chemin sacré.",
        "La boussole magique vous indique la bonne direction.",
        "Un vrai héros ne perd jamais le nord.",
        "Le Graal ne se trouve qu’en suivant les bonnes coordonnées.",
        "La forêt cache bien des secrets… à vous de les trouver."
      ]
    },
    pirate: {
      titres: [
        "Cap sur l’île au trésor","Route du capitaine","Destination secrète","Longitude du butin","Repère du flibustier"
      ],
      phrases: [
        "Suivez la carte pour ne pas finir à la dérive.",
        "Le trésor n’attend que les plus audacieux navigateurs.",
        "Le compas pointe vers la fortune.",
        "Changez de cap si le danger approche.",
        "Le repère secret n’est pas sur toutes les cartes."
      ]
    },
    prison: {
      titres: [
        "Itinéraire d’évasion","Point de rendez-vous","Trajet clandestin","Plan du surveillant","Destination espoir"
      ],
      phrases: [
        "Trouvez le point de sortie avant la ronde du gardien.",
        "L’itinéraire est semé d’embûches, soyez précis.",
        "Chaque pas vous rapproche de la liberté.",
        "Le trajet doit rester secret pour réussir.",
        "Un plan mal suivi peut vous ramener en cellule."
      ]
    },
    sorcier: {
      titres: [
        "Carte astrale","Chemin du pentacle","Lieu du rituel","Alignement magique","Trajet des arcanes"
      ],
      phrases: [
        "La magie guide vos pas à travers les étoiles.",
        "Un sorcier suit la carte céleste, pas les routes ordinaires.",
        "Le lieu du rituel ne se révèle qu’aux initiés.",
        "L’alignement parfait n’arrive qu’une fois par siècle.",
        "Trouvez le trajet mystique pour compléter le cercle."
      ]
    },
    super_heros: {
      titres: [
        "Coordonnées du QG","Trajet secret","Point de mission","Emplacement du danger","Itinéraire de secours"
      ],
      phrases: [
        "Le QG n’est accessible que par les vrais héros.",
        "Suivez le trajet balisé pour éviter les pièges.",
        "Chaque mission commence par le bon point de départ.",
        "Localisez le danger avant qu’il ne frappe.",
        "Un héros connaît toujours une issue de secours."
      ]
    },
    zombie: {
      titres: [
        "Route de la survie","Itinéraire d’évacuation","Chemin balisé","Point d’eau","Destination refuge"
      ],
      phrases: [
        "La route la plus courte n’est pas toujours la plus sûre.",
        "Évitez les zones infestées sur votre itinéraire.",
        "Un bon survivant balise toujours son chemin.",
        "Le point d’eau est vital, ne l’oubliez pas.",
        "Le refuge n’est jamais très loin… si vous savez où chercher."
      ]
    },
    archeologue: {
      titres: [
        "Point de fouille","Coordonnées du site","Trajet vers le passé","Chemin de la découverte","Marque du vestige"
      ],
      phrases: [
        "Suivez les coordonnées pour rejoindre l’équipe de fouille.",
        "Chaque site secret mérite d’être localisé précisément.",
        "Un bon archéologue ne se perd jamais sur le terrain.",
        "Le chemin du passé se trace à la boussole et au GPS.",
        "Repérez la marque du vestige pour orienter votre recherche."
      ]
    }
  },

  duel: {
  arthurien: {
    titres: [
      "Duel de preux",
      "Affrontement sacré",
      "Combat du Graal",
      "Épreuve du champion",
      "Face-à-face légendaire"
    ],
    phrases: [
      "Seul le plus vaillant triomphera.",
      "Un duel pour l’honneur du royaume.",
      "Lancez-vous dans un affrontement sans merci.",
      "La victoire sourit aux audacieux.",
      "Préparez-vous à défendre votre titre."
    ]
  },
  pirate: {
    titres: [
      "Duel sur le pont",
      "Affrontement de corsaires",
      "Combat pour le butin",
      "Duel de sabre",
      "Face-à-face marin"
    ],
    phrases: [
      "Le pont est le théâtre des plus grands duels.",
      "Un pirate ne recule devant aucun affrontement.",
      "Le butin revient au meilleur combattant.",
      "Aiguisez votre lame, le combat sera rude.",
      "Le duel décidera du capitaine."
    ]
  },
  prison: {
    titres: [
      "Affrontement du bloc",
      "Combat de détenus",
      "Duel du couloir",
      "Épreuve de force",
      "Face-à-face du cachot"
    ],
    phrases: [
      "La loi du plus fort règne ici.",
      "Le couloir accueille les règlements de comptes.",
      "Un duel peut changer la hiérarchie du bloc.",
      "Se défendre, c’est survivre.",
      "Le respect s’obtient par la victoire."
    ]
  },
  sorcier: {
    titres: [
      "Duel magique",
      "Affrontement occulte",
      "Combat des arcanes",
      "Épreuve du cercle",
      "Face-à-face ensorcelé"
    ],
    phrases: [
      "Les sorts fusent dans le cercle magique.",
      "Un duel de magie révèle le vrai pouvoir.",
      "L’énergie des arcanes désigne le vainqueur.",
      "Un sorcier doit toujours être prêt à se défendre.",
      "Préparez votre formule la plus puissante."
    ]
  },
  super_heros: {
    titres: [
      "Duel de justiciers",
      "Affrontement épique",
      "Combat du QG",
      "Épreuve des héros",
      "Face-à-face masqué"
    ],
    phrases: [
      "Le QG observe tous les duels.",
      "Un justicier n’a jamais peur du combat.",
      "Le duel déterminera le chef de mission.",
      "Montrez vos talents de super-héros.",
      "La victoire appartient au plus courageux."
    ]
  },
  zombie: {
    titres: [
      "Face-à-face de la survie",
      "Duel apocalyptique",
      "Combat pour la vie",
      "Affrontement du chaos",
      "Épreuve ultime"
    ],
    phrases: [
      "Chaque duel peut être une question de vie ou de mort.",
      "Le chaos impose sa propre loi du plus fort.",
      "Affrontez vos peurs pour survivre.",
      "Le courage fait la différence dans l’apocalypse.",
      "Un vrai survivant ne recule devant aucun obstacle."
    ]
  },
  archeologue: {
    titres: [
      "Duel des découvreurs",
      "Affrontement de fouille",
      "Combat pour le site",
      "Épreuve d’expertise",
      "Face-à-face scientifique"
    ],
    phrases: [
      "Les grands découvreurs s’affrontent pour la vérité.",
      "Parfois, il faut défendre sa trouvaille.",
      "L’expertise détermine le vainqueur du site.",
      "Un duel d’arguments fait avancer la science.",
      "La fouille révèle le meilleur archéologue."
    ]
  }
},

  chrono: {
  arthurien: {
    titres: [
      "Course contre le temps",
      "Défi de la clepsydre",
      "Sablier magique",
      "Épreuve de rapidité",
      "Compte à rebours du Graal"
    ],
    phrases: [
      "Le temps presse : chaque seconde compte.",
      "La victoire appartient aux plus rapides.",
      "Saurez-vous battre le sablier des druides ?",
      "Attention, la magie ne dure pas éternellement.",
      "Dépêchez-vous, la porte va se refermer !"
    ]
  },
  pirate: {
    titres: [
      "Course du capitaine",
      "Défi du sablier",
      "Chrono du butin",
      "Épreuve de rapidité marine",
      "Compte à rebours du trésor"
    ],
    phrases: [
      "Le butin n’attend pas les retardataires.",
      "Un vrai pirate sait agir vite.",
      "Le chrono détermine le chef d’équipage.",
      "Dépêchez-vous avant la marée.",
      "La fortune sourit aux rapides."
    ]
  },
  prison: {
    titres: [
      "Course du surveillant",
      "Défi du bloc",
      "Sablier de la liberté",
      "Épreuve chronométrée",
      "Compte à rebours de l’évasion"
    ],
    phrases: [
      "Le temps est compté avant la prochaine ronde.",
      "Une seconde de trop peut gâcher l’évasion.",
      "La rapidité est la clef de la liberté.",
      "Le sablier n’attend personne.",
      "Fuyez avant que la porte ne se referme."
    ]
  },
  sorcier: {
    titres: [
      "Chrono magique",
      "Course du rituel",
      "Défi du sablier mystique",
      "Épreuve de vitesse occulte",
      "Compte à rebours du cercle"
    ],
    phrases: [
      "La magie ne dure qu’un temps, agissez vite.",
      "Un sort raté coûte des secondes précieuses.",
      "Le sablier mystique dicte le rythme du rituel.",
      "Le cercle se referme rapidement.",
      "Le chrono décide du succès du sort."
    ]
  },
  super_heros: {
    titres: [
      "Course héroïque",
      "Défi du QG",
      "Chrono de la mission",
      "Épreuve de rapidité",
      "Compte à rebours du sauvetage"
    ],
    phrases: [
      "Un héros n’a pas une seconde à perdre.",
      "Le QG attend votre réussite rapide.",
      "La mission dépend de votre vitesse.",
      "Sauvez la ville avant la fin du chrono.",
      "La rapidité fait la différence entre victoire et défaite."
    ]
  },
  zombie: {
    titres: [
      "Course de la survie",
      "Défi apocalyptique",
      "Chrono du refuge",
      "Épreuve du dernier instant",
      "Compte à rebours pour la vie"
    ],
    phrases: [
      "Fuyez avant que les zombies n’arrivent.",
      "Chaque seconde de gagnée est une vie sauvée.",
      "Le refuge ferme ses portes bientôt.",
      "Agissez vite ou périssez.",
      "Le chrono décide entre mort et survie."
    ]
  },
  archeologue: {
    titres: [
      "Course du site",
      "Défi de la fouille",
      "Chrono de la découverte",
      "Épreuve de rapidité scientifique",
      "Compte à rebours du vestige"
    ],
    phrases: [
      "Le site ne reste pas ouvert longtemps.",
      "La découverte appartient aux plus rapides.",
      "Un archéologue pressé trouve plus d’artefacts.",
      "Le chrono de la fouille est lancé.",
      "Chaque minute compte pour la science."
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
