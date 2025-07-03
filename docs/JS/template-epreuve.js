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
  // ... inchangé ...
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

// === Le reste du code (fonctions utilitaires d'affichage, génération des blocs, etc.) reste inchangé ===
// (Tu peux remettre les fonctions resetAffichageEtape, afficherEtapeHarmonisee, fadeOutAndRedirect, etc.)
// ... (tout ce qui est déjà dans ton fichier original en dehors de la logique de navigation/étape principale) ...
