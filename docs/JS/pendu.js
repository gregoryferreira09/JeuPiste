const MOT_KEY = "pendu-mot";

let motSecret = "";
let lettresTrouvees = [];
let essaisRestants = 8;
let lettresTestees = [];

function chargerMot() {
  // Persistance locale
  const motLocal = localStorage.getItem(MOT_KEY);
  if (motLocal) {
    motSecret = motLocal;
    demarrerJeu();
  } else {
    // Tirage aléatoire entre 6 et 7 lettres
    const longueur = Math.random() < 0.5 ? 6 : 7;
    const catalogue = longueur === 6 ? MOTS_6_LETTRES : MOTS_7_LETTRES;
    motSecret = catalogue[Math.floor(Math.random() * catalogue.length)].toUpperCase();
    localStorage.setItem(MOT_KEY, motSecret);
    demarrerJeu();
  }
}

function demarrerJeu() {
  lettresTrouvees = Array(motSecret.length).fill("");
  essaisRestants = 8;
  lettresTestees = [];
  afficherMot();
  afficherAlphabet();
  afficherPendu();
  document.getElementById("message").textContent = "";
}

function afficherMot() {
  const container = document.getElementById("word-container");
  container.innerHTML = lettresTrouvees.map(l => l || "_").join(" ");
}

function afficherAlphabet() {
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const container = document.getElementById("alphabet-container");
  container.innerHTML = "";
  alpha.forEach(l => {
    const btn = document.createElement("button");
    btn.textContent = l;
    btn.disabled = lettresTestees.includes(l) || essaisRestants === 0;
    btn.onclick = () => choisirLettre(l);
    container.appendChild(btn);
  });
}

function choisirLettre(lettre) {
  if (lettresTestees.includes(lettre) || essaisRestants === 0) return;
  lettresTestees.push(lettre);
  if (motSecret.includes(lettre)) {
    motSecret.split("").forEach((l, i) => {
      if (l === lettre) {
        lettresTrouvees[i] = lettre;
      }
    });
  } else {
    essaisRestants--;
  }
  afficherMot();
  afficherAlphabet();
  afficherPendu();
  verifierFin();
}

function afficherPendu() {
  // Exemple simple, à remplacer par un dessin si besoin
  const penduDiv = document.getElementById("pendu-drawing");
  penduDiv.textContent = `Erreurs : ${8 - essaisRestants}/8`;
}

function verifierFin() {
  if (!lettresTrouvees.includes("")) {
    document.getElementById("message").textContent = "Bravo, vous avez trouvé le mot !";
    document.getElementById("alphabet-container").querySelectorAll("button").forEach(btn => btn.disabled = true);
  } else if (essaisRestants === 0) {
    document.getElementById("message").textContent = `Perdu ! Le mot était : ${motSecret}`;
    document.getElementById("alphabet-container").querySelectorAll("button").forEach(btn => btn.disabled = true);
  }
}

window.onload = chargerMot;
