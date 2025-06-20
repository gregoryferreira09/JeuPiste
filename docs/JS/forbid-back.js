(function() {
  let blockBack = true;
  window.disableBackProtection = function() { blockBack = false; };

  // Ajoute une entrée à l’historique pour intercepter le back
  history.pushState(null, null, location.href);

  window.onpopstate = function () {
    if (blockBack) {
      history.pushState(null, null, location.href);
      if (typeof window.showRetourAccueilModal === "function") {
        window.showRetourAccueilModal();
      } else {
        alert("Voulez-vous vraiment quitter la page ?");
      }
    }
  };

  window.onbeforeunload = function(e) {
    if (blockBack) {
      e.preventDefault();
      e.returnValue = "Êtes-vous sûr de vouloir quitter la partie ? Le jeu sera arrêté pour votre équipe.";
      return e.returnValue;
    }
  };
})();
