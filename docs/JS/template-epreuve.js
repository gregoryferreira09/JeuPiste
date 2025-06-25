// === CONFIG FIREBASE ===
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

// Permet de récupérer le mode/scénario actif
function getModeScenario(etape) {
  const params = new URLSearchParams(window.location.search);
  const isTestMode = params.get('test') === '1';
  if (isTestMode) {
    const scenarioTest = JSON.parse(localStorage.getItem('scenarioTest') || '{}');
    return scenarioTest && scenarioTest.mode ? scenarioTest.mode : 'arthurien';
  }
  if (window.currentScenarioMode) return window.currentScenarioMode;
  return 'arthurien';
}

// Génère une phrase adaptée à la mission à partir du catalogue (QUEST_TEXTS)
function genererPhraseMission(type, mode, variables) {
  if (!window.QUEST_TEXTS || !QUEST_TEXTS[type] || !QUEST_TEXTS[type][mode]) return "";
  const templates = QUEST_TEXTS[type][mode];
  if (!templates.length) return "";
  let phrase = templates[Math.floor(Math.random() * templates.length)];
  phrase = phrase.replace(/\[([a-z_]+)\]/gi, (_, v) => (variables && (variables[v] || variables['params']?.[v])) || `[${v}]`);
  return phrase;
}

// Affiche un toast informatif
function showToast(msg) {
  const toast = document.getElementById('toast-message');
  if (toast) {
    toast.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => { toast.classList.remove('visible'); }, 2200);
  }
}

(function () {
  const params = new URLSearchParams(window.location.search);
  const isTestMode = params.get('test') === '1';

  // Harmonise l'affichage des blocs dans le bon ordre, GPS, Mission, etc.
  function afficherEtapeHarmonisee(etape, stepIndex, mode, testMode = false) {
    // 1. Affiche titre, métaphore, objectif
    document.getElementById('titre-quete').textContent = etape.titre || etape.nom || etape.type || "";
    document.getElementById('metaphore-quete').innerHTML = etape.metaphore ? `<em>${etape.metaphore}</em>` : '';
    document.getElementById('objectif-block').style.display = etape.params?.objectif ? '' : 'none';
    document.getElementById('objectif-text').textContent = etape.params?.objectif || '';
    document.getElementById('defi-block').style.display = etape.params?.defi ? '' : 'none';
    document.getElementById('defi-text').textContent = etape.params?.defi || '';

    // 2. GPS obligatoire ? Place le bloc GPS juste après la présentation
    let hasGPS = !!(etape.params?.gps || etape.params?.coord || etape.params?.coordonnees || (Array.isArray(etape.params?.points) && etape.params.points.length));
    if (hasGPS) {
      afficherBlocGPS(etape, () => afficherMissionSuite(etape, stepIndex, mode, testMode), testMode);
    } else {
      afficherMissionSuite(etape, stepIndex, mode, testMode);
    }
  }

  // Bloc GPS harmonisé
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
          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
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

  // Affichage de la mission et de la suite (upload, input, bouton)
  function afficherMissionSuite(etape, stepIndex, mode, testMode = false) {
    // Affiche la mission/consigne harmonisée
    document.getElementById('bloc-mission').style.display = '';
    document.getElementById('mission-label').textContent = "Consigne";
    // Phrase prioritaire : catalogue > consigne > objectif > enigme > question > description
    const phraseMission =
      genererPhraseMission(etape.type, mode, etape.params) ||
      etape.params?.consigne || etape.params?.objectif || etape.params?.enigme || etape.params?.question || etape.description || "";
    document.getElementById('mission-text').textContent = phraseMission;

    // Bloc upload (photo/audio/video)
    if (["photo", "photo_inconnus", "audio", "collecte_objet"].includes(etape.type)) {
      afficherBlocUpload(etape.type, stepIndex, 0, () => {
        document.getElementById('next-quest').style.display = '';
        document.getElementById('next-quest').disabled = false;
        if (testMode) {
          document.getElementById('next-quest').onclick = () => showToast("En mode test, ce bouton ne valide rien 😉");
        }
      }, testMode);
      return;
    }

    // Bloc input réponse (pour les énigmes, mot de passe, etc)
    if (["mot_de_passe", "anagramme", "observation", "chasse_tresor", "signature_inconnu"].includes(etape.type)) {
      const blocAnswer = document.getElementById('bloc-answer');
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
        // Ici tu peux ajuster la logique de validation selon le type
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

    // Sinon, bouton quête suivante direct
    document.getElementById('next-quest').style.display = '';
    document.getElementById('next-quest').disabled = false;
  }

  // Bloc upload harmonisé
  function afficherBlocUpload(type, stepIndex, idxMission, onUploaded, testMode = false) {
    const bloc = document.getElementById('bloc-upload');
    const row = document.getElementById('upload-row');
    row.innerHTML = '';
    bloc.style.display = '';
    let label = document.createElement('label');
    label.innerHTML = type === "audio"
      ? '🎤 <span>Audio à envoyer</span>'
      : `<svg viewBox="0 0 24 24" style="width:32px;height:32px;">
          <path fill="#e0c185" d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm7-10h-3.17l-1.41-1.41A2 2 0 0 0 13.42 4h-2.83a2 2 0 0 0-1.41.59L8.17 7H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0[...]
        </svg>
        <span>Photo à envoyer</span>`;
    let input = document.createElement('input');
    input.type = "file";
    input.className = "visually-hidden";
    input.accept = type === "audio" ? "audio/*" : "image/*";
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
          document.getElementById('upload-feedback').textContent = (type === "audio" ? "Audio" : "Photo") + " envoyée !";
          onUploaded();
        } catch (e) {
          document.getElementById('upload-feedback').textContent = "Erreur upload !";
        }
      };
    }
  }

  // --- Mode test ---
  if (isTestMode) {
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
        // Nettoie tous les blocs
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
    return; // RIEN APRÈS ICI EN MODE TEST
  }

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
        // Nettoie tous les blocs
        ['bloc-gps','bloc-mission','bloc-upload','bloc-answer','bloc-indice','bloc-chrono','bloc-pendu'].forEach(id => {
          const el = document.getElementById(id); if(el) el.style.display = 'none';
        });
        document.getElementById('next-quest').style.display = 'none';
        afficherEtapeHarmonisee(etape, step, getModeScenario(etape), false);
        // Gestion du bouton "Quête suivante"
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

})();
