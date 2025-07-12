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

// --- Ajout clé : récupère l'indice mission dans l'URL (support carte libre) ---
const params = new URLSearchParams(window.location.search);
const missionIdx = params.has("idx") ? parseInt(params.get("idx"), 10) : null;

// ---------------------- Fonctions utilitaires d'affichage ----------------------

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

function fadeOutAndRedirect(nextUrl) {
  var main = document.getElementById('main-content');
  if (main) main.classList.add('fadeout');
  setTimeout(function() {
    window.location.href = nextUrl;
  }, 850);
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

function accordePluriel(phrase, nb) {
  return phrase.replace(/([a-zA-ZéèêëàâîïôöùûüçÉÈÊËÀÂÎÏÔÖÙÛÜÇ]+)\[s\]/g, function(_, mot) {
    return nb > 1 ? mot + "s" : mot;
  });
}

function buildVars(etape) {
  let vars = {...etape.params};
  let nb = 1;
  switch (etape.type) {
    case "photo_inconnus":
      nb = Number(etape.params?.nbPersonnes) || (Array.isArray(etape.params?.consignes) ? etape.params.consignes.length : 1) || 1;
      vars.nb = nb;
      vars.nbPersonnes = nb;
      vars.critere = etape.params?.critere || "";
      vars.objet = nb > 1 ? "inconnu(e)s" : "inconnu(e)";
      vars.photo = nb > 1 ? "photos" : "photo";
      break;
    case "photo":
      nb = Number(etape.params?.nbPhotos) || (Array.isArray(etape.params?.consignes) ? etape.params.consignes.length : 1) || 1;
      vars.nb = nb;
      vars.photo = nb > 1 ? "photos" : "photo";
      vars.objet = (etape.params?.objet || etape.params?.consigne || "").toLowerCase();
      vars.objets = nb > 1 ? (vars.objet + "s") : vars.objet;
      break;
    case "collecte_objet":
      nb = Number(etape.params?.nbObjets) || (Array.isArray(etape.params?.consignes) ? etape.params.consignes.length : 1) || 1;
      vars.nb = nb;
      vars.objet = (etape.params?.objet || "").toLowerCase();
      vars.objets = nb > 1 ? (vars.objet + "s") : vars.objet;
      break;
    case "audio":
      nb = Number(etape.params?.nbAudio) || (Array.isArray(etape.params?.consignes) ? etape.params.consignes.length : 1) || 1;
      vars.nb = nb;
      vars.audio = nb > 1 ? "audios" : "audio";
      break;
    case "video":
      nb = Number(etape.params?.nbVideo) || (Array.isArray(etape.params?.consignes) ? etape.params.consignes.length : 1) || 1;
      vars.nb = nb;
      vars.video = nb > 1 ? "vidéos" : "vidéo";
      break;
    case "fichier":
      nb = Number(etape.params?.nbFichiers) || (Array.isArray(etape.params?.consignes) ? etape.params.consignes.length : 1) || 1;
      vars.nb = nb;
      vars.fichier = nb > 1 ? "fichiers" : "fichier";
      break;
    default:
      break;
  }
  return vars;
}

// Génération des consignes harmonisées pour une mission
function genererPhraseMission(type, mode, vars = {}) {
  // Si tu as un catalogue, adapte !
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
  let nb = vars.nb || 1;
  let key = nb > 1 ? '[objets]' : '[objet]';
  let textesFiltres = textes.filter(t => t.includes(key));
  if (!textesFiltres.length) textesFiltres = textes;
  let phrase = textesFiltres[Math.floor(Math.random() * textesFiltres.length)];
  phrase = phrase.replace(/\[([a-zA-Z0-9_]+)\]/g, (match, k) => (vars[k] !== undefined ? vars[k] : match));
  phrase = harmoniseArticles(phrase);
  phrase = accordePluriel(phrase, nb);
  if (nb <= 1) {
    phrase = phrase.replace(/\bces images\b/gi, "cette image");
    phrase = phrase.replace(/\bCes images\b/gi, "Cette image");
    phrase = phrase.replace(/\bces preuves\b/gi, "cette preuve");
    phrase = phrase.replace(/\bCes preuves\b/gi, "Cette preuve");
  } else {
    phrase = phrase.replace(/\bcette image\b/gi, "ces images");
    phrase = phrase.replace(/\bCette image\b/gi, "Ces images");
    phrase = phrase.replace(/\bcette preuve\b/gi, "ces preuves");
    phrase = phrase.replace(/\bCette preuve\b/gi, "Ces preuves");
  }
  return phrase;
}

function getUploadIcon(type) {
  switch(type) {
case "photo":
case "photo_inconnus":
  return `<svg viewBox="0 0 24 24" width="38" height="38" fill="#e0c185" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="5" width="18" height="14" rx="2"/>
  <circle cx="8.5" cy="12" r="2"/>
  <path d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2.586A2 2 0 0 1 9.828 5.586l.586.586H19a2 2 0 0 1 2 2v11zM7.5 17l2.5-3.5 2 2.5 3-4L19 17"/>
  </svg>`;
    case "video":
      return `<svg viewBox="0 0 24 24" width="38" height="38" fill="#e0c185"><path d="M17 10.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3.5l4 4v-11l-4 4z"/></svg>`;
    case "audio":
      return `<svg viewBox="0 0 24 24" width="38" height="38" fill="#e0c185"><rect x="9" y="4" width="6" height="10" rx="3"/><rect x="11" y="14" width="2" height="4" rx="1"/></svg>`;
case "collecte_objet":
  return `<svg viewBox="0 0 38 38" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="14" width="22" height="14" rx="3" fill="#e0c185" stroke="#bfa145" stroke-width="2"/>
    <path d="M8 14l11-8 11 8" stroke="#bfa145" stroke-width="2" fill="none"/>
    <circle cx="19" cy="21" r="3" fill="#bfa145"/>
  </svg>`;
case "fichier":
  return `<svg viewBox="0 0 24 24" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="12" height="16" rx="2" fill="#e0c185" stroke="#bfa145" stroke-width="2"/>
    <path d="M14 4v4h4" stroke="#bfa145" stroke-width="2" fill="none"/>
  </svg>`;
    default:
      return `<svg viewBox="0 0 24 24" width="38" height="38" fill="#e0c185"><rect x="4" y="7" width="16" height="11" rx="2"/></svg>`;
  }
}

const MISSION_UPLOAD_LABELS = {
  photo: (vars) => (vars.nb > 1 ? "Photos à envoyer" : "Photo à envoyer"),
  photo_inconnus: (vars) => (vars.nb > 1 ? "Photos à envoyer" : "Photo à envoyer"),
  audio: (vars) => (vars.nb > 1 ? "Audios à envoyer" : "Audio à envoyer"),
  video: (vars) => (vars.nb > 1 ? "Vidéos à envoyer" : "Vidéo à envoyer"),
  collecte_objet: (vars) => (vars.nb > 1 ? "Photos des objets à envoyer" : "Photo de l’objet à envoyer"),
  fichier: (vars) => (vars.nb > 1 ? "Fichiers à envoyer" : "Fichier à envoyer"),
};

// Affichage harmonisé d'une étape
function afficherEtapeHarmonisee(etape, stepIndex, mode, testMode = false) {
  resetAffichageEtape();

  // 1. Titre et métaphore
  let titre = etape.titre || etape.nom || "";
  let metaphore = etape.metaphore || "";
  if ((!titre || titre === etape.type) || !metaphore) {
    if (typeof getRandomAtmosphere === "function") {
      const random = getRandomAtmosphere(etape.type, mode || "arthurien");
      if (!titre || titre === etape.type) titre = random.titre;
      if (!metaphore) metaphore = random.phrase;
    }
    if (!titre) titre = "Défi à relever";
    if (!metaphore) metaphore = "Prépare-toi à l'aventure !";
  }
  document.getElementById('titre-quete').textContent = titre || "";
  document.getElementById('metaphore-quete').innerHTML = metaphore ? `<em>${metaphore}</em>` : '';

  // 3. Consigne et sous-consignes harmonisées
  document.getElementById('bloc-mission').style.display = '';
  document.getElementById('mission-label').textContent = "Consigne";
  let vars = buildVars(etape);

  let phraseMission = genererPhraseMission(etape.type, mode || "arthurien", vars)
    || etape.params?.consigne
    || etape.params?.objectif
    || etape.params?.enigme
    || etape.params?.question
    || etape.description
    || "[Aucune consigne définie]";
  phraseMission = harmoniseArticles(phraseMission);
  phraseMission = accordePluriel(phraseMission, vars.nb || 1);

  // Sous-consignes : si consignes est un tableau non vide, on les affiche en liste
  let sousConsignesHtml = "";
  if (Array.isArray(etape.params?.consignes) && etape.params.consignes.length > 0) {
    sousConsignesHtml = `<ul style="margin: 8px 0 0 0; padding-left: 24px;">` +
      etape.params.consignes.map(c => c ? `<li>${accordePluriel(harmoniseArticles(c), vars.nb || 1)}</li>` : '').join('') +
      `</ul>`;
  }

  document.getElementById('mission-text').innerHTML = phraseMission + sousConsignesHtml;

  // 4. Bloc upload harmonisé multi-upload pour tous les types
  const typesUpload = Object.keys(MISSION_UPLOAD_LABELS);
  if (typesUpload.includes(etape.type)) {
    let labelUpload = MISSION_UPLOAD_LABELS[etape.type](vars);
    afficherBlocUpload(etape.type, stepIndex, vars.nb || 1, () => {
      document.getElementById('next-quest').style.display = 'none';
      let retourBtn = document.getElementById('retourJeuBtn');
      if (retourBtn) retourBtn.style.pointerEvents = 'none';
    }, testMode, labelUpload, etape.params?.consignes);
    window.waitAndShowEpreuveContent && window.waitAndShowEpreuveContent();
    return;
  }

  // 5. Bloc réponse/énigme si besoin
  if (["mot_de_passe", "anagramme", "observation", "chasse_tresor", "signature_inconnu"].includes(etape.type)) {
    const blocAnswer = document.getElementById("bloc-answer");
    blocAnswer.style.display = '';
    blocAnswer.innerHTML = `<div class="input-answer-wrapper"><label for="answer-field" class="input-answer-label">${etape.type === "mot_de_passe" ? "Entrez le mot de passe :" : "Votre réponse :"}</label>
      <input id="answer-field" type="text" autocomplete="off" spellcheck="false" />
    </div>`;
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
    window.waitAndShowEpreuveContent && window.waitAndShowEpreuveContent();
    return;
  }

  document.getElementById('next-quest').style.display = '';
  document.getElementById('next-quest').disabled = false;
  window.waitAndShowEpreuveContent && window.waitAndShowEpreuveContent();
}

function afficherBlocUpload(type, stepIndex, nb, onUploaded, testMode = false, labelUpload = null, consignes = null) {
  const bloc = document.getElementById('bloc-upload');
  const row = document.getElementById('upload-row');
  row.innerHTML = '';
  bloc.style.display = '';

  let uploadStates = Array.from({length: nb}, () => false);

  for (let i = 0; i < nb; i++) {
    let label = document.createElement('label');
    label.style.display = "inline-flex";
    label.style.flexDirection = "column";
    label.style.alignItems = "center";
    label.style.justifyContent = "flex-start";
    label.style.marginRight = "18px";
    label.style.marginBottom = "12px";
    label.innerHTML = getUploadIcon(type);

    let court = "";
    if (type === "photo") court = `Photo ${i+1}`;
    else if (type === "audio") court = `Audio ${i+1}`;
    else if (type === "video") court = `Vidéo ${i+1}`;
    else if (type === "collecte_objet") court = `Objet ${i+1}`;
    else if (type === "fichier") court = `Fichier ${i+1}`;
    else court = labelUpload;

    label.innerHTML += `<div style="display:block;text-align:center;font-size:0.98em;margin-top:4px;">${court}</div>`;

    let input = document.createElement('input');
    input.type = "file";
    input.className = "visually-hidden";
    input.accept =
      type === "audio" ? "audio/*" :
      type === "photo" || type === "photo_inconnus" || type === "collecte_objet" ? "image/*" :
      type === "video" ? "video/*" :
      "*/*";
    input.id = `upload-file-${type}-${i}`;
    label.appendChild(input);

    let filenameDiv = document.createElement("div");
    filenameDiv.id = `filename-upload-${type}-${i}`;
    filenameDiv.style = "font-size:0.97em;color:#e0c185;text-align:center;min-height:1.2em;max-width:180px;overflow-x:auto;margin-top:2px;";
    label.appendChild(filenameDiv);

    row.appendChild(label);

    if (testMode) {
      input.disabled = true;
      filenameDiv.textContent = "Upload désactivé en mode test.";
    } else {
      input.onchange = async function () {
        if (!this.files || !this.files[0]) return;
        const salonCode = localStorage.getItem("salonCode");
        const equipeNum = localStorage.getItem("equipeNum");
        const file = this.files[0];
        const storagePath = `parties/${salonCode}/equipes/${equipeNum}/etape${stepIndex}/${type}${i}_${Date.now()}_${file.name.replace(/\s+/g, '')}`;
        try {
          let snapshot = await storage.ref(storagePath).put(file);
          let url = await snapshot.ref.getDownloadURL();
          let ref = db.ref(`parties/${salonCode}/equipes/${equipeNum}/epreuves/${stepIndex}/${type}${i}`);
          await ref.set(url);
          filenameDiv.textContent = file.name;
          uploadStates[i] = true;
          if (uploadStates.every(Boolean)) {
            document.getElementById('next-quest').disabled = true;
            document.getElementById('next-quest').classList.remove('enabled');
            document.getElementById('next-quest').style.display = 'none';
            let retourBtn = document.getElementById('retourJeuBtn');
            if (retourBtn) retourBtn.style.pointerEvents = 'none';

            db.ref(`parties/${salonCode}/scenarioJeu/repartition`).once('value').then(snapRep => {
              const repartition = snapRep.val() || [];
              sessionStorage.setItem('showValidationSuccess', '1');
              sessionStorage.setItem('nbEpreuvesRestantes', Math.max(0, repartition.length - (stepIndex+1)).toString());
              db.ref(`parties/${salonCode}/equipes/${equipeNum}/epreuves/${stepIndex}/validated`).set(true)
                .then(() => fadeOutAndRedirect("template-partie.html"));
            });

            if (typeof onUploaded === "function") onUploaded();
          }
        } catch (e) {
          filenameDiv.textContent = "Erreur upload !";
        }
      };
    }
  }
  document.getElementById('next-quest').disabled = true;
  document.getElementById('next-quest').classList.remove('enabled');
  if (testMode && typeof onUploaded === "function") onUploaded();
}

// ---------------------- Toast ----------------------
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

// ---------------------- Logique principale ----------------------

if (typeof isTestMode !== 'undefined' && isTestMode) {
  // ... inchangé pour le mode test ...
} else {
  // --- Mode normal ---
  const salonCode = localStorage.getItem("salonCode");
  const equipeNum = Number(localStorage.getItem("equipeNum"));
  if (!salonCode || isNaN(equipeNum) || equipeNum < 0) {
    window.location.href = "accueil.html";
  }

  let scenarioCode = null;

  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      firebase.auth().signInAnonymously();
      return;
    }

    db.ref(`parties/${salonCode}/parametres/scenarioCode`).once('value').then(snapCode => {
      scenarioCode = snapCode.val();

      db.ref(`parties/${salonCode}/scenario/mode`).once('value').then(snapMode => {
        window.currentScenarioMode = snapMode.val() || "arthurien";
      });

      chargerEtapeDynamique();
    });

    function chargerEtapeDynamique() {
      // On récupère tout ce qu'il faut pour gérer le point final
      Promise.all([
        db.ref(`parties/${salonCode}/scenarioJeu/repartition`).once('value'),
        db.ref(`parties/${salonCode}/jetonMissionsMapping`).once('value'),
        db.ref(`parties/${salonCode}/finalGpsIndex`).once('value'),
        db.ref(`parties/${salonCode}/equipes/${equipeNum}/epreuves`).once('value')
      ]).then(([snapRep, snapMapping, snapFinal, snapStatus]) => {
        const repartition = snapRep.val() || [];
        const jetonMissionsMapping = snapMapping.val() || [];
        const finalGpsIndex = typeof snapFinal.val() === "number" ? snapFinal.val() : null;
        const validatedMissions = snapStatus.val() || {};

        // Cas particulier : on tente d'accéder au point final
        if (missionIdx !== null && finalGpsIndex !== null && missionIdx === finalGpsIndex) {
          // On vérifie que toutes les missions sont validées (tous les jetonMissionsMapping[i]!=-1)
          let toutesValidees = true;
          for (let i = 0; i < jetonMissionsMapping.length; i++) {
            if (
              jetonMissionsMapping[i] !== -1 && // c'est une vraie mission
              (!validatedMissions[jetonMissionsMapping[i]] || !validatedMissions[jetonMissionsMapping[i]].validated)
            ) {
              toutesValidees = false; break;
            }
          }
          if (toutesValidees) {
            // Affiche la fin du jeu
            document.getElementById('main-content').innerHTML = `
              <h2 style="color:#38b948;font-family:'Cinzel Decorative',serif;">🎉 Jeu terminé !</h2>
              <div style="font-size:1.25em;margin:18px 0 32px 0;">Félicitations, vous avez accompli toutes les quêtes et atteint le point final !</div>
              <a class="main-btn" href="accueil.html" style="min-width:160px;">Retour à l'accueil</a>
            `;
          } else {
            // Pas encore accessible
            document.getElementById('main-content').innerHTML = `
              <h2>Point final non accessible</h2>
              <div style="margin:18px 0 32px 0;">Vous devez d'abord terminer toutes les missions avant de pouvoir accéder à ce point.</div>
              <a class="main-btn" href="template-partie.html" style="min-width:160px;">Retour à la carte</a>
            `;
          }
          window.waitAndShowEpreuveContent && window.waitAndShowEpreuveContent();
          return;
        }

        // --- Support du mode carte libre (missionIdx dans URL) ---
        if (missionIdx !== null && !isNaN(missionIdx) && repartition[missionIdx]) {
          const etape = repartition[missionIdx];
          resetAffichageEtape();
          afficherEtapeHarmonisee(etape.epreuve || etape, missionIdx, window.currentScenarioMode, false);
          document.getElementById('next-quest').onclick = () => validerEtape(missionIdx, repartition.length);
        } else {
          // fallback pour le mode linéaire classique
          db.ref(`parties/${salonCode}/equipes/${equipeNum}/currentStep`).once('value').then(snapStep => {
            const step = snapStep.val() || 0;
            if (step >= repartition.length) {
              document.getElementById('main-content').innerHTML = "Bravo, partie terminée !";
              window.waitAndShowEpreuveContent && window.waitAndShowEpreuveContent();
              return;
            }
            const etape = repartition[step];
            resetAffichageEtape();
            afficherEtapeHarmonisee(etape.epreuve || etape, step, window.currentScenarioMode, false);
            document.getElementById('next-quest').onclick = () => validerEtape(step, repartition.length);
          });
        }
      });
    }

    function validerEtape(idx, repartLength) {
      const nextBtn = document.getElementById('next-quest');
      nextBtn.disabled = true;
      nextBtn.classList.remove('enabled');
      nextBtn.style.display = 'none';
      let retourBtn = document.getElementById('retourJeuBtn');
      if (retourBtn) retourBtn.style.pointerEvents = 'none';
      showToast("Validation en cours...");
      const now = Date.now();
      db.ref(`parties/${salonCode}/equipes/${equipeNum}/epreuves/${idx}/startTime`)
        .once('value', function (snap) {
          const sTime = snap.val();
          if (sTime) {
            const elapsed = Math.round((now - sTime) / 1000);
            db.ref(`parties/${salonCode}/equipes/${equipeNum}/stepsTime/${idx}`).set(elapsed);
          }
          // --- Correction ici : valider bien l'index mission (idx), pas step ---
          sessionStorage.setItem('showValidationSuccess', '1');
          sessionStorage.setItem('nbEpreuvesRestantes', Math.max(0, repartLength - (idx+1)).toString());
          db.ref(`parties/${salonCode}/equipes/${equipeNum}/epreuves/${idx}/validated`).set(true)
            .then(() => fadeOutAndRedirect("template-partie.html"))
            .catch(() => {
              showToast("Erreur lors de la validation...");
              nextBtn.disabled = false;
              nextBtn.classList.add('enabled');
              nextBtn.style.display = '';
              if (retourBtn) retourBtn.style.pointerEvents = '';
            });
        });
    }
  });
}
