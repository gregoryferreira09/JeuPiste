// forbid-back.js
(function() {
  // Bloque le retour arrière du navigateur (retour flèche/swipe)
  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    history.pushState(null, null, location.href);
    alert("Vous ne pouvez pas quitter la partie en utilisant le bouton retour. Merci d'utiliser les boutons du jeu.");
  };

  // Bloque la fermeture ou le rafraîchissement de la page
  window.onbeforeunload = function(e) {
    e.preventDefault();
    e.returnValue = "Êtes-vous sûr de vouloir quitter la partie ? Vous risquez d’être déconnecté(e) du jeu.";
    return "Êtes-vous sûr de vouloir quitter la partie ? Vous risquez d’être déconnecté(e) du jeu.";
  };
})();
