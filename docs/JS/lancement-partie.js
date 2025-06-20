// SRC/JS/lancement-partie.js

// Ici tu mets uniquement le JS utile à cette page, sans doublon HTML/CSS

// Exemple d'activation du bouton "Démarrer" après 30s
document.addEventListener("DOMContentLoaded", function() {
  const demarrerBtn = document.getElementById("demarrerBtn");
  if (demarrerBtn) {
    setTimeout(() => {
      demarrerBtn.style.pointerEvents = "auto";
      demarrerBtn.style.opacity = "1";
      demarrerBtn.textContent = "Démarrer la partie";
    }, 30000); // 30s
  }
});

// Gestion de la modale de retour accueil
document.addEventListener("DOMContentLoaded", function() {
  const btnRetour = document.getElementById("btnRetourAccueil");
  const confirmation = document.getElementById("confirmationRetourAccueil");
  const btnConfirmer = document.getElementById("confirmerRetourAccueilBtn");
  const btnAnnuler = document.getElementById("annulerRetourAccueilBtn");

  if (btnRetour && confirmation && btnConfirmer && btnAnnuler) {
    btnRetour.addEventListener("click", () => {
  confirmation.classList.add("active");
});
btnConfirmer.addEventListener("click", () => {
  window.location.href = "accueil.html";
});
btnAnnuler.addEventListener("click", () => {
  confirmation.classList.remove("active");
});
  }
});
