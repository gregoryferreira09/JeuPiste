// gameflow-dynamique.js

// Récupère le scénario dynamique de la partie (pour toutes les équipes)
function getScenarioActuel(firebase, salonCode, callback) {
  firebase.database().ref('parties/' + salonCode + '/scenario').once('value', snap => {
    const scenario = snap.val();
    // Format attendu : { scenario: [ ... ] }
    if (scenario && Array.isArray(scenario.scenario)) {
      callback(scenario.scenario);
    } else if (Array.isArray(scenario)) {
      // Parfois, scenario est déjà un tableau
      callback(scenario);
    } else {
      alert("Scénario non trouvé ou mal formé !");
    }
  });
}

// Pour obtenir l’étape n du scénario dynamique
function getEpreuveDynamique(firebase, salonCode, numeroEpreuve, callback) {
  getScenarioActuel(firebase, salonCode, scenarioArray => {
    if (scenarioArray && scenarioArray[numeroEpreuve]) {
      callback(scenarioArray[numeroEpreuve]);
    } else {
      alert("Étape du scénario non trouvée !");
    }
  });
}

// Exemple d’utilisation :
// getScenarioActuel(firebase, salonCode, function(scenarioArray) {
//   // scenarioArray = [{...}, {...}, ...] (toutes les étapes)
//   // Pour la première étape : scenarioArray[0]
// });
