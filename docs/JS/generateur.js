// === GENERATEUR DE FORMULAIRES ET DE SCENARIO MULTI-ETAPES ===
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
            `<span><em>${k}</em> : ${typeof v === 'string' ? v : '[objet]'}</span>`
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

  quest.parametres.forEach(param => {
    let fieldWrapper = document.createElement('div');
    fieldWrapper.className = 'form-field';

    // Label
    let label = document.createElement('label');
    label.textContent = param.label;
    label.setAttribute('for', param.key);
    fieldWrapper.appendChild(label);

    let input = null;

    // Selon type de champ
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
      // Tu peux ajouter d’autres types personnalisés ici (list, gps, etc.)
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
    quest.parametres.forEach(param => {
      if (param.type === 'file') {
        data[param.key] = form.elements[param.key].files[0] || null;
      } else {
        data[param.key] = form.elements[param.key].value;
      }
    });
    ajouterEtapeAuScenario({ type: questTypeId, params: data });
    form.reset();
    // On peut regénérer un formulaire vide ou laisser l'utilisateur choisir la prochaine quête
    container.innerHTML = `<div class="succes">Étape ajoutée !<br/>Sélectionne un nouveau type de quête ci-dessus.</div>`;
  };
}
