// catalogue-lancements.js

const LANCEMENT_TEXTE = {
  arthurien: [
    `Moi, Merlin l’Enchanteur, vous ai choisis pour une mission sacrée : la quête du Saint-Graal. Les ténèbres s’étendent sur le royaume, seul votre courage pourra ramener la lumière. Partez, chevaliers, et écrivez votre légende !`,
    `La Table Ronde vous attend. L’esprit d’Arthur veille sur vous : chaque épreuve est un pas vers la gloire éternelle. Serez-vous dignes de la couronne ? Que la quête commence !`,
    `Au cœur d’Avalon, la destinée s’éveille. Réunissez vos forces, domptez vos peurs, et partez à la conquête des mystères oubliés. Aujourd’hui, l’histoire s’écrit en votre nom.`,
    `Dans l’ombre des dragons et des sortilèges, les plus braves relèveront les défis de la légende. Seuls les vrais héros découvriront le secret du Graal ! Osez franchir la première étape…`,
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
