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

// === AJOUTE CETTE LIGNE POUR L'AUTH ANONYME ===
firebase.auth().signInAnonymously().catch(function(error) {
  alert("Erreur d'authentification Firebase : " + (error.message || error));
});

// === GENERATEUR DE FORMULAIRES ET DE SCENARIO MULTI-ETAPES AVEC CONSIGNES INDIVIDUELLES ===
let scenario = [];
let dragSrcIdx = null;
let mapTargetInput = null;

// Variables globales pour la carte
let mapSearchTimeout = null;
let searchMarker = null;

let currentGameMode = "arthurien"; // valeur par défaut

// ...dans le DOMContentLoaded :
const modeSelect = document.getElementById('modeScenarioSelect');
if (modeSelect) {
  modeSelect.onchange = function() {
    currentGameMode = this.value;
  };
  currentGameMode = modeSelect.value; // initialise
}

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

  // Champ coordonnée d'arrivée (centré, réduit, harmonisé)
  const coordEnd = document.getElementById('coordEnd');
  if (coordEnd) {
    coordEnd.style.textAlign = "center";
    coordEnd.style.width = "200px";
    coordEnd.style.margin = "0 auto";
    coordEnd.readOnly = true;
    coordEnd.addEventListener('click', function() { openMapPicker(this); });
  }

  // Fermeture carte
  const closeBtn = document.getElementById('closeMapBtn');
  if (closeBtn) closeBtn.addEventListener('click', function() {
    document.getElementById('mapModal').style.display = 'none';
    if (window.map) setTimeout(()=>window.map.remove(),300);
  });

  // Recherche adresse
  const mapSearchBar = document.getElementById('mapSearchBar');
  if (mapSearchBar) mapSearchBar.addEventListener('input', handleMapSearch);

  // Première mise à jour de la liste des épreuves
  afficherScenario();
});

// Ajouter une étape au scénario
function ajouterEtapeAuScenario(etape) {
  scenario.push(etape);
  afficherScenario();
}

function genererPhraseQuete(type, mode, variables = {}) {
  const templates = (QUEST_TEXTS[type] && QUEST_TEXTS[type][mode]) || [];
  if (!templates.length) return "";
  const phrase = templates[Math.floor(Math.random() * templates.length)];
  return phrase.replace(/\[([a-z_]+)\]/gi, (_, v) => variables[v] || `[${v}]`);
}

// Affichage de la liste des épreuves
function afficherScenario() {
  const listDiv = document.getElementById('scenarioList');
  if (!listDiv) return;
  if (scenario.length === 0) {
    listDiv.innerHTML = "<p>Aucune épreuve ajoutée.</p>";
    afficherBoutonSalon();
    return;
  }
  listDiv.innerHTML = scenario.map((etape, idx) => {
    const quest = QUESTS_CATALOGUE.find(q => q.id === etape.type);
    let label = quest ? quest.nom : etape.type;
    let consignesHtml = '';
    if (etape.params && Array.isArray(etape.params.consignes) && etape.params.consignes.length > 0) {
      consignesHtml = etape.params.consignes.map(c => c ? ` : ${c}` : '').join('');
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
  const coordEnd = document.getElementById('coordEnd') ? document.getElementById('coordEnd').value : "";
  if (!coordEnd) {
    alert("Veuillez renseigner la ou les coordonnées d'arrivée !");
    return;
  }
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
      coordEnd,
      scenario
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

// Sauvegarde du scénario et génération d'un code de salon
function genererSalon() {
  const coordEnd = document.getElementById('coordEnd') ? document.getElementById('coordEnd').value : "";
  if (!coordEnd) {
    alert("Veuillez renseigner la ou les coordonnées d'arrivée !");
    return;
  }
  if (scenario.length < 4) {
    alert("Il faut au moins 4 épreuves pour générer un code salon !");
    return;
  }
  const codeSalon = Math.random().toString(36).substr(2, 6).toUpperCase();
  firebase.database().ref('scenarios/' + codeSalon).set({
    mode: currentGameMode,
    coordEnd,
    scenario
  }).then(() => {
    alert("Code de salon généré : " + codeSalon + "\nTu peux le partager pour rejouer ce scénario !");
    navigator.clipboard && navigator.clipboard.writeText(codeSalon);
  });
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

  // Bloc multi-points GPS façon boussole harmonisée + bouton ajouter
  let gpsPoints = Array.isArray(values.points) ? [...values.points] : [];
  let gpsZone = document.createElement('div');
  gpsZone.className = 'form-field';
  gpsZone.style.display = "flex";
  gpsZone.style.flexDirection = "column";
  gpsZone.style.gap = "8px";
  gpsZone.style.marginBottom = "20px";

  let gpsListDiv = document.createElement('div');
  gpsListDiv.id = "gpsPointsList";
  gpsZone.appendChild(gpsListDiv);

  let actionsRow = document.createElement('div');
  actionsRow.style.display = "flex";
  actionsRow.style.alignItems = "center";
  actionsRow.style.gap = "16px";
  actionsRow.style.marginTop = "4px";

  let addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.className = 'main-btn';
  addBtn.textContent = 'Ajouter';
  addBtn.style.marginLeft = "2px";
  actionsRow.appendChild(addBtn);

  gpsZone.appendChild(actionsRow);
  form.appendChild(gpsZone);

  function renderGpsPoints() {
    gpsListDiv.innerHTML = '';
    gpsPoints.forEach((pt, idx) => {
      let row = document.createElement('div');
      row.style = "display: flex; align-items: center; gap: 12px; margin-bottom: 4px;";
      // Icône boussole SVG harmonisée (comme sur les pages épreuves)
      let logo = document.createElement('span');
      logo.innerHTML = `<svg style="width:32px;height:32px;cursor:pointer;" viewBox="0 0 24 24"><path fill="#e0c185" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 14.5l-7 2.5[...]`;
      logo.title = "Choisir/modifier ce point GPS";
      logo.style.cursor = "pointer";
      logo.onclick = function() {
        openMapPicker({
          value: pt,
          set value(val) {
            if(val) {
              gpsPoints[idx] = val;
              renderGpsPoints();
            }
          }
        });
      };
      row.appendChild(logo);

      let input = document.createElement('input');
      input.type = "text";
      input.value = pt;
      input.style.width = "150px";
      input.style.textAlign = "center";
      input.readOnly = true;
      row.appendChild(input);

      let delBtn = document.createElement('button');
      delBtn.type = "button";
      delBtn.className = "main-btn";
      delBtn.textContent = "❌";
      delBtn.style.padding = "0 10px";
      delBtn.onclick = function() {
        gpsPoints.splice(idx, 1);
        renderGpsPoints();
      };
      row.appendChild(delBtn);

      gpsListDiv.appendChild(row);
    });
  }
  renderGpsPoints();

  addBtn.onclick = function() {
    openMapPicker({
      value: "",
      set value(val) {
        if(val) {
          gpsPoints.push(val);
          renderGpsPoints();
        }
      }
    });
  };

  // Détection : comportement spécial (photos, vidéos, etc.)
  let inputQty = null;
  let consignesZone = null;
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

    let labelQty = document.createElement('label');
    labelQty.textContent = qtyParam.label;
    labelQty.setAttribute('for', qtyParam.key);
    labelQty.style.marginRight = "8px";
    fieldWrapper.appendChild(labelQty);

    inputQty = document.createElement('input');
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

    consignesZone = document.createElement('div');
    consignesZone.id = 'consignesZone';
    consignesZone.style.marginTop = "14px";
    form.appendChild(consignesZone);

 
    
function updateConsignes() {
  consignesZone.innerHTML = '';
  let nombre = parseInt(inputQty.value, 10) || 1;
  let row;
  // Préparer suggestions aléatoires SANS doublon
  let suggestionsAleatoires = [];
  if (selectSuggestion && selectSuggestion.value === "random" && SUGGESTIONS[quest.id] && SUGGESTIONS[quest.id].length >= nombre) {
    let pool = [...SUGGESTIONS[quest.id]];
    for (let i = 0; i < nombre; i++) {
      // Tirer une suggestion au hasard et la retirer du pool
      let idx = Math.floor(Math.random() * pool.length);
      suggestionsAleatoires.push(pool[idx]);
      pool.splice(idx, 1);
    }
  }
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
    lab.textContent = (quest.id.startsWith("photo") ? "Photo" : quest.id === "video" ? "Vidéo" : "Objet") + ` ${i + 1} :`;
    lab.style.fontSize = "1em";
    lab.style.minWidth = "56px";
    field.appendChild(lab);
    let champ = document.createElement('input');
    champ.type = 'text';
    champ.name = `consigne_${i}`;
    champ.style.width = "66%";
    champ.style.maxWidth = "8.5em";
    champ.style.padding = "4px 8px";
    champ.style.fontSize = "1em";
    // --- Ici la logique d'affichage ---
    if (selectSuggestion && selectSuggestion.value === "random" && suggestionsAleatoires.length === nombre) {
      champ.value = "mystère";
      champ.readOnly = true;
      champ.dataset.suggestion = suggestionsAleatoires[i]; // Pour garder la vraie valeur (pas affichée)
    } else if (selectSuggestion && selectSuggestion.value !== "random") {
      champ.value = SUGGESTIONS[quest.id][parseInt(selectSuggestion.value, 10)];
      champ.readOnly = true;
    } else {
      champ.value = (values['consignes'] && values['consignes'][i]) || '';
      champ.placeholder = consigneParam && consigneParam.placeholder ? consigneParam.placeholder : "ex : un arbre";
    }
    field.appendChild(champ);
    row.appendChild(field);
  }
}

    inputQty.oninput = updateConsignes;
    updateConsignes();

    // === Suggestions, APRES création de consignesZone et inputQty ===
    if (SUGGESTIONS[quest.id] && Array.isArray(SUGGESTIONS[quest.id])) {
      let wrapper = document.createElement('div');
      wrapper.className = 'form-field';
      wrapper.style.margin = '8px 0';

      let label = document.createElement('label');
      label.textContent = "Suggestion :";
      label.setAttribute('for', 'suggestionSelect');
      wrapper.appendChild(label);

      let select = document.createElement('select');
      select.id = "suggestionSelect";
      select.style.marginLeft = "8px";
      select.style.minWidth = "200px";

      let optRandom = document.createElement('option');
      optRandom.value = "random";
      optRandom.textContent = "Aléatoire (consignes révélées au jeu)";
      select.appendChild(optRandom);

      SUGGESTIONS[quest.id].forEach((sugg, i) => {
        let opt = document.createElement('option');
        opt.value = i;
        opt.textContent = sugg;
        select.appendChild(opt);
      });

      wrapper.appendChild(select);
      let aideSmall = document.createElement('small');
      aideSmall.textContent = "Choisis une consigne précise ou laisse « Aléatoire » pour découvrir au moment du jeu.";
      aideSmall.style.display = "block";
      aideSmall.style.margin = "6px 0 0 2px";
      wrapper.appendChild(aideSmall);
      form.insertBefore(wrapper, consignesZone);

      select.onchange = function() {
        if (this.value === "random") {
          inputQty.disabled = false;
          updateConsignes();
          Array.from(consignesZone.querySelectorAll('input[type="text"]')).forEach(inp => {
            inp.value = "";
            inp.readOnly = false;
          });
        } else {
          inputQty.value = 1;
          inputQty.disabled = true;
          updateConsignes();
          Array.from(consignesZone.querySelectorAll('input[type="text"]')).forEach(inp => {
            inp.value = SUGGESTIONS[quest.id][parseInt(this.value, 10)];
            inp.readOnly = true;
          });
        }
      };

      select.value = "random";
    }
  }

  // Ajoute le reste des champs standards (hors nombre/consigne déjà traités)
  quest.parametres.forEach(param => {
    if (
      (quest.id === "photo" || quest.id === "photo_inconnus" || quest.id === "video" || quest.id === "collecte_objet") &&
      (param.type === "number" || param.key === "consigne" || param.key === "critere" || param.key === "objet")
    )
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
  submit.textContent = 'Valider cette quête';
  submit.className = 'gold-btn';
  form.appendChild(submit);

  container.appendChild(form);

  form.onsubmit = function(e) {
    e.preventDefault();
    const data = {};

    // Gestion suggestions (random ou précise)
    const selectSuggestion = form.querySelector('#suggestionSelect');
    if (selectSuggestion) {
      if (selectSuggestion.value !== "random") {
        const qtyParam = quest.parametres.find(p => p.type === "number");
        if (qtyParam) {
          data[qtyParam.key] = 1;
        }
        data['consignes'] = [SUGGESTIONS[quest.id][parseInt(selectSuggestion.value, 10)]];
      } else {
        data['consignes'] = [];
      }
    }
    // Pour les types avec quantité/consignes multiples
    if (
      (quest.id === "photo" || quest.id === "photo_inconnus" || quest.id === "video" || quest.id === "collecte_objet") &&
      quest.parametres.some(p => p.type === "number")
    ) {
      const qtyParam = quest.parametres.find(p => p.type === "number");
      let nombre = parseInt(form.elements[qtyParam.key].value, 10) || 1;
      data[qtyParam.key] = nombre;
      let consignes = [];
for (let i = 0; i < nombre; i++) {
  let champ = form.elements[`consigne_${i}`];
  // Ajoute ceci :
  if (champ && champ.value === "mystère" && champ.dataset.suggestion) {
    consignes.push(champ.dataset.suggestion);
  } else {
    consignes.push(champ ? champ.value : "");
  }
}

    // Les autres champs
    quest.parametres.forEach(param => {
      if (
        (quest.id === "photo" || quest.id === "photo_inconnus" || quest.id === "video" || quest.id === "collecte_objet") &&
        (param.type === "number" || param.key === "consigne" || param.key === "critere" || param.key === "objet")
      )
        return;
      if (param.type === 'file') {
        data[param.key] = form.elements[param.key].files[0] || null;
      } else if (!(param.key in data)) {
        data[param.key] = form.elements[param.key].value;
      }
    });
    // --- PATCH UNIVERSEL POUR TOUS LES CAS ---
    if (
      quest.id === "collecte_objet" ||
      quest.id === "photo" ||
      quest.id === "photo_inconnus" ||
      quest.id === "video"
    ) {
      const champQuantite = (quest.parametres.find(p => p.type === "number") || {}).key;
      if (champQuantite && typeof data[champQuantite] === "undefined") data[champQuantite] = 1;
      if (!Array.isArray(data.consignes)) data.consignes = [];
      if (quest.parametres.some(p => p.key === "objet") && typeof data.objet === "undefined") data.objet = "";
      if (quest.parametres.some(p => p.key === "critere") && typeof data.critere === "undefined") data.critere = "";
      if (quest.parametres.some(p => p.key === "consigne") && typeof data.consigne === "undefined") data.consigne = "";
    }
    if ("type" in data) delete data.type;
    data.points = [...gpsPoints];
    console.log("DEBUG étape ajoutée :", { type: questTypeId, params: data });
    ajouterEtapeAuScenario({ type: questTypeId, params: data });
    form.reset();
    container.innerHTML = `<div class="succes">Étape ajoutée !<br/>Sélectionne un nouveau type d'épreuve ci-dessus.</div>`;
  };
} // Fin de generateQuestForm

// =======================
// Fonctions pour la carte
// =======================

function resetMapContainer() {
  const oldContainer = document.getElementById('mapContainer');
  if (oldContainer) {
    oldContainer.innerHTML = '';
    if (oldContainer._leaflet_id) {
      delete oldContainer._leaflet_id;
    }
  }
}

function openMapPicker(targetInput) {
  mapTargetInput = targetInput;
  document.getElementById('mapModal').style.display = 'flex';
  document.getElementById('mapSearchBar').value = '';
  document.getElementById('mapSearchResults').style.display = 'none';

  function afterLeafletLoaded() {
    initLeafletMap(targetInput);
  }

  if (!window.leafletLoaded) {
    let link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
    let script = document.createElement('script');
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = afterLeafletLoaded;
    document.body.appendChild(script);
    window.leafletLoaded = true;
  } else {
    afterLeafletLoaded();
  }
}

function initLeafletMap() {
  if (window.map) {
    window.map.off();
    window.map.remove();
    window.map = null;
  }
  resetMapContainer();

  const container = document.getElementById('mapContainer');
  if (container && container._leaflet_id) { delete container._leaflet_id; }

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
    if (mapTargetInput) mapTargetInput.value = lat + ", " + lng;
    document.getElementById('mapModal').style.display = 'none';
    window.map.off();
    setTimeout(()=>window.map.remove(),300);
  });
}

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
            if (mapTargetInput) mapTargetInput.value = lat + ", " + lon;
          }
        });
      }).catch(() => {
        resultsDiv.innerHTML = '<div>Erreur de recherche</div>';
      });
  }, 350);
}
