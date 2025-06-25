function accorderRegle(phrase, n) {
  // Dictionnaires d'accords (accord uniquement sur le mot variable)
  const accords = [
    { regex: /\b(\d+)\s+([a-zéèêîïûùa-zA-Z-]+)s\b/gi, singulier: "$1 $2", pluriel: "$1 $2s" },
    { regex: /\b(\d+)\s+([a-zéèêîïûùa-zA-Z-]+)es\b/gi, singulier: "$1 $2e", pluriel: "$1 $2es" },
    { regex: /\b(\d+)\s+étapes\b/gi, singulier: "$1 étape", pluriel: "$1 étapes" },
    { regex: /\b(\d+)\s+missions\b/gi, singulier: "$1 mission", pluriel: "$1 missions" },
    { regex: /\b(\d+)\s+quêtes\b/gi, singulier: "$1 quête", pluriel: "$1 quêtes" },
    { regex: /\b(\d+)\s+défis\b/gi, singulier: "$1 défi", pluriel: "$1 défis" },
    { regex: /\b(\d+)\s+épreuves\b/gi, singulier: "$1 épreuve", pluriel: "$1 épreuves" },
    { regex: /\b(\d+)\s+actions clés\b/gi, singulier: "$1 action clé", pluriel: "$1 actions clés" },
    { regex: /\b(\d+)\s+aventures\b/gi, singulier: "$1 aventure", pluriel: "$1 aventures" },
    { regex: /\b(\d+)\s+défis? séparent\b/gi, singulier: "$1 défi sépare", pluriel: "$1 défis séparent" },
    { regex: /\b(\d+)\s+quêtes? ouvrent\b/gi, singulier: "$1 quête ouvre", pluriel: "$1 quêtes ouvrent" },
    // Ajoute ici d'autres motifs spécifiques si nécessaire
  ];

  // Insertion du nombre
  phrase = phrase.replace("{N}", n);

// Accord sur le mot variable seulement (jamais sur le verbe avant)
accords.forEach(acc => {
  phrase = phrase.replace(acc.regex, n === 1 ? acc.singulier : acc.pluriel);
});

// Accord des adjectifs qui suivent directement le nom compté
phrase = phrase.replace(/(\d+)\s+([a-zéèêîïûùa-zA-Z-]+)\s+critiques\b/gi, function(_, nombre, nom) {
  return (parseInt(nombre) === 1) ? `${nombre} ${nom} critique` : `${nombre} ${nom} critiques`;
});

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

  // Récupère le type et le mode (à adapter selon ton routing)
const typeMission = window.typeMission || "photo";
const mode = window.mode || "arthurien";

// Tire un titre et une phrase d'ambiance aléatoires
const { titre, phrase } = getRandomAtmosphere(typeMission, mode);

// Remplit le HTML
document.getElementById("titre-quete").textContent = titre;
document.getElementById("metaphore-quete").innerHTML = phrase;
  
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
