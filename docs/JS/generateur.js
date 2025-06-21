function generateQuestForm(questTypeId, containerId, values = {}) {
  // Trouve la quête dans le catalogue
  const quest = QUESTS_CATALOGUE.find(q => q.id === questTypeId);
  if (!quest) return;

  const container = document.getElementById(containerId);
  if (!container) return;

  // Vide le container
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

  // Ajoute le formulaire à la page
  container.appendChild(form);

  // Gestion de la soumission (à adapter selon ta logique de sauvegarde)
  form.onsubmit = function(e) {
    e.preventDefault();
    // Récupère les valeurs
    const data = {};
    quest.parametres.forEach(param => {
      if (param.type === 'file') {
        data[param.key] = form.elements[param.key].files[0] || null;
      } else {
        data[param.key] = form.elements[param.key].value;
      }
    });
    // Ici tu ajoutes l’étape paramétrée à ton scénario côté JS ou en base
    console.log("Nouvelle étape :", questTypeId, data);
    // Par exemple : ajouterEtapeAuScenario({ type: questTypeId, params: data });
    // Puis vider ou afficher un message
    container.innerHTML = `<div class="succes">Étape ajoutée !</div>`;
  };
}

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
  container.innerHTML = "<h4>Scénario en cours :</h4>" + scenario.map((etape, idx) =>
    `<div style="margin-bottom:8px;">
      <strong>${idx+1}. ${etape.type}</strong>
      <button onclick="supprimerEtape(${idx})" style="margin-left:12px;">Supprimer</button>
    </div>`
  ).join("");
}

function supprimerEtape(idx) {
  scenario.splice(idx, 1);
  afficherScenario();
}

// Modifie form.onsubmit pour :
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
  // (optionnel) Re-générer le formulaire pour une nouvelle étape, ou afficher un message
};
