// === GENERATEUR DE FORMULAIRES ET DE SCENARIO MULTI-ETAPES AVEC CONSIGNES INDIVIDUELLES ===
let scenario = [];

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
  // Trouve la quête dans le catalogue
  const quest = QUESTS_CATALOGUE.find(q => q.id === questTypeId);
  if (!quest) return;

  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `<h3>${quest.nom}</h3><p>${quest.description}</p>`;

  let form = document.createElement('form');
  form.className = 'quest-form';

  // On va gérer dynamiquement la logique pour les quêtes à quantité + consigne
  let qtyParam = null, consigneParam = null;
  quest.parametres.forEach(param => {
    // Repérage des cas à traiter
    if (param.type === 'number' && (
          param.key === 'nbPhotos' || param.key === 'nbVideos' || param.key === 'nbPersonnes' || param.key === 'nbObjets'
        )) {
      qtyParam = param;
    }
    if (param.key === 'consigne' || param.key === 'critere' || param.key === 'objet') {
      consigneParam = param;
    }
  });

  // Si ce type de quête a quantité + consigne, on fait le bloc spécial
  if (qtyParam && consigneParam) {
    let fieldWrapper = document.createElement('div');
    fieldWrapper.className = 'form-field';

    // Quantité
    let labelQty = document.createElement('label');
    labelQty.textContent = qtyParam.label;
    labelQty.setAttribute('for', qtyParam.key);
    fieldWrapper.appendChild(labelQty);

    let inputQty = document.createElement('input');
    inputQty.type = 'number';
    inputQty.id = qtyParam.key;
    inputQty.name = qtyParam.key;
    inputQty.min = qtyParam.min || 1;
    inputQty.max = qtyParam.max || 10;
    inputQty.value = values[qtyParam.key] || qtyParam.default || qtyParam.min || 1;
    fieldWrapper.appendChild(inputQty);

    // Checkbox "identiques"
    let identiquesWrapper = document.createElement('div');
    identiquesWrapper.style = "margin:6px 0;";
    let identiquesInput = document.createElement('input');
    identiquesInput.type = 'checkbox';
    identiquesInput.id = 'identiques';
    identiquesInput.name = 'identiques';
    identiquesInput.checked = true;
    let identiquesLabel = document.createElement('label');
    identiquesLabel.textContent = "Toutes identiques ?";
    identiquesLabel.htmlFor = 'identiques';
    identiquesWrapper.appendChild(identiquesInput);
    identiquesWrapper.appendChild(identiquesLabel);
    fieldWrapper.appendChild(identiquesWrapper);

    // Zone consignes
    let consignesZone = document.createElement('div');
    consignesZone.id = 'consignesZone';
    fieldWrapper.appendChild(consignesZone);

    function updateConsignes() {
      consignesZone.innerHTML = '';
      let nombre = parseInt(inputQty.value, 10) || 1;
      if (identiquesInput.checked) {
        let champ = document.createElement('input');
        champ.type = 'text';
        champ.name = 'consigne';
        champ.placeholder = consigneParam.placeholder || "Consigne pour tous";
        champ.value = values['consigne'] || '';
        consignesZone.appendChild(champ);
      } else {
        for (let i = 0; i < nombre; i++) {
          let champ = document.createElement('input');
          champ.type = 'text';
          champ.name = `consigne_${i}`;
          champ.placeholder = (consigneParam.placeholder || "Consigne") + ` ${i+1}`;
          champ.value = (values['consignes'] && values['consignes'][i]) || '';
          consignesZone.appendChild(champ);
        }
      }
    }

    inputQty.oninput = updateConsignes;
    identiquesInput.onchange = updateConsignes;
    updateConsignes();

    form.appendChild(fieldWrapper);

    // On retire ces params du forEach principal
  }

  // Ajoute le reste des champs standards (hors quantité/consigne déjà traités)
  quest.parametres.forEach(param => {
    if (
      (qtyParam && param.key === qtyParam.key) ||
      (consigneParam && (param.key === consigneParam.key))
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
  submit.textContent = 'Valider cette étape';
  form.appendChild(submit);

  container.appendChild(form);

  form.onsubmit = function(e) {
    e.preventDefault();
    const data = {};
    // Gestion spéciale pour quantité + consigne
    if (qtyParam && consigneParam) {
      let nombre = parseInt(form.elements[qtyParam.key].value, 10) || 1;
      let identiques = form.elements['identiques'].checked;
      data[qtyParam.key] = nombre;
      data['identiques'] = identiques;
      if (identiques) {
        data['consigne'] = form.elements['consigne'].value;
      } else {
        let consignes = [];
        for (let i = 0; i < nombre; i++) {
          consignes.push(form.elements[`consigne_${i}`].value);
        }
        data['consignes'] = consignes;
      }
    }
    // Les autres champs
    quest.parametres.forEach(param => {
      if (
        (qtyParam && param.key === qtyParam.key) ||
        (consigneParam && (param.key === consigneParam.key))
      ) return;
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
