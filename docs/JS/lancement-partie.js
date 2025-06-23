// docs/JS/lancement-partie.js

// === Affichage du texte de lancement (statique pour Avalon, dynamique sinon) ===
document.addEventListener("DOMContentLoaded", function () {
  const salonCode = localStorage.getItem("salonCode");
  if (!salonCode || typeof firebase === "undefined" || typeof LANCEMENT_TEXTE === "undefined") {
    // Fallback si pas de code, pas de Firebase ou pas de catalogue
    const textes = (typeof LANCEMENT_TEXTE !== "undefined" ? LANCEMENT_TEXTE["arthurien"] : []);
    const texteAleatoire = textes.length ? textes[Math.floor(Math.random() * textes.length)] :
      "Bienvenue dans l'aventure ! Préparez-vous pour des épreuves épiques.";
    const presentation = document.getElementById("textePresentation");
    if (presentation) presentation.innerHTML = texteAleatoire;
    return;
  }

  // On récupère le code scénario joué pour ce salon
  firebase.database().ref('parties/' + salonCode + '/parametres').once('value').then(paramSnap => {
    const params = paramSnap.val() || {};
    const scenarioCode = params.scenarioCode;

    // Cas spécial : scénario local Parc Saint Nicolas => texte statique Avalon (on ne touche à rien)
    if (scenarioCode === "parc_saint_nicolas") {
      return;
    }

    // Sinon on va chercher le mode du scénario et on injecte le texte dynamique
    firebase.database().ref('scenarios/' + scenarioCode + '/mode').once('value').then(snap => {
      const mode = snap.val() || 'arthurien';
      // Si jamais "avalon" est utilisé ailleurs, tu peux adapter ici
      const textes = LANCEMENT_TEXTE[mode] || LANCEMENT_TEXTE['arthurien'];
      const texteAleatoire = textes[Math.floor(Math.random() * textes.length)];
      const presentation = document.getElementById("textePresentation");
      if (presentation) presentation.innerHTML = texteAleatoire;
      // Met à jour le titre aussi
      const titre = document.getElementById("titreCourse");
      if (titre) titre.textContent = mode.charAt(0).toUpperCase() + mode.slice(1).replace(/_/g, " ");
    }).catch(() => {
      // Fallback si erreur
      const textes = LANCEMENT_TEXTE['arthurien'];
      const texteAleatoire = textes[Math.floor(Math.random() * textes.length)];
      const presentation = document.getElementById("textePresentation");
      if (presentation) presentation.innerHTML = texteAleatoire;
    });
  });
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
