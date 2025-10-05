// --- Configuration Firebase ---
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
const storage = firebase.storage();

// --- Ajout clé : récupère l'indice mission dans l'URL (support carte libre) ---
const params = new URLSearchParams(window.location.search);
const missionIdx = params.has("idx") ? parseInt(params.get("idx"), 10) : null;

// ---------------------- Fonctions utilitaires d'affichage ----------------------

function resetAffichageEtape() {
  ['titre-quete', 'metaphore-quete', 'mission-label', 'mission-text', 'upload-row', 'upload-feedback'].forEach(id => {
    let el = document.getElementById(id);
    if (el) el.innerHTML = "";
  });
  ['bloc-gps','bloc-mission','bloc-upload','bloc-answer','bloc-indice','bloc-chrono','bloc-pendu', 'bloc-touchercouler'].forEach(id => {
    let el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  let oldGpsBtn = document.getElementById('gps-upload-btn');
  if (oldGpsBtn && oldGpsBtn.parentNode) oldGpsBtn.parentNode.removeChild(oldGpsBtn);
}

function fadeOutAndRedirect(nextUrl) {
  var main = document.getElementById('main-content');
  if (main) main.classList.add('fadeout');
  setTimeout(function() {
    window.location.href = nextUrl;
  }, 850);
}

function harmoniseArticles(phrase) {
  phrase = phrase.replace(/\bde un ([aeiouyhAEIOUYH])/g, "d'un $1");
  phrase = phrase.replace(/\bde une ([aeiouyhAEIOUYH])/g, "d'une $1");
  phrase = phrase.replace(/\bde un /g, "d'un ");
  phrase = phrase.replace(/\bde une /g, "d'une ");
  phrase = phrase.replace(/\bde des /g, "des ");
  phrase = phrase.replace(/\bde le /g, "du ");
  phrase = phrase.replace(/\bde les /g, "des ");
  phrase = phrase.replace(/\bà le /g, "au ");
  phrase = phrase.replace(/\bà les /g, "aux ");
  phrase = phrase.replace(/  +/g, " ");
  phrase = phrase.replace(/d'([A-Z])/, function (m, p1) { return "d'" + p1.toLowerCase(); });
  return phrase;
}

function accordePluriel(phrase, nb) {
  return phrase.replace(/([a-zA-ZéèêëàâîïôöùûüçÉÈÊËÀÂÎÏÔÖÙÛÜÇ]+)\[s\]/g, function(_, mot) {
    return nb > 1 ? mot + "s" : mot;
  });
}

function buildVars(etape) {
  let vars = {...etape.params};
  let nb = 1;
  switch (etape.type) {
    case "photo_inconnus":
      nb = Number(etape.params?.nbPersonnes) || (Array.isArray(etape.params?.consignes) ? etape.params.consignes.length : 1) || 1;
      vars.nb = nb;
      vars.nbPersonnes = nb;
      vars.critere = etape.params?.critere || "";
      vars.objet = nb > 1 ? "inconnu(e)s" : "inconnu(e)";
      vars.photo = nb > 1 ? "photos" : "photo";
      break;
    case "photo":
      nb = Number(etape.params?.nbPhotos) || (Array.isArray(etape.params?.consignes) ? etape.params.consignes.length : 1) || 1;
      vars.nb = nb;
      vars.photo = nb > 1 ? "photos" : "photo";
      vars.objet = (etape.params?.objet || etape.params?.consigne || "").toLowerCase();
      vars.objets = nb > 1 ? (vars.objet + "s") : vars.objet;
      break;
    case "collecte_objet":
      nb = Number(etape.params?.nbObjets) || (Array.isArray(etape.params?.consignes) ? etape.params.consignes.length : 1) || 1;
      vars.nb = nb;
      vars.objet = (etape.params?.objet || "").toLowerCase();
      vars.objets = nb > 1 ? (vars.objet + "s") : vars.objet;
      break;
    case "audio":
      nb = Number(etape.params?.nbAudio) || (Array.isArray(etape.params?.consignes) ? etape.params.consignes.length : 1) || 1;
      vars.nb = nb;
      vars.audio = nb > 1 ? "audios" : "audio";
      break;
    case "video":
      nb = Number(etape.params?.nbVideo) || (Array.isArray(etape.params?.consignes) ? etape.params.consignes.length : 1) || 1;
      vars.nb = nb;
      vars.video = nb > 1 ? "vidéos" : "vidéo";
      break;
    case "fichier":
      nb = Number(etape.params?.nbFichiers) || (Array.isArray(etape.params?.consignes) ? etape.params.consignes.length : 1) || 1;
      vars.nb = nb;
      vars.fichier = nb > 1 ? "fichiers" : "fichier";
      break;
    default:
      break;
  }
  return vars;
}

// Génération des consignes harmonisées pour une mission
function genererPhraseMission(type, mode, vars = {}) {
  if (typeof QUEST_TEXTS === "undefined" || !QUEST_TEXTS[type]) return null;
  let textes = QUEST_TEXTS[type][mode] || QUEST_TEXTS[type]["arthurien"] || [];
  if (!Array.isArray(textes)) {
    if (typeof textes === "object" && textes !== null) {
      textes = Object.values(textes).flat();
    } else if (typeof textes === "string") {
      textes = [textes];
    } else {
      textes = [];
    }
  }
  let nb = vars.nb || 1;
  let key = nb > 1 ? '[objets]' : '[objet]';
  let textesFiltres = textes.filter(t => t.includes(key));
  if (!textesFiltres.length) textesFiltres = textes;
  let phrase = textesFiltres[Math.floor(Math.random() * textesFiltres.length)];
  phrase = phrase.replace(/\[([a-zA-Z0-9_]+)\]/g, (match, k) => (vars[k] !== undefined ? vars[k] : match));
  phrase = harmoniseArticles(phrase);
  phrase = accordePluriel(phrase, nb);
  if (nb <= 1) {
    phrase = phrase.replace(/\bces images\b/gi, "cette image");
    phrase = phrase.replace(/\bCes images\b/gi, "Cette image");
    phrase = phrase.replace(/\bces preuves\b/gi, "cette preuve");
    phrase = phrase.replace(/\bCes preuves\b/gi, "Cette preuve");
  } else {
    phrase = phrase.replace(/\bcette image\b/gi, "ces images");
    phrase = phrase.replace(/\bCette image\b/gi, "Ces images");
    phrase = phrase.replace(/\bcette preuve\b/gi, "ces preuves");
    phrase = phrase.replace(/\bCette preuve\b/gi, "Ces preuves");
  }
  return phrase;
}

function getUploadIcon(type) {
  switch(type) {
    case "photo":
    case "photo_inconnus":
      return `<svg viewBox="0 0 24 24" width="38" height="38" fill="#e0c185"><path d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2.586A2 2 0 0 1 9.828 5.586l.586.586H19a2 2 0 0 1 2 2v11zM7.5..."/></svg>`;
    case "video":
      return `<svg viewBox="0 0 24 24" width="38" height="38" fill="#e0c185"><path d="M17 10.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3.5l4 4v-11l-4 4z"/></svg>`;
    case "audio":
      return `<svg viewBox="0 0 24 24" width="38" height="38" fill="#e0c185"><rect x="9" y="4" width="6" height="10" rx="3"/><rect x="11" y="14" width="2" height="4" rx="1"/></svg>`;
    case "collecte_objet":
      return `<svg viewBox="0 0 38 38" width="38" height="38" fill="none"><circle cx="17" cy="17" r="9" stroke="#e0c185" stroke-width="3" fill="none"/><rect x="23.5" y="23.5" width="8" height="2.5" rx..."/></svg>`;
    case "fichier":
      return `<svg viewBox="0 0 24 24" width="38" height="38" fill="none"><rect x="6" y="7" width="12" height="11" rx="2" fill="#e0c185" stroke="#e0c185" stroke-width="2"/><rect x="6" y="5" width="4" ..."/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" width="38" height="38" fill="#e0c185"><rect x="4" y="7" width="16" height="11" rx="2"/></svg>`;
  }
}

const MISSION_UPLOAD_LABELS = {
  photo: (vars) => (vars.nb > 1 ? "Photos à envoyer" : "Photo à envoyer"),
  photo_inconnus: (vars) => (vars.nb > 1 ? "Photos à envoyer" : "Photo à envoyer"),
  audio: (vars) => (vars.nb > 1 ? "Audios à envoyer" : "Audio à envoyer"),
  video: (vars) => (vars.nb > 1 ? "Vidéos à envoyer" : "Vidéo à envoyer"),
  collecte_objet: (vars) => (vars.nb > 1 ? "Photos des objets à envoyer" : "Photo de l’objet à envoyer"),
  fichier: (vars) => (vars.nb > 1 ? "Fichiers à envoyer" : "Fichier à envoyer"),
};

// ======================== GESTION AFFICHAGE ETAPE ========================

function afficherEtapeHarmonisee(etape, stepIndex, mode, testMode = false) {
  resetAffichageEtape();

  // 1. Titre et métaphore
  let titre = etape.titre || etape.nom || "";
  let metaphore = etape.metaphore || "";
  if ((!titre || titre === etape.type) || !metaphore) {
    if (typeof getRandomAtmosphere === "function") {
      const random = getRandomAtmosphere(etape.type, mode || "arthurien");
      if (!titre || titre === etape.type) titre = random.titre;
      if (!metaphore) metaphore = random.phrase;
    }
    if (!titre) titre = "Défi à relever";
    if (!metaphore) metaphore = "Prépare-toi à l'aventure !";
  }
  document.getElementById('titre-quete').textContent = titre || "";
  document.getElementById('metaphore-quete').innerHTML = metaphore ? `<em>${metaphore}</em>` : '';

  // 3. Consigne et sous-consignes harmonisées
  document.getElementById('bloc-mission').style.display = '';
  document.getElementById('mission-label').textContent = "Consigne";
  let vars = buildVars(etape);

  let phraseMission = genererPhraseMission(etape.type, mode || "arthurien", vars)
    || etape.params?.consigne
    || etape.params?.objectif
    || etape.params?.enigme
    || etape.params?.question
    || etape.description
    || "[Aucune consigne définie]";
  phraseMission = harmoniseArticles(phraseMission);
  phraseMission = accordePluriel(phraseMission, vars.nb || 1);

  // Sous-consignes : si consignes est un tableau non vide, on les affiche en liste
  let sousConsignesHtml = "";
  if (Array.isArray(etape.params?.consignes) && etape.params.consignes.length > 0) {
    sousConsignesHtml = `<ul style="margin: 8px 0 0 0; padding-left: 24px;">` +
      etape.params.consignes.map(c => c ? `<li>${accordePluriel(harmoniseArticles(c), vars.nb || 1)}</li>` : '').join('') +
      `</ul>`;
  }

  document.getElementById('mission-text').innerHTML = phraseMission + sousConsignesHtml;

  // ==== GESTION DU JEU DU TOUCHER-COULER ====
  if (etape.type === "touchercouler") {
    // Affichage du bloc dédié
    let bloc = document.getElementById('bloc-touchercouler');
    if (!bloc) {
      bloc = document.createElement('div');
      bloc.id = 'bloc-touchercouler';
      document.getElementById('main-content').appendChild(bloc);
    }
    bloc.style.display = '';
    bloc.innerHTML = `
      <div id="tc-score"></div>
      <div id="tc-feedback"></div>
      <div id="tc-phase"></div>
      <div id="tc-grilles"></div>
      <button id="tc-restart" style="margin:1em 0;display:none;">Recommencer</button>
    `;

    // Logique du jeu
    const letters = "ABCDEFGHIJ".split("");
    const numbers = Array.from({length:10},(_,i)=>i+1);
    const shipsDef = [
      { name: "Porte-avions", size: 5, count: 1 },
      { name: "Croiseur", size: 4, count: 1 },
      { name: "Contre-torpilleur", size: 3, count: 2 },
      { name: "Sous-marin", size: 2, count: 1 }
    ];

    let playerGrid = Array.from({length:10},()=>Array(10).fill(null));
    let aiGrid = placeAIShips();
    let playerShots = [];
    let aiShots = [];
    let shipsToPlace = JSON.parse(JSON.stringify(shipsDef));
    let placingPhase = true;
    let currentShip = null;
    let orientation = "horizontal";
    let playerTurn = true;
    let gameOver = false;
    let winner = "";
    let score = { joueur: 0, ia: 0 };

    function getRandomInt(max) { return Math.floor(Math.random()*max); }
    function cloneGrid(grid) { return grid.map(row=>[...row]); }
    function placeAIShips() {
      const grid = Array.from({length:10},()=>Array(10).fill(null));
      for (const ship of shipsDef) {
        for (let c = 0; c < ship.count; c++) {
          let placed = false;
          while (!placed) {
            const vertical = Math.random() < 0.5;
            const row = getRandomInt(vertical ? 10 - ship.size + 1 : 10);
            const col = getRandomInt(vertical ? 10 : 10 - ship.size + 1);
            let ok = true;
            for (let i = 0; i < ship.size; i++) {
              const r = row + (vertical ? i : 0), cl = col + (vertical ? 0 : i);
              if (grid[r][cl]) ok = false;
            }
            if (ok) {
              for (let i = 0; i < ship.size; i++) {
                const r = row + (vertical ? i : 0), cl = col + (vertical ? 0 : i);
                grid[r][cl] = ship.name;
              }
              placed = true;
            }
          }
        }
      }
      return grid;
    }

    function updateScore() {
      document.getElementById("tc-score").innerHTML =
        `<b>Score Joueur :</b> ${score.joueur} | <b>Score IA :</b> ${score.ia}`;
    }

    function showFeedback(msg) {
      document.getElementById("tc-feedback").innerHTML = msg;
    }

    function renderPhase() {
      document.getElementById("tc-phase").innerHTML =
        placingPhase ? `<b>Phase de placement des bateaux.</b> Sélectionnez un bateau puis cliquez sur la grille pour le placer. <br>
        <b>Orientation:</b>
        <button id="tc-orient-h">Horizontal</button>
        <button id="tc-orient-v">Vertical</button>` :
        `<b>Phase de jeu.</b> À vous de tirer sur la grille ennemie !`;
      if (placingPhase) {
        document.getElementById("tc-orient-h").onclick = ()=>{orientation="horizontal";};
        document.getElementById("tc-orient-v").onclick = ()=>{orientation="vertical";};
      }
    }

    function renderGrilles() {
      const grillesDiv = document.getElementById("tc-grilles");
      grillesDiv.innerHTML = `
        <div>
          <h4>Votre grille</h4>
          <table id="tc-player-grid"><thead>
            <tr><th></th>${letters.map(l=>`<th>${l}</th>`).join("")}</tr>
          </thead><tbody>
            ${numbers.map((num,r)=>
              `<tr><th>${num}</th>`+
              letters.map((_,c)=>{
                let cl = "";
                if (playerGrid[r][c]) cl="ship";
                if (aiShots.find(s=>s.row===r&&s.col===c)) cl+=playerGrid[r][c]?" hit":" miss";
                return `<td class="${cl}" style="cursor:${placingPhase&&currentShip?'pointer':'default'};" data-row="${r}" data-col="${c}"></td>`;
              }).join("")+
              `</tr>`
            ).join("")}
            </tbody></table>
        </div>
        <div>
          <h4>Grille ennemie</h4>
          <table id="tc-ai-grid"><thead>
            <tr><th></th>${letters.map(l=>`<th>${l}</th>`).join("")}</tr>
          </thead><tbody>
            ${numbers.map((num,r)=>
              `<tr><th>${num}</th>`+
              letters.map((_,c)=>{
                let shot = playerShots.find(s=>s.row===r&&s.col===c);
                let cl = shot ? (aiGrid[r][c]?"hit":"miss") : "";
                return `<td class="${cl}" style="cursor:${!placingPhase&&playerTurn&&!shot&&!gameOver?'pointer':'default'};" data-row="${r}" data-col="${c}"></td>`;
              }).join("")+
              `</tr>`
            ).join("")}
            </tbody></table>
        </div>
      `;
      // Placement
      if (placingPhase) {
        document.querySelectorAll("#tc-player-grid td").forEach(td=>{
          td.onclick = ()=>{
            if (!currentShip) return;
            let r=parseInt(td.dataset.row),c=parseInt(td.dataset.col);
            let size=currentShip.size;
            let ok=true;
            for(let i=0;i<size;i++){
              let rr=r+(orientation==="vertical"?i:0),cc=c+(orientation==="horizontal"?i:0);
              if(rr>9||cc>9||playerGrid[rr][cc])ok=false;
            }
            if(!ok)return;
            for(let i=0;i<size;i++){
              let rr=r+(orientation==="vertical"?i:0),cc=c+(orientation==="horizontal"?i:0);
              playerGrid[rr][cc]=currentShip.name;
            }
            shipsToPlace=shipsToPlace.map(ship=>
              ship.name===currentShip.name&&ship.count>0?{...ship,count:ship.count-1}:ship
            );
            currentShip=null;
            if(shipsToPlace.every(ship=>ship.count===0)){
              placingPhase=false;
              showFeedback("Tous les bateaux sont placés ! À vous de jouer.");
              renderPhase();
            }
            renderGrilles();
            renderShipsSelect();
          };
        });
      } else {
        // Tir sur IA
        document.querySelectorAll("#tc-ai-grid td").forEach(td=>{
          td.onclick = ()=>{
            if (placingPhase||!playerTurn||gameOver) return;
            let r=parseInt(td.dataset.row),c=parseInt(td.dataset.col);
            if(playerShots.find(s=>s.row===r&&s.col===c))return;
            playerShots.push({row:r,col:c});
            let hit=aiGrid[r][c];
            let msg=hit?`Touché en ${letters[c]}${numbers[r]} (${hit})!`:`Raté en ${letters[c]}${numbers[r]}.`;
            if(hit&&isShipSunk(aiGrid,playerShots,hit))msg+=` Coulé !`;
            showFeedback(msg);
            if(isAllShipsSunk(aiGrid,playerShots)){
              gameOver=true;winner="joueur";score.joueur++;
              showFeedback("Bravo ! Vous avez gagné !");
              document.getElementById("tc-restart").style.display="";
              updateScore();
              return;
            }
            playerTurn=false;
            setTimeout(()=>{iaPlay();},900);
            renderGrilles();
          };
        });
      }
    }

    function renderShipsSelect() {
      if (!placingPhase) {
        document.getElementById("tc-phase").innerHTML+=`<div><b>Bateaux placés. Commencez la partie !</b></div>`;
        return;
      }
      let shipsDiv = document.createElement("div");
      shipsDiv.id = "tc-ships-select";
      shipsDiv.innerHTML = `<b>Bateaux à placer :</b> `+
        shipsToPlace.map(ship=>
          `<button ${ship.count===0?"disabled":""} ${currentShip&&currentShip.name===ship.name?"style='background:#4a90e2;color:#fff'":""}
           >${ship.name} (${ship.size}) x${ship.count}</button>`
        ).join(" ");
      document.getElementById("tc-phase").appendChild(shipsDiv);
      shipsDiv.querySelectorAll("button").forEach((btn,i)=>{
        btn.onclick=()=>{currentShip=shipsToPlace[i];renderShipsSelect();}
      });
    }

    function isShipSunk(grid,shots,shipName){
      for(let r=0;r<10;r++)for(let c=0;c<10;c++)
        if(grid[r][c]===shipName&&!shots.find(s=>s.row===r&&s.col===c))return false;
      return true;
    }
    function isAllShipsSunk(grid,shots){
      for(const ship of shipsDef)
        for(let r=0;r<10;r++)for(let c=0;c<10;c++)
          if(grid[r][c]===ship.name&&!shots.find(s=>s.row===r&&s.col===c))return false;
      return true;
    }

    function iaPlay(){
      let r,c,exist;
      do{
        r=getRandomInt(10);c=getRandomInt(10);
        exist=aiShots.find(s=>s.row===r&&s.col===c);
      }while(exist);
      aiShots.push({row:r,col:c});
      let hit=playerGrid[r][c];
      let msg=hit?`L'IA a touché votre ${hit} en ${letters[c]}${numbers[r]}!`:`L'IA a raté en ${letters[c]}${numbers[r]}.`;
      if(hit&&isShipSunk(playerGrid,aiShots,hit))msg+=` Votre ${hit} est coulé !`;
      showFeedback(msg);
      if(isAllShipsSunk(playerGrid,aiShots)){
        gameOver=true;winner="ia";score.ia++;
        showFeedback("L'IA a gagné !");
        document.getElementById("tc-restart").style.display="";
        updateScore();
        return;
      }
      playerTurn=true;
      renderGrilles();
    }

    document.getElementById("tc-restart").onclick = function() {
      playerGrid = Array.from({length:10},()=>Array(10).fill(null));
      aiGrid = placeAIShips();
      playerShots=[];aiShots=[];
      shipsToPlace=JSON.parse(JSON.stringify(shipsDef));
      placingPhase=true;currentShip=null;orientation="horizontal";
      playerTurn=true;gameOver=false;winner="";
      showFeedback("");
      this.style.display="none";
      updateScore();renderPhase();renderGrilles();renderShipsSelect();
    };

    updateScore();
    renderPhase();
    renderGrilles();
    renderShipsSelect();
    showFeedback("");
    document.getElementById("tc-restart").style.display="none";
    document.getElementById('next-quest').style.display = 'none';
    window.waitAndShowEpreuveContent && window.waitAndShowEpreuveContent();
    return;
  }
  // ==== FIN GESTION DU TOUCHER-COULER ====

  // ... GESTION DU PENDU, UPLOAD, RÉPONSE, ETC. (inchangé - garde le code original ici) ...
}

// ---------------------- Toast ----------------------
function showToast(msg) {
  let toast = document.getElementById('toast-message');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-message';
    toast.className = 'modal-toast';
    toast.setAttribute('role', 'alert');
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('visible');
  setTimeout(() => { toast.classList.remove('visible'); }, 2200);
}

// ---------------------- Logique principale ----------------------

if (typeof isTestMode !== 'undefined' && isTestMode) {
  // ... inchangé pour le mode test ...
} else {
  // --- Mode normal ---
  const salonCode = localStorage.getItem("salonCode");
  const equipeNum = Number(localStorage.getItem("equipeNum"));
  if (!salonCode || isNaN(equipeNum) || equipeNum < 0) {
    window.location.href = "accueil.html";
  }

  let scenarioCode = null;

  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      firebase.auth().signInAnonymously();
      return;
    }

    db.ref(`parties/${salonCode}/parametres/scenarioCode`).once('value').then(snapCode => {
      scenarioCode = snapCode.val();

      db.ref(`parties/${salonCode}/scenario/mode`).once('value').then(snapMode => {
        window.currentScenarioMode = snapMode.val() || "arthurien";
      });

      chargerEtapeDynamique();
    });

    function chargerEtapeDynamique() {
      Promise.all([
        db.ref(`parties/${salonCode}/scenarioJeu/repartition`).once('value'),
        db.ref(`parties/${salonCode}/jetonMissionsMapping`).once('value'),
        db.ref(`parties/${salonCode}/finalGpsIndex`).once('value'),
        db.ref(`parties/${salonCode}/equipes/${equipeNum}/epreuves`).once('value')
      ]).then(([snapRep, snapMapping, snapFinal, snapStatus]) => {
        const repartition = snapRep.val() || [];
        const jetonMissionsMapping = snapMapping.val() || [];
        const finalGpsIndex = typeof snapFinal.val() === "number" ? snapFinal.val() : null;
        const validatedMissions = snapStatus.val() || {};

        // Cas particulier : point final
        if (missionIdx !== null && finalGpsIndex !== null && missionIdx === finalGpsIndex) {
          let toutesValidees = true;
          for (let i = 0; i < jetonMissionsMapping.length; i++) {
            if (jetonMissionsMapping[i] !== -1 &&
              (!validatedMissions[jetonMissionsMapping[i]] || !validatedMissions[jetonMissionsMapping[i]].validated)
            ) {
              toutesValidees = false; break;
            }
          }
          if (toutesValidees) {
            document.getElementById('main-content').innerHTML = `
              <h2 style="color:#38b948;font-family:'Cinzel Decorative',serif;">🎉 Jeu terminé !</h2>
              <div style="font-size:1.25em;margin:18px 0 32px 0;">Félicitations, vous avez accompli toutes les quêtes et atteint le point final !</div>
              <a class="main-btn" href="accueil.html" style="min-width:160px;">Retour à l'accueil</a>
            `;
          } else {
            document.getElementById('main-content').innerHTML = `
              <h2>Point final non accessible</h2>
              <div style="margin:18px 0 32px 0;">Vous devez d'abord terminer toutes les missions avant de pouvoir accéder à ce point.</div>
              <a class="main-btn" href="template-partie.html" style="min-width:160px;">Retour à la carte</a>
            `;
          }
          window.waitAndShowEpreuveContent && window.waitAndShowEpreuveContent();
          return;
        }

        // --- Support mode carte libre (missionIdx dans URL) ---
        if (missionIdx !== null && !isNaN(missionIdx) && repartition[missionIdx]) {
          const etape = repartition[missionIdx];
          resetAffichageEtape();
          afficherEtapeHarmonisee(etape.epreuve || etape, missionIdx, window.currentScenarioMode, false);
          document.getElementById('next-quest').onclick = () => validerEtape(missionIdx, repartition.length);
        } else {
          db.ref(`parties/${salonCode}/equipes/${equipeNum}/currentStep`).once('value').then(snapStep => {
            const step = snapStep.val() || 0;
            if (step >= repartition.length) {
              document.getElementById('main-content').innerHTML = "Bravo, partie terminée !";
              window.waitAndShowEpreuveContent && window.waitAndShowEpreuveContent();
              return;
            }
            const etape = repartition[step];
            resetAffichageEtape();
            afficherEtapeHarmonisee(etape.epreuve || etape, step, window.currentScenarioMode, false);
            document.getElementById('next-quest').onclick = () => validerEtape(step, repartition.length);
          });
        }
      });
    }

    function validerEtape(idx, repartLength) {
      const nextBtn = document.getElementById('next-quest');
      nextBtn.disabled = true;
      nextBtn.classList.remove('enabled');
      nextBtn.style.display = 'none';
      let retourBtn = document.getElementById('retourJeuBtn');
      if (retourBtn) retourBtn.style.pointerEvents = 'none';
      showToast("Validation en cours...");
      const now = Date.now();
      db.ref(`parties/${salonCode}/equipes/${equipeNum}/epreuves/${idx}/startTime`)
        .once('value', function (snap) {
          const sTime = snap.val();
          if (sTime) {
            const elapsed = Math.round((now - sTime) / 1000);
            db.ref(`parties/${salonCode}/equipes/${equipeNum}/stepsTime/${idx}`).set(elapsed);
          }
          sessionStorage.setItem('showValidationSuccess', '1');
          sessionStorage.setItem('nbEpreuvesRestantes', Math.max(0, repartLength - (idx+1)).toString());
          db.ref(`parties/${salonCode}/equipes/${equipeNum}/epreuves/${idx}/validated`).set(true)
            .then(() => fadeOutAndRedirect("template-partie.html"))
            .catch(() => {
              showToast("Erreur lors de la validation...");
              nextBtn.disabled = false;
              nextBtn.classList.add('enabled');
              nextBtn.style.display = '';
              if (retourBtn) retourBtn.style.pointerEvents = '';
            });
        });
    }
  });
}
