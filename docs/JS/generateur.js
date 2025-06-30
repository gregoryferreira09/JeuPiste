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
let mapTargetInput = null;
let mapSearchTimeout = null;
let searchMarker = null;
let currentGameMode = "arthurien"; // valeur par défaut

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

  // Champ coordonnée d'arrivée
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

  // Première mise à jour
  afficherScenario();

  // Bouton "Test scénario"
  const btnTest = document.getElementById('testScenarioBtn');
  if (btnTest) {
    btnTest.onclick = function() {
      if (scenario.length < 1) {
        alert("Ajoute au moins une épreuve pour tester !");
        return;
      }
      localStorage.setItem('scenarioTest', JSON.stringify({
        mode: currentGameMode,
        coordEnd: document.getElementById('coordEnd').value,
        scenario: scenario
      }));
      window.open('template-epreuve.html?test=1', '_blank');
    };
  }
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
  let lancementArray = LANCEMENT_TEXTE[mode] || [];
  let lancement = lancementArray.length ? lancementArray[Math.floor(Math.random() * lancementArray.length)] : "";
  let regles = REGLES_TEXTE[mode] || [];
  let regleBrute = regles.length ? regles[Math.floor(Math.random() * regles.length)] : "";
  let regle = regleAccordee(regleBrute, nb);

  document.getElementById('lancement-jeu').textContent = lancement;
  document.getElementById('regle-jeu').textContent = regle;
}

// Ajouter une étape au scénario
function ajouterEtapeAuScenario(etape) {
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

  // === Bloc suggestions dynamique pour TOUS les types dans SUGGESTIONS ===
  const SUGG_TYPES = Object.keys(SUGGESTIONS);
  const hasNumberParam = quest.parametres.some(p => p.type === "number");
  if (SUGG_TYPES.includes(quest.id)) {
    // Multi-consignes (photo, collecte_objet, etc)
    if (hasNumberParam) {
      const qtyParam = quest.parametres.find(p => p.type === "number");
      let consigneList = Array.isArray(values.consignes) ? [...values.consignes] : [''];

      // Champ quantité
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

      form.appendChild(fieldWrapper);

      // Zone consignes dynamique
      let consignesZone = document.createElement('div');
      consignesZone.id = 'consignesZone';
      consignesZone.style.marginTop = "14px";
      form.appendChild(consignesZone);

      function renderConsignesSelects() {
        consignesZone.innerHTML = '';
        let used = new Set(consigneList.filter(x => x && x !== '__random__'));
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
          else label.textContent = `Consigne ${i+1}:`;
          label.style.minWidth = "80px";
          row.appendChild(label);

          let select = document.createElement('select');
          let optEmpty = document.createElement('option');
          optEmpty.value = '';
          optEmpty.textContent = '-- choisir une mission --';
          select.appendChild(optEmpty);

          // Option Aléatoire
          let optRandom = document.createElement('option');
          optRandom.value = '__random__';
          optRandom.textContent = 'Aléatoire (mission surprise)';
          select.appendChild(optRandom);

          (SUGGESTIONS[quest.id] || []).forEach((sugg, idx) => {
            let opt = document.createElement('option');
            opt.value = sugg;
            opt.textContent = sugg;
            if (used.has(sugg) && consigneList[i] !== sugg) opt.disabled = true;
            select.appendChild(opt);
          });
          select.value = consigneList[i];

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
        let pool = (SUGGESTIONS[quest.id] || []).filter(Boolean);
        // Retire les suggestions déjà explicitement choisies
        consigneList.forEach(val => {
          if (val && val !== '__random__') {
            const idx = pool.indexOf(val);
            if (idx !== -1) pool.splice(idx, 1);
          }
        });
        let poolCopy = pool.slice();
        consigneList.forEach(val => {
          if (val === '__random__') {
            if (pool.length > 0) {
              let idx = Math.floor(Math.random() * pool.length);
              result.push(pool[idx]);
              pool.splice(idx, 1);
            } else if (poolCopy.length > 0) {
              // Tirage avec répétition si pool épuisé
              let idx = Math.floor(Math.random() * poolCopy.length);
              result.push(poolCopy[idx]);
            } else {
              result.push('');
            }
          } else {
            result.push(val);
          }
        });

        // Nettoie les vides
        data[qtyParam.key] = result.filter(x => x).length;
        data.consignes = result.filter(x => x);
        data.points = [...gpsPoints];

        if (data.consignes.length === 0) {
          alert("Merci de sélectionner au moins une mission valide !");
          return;
        }

        ajouterEtapeAuScenario({ type: questTypeId, params: data });
        // Réinitialisation propre
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
    // Ignore les champs déjà gérés dans le bloc suggestions
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
    data.points = [...gpsPoints];
    ajouterEtapeAuScenario({ type: questTypeId, params: data });
    form.reset();
    container.innerHTML = `<div class="succes">Étape ajoutée !<br/>Sélectionne un nouveau type d'épreuve ci-dessus.</div>`;
  };
}

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
