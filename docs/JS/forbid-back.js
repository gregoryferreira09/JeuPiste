// forbid-back.js
(function() {
  let blockBack = true;
  window.disableBackProtection = function() { blockBack = false; };

  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    if (blockBack) {
      history.pushState(null, null, location.href);
      // Ouvre la modale de confirmation si disponible
      if (typeof window.showRetourAccueilModal === "function") {
        window.showRetourAccueilModal();
      } else {
        alert("Voulez-vous vraiment quitter la partie et revenir à l’accueil ? Le jeu sera arrêté pour votre équipe.");
      }
    }
  };

  window.onbeforeunload = function(e) {
    if (blockBack) {
      e.preventDefault();
      e.returnValue = "Êtes-vous sûr de vouloir quitter la partie ? Le jeu sera arrêté pour votre équipe.";
      return "Êtes-vous sûr de vouloir quitter la partie ? Le jeu sera arrêté pour votre équipe.";
    }
  };
})();
