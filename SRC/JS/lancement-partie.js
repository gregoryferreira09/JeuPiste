<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Lancement de la Partie - Murder Party</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cormorant+Garamond:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../Public/styles/style.css">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative&family=Cormorant+Garamond&display=swap" rel="stylesheet">
  <style>
    /* ... ton CSS existant, inchangé ... */
    /* Garde tout le bloc <style> tel qu'il était */
  </style>
</head>
<body>
  <!-- Header -->
  <header>
    <h1 class="site-title">Lancement de la partie</h1>
  </header>
  <div class="center-wrapper">
    <main>
      <section class="page-lancement fadeIn" role="main" aria-live="polite">
        <div class="scenario-actions">
          <a class="main-btn" id="demarrerBtn" href="personnage.html" style="pointer-events:none; opacity:0.6;">Disponible dans 30s</a>
          <button class="main-btn" id="btnRetourAccueil">Retour accueil</button>
        </div>
        <div class="info" id="messageInfo"></div>
      </section>
    </main>
  </div>

  <main style="margin-top:30px;">
    <!-- Bloc Présentation -->
    <div id="presentation" class="presentation-bloc"></div>
    <!-- Bloc Objectif général -->
    <div id="objectifGeneral" class="objectif-bloc"></div>
    <!-- Bloc détail des équipes -->
    <div id="detailJeu" class="detail-bloc"></div>

    <div style="text-align: center; margin: 16px 0;">
      <button onclick="window.location.href='accueil.html'" class="main-btn">Retour à l'accueil</button>
    </div>
  </main>

  <footer class="footer">
    <p>© 2025 Murder Party. Tous droits réservés.</p>
    <p>© 2025 Course d’orientation. Tous droits réservés.</p>
    <a href="mentions-legales.html">Mentions légales</a>
  </footer>

  <!-- Firebase SDK -->
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>

  <!-- Effet fade-in (optionnel) -->
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      var section = document.querySelector('.fadeIn');
      if (section) section.classList.add('visible');
    });
  </script>

  <!-- Tes scripts métiers et utilitaires -->
  <script src="../JS/personnages.js"></script>
  <script src="../JS/lancement-partie.js"></script>
  <script src="../JS/security-enhance.js"></script>
  <script src="../JS/ux-enhance.js"></script>
  <script src="../JS/scalability.js"></script>

  <!-- Fenêtre flottante confirmation retour accueil -->
  <div id="confirmationRetourAccueil">
    <div class="modal-content">
      <div class="modal-question">
        Voulez-vous vraiment quitter la partie et revenir à l’accueil ?
      </div>
      <div class="modal-actions">
        <button id="confirmerRetourAccueilBtn" class="main-btn">Oui</button>
        <button id="annulerRetourAccueilBtn" class="main-btn">Non</button>
      </div>
    </div>
  </div>
</body>
</html>
