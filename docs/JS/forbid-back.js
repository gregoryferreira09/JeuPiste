(function() {
  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    history.pushState(null, null, location.href);
    alert("La navigation avec le bouton retour est désactivée.\nMerci d'utiliser les boutons du site.");
  };
})();
