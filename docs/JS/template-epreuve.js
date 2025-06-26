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

const MISSION_UPLOAD_FIELDS = {
  photo: etape => Number(etape.params?.nbPhotos) || 1,
  photo_inconnus: etape => Number(etape.params?.nbPersonnes) || 1,
  collecte_objet: etape => Number(etape.params?.nbObjets) || 1,
  audio: () => 1,
  video: () => 1,
  fichier: () => 1,
};

const MISSION_UPLOAD_LABELS = {
  photo: (idx, etape) => `Photo ${idx + 1} à envoyer`,
  photo_inconnus: (idx, etape) => `Photo ${idx + 1} à envoyer`,
  collecte_objet: (idx, etape) => `Photo de l’objet ${idx + 1} à envoyer`,
  audio: () => `Audio à envoyer`,
  video: (idx, etape) => `Vidéo ${idx + 1} à envoyer`,
  fichier: (idx, etape) => `Fichier à envoyer`,
};

function getUploadIcon(type) {
  switch(type) {
    case "photo":
    case "photo_inconnus":
    case "collecte_objet":
      return `<svg viewBox="0 0 24 24" width="38" height="38"><path fill="#e0c185" d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm7-10h-3.17l-1.41-1.41A2 2 0 0 0 13.42 4h-2.83a2 2 0 0 0-1.41.59L8.17 7H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>`;
    case "audio":
      return `<svg viewBox="0 0 24 24" width="38" height="38"><path fill="#e0c185" d="M12 17a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v7a3 3 0 0 0 3 3zm5-3a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 14 0z"/></svg>`;
    case "video":
      return `<svg viewBox="0 0 24 24" width="38" height="38"><path fill="#e0c185" d="M17 10.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3.5l4 4v-11l-4 4z"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" width="38" height="38"><path fill="#e0c185" d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5V9h5.5L13 3.5z"/></svg>`;
  }
}

function resetAffichageEtape() {
  ['titre-quete', 'metaphore-quete', 'mission-label', 'mission-text', 'upload-row', 'upload-feedback'].forEach(id => {
    let el = document.getElementById(id);
    if (el) el.innerHTML = "";
  });
  ['bloc-gps','bloc-mission','bloc-upload','bloc-answer','bloc-indice','bloc-chrono','bloc-pendu'].forEach(id => {
    let el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  let oldGpsBtn = document.getElementById('gps-upload-btn');
  if (oldGpsBtn && oldGpsBtn.parentNode) oldGpsBtn.parentNode.removeChild(oldGpsBtn);
}

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

function afficherBlocUploadMulti(etape, stepIndex, type, onAllUploaded, testMode = false) {
  const bloc = document.getElementById('bloc-upload');
  const row = document.getElementById('upload-row');
  row.innerHTML = '';
  bloc.style.display = '';

  const nb = MISSION_UPLOAD_FIELDS[type] ? MISSION_UPLOAD_FIELDS[type](etape) : 1;
  let uploaded = Array(nb).fill(false);
  let fileNames = Array(nb).fill('');
  let uploadedUrls = Array(nb).fill('');

  for (let i = 0; i < nb; i++) {
    let iconDiv = document.createElement('div');
    iconDiv.className = 'icon-action side-icon';

    let label = document.createElement('label');
    label.setAttribute('for', `upload-file-${type}-${i}`);
    label.innerHTML = getUploadIcon(type) + `<span>${MISSION_UPLOAD_LABELS[type](i, etape) || "Fichier à envoyer"}</span>`;

    let input = document.createElement('input');
    input.type = "file";
    input.className = "visually-hidden";
    input.accept =
      type === "audio" ? "audio/*" :
      type === "photo" || type === "photo_inconnus" || type === "collecte_objet" ? "image/*" :
      type === "video" ? "video/*" :
      "*/*";
    input.id = `upload-file-${type}-${i}`;

    let feedback = document.createElement('div');
    feedback.id = `upload-feedback-${i}`;
    feedback.style = "font-size:0.98em; color:#e0c185; text-align:right; min-height:1.3em;";

    if (testMode) {
      input.disabled = true;
      feedback.textContent = "Upload désactivé en mode test.";
    } else {
      input.addEventListener('change', async function() {
        if (!this.files || !this.files[0]) return;
        const file = this.files[0];
        const salonCode = localStorage.getItem("salonCode");
        const equipeNum = localStorage.getItem("equipeNum");
        const storagePath = `parties/${salonCode}/equipes/${equipeNum}/etape${stepIndex}/${type}${i}_${Date.now()}_${file.name.replace(/\s+/g, '')}`;
        feedback.textContent = "Envoi en cours...";
        try {
          let snapshot = await storage.ref(storagePath).put(file);
          let url = await snapshot.ref.getDownloadURL();
          uploaded[i] = true;
          fileNames[i] = file.name;
          uploadedUrls[i] = url;
          feedback.textContent = "Fichier sélectionné : " + file.name;
          label.classList.add('grayed');
        } catch (e) {
          feedback.textContent = "Erreur upload !";
          uploaded[i] = false;
          fileNames[i] = "";
          uploadedUrls[i] = "";
        }
        // Vérifie si tous sont uploadés
        if (uploaded.every(Boolean)) {
          document.getElementById('next-quest').disabled = false;
          document.getElementById('next-quest').classList.add('enabled');
          if (typeof onAllUploaded === "function") onAllUploaded(uploadedUrls);
        } else {
          document.getElementById('next-quest').disabled = true;
          document.getElementById('next-quest').classList.remove('enabled');
        }
      });
    }

    label.appendChild(input);
    iconDiv.appendChild(label);
    iconDiv.appendChild(feedback);
    row.appendChild(iconDiv);
  }

  // Au départ : bouton grisé
  document.getElementById('next-quest').disabled = true;
  document.getElementById('next-quest').classList.remove('enabled');
}

function afficherEtapeHarmonisee(etape, stepIndex, mode, testMode = false) {
  resetAffichageEtape();

  // 1. Titre & métaphore
  let titre = etape.titre || etape.nom || "";
  let metaphore = etape.metaphore || "";
  document.getElementById('titre-quete').textContent = titre || "";
  document.getElementById('metaphore-quete').innerHTML = metaphore ? `<em>${metaphore}</em>` : '';

  // 2. Consigne
  document.getElementById('bloc-mission').style.display = '';
  document.getElementById('mission-label').textContent = "Consigne";
  let phraseMission =
    etape.params?.consigne ||
    etape.params?.objectif ||
    etape.params?.enigme ||
    etape.params?.question ||
    etape.description ||
    "[Aucune consigne définie]";
  document.getElementById('mission-text').innerHTML = phraseMission;

  // 3. Bloc upload harmonisé multi-fichiers
  const typesUpload = Object.keys(MISSION_UPLOAD_FIELDS);
  if (typesUpload.includes(etape.type)) {
    afficherBlocUploadMulti(etape, stepIndex, etape.type, (urls) => {
      // callback à la fin de tous les uploads (vide ici)
    }, testMode);
    return;
  }

  // 4. Bloc réponse classique (énigme…)
  if (["mot_de_passe", "anagramme", "observation", "chasse_tresor", "signature_inconnu"].includes(etape.type)) {
    const blocAnswer = document.getElementById("bloc-answer");
    blocAnswer.style.display = '';
    blocAnswer.innerHTML = `<div class="input-answer-wrapper"><label for="answer-field" class="input-answer-label">${etape.type === "mot_de_passe" ? "Entrez le mot de passe :" : "Votre réponse :"}</label><input type="text" id="answer-field" class="input-answer-field" autocomplete="off" placeholder="Tapez ici…"></div>`;
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

  // Sinon, bouton activé direct (rare, pour étape sans upload ni champ)
  document.getElementById('next-quest').disabled = false;
  document.getElementById('next-quest').classList.add('enabled');
}

// === Mode test OU navigation normal ===
if (typeof isTestMode !== 'undefined' && isTestMode) {
  // ... (logique test, à compléter si besoin) ...
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
        resetAffichageEtape();
        const etape = snapEpreuve.val();
        if (!etape) {
          document.getElementById('main-content').innerHTML = "Bravo, partie terminée !";
          return;
        }
        document.getElementById('next-quest').style.display = '';
        afficherEtapeHarmonisee(etape, step, window.currentScenarioMode, false);
        document.getElementById('next-quest').onclick = function() {
          this.disabled = true;
          this.classList.remove('enabled');
          showToast("Validation en cours...");
          const now = Date.now();
          db.ref(`parties/${salonCode}/equipes/${equipeNum}/epreuves/${step}/startTime`)
            .once('value', function (snap) {
              const sTime = snap.val();
              if (sTime) {
                const elapsed = Math.round((now - sTime) / 1000);
                db.ref(`parties/${salonCode}/equipes/${equipeNum}/stepsTime/${step}`).set(elapsed);
              }
              db.ref(`parties/${salonCode}/equipes/${equipeNum}/currentStep`)
                .transaction(step => (step || 0) + 1, function (error, committed, snapshot) {
                  if (!error && committed) {
                    showToast("Étape validée !");
                    setTimeout(() => { chargerEtapeDynamique(); }, 800);
                  } else {
                    showToast("Erreur lors de la validation...");
                    document.getElementById('next-quest').disabled = false;
                    document.getElementById('next-quest').classList.add('enabled');
                  }
                });
            });
        };
      });
    });
  }
}
