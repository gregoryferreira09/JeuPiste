// docs/JS/lancement-partie.js

/**
 * Accord dynamique des phrases : gère {N}, le mot à accorder, et la conjugaison du verbe selon le sujet réel.
 * Exemples gérés :
 * - "Chaque équipe doit franchir {N} étape(s)" => "Chaque équipe doit franchir 1 étape" / "Chaque équipe doit franchir 3 étapes"
 * - "{N} défis séparent votre équipe du salut" => "1 défi sépare..." / "2 défis séparent..."
 * - "Les survivants seront ceux qui réussiront {N} mission(s)" => "Les survivants seront ceux qui réussiront 1 mission"
 */

function accorderRegle(phrase, n) {
  // Dictionnaires d'accords
  const accords = [
    // Accord sur {N} mot(s)
    { regex: /\b(\d+)\s+([a-zéèêîïûùa-zA-Z-]+)s\b/gi, singulier: "$1 $2", pluriel: "$1 $2s" },
    { regex: /\b(\d+)\s+([a-zéèêîïûùa-zA-Z-]+)es\b/gi, singulier: "$1 $2e", pluriel: "$1 $2es" },
    // Cas particuliers féminins/irrégu
    { regex: /\b(\d+)\s+étapes\b/gi, singulier: "$1 étape", pluriel: "$1 étapes" },
    { regex: /\b(\d+)\s+missions\b/gi, singulier: "$1 mission", pluriel: "$1 missions" },
    { regex: /\b(\d+)\s+quêtes\b/gi, singulier: "$1 quête", pluriel: "$1 quêtes" },
    { regex: /\b(\d+)\s+défis\b/gi, singulier: "$1 défi", pluriel: "$1 défis" },
    { regex: /\b(\d+)\s+épreuves\b/gi, singulier: "$1 épreuve", pluriel: "$1 épreuves" },
    { regex: /\b(\d+)\s+actions clés\b/gi, singulier: "$1 action clé", pluriel: "$1 actions clés" },
    { regex: /\b(\d+)\s+aventures\b/gi, singulier: "$1 aventure", pluriel: "$1 aventures" },
    // Accord du verbe si le sujet est {N}
    { regex: /\b(\d+)\s+défis? séparent\b/gi, singulier: "$1 défi sépare", pluriel: "$1 défis séparent" },
    { regex: /\b(\d+)\s+quêtes? ouvrent\b/gi, singulier: "$1 quête ouvre", pluriel: "$1 quêtes ouvrent" },
    // Ajoute ici d'autres motifs spécifiques si nécessaire
  ];

  // Insertion du nombre
  phrase = phrase.replace("{N}", n);

  // Recherche de motifs {N} + mot à accorder
  accords.forEach(acc => {
    phrase = phrase.replace(acc.regex, n === 1 ? acc.singulier : acc.pluriel);
  });

  // Accord du verbe si le sujet est {N} (ex : "1 étape doit être validée" / "2 étapes doivent être validées")
  // Cas générique : <nombre> <mot> doit/devra/doit être/... → doivent/devront/doivent être...
  if (n === 1) {
    phrase = phrase
      .replace(/\bdoivent\b/g, "doit")
      .replace(/\bdevront\b/g, "devra")
      .replace(/\bsont\b/g, "est")
      .replace(/\bseront\b/g, "sera")
      .replace(/\bséparent\b/g, "sépare")
      .replace(/\brestent\b/g, "reste")
      .replace(/\battendent\b/g, "attend")
      .replace(/\bvalident\b/g, "valide")
      .replace(/\bouvrent\b/g, "ouvre")
      .replace(/\bprouvent\b/g, "prouve")
      .replace(/\bpermettent\b/g, "permet")
      .replace(/\bpeuvent\b/g, "peut")
      .replace(/\binterviennent\b/g, "intervient");
    // Accord adjectifs
    phrase = phrase.replace(/\bindispensables\b/g, "indispensable");
  }
  // Pour n>1, on ne touche pas : le template doit être au pluriel

  // Cas où le sujet n'est PAS "N ...", on n'accorde que le mot variable
  // Ex : "Chaque équipe doit franchir {N} étape(s)" → "doit" ne varie pas
  // Ex : "Les survivants seront ceux qui réussiront {N} missions" → "seront" ne varie pas

  return phrase;
}

// === Masque la page tant que le JS n'a pas injecté les données ===
document.body.setAttribute('data-loading', '1');

document.addEventListener("DOMContentLoaded", function () {
  const salonCode = localStorage.getItem("salonCode");

  // Fallback si pas de code, pas de Firebase ou pas de catalogue
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

    // Cas spécial : scénario local Parc Saint Nicolas => texte statique Avalon (on ne touche à rien)
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
