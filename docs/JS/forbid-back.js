(function() {
  // Permet de désactiver la protection lors de navigation programmée
  let blockBack = true;
  window.disableBackProtection = function() { blockBack = false; };

  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    if (blockBack) {
      history.pushState(null, null, location.href);
      alert("Vous ne pouvez pas quitter la partie en utilisant le bouton retour. Merci d'utiliser les boutons du jeu.");
    }
  };
})();
