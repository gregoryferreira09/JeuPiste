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
  const penduDiv = document.getElementById("pendu-drawing");
  const erreurs = 8 - essaisRestants;
  const etapes = [
    `<svg viewBox="0 0 120 150"><line x1="10" y1="140" x2="110" y2="140" stroke="#fff" stroke-width="5"/></svg>`, // sol
    `<svg viewBox="0 0 120 150"><line x1="10" y1="140" x2="110" y2="140" stroke="#fff" stroke-width="5"/><line x1="40" y1="140" x2="40" y2="20" stroke="#fff" stroke-width="5"/></svg>`, // poteau
    `<svg viewBox="0 0 120 150"><line x1="10" y1="140" x2="110" y2="140" stroke="#fff" stroke-width="5"/><line x1="40" y1="140" x2="40" y2="20" stroke="#fff" stroke-width="5"/><line x1="40" y1="20" x2="90" y2="20" stroke="#fff" stroke-width="5"/></svg>`, // traverse
    `<svg viewBox="0 0 120 150"><line x1="10" y1="140" x2="110" y2="140" stroke="#fff" stroke-width="5"/><line x1="40" y1="140" x2="40" y2="20" stroke="#fff" stroke-width="5"/><line x1="40" y1="20" x2="90" y2="20" stroke="#fff" stroke-width="5"/><line x1="90" y1="20" x2="90" y2="40" stroke="#fff" stroke-width="5"/></svg>`, // corde
    `<svg viewBox="0 0 120 150"><line x1="10" y1="140" x2="110" y2="140" stroke="#fff" stroke-width="5"/><line x1="40" y1="140" x2="40" y2="20" stroke="#fff" stroke-width="5"/><line x1="40" y1="20" x2="90" y2="20" stroke="#fff" stroke-width="5"/><line x1="90" y1="20" x2="90" y2="40" stroke="#fff" stroke-width="5"/><circle cx="90" cy="50" r="10" stroke="#fff" stroke-width="4" fill="none"/></svg>`, // tête
    `<svg viewBox="0 0 120 150"><line x1="10" y1="140" x2="110" y2="140" stroke="#fff" stroke-width="5"/><line x1="40" y1="140" x2="40" y2="20" stroke="#fff" stroke-width="5"/><line x1="40" y1="20" x2="90" y2="20" stroke="#fff" stroke-width="5"/><line x1="90" y1="20" x2="90" y2="40" stroke="#fff" stroke-width="5"/><circle cx="90" cy="50" r="10" stroke="#fff" stroke-width="4" fill="none"/><line x1="90" y1="60" x2="90" y2="100" stroke="#fff" stroke-width="4"/></svg>`, // corps
    `<svg viewBox="0 0 120 150"><line x1="10" y1="140" x2="110" y2="140" stroke="#fff" stroke-width="5"/><line x1="40" y1="140" x2="40" y2="20" stroke="#fff" stroke-width="5"/><line x1="40" y1="20" x2="90" y2="20" stroke="#fff" stroke-width="5"/><line x1="90" y1="20" x2="90" y2="40" stroke="#fff" stroke-width="5"/><circle cx="90" cy="50" r="10" stroke="#fff" stroke-width="4" fill="none"/><line x1="90" y1="60" x2="90" y2="100" stroke="#fff" stroke-width="4"/><line x1="90" y1="70" x2="75" y2="85" stroke="#fff" stroke-width="4"/></svg>`, // bras gauche
    `<svg viewBox="0 0 120 150"><line x1="10" y1="140" x2="110" y2="140" stroke="#fff" stroke-width="5"/><line x1="40" y1="140" x2="40" y2="20" stroke="#fff" stroke-width="5"/><line x1="40" y1="20" x2="90" y2="20" stroke="#fff" stroke-width="5"/><line x1="90" y1="20" x2="90" y2="40" stroke="#fff" stroke-width="5"/><circle cx="90" cy="50" r="10" stroke="#fff" stroke-width="4" fill="none"/><line x1="90" y1="60" x2="90" y2="100" stroke="#fff" stroke-width="4"/><line x1="90" y1="70" x2="75" y2="85" stroke="#fff" stroke-width="4"/><line x1="90" y1="70" x2="105" y2="85" stroke="#fff" stroke-width="4"/></svg>`, // bras droit
    `<svg viewBox="0 0 120 150"><line x1="10" y1="140" x2="110" y2="140" stroke="#fff" stroke-width="5"/><line x1="40" y1="140" x2="40" y2="20" stroke="#fff" stroke-width="5"/><line x1="40" y1="20" x2="90" y2="20" stroke="#fff" stroke-width="5"/><line x1="90" y1="20" x2="90" y2="40" stroke="#fff" stroke-width="5"/><circle cx="90" cy="50" r="10" stroke="#fff" stroke-width="4" fill="none"/><line x1="90" y1="60" x2="90" y2="100" stroke="#fff" stroke-width="4"/><line x1="90" y1="70" x2="75" y2="85" stroke="#fff" stroke-width="4"/><line x1="90" y1="70" x2="105" y2="85" stroke="#fff" stroke-width="4"/><line x1="90" y1="100" x2="80" y2="120" stroke="#fff" stroke-width="4"/></svg>`, // jambe gauche
    `<svg viewBox="0 0 120 150"><line x1="10" y1="140" x2="110" y2="140" stroke="#fff" stroke-width="5"/><line x1="40" y1="140" x2="40" y2="20" stroke="#fff" stroke-width="5"/><line x1="40" y1="20" x2="90" y2="20" stroke="#fff" stroke-width="5"/><line x1="90" y1="20" x2="90" y2="40" stroke="#fff" stroke-width="5"/><circle cx="90" cy="50" r="10" stroke="#fff" stroke-width="4" fill="none"/><line x1="90" y1="60" x2="90" y2="100" stroke="#fff" stroke-width="4"/><line x1="90" y1="70" x2="75" y2="85" stroke="#fff" stroke-width="4"/><line x1="90" y1="70" x2="105" y2="85" stroke="#fff" stroke-width="4"/><line x1="90" y1="100" x2="80" y2="120" stroke="#fff" stroke-width="4"/><line x1="90" y1="100" x2="100" y2="120" stroke="#fff" stroke-width="4"/></svg>` // jambe droite
  ];
  penduDiv.innerHTML = etapes[Math.min(erreurs, etapes.length - 1)] + `<div style="text-align:center;margin-top:8px;">Erreurs : ${erreurs}/8</div>`;
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
