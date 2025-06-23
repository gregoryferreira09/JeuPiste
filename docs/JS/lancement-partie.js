// docs/JS/lancement-partie.js

// === Affichage aléatoire du texte de lancement selon le scénario ===
document.addEventListener("DOMContentLoaded", function () {
  // Suppose que le code salon est stocké en localStorage (créé au lancement de la partie)
  const salonCode = localStorage.getItem("salonCode");
  if (!salonCode || typeof firebase === "undefined" || typeof LANCEMENT_TEXTE === "undefined") {
    // Fallback : texte arthurien par défaut
    const textes = (typeof LANCEMENT_TEXTE !== "undefined" ? LANCEMENT_TEXTE["arthurien"] : []);
    const texteAleatoire = textes.length ? textes[Math.floor(Math.random() * textes.length)] :
      "Bienvenue dans l'aventure ! Préparez-vous pour des épreuves épiques.";
    const presentation = document.getElementById("textePresentation");
    if (presentation) presentation.innerHTML = texteAleatoire;
    return;
  }

  // Récupération du mode de scénario via Firebase
  firebase.database().ref('scenarios/' + salonCode + '/mode').once('value').then(snap => {
    const mode = snap.val() || 'arthurien';
    const textes = LANCEMENT_TEXTE[mode] || LANCEMENT_TEXTE['arthurien'];
    const texteAleatoire = textes[Math.floor(Math.random() * textes.length)];
    const presentation = document.getElementById("textePresentation");
    if (presentation) presentation.innerHTML = texteAleatoire;
  }).catch(() => {
    // Fallback si erreur
    const textes = LANCEMENT_TEXTE['arthurien'];
    const texteAleatoire = textes[Math.floor(Math.random() * textes.length)];
    const presentation = document.getElementById("textePresentation");
    if (presentation) presentation.innerHTML = texteAleatoire;
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
