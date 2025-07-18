// Les parcours possibles (mise à jour)
window.parcoursEquipes = [
  [1, 2, 5, 3, 4, 6, 7], // 6 = epreuve6, 7 = révélation
  [2, 4, 3, 5, 1, 6, 7],
  [3, 1, 4, 2, 5, 6, 7],
  [4, 5, 2, 1, 3, 6, 7],
  [5, 3, 1, 4, 2, 6, 7]
];

// Fonction utilitaire pour mélanger un tableau
function shuffleArray(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Initialisation du mapping parcours <=> équipes (à appeler UNE FOIS au démarrage de la partie)
function initialiserMappingParcours(firebase, salonCode, nombreEquipes) {
  // On mélange les indices de parcours
  let indices = [...Array(window.parcoursEquipes.length).keys()];
  let tirage = shuffleArray(indices).slice(0, nombreEquipes);

  let cheminsParEquipe = {};
  for (let i = 0; i < nombreEquipes; i++) {
    cheminsParEquipe[i] = tirage[i];
  }
  // Écrit le mapping dans Firebase
  firebase.database().ref('parties/' + salonCode + '/cheminsParEquipe').set(cheminsParEquipe);
}

// Récupère le parcours de l'équipe courante pour cette partie
function getParcoursEquipeCourante(firebase, salonCode, equipeNum, callback) {
  firebase.database().ref('parties/' + salonCode + '/cheminsParEquipe').once('value', snap => {
    const mapping = snap.val() || {};
    const parcoursIdx = mapping[equipeNum];
    const parcours = window.parcoursEquipes[parcoursIdx];
    callback(parcours);
  });
}

// Exemple d'utilisation pour la navigation (dans chaque page d'énigme) :
/*
const salonCode = localStorage.getItem("salonCode");
const equipeNum = localStorage.getItem("equipeNum");
getParcoursEquipeCourante(firebase, salonCode, equipeNum, function(parcours) {
  // parcours = tableau d'énigmes à suivre pour cette équipe
  // navigation...
});
*/
