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
  // Ajoute "Parc Saint Nicolas" par défaut (valeur vide)
  select.innerHTML = '<option value="">Parc Saint Nicolas (scénario de base)</option>';

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
  });
});

// Fonction globale accessible depuis l'extérieur
window.creerPartie = async function(formData) {
  const mode = formData.get("mode");
  const nombreJoueurs = parseInt(formData.get("nombreJoueurs"), 10);
  const scenarioCode = formData.get("scenarioSelect");

  if (!mode || isNaN(nombreJoueurs) || nombreJoueurs < 1 || nombreJoueurs > 12) {
    alert("Veuillez remplir tous les champs correctement.");
    return;
  }

  let uuid = localStorage.getItem("uuid");
  if (!uuid) {
    uuid = generateUUID();
    localStorage.setItem("uuid", uuid);
  }

  let pseudo = localStorage.getItem("pseudo") || "Anonyme";
  pseudo = pseudo.replace(/[<>\/\\'"`]/g, "").trim().substring(0, 30);

  const parametresPartie = {
    mode,
    nombreJoueurs,
    createur: uuid
  };

  // Génère un code salon unique pour la partie (toujours nouveau)
  const salonCode = (Math.random().toString(36).substr(2, 6)).toUpperCase();

  // Enregistre les paramètres dans Firebase
  await db.ref('parties/' + salonCode + '/parametres').set(parametresPartie);

  // --- Gestion du SCÉNARIO ---
  let scenarioToUse = null;

  if (scenarioCode) {
    // L'utilisateur choisit un scénario personnalisé
    const snap = await db.ref('scenarios/' + scenarioCode).once('value');
    if (!snap.exists()) {
      alert("Scénario sélectionné introuvable.");
      return;
    }
    scenarioToUse = snap.val();
  } else {
    // Scénario par défaut (Parc Saint Nicolas)
    if (typeof SCENARIO_PAR_DEFAUT === "undefined") {
      alert("Scénario par défaut manquant. Contactez l'administrateur.");
      return;
    }
    scenarioToUse = SCENARIO_PAR_DEFAUT;
  }

  // Stocke le scénario dans la partie
  await db.ref('parties/' + salonCode + '/scenario').set(scenarioToUse);

  // GÉNÉRATION DES PERSONNAGES (exemple simple)
  let persosObj = {};
  for (let i = 0; i < nombreJoueurs; i++) {
    persosObj['perso' + i] = {};
  }
  await db.ref('parties/' + salonCode + '/personnages').set(persosObj);

  // Enregistre le créateur comme premier joueur
  await db.ref('parties/' + salonCode + '/joueurs').push({
    uuid,
    pseudo
  });

  // Stocke les paramètres de la partie dans le localStorage pour les autres pages
  localStorage.setItem("parametresPartie", JSON.stringify(parametresPartie));
  localStorage.setItem("salonCode", salonCode);
  localStorage.setItem("nombreJoueurs", nombreJoueurs);

  window.location.href = "salon.html";
};
