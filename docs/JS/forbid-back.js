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
      alert("Vous ne pouvez pas quitter la partie en utilisant le bouton retour. Merci d'utiliser les boutons du jeu.");
    }
  };

  // Si tu veux aussi bloquer la fermeture/refresh, laisse ce bloc (optionnel) :
  // window.onbeforeunload = function(e) {
  //   if (blockBack) {
  //     e.preventDefault();
  //     e.returnValue = "Êtes-vous sûr de vouloir quitter la partie ? Vous risquez d’être déconnecté(e) du jeu.";
  //     return "Êtes-vous sûr de vouloir quitter la partie ? Vous risquez d’être déconnecté(e) du jeu.";
  //   }
  // };
})();
