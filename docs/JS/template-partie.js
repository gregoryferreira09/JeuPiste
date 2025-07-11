// ========== CONFIGURATION FIREBASE ==========
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

// ========== UTILS ==========
function showValidationSuccess() {
  var block = document.getElementById('validation-success');
  if (block) {
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
}

// ========== VARIABLES GLOBALES ==========
let gpsPoints = [], jetonMissionsMapping = [], missions = [], validatedMissions = [], jetonsMalus = [], epreuveEnCours = null;
let finalGpsIndex = null;
let resizeTimeout = null;

// ========== DOM + AUTH READY ==========
function onDomAndAuthReady(callback) {
  let domReady = false, authReady = false;
  function tryRun() { if (domReady && authReady) callback(); }
  document.addEventListener('DOMContentLoaded', () => {
    domReady = true;
    tryRun();
    var main = document.querySelector('.fadeIn');
    if (main) setTimeout(() => main.classList.add('visible'), 50);
    if (sessionStorage.getItem('showValidationSuccess') === '1') showValidationSuccess();
  });
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) firebase.auth().signInAnonymously();
    else {
      authReady = true;
      tryRun();
    }
  });
}

// ========== LOGIQUE SYNCHRO JEU ==========
function checkLocalStorageOrRedirect() {
  const salonCode = localStorage.getItem("salonCode");
  const equipeNum = localStorage.getItem("equipeNum");
  if (!salonCode || !equipeNum) {
    window.location.href = "accueil.html";
    return false;
  }
  return true;
}

function lancerAccueil() {
  if (!checkLocalStorageOrRedirect()) return;
  const salonCode = localStorage.getItem("salonCode");
  const equipeNum = localStorage.getItem("equipeNum");

  db.ref('parties/' + salonCode + '/scenario/gpsPoints').once('value').then(snapPoints => {
    gpsPoints = snapPoints.val() || [];
    afficherCarteCentraleTousPoints(gpsPoints);
    db.ref('parties/' + salonCode + '/scenarioJeu/repartition').once('value').then(snapMission => {
      missions = snapMission.val() || [];
      db.ref(`parties/${salonCode}/jetonMissionsMapping`).once('value').then(snapMapping => {
        jetonMissionsMapping = snapMapping.val() || [];
        db.ref(`parties/${salonCode}/finalGpsIndex`).once('value').then(snapFinal => {
          finalGpsIndex = typeof snapFinal.val() === "number" ? snapFinal.val() : null;

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
              let finalWrapper = document.getElementById('final-jeton-wrapper');
              if (finalWrapper) finalWrapper.style.display = "none";
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
}

// ========== LEAFLET MAP UTILS ==========
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

// ========== MANAGE MODALES ==========
function showModalPerdu() {
  document.getElementById('modal-perdu').classList.add('active');
}
function hideModalPerdu() {
  document.getElementById('modal-perdu').classList.remove('active');
}

// ========== LOGIQUE DE JEU (jetons, flèches, etc.) ==========
// ... ici tu gardes tes fonctions getSkullSVG, getMissionSVG, getMissionTypeByIndex,
// genererJetonsColonnes, afficherJetonFinal, showCompass, etc. comme dans ton template original ...

// ========== RESIZE (DÉBOUNCED) ==========
window.addEventListener('resize', function() {
  if (window._centralLeafletMap) {
    setTimeout(() => window._centralLeafletMap.invalidateSize(), 300);
  }
});

// ========== LANCEMENT SYNCHRO ==========
onDomAndAuthReady(() => {
  lancerAccueil();
});

// ========= Pour la modale "Perdu !" =========
document.addEventListener('DOMContentLoaded', function() {
  let btn = document.querySelector('#modal-perdu button');
  if (btn) btn.onclick = hideModalPerdu;
});
