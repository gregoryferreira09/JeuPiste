// forbid-back.js
(function() {
  // Ajoute dynamiquement la modale au body si elle n'existe pas déjà
  function injectForbidBackModal() {
    if (document.getElementById('forbidBackModal')) return;
    var div = document.createElement('div');
    div.id = 'forbidBackModal';
    div.tabIndex = -1;
    div.style.display = 'none';
    div.style.position = 'fixed';
    div.style.left = '0';
    div.style.top = '0';
    div.style.width = '100vw';
    div.style.height = '100vh';
    div.style.background = 'rgba(44,27,27,0.82)';
    div.style.zIndex = '99999';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
    div.innerHTML = `
      <div style="background:#2c1b1b; border-radius:16px; padding:32px 18px; box-shadow:0 4px 24px #0009; border:2px solid #e0c185; max-width:340px; margin:auto; text-align:center;">
        <div style="font-family:'Cinzel Decorative',serif; color:#e0c185; font-size:1.15em; margin-bottom:24px;">
          La navigation avec le bouton retour de votre navigateur est désactivée.<br />
          Merci d'utiliser uniquement les boutons de la page.
        </div>
        <div style="display:flex; gap:22px; justify-content:center;">
          <button id="forbidBackOk" style="background:#e0c185; color:#3d2b1f; border-radius:8px; border:none; padding:12px 32px; font-size:1.07em; font-family:'Cinzel Decorative',serif; cursor:pointer;">OK</button>
        </div>
      </div>
    `;
    document.body.appendChild(div);
  }

  // Empêche tout retour arrière du navigateur sur toutes les pages
  let backBlocked = false;
  function setupForbidBack() {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      if (!backBlocked) {
        showForbidBackModal();
        backBlocked = true;
      }
      history.pushState(null, null, location.href);
    };
  }

  function showForbidBackModal() {
    var modal = document.getElementById('forbidBackModal');
    if (modal) {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
      setTimeout(function() {
        var okBtn = document.getElementById('forbidBackOk');
        if (okBtn) okBtn.focus();
      }, 100);
    }
  }
  function hideForbidBackModal() {
    var modal = document.getElementById('forbidBackModal');
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
      backBlocked = false;
    }
  }

  // Initialisation au chargement du DOM
  document.addEventListener("DOMContentLoaded", function() {
    injectForbidBackModal();

    var okBtn = document.getElementById('forbidBackOk');
    if (okBtn) {
      okBtn.onclick = hideForbidBackModal;
    }

    document.addEventListener("keydown", function(e) {
      if (document.getElementById('forbidBackModal').style.display === "flex" && (e.key === "Escape" || e.key === "Enter" || e.key === " ")) {
        hideForbidBackModal();
      }
    });

    setupForbidBack();
  });
})();
