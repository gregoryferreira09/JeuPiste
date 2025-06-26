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

const MISSION_UPLOAD_LABELS = {
  photo: (vars) => (vars.nb > 1 ? "Photos à envoyer" : "Photo à envoyer"),
  photo_inconnus: (vars) => (vars.nb > 1 ? "Photos à envoyer" : "Photo à envoyer"),
  audio: () => "Audio à envoyer",
  video: () => "Vidéo à envoyer",
  collecte_objet: (vars) => (vars.nb > 1 ? "Photos des objets à envoyer" : "Photo de l’objet à envoyer"),
  fichier: () => "Fichier à envoyer",
};

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

function harmoniseArticles(phrase) {
  phrase = phrase.replace(/\bde un ([aeiouyhAEIOUYH])/g, "d'un $1");
  phrase = phrase.replace(/\bde une ([aeiouyhAEIOUYH])/g, "d'une $1");
  phrase = phrase.replace(/\bde un /g, "d'un ");
  phrase = phrase.replace(/\bde une /g, "d'une ");
  phrase = phrase.replace(/\bde des /g, "des ");
  phrase = phrase.replace(/\bde le /g, "du ");
  phrase = phrase.replace(/\bde les /g, "des ");
  phrase = phrase.replace(/\bà le /g, "au ");
  phrase = phrase.replace(/\bà les /g, "aux ");
  phrase = phrase.replace(/  +/g, " ");
  phrase = phrase.replace(/d'([A-Z])/, function (m, p1) { return "d'" + p1.toLowerCase(); });
  return phrase;
}

function buildVars(etape) {
  let vars = {...etape.params};
  let nb = 1;
  switch (etape.type) {
    case "photo_inconnus":
      nb = Number(etape.params?.nbPersonnes) || 1;
      vars.nb = nb;
      vars.nbPersonnes = nb;
      vars.critere = etape.params?.critere || "";
      vars.objet = nb > 1 ? "inconnu(e)s" : "inconnu(e)";
      vars.photo = nb > 1 ? "photos" : "photo";
      break;
    case "photo":
      nb = Number(etape.params?.nbPhotos) || 1;
      vars.nb = nb;
      vars.photo = nb > 1 ? "photos" : "photo";
      vars.objet = (etape.params?.objet || etape.params?.consigne || "").toLowerCase();
      vars.objets = nb > 1 ? (vars.objet + "s") : vars.objet;
      break;
    case "collecte_objet":
      nb = Number(etape.params?.nbObjets) || 1;
      vars.nb = nb;
      vars.objet = (etape.params?.objet || "").toLowerCase();
      vars.objets = nb > 1 ? (vars.objet + "s") : vars.objet;
      break;
    case "audio":
      vars.audio = "audio";
      break;
    case "video":
      vars.video = "vidéo";
      break;
    case "fichier":
      vars.fichier = "fichier";
      break;
    default:
      break;
  }
  return vars;
}

function getUploadIcon(type) {
  switch(type) {
    case "photo":
    case "photo_inconnus":
      return `<svg viewBox="0 0 24 24" width="32" height="32"><path fill="#e0c185" d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm7-10h-3.17l-1.41-1.41A2 2 0 0 0 13.42 4h-2.83a2 2 0 0 0-1.41.59L8.17 7H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>`;
    case "audio":
      return `<svg viewBox="0 0 24 24" width="32" height="32"><path fill="#e0c185" d="M12 17a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v7a3 3 0 0 0 3 3zm5-3a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 14 0z"/></svg>`;
    case "video":
      return `<svg viewBox="0 0 24 24" width="32" height="32"><path fill="#e0c185" d="M17 10.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3.5l4 4v-11l-4 4z"/></svg>`;
    case "collecte_objet":
      return `<svg viewBox="0 0 24 24" width="32" height="32"><path fill="#e0c185" d="M3 7a2 2 0 0 1 2-2h2V3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v2H3V7zm2 0v2h14V7H5zm0 4v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7H5zm4-8v2h6V3H9z"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" width="32" height="32"><path fill="#e0c185" d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5V9h5.5L13 3.5z"/></svg>`;
  }
}
function getGpsIcon() {
  return `<svg width="34" height="34" viewBox="0 0 24 24" style="margin-right:10px;"><path fill="#e0c185" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.93-6.36l-5.66 2.36c-.34.14-.68-.2-.54-.54l2.36-5.66a.5.5 0 0 1 .9 0l2.36 5.66c.14.34-.2.68-.54.54z"/></svg>`;
}

// === AJOUT DU MULTI-UPLOAD (le reste du code ne change pas !) ===
function afficherBlocUpload(type, stepIndex, idxMission, onUploaded, testMode = false, labelUpload = null, nb = 1) {
  const bloc = document.getElementById('bloc-upload');
  const row = document.getElementById('upload-row');
  row.innerHTML = '';
  bloc.style.display = '';

  // MULTI-UPLOAD
  if (nb > 1) {
    let uploads = Array(nb).fill(false);
    for (let i = 0; i < nb; i++) {
      let label = document.createElement('label');
      label.className = 'icon-action side-icon';
      label.innerHTML = getUploadIcon(type) + `<span style="margin-left:8px;">${labelUpload && nb > 1 ? labelUpload.replace(/(\d+|des |des objets|photos|photo|fichier)/i, '') + (i+1) + " à envoyer" : (labelUpload || "Fichier à envoyer")}</span>`;
      let input = document.createElement('input');
      input.type = "file";
      input.className = "visually-hidden";
      input.accept =
        type === "audio" ? "audio/*" :
        type === "photo" || type === "photo_inconnus" || type === "collecte_objet" ? "image/*" :
        type === "video" ? "video/*" :
        "*/*";
      input.id = `upload-file-${type}-${idxMission}_${i}`;
      label.appendChild(input);
      row.appendChild(label);

      let feedback = document.createElement('div');
      feedback.id = `upload-feedback-${i}`;
      feedback.style = "font-size:0.98em; color:#e0c185; text-align:right; min-height:1.3em;";
      label.appendChild(feedback);

      if (testMode) {
        input.disabled = true;
        feedback.textContent = "Upload désactivé en mode test.";
        uploads[i] = true;
      } else {
        input.onchange = async function () {
          if (!this.files || !this.files[0]) return;
          const salonCode = localStorage.getItem("salonCode");
          const equipeNum = localStorage.getItem("equipeNum");
          const file = this.files[0];
          const storagePath = `parties/${salonCode}/equipes/${equipeNum}/etape${stepIndex}/${type}${idxMission}_${i}_${Date.now()}_${file.name.replace(/\s+/g, '')}`;
          try {
            let snapshot = await storage.ref(storagePath).put(file);
            let url = await snapshot.ref.getDownloadURL();
            let ref = db.ref(`parties/${salonCode}/equipes/${equipeNum}/epreuves/${stepIndex}/${type}${idxMission}_${i}`);
            await ref.set(url);
            feedback.textContent = (type === "audio" ? "Audio" : type === "video" ? "Vidéo" : "Photo") + " envoyée !";
            uploads[i] = true;
            // Active le bouton si tous les uploads sont faits
            if (uploads.every(Boolean)) {
              document.getElementById('next-quest').disabled = false;
              document.getElementById('next-quest').classList.add('enabled');
              if (typeof onUploaded === "function") onUploaded();
            }
          } catch (e) {
            feedback.textContent = "Erreur upload !";
            uploads[i] = false;
          }
          // Si un upload saute, on désactive le bouton
          if (!uploads.every(Boolean)) {
            document.getElementById('next-quest').disabled = true;
            document.getElementById('next-quest').classList.remove('enabled');
          }
        };
      }
    }
    // Désactive le bouton au départ
    document.getElementById('next-quest').disabled = true;
    document.getElementById('next-quest').classList.remove('enabled');
    return;
  }

  // CAS SIMPLE : UN SEUL UPLOAD, LOGIQUE ORIGINALE
  let label = document.createElement('label');
  label.innerHTML = getUploadIcon(type) + `<span style="margin-left:8px;">${labelUpload}</span>`;

  let input = document.createElement('input');
  input.type = "file";
  input.className = "visually-hidden";
  input.accept =
    type === "audio" ? "audio/*" :
    type === "photo" || type === "photo_inconnus" || type === "collecte_objet" ? "image/*" :
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
        if (typeof onUploaded === "function") onUploaded();
        document.getElementById('next-quest').disabled = false;
        document.getElementById('next-quest').classList.add('enabled');
      } catch (e) {
        document.getElementById('upload-feedback').textContent = "Erreur upload !";
        document.getElementById('next-quest').disabled = true;
        document.getElementById('next-quest').classList.remove('enabled');
      }
    };
  }
  // Par sécurité, désactive le bouton au départ
  document.getElementById('next-quest').disabled = true;
  document.getElementById('next-quest').classList.remove('enabled');
}

// ==== Le reste de ton code NE CHANGE PAS ====
// (Fonctions harmoniseArticles, buildVars, genererPhraseMission, navigation, etc.)
//
// Tu continues d'appeler afficherBlocUpload comme avant,
// mais tu peux désormais passer le nombre de fichiers à uploader en dernier argument !
//
// Exemple dans afficherEtapeHarmonisee (ne change rien au reste) :
//
/*
if (typesUpload.includes(etape.type)) {
  let nb = 1;
  if (etape.type === "photo") nb = Number(etape.params?.nbPhotos) || 1;
  if (etape.type === "photo_inconnus") nb = Number(etape.params?.nbPersonnes) || 1;
  if (etape.type === "collecte_objet") nb = Number(etape.params?.nbObjets) || 1;
  let labelUpload = MISSION_UPLOAD_LABELS[etape.type](vars);
  afficherBlocUpload(etape.type, stepIndex, 0, () => {
    document.getElementById('next-quest').style.display = '';
    document.getElementById('next-quest').disabled = nb > 1; // désactive tant que tous ne sont pas faits
    if (testMode) {
      document.getElementById('next-quest').onclick = () => showToast("En mode test, ce bouton ne valide rien 😉");
    }
  }, testMode, labelUpload, nb);
  return;
}
*/

//
// Tu n'as rien d'autre à modifier dans le reste du code.
//

// ==== FIN DU PATCH MULTI-UPLOAD ====
