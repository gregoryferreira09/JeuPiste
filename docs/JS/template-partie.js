// ========== CONFIGURATION FIREBASE ==========
const firebaseConfig = {
  apiKey: "AIzaSyD-BxBu-4ElCqbHrZPM-4-6yf1-yWnL1bI",
  authDomain: "murder-party-ba8d1.firebaseapp.com",
  databaseURL: "https://murder-party-ba8d1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "murder-party-ba8d1",
  storageBucket: "murder-party-ba8d1",
  messagingSenderId: "20295055805",
  appId: "1:20295055805:web:0963719c3f23ab7752fad4",
  measurementId: "G-KSBMBB7KMJ"
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ========== VARIABLES GLOBALES ==========
let gpsPoints = [], jetonMissionsMapping = [], missions = [], validatedMissions = [], jetonsMalus = [], epreuveEnCours = null;
let finalGpsIndex = null;
let jetonsState = [];
let currentJetonIndex = null;
let userPosition = null;

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

// ========== Remise à zéro de l'épreuve en cours ==========
function resetEpreuveEnCours() {
  const salonCode = localStorage.getItem("salonCode");
  const equipeNum = localStorage.getItem("equipeNum");
  if (salonCode && equipeNum) {
    db.ref('parties/' + salonCode + '/equipes/' + equipeNum + '/epreuveEnCours').set(null);
  }
}

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

// ========== CHRONO GLOBAL ==========
function initGlobalChrono() {
  const dureeMinutes = parseInt(localStorage.getItem("dureeMinutes"), 10);
  let chronoDiv = document.getElementById("chrono-global");
  if (!chronoDiv) {
    chronoDiv = document.createElement("div");
    chronoDiv.id = "chrono-global";
    // --- STYLE GROS ET VISIBLE ---
    chronoDiv.style.fontSize = "2.2em";
    chronoDiv.style.color = "#e0c185";
    chronoDiv.style.marginBottom = "18px";
    chronoDiv.style.fontWeight = "bold";
    chronoDiv.style.textAlign = "center";
    chronoDiv.style.background = "#2c1a1a";
    chronoDiv.style.borderRadius = "12px";
    chronoDiv.style.padding = "18px 0 12px 0";
    chronoDiv.style.boxShadow = "0 2px 12px #0004";
    chronoDiv.style.letterSpacing = "1px";
    // Place le chrono juste avant la carte
    const mapBlock = document.getElementById("central-map-block");
    if (mapBlock && mapBlock.parentNode) {
      mapBlock.parentNode.insertBefore(chronoDiv, mapBlock);
    } else {
      const main = document.querySelector('.main-accueil');
      if (main) main.insertBefore(chronoDiv, main.firstChild);
    }
  }
  if (isNaN(dureeMinutes) || dureeMinutes < 1) {
    chronoDiv.style.display = "none";
    return;
  }
  chronoDiv.style.display = "block";
  let totalSeconds = dureeMinutes * 60;
  let endTimestamp = Date.now() + totalSeconds * 1000;
  let wasRed = false;

  function updateChrono() {
    let now = Date.now();
    let remaining = Math.max(0, Math.round((endTimestamp - now) / 1000));
    let min = Math.floor(remaining / 60);
    let sec = remaining % 60;

    // Format plus lisible (toujours deux chiffres sur les secondes)
    chronoDiv.textContent = `⏰ Temps restant : ${min}m${sec < 10 ? "0" : ""}${sec}s`;

    // Effet ROUGE vif quand pile une minute (60s) restante
    if (remaining === 60 && !wasRed) {
      chronoDiv.style.color = "#ff3b3b";
      chronoDiv.style.background = "#fff0f0";
      chronoDiv.style.transition = "color 0.08s, background 0.08s";
      wasRed = true;
      setTimeout(() => {
        chronoDiv.style.color = "#e0c185";
        chronoDiv.style.background = "#2c1a1a";
      }, 950);
    }
    if (remaining !== 60) {
      wasRed = false;
    }

    if (remaining > 0) {
      setTimeout(updateChrono, 1000);
    } else {
      chronoDiv.textContent = "⏰ Temps écoulé !";
      chronoDiv.style.color = "#ff3b3b";
      chronoDiv.style.background = "#fff0f0";
    }
  }
  updateChrono();
}

// ========== MASQUER OU AFFICHER LA CARTE SELON showMap ==========
function handleShowMap() {
  let showMap = true;
  if (localStorage.getItem("showMap") !== null) {
    showMap = localStorage.getItem("showMap") === "1";
  }
  // Applique la classe immédiatement
  function doHide() {
    const mapBlock = document.getElementById("central-map-block");
    if (mapBlock) {
      if (!showMap) {
        mapBlock.classList.add("hide-map");
      } else {
        mapBlock.classList.remove("hide-map");
      }
    }
  }
  // Lance tout de suite si la div existe, sinon réessaye au DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", doHide);
  } else {
    doHide();
  }
}

// ========== LOGIQUE SYNCHRO ==========

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

// ========== LOGIQUE DES JETONS ==========
function tenterAccesJetonCourant() {
  if (currentJetonIndex === null) return;
  let i = currentJetonIndex;
  if (!userPosition || getDistanceMeters(userPosition.lat, userPosition.lng, gpsPoints[i].lat, gpsPoints[i].lng) > 30) {
    const stepsInfo = document.getElementById('steps-info');
    stepsInfo.classList.add('error');
    const arrow = document.getElementById('svg-arrow');
    arrow.classList.add('arrow-error');
    setTimeout(() => {
      stepsInfo.classList.remove('error');
      arrow.classList.remove('arrow-error');
    }, 1700);
    // Mettre le jeton en rouge/crâne si ce n'est pas déjà fait
    let salonCode = localStorage.getItem("salonCode");
    let equipeNum = localStorage.getItem("equipeNum");
    let malusRef = db.ref('parties/'+salonCode+'/equipes/'+equipeNum+'/jetonsMalus');
    malusRef.transaction(arr => {
      arr = arr || [];
      if (!arr.includes(i)) arr.push(i);
      return arr;
    });
    document.getElementById('modal-perdu').classList.add('active');
    return;
  }
  if (jetonMissionsMapping[i] !== -1) {
    let salonCode = localStorage.getItem("salonCode");
    let equipeNum = localStorage.getItem("equipeNum");
    let ref = db.ref('parties/'+salonCode+'/equipes/'+equipeNum+'/epreuveEnCours');
    ref.once('value').then(snap => {
      const epreuveEnCours = snap.val();
      if (epreuveEnCours === null || epreuveEnCours === i) {
        // Soit aucune épreuve en cours, soit c'est bien celle-là : on la (ré)active et on y va
        ref.set(i).then(() => {
          window.location.href = `template-epreuve.html?idx=${jetonMissionsMapping[i]}`;
        });
      } else {
        alert("Cette épreuve est déjà en cours sur un autre appareil !");
      }
    });
  }
}

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
      return `<svg class="svg-epreuve${extraClass}" viewBox="0 0 24 24" width="30" height="30" fill="#e0c185"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="12" r="2"/><path d="[...]
    case "video":
      return `<svg class="svg-epreuve${extraClass}" viewBox="0 0 24 24" width="30" height="30" fill="#e0c185"><rect x="3" y="5" width="15" height="14" rx="2"/><polygon points="18,8 23,12 18,16"/></svg[...]
    case "audio":
      return `<svg class="svg-epreuve${extraClass}" viewBox="0 0 24 24" width="30" height="30" fill="#e0c185"><rect x="9" y="4" width="6" height="10" rx="3"/><rect x="11" y="14" width="2" height="4" r[...]
    case "collecte_objet":
    case "objet":
      return `<svg class="svg-epreuve${extraClass}" viewBox="0 0 38 38" width="30" height="30" fill="none"><circle cx="17" cy="17" r="9" stroke="#e0c185" stroke-width="3" fill="none"/><rect x="23.5" y[...]
    case "fichier":
      return `<svg class="svg-epreuve${extraClass}" viewBox="0 0 24 24" width="30" height="30" fill="none"><rect x="6" y="7" width="12" height="11" rx="2" fill="#e0c185" stroke="#e0c185" stroke-width=[...]
    default:
      return `<svg class="svg-epreuve${extraClass}" viewBox="0 0 24 24" width="30" height="30" fill="#e0c185"><rect x="4" y="7" width="16" height="11" rx="2"/></svg>`;
  }
}

function getMissionTypeByIndex(missionIdx, missionsList) {
  const mission = missionsList && missionsList[missionIdx];
  return mission ? (mission.type || mission.epreuve?.type) : null;
}

function genererJetonsColonnes(
  gpsPoints,
  jetonMissionsMapping,
  missionsList,
  validatedMissions,
  finalGpsIndex,
  toutesMissionsValidees,
  jetonsMalus,
  epreuveEnCours
) {
  const gauche = document.getElementById('jetons-gauche');
  const droite = document.getElementById('jetons-droite');
  if (!gauche || !droite) return;
  gauche.innerHTML = '';
  droite.innerHTML = '';
  const N = gpsPoints.length;
  let jetonDiameter = (N > 10) ? 34 : 48;
  jetonsState = jetonsState.length === N ? jetonsState : Array(N).fill("white");
  for(let i=0; i<N; i++) {
    if (i === finalGpsIndex && !toutesMissionsValidees) continue;
    if (i === finalGpsIndex && toutesMissionsValidees) continue;
    const btn = document.createElement('button');
    btn.className = 'jeton';
    btn.textContent = i+1;
    btn.setAttribute('aria-label', `Point GPS ${i+1}`);
    btn.style.width = btn.style.height = jetonDiameter + "px";
    btn.dataset.idx = i;
    let hasMission = jetonMissionsMapping[i] !== -1;
    let missionType = hasMission ? getMissionTypeByIndex(jetonMissionsMapping[i], missionsList) : null;
    let isValidated = hasMission && validatedMissions && validatedMissions[jetonMissionsMapping[i]] && validatedMissions[jetonMissionsMapping[i]].validated;
    let isMalus = (jetonsMalus||[]).includes(i);

    if (isValidated) {
      btn.classList.add('validated');
      btn.innerHTML = getMissionSVG(missionType, true);
      btn.disabled = true;
      btn.style.cursor = "default";
      btn.onclick = null;
      btn.ondblclick = null;
      btn.tabIndex = -1;
      jetonsState[i] = "validated";
    } else if (jetonsState[i] === "no-mission" || isMalus) {
      btn.classList.add('no-mission');
      btn.innerHTML = getSkullSVG();
      btn.disabled = true;
      btn.style.cursor = "default";
      btn.onclick = null;
      btn.ondblclick = null;
      btn.tabIndex = -1;
      jetonsState[i] = "no-mission";
    } else {
      btn.innerHTML = i+1;
      btn.tabIndex = 0;
      btn.onclick = (e) => {
        e.preventDefault();
        if (currentJetonIndex === i) {
          tenterAccesJetonCourant();
        } else {
          currentJetonIndex = i;
          showCompass(gpsPoints[i]);
        }
      };
      btn.ondblclick = null;
    }
    if (i % 2 === 0) {
      gauche.appendChild(btn);
    } else {
      droite.appendChild(btn);
    }
  }
}

function afficherJetonFinal(gpsPoints, finalGpsIndex) {
  const wrapper = document.getElementById('final-jeton-wrapper');
  const btn = document.getElementById('final-jeton-btn');
  const info = document.getElementById('final-jeton-info');
  if (finalGpsIndex === null || typeof gpsPoints[finalGpsIndex] === "undefined") {
    wrapper.style.display = "none";
    return;
  }
  btn.innerHTML = getMissionSVG('final', false, true);
  btn.disabled = true;
  btn.className = 'jeton final-jeton';
  info.textContent = "";
  wrapper.style.display = "flex";
}

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

// ========== FLÈCHE, COMPASS, ETC ==========
let compassWatchId = null;
let lastDistance = null;
let isSearchingArrow = false;
let searchingArrowInterval = null;

function showCompass(targetGps, onArrivee) {
  const container = document.getElementById('compass-arrow-container');
  container.style.display = "flex";
  const stepsInfo = document.getElementById('steps-info');
  stepsInfo.textContent = "Recherche de la position...";
  startSearchingArrow();
  if (compassWatchId) navigator.geolocation.clearWatch(compassWatchId);
  lastDistance = null;
  function updateArrow(position) {
    userPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;
    const targetLat = targetGps.lat;
    const targetLng = targetGps.lng;
    const toRad = deg => deg * Math.PI / 180;
    const dLon = toRad(targetLng - userLng);
    const y = Math.sin(dLon) * Math.cos(toRad(targetLat));
    const x = Math.cos(toRad(userLat)) * Math.sin(toRad(targetLat)) -
              Math.sin(toRad(userLat)) * Math.cos(toRad(targetLat)) * Math.cos(dLon);
    let brng = Math.atan2(y, x);
    brng = (brng * 180 / Math.PI + 360) % 360;
    const distance = getDistanceMeters(userLat, userLng, targetLat, targetLng);
    if (lastDistance !== null && Math.abs(distance - lastDistance) < 2) return;
    lastDistance = distance;
    const steps = Math.round(distance / 0.75);
    if (distance < 5) {
      stepsInfo.textContent = "Vous êtes arrivé !";
      if (typeof onArrivee === "function") onArrivee();
    } else {
      stepsInfo.textContent = steps + " pas restants";
    }
    let deviceHeading = 0;
    if (window.lastDeviceOrientation !== undefined) {
      deviceHeading = window.lastDeviceOrientation;
    }
    const heading = brng - deviceHeading;
    stopSearchingArrow();
    document.getElementById('svg-arrow').style.transform = `rotate(${heading}deg)`;
  }
  document.getElementById('svg-arrow').onclick = function() {
    tenterAccesJetonCourant();
  };
  if (navigator.geolocation) {
    compassWatchId = navigator.geolocation.watchPosition(
      updateArrow,
      (err) => { stepsInfo.textContent = "Impossible d'accéder à la position."; },
      { enableHighAccuracy: true }
    );
  } else {
    stepsInfo.textContent = "Géolocalisation non supportée.";
  }
  window.addEventListener('deviceorientationabsolute', function(e) {
    if (e.absolute && e.alpha !== null) {
      window.lastDeviceOrientation = e.alpha;
    }
  }, true);
  window.addEventListener('deviceorientation', function(e) {
    if (e.webkitCompassHeading !== undefined) {
      window.lastDeviceOrientation = e.webkitCompassHeading;
    }
  }, true);
}

function startSearchingArrow() {
  if (isSearchingArrow) return;
  isSearchingArrow = true;
  const arrow = document.getElementById('svg-arrow');
  searchingArrowInterval = setInterval(() => {
    const randomDeg = Math.random() * 360;
    arrow.style.transform = `rotate(${randomDeg}deg)`;
  }, 260);
}

function stopSearchingArrow() {
  if (!isSearchingArrow) return;
  isSearchingArrow = false;
  clearInterval(searchingArrowInterval);
  searchingArrowInterval = null;
}

function hideCompass() {
  const container = document.getElementById('compass-arrow-container');
  container.style.display = "none";
  const stepsInfo = document.getElementById('steps-info');
  stepsInfo.textContent = "";
  if (compassWatchId) {
    navigator.geolocation.clearWatch(compassWatchId);
    compassWatchId = null;
  }
  lastDistance = null;
  stopSearchingArrow();
}

// ========== RESIZE (DÉBOUNCED) ==========
window.addEventListener('resize', function() {
  if (window._centralLeafletMap) {
    setTimeout(() => window._centralLeafletMap.invalidateSize(), 300);
  }
});

// ========== LANCEMENT SYNCHRO ==========
onDomAndAuthReady(() => {
  resetEpreuveEnCours(); // Remet à zéro l'épreuve en cours à chaque retour sur la carte
  handleShowMap();      // Masque ou affiche la carte selon le paramètre
  initGlobalChrono();   // Ajoute le chrono global si durée définie
  lancerAccueil();      // Logique de jeu principale
});

// ========= Pour la modale "Perdu !" =========
document.addEventListener('DOMContentLoaded', function() {
  let btn = document.querySelector('#modal-perdu button');
  if (btn) btn.onclick = function() {
    document.getElementById('modal-perdu').classList.remove('active');
  };
});
