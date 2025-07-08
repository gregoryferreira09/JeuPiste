window.addEventListener('DOMContentLoaded', function() {
  if (sessionStorage.getItem('showValidationSuccess') === '1') {
    var block = document.getElementById('validation-success');
    block.style.display = 'block';
    const nbRest = sessionStorage.getItem('nbEpreuvesRestantes') || '';
    if (nbRest && Number(nbRest) > 0) {
      document.getElementById('validation-epreuves-restantes').textContent =
        `Plus que ${nbRest} épreuve${(Number(nbRest)>1 ? 's' : '')} !`;
    } else {
      document.getElementById('validation-epreuves-restantes').textContent = "C'était la dernière épreuve !";
    }
    setTimeout(function() {
      block.style.display = 'none';
      sessionStorage.removeItem('showValidationSuccess');
      sessionStorage.removeItem('nbEpreuvesRestantes');
    }, 1900);
  }
});

const firebaseConfig = {
  apiKey: "AIzaSyD-BxBu-4ElCqbHrZPM-4-6yf1-yWnL1bI",
  authDomain: "murder-party-ba8d1.firebaseapp.com",
  databaseURL: "https://murder-party-ba8d1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "murder-party-ba8d1",
  storageBucket: "murder-party-ba8d1.firebasestorage.app",
  messagingSenderId: "20295055805",
  appId: "1:20295055805:web:0963719c3f23ab7752fad4",
  measurementId: "G-KSBMBB7KMJ"
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let searchingArrowInterval = null;
let isSearchingArrow = false;
let currentJetonIndex = null;
let gpsPoints = [], jetonMissionsMapping = [], missions = [], validatedMissions = [], jetonsMalus = [], epreuveEnCours = null;
let jetonsState = [];

function getSkullSVG() {
  return `<svg class="svg-skull" width="38" height="38" viewBox="0 0 32 32" fill="none">
  <g>
  <g stroke="#fff" stroke-width="3" stroke-linecap="round">
    <line x1="7" y1="27" x2="25" y2="9"/>
    <line x1="25" y1="27" x2="7" y2="9"/>
  </g>
  <ellipse cx="16" cy="15" rx="9" ry="8" fill="#fdfdfd" stroke="#aaa" stroke-width="1.7"/>
  <ellipse cx="16" cy="24" rx="5" ry="3.2" fill="#ececec"/>
  <ellipse cx="13" cy="15" rx="1.7" ry="2.2" fill="#222"/>
  <ellipse cx="19" cy="15" rx="1.7" ry="2.2" fill="#222"/>
  <ellipse cx="16" cy="18.2" rx="1.1" ry="1.6" fill="#444"/>
  <rect x="14.3" y="25.2" width="1.1" height="1.2" rx="0.3" fill="#ccc"/>
  <rect x="16.6" y="25.2" width="1.1" height="1.2" rx="0.3" fill="#ccc"/>
  </g>
  </svg>`;
}

function getMissionSVG(type, gold = false, isFinal = false) {
  let fillColor = isFinal ? '#ffe285' : gold ? '#d4af37' : '#fff';
  let extraClass = gold ? ' gold' : '';
  switch (type) {
    case "photo":
    case "photo_inconnus":
      return `<svg class="svg-epreuve${extraClass}" viewBox="0 0 24 24" width="30" height="30" fill="#e0c185"><path d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2.586A2 2 0 0 1 9.828 5.586l.586.586H19a2 2 0 0 1 2 2v11zM7.5 12A2.5 2.5 0 1 0 12.5 12A2.5 2.5 0 0 0 7.5 12z"/></svg>`;
    case "video":
      return `<svg class="svg-epreuve${extraClass}" viewBox="0 0 24 24" width="30" height="30" fill="#e0c185"><path d="M17 10.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3.5l4 4v-11l-4 4z"/></svg>`;
    case "audio":
      return `<svg class="svg-epreuve${extraClass}" viewBox="0 0 24 24" width="30" height="30" fill="#e0c185"><rect x="9" y="4" width="6" height="10" rx="3"/><rect x="11" y="14" width="2" height="4" rx="1"/></svg>`;
    case "collecte_objet":
    case "objet":
      return `<svg class="svg-epreuve${extraClass}" viewBox="0 0 38 38" width="30" height="30" fill="none"><circle cx="17" cy="17" r="9" stroke="#e0c185" stroke-width="3" fill="none"/><rect x="23.5" y="23.5" width="8" height="2.5" rx="1.25" fill="#e0c185"/></svg>`;
    case "fichier":
      return `<svg class="svg-epreuve${extraClass}" viewBox="0 0 24 24" width="30" height="30" fill="none"><rect x="6" y="7" width="12" height="11" rx="2" fill="#e0c185" stroke="#e0c185" stroke-width="2"/><rect x="6" y="5" width="4" height="2" rx="1" fill="#e0c185"/></svg>`;
    default:
      return `<svg class="svg-epreuve${extraClass}" viewBox="0 0 24 24" width="30" height="30" fill="#e0c185"><rect x="4" y="7" width="16" height="11" rx="2"/></svg>`;
  }
}

function getMissionTypeByIndex(missionIdx, missionsList) {
  const mission = missionsList && missionsList[missionIdx];
  return mission ? (mission.type || mission.epreuve?.type) : null;
}

document.addEventListener("DOMContentLoaded", function() {
  var main = document.querySelector('.fadeIn');
  if (main) setTimeout(() => main.classList.add('visible'), 50);
});
firebase.auth().onAuthStateChanged(function(user) {
  if (!user) firebase.auth().signInAnonymously();
  else lancerAccueil();
});

let userPosition = null;
function getDistanceMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const toRad = deg => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function afficherCarteCentraleTousPoints(points) {
  let mapDiv = document.getElementById('centralMap');
  if (!mapDiv) return;
  if (window._centralLeafletMap) {
    window._centralLeafletMap.remove();
    window._centralLeafletMap = null;
  }
  let center = points && points.length ? [points[0].lat, points[0].lng] : [47.4784, -0.5631];
  let map = L.map('centralMap').setView(center, 15);
  window._centralLeafletMap = map;
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);
  if (points && points.length) {
    points.forEach((pt, idx) => {
      if(pt.lat && pt.lng)
        L.marker([pt.lat, pt.lng], { title: `Point ${idx + 1}` })
          .addTo(map)
          .bindPopup(`Point ${idx + 1}<br>${pt.lat.toFixed(5)}, ${pt.lng.toFixed(5)}`);
    });
    let group = new L.featureGroup(points.filter(pt=>pt.lat&&pt.lng).map(pt=>L.marker([pt.lat, pt.lng])));
    map.fitBounds(group.getBounds().pad(0.2));
  }
}

// ... (toutes les autres fonctions JS inchangées à partir d'ici: genererJetonsColonnes, afficherJetonFinal, showCompass, startSearchingArrow, stopSearchingArrow, hideCompass, etc.) ...
// Pour la lisibilité, je ne les recopie pas car tu les as déjà : elles sont inchangées et doivent être incluses telles quelles.

function genererJetonsColonnes(gpsPoints, jetonMissionsMapping, missionsList, validatedMissions, finalGpsIndex, toutesMissionsValidees, jetonsMalus, epreuveEnCours) {
  // ... tout le code de la fonction, inchangé (voir tes messages précédents) ...
  // (Cette fonction est inchangée, copie-la telle quelle)
}
function afficherJetonFinal(gpsPoints, finalGpsIndex) {
  // ... inchangé ...
}
let compassWatchId = null;
let lastDistance = null;
function showCompass(targetGps, onArrivee) {
  // ... inchangé ...
}
function startSearchingArrow() {
  // ... inchangé ...
}
function stopSearchingArrow() {
  // ... inchangé ...
}
function hideCompass() {
  // ... inchangé ...
}

function lancerAccueil() {
  const salonCode = localStorage.getItem("salonCode");
  const equipeNum = localStorage.getItem("equipeNum");
  db.ref('parties/' + salonCode + '/scenario/gpsPoints').once('value').then(snapPoints => {
    gpsPoints = snapPoints.val() || [];
    afficherCarteCentraleTousPoints(gpsPoints); // Correction GPS ici !
    db.ref('parties/' + salonCode + '/scenarioJeu/repartition').once('value').then(snapMission => {
      missions = snapMission.val() || [];
      db.ref(`parties/${salonCode}/jetonMissionsMapping`).once('value').then(snapMapping => {
        jetonMissionsMapping = snapMapping.val() || [];
        db.ref(`parties/${salonCode}/finalGpsIndex`).once('value').then(snapFinal => {
          const finalGpsIndex = typeof snapFinal.val() === "number" ? snapFinal.val() : null;
          function redraw() {
            let totalMissions = missions.length;
            let nbValidees = 0;
            for (let i = 0; i < totalMissions; i++) {
              if (validatedMissions && validatedMissions[i] && validatedMissions[i].validated) nbValidees++;
            }
            let toutesMissionsValidees = (nbValidees === totalMissions);
            genererJetonsColonnes(
              gpsPoints,
              jetonMissionsMapping,
              missions,
              validatedMissions,
              finalGpsIndex,
              toutesMissionsValidees,
              jetonsMalus,
              epreuveEnCours
            );
            if (toutesMissionsValidees && finalGpsIndex !== null) {
              afficherJetonFinal(gpsPoints, finalGpsIndex);
            } else {
              document.getElementById('final-jeton-wrapper').style.display = "none";
            }
          }
          db.ref(`parties/${salonCode}/equipes/${equipeNum}/jetonsMalus`).on('value', snapMalus => {
            jetonsMalus = snapMalus.val() || [];
            redraw();
          });
          db.ref(`parties/${salonCode}/equipes/${equipeNum}/epreuves`).on('value', snapStatus => {
            validatedMissions = snapStatus.val() || {};
            redraw();
          });
          db.ref(`parties/${salonCode}/equipes/${equipeNum}/epreuveEnCours`).on('value', snapEpreuve => {
            epreuveEnCours = snapEpreuve.val();
            redraw();
          });
          redraw();
        });
      });
    });
  });
  window.addEventListener('resize', () => {
    lancerAccueil();
  });
}
