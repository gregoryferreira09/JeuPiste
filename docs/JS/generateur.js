// === GENERATEUR DE FORMULAIRES ET DE SCENARIO MULTI-ETAPES AVEC CONSIGNES INDIVIDUELLES ===
let scenario = [];

// === INITIALISATION PAGE ===
document.addEventListener("DOMContentLoaded", function() {
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

  // Effet fadeIn harmonisé
  var main = document.querySelector('.fadeIn');
  if (main) main.classList.add('visible');
  
  // Champs coordonnées
  const coordStart = document.getElementById('coordStart');
  const coordEnd = document.getElementById('coordEnd');
  if (coordStart) coordStart.addEventListener('click', function() { openMapPicker(this); });
  if (coordEnd) coordEnd.addEventListener('click', function() { openMapPicker(this); });

  // Fermeture carte
  const closeBtn = document.getElementById('closeMapBtn');
  if (closeBtn) closeBtn.addEventListener('click', function() {
    document.getElementById('mapModal').style.display = 'none';
    if (window.map) setTimeout(()=>window.map.remove(),300);
  });

  // Recherche adresse
  const mapSearchBar = document.getElementById('mapSearchBar');
  if (mapSearchBar) mapSearchBar.addEventListener('input', handleMapSearch);
});

function ajouterEtapeAuScenario(etape) {
  scenario.push(etape);
  afficherScenario();
}

function afficherScenario() {
  const container = document.getElementById('scenarioContainer');
  if (!container) return;
  if (scenario.length === 0) {
    container.innerHTML = "<p>Aucune étape ajoutée.</p>";
    return;
  }
  container.innerHTML = "<h4>Scénario en cours :</h4>" +
    scenario.map((etape, idx) => {
      const quest = QUESTS_CATALOGUE.find(q => q.id === etape.type);
      let resume = quest ? quest.nom : etape.type;
      return `
      <div class="step-list-item">
        <strong>${idx + 1}. ${resume}</strong>
        <div style="font-size:0.98em;margin-top:2px;">
          ${Object.entries(etape.params).map(([k, v]) =>
            `<span><em>${k}</em> : ${Array.isArray(v) ? v.join(" | ") : typeof v === 'string' ? v : '[objet]'}</span>`
          ).join(' | ')}
        </div>
        <div class="step-actions">
          <button onclick="supprimerEtape(${idx})">Supprimer</button>
          ${idx > 0 ? `<button onclick="monterEtape(${idx})">Monter</button>` : ''}
          ${idx < scenario.length - 1 ? `<button onclick="descendreEtape(${idx})">Descendre</button>` : ''}
        </div>
      </div>`;
    }).join("");
}

function supprimerEtape(idx) {
  scenario.splice(idx, 1);
  afficherScenario();
}
function monterEtape(idx) {
  if (idx <= 0) return;
  [scenario[idx-1], scenario[idx]] = [scenario[idx], scenario[idx-1]];
  afficherScenario();
}
function descendreEtape(idx) {
  if (idx >= scenario.length-1) return;
  [scenario[idx], scenario[idx+1]] = [scenario[idx+1], scenario[idx]];
  afficherScenario();
}

function exporterScenario() {
  const data = JSON.stringify(scenario, null, 2);
  const blob = new Blob([data], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "scenario.json";
  a.click();
  URL.revokeObjectURL(url);
}

// ===================
// Formulaire dynamique
// ===================
function generateQuestForm(questTypeId, containerId, values = {}) {
  const quest = QUESTS_CATALOGUE.find(q => q.id === questTypeId);
  if (!quest) return;
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `<h3>${quest.nom}</h3><p>${quest.description}</p>`;

  let form = document.createElement('form');
  form.className = 'quest-form';

  // Détection : comportement spécial (photos, vidéos, etc.)
  if (
    (quest.id === "photo" || quest.id === "photo_inconnus" || quest.id === "video" || quest.id === "collecte_objet")
    && quest.parametres.some(p => p.type === "number")
  ) {
    const qtyParam = quest.parametres.find(p => p.type === "number");
    const consigneParam = quest.parametres.find(p => p.key === "consigne" || p.key === "critere" || p.key === "objet");

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

    // Input quantité minuscule
    let inputQty = document.createElement('input');
    inputQty.type = 'number';
    inputQty.id = qtyParam.key;
    inputQty.name = qtyParam.key;
    inputQty.min = qtyParam.min || 1;
    inputQty.max = qtyParam.max || 10;
    inputQty.value = values[qtyParam.key] || qtyParam.default || qtyParam.min || 1;
    inputQty.style.width = "2cm";
    inputQty.style.fontSize = "1em";
    inputQty.style.padding = "4px 6px";
    inputQty.style.textAlign = "center";
    fieldWrapper.appendChild(inputQty);

    form.appendChild(fieldWrapper);

    // Zone pour consignes
    let consignesZone = document.createElement('div');
    consignesZone.id = 'consignesZone';
    consignesZone.style.marginTop = "14px";
    form.appendChild(consignesZone);

    // Fonction d'update dynamique
    function updateConsignes() {
      consignesZone.innerHTML = '';
      let nombre = parseInt(inputQty.value, 10) || 1;
      let row;
      for (let i = 0; i < nombre; i++) {
        if (i % 2 === 0) {
          row = document.createElement('div');
          row.style.display = 'flex';
          row.style.gap = '12px';
          row.style.marginBottom = '8px';
          consignesZone.appendChild(row);
        }
        let field = document.createElement('div');
        field.style.display = 'flex';
        field.style.alignItems = 'center';
        field.style.gap = '6px';
        let lab = document.createElement('span');
        lab.textContent = (quest.id.startsWith("photo") ? "Photo" : quest.id === "video" ? "Vidéo" : "Objet") + ` ${i+1} :`;
        lab.style.fontSize = "1em";
        lab.style.minWidth = "56px";
        field.appendChild(lab);
        let champ = document.createElement('input');
        champ.type = 'text';
        champ.name = `consigne_${i}`;
        champ.placeholder = consigneParam && consigneParam.placeholder ? consigneParam.placeholder : "ex : un arbre";
        champ.style.width = "66%";
        champ.style.maxWidth = "8.5em";
        champ.style.padding = "4px 8px";
        champ.style.fontSize = "1em";
        champ.value = (values['consignes'] && values['consignes'][i]) || '';
        field.appendChild(champ);
        row.appendChild(field);
      }
    }

    inputQty.oninput = updateConsignes;
    updateConsignes();
  }

  // Ajoute le reste des champs standards (hors nombre/consigne déjà traités)
  quest.parametres.forEach(param => {
    if ((quest.id === "photo" || quest.id === "photo_inconnus" || quest.id === "video" || quest.id === "collecte_objet") && (param.type === "number" || param.key === "consigne" || param.key === "critere" || param.key === "objet"))
      return;

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
  submit.textContent = 'Valider cette étape';
  form.appendChild(submit);

  container.appendChild(form);

  form.onsubmit = function(e) {
    e.preventDefault();
    const data = {};

    // Pour les types avec quantité/consignes multiples
    if ((quest.id === "photo" || quest.id === "photo_inconnus" || quest.id === "video" || quest.id === "collecte_objet") && quest.parametres.some(p => p.type === "number")) {
      const qtyParam = quest.parametres.find(p => p.type === "number");
      let nombre = parseInt(form.elements[qtyParam.key].value, 10) || 1;
      data[qtyParam.key] = nombre;
      let consignes = [];
      for (let i = 0; i < nombre; i++) {
        consignes.push(form.elements[`consigne_${i}`].value);
      }
      data['consignes'] = consignes;
    }

    // Les autres champs
    quest.parametres.forEach(param => {
      if ((quest.id === "photo" || quest.id === "photo_inconnus" || quest.id === "video" || quest.id === "collecte_objet") && (param.type === "number" || param.key === "consigne" || param.key === "critere" || param.key === "objet"))
        return;
      if (param.type === 'file') {
        data[param.key] = form.elements[param.key].files[0] || null;
      } else if (!(param.key in data)) {
        data[param.key] = form.elements[param.key].value;
      }
    });

    ajouterEtapeAuScenario({ type: questTypeId, params: data });
    form.reset();
    container.innerHTML = `<div class="succes">Étape ajoutée !<br/>Sélectionne un nouveau type de quête ci-dessus.</div>`;
  };
}

// === Carte Leaflet pour sélection GPS + recherche adresse ===
let currentCoordTarget = null;
let mapSearchTimeout = null;
let searchMarker = null;

// Réinitialise proprement le conteneur de la carte
function resetMapContainer() {
  const oldContainer = document.getElementById('mapContainer');
  if (oldContainer) {
    const newContainer = oldContainer.cloneNode(false);
    oldContainer.parentNode.replaceChild(newContainer, oldContainer);
  }
}

function openMapPicker(targetInput) {
  currentCoordTarget = targetInput;
  document.getElementById('mapModal').style.display = 'flex';
  document.getElementById('mapSearchBar').value = '';
  document.getElementById('mapSearchResults').style.display = 'none';
  if (!window.leafletLoaded) {
    let link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
    let script = document.createElement('script');
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = initLeafletMap;
    document.body.appendChild(script);
    window.leafletLoaded = true;
  } else {
    initLeafletMap();
  }
}

function initLeafletMap() {
  resetMapContainer(); // 1. Reset du container AVANT le remove

  if (window.map) {
    window.map.off();
    window.map.remove();
    window.map = null;
  }

  window.map = L.map('mapContainer').setView([48.858370, 2.294481], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(window.map);

  searchMarker = null;

  window.map.on('click', function(e) {
    let lat = e.latlng.lat.toFixed(6);
    let lng = e.latlng.lng.toFixed(6);
    if (searchMarker) searchMarker.setLatLng(e.latlng);
    else searchMarker = L.marker(e.latlng).addTo(window.map);
    if (currentCoordTarget) currentCoordTarget.value = lat + ", " + lng;
    document.getElementById('mapModal').style.display = 'none';
    window.map.off();
    setTimeout(()=>window.map.remove(),300);
  });
}

// --- Recherche d'adresse ---
function handleMapSearch() {
  const searchBar = document.getElementById('mapSearchBar');
  const resultsDiv = document.getElementById('mapSearchResults');
  const query = searchBar.value.trim();
  if (!query) {
    resultsDiv.style.display = 'none';
    resultsDiv.innerHTML = '';
    return;
  }
  if (mapSearchTimeout) clearTimeout(mapSearchTimeout);
  mapSearchTimeout = setTimeout(() => {
    resultsDiv.innerHTML = '<div>Recherche...</div>';
    resultsDiv.style.display = 'block';
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=10`)
      .then(r => r.json())
      .then(data => {
        if (data.length === 0) {
          resultsDiv.innerHTML = '<div>Aucun résultat</div>';
          return;
        }
        resultsDiv.innerHTML = data.map(place =>
          `<div data-lat="${place.lat}" data-lon="${place.lon}">
            ${place.display_name}
          </div>`
        ).join('');
        Array.from(resultsDiv.children).forEach(child => {
          child.onclick = function() {
            const lat = parseFloat(this.getAttribute('data-lat'));
            const lon = parseFloat(this.getAttribute('data-lon'));
            if (window.map) window.map.setView([lat, lon], 16);
            if (searchMarker) searchMarker.setLatLng([lat, lon]);
            else searchMarker = L.marker([lat, lon]).addTo(window.map);
            resultsDiv.style.display = 'none';
            resultsDiv.innerHTML = '';
          }
        });
      }).catch(() => {
        resultsDiv.innerHTML = '<div>Erreur de recherche</div>';
      });
  }, 350);
}
