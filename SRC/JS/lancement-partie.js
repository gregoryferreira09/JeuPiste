// --- Configuration Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyD-BxBu-4ElCqbHrZPM-4-6yf1-yWnL1bI",
  authDomain: "murder-party-ba8d1.firebaseapp.com",
  databaseURL: "https://murder-party-ba8d1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "murder-party-ba8d1",
  storageBucket: "murder-party-ba8d1.appspot.com",
  messagingSenderId: "20295055805",
  appId: "1:20295055805:web:0963719c3f23ab7752fad4",
  measurementId: "G-KSBMBB7KMJ"
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

// --- Textes fixes de la course d’orientation ---
const presentationCourseOrientation =
  `Bienvenue à la plus rocambolesque des courses d’orientation&nbsp;!<br><br>
  Explorez le parc, résolvez des énigmes et trouvez tous les points de contrôle avec votre équipe.`;

const objectifGeneral =
  `<span style="text-decoration: underline; font-weight: bold;">Votre objectif&nbsp;:</span>
  être la première équipe à valider tous les points de passage&nbsp;!<br>
  Communication, réflexion et rapidité seront vos meilleurs atouts.`;

// --- Génération des équipes ---
function genererEquipes(joueurs) {
  let equipes = [];
  let shuffled = joueurs.slice().sort(() => Math.random() - 0.5);
  while (shuffled.length > 0) {
    if (shuffled.length === 3 || shuffled.length === 1) {
      equipes.push(shuffled.splice(0, 3));
    } else {
      equipes.push(shuffled.splice(0, 2));
    }
  }
  return equipes;
}

// --- Remplissage du HTML ---
function afficherCourseOrientation() {
  const salonCode = localStorage.getItem("salonCode");
  if (!salonCode) {
    document.getElementById("presentation").innerHTML = "<b>Code salon introuvable.</b>";
    document.getElementById("objectifGeneral").innerHTML = "";
    document.getElementById("detailJeu").innerHTML = "";
    return;
  }

  firebase.database().ref('parties/' + salonCode + '/joueurs').once('value').then(function(snapshot) {
    let joueurs = [];
    snapshot.forEach(child => {
      joueurs.push(child.val().pseudo);
    });

    // Présentation
    const presentationDiv = document.getElementById("presentation");
    presentationDiv.innerHTML = presentationCourseOrientation;
    presentationDiv.style.marginBottom = "28px";
    presentationDiv.style.fontSize = "1.13em";
    presentationDiv.style.lineHeight = "1.5";

    // Objectif général avec soulignage
    const objectifDiv = document.getElementById("objectifGeneral");
    objectifDiv.innerHTML = objectifGeneral;
    objectifDiv.style.marginBottom = "32px";
    objectifDiv.style.fontSize = "1.18em";
    objectifDiv.style.lineHeight = "1.6";

    // Détail des équipes (aéré et lisible)
    const detailDiv = document.getElementById("detailJeu");
    if (joueurs.length === 0) {
      detailDiv.innerHTML = "<i>Aucun joueur connecté.</i>";
      return;
    }
    const equipes = genererEquipes(joueurs);
    detailDiv.innerHTML = `
      <div style="margin-bottom:18px;font-size:1.13em">${equipes.length} équipe${equipes.length > 1 ? "s" : ""} :</div>
      <ul style="list-style:none;padding:0;margin:0;">
        ${equipes.map((equipe, idx) => `
          <li style="margin-bottom: 18px; padding: 12px 0; border-bottom: 1px solid #e0c18544;">
            <strong style="color:#e0c185;font-size:1.13em;">Équipe ${idx + 1} :</strong>
            <span style="color:#f4e4c1;margin-left:12px;">${equipe.join(" &nbsp;&nbsp; ")}</span>
          </li>
        `).join('')}
      </ul>
    `;
    detailDiv.style.fontSize = "1.09em";
    detailDiv.style.lineHeight = "1.7";
  });
}

document.addEventListener("DOMContentLoaded", afficherCourseOrientation);
