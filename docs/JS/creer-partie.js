// --- Configuration Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyD-BxBu-4ElCqbHrZPM-4-6yf1-yWnL1bI",
  authDomain: "murder-party-ba8d1.firebaseapp.com",
  databaseURL: "https://murder-party-ba8d1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "murder-party-ba8d1",
  storageBucket: "murder-party-ba8d1.appspot.com",
  messagingSenderId: "20295055805",
  appId: "1:20295055805:web:0963719c3f23ab7752fad4",
  measurementId: "G-KSBMBB7KMJ"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

firebase.auth().signInAnonymously().catch(function(error) {
  alert("Erreur d'authentification : " + error.message);
});

// --- Attente robuste de l'auth avant écriture ---
function attendreAuthFirebase() {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        unsubscribe();
        resolve(user);
      }
    });
    setTimeout(() => reject(new Error("Timeout Auth Firebase")), 10000);
  });
}

// Génère un UUID v4
function generateUUID() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

// Fonction utilitaire pour tirer N éléments aléatoires d'un tableau, sans doublons
function getRandomElements(arr, n) {
  if (!Array.isArray(arr)) return [];
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

// Charge dynamiquement la liste des scénarios dans le sélecteur
document.addEventListener("DOMContentLoaded", function() {
  const select = document.getElementById('scenarioSelect');
  select.innerHTML = '<option value="">-- Choisissez un scénario --</option><option value="parc_saint_nicolas">Parc Saint Nicolas</option>';

  // Charge les scénarios personnalisés depuis Firebase
  db.ref('scenariosList').once('value').then(snap => {
    if (snap.exists()) {
      snap.forEach(child => {
        const data = child.val();
        const opt = document.createElement('option');
        opt.value = data.code;
        opt.textContent = data.nom ? data.nom + " (" + data.code + ")" : data.code;
        select.appendChild(opt);
      });
    }
    // === Pré-sélection du dernier scénario créé ===
    const dernier = localStorage.getItem("dernierScenarioCree");
    if (dernier) {
      Array.from(select.options).forEach(opt => {
        if (opt.value.toLowerCase() === dernier.toLowerCase()) {
          select.value = opt.value;
        }
      });
      localStorage.removeItem("dernierScenarioCree");
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var main = document.querySelector('.fadeIn');
  if (main) main.classList.add('visible');
});

// ======= SCENARIO PARC SAINT NICOLAS EN LOCAL =======
window.SCENARIO_PAR_DEFAUT = {
  scenario: [
    { type: "gps", params: { consigne: "Va à l'entrée du parc", gps: "47.4712,-0.5523" } },
    { type: "photo", params: { consigne: "Prends une photo de la statue" } },
    { type: "enigme", params: { consigne: "Résous cette énigme : Je suis grand quand je suis jeune et petit quand je suis vieux. Qui suis-je ?", solution: "une bougie" } },
    { type: "observation", params: { consigne: "Note le nombre de bancs autour du grand arbre", solution: "4" } },
    { type: "mot_de_passe", params: { consigne: "Trouve le mot de passe caché sur le panneau", solution: "parc" } },
    { type: "gps", params: { consigne: "Rends-toi au kiosque", gps: "47.4713,-0.5530" } },
    { type: "revelation", params: { consigne: "Bravo, tu as terminé le parcours !" } }
  ]
};
// ====================================================

window.creerPartie = async function(formData) {
  await attendreAuthFirebase();

  const nombreJoueurs = parseInt(formData.get("nombreJoueurs"), 10);
  const scenarioCode = formData.get("scenarioSelect");
  const dureeMinutes = parseInt(formData.get("game-duration"), 10);
  // Gestion de la case à cocher "Afficher la carte"
  const showMap = formData.get("show-map") === "on";

  if (!scenarioCode) {
    alert("Veuillez choisir un scénario.");
    return;
  }

  if (isNaN(nombreJoueurs) || nombreJoueurs < 1 || nombreJoueurs > 12 
   || isNaN(dureeMinutes) || dureeMinutes < 1) {
    alert("Veuillez remplir tous les champs correctement.");
    return;
  }

  // GESTION DU JOUEUR
  let uuid = localStorage.getItem("uuid");
  if (!uuid) {
    uuid = generateUUID();
    localStorage.setItem("uuid", uuid);
  }
  let pseudo = localStorage.getItem("pseudo") || "Anonyme";
  pseudo = pseudo.replace(/[<>\/\\'"`]/g, "").trim().substring(0, 30);

  if (!pseudo || pseudo.toLowerCase() === "anonyme" || pseudo.toLowerCase() === "invité") {
    alert("Merci de choisir un pseudo valide avant de créer une partie !");
    window.location.href = "profil-joueur.html";
    return;
  }

  const parametresPartie = {
    nombreJoueurs,
    createur: uuid,
    scenarioCode: scenarioCode || "",
    dureeMinutes,         // Enregistre la durée
    showMap               // Enregistre le choix d'affichage carte
  };

  // Génère un code salon unique pour la partie (toujours nouveau)
  const salonCode = Math.random().toString(36).substr(2, 6).toUpperCase();

  // *** SUPPRESSION DE L'ANCIEN SALON SI EXISTANT ***
  await db.ref('parties/' + salonCode).remove();

  // Enregistre les paramètres dans Firebase
  await db.ref('parties/' + salonCode + '/parametres').set(parametresPartie);

  // --- Gestion du SCÉNARIO ---
  let scenarioToUse = null;

  if (scenarioCode === "parc_saint_nicolas") {
    if (typeof SCENARIO_PAR_DEFAUT === "undefined") {
      alert("Scénario Parc Saint Nicolas manquant dans le code.");
      return;
    }
    scenarioToUse = SCENARIO_PAR_DEFAUT;
  } else {
    const snap = await db.ref('scenarios/' + scenarioCode).once('value');
    if (!snap.exists()) {
      alert("Scénario sélectionné introuvable.");
      return;
    }
    scenarioToUse = snap.val();
    if (scenarioToUse && scenarioToUse.scenario && !Array.isArray(scenarioToUse.scenario)) {
      scenarioToUse.scenario = Object.values(scenarioToUse.scenario);
    }
    if (!scenarioToUse || !Array.isArray(scenarioToUse.scenario) || scenarioToUse.scenario.length === 0) {
      alert("Le scénario est vide ou mal formé.");
      return;
    }
  }

  // Stocke le scénario dans la partie
  await db.ref('parties/' + salonCode + '/scenario').set(scenarioToUse);

  // Répartition des missions (copie)
  const repartition = scenarioToUse.scenario.map(epreuve => ({ ...epreuve }));
  await db.ref('parties/' + salonCode + '/scenarioJeu/repartition').set(repartition);

  // GESTION GPS : mapping mission/points GPS
  let gpsPoints = scenarioToUse.gpsPoints || (scenarioToUse.scenario && scenarioToUse.scenario.gpsPoints) || [];
  if (!Array.isArray(gpsPoints) || gpsPoints.length === 0) {
    if (scenarioToUse && scenarioToUse.scenario && Array.isArray(scenarioToUse.scenario)) {
      gpsPoints = [];
      scenarioToUse.scenario.forEach(etape => {
        if (etape && etape.params && etape.params.gps) {
          const [lat, lng] = etape.params.gps.split(',').map(Number);
          if (!isNaN(lat) && !isNaN(lng)) gpsPoints.push({lat, lng});
        }
      });
    }
  }
  const nbMissions = repartition.length;
  const nbGPS = gpsPoints.length;
  let finalGpsIndex = null;
  let jetonMissionsMapping = [];

  if (nbGPS > nbMissions) {
    finalGpsIndex = nbGPS - 1;
    jetonMissionsMapping = Array(nbGPS).fill(-1);
    let indices = [...Array(nbGPS).keys()].filter(i => i !== finalGpsIndex);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    for(let m=0; m<nbMissions; m++) {
      jetonMissionsMapping[indices[m]] = m;
    }
  } else {
    jetonMissionsMapping = [...Array(nbGPS).keys()].map(i => i < nbMissions ? i : -1);
    finalGpsIndex = -1;
  }
  await db.ref('parties/' + salonCode + '/jetonMissionsMapping').set(jetonMissionsMapping);
  await db.ref('parties/' + salonCode + '/finalGpsIndex').set(finalGpsIndex);

  // GÉNÉRATION DES PERSONNAGES (exemple simple)
  let persosObj = {};
  for (let i = 0; i < nombreJoueurs; i++) {
    persosObj['perso' + i] = {};
  }
  await db.ref('parties/' + salonCode + '/personnages').set(persosObj);

  // AJOUT DU JOUEUR AVEC PSEUDO ET UUID BIEN REMPLIS
  await db.ref('parties/' + salonCode + '/joueurs').push({
    uuid,
    pseudo
  });

  // Enregistre aussi en localStorage pour le client
  localStorage.setItem("parametresPartie", JSON.stringify(parametresPartie));
  localStorage.setItem("salonCode", salonCode);
  localStorage.setItem("nombreJoueurs", nombreJoueurs);
  localStorage.setItem("dureeMinutes", dureeMinutes);
  localStorage.setItem("showMap", showMap ? "1" : "0");

  window.location.href = "salon.html";
};
