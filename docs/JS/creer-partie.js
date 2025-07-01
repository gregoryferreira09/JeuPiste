// --- Configuration Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyD-BxBu-4ElCqbHrZPM-4-6yf1-yWnL1bI",
  authDomain: "murder-party-ba8d1.firebaseapp.com",
  databaseURL: "https://murder-party-ba8d1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "murder-party-ba8d1",
  storageBucket: "murder-party-ba8d1.firebasestorage.app",
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

// Mélange un tableau (Fisher-Yates)
function shuffle(array) {
  let a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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

  if (!scenarioCode) {
    alert("Veuillez choisir un scénario.");
    return;
  }

  if (isNaN(nombreJoueurs) || nombreJoueurs < 1 || nombreJoueurs > 12) {
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

  const parametresPartie = {
    nombreJoueurs,
    createur: uuid,
    scenarioCode: scenarioCode || ""
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
    // On utilise le scénario local (dans le JS)
    if (typeof SCENARIO_PAR_DEFAUT === "undefined") {
      alert("Scénario Parc Saint Nicolas manquant dans le code.");
      return;
    }
    scenarioToUse = SCENARIO_PAR_DEFAUT;

    // Stocke le scénario dans la partie (inchangé)
    await db.ref('parties/' + salonCode + '/scenario').set(scenarioToUse);

  } else {
    // On charge depuis Firebase
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

    // === LOGIQUE DE RÉPARTITION ALÉATOIRE DES POINTS GPS ET ÉPREUVES ===

    // 1. Récupérer la liste des points GPS et des épreuves à placer
    // À ADAPTER selon la structure de TES scénarios personnalisés :
    // Si scenarioToUse.pointsGPS et scenarioToUse.epreuves existent, utilise-les.
    let pointsGPS = scenarioToUse.pointsGPS || [];
    let epreuves = scenarioToUse.epreuves || [];

    // Sinon, extrait à partir du champ scenario (toutes les étapes)
    if ((!pointsGPS || pointsGPS.length === 0) && Array.isArray(scenarioToUse.scenario)) {
      pointsGPS = scenarioToUse.scenario
        .filter(etape => etape.type === "gps" && etape.params && etape.params.gps)
        .map(etape => ({ ...etape.params, type: "gps" }));
    }
    if ((!epreuves || epreuves.length === 0) && Array.isArray(scenarioToUse.scenario)) {
      epreuves = scenarioToUse.scenario
        .filter(etape => etape.type !== "gps" && etape.type !== "revelation" && etape.type !== "malus");
    }

    // 2. Détermine le nombre de points/épreuves à utiliser pour cette partie
    // Tu peux récupérer ces valeurs depuis un formulaire ou config, sinon on utilise tout :
    const nombrePointsAGarder = parseInt(formData.get("nombrePointsGPS"), 10) || pointsGPS.length;
    const nombreEpreuvesAPlacer = parseInt(formData.get("nombreEpreuves"), 10) || epreuves.length;

    if (pointsGPS.length < nombrePointsAGarder) {
      alert("Ce scénario ne comporte pas assez de points GPS pour générer une partie.");
      return;
    }
    if (epreuves.length < nombreEpreuvesAPlacer) {
      alert("Ce scénario ne comporte pas assez d'épreuves pour générer une partie.");
      return;
    }

    // 3. Sélectionner le sous-ensemble aléatoire demandé
    const pointsPartie = getRandomElements(pointsGPS, nombrePointsAGarder);
    const pointsMelanges = shuffle(pointsPartie);
    const epreuvesMelangees = shuffle(getRandomElements(epreuves, nombreEpreuvesAPlacer));

    // 4. Répartition sur les points : d'abord les épreuves, le reste en malus
    const repartition = pointsMelanges.map((point, idx) => {
      if (idx < epreuvesMelangees.length) {
        return { point, epreuve: epreuvesMelangees[idx], type: "epreuve" };
      } else {
        return { point, epreuve: null, type: "malus" };
      }
    });

    // 5. Générer le point d'arrivée (parmi les points GPS restants, ou au hasard)
    let arrivalPoint = null;
    const pointsRestants = pointsGPS.filter(p => !pointsMelanges.includes(p));
    if (pointsRestants.length > 0) {
      arrivalPoint = getRandomElements(pointsRestants, 1)[0];
    } else {
      arrivalPoint = getRandomElements(pointsGPS, 1)[0];
    }

    // 6. Construire le scénario pour la partie
    const scenarioJeu = {
      repartition, // tableau de {point, type, epreuve}
      arrivalPoint // point d'arrivée
    };

    // 7. Stocker la répartition/scénario dans la partie
    await db.ref('parties/' + salonCode + '/scenarioJeu').set(scenarioJeu);

    // Stocke aussi le scénario original pour référence
    await db.ref('parties/' + salonCode + '/scenario').set(scenarioToUse);
  }

  // GÉNÉRATION DES PERSONNAGES (exemple simple)
  let persosObj = {};
  for (let i = 0; i < nombreJoueurs; i++) {
    persosObj['perso' + i] = {};
  }
  await db.ref('parties/' + salonCode + '/personnages').set(persosObj);

  await db.ref('parties/' + salonCode + '/joueurs').push({
    uuid,
    pseudo
  });

  localStorage.setItem("parametresPartie", JSON.stringify(parametresPartie));
  localStorage.setItem("salonCode", salonCode);
  localStorage.setItem("nombreJoueurs", nombreJoueurs);

  window.location.href = "salon.html";
};
