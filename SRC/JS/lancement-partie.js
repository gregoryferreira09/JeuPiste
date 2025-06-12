// --- Firebase config (à adapter selon ton projet si besoin) ---
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
const presentationCourseOrientation = "Bienvenue à la grande course d’orientation ! Explorez le terrain, résolvez des énigmes et trouvez tous les points de contrôle avec votre équipe.";


const objectifGeneral = "Votre objectif : être la première équipe à valider tous les points de passage ! Communication, réflexion et rapidité seront vos meilleurs atouts.";

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
    document.getElementById("presentation").innerText = "Code salon introuvable.";
    return;
  }
  firebase.database().ref('parties/' + salonCode + '/joueurs').once('value').then(function(snapshot) {
    let joueurs = [];
    snapshot.forEach(child => {
      joueurs.push(child.val().pseudo);
    });
    const equipes = genererEquipes(joueurs);
    document.getElementById("presentation").innerText = presentationCourseOrientation;
    document.getElementById("objectifGeneral").innerText = objectifGeneral;
    const detailDiv = document.getElementById("detailJeu");
    detailDiv.innerHTML = "";
    detailDiv.innerHTML += `<div style="margin-bottom:10px;">${equipes.length} équipe${equipes.length > 1 ? "s" : ""} :</div>`;
    equipes.forEach((equipe, idx) => {
      let membres = equipe.join(" & ");
      detailDiv.innerHTML += `<div><strong>Équipe ${idx + 1} :</strong> ${membres}</div>`;
    });
  });
}

document.addEventListener("DOMContentLoaded", afficherCourseOrientation);
