(function() {
  // On pousse 2 états pour piéger le bouton retour
  history.pushState({ page: 1 }, "", "");
  history.pushState({ page: 2 }, "", "");

  window.onpopstate = function(event) {
    if (event.state && event.state.page === 1) {
      history.pushState({ page: 2 }, "", "");
      alert("La navigation avec le bouton retour est désactivée.\nMerci d'utiliser les boutons du site.");
    }
  };
})();
