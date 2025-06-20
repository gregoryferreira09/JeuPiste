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

  if (btnRetour && confirmation && btnConfirmer && btnAnnuler) {
    btnRetour.addEventListener("click", () => {
      confirmation.style.display = "flex";
      btnConfirmer.focus();
    });
    btnConfirmer.addEventListener("click", () => {
      if (window.disableBackProtection) window.disableBackProtection();
      window.location.href = "accueil.html";
    });
    btnAnnuler.addEventListener("click", () => {
      confirmation.style.display = "none";
      btnRetour.focus();
    });
  }
});
