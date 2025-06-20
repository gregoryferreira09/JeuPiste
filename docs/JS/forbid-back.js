// forbid-back.js
(function() {
  // Permet de désactiver la protection lors de navigation programmée (ex : bouton du jeu)
  let blockBack = true;
  window.disableBackProtection = function() { blockBack = false; };

  // Bloque le retour arrière du navigateur (flèche, swipe, bouton retour mobile)
  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    if (blockBack) {
      history.pushState(null, null, location.href);
      alert("Attention : Si vous retournez à l’accueil, le jeu va s’arrêter pour votre équipe !");
    }
  };

  // Bloque la fermeture/refresh de la page avec une confirmation
  window.onbeforeunload = function(e) {
    if (blockBack) {
      e.preventDefault();
      e.returnValue = "Êtes-vous sûr de vouloir quitter la partie ? Le jeu va s'arrêter si vous retournez à l’accueil.";
      return "Êtes-vous sûr de vouloir quitter la partie ? Le jeu va s'arrêter si vous retournez à l’accueil.";
    }
  };
})();
