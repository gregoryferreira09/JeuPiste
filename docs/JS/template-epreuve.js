// === Initialisation Firebase ===
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
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const storage = firebase.storage();

let scenarioModeGlobal = "arthurien"; // fallback

// === Récupération du mode global du scénario ===
const salonCode = localStorage.getItem("salonCode");
if (salonCode) {
  db.ref(`parties/${salonCode}/scenario/mode`).once('value').then(snapMode => {
    if (snapMode.exists()) scenarioModeGlobal = snapMode.val();
  });
}

// Utilitaire : minuscule la première lettre
function lowerFirst(str) {
  return str ? str.charAt(0).toLowerCase() + str.slice(1) : "";
}

// Utilitaire : liste naturelle en français
function joinListPrep(list) {
  if (!Array.isArray(list) || list.length === 0) return "";
  if (list.length === 1) return list[0];
  if (list.length === 2) return list[0] + " et " + list[1];
  return list.slice(0, -1).join(", ") + " et " + list[list.length - 1];
}

// Accord dynamique du texte selon le nombre d’objets
function accorderTexteObjet(objets, baseSingulier, basePluriel) {
  if (!Array.isArray(objets)) objets = [objets];
  if (objets.length === 1) {
    let obj = objets[0];
    return baseSingulier.replace("objet", obj);
  } else if (objets.length > 1) {
    let objList = joinListPrep(objets);
    return basePluriel.replace("objets", objList);
  } else {
    return "";
  }
}

// AJOUT : Fonction pour obtenir le SVG harmonisé selon le type d'upload
function getUploadIcon(type) {
  switch(type) {
    case "photo":
      return `<svg viewBox="0 0 24 24" width="32" height="32"><path fill="#e0c185" d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm7-10h-3.17l-1.41-1.41A2 2 0 0 0 13.42 4h-2.83a2 2 0 0 0-1.41.59L8.17 7H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>`;
    case "audio":
      return `<svg viewBox="0 0 24 24" width="32" height="32"><path fill="#e0c185" d="M12 17a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v7a3 3 0 0 0 3 3zm5-3a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 14 0z"/></svg>`;
    case "video":
      return `<svg viewBox="0 0 24 24" width="32" height="32"><path fill="#e0c185" d="M17 10.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3.5l4 4v-11l-4 4z"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" width="32" height="32"><path fill="#e0c185" d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5V9h5.5L13 3.5z"/></svg>`;
  }
}

// Récupère le mode de l’étape, sinon mode global du scénario, sinon "arthurien"
function getModeScenario(etape) {
  if (etape && etape.mode) return etape.mode;
  if (window.currentScenarioMode) return window.currentScenarioMode;
  if (scenarioModeGlobal) return scenarioModeGlobal;
  return 'arthurien';
}

// Fonction robuste pour générer la phrase mission avec injection [objet] / [objets]
function genererPhraseMission(type, mode, vars = {}) {
  if (typeof QUEST_TEXTS === "undefined" || !QUEST_TEXTS[type]) return null;
  let textes = QUEST_TEXTS[type][mode] || QUEST_TEXTS[type]["arthurien"] || [];
  if (!Array.isArray(textes)) {
    if (typeof textes === "object" && textes !== null) {
      textes = Object.values(textes).flat();
    } else if (typeof textes === "string") {
      textes = [textes];
    } else {
      textes = [];
    }
  }
  if (!textes.length) return null;
  let phrase = textes[Math.floor(Math.random() * textes.length)];
  phrase = phrase.replace(/\[([a-zA-Z0-9_]+)\]/g, (match, key) => (vars[key] !== undefined ? vars[key] : match));
  return phrase;
}

// Affichage harmonisé d’une épreuve
function afficherEtapeHarmonisee(etape, stepIndex, mode, testMode = false) {
  const typeMission = etape.type || "photo";
  const modeMission = getModeScenario(etape) || "arthurien";

  let titre = etape.titre || etape.nom || "";
  let metaphore = etape.metaphore || "";
  if ((!titre || titre === typeMission) || !metaphore) {
    if (typeof getRandomAtmosphere === "function") {
      const random = getRandomAtmosphere(typeMission, modeMission);
      if (!titre || titre === typeMission) titre = random.titre;
      if (!metaphore) metaphore = random.phrase;
    }
  }

  document.getElementById('titre-quete').textContent = titre || "";
  document.getElementById('metaphore-quete').innerHTML = metaphore ? `<em>${metaphore}</em>` : '';

  document.getElementById('objectif-block').style.display = etape.params?.objectif ? '' : 'none';
  document.getElementById('objectif-text').textContent = etape.params?.objectif || '';
  document.getElementById('defi-block').style.display = etape.params?.defi ? '' : 'none';
  document.getElementById('defi-text').textContent = etape.params?.defi || '';

  // AJOUT : bouton GPS harmonisé si coords GPS présentes
  let gpsValue = etape.params?.gps || etape.params?.coord || etape.params?.coordonnees || (Array.isArray(etape.params?.points) && etape.params.points.length ? etape.params.points[0] : null);
  let gpsContainer = document.getElementById('gps-upload-btn');
  if (gpsContainer) gpsContainer.remove(); // nettoyage si déjà présent
  if (gpsValue) {
    gpsContainer = document.createElement('div');
    gpsContainer.id = "gps-upload-btn";
    gpsContainer.style = "margin-bottom:18px; display:flex; justify-content:center; align-items:center;";
    gpsContainer.innerHTML = `
      <a href="https://maps.google.com/?q=${encodeURIComponent(gpsValue)}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;text-decoration:none;color:#e0c185;font-size:1.1em;">
        <svg width="34" height="34" viewBox="0 0 24 24" style="margin-right:10px;"><path fill="#e0c185" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6l5.25 3.15.77-1.28-4.02-2.37V7z"/></svg>
        <span>Ouvrir la boussole</span>
      </a>
    `;
    // On l'insère juste avant la consigne
    const blocMission = document.getElementById('bloc-mission');
    blocMission.parentNode.insertBefore(gpsContainer, blocMission);
  }

  // Gestion GPS (bloc classique, inchangé)
  let hasGPS = !!gpsValue;
  if (hasGPS) {
    afficherBlocGPS(etape, () => afficherMissionSuite(etape, stepIndex, modeMission, testMode), testMode);
  } else {
    afficherMissionSuite(etape, stepIndex, modeMission, testMode);
  }
}

// Bloc GPS (inchangé)
function afficherBlocGPS(etape, callback, testMode = false) {
  const gps = etape.params.gps || etape.params.coord || etape.params.coordonnees || (Array.isArray(etape.params.points) ? etape.params.points[0] : null);
  if (!gps) { callback(); return; }
  const blocGps = document.getElementById('bloc-gps');
  blocGps.style.display = '';
  document.getElementById('gps-link').href = "https://maps.google.com/?q=" + gps;
  document.getElementById('check-gps').onclick = function () {
    const feedback = document.getElementById("gps-feedback");
    feedback.textContent = "Recherche de votre position...";
    if (!navigator.geolocation) {
      feedback.textContent = "Votre navigateur ne supporte pas la géolocalisation.";
      return;
    }
    const [destLat, destLon] = gps.split(',').map(Number);
    const TOLERANCE_METERS = 30;
    navigator.geolocation.getCurrentPosition(function (pos) {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      function getDistanceMeters(lat1, lon1, lat2, lon2) {
        const R = 6378137;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      }
      const dist = getDistanceMeters(lat, lon, destLat, destLon);
      if (dist < TOLERANCE_METERS) {
        blocGps.style.display = "none";
        showToast("Tu es bien arrivé !");
        callback();
      } else {
        feedback.textContent = "Tu n’es pas encore assez proche ! (" + Math.round(dist) + " m)";
      }
    }, function (err) {
      document.getElementById("gps-feedback").textContent = "Position non trouvée (" + err.message + ")";
    });
  };
}

// Affichage de la mission (consigne) avec accord automatique
function afficherMissionSuite(etape, stepIndex, modeMission, testMode = false) {
  document.getElementById('bloc-mission').style.display = '';
  document.getElementById('mission-label').textContent = "Consigne";
  let phraseMission = "";

  let vars = { ...etape.params };

  if (Array.isArray(etape.params?.consignes) && etape.params.consignes.length) {
    let liste = etape.params.consignes.map(lowerFirst);
    vars.nb = liste.length;

    if (etape.type === "collecte_objet" && etape.params.specialAntidote) {
      phraseMission =
        "Un antidote ne pourra être conçu qu’avec la photo de " +
        accorderTexteObjet(
          liste,
          "un objet en forme de cœur trouvé sur place",
          "des objets en forme de cœur trouvés sur place"
        ) + ".";
    } else if (liste.length === 1) {
      vars.objet = liste[0];
      vars.objets = liste[0];
    } else {
      vars.objet = liste[0];
      vars.objets = joinListPrep(liste);
    }
  }

  if (!phraseMission) {
    phraseMission =
      genererPhraseMission(etape.type, modeMission, vars) ||
      etape.params?.consigne ||
      etape.params?.objectif ||
      etape.params?.enigme ||
      etape.params?.question ||
      etape.description ||
      "[Aucune consigne définie]";
  }

  document.getElementById('mission-text').innerHTML = phraseMission;

  if (["photo", "photo_inconnus", "audio", "collecte_objet", "video"].includes(etape.type)) {
    afficherBlocUpload(etape.type, stepIndex, 0, () => {
      document.getElementById('next-quest').style.display = '';
      document.getElementById('next-quest').disabled = false;
      if (testMode) {
        document.getElementById('next-quest').onclick = () => showToast("En mode test, ce bouton ne valide rien 😉");
      }
    }, testMode);
    return;
  }
  if (["mot_de_passe", "anagramme", "observation", "chasse_tresor", "signature_inconnu"].includes(etape.type)) {
    const blocAnswer = document.getElementById("bloc-answer");
    blocAnswer.style.display = '';
    blocAnswer.innerHTML = `
      <div class="input-answer-wrapper">
        <label for="answer-field" class="input-answer-label">
          ${etape.type === "mot_de_passe" ? "Entrez le mot de passe :" : "Votre réponse :"}
        </label>
        <input type="text" id="answer-field" class="input-answer-field" autocomplete="off" placeholder="Tapez ici…">
      </div>
    `;
    const input = document.getElementById("answer-field");
    const nextBtn = document.getElementById("next-quest");
    nextBtn.style.display = '';
    nextBtn.disabled = true;
    input.oninput = function () {
      if (this.value.trim().length > 2) {
        nextBtn.disabled = false;
        nextBtn.classList.add('enabled');
      } else {
        nextBtn.disabled = true;
        nextBtn.classList.remove('enabled');
      }
    };
    return;
  }
  document.getElementById('next-quest').style.display = '';
  document.getElementById('next-quest').disabled = false;
}

// Bloc upload : AJOUT LOGOS HARMONISÉS
function afficherBlocUpload(type, stepIndex, idxMission, onUploaded, testMode = false) {
  const bloc = document.getElementById('bloc-upload');
  const row = document.getElementById('upload-row');
  row.innerHTML = '';
  bloc.style.display = '';

  // LOGO HARMONISÉ pour chaque type
  let label = document.createElement('label');
  label.innerHTML =
    getUploadIcon(type) +
    `<span style="margin-left:8px;">${
      type === "audio" ? "Audio à envoyer" :
      type === "photo" ? "Photo à envoyer" :
      type === "video" ? "Vidéo à envoyer" :
      "Fichier à envoyer"
    }</span>`;

  let input = document.createElement('input');
  input.type = "file";
  input.className = "visually-hidden";
  input.accept =
    type === "audio" ? "audio/*" :
    type === "photo" ? "image/*" :
    type === "video" ? "video/*" :
    "*/*";
  input.id = `upload-file-${type}-${idxMission}`;
  label.appendChild(input);
  row.appendChild(label);

  if (testMode) {
    input.disabled = true;
    document.getElementById('upload-feedback').textContent = "Upload désactivé en mode test.";
    if (typeof onUploaded === "function") onUploaded();
  } else {
    input.onchange = async function () {
      if (!this.files || !this.files[0]) return;
      const salonCode = localStorage.getItem("salonCode");
      const equipeNum = localStorage.getItem("equipeNum");
      const file = this.files[0];
      const storagePath = `parties/${salonCode}/equipes/${equipeNum}/etape${stepIndex}/${type}${idxMission}_${Date.now()}_${file.name.replace(/\s+/g, '')}`;
      try {
        let snapshot = await storage.ref(storagePath).put(file);
        let url = await snapshot.ref.getDownloadURL();
        let ref = db.ref(`parties/${salonCode}/equipes/${equipeNum}/epreuves/${stepIndex}/${type}${idxMission}`);
        await ref.set(url);
        document.getElementById('upload-feedback').textContent = (type === "audio" ? "Audio" : type === "video" ? "Vidéo" : "Photo") + " envoyée !";
        onUploaded();
      } catch (e) {
        document.getElementById('upload-feedback').textContent = "Erreur upload !";
      }
    };
  }
}

// Toast (inchangé)
function showToast(msg) {
  let toast = document.getElementById('toast-message');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-message';
    toast.className = 'modal-toast';
    toast.setAttribute('role', 'alert');
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('visible');
  setTimeout(() => { toast.classList.remove('visible'); }, 2200);
}

// === Mode test (inchangé) ===
if (typeof isTestMode !== 'undefined' && isTestMode) {
  const scenarioTest = JSON.parse(localStorage.getItem('scenarioTest') || '{}');
  if (scenarioTest && Array.isArray(scenarioTest.scenario) && scenarioTest.scenario.length > 0) {
    let mode = scenarioTest.mode || "arthurien";
    let currentStep = 0;
    function showStep(idx) {
      const etape = scenarioTest.scenario[idx];
      if (!etape) {
        document.getElementById('main-content').innerHTML =
          "<div style='color:#2a4;font-weight:bold;'>Fin du test du scénario !</div>";
        return;
      }
      ['bloc-gps','bloc-mission','bloc-upload','bloc-answer','bloc-indice','bloc-chrono','bloc-pendu'].forEach(id => {
        const el = document.getElementById(id); if(el) el.style.display = 'none';
      });
      document.getElementById('next-quest').style.display = 'none';
      afficherEtapeHarmonisee(etape, idx, mode, true);

      let nav = document.getElementById('test-nav');
      if (!nav) {
        nav = document.createElement('div');
        nav.id = 'test-nav';
        nav.style = "margin:18px 0;text-align:center;";
        document.getElementById('main-content').appendChild(nav);
      }
      nav.innerHTML = `
        <button class="main-btn" ${idx <= 0 ? 'disabled' : ''} onclick="window.showStepTest(${idx - 1})">⬅️ Précédent</button>
        <button class="main-btn" ${idx >= scenarioTest.scenario.length - 1 ? 'disabled' : ''} onclick="window.showStepTest(${idx + 1})">Suivant ➡️</button>
        <div style="margin-top:10px;font-size:0.97em;">Étape ${idx + 1} / ${scenarioTest.scenario.length}</div>
      `;
      window.showStepTest = showStep;
    }
    window.showStepTest = showStep;
    showStep(currentStep);
    window.showToast = showToast;
  } else {
    document.getElementById('main-content').innerHTML =
      "<div style='color:#c00;font-weight:bold;'>Aucun scénario à tester.<br>Retourne dans le générateur et clique sur 'Tester le scénario'.</div>";
  }
} else {
  // --- Mode normal ---
  const salonCode = localStorage.getItem("salonCode");
  const equipeNum = Number(localStorage.getItem("equipeNum"));
  if (!salonCode || isNaN(equipeNum) || equipeNum < 0) {
    window.location.href = "accueil.html";
  }

  db.ref(`parties/${salonCode}/scenario/mode`).once('value').then(snapMode => {
    window.currentScenarioMode = snapMode.val() || "arthurien";
  });

  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) firebase.auth().signInAnonymously();
    else chargerEtapeDynamique();
  });

  function chargerEtapeDynamique() {
    db.ref(`parties/${salonCode}/equipes/${equipeNum}/currentStep`).once('value').then(snapStep => {
      const step = snapStep.val() || 0;
      db.ref(`parties/${salonCode}/scenario/scenario/${step}`).once('value').then(snapEpreuve => {
        const etape = snapEpreuve.val();
        if (!etape) {
          document.getElementById('main-content').innerHTML = "Bravo, partie terminée !";
          return;
        }
        ['bloc-gps','bloc-mission','bloc-upload','bloc-answer','bloc-indice','bloc-chrono','bloc-pendu'].forEach(id => {
          const el = document.getElementById(id); if(el) el.style.display = 'none';
        });
        document.getElementById('next-quest').style.display = 'none';
        afficherEtapeHarmonisee(etape, step, getModeScenario(etape), false);
        document.getElementById('next-quest').onclick = validerEtape;
      });
    });
  }

  function validerEtape() {
    const nextBtn = document.getElementById('next-quest');
    nextBtn.disabled = true;
    nextBtn.classList.remove('enabled');
    showToast("Validation en cours...");
    const salonCode = localStorage.getItem("salonCode");
    const equipeNum = Number(localStorage.getItem("equipeNum"));
    const now = Date.now();
    db.ref(`parties/${salonCode}/equipes/${equipeNum}/epreuves/current/startTime`)
      .once('value', function (snap) {
        const sTime = snap.val();
        if (sTime) {
          const elapsed = Math.round((now - sTime) / 1000);
          db.ref(`parties/${salonCode}/equipes/${equipeNum}/stepsTime/current`).set(elapsed);
        }
        db.ref(`parties/${salonCode}/equipes/${equipeNum}/currentStep`)
          .transaction(step => (step || 0) + 1, function (error, committed, snapshot) {
            if (!error && committed) {
              showToast("Étape validée !");
              setTimeout(() => { window.location.reload(); }, 800);
            } else {
              showToast("Erreur lors de la validation...");
              nextBtn.disabled = false;
              nextBtn.classList.add('enabled');
            }
          });
      });
  }
}
