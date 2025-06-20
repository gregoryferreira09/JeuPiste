document.addEventListener("DOMContentLoaded", function() {
  // Gestion du bouton "Démarrer"
  const demarrerBtn = document.getElementById("demarrerBtn");
  if (demarrerBtn) {
    demarrerBtn.addEventListener("click", function(e) {
      e.preventDefault();
      if (window.disableBackProtection) window.disableBackProtection();
      window.location.href = "personnages.html";
    });
  }

  // Gestion de la modale de retour accueil
  const btnRetour = document.getElementById("btnRetourAccueil");
  const confirmation = document.getElementById("confirmationRetourAccueil");
  const btnConfirmer = document.getElementById("confirmerRetourAccueilBtn");
  const btnAnnuler = document.getElementById("annulerRetourAccueilBtn");

  // Fonction globale pour ouvrir la modale (appelée aussi par forbid-back.js)
  window.showRetourAccueilModal = function() {
    confirmation.style.display = "flex";
    btnConfirmer.focus();
  };

  if (btnRetour && confirmation && btnConfirmer && btnAnnuler) {
    btnRetour.addEventListener("click", function(e) {
      e.preventDefault();
      window.showRetourAccueilModal();
    });
    btnConfirmer.addEventListener("click", function() {
      if (window.disableBackProtection) window.disableBackProtection();
      window.location.href = "accueil.html";
    });
    btnAnnuler.addEventListener("click", function() {
      confirmation.style.display = "none";
      btnRetour.focus();
    });
  }
});
