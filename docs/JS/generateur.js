// === INITIALISATION FIREBASE (doit être tout en haut du fichier) ===
if (typeof firebase === "undefined") {
  alert("Firebase non chargé ! Vérifiez que les scripts Firebase sont inclus AVANT ce fichier.");
}
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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
firebase.auth().signInAnonymously().catch(function(error) {
  alert("Erreur d'authentification Firebase : " + (error.message || error));
});

// === GENERATEUR DE FORMULAIRES ET DE SCENARIO MULTI-ETAPES AVEC CONSIGNES INDIVIDUELLES ===
let scenario = [];
let dragSrcIdx = null;
let currentGameMode = "arthurien"; // valeur par défaut

// === GPS GLOBAL DATA ===
let gpsPoints = [];
let gpsMarkers = [];
let gpsMap = null, gpsMarkersLayer = null;
let gpsMapUniqueId = 'gpsGlobalMap';

// Pour savoir quelle map est sélectionnée (pour l'éclairage visuel)
let selectedMapName = null;

// -- GESTION LISTE MAPS CUSTOM (AVEC SÉLECTION) --
function renderMapsList() {
  const gpsMapsList = document.getElementById('gpsMapsList');
  let allMaps = JSON.parse(localStorage.getItem('savedGpsMaps') || '{}');
  let html = '';
  if (Object.keys(allMaps).length === 0) {
    html = '<em>Aucune map sauvegardée.</em>';
  } else {
    html = '<ul style="list-style:none;padding:0;margin:0;">';
    Object.entries(allMaps).forEach(([name, points]) => {
      const isSelected = selectedMapName === name;
      html += `
        <li style="display:flex;align-items:center;justify-content:space-between;padding:5px 0;">
          <span
            class="gps-map-name${isSelected ? ' gps-map-name--selected' : ''}"
            data-mapname="${encodeURIComponent(name)}"
            style="cursor:pointer;color:#e0c185;font-family:'Cormorant Garamond',serif;${isSelected ? 'background:#ffeecb;color:#232832;border-radius:6px;padding:4px 12px;font-weight:bold;box-shadow:0 0 0 2px #e0c185,0 0 8px #ffeecb88;':''}"
          >
            ${name} <span style="color:#aaa;font-size:0.95em;">(${points.length} point${points.length>1?'s':''})</span>
          </span>
          <span class="gps-map-delete" title="Supprimer" style="cursor:pointer;color:#c00;font-size:1.1em;padding-left:10px;" onclick="window.deleteMapByName('${encodeURIComponent(name)}')">❌</span>
        </li>
      `;
    });
    html += '</ul>';
  }
  gpsMapsList.innerHTML = html;

  // Ajoute le gestionnaire de clic sur les noms de maps
  document.querySelectorAll('.gps-map-name').forEach(el => {
    el.onclick = function() {
      const name = decodeURIComponent(this.getAttribute('data-mapname'));
      handleMapClick(name, this);
    };
  });
}

// Gestion sélection/désélection map
function handleMapClick(name, element) {
  if (selectedMapName === name) {
    // Désélection : carte vierge (plus de points ni de marqueurs)
    selectedMapName = null;
    gpsPoints.length = 0;
    if (typeof window.removeAllMarkers === 'function') window.removeAllMarkers();
    if (typeof window.refreshGpsList === 'function') window.refreshGpsList();
  } else {
    // Sélection : recharge la map sauvegardée (points + marqueurs)
    let allMaps = JSON.parse(localStorage.getItem('savedGpsMaps') || '{}');
    if (allMaps[name]) {
      selectedMapName = name;
      gpsPoints.length = 0;
      allMaps[name].forEach(pt => gpsPoints.push(pt));
      if (typeof window.refreshMarkersAfterDelete === 'function') window.refreshMarkersAfterDelete();
      if (typeof window.refreshGpsList === 'function') window.refreshGpsList();
    }
  }
  renderMapsList();
}

// Supprimer une map au clic sur la croix
window.deleteMapByName = function(name) {
  name = decodeURIComponent(name);
  if (!confirm('Supprimer définitivement la map "' + name + '" ?')) return;
  let allMaps = JSON.parse(localStorage.getItem('savedGpsMaps') || '{}');
  delete allMaps[name];
  localStorage.setItem('savedGpsMaps', JSON.stringify(allMaps));
  // Si c'était la map sélectionnée, on désélectionne et vide la carte
  if (selectedMapName === name) {
    selectedMapName = null;
    gpsPoints.length = 0;
    if (typeof window.removeAllMarkers === 'function') window.removeAllMarkers();
    if (typeof window.refreshGpsList === 'function') window.refreshGpsList();
  }
  renderMapsList();
}

// ===================
// DOMContentLoaded principal
// ===================
document.addEventListener("DOMContentLoaded", function() {
  // Initialisation du select univers
  const modeSelect = document.getElementById('modeScenarioSelect');
  if (modeSelect) {
    modeSelect.onchange = function() {
      currentGameMode = this.value;
      afficherLancementEtRegle();
    };
    currentGameMode = modeSelect.value;
  }

  // Initialisation du select type d'épreuve
  const select = document.getElementById('questTypeSelect');
  if (select && typeof QUESTS_CATALOGUE !== "undefined") {
    QUESTS_CATALOGUE.forEach(quest => {
      let opt = document.createElement('option');
      opt.value = quest.id;
      opt.textContent = quest.nom;
      select.appendChild(opt);
    });
    select.onchange = function() {
      if (this.value) generateQuestForm(this.value, 'formContainer');
      else document.getElementById('formContainer').innerHTML = '';
    };
  }

  // FadeIn
  var main = document.querySelector('.fadeIn');
  if (main) main.classList.add('visible');

  // === GPS GLOBAL BANDEAU INITIALISATION ===
  initGpsBandeau();

window._deleteGpsPoint_gpsGlobalMap = function(idx) {
  gpsPoints.splice(idx, 1); // Supprime le point du tableau
  if (typeof removeAllMarkers === "function") removeAllMarkers();
  gpsPoints.forEach((pt, i) => addMarker(pt, i));
  if (typeof refreshGpsList === "function") refreshGpsList(); // Met à jour la liste affichée
};
  // Première mise à jour
  afficherScenario();
});

// Accord dynamique de la règle du jeu
function regleAccordee(brut, N) {
  let phrase = brut.replace("{N}", N);
  if (N == 1) {
    phrase = phrase
      .replace(/épreuves magiques/gi, "épreuve magique")
      .replace(/épreuves/gi, "épreuve")
      .replace(/magiques/gi, "magique")
      .replace(/\bsont\b/gi, "est")
      .replace(/\bindispensables\b/gi, "indispensable")
      .replace(/\bdéfis\b/gi, "défi")
      .replace(/\bmissions\b/gi, "mission")
      .replace(/\bétapes\b/gi, "étape")
      .replace(/\baventures\b/gi, "aventure")
      .replace(/\bactions clés\b/gi, "action clé")
      .replace(/\binterventions héroïques\b/gi, "intervention héroïque")
      .replace(/\bétapes décisives\b/gi, "étape décisive")
      .replace(/\bsituations critiques\b/gi, "situation critique");
  }
  return phrase;
}

// Affichage dynamique du lancement et de la règle du jeu
function afficherLancementEtRegle() {
  let mode = currentGameMode;
  let nb = scenario.length || 1;
  let lancementArray = (typeof LANCEMENT_TEXTE !== "undefined" && LANCEMENT_TEXTE[mode]) ? LANCEMENT_TEXTE[mode] : [];
  let lancement = lancementArray.length ? lancementArray[Math.floor(Math.random() * lancementArray.length)] : "";
  let regles = (typeof REGLES_TEXTE !== "undefined" && REGLES_TEXTE[mode]) ? REGLES_TEXTE[mode] : [];
  let regleBrute = regles.length ? regles[Math.floor(Math.random() * regles.length)] : "";
  let regle = regleAccordee(regleBrute, nb);

  document.getElementById('lancement-jeu').textContent = lancement;
  document.getElementById('regle-jeu').textContent = regle;
}

// Ajouter une étape au scénario
function ajouterEtapeAuScenario(etape) {
  etape.params = etape.params || {};
  etape.params.points = [...gpsPoints];
  scenario.push(etape);
  afficherScenario();
}

function genererPhraseQuete(type, mode, variables = {}) {
  const templates = (QUESTS_TEXTS && QUESTS_TEXTS[type] && QUESTS_TEXTS[type][mode]) || [];
  if (!templates.length) return "";
  const phrase = templates[Math.floor(Math.random() * templates.length)];
  return phrase.replace(/\[([a-z_]+)\]/gi, (_, v) => variables[v] || `[${v}]`);
}

// Affichage de la liste des épreuves
function afficherScenario() {
  const listDiv = document.getElementById('scenarioList');
  const modeSelect = document.getElementById('modeScenarioSelect');
  if (!listDiv) return;
  if (scenario.length === 0) {
    listDiv.innerHTML = "<p>Aucune épreuve ajoutée.</p>";
    afficherBoutonSalon();
    if (modeSelect) modeSelect.disabled = false;
    afficherLancementEtRegle();
    return;
  }
  if (modeSelect) modeSelect.disabled = true;

  listDiv.innerHTML = scenario.map((etape, idx) => {
    const quest = QUESTS_CATALOGUE.find(q => q.id === etape.type);
    let label = quest ? quest.nom : etape.type;
    let consignesHtml = '';
    if (etape.params && Array.isArray(etape.params.consignes) && etape.params.consignes.length > 0) {
      const isMultiMystery = ["photo", "photo_inconnus", "collecte_objet"].includes(etape.type);
      if (isMultiMystery) {
        consignesHtml = etape.params.consignes.map(() => ` : Mission mystère`).join('');
      } else {
        consignesHtml = etape.params.consignes.map(c => c ? ` : ${c}` : '').join('');
      }
    }
    return `
      <div class="epreuve-ligne" draggable="true" data-idx="${idx}">
        <span class="epreuve-delete" title="Supprimer" onclick="supprimerEtape(${idx})">❌</span>
        <span class="epreuve-num">${idx + 1} -</span>
        <span class="epreuve-label">${label}${consignesHtml}</span>
        <span class="epreuve-edit" title="Éditer" onclick="editerEtape(${idx})">✏️</span>
      </div>
    `;
  }).join('');
  afficherBoutonSalon();
  afficherLancementEtRegle();
  Array.from(listDiv.querySelectorAll('.epreuve-ligne')).forEach(ligne => {
    ligne.addEventListener('dragstart', handleDragStart);
    ligne.addEventListener('dragover', handleDragOver);
    ligne.addEventListener('drop', handleDrop);
    ligne.addEventListener('dragend', handleDragEnd);
    ligne.addEventListener('touchstart', function(e) {
      timer = setTimeout(() => {
        ligne.draggable = true;
        ligne.classList.add('dragging-touch');
      }, 400);
    }, { passive: true });
    ligne.addEventListener('touchend', function(e) {
      clearTimeout(timer);
      ligne.draggable = false;
      ligne.classList.remove('dragging-touch');
    });
  });
}

function showModalConfirm(callback) {
  const modal = document.getElementById('modalConfirm');
  modal.style.display = 'flex';
  const yesBtn = document.getElementById('modalYesBtn');
  const noBtn = document.getElementById('modalNoBtn');
  function cleanup() {
    modal.style.display = 'none';
    yesBtn.onclick = null;
    noBtn.onclick = null;
    modal.querySelector('.modal-overlay').onclick = null;
  }
  yesBtn.onclick = function() { cleanup(); callback(true); };
  noBtn.onclick = function() { cleanup(); callback(false); };
  modal.querySelector('.modal-overlay').onclick = function() { cleanup(); callback(false); };
}

// Supprimer une étape
function supprimerEtape(idx) {
  scenario.splice(idx, 1);
  afficherScenario();
}

// Éditer une étape
function editerEtape(idx) {
  const etape = scenario[idx];
  document.getElementById('questTypeSelect').value = etape.type;
  generateQuestForm(etape.type, 'formContainer', etape.params);
  scenario.splice(idx, 1);
  afficherScenario();
}

// Drag & drop handlers
function handleDragStart(e) {
  dragSrcIdx = +this.dataset.idx;
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}
function handleDragOver(e) {
  e.preventDefault();
  this.classList.add('dragover');
}
function handleDrop(e) {
  e.preventDefault();
  this.classList.remove('dragover');
  const dropIdx = +this.dataset.idx;
  if (dragSrcIdx !== null && dropIdx !== dragSrcIdx) {
    const [item] = scenario.splice(dragSrcIdx, 1);
    scenario.splice(dropIdx, 0, item);
    afficherScenario();
  }
  dragSrcIdx = null;
}
function handleDragEnd(e) {
  Array.from(document.querySelectorAll('.epreuve-ligne')).forEach(l => l.classList.remove('dragging', 'dragover', 'dragging-touch'));
  dragSrcIdx = null;
}

// Exporter le scénario
function exporterScenario() {
  if (scenario.length < 1) {
    alert("Il faut au moins 1 épreuve pour générer un scénario !");
    return;
  }
  const codeSalon = Math.random().toString(36).substr(2, 6).toUpperCase();

  // Ajoute un nom par défaut ou demande à l'utilisateur
  const nomScenario = prompt("Donne un nom à ce scénario :", "Scénario " + codeSalon) || ("Scénario " + codeSalon);

  firebase.database().ref('scenariosList/' + codeSalon).set({
    nom: nomScenario,
    code: codeSalon,
    date: Date.now()
  })
  .then(() => {
    firebase.database().ref('scenarios/' + codeSalon).set({
      mode: currentGameMode,
      scenario,
      gpsPoints
    });
  })
  .then(() => {
    localStorage.setItem("dernierScenarioCree", codeSalon);
    window.location.href = "creer-partie.html";
  });
}

// Affichage/Bouton Générer un code salon
function afficherBoutonSalon() {
  let btnSalon = document.getElementById('boutonSalon');
  if (scenario.length >= 4) {
    if (!btnSalon) {
      btnSalon = document.createElement('button');
      btnSalon.type = 'button';
      btnSalon.id = 'boutonSalon';
      btnSalon.className = 'main-btn';
      btnSalon.textContent = 'Générer un code salon';
      btnSalon.style.marginLeft = "12px";
      btnSalon.onclick = genererSalon;
      let formContainer = document.getElementById('formContainer');
      if (formContainer && formContainer.parentNode.querySelector('form')) {
        formContainer.parentNode.querySelector('form').appendChild(btnSalon);
      } else {
        let groupBtns = document.querySelector('.group-btns');
        if (groupBtns) groupBtns.insertBefore(btnSalon, groupBtns.firstChild);
      }
    }
    btnSalon.style.display = 'inline-block';
  } else if (btnSalon) {
    btnSalon.style.display = 'none';
  }
}

// =============== BANDEAU GPS GLOBAL ===============
function initGpsBandeau() {
  // Récupération des éléments HTML
  const gpsMapDiv = document.getElementById('gpsGlobalMap');
  const gpsListDiv = document.getElementById('gpsListDiv');
  const gpsRecapDiv = document.getElementById('gpsRecapDiv');
  const gpsClearBtn = document.getElementById('gpsClearBtn');
  const gpsMapName = document.getElementById('gpsMapName');
  const gpsSaveBtn = document.getElementById('gpsSaveBtn');
  const gpsLocateBtn = document.getElementById('gpsLocateBtn');
  let uniqueId = 'gpsGlobalMap';

initMap();
  
function initMap() {
  if (gpsMap) { gpsMap.remove(); gpsMap = null; }

  // On tente la géolocalisation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      gpsMap = L.map(uniqueId).setView([lat, lng], 16);
      finishMapInit();
    }, function() {
      // Fallback Angers si refusé ou erreur
      gpsMap = L.map(uniqueId).setView([47.478419, -0.563166], 13);
      finishMapInit();
    }, { enableHighAccuracy: true });
  } else {
    // Fallback si pas de géoloc du tout
    gpsMap = L.map(uniqueId).setView([47.478419, -0.563166], 13);
    finishMapInit();
  }

  function finishMapInit() {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(gpsMap);
    gpsMarkersLayer = L.layerGroup().addTo(gpsMap);
    gpsPoints.forEach((pt, idx) => addMarker(pt, idx));
    gpsMap.on('click', function(e) {
      const pt = { lat: e.latlng.lat, lng: e.latlng.lng };
      gpsPoints.push(pt);
      addMarker(pt, gpsPoints.length - 1);
      refreshGpsList();
    });
    refreshGpsList();
  }
}
  
function addMarker(pt, idx) {
  const redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  let marker = L.marker([pt.lat, pt.lng], { icon: redIcon, draggable: false, title: `Point ${idx + 1}` });
  marker.addTo(gpsMarkersLayer);
  marker.bindPopup(`<b>Point ${idx + 1}</b><br>${pt.lat.toFixed(6)}, ${pt.lng.toFixed(6)}
    <br><button type="button" onclick="window._deleteGpsPoint_${uniqueId}(${idx});">Supprimer</button>`);
  gpsMarkers[idx] = marker;
}
window.addMarker = addMarker;
  
  function removeLastMarker() {
    if (gpsMarkers.length > 0) {
      gpsMarkersLayer.removeLayer(gpsMarkers.pop());
    }
  }
  function removeAllMarkers() {
    gpsMarkers.forEach(m => gpsMarkersLayer.removeLayer(m));
    gpsMarkers = [];
  }
  window.removeAllMarkers = removeAllMarkers;
  function refreshMarkersAfterDelete() {
    removeAllMarkers();
    gpsPoints.forEach((pt, i) => addMarker(pt, i));
  }
  window.refreshMarkersAfterDelete = refreshMarkersAfterDelete;
  function refreshGpsList() {
    if (gpsPoints.length === 0) {
      gpsListDiv.innerHTML = "<em>Aucun point ajouté.</em>";
    } else {
      // Affichage en lignes de deux
      let html = '<div style="display:flex;flex-wrap:wrap;gap:6px;">';
      gpsPoints.forEach((pt, idx) => {
        html += `
  <div style="display:flex;align-items:center;gap:4px;font-weight:bold;margin-bottom:6px;min-width:95px;">
    <span>Point ${idx + 1}</span>
    <span style="color:#b00;cursor:pointer;font-size:0.8em;line-height:1.1;" title="Supprimer" onclick="window._deleteGpsPoint_${uniqueId}(${idx})">&nbsp;❌</span>
  </div>
`;
      });
      html += '</div>';
      gpsListDiv.innerHTML = html;
    }
    gpsRecapDiv.textContent = `Zone de jeu : ${gpsPoints.length} point${gpsPoints.length > 1 ? "s" : ""}`;
  }
  window.refreshGpsList = refreshGpsList;

  // Gestion du bouton poubelle (vider tous les points)
gpsClearBtn.onclick = function() {
  if (gpsPoints.length === 0) return;
  showModalConfirm(function(ok) {
    if (ok) {
      gpsPoints.length = 0;
      removeAllMarkers();
      refreshGpsList();
      selectedMapName = null;
      renderMapsList();
    }
  });
};

  // Gestion du bouton sauvegarde (disquette)
  gpsSaveBtn.onclick = function() {
    let name = gpsMapName.value.trim();
    if (!name) {
      alert("Merci de donner un nom à la carte !");
      return;
    }
    if (gpsPoints.length === 0) {
      alert("Ajoutez au moins un point sur la carte !");
      return;
    }
    let allMaps = JSON.parse(localStorage.getItem('savedGpsMaps') || '{}');
    allMaps[name] = [...gpsPoints];
    localStorage.setItem('savedGpsMaps', JSON.stringify(allMaps));
    renderMapsList(); // Mets à jour la liste après sauvegarde
    alert("Carte sauvegardée !");
    gpsMapName.value = '';
    selectedMapName = name;
    renderMapsList();
  };

  // Gestion du bouton "Me localiser"
  if (gpsLocateBtn) {
    gpsLocateBtn.onclick = function() {
      if (!navigator.geolocation) {
        alert("La géolocalisation n'est pas supportée par ce navigateur !");
        return;
      }
      gpsLocateBtn.disabled = true;
      gpsLocateBtn.textContent = "⏳";
      navigator.geolocation.getCurrentPosition(function(pos) {
        gpsLocateBtn.disabled = false;
        gpsLocateBtn.textContent = "📍";
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        if (gpsMap && typeof gpsMap.setView === "function") {
          gpsMap.setView([lat, lng], 16); // Zoom 16 sur ta position
          // Marqueur temporaire
          if (window._userPositionMarker) {
            gpsMap.removeLayer(window._userPositionMarker);
          }
          window._userPositionMarker = L.marker([lat, lng], {title: "Vous êtes ici"}).addTo(gpsMap);
          window._userPositionMarker.bindPopup("Vous êtes ici").openPopup();
        }
      }, function(err) {
        gpsLocateBtn.disabled = false;
        gpsLocateBtn.textContent = "📍";
        alert("Impossible de vous localiser (" + (err.message || "erreur inconnue") + ")");
      });
    };
  }

  // Affiche la liste des maps sauvegardées au chargement
  renderMapsList();
}

// === Formulaire dynamique (génération d'épreuves) ===
function generateQuestForm(questTypeId, containerId, values = {}) {
  const quest = QUESTS_CATALOGUE.find(q => q.id === questTypeId);
  if (!quest) return;
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `<h3>${quest.nom}</h3><p>${quest.description}</p>`;

  let form = document.createElement('form');
  form.className = 'quest-form';

  // === Bloc suggestions dynamique pour TOUS les types dans SUGGESTIONS ===
  const SUGG_TYPES = Object.keys(SUGGESTIONS);
  const hasNumberParam = quest.parametres.some(p => p.type === "number");
  if (SUGG_TYPES.includes(quest.id)) {
    // Multi-consignes (photo, collecte_objet, etc)
    if (hasNumberParam) {
      const qtyParam = quest.parametres.find(p => p.type === "number");
      let consigneList = Array.isArray(values.consignes) ? [...values.consignes] : [''];

 
      
let fieldWrapper = document.createElement('div');
fieldWrapper.className = 'form-field';
fieldWrapper.style.display = 'flex';
fieldWrapper.style.alignItems = 'center';
fieldWrapper.style.gap = '12px';
fieldWrapper.style.marginBottom = '10px';

// Label quantité
let labelQty = document.createElement('label');
labelQty.textContent = qtyParam.label;
labelQty.setAttribute('for', qtyParam.key);
labelQty.style.marginRight = "8px";
fieldWrapper.appendChild(labelQty);

// Champ quantité
let inputQty = document.createElement('input');
inputQty.type = 'number';
inputQty.id = qtyParam.key;
inputQty.name = qtyParam.key;
inputQty.min = qtyParam.min || 1;
inputQty.max = qtyParam.max || 10;
inputQty.value = consigneList.length;
inputQty.style.width = "2cm";
inputQty.style.fontSize = "1em";
inputQty.style.padding = "4px 6px";
inputQty.style.textAlign = "center";
fieldWrapper.appendChild(inputQty);

// Bouton/texte aléatoire
let randomBtn = document.createElement('span');
randomBtn.textContent = 'Aléatoire';
randomBtn.className = 'random-toggle';
randomBtn.style.cursor = 'pointer';
randomBtn.style.marginLeft = '10px';
randomBtn.style.padding = '3px 12px';
randomBtn.style.borderRadius = '7px';
randomBtn.style.border = '1.5px solid #e0c185';
randomBtn.style.transition = 'background 0.2s, color 0.2s, border 0.2s';
fieldWrapper.appendChild(randomBtn);
form.appendChild(fieldWrapper);

// Zone consignes dynamique
let consignesZone = document.createElement('div');
consignesZone.id = 'consignesZone';
consignesZone.style.marginTop = "14px";
form.appendChild(consignesZone);

let isRandom = false;
function updateRandomUI() {
  if (isRandom) {
    // Doré et gras
    randomBtn.style.background = '#e0c185';
    randomBtn.style.color = '#231d1d';
    randomBtn.style.fontWeight = 'bold';
  } else {
    // Normal
    randomBtn.style.background = 'none';
    randomBtn.style.color = '';
    randomBtn.style.fontWeight = '';
  }
}

randomBtn.onclick = function() {
  isRandom = !isRandom;
  updateRandomUI();
  renderConsignesSelects();
};

updateRandomUI();

function renderConsignesSelects() {
  consignesZone.innerHTML = '';
  if (isRandom) {
    // Mode aléatoire : ne rien afficher, juste un message d'attente
    let msg = document.createElement('div');
    msg.style.fontStyle = "italic";
    msg.style.padding = "12px 0";
    msg.style.color = "#e0c185";
    msg.style.fontWeight = "bold";
    msg.textContent = "Les missions seront révélées pendant le jeu !";
    consignesZone.appendChild(msg);
    return;
  }
  for (let i = 0; i < consigneList.length; i++) {
    let row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.gap = '8px';
    row.style.marginBottom = '6px';

    let label = document.createElement('span');
    if (quest.id === "photo") label.textContent = `Photo ${i+1}:`;
    else if (quest.id === "photo_inconnus") label.textContent = `Personne/Photo ${i+1}:`;
    else if (quest.id === "collecte_objet") label.textContent = `Objet ${i+1}:`;
    else if (quest.id === "audio") label.textContent = `Audio ${i+1}:`;
    else if (quest.id === "duel") label.textContent = `Duel ${i+1}:`;
    else label.textContent = `Consigne ${i+1}:`;
    row.appendChild(label);

    let select = document.createElement('select');
    let optEmpty = document.createElement('option');
    optEmpty.value = '';
    optEmpty.textContent = '-- choisir une mission --';
    select.appendChild(optEmpty);

    (SUGGESTIONS[quest.id] || []).forEach((sugg, idx) => {
      let opt = document.createElement('option');
      opt.value = sugg;
      opt.textContent = sugg;
      select.appendChild(opt);
    });
    select.value = consigneList[i];
    select.disabled = false;
    select.style.opacity = 1;

    select.onchange = function() {
      consigneList[i] = this.value;
      renderConsignesSelects();
    };
    row.appendChild(select);

    // Bouton suppression (si plus d'une ligne)
    if (consigneList.length > 1) {
      let delBtn = document.createElement('button');
      delBtn.type = "button";
      delBtn.textContent = "❌";
      delBtn.style.marginLeft = "6px";
      delBtn.onclick = function() {
        consigneList.splice(i, 1);
        inputQty.value = consigneList.length;
        renderConsignesSelects();
      };
      delBtn.disabled = false;
      delBtn.style.opacity = 1;
      row.appendChild(delBtn);
    }

    consignesZone.appendChild(row);
  }
}

      inputQty.oninput = function() {
        let n = parseInt(inputQty.value, 10) || 1;
        n = Math.max(qtyParam.min || 1, Math.min(qtyParam.max || 10, n));
        while (consigneList.length < n) consigneList.push('');
        while (consigneList.length > n) consigneList.pop();
        renderConsignesSelects();
      };

      // Initialisation
      inputQty.value = consigneList.length;
      renderConsignesSelects();

      // Ajoute le bouton de validation
      let submit = document.createElement('button');
      submit.type = 'submit';
      submit.textContent = 'Valider cette quête';
      submit.className = 'gold-btn';
      form.appendChild(submit);

      // AU SUBMIT
     form.onsubmit = function(e) {
  e.preventDefault();
  const data = {};
  let result = [];
  if (isRandom) {
    let pool = (SUGGESTIONS[quest.id] || []).filter(Boolean);
    for (let i = 0; i < consigneList.length; i++) {
      // Choix aléatoire sans doublon
      if (pool.length > 0) {
        let idx = Math.floor(Math.random() * pool.length);
        result.push(pool[idx]);
        pool.splice(idx, 1);
      } else {
        result.push('');
      }
    }
  } else {
    result = consigneList.slice();
  }
  // Nettoie les vides
  data[qtyParam.key] = result.filter(x => x).length;
  data.consignes = result.filter(x => x);

  ajouterEtapeAuScenario({ type: questTypeId, params: data });
  form.reset();
  container.innerHTML = `<div class="succes">Étape ajoutée !<br/>Sélectionne un nouveau type d'épreuve ci-dessus.</div>`;
};
      
      container.appendChild(form);
      return; // Ne pas générer les champs standards pour ces types
    } else {
      // Cas CONSIGNE UNIQUE (ex: audio)
      let consigneValue = values.consigne || '';
      let select = document.createElement('select');
      select.style.marginBottom = "12px";
      let optEmpty = document.createElement('option');
      optEmpty.value = '';
      optEmpty.textContent = '-- choisir une mission --';
      select.appendChild(optEmpty);

      let optRandom = document.createElement('option');
      optRandom.value = '__random__';
      optRandom.textContent = 'Aléatoire (mission surprise)';
      select.appendChild(optRandom);

      (SUGGESTIONS[quest.id] || []).forEach(sugg => {
        let opt = document.createElement('option');
        opt.value = sugg;
        opt.textContent = sugg;
        select.appendChild(opt);
      });
      select.value = consigneValue;
      select.onchange = function() {
        consigneValue = this.value;
        if (this.value !== '__random__') input.value = this.value;
      };

      // Option champ texte libre si l'utilisateur veut écrire sa propre consigne
      let input = document.createElement('input');
      input.type = "text";
      input.placeholder = "Ou écris ta propre consigne";
      input.value = values.consigne || '';
      input.style.marginLeft = "10px";
      input.oninput = function() {
        consigneValue = this.value;
        select.value = '';
      };

      // Si on choisit "aléatoire", on génère la consigne lors de la soumission
      select.onchange = function() {
        if (this.value === '__random__') {
          const pool = SUGGESTIONS[quest.id];
          consigneValue = pool[Math.floor(Math.random() * pool.length)];
          input.value = consigneValue;
        } else {
          consigneValue = this.value;
          input.value = this.value;
        }
      };

      let fieldWrapper = document.createElement('div');
      fieldWrapper.className = 'form-field';
      fieldWrapper.appendChild(select);
      fieldWrapper.appendChild(input);
      form.appendChild(fieldWrapper);

      // Bouton de validation
      let submit = document.createElement('button');
      submit.type = 'submit';
      submit.textContent = 'Valider cette quête';
      submit.className = 'gold-btn';
      form.appendChild(submit);

      container.appendChild(form);

      form.onsubmit = function(e) {
        e.preventDefault();
        let consigneFinale = consigneValue;
        if (!consigneFinale) {
          alert("Merci de choisir ou écrire une mission !");
          return;
        }
        ajouterEtapeAuScenario({ type: questTypeId, params: { consigne: consigneFinale } });
        form.reset();
        container.innerHTML = `<div class="succes">Étape ajoutée !<br/>Sélectionne un nouveau type d'épreuve ci-dessus.</div>`;
      };
      return;
    }
  }

  // === Autres champs standards ===
  quest.parametres.forEach(param => {
    if (
      (SUGG_TYPES.includes(quest.id)) &&
      (param.type === "number" || param.key === "consigne" || param.key === "critere" || param.key === "objet")
    ) return;

    let fieldWrapper = document.createElement('div');
    fieldWrapper.className = 'form-field';

    let label = document.createElement('label');
    label.textContent = param.label;
    label.setAttribute('for', param.key);
    fieldWrapper.appendChild(label);

    let input = null;
    switch (param.type) {
      case 'number':
        input = document.createElement('input');
        input.type = 'number';
        input.id = param.key;
        input.name = param.key;
        if (param.min !== undefined) input.min = param.min;
        if (param.max !== undefined) input.max = param.max;
        input.value = values[param.key] || param.default || param.min || 0;
        break;
      case 'text':
        input = document.createElement('input');
        input.type = 'text';
        input.id = param.key;
        input.name = param.key;
        input.placeholder = param.placeholder || '';
        input.value = values[param.key] || '';
        break;
      case 'textarea':
        input = document.createElement('textarea');
        input.id = param.key;
        input.name = param.key;
        input.placeholder = param.placeholder || '';
        input.value = values[param.key] || '';
        break;
      case 'file':
        input = document.createElement('input');
        input.type = 'file';
        input.id = param.key;
        input.name = param.key;
        break;
      case 'select':
        input = document.createElement('select');
        input.id = param.key;
        input.name = param.key;
        (param.options || []).forEach(opt => {
          let option = document.createElement('option');
          option.value = opt;
          option.textContent = opt;
          input.appendChild(option);
        });
        input.value = values[param.key] || param.default || '';
        break;
      default:
        input = document.createElement('input');
        input.type = 'text';
        input.id = param.key;
        input.name = param.key;
        input.value = values[param.key] || '';
    }
    fieldWrapper.appendChild(input);
    form.appendChild(fieldWrapper);
  });

  // Bouton de validation
  let submit = document.createElement('button');
  submit.type = 'submit';
  submit.textContent = 'Valider cette quête';
  submit.className = 'gold-btn';
  form.appendChild(submit);

  container.appendChild(form);

  form.onsubmit = function(e) {
    e.preventDefault();
    const data = {};
    quest.parametres.forEach(param => {
      if (param.type === 'file') {
        data[param.key] = form.elements[param.key].files[0] || null;
      } else if (!(param.key in data)) {
        data[param.key] = form.elements[param.key].value;
      }
    });
    ajouterEtapeAuScenario({ type: questTypeId, params: data });
    form.reset();
    container.innerHTML = `<div class="succes">Étape ajoutée !<br/>Sélectionne un nouveau type d'épreuve ci-dessus.</div>`;
  };
}

// =======================
// Fonction pour reset carte (hérité pour compatibilité)
function resetMapContainer() {
  const oldContainer = document.getElementById('mapContainer');
  if (oldContainer) {
    oldContainer.innerHTML = '';
    if (oldContainer._leaflet_id) {
      delete oldContainer._leaflet_id;
    }
  }
}

const gpsClearBtn = document.getElementById('gpsClearBtn');
if (gpsClearBtn) {
  gpsClearBtn.onclick = function() {
    if (typeof gpsPoints !== "undefined" && gpsPoints.length === 0) return;
    showModalConfirm("Supprimer tous les points GPS ?", function(ok) {
      if (ok) {
        gpsPoints.length = 0;
        if (typeof removeAllMarkers === "function") removeAllMarkers();
        if (typeof refreshGpsList === "function") refreshGpsList();
        if (typeof renderMapsList === "function") renderMapsList();
        if (typeof selectedMapName !== "undefined") selectedMapName = null;
      }
    });
  };
}

function showModalConfirm(questionText, callback) {
  const modal = document.getElementById('confirmationModal');
  const question = document.getElementById('modalQuestion');
  const yesBtn = document.getElementById('confirmModalBtn');
  const noBtn = document.getElementById('cancelModalBtn');
  question.textContent = questionText;
  modal.classList.add('active');
  function cleanup() {
    modal.classList.remove('active');
    yesBtn.onclick = null;
    noBtn.onclick = null;
    document.onkeydown = null;
  }
  yesBtn.onclick = function() { cleanup(); callback(true); };
  noBtn.onclick = function() { cleanup(); callback(false); };
  document.onkeydown = function(e) {
    if (e.key === "Escape") { cleanup(); callback(false); }
  };
}

// ---------------------------------------------------------------------------
// EXEMPLE D'UTILISATION pour le bouton poubelle GPS
// Place ce code dans initGpsBandeau ou dans le DOMContentLoaded
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  const gpsClearBtn = document.getElementById('gpsClearBtn');
  if (gpsClearBtn) {
    gpsClearBtn.onclick = function() {
      if (typeof gpsPoints !== "undefined" && gpsPoints.length === 0) return;
      showModalConfirm("Supprimer tous les points GPS ?", function(ok) {
        if (ok) {
          gpsPoints.length = 0;
          if (typeof removeAllMarkers === "function") removeAllMarkers();
          if (typeof refreshGpsList === "function") refreshGpsList();
          if (typeof renderMapsList === "function") renderMapsList();
          if (typeof selectedMapName !== "undefined") selectedMapName = null;
        }
      });
    };
  }
});
