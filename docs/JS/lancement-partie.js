// docs/JS/lancement-partie.js

// === Affichage dynamique de l'ambiance et de la règle ===
document.addEventListener("DOMContentLoaded", function () {
  const salonCode = localStorage.getItem("salonCode");
  const eltLancement = document.getElementById('lancement-jeu');
  const eltRegle = document.getElementById('regle-jeu');

  function afficherTexts(mode, nbEtapes) {
    // Ambiance
    let lancementArray = typeof LANCEMENT_TEXTE !== "undefined" && LANCEMENT_TEXTE[mode] ? LANCEMENT_TEXTE[mode] : [];
    let lancement = lancementArray.length ? lancementArray[Math.floor(Math.random() * lancementArray.length)] : "Bienvenue dans l'aventure !";
    eltLancement.textContent = lancement;

    // Règle dynamique
    function regleAccordee(brut, N) {
      let phrase = brut.replace("{N}", N);
      if (N === 1) {
        phrase = phrase
          .replace(/étapes/gi, "étape")
          .replace(/\bsont\b/gi, "est")
          .replace(/\bindispensables\b/gi, "indispensable")
          .replace(/\bdéfis\b/gi, "défi")
          .replace(/\bmissions\b/gi, "mission")
          .replace(/\baventures\b/gi, "aventure");
      }
      return phrase;
    }
    let regles = typeof REGLES_TEXTE !== "undefined" && REGLES_TEXTE[mode] ? REGLES_TEXTE[mode] : [];
    let regleBrute = regles.length ? regles[Math.floor(Math.random() * regles.length)] : "Pour vous évader, il faudra réussir {N} étapes sans vous faire prendre.";
    let regle = regleAccordee(regleBrute, nbEtapes);
    eltRegle.textContent = regle;
  }

  if (
    salonCode &&
    typeof firebase !== "undefined" &&
    typeof LANCEMENT_TEXTE !== "undefined"
  ) {
    // Cas : partie en salon (Firebase)
    firebase.database().ref('parties/' + salonCode + '/parametres').once('value').then(paramSnap => {
      const params = paramSnap.val() || {};
      const scenarioCode = params.scenarioCode;
      firebase.database().ref('scenarios/' + scenarioCode).once('value').then(snap => {
        const scenar = snap.val() || {};
        const mode = scenar.mode || 'arthurien';
        const nbEtapes = Array.isArray(scenar.scenario) ? scenar.scenario.length : (params.nbQuetes || 6);
        afficherTexts(mode, nbEtapes);
      }).catch(() => {
        afficherTexts('arthurien', 6);
      });
    }).catch(() => {
      afficherTexts('arthurien', 6);
    });
  } else {
    // Fallback localStorage (test local)
    let scenario = null;
    try {
      scenario = JSON.parse(localStorage.getItem('scenarioTest'));
    } catch(e) {}
    if (!scenario) {
      eltLancement.textContent = "Bienvenue dans l'aventure !";
      eltRegle.textContent = "Préparez-vous pour des épreuves épiques.";
      return;
    }
    let mode = scenario.mode || 'arthurien';
    let nbEtapes = Array.isArray(scenario.scenario) ? scenario.scenario.length : 1;
    afficherTexts(mode, nbEtapes);
  }
});

// === Activation du bouton "Démarrer" après 30s avec décompte ===
document.addEventListener("DOMContentLoaded", function () {
  const demarrerBtn = document.getElementById("demarrerBtn");
  let timer = 30;
  if (demarrerBtn) {
    demarrerBtn.style.pointerEvents = "none";
    demarrerBtn.style.opacity = "0.6";
    demarrerBtn.textContent = "Disponible dans 30s";
    const interval = setInterval(() => {
      timer--;
      if (timer > 0) {
        demarrerBtn.textContent = `Disponible dans ${timer}s`;
      } else {
        clearInterval(interval);
        demarrerBtn.style.pointerEvents = "auto";
        demarrerBtn.style.opacity = "1";
        demarrerBtn.textContent = "Démarrer la partie";
      }
    }, 1000);
  }
});

// === Effet fade-in pour afficher le contenu principal ===
document.addEventListener("DOMContentLoaded", function() {
  var main = document.querySelector('.fadeIn');
  if (main) main.classList.add('visible');
});

// === Gestion de la modale de retour accueil ===
document.addEventListener("DOMContentLoaded", function () {
  const btnRetour = document.getElementById("btnRetourAccueil");
  const confirmation = document.getElementById("confirmationRetourAccueil");
  const btnConfirmer = document.getElementById("confirmerRetourAccueilBtn");
  const btnAnnuler = document.getElementById("annulerRetourAccueilBtn");

  if (btnRetour && confirmation && btnConfirmer && btnAnnuler) {
    btnRetour.addEventListener("click", () => {
      confirmation.style.display = "flex";
      btnConfirmer.focus();
    });
    btnConfirmer.addEventListener("click", () => {
      window.location.href = "accueil.html";
    });
    btnAnnuler.addEventListener("click", () => {
      confirmation.style.display = "none";
      btnRetour.focus();
    });
  }
});
