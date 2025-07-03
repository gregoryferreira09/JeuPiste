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
  audio: (vars) => (vars.nb > 1 ? "Audios à envoyer" : "Audio à envoyer"),
  video: (vars) => (vars.nb > 1 ? "Vidéos à envoyer" : "Vidéo à envoyer"),
  collecte_objet: (vars) => (vars.nb > 1 ? "Photos des objets à envoyer" : "Photo de l’objet à envoyer"),
  fichier: (vars) => (vars.nb > 1 ? "Fichiers à envoyer" : "Fichier à envoyer"),
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

// Corrige les articles/contractions françaises
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

// Corrige les pluriels dynamiques type "personne[s]" --> "personne"/"personnes"
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

function getUploadIcon(type) {
  switch(type) {
    case "photo":
    case "photo_inconnus":
      return `<svg viewBox="0 0 24 24" width="38" height="38" fill="#e0c185"><path d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2.586A2 2 0 0 1 9.828 5.586l.586.586H19a2 2 0 0 1 2 2v11zM7.5 10.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/></svg>`;
    case "video":
      return `<svg viewBox="0 0 24 24" width="38" height="38" fill="#e0c185"><path d="M17 10.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3.5l4 4v-11l-4 4z"/></svg>`;
    case "audio":
      return `<svg viewBox="0 0 24 24" width="38" height="38" fill="#e0c185"><rect x="9" y="4" width="6" height="10" rx="3"/><rect x="11" y="14" width="2" height="4" rx="1"/></svg>`;
    case "collecte_objet":
      return `<svg viewBox="0 0 38 38" width="38" height="38" fill="none"><circle cx="17" cy="17" r="9" stroke="#e0c185" stroke-width="3" fill="none"/><rect x="23.5" y="23.5" width="8" height="2.5" rx="1.25" fill="#e0c185"/></svg>`;
    case "fichier":
      return `<svg viewBox="0 0 24 24" width="38" height="38" fill="none"><rect x="6" y="7" width="12" height="11" rx="2" fill="#e0c185" stroke="#e0c185" stroke-width="2"/><rect x="6" y="5" width="4" height="2" rx="1" fill="#e0c185"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" width="38" height="38" fill="#e0c185"><rect x="4" y="7" width="16" height="11" rx="2"/></svg>`;
  }
}

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

  // 2. (SUPPRIMÉ : Bloc GPS harmonisé si présent)

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
      // Masque le bouton quête suivante dès le succès
      document.getElementById('next-quest').style.display = 'none';
      let retourBtn = document.getElementById('retourJeuBtn');
      if (retourBtn) retourBtn.style.pointerEvents = 'none';
    }, testMode, labelUpload, etape.params?.consignes);
    window.waitAndShowEpreuveContent();
    return;
  }

  // 5. Bloc réponse/énigme si besoin
  if (["mot_de_passe", "anagramme", "observation", "chasse_tresor", "signature_inconnu"].includes(etape.type)) {
    const blocAnswer = document.getElementById("bloc-answer");
    blocAnswer.style.display = '';
    blocAnswer.innerHTML = `<div class="input-answer-wrapper"><label for="answer-field" class="input-answer-label">${etape.type === "mot_de_passe" ? "Entrez le mot de passe :" : "Votre réponse :"}</label><input type="text" id="answer-field" autocomplete="off" style="margin-bottom:8px;" class="main-input"/><div id="answer-feedback" style="margin-top:6px;font-size:0.97em;color:#e0c185;"></div></div>`;
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
    window.waitAndShowEpreuveContent();
    return;
  }

  document.getElementById('next-quest').style.display = '';
  document.getElementById('next-quest').disabled = false;
  window.waitAndShowEpreuveContent();
}

// Effet fondu simple puis redirection
function fadeOutAndRedirect(nextUrl) {
  var main = document.getElementById('main-content');
  main.classList.add('fadeout');
  setTimeout(function() {
    window.location.href = nextUrl;
  }, 850); // doit être cohérent avec la durée du CSS (800ms)
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

    // Label court sous le logo
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

    // Affichage du nom du fichier sélectionné
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

            // Préparer la validation pour template-partie
            db.ref(`parties/${salonCode}/scenarioJeu/repartition`).once('value').then(snapRep => {
              const repartition = snapRep.val() || [];
              sessionStorage.setItem('showValidationSuccess', '1');
              sessionStorage.setItem('nbEpreuvesRestantes', Math.max(0, repartition.length - (stepIndex+1)).toString());
              fadeOutAndRedirect("template-partie.html");
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

// === Mode test OU navigation normal ===
if (typeof isTestMode !== 'undefined' && isTestMode) {
  const scenarioTest = JSON.parse(localStorage.getItem('scenarioTest') || '{}');
  if (scenarioTest && Array.isArray(scenarioTest.scenario) && scenarioTest.scenario.length > 0) {
    let mode = scenarioTest.mode || "arthurien";
    let currentStep = 0;
    function showStep(idx) {
      resetAffichageEtape();
      const etape = scenarioTest.scenario[idx];
      if (!etape) {
        document.getElementById('main-content').innerHTML =
          "<div style='color:#2a4;font-weight:bold;'>Fin du test du scénario !</div>";
        window.waitAndShowEpreuveContent();
        return;
      }
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
    window.waitAndShowEpreuveContent();
  }
} else {
  // --- Mode normal ---
  const salonCode = localStorage.getItem("salonCode");
  const equipeNum = Number(localStorage.getItem("equipeNum"));
  if (!salonCode || isNaN(equipeNum) || equipeNum < 0) {
    window.location.href = "accueil.html";
  }

  let scenarioCode = null;
  let repartitionLength = null;

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
      db.ref(`parties/${salonCode}/equipes/${equipeNum}/currentStep`).once('value').then(snapStep => {
        const step = snapStep.val() || 0;

        if (scenarioCode === "parc_saint_nicolas") {
          db.ref(`parties/${salonCode}/scenario/scenario/${step}`).once('value').then(snapEpreuve => {
            resetAffichageEtape();
            const etape = snapEpreuve.val();
            if (!etape) {
              document.getElementById('main-content').innerHTML = "Bravo, partie terminée !";
              window.waitAndShowEpreuveContent();
              return;
            }
            document.getElementById('next-quest').style.display = 'none';
            afficherEtapeHarmonisee(etape, step, window.currentScenarioMode, false);
            document.getElementById('next-quest').onclick = () => validerEtape(step);
          });
        } else {
          db.ref(`parties/${salonCode}/scenarioJeu/repartition`).once('value').then(snapRep => {
            const repartition = snapRep.val() || [];
            repartitionLength = repartition.length;

            if (step >= repartition.length) {
              db.ref(`parties/${salonCode}/scenarioJeu/arrivalPoint`).once('value').then(snapArrival => {
                const arrival = snapArrival.val();
                document.getElementById('main-content').innerHTML =
                  `<div style="color:#2a4;font-weight:bold;">Bravo, vous avez terminé toutes les épreuves !</div>` +
                  (arrival
                    ? `<div style="margin-top:16px;font-size:1.15em;"><b>Point d'arrivée :</b><br>${arrival.gps ? `GPS : ${arrival.gps}` : ''}</div>`
                    : '');
                window.waitAndShowEpreuveContent();
              });
              return;
            }

            const etape = repartition[step];
            resetAffichageEtape();
            if (!etape) {
              document.getElementById('main-content').innerHTML = "Bravo, partie terminée !";
              window.waitAndShowEpreuveContent();
              return;
            }
            document.getElementById('next-quest').style.display = 'none';
            afficherEtapeHarmonisee(etape.epreuve || etape, step, window.currentScenarioMode, false);
            document.getElementById('next-quest').onclick = () => validerEtape(step, repartition.length);
          });
        }
      });
    }

    function validerEtape(step, repartLength) {
      const nextBtn = document.getElementById('next-quest');
      nextBtn.disabled = true;
      nextBtn.classList.remove('enabled');
      nextBtn.style.display = 'none';
      let retourBtn = document.getElementById('retourJeuBtn');
      if (retourBtn) retourBtn.style.pointerEvents = 'none';
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
            .transaction(curStep => (curStep || 0) + 1, function (error, committed, snapshot) {
              if (!error && committed) {
                showToast("Étape validée !");
                db.ref(`parties/${salonCode}/scenarioJeu/repartition`).once('value').then(snapRep => {
                  const repartition = snapRep.val() || [];
                  sessionStorage.setItem('showValidationSuccess', '1');
                  sessionStorage.setItem('nbEpreuvesRestantes', Math.max(0, repartition.length - (step+1)).toString());
                  fadeOutAndRedirect("template-partie.html");
                });
              } else {
                showToast("Erreur lors de la validation...");
                nextBtn.disabled = false;
                nextBtn.classList.add('enabled');
                nextBtn.style.display = '';
                if (retourBtn) retourBtn.style.pointerEvents = '';
              }
            });
        });
    }
  });
}
