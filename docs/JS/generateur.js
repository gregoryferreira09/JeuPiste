function generateQuestForm(questTypeId, containerId, values = {}) {
  const quest = QUESTS_CATALOGUE.find(q => q.id === questTypeId);
  if (!quest) return;
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `<h3>${quest.nom}</h3><p>${quest.description}</p>`;

  let form = document.createElement('form');
  form.className = 'quest-form';

  // Détection : on applique ce comportement spécial uniquement à photo, photo_inconnus, video, collecte_objet
  // Tu peux l'élargir à d'autres types si besoin
  if (
    (quest.id === "photo" || quest.id === "photo_inconnus" || quest.id === "video" || quest.id === "collecte_objet")
    && quest.parametres.some(p => p.type === "number")
  ) {
    // Param quantité
    const qtyParam = quest.parametres.find(p => p.type === "number");
    // Param consigne (ou critere, ou objet)
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
      // On fait des lignes de deux (grid responsive)
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
        // Label à gauche
        let lab = document.createElement('span');
        lab.textContent = (quest.id.startsWith("photo") ? "Photo" : quest.id === "video" ? "Vidéo" : "Objet") + ` ${i+1} :`;
        lab.style.fontSize = "1em";
        lab.style.minWidth = "56px";
        field.appendChild(lab);
        // Champ input
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
