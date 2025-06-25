// docs/JS/lancement-partie.js

/**
 * Accord dynamique des phrases selon le sujet et le nombre
 * - Remplace {N} par le nombre.
 * - Accorde les mots variables (défi, mission, etc.).
 * - Accorde la conjugaison si le sujet change avec N (ex: "1 mission sera validée" / "2 missions seront validées").
 * - NE modifie PAS les verbes ni les pronoms dont le sujet ne dépend pas de N (ex: "Les survivants seront ceux qui...")
 */
function accorderRegle(phrase, n) {
  // Accord des mots à nombre variable
  phrase = phrase.replace("{N}", n);

  // Cas particulier : on ne touche pas aux verbes/pronoms dont le sujet ne dépend pas de N
  // On ne touche pas à "Les survivants seront ceux qui..." ni à "Les équipes devront..."
  // On accorde seulement si {N} est le véritable sujet du verbe (ex: "{N} missions seront validées")

  // Accord mots
  if (n === 1) {
    phrase = phrase
      .replace(/\bmissions\b/gi, "mission")
      .replace(/\bdéfis\b/gi, "défi")
      .replace(/\bquêtes\b/gi, "quête")
      .replace(/\bépreuves\b/gi, "épreuve")
      .replace(/\bétapes\b/gi, "étape")
      .replace(/\bactions clés\b/gi, "action clé")
      .replace(/\baventures\b/gi, "aventure")
      .replace(/\binterventions héroïques\b/gi, "intervention héroïque")
      .replace(/\bétapes décisives\b/gi, "étape décisive")
      .replace(/\bsituations critiques\b/gi, "situation critique");
    // Accord adjectifs
    phrase = phrase
      .replace(/\bindispensables\b/gi, "indispensable")
      .replace(/\bmagiques\b/gi, "magique");
    // Accord des verbes si le sujet est {N}
    // Cas typique : "1 mission sera validée", "1 défi sépare", etc.
    phrase = phrase
      .replace(/\bseront validées\b/gi, "sera validée")
      .replace(/\bsont\b/gi, "est")
      .replace(/\bséparent\b/gi, "sépare")
      .replace(/\brestent\b/gi, "reste")
      .replace(/\battendent\b/gi, "attend")
      .replace(/\bdoivent\b/gi, "doit")
      .replace(/\bpeuvent\b/gi, "peut")
      .replace(/\bpermettent\b/gi, "permet")
      .replace(/\bouvrent\b/gi, "ouvre")
      .replace(/\bprouvent\b/gi, "prouve")
      .replace(/\bvalident\b/gi, "valide")
      .replace(/\bentravent\b/gi, "entrave");
    // Exceptions : NE PAS toucher à "seront" si le sujet est toujours pluriel ("Les survivants seront...")
    // On évite toute transformation de "seront" si la phrase commence par "Les survivants", "Les équipes", "Tous", etc.
    if (/^(Les survivants|Les équipes|Tous|Toutes|Chaque équipe|Chaque joueur)/i.test(phrase.trim())) {
      // Annuler les remplacements qui auraient touché à "seront"
      phrase = phrase.replace(/\bsera\b/gi, "seront");
    }
  }
  // Sinon (n > 1), rien à remplacer, le template doit être correct à la base.
  return phrase;
}

// === Masque la page tant que le JS n'a pas injecté les données ===
document.body.setAttribute('data-loading', '1');

document.addEventListener("DOMContentLoaded", function () {
  const salonCode = localStorage.getItem("salonCode");

  // Fallback : affiche un contenu par défaut si pas de code, pas de Firebase ou pas de catalogue
  if (!salonCode || typeof firebase === "undefined" || typeof LANCEMENT_TEXTE === "undefined") {
    const textes = (typeof LANCEMENT_TEXTE !== "undefined" ? LANCEMENT_TEXTE["arthurien"] : []);
    const texteAleatoire = textes.length ? textes[Math.floor(Math.random() * textes.length)] :
      "Bienvenue dans l'aventure ! Préparez-vous pour des épreuves épiques.";
    const presentation = document.getElementById("textePresentation");
    if (presentation) presentation.innerHTML = texteAleatoire;

    if (typeof OBJECTIF_TEXTE !== "undefined") {
      const objectifs = OBJECTIF_TEXTE["arthurien"];
      const objectifAleatoire = objectifs[Math.floor(Math.random() * objectifs.length)];
      const objectifElem = document.getElementById("objectifText");
      if (objectifElem) objectifElem.textContent = objectifAleatoire;
    }
    if (typeof REGLES_TEXTE !== "undefined") {
      const regles = REGLES_TEXTE["arthurien"];
      let regleAleatoire = regles[Math.floor(Math.random() * regles.length)];
      regleAleatoire = accorderRegle(regleAleatoire, 6); // Valeur par défaut
      const reglesElem = document.getElementById("reglesCourse");
      if (reglesElem) reglesElem.innerHTML = `<strong>Règles du jeu&nbsp;:</strong><br>${regleAleatoire}`;
    }
    document.body.setAttribute('data-loading', '0');
    return;
  }

  // On récupère le code scénario joué pour ce salon
  firebase.database().ref('parties/' + salonCode + '/parametres').once('value').then(paramSnap => {
    const params = paramSnap.val() || {};
    const scenarioCode = params.scenarioCode;

    // Cas spécial : scénario local Parc Saint Nicolas => texte statique Avalon (on ne touche à rien)
    if (scenarioCode === "parc_saint_nicolas") {
      document.body.setAttribute('data-loading', '0');
      return;
    }

    // Récupère le scénario complet pour compter le vrai nombre d'étapes
    firebase.database().ref('scenarios/' + scenarioCode).once('value').then(scenarSnap => {
      const data = scenarSnap.val() || {};
      const mode = data.mode || 'arthurien';
      const scenarioArray = Array.isArray(data.scenario) ? data.scenario : [];
      const nbQuetes = scenarioArray.length || params.nbQuetes || 6;

      // Texte de lancement dynamique
      const textes = LANCEMENT_TEXTE[mode] || LANCEMENT_TEXTE['arthurien'];
      const texteAleatoire = textes[Math.floor(Math.random() * textes.length)];
      const presentation = document.getElementById("textePresentation");
      if (presentation) presentation.innerHTML = texteAleatoire;

      // Titre dynamique
      const titre = document.getElementById("titreCourse");
      if (titre) titre.textContent = mode.charAt(0).toUpperCase() + mode.slice(1).replace(/_/g, " ");

      // Objectif dynamique
      if (typeof OBJECTIF_TEXTE !== "undefined") {
        const objectifs = OBJECTIF_TEXTE[mode] || OBJECTIF_TEXTE['arthurien'];
        const objectifAleatoire = objectifs[Math.floor(Math.random() * objectifs.length)];
        const objectifElem = document.getElementById("objectifText");
        if (objectifElem) objectifElem.textContent = objectifAleatoire;
      }

      // Règles dynamiques (avec {N} correct ET accord)
      if (typeof REGLES_TEXTE !== "undefined") {
        const regles = REGLES_TEXTE[mode] || REGLES_TEXTE['arthurien'];
        let regleAleatoire = regles[Math.floor(Math.random() * regles.length)];
        regleAleatoire = accorderRegle(regleAleatoire, nbQuetes);
        const reglesElem = document.getElementById("reglesCourse");
        if (reglesElem) reglesElem.innerHTML = `<strong>Règles du jeu&nbsp;:</strong><br>${regleAleatoire}`;
      }
      document.body.setAttribute('data-loading', '0');
    }).catch(() => {
      // Fallback si erreur
      const textes = LANCEMENT_TEXTE['arthurien'];
      const texteAleatoire = textes[Math.floor(Math.random() * textes.length)];
      const presentation = document.getElementById("textePresentation");
      if (presentation) presentation.innerHTML = texteAleatoire;

      if (typeof OBJECTIF_TEXTE !== "undefined") {
        const objectifs = OBJECTIF_TEXTE["arthurien"];
        const objectifAleatoire = objectifs[Math.floor(Math.random() * objectifs.length)];
        const objectifElem = document.getElementById("objectifText");
        if (objectifElem) objectifElem.textContent = objectifAleatoire;
      }
      if (typeof REGLES_TEXTE !== "undefined") {
        const regles = REGLES_TEXTE["arthurien"];
        let regleAleatoire = regles[Math.floor(Math.random() * regles.length)];
        regleAleatoire = accorderRegle(regleAleatoire, 6);
        const reglesElem = document.getElementById("reglesCourse");
        if (reglesElem) reglesElem.innerHTML = `<strong>Règles du jeu&nbsp;:</strong><br>${regleAleatoire}`;
      }
      document.body.setAttribute('data-loading', '0');
    });
  });
});

// === Activation du bouton "Démarrer" après 30s avec décompte ===
document.addEventListener("DOMContentLoaded", function () {
  const demarrerBtn = document.getElementById("demarrerBtn");
  let timer = 30;
  if (demarrerBtn) {
    demarrerBtn.style.pointerEvents = "none";
    demarrerBtn.style.opacity = "0.6";
    demarrerBtn.textContent = "Disponible dans 30s";
    const interval = setInterval(() => {
      timer--;
      if (timer > 0) {
        demarrerBtn.textContent = `Disponible dans ${timer}s`;
      } else {
        clearInterval(interval);
        demarrerBtn.style.pointerEvents = "auto";
        demarrerBtn.style.opacity = "1";
        demarrerBtn.textContent = "Démarrer la partie";
      }
    }, 1000);
  }
});

// === Effet fade-in pour afficher le contenu principal ===
document.addEventListener("DOMContentLoaded", function() {
  var main = document.querySelector('.fadeIn');
  if (main) main.classList.add('visible');
});

// === Gestion de la modale de retour accueil ===
document.addEventListener("DOMContentLoaded", function () {
  const btnRetour = document.getElementById("btnRetourAccueil");
  const confirmation = document.getElementById("confirmationRetourAccueil");
  const btnConfirmer = document.getElementById("confirmerRetourAccueilBtn");
  const btnAnnuler = document.getElementById("annulerRetourAccueilBtn");

  if (btnRetour && confirmation && btnConfirmer && btnAnnuler) {
    btnRetour.addEventListener("click", () => {
      confirmation.style.display = "flex";
      btnConfirmer.focus();
    });
    btnConfirmer.addEventListener("click", () => {
      window.location.href = "accueil.html";
    });
    btnAnnuler.addEventListener("click", () => {
      confirmation.style.display = "none";
      btnRetour.focus();
    });
  }
});
