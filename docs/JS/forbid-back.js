// forbid-back.js
(function() {
  // Par défaut, on bloque le retour arrière
  let blockBack = true;

  // Cette fonction doit être appelée AVANT toute navigation programmée (boutons du jeu)
  window.disableBackProtection = function() { blockBack = false; };

  // Bloque UNIQUEMENT le retour arrière via navigateur/téléphone
  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    if (blockBack) {
      history.pushState(null, null, location.href);
      alert("Attention : Si vous retournez à l’accueil ou quittez la partie via le bouton retour du navigateur, le jeu sera arrêté pour votre équipe !");
    }
  };

  // (Optionnel) Bloquer le refresh ou la fermeture d’onglet
  // Si tu veux laisser le joueur refresh/fermer, COMENTE ce bloc
  window.onbeforeunload = function(e) {
    if (blockBack) {
      e.preventDefault();
      e.returnValue = "Êtes-vous sûr de vouloir quitter la partie ? Le jeu sera arrêté pour votre équipe.";
      return "Êtes-vous sûr de vouloir quitter la partie ? Le jeu sera arrêté pour votre équipe.";
    }
  };
})();
