// catalogue-lancements.js

const LANCEMENT_TEXTE = {
  arthurien: [
    `Moi, Merlin l’Enchanteur, vous ai choisis pour une mission sacrée : la quête du Saint-Graal. Les ténèbres s’étendent sur le royaume, seul votre courage pourra ramener la lumière. Préparez-vous à entrer dans la légende.`,
    `La Table Ronde vous attend. L’esprit d’Arthur veille sur vous : chaque épreuve est un pas vers la gloire éternelle. Serez-vous dignes de la couronne ? Que la quête commence !`,
    `Au cœur d’Avalon, la destinée s’éveille. Réunissez vos forces, domptez vos peurs, et partez à la conquête des mystères oubliés. Aujourd’hui, l’histoire s’écrit en votre nom.`,
    `Dans l’ombre des dragons et des sortilèges, les plus braves relèveront les défis de la légende. Seuls les vrais héros découvriront le secret du Graal ! Osez franchir la première étape.`,
    `Le royaume est en péril, mais l’espoir renaît. Chevaliers, levez vos épées, unissez vos âmes : l’aventure commence ici, sur les traces de la magie et de l’honneur !`
  ],
  pirate: [
    `Larguez les amarres ! Une carte mystérieuse vous mène vers l’île aux trésors. Seuls les pirates les plus rusés survivront aux tempêtes et déjoueront les pièges… Prêts à embarquer ?`,
    `Le capitaine Flint a lancé le défi : retrouver le butin perdu ! Que la chasse au trésor commence, entre abordages, trahisons et rires de flibustiers !`,
    `À l’horizon se dessine une aventure pleine de dangers et de richesses insoupçonnées. L’équipage est réuni : hissez la grand-voile et partez conquérir l’inconnu !`,
    `Le vent souffle fort sur le pont du navire. Rassemblez vos moussaillons, affûtez vos sabres : l’or des mers n’attend que vous… Cap sur l’aventure !`,
    `Un vieux parchemin promet la fortune à qui saura décoder ses mystères. Les pirates les plus téméraires seuls reviendront, auréolés de gloire. Serez-vous de ceux-là ?`
  ],
  prison: [
    `Derrière ces murs, un plan d’évasion se prépare. Tactique, discrétion et solidarité seront vos armes. Franchirez-vous les obstacles et goûterez-vous à la liberté ?`,
    `Les sirènes retentissent. C’est le moment de tenter l’impossible : une évasion digne des plus grands ! Coopérez, improvisez et déjouez la vigilance des gardiens !`,
    `La routine de la prison vole en éclats. Ce soir, quelque chose se trame… Serez-vous les cerveaux de la prochaine grande évasion ? À vous de jouer !`,
    `Un message codé circule entre les cellules. Seuls les plus malins s’en sortiront. Alliez vos forces, découvrez le passage secret et foncez vers la sortie !`,
    `Le compte à rebours a commencé. Saurez-vous unir vos talents pour tromper le système et retrouver la liberté ? Chaque étape vous rapproche de la délivrance !`
  ],
  sorcier: [
    `La cloche retentit à l’école de magie. Une énigme ancestrale attend d’être résolue… Oserez-vous percer les secrets des anciens et devenir de véritables sorciers ?`,
    `Les couloirs bruissent de sortilèges et de murmures. Aujourd’hui, une quête magique s’offre à vous : potions, runes et mystères n’auront bientôt plus de secrets !`,
    `Le grand maître a laissé un grimoire énigmatique. Traverserez-vous les pièges et relèverez-vous les défis pour décrocher votre diplôme de sorcellerie ?`,
    `Les baguettes sont prêtes, les chaudrons bouillonnent. L’aventure commence : prouvez que vous êtes dignes de rejoindre le cercle des initiés !`,
    `Au détour des escaliers mouvants, de grandes découvertes vous attendent. Saurez-vous utiliser vos pouvoirs pour résoudre l’ultime épreuve ?`
  ],
  super_heros: [
    `Une menace plane sur la ville ! L’équipe des héros est appelée à la rescousse. Serez-vous ceux qui sauveront le monde d’une catastrophe certaine ?`,
    `Le QG vous contacte : une mission spéciale attend des justiciers hors pair. Coopérez, utilisez vos super-pouvoirs, et entrez dans la légende !`,
    `Les alarmes retentissent, les vilains sont de sortie. Seule une équipe soudée pourra contrer leurs plans diaboliques. Enfilez vos costumes et foncez sauver les innocents !`,
    `Il est temps de prouver votre valeur. Les citoyens comptent sur vous : unissez vos forces, affrontez le chaos et montrez de quoi vous êtes capables !`,
    `Les écrans s’illuminent au QG : une opération top secrète débute maintenant. Héros, l’heure de l’action a sonné !`
  ],
  zombie: [
    `Les morts marchent à nouveau… Il faut survivre, trouver des ressources, et ne faire confiance à personne. Saurez-vous échapper à l’invasion ?`,
    `La nuit tombe, les gémissements résonnent. En équipe, fouillez, coopérez, et tenez bon jusqu’au prochain matin. La survie ne tient qu’à un fil !`,
    `L’apocalypse est là. Le refuge est loin, les zombies partout. Pourrez-vous résoudre les énigmes et atteindre la zone sûre avant qu’il ne soit trop tard ?`,
    `Un antidote existe, dit-on… mais il faut le trouver ! Chaque épreuve franchie augmente vos chances de voir l’aube. Serez-vous les derniers survivants ?`,
    `L’instinct de survie est votre meilleur allié. Faites preuve de sang-froid, d’audace et d’intelligence : l’humanité compte sur vous !`
  ],
  archeologue: [
    `Une mystérieuse expédition s’ouvre devant vous. Reliques, énigmes et dangers jalonnent le chemin. Serez-vous à la hauteur des plus grands explorateurs ?`,
    `Les temples anciens murmurent leurs secrets. Munis de vos carnets et de votre flair, partez à la recherche de trésors oubliés !`,
    `Les sables du temps vous mettent au défi. Percez les mystères enfouis et écrivez une nouvelle page de l’histoire !`,
    `La jungle est dense, les ruines vous attendent. Seuls les plus perspicaces reviendront avec la découverte du siècle !`,
    `Les cartes anciennes parlent d’un artefact unique. Saurez-vous déchiffrer les indices et le retrouver avant les autres ?`
  ]
};

// Objectifs dynamiques pour chaque thème
const OBJECTIF_TEXTE = {
  arthurien: [
    "Soyez les premiers à découvrir le Saint-Graal avant vos rivaux.",
    "Parvenez à déjouer les pièges de Merlin et gagnez la faveur du royaume.",
    "Relevez les défis de Camelot et entrez dans la légende.",
    "Rassemblez vos chevaliers et partez à la conquête du Graal sacré.",
    "Faites preuve de bravoure pour triompher des ombres du royaume.",
    "Affrontez les autres équipes dans une quête épique et montrez que vous êtes les véritables élus du Graal."
  ],
  pirate: [
    "Atteignez le trésor caché avant tous les autres équipages.",
    "Surpassez les pièges de l’île maudite et devenez le plus célèbre pirate.",
    "Récupérez la carte secrète et prenez la mer pour la gloire.",
    "Formez votre équipage et partez à la chasse au trésor légendaire.",
    "Déjouez vos adversaires pour devenir le capitaine incontesté des mers.",
    "Faites la course contre les autres pirates : seul l’équipage le plus rapide et malin mettra la main sur le butin !"
  ],
  prison: [
    "Soyez la première équipe à vous évader sans vous faire repérer.",
    "Déjouez la vigilance des gardiens et reprenez votre liberté.",
    "Mettez en œuvre le plan d’évasion parfait, en équipe.",
    "Faites preuve de discrétion et de stratégie pour sortir les premiers.",
    "Évadez-vous avant que l’alerte générale ne soit donnée.",
    "Un seul groupe réussira à s’échapper : serez-vous plus rapides et plus malins que vos rivaux de cellule ?"
  ],
  sorcier: [
    "Remportez le titre de meilleur sorcier en résolvant tous les mystères.",
    "Maîtrisez les sortilèges et décrochez le diplôme suprême de magie.",
    "Devenez l’apprenti préféré du grand maître en réussissant chaque épreuve.",
    "Collectez les ingrédients secrets et révélez la formule ultime.",
    "Soyez l’élève qui percera tous les secrets de l’école de magie.",
    "Affrontez les autres sorciers dans une compétition magique où un seul groupe pourra accéder au cercle des élus."
  ],
  super_heros: [
    "Sauvez la ville en neutralisant la menace le plus rapidement possible.",
    "Mettez vos super-pouvoirs à l’épreuve pour sauver l’humanité.",
    "Formez la meilleure équipe de héros et déjouez les plans des vilains.",
    "Protégez les innocents et restaurez la paix dans la cité.",
    "Devenez la légende qui aura sauvé le monde du chaos.",
    "Affrontez les autres équipes de super-héros : soyez les premiers à repousser la menace et à entrer dans la légende."
  ],
  zombie: [
    "Survivez plus longtemps que les autres équipes à l’invasion.",
    "Trouvez l’antidote et sauvez l’humanité de l’extinction.",
    "Atteignez la zone sûre avant que les zombies ne prennent le dessus.",
    "Rassemblez les ressources et échappez à l’apocalypse.",
    "Faites preuve de sang-froid pour être les derniers survivants.",
    "C’est une course pour la survie : la première équipe à s’en sortir vivra, les autres deviendront des proies…"
  ],
  archeologue: [
    "Devenez le premier à découvrir le trésor oublié des anciens.",
    "Résolvez les énigmes et rapportez la relique la plus précieuse.",
    "Percez les mystères du site archéologique avant les autres.",
    "Traversez les pièges et gagnez la reconnaissance des explorateurs.",
    "Écrivez votre nom dans l’histoire en trouvant l’artefact légendaire.",
    "Faites la course avec les autres équipes : seul le plus rapide sortira avec le trésor tant convoité !"
  ]
};

// Règles dynamiques avec le nombre de quêtes à insérer
const REGLES_TEXTE = {
  arthurien: [
    "Vous devrez accomplir {N} quêtes pour prouver votre valeur de chevaliers.",
    "Réussissez les {N} épreuves pour accéder à la salle du Graal.",
    "Seuls ceux qui terminent les {N} quêtes pourront prétendre à la victoire.",
    "Chaque quête réussie vous rapprochera du Graal, il y en a {N} au total.",
    "{N} défis vous attendent, seuls les plus valeureux triompheront."
  ],
  pirate: [
    "Parcourez {N} épreuves pour atteindre le trésor caché.",
    "Seuls les équipages ayant réussi {N} défis pourront réclamer la fortune.",
    "Chaque énigme résolue vous rapproche du but – il y en a {N} à surmonter.",
    "Affrontez {N} aventures pour devenir la légende des mers.",
    "{N} étapes vous séparent du trésor, ne relâchez pas vos efforts !"
  ],
  prison: [
    "Pour vous évader, il faudra réussir {N} étapes sans vous faire prendre.",
    "Chaque équipe doit franchir {N} obstacles pour sortir de prison.",
    "Le plan d’évasion comporte {N} missions à accomplir en secret.",
    "Réussissez les {N} actions clés pour ouvrir la porte de la liberté.",
    "Seuls ceux qui passent les {N} checkpoints seront libres !"
  ],
  sorcier: [
    "La réussite de {N} épreuves magiques est indispensable pour décrocher le diplôme.",
    "Vous devrez résoudre {N} énigmes pour être admis dans le cercle des initiés.",
    "Seuls ceux qui maîtrisent les {N} sorts peuvent prétendre au titre de sorcier suprême.",
    "Traversez {N} salles mystiques pour révéler votre potentiel.",
    "{N} défis magiques vous attendent dans l’école."
  ],
  super_heros: [
    "Résolvez {N} situations de crise pour sauver la ville.",
    "Chaque équipe de héros devra relever {N} défis pour triompher du mal.",
    "Votre mission comporte {N} étapes décisives.",
    "Vainquez {N} menaces pour rétablir l’ordre.",
    "{N} interventions héroïques sont nécessaires pour gagner."
  ],
  zombie: [
    "Pour survivre, vous devrez surmonter {N} épreuves.",
    "Chaque équipe doit franchir {N} étapes avant la tombée de la nuit.",
    "Les survivants seront ceux qui réussiront {N} missions.",
    "Il faudra résoudre {N} situations critiques pour atteindre la zone sûre.",
    "{N} défis séparent votre équipe du salut."
  ],
  archeologue: [
    "Percez les {N} énigmes du site pour espérer découvrir le trésor.",
    "Chaque équipe devra franchir {N} obstacles pour remporter la victoire.",
    "Les plus grands explorateurs réussissent {N} missions.",
    "Seuls ceux qui résolvent les {N} étapes peuvent prétendre à la découverte.",
    "{N} indices mènent à la relique, saurez-vous tous les trouver ?"
  ]
};
