/* Intervention TIIN — dessin commun du sas complet, vu de dessus (schéma de principe non dimensionné).
   Sas d'entrée → sas intermédiaire → sas de travail (nappe de travail) ; sortie par le sas intermédiaire
   puis le sas de sortie. Chaque élément est un calque <g data-c="…"> que les vues affichent ou masquent.
   Variantes pour le défi : opts.erreurs = {passage, sansContam, alphaUnThe, film, sansDepression}. */
(function(){
"use strict";
const POUBELLE=(x,y)=>`<g class="poubelle" transform="translate(${x} ${y})"><path d="M-7 -6 H7 L5 9 H-5 Z"/><path d="M-9 -6 H9 M-3 -6 V-9 H3 V-6"/></g>`;
const PICTO={
  contam:(x,y)=>`<g class="equip" transform="translate(${x} ${y})"><rect x="-17" y="-11" width="34" height="22" rx="4"/><path class="eq-trait" d="M-10 4 A10 10 0 0 1 10 4"/><path class="eq-aig" d="M0 4 L6 -3"/></g>`,
  aerosol:(x,y)=>`<g class="equip" transform="translate(${x} ${y})"><rect x="-13" y="-13" width="26" height="26" rx="5"/><circle class="eq-trait" cx="0" cy="0" r="6"/><path class="eq-trait" d="M-9 -9 l3 3 M9 -9 l-3 3 M-9 9 l3 -3 M9 9 l-3 -3"/></g>`,
  irradiation:(x,y)=>`<g class="equip" transform="translate(${x} ${y})"><rect x="-13" y="-13" width="26" height="26" rx="5"/><path class="eq-plein" d="M0 0 L8.2 -4.7 A9.5 9.5 0 0 0 0 -9.5 Z M0 0 L-8.2 -4.7 A9.5 9.5 0 0 1 0 -9.5 Z" transform="rotate(30)"/><path class="eq-plein" d="M0 0 L4.7 8.2 A9.5 9.5 0 0 1 -4.7 8.2 Z"/><circle class="eq-fond" r="2.6"/></g>`
};

function dessin(opts){
  opts=opts||{};const E=opts.erreurs||{};const id=opts.id||"sas";
  const porte=(x,y,w,h)=>`<rect class="porte" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
  return `<svg class="sch" role="${opts.role||"img"}" aria-labelledby="${id}Titre" viewBox="0 0 800 460">
  <title id="${id}Titre">${opts.titre||"Schéma de principe d’un sas complet vu de dessus : sas d’entrée, sas intermédiaire, sas de travail avec nappe de travail, sas de sortie, extraction filtrée"}</title>
  <defs><pattern id="${id}Hach" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line class="hach" x1="0" y1="0" x2="0" y2="6"/></pattern>
  <pattern id="${id}Nappe" width="10" height="10" patternUnits="userSpaceOnUse"><path class="nappe-motif" d="M0 10 L10 0"/></pattern></defs>

  <rect class="zone-propre" x="20" y="40" width="130" height="380" rx="6"/>
  <text class="t-zone" x="85" y="30" text-anchor="middle">Zone propre</text>
  <text class="t-p" x="85" y="404" text-anchor="middle">P₀</text>

  <g class="couche" data-c="entree">
    <rect class="piece" x="170" y="50" width="130" height="150" rx="3"/>
    <text class="t-zone" x="180" y="72">Sas d’entrée</text><text class="t-p" x="290" y="72" text-anchor="end">P₁</text>
    ${porte(147,110,26,40)}
  </g>
  <g class="couche" data-c="inter">
    <rect class="piece" x="320" y="120" width="110" height="220" rx="3"/>
    <text class="t-zone t-etroit" x="375" y="142" text-anchor="middle">Sas</text><text class="t-zone t-etroit" x="375" y="158" text-anchor="middle">intermédiaire</text>
    <text class="t-p" x="420" y="182" text-anchor="end">P₂</text>
    ${porte(297,150,26,35)}
  </g>
  <g class="couche" data-c="travail">
    <rect class="piece travail" x="450" y="50" width="230" height="360" rx="3"/>
    <text class="t-zone" x="565" y="72" text-anchor="middle">Sas de travail</text><text class="t-p" x="670" y="400" text-anchor="end">P₃</text>
    ${porte(427,210,26,40)}
  </g>
  <g class="couche" data-c="nappe">
    <rect class="nappe" x="500" y="150" width="140" height="160" rx="4" fill="url(#${id}Nappe)"/>
    <rect class="nappe-bord" x="500" y="150" width="140" height="160" rx="4"/>
    <path class="trait" d="M550 210 L590 240 L590 210 L550 240 Z"/><path class="trait" d="M570 225 V196 M558 196 H582"/>
    <text class="t-petit" x="570" y="172" text-anchor="middle">nappe de travail</text>
  </g>
  <g class="couche" data-c="sortie">
    <rect class="piece" x="170" y="260" width="130" height="150" rx="3"/>
    <text class="t-zone" x="180" y="282">Sas de sortie</text><text class="t-p" x="290" y="282" text-anchor="end">P₁</text>
    ${porte(297,285,26,35)}${porte(147,330,26,40)}
  </g>
  ${E.passage?`<g class="couche" data-c="travail"><rect class="porte" x="297" y="58" width="156" height="30"/><path class="paroi-fine" d="M300 58 H450 M300 88 H450"/><text class="t-petit" x="375" y="78" text-anchor="middle">passage</text></g>`:""}
  ${E.film?`<path class="dechirure" data-c="travail" d="M590 50 l7 8 l7 -10 l8 12 l7 -11 l8 10 l7 -9"/>`:""}

  <g class="couche" data-c="extraction">
    <path class="gaine" d="M680 230 H700"/>
    <rect class="fond trait" x="700" y="185" width="70" height="90" rx="6"/>
    <circle class="trait" cx="752" cy="230" r="12"/>
    <path class="trait fin" d="M752 218 L756 230 L752 242 M740 230 L752 226 L764 230"/>
    <text class="t-moyen" x="735" y="292" text-anchor="middle">Extraction</text>
    <path class="trait" d="M735 185 V72"/><path class="trait" d="M727 82 L735 70 L743 82"/>
    <text class="t-petit" x="735" y="60" text-anchor="middle">rejet</text>
  </g>
  <g class="couche" data-c="the">${E.sansThe?"":`<rect class="the" x="706" y="193" width="11" height="74" fill="url(#${id}Hach)"/>`}<text class="t-the" x="${E.sansThe?722:712}" y="181" text-anchor="middle">${E.sansThe?"":"THE"}</text></g>
  <g class="couche" data-c="the2"><rect class="the" x="721" y="193" width="11" height="74" fill="url(#${id}Hach)"/><text class="t-petit" x="735" y="306" text-anchor="middle">2 THE en série</text></g>
  <g class="couche" data-c="alpha"><rect class="panneau-alpha" x="520" y="96" width="100" height="24" rx="4"/><text class="t-alpha" x="570" y="113" text-anchor="middle">RISQUE ALPHA</text></g>

  <g class="couche" data-c="air">
    <path class="air" d="M50 130 H235 V167 H375 V230 H700"/>
    <path class="air" d="M50 350 H235 V302 H375 V252"/>
    <path class="air fin" d="M462 92 Q 650 100 690 218"/><path class="air fin" d="M462 392 Q 650 380 690 242"/>
    <path class="fleche" d="M140 122 L150 130 L140 138 M290 159 L300 167 L290 175 M440 222 L450 230 L440 238 M140 342 L150 350 L140 358 M290 294 L300 302 L290 310"/>
  </g>
  <g class="couche" data-c="air-rejet"><path class="air" d="M735 185 V76"/></g>

  <g class="couche" data-c="indic">
    <circle class="fond trait" cx="440" cy="296" r="11"/><path class="aiguille" d="${E.sansDepression?"M440 296 V285":"M440 296 L446 289"}"/>
    <text class="t-petit t-equip" x="375" y="362" text-anchor="middle">indicateur de</text><text class="t-petit t-equip" x="375" y="376" text-anchor="middle">dépression${E.sansDepression?" : P₂ = P₃":""}</text>
  </g>

  <g class="couche" data-c="parcours-entree"><path class="parcours entree" d="M85 130 H235 V167 H375 V230 H555"/><path class="parcours-fleche entree" d="M545 222 L555 230 L545 238"/></g>
  <g class="couche" data-c="parcours-sortie"><path class="parcours sortie" d="M600 240 V340 H468 V240 H375 V302 H235 V350 H60"/><path class="parcours-fleche sortie" d="M70 342 L60 350 L70 358"/></g>
  <g class="couche" data-c="sauts">
    <path class="saut" d="M590 310 H610"/><path class="saut" d="M440 230 V250"/><path class="saut" d="M310 292 V312"/><path class="saut" d="M160 340 V360"/>
    <text class="t-saut" x="616" y="322">saut</text><text class="t-saut" x="424" y="268" text-anchor="end">saut</text><text class="t-saut" x="316" y="330">saut</text><text class="t-saut" x="160" y="330" text-anchor="middle">saut</text>
  </g>

  <g class="couche" data-c="contam">${E.sansContam?"":PICTO.contam(206,380)+`<text class="t-petit t-equip" x="235" y="406" text-anchor="middle">contaminamètre</text>`}</g>
  <g class="couche" data-c="aerosol">${PICTO.aerosol(475,100)}<text class="t-petit t-equip" x="466" y="130">balise aérosols</text></g>
  <g class="couche" data-c="irradiation">${PICTO.irradiation(655,100)}<text class="t-petit t-equip" x="672" y="130" text-anchor="end">irradiation</text></g>
  <g class="couche" data-c="poubelles">${POUBELLE(475,378)}${POUBELLE(408,312)}${POUBELLE(282,334)}</g>
  ${(opts.marqueurs||[]).map((m,i)=>`<g class="marq couche" data-m="${i}" aria-hidden="true"><circle cx="${m[0]}" cy="${m[1]}" r="12"/><text x="${m[0]}" y="${m[1]+4}" text-anchor="middle">${i+1}</text></g>`).join("")}
  ${opts.extra||""}
</svg>`;
}

/* Moteur de lecture guidée commun : étapes, calques cumulés, option, pause, clavier. */
function guide(main,cfg){
  const reduit=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ET=cfg.etapes;let etape=0,lecture=!reduit,option=false;
  main.innerHTML=`
  <div class="page-head"><div>
    <a class="retour" href="#/sas">← Sas et confinement</a>
    <p class="tag"><span class="bars" aria-hidden="true"><i></i><i></i><i></i></span>${cfg.tag}</p>
    <h1>${cfg.titre}</h1>
    <p class="lead">${cfg.lead}</p>
  </div>${segment(cfg.courant)}</div>
  <div class="guide">
    <figure class="feuille" id="feuille">
      <div class="feuille-tete"><span>${cfg.vue||"Vue de dessus · schéma de principe"}</span><button type="button" class="btn btn-pause" id="pause"></button></div>
      ${cfg.svg?cfg.svg(ET.map(e=>e.m)):dessin({marqueurs:ET.map(e=>e.m),id:cfg.id})}
      <figcaption>${cfg.legende}</figcaption>
    </figure>
    <div class="panneau">
      <section class="bloc" aria-live="polite">
        <p class="etape-num"><span id="num"></span><span class="points" aria-hidden="true">${ET.map(()=>"<i></i>").join("")}</span></p>
        <h2 class="etape-titre" id="titre"></h2>
        <p class="etape-texte" id="texte"></p>
        <p class="encadre observe"><strong>Observe · </strong><span id="observe"></span></p>
        ${cfg.option?`<label class="option" id="optionBloc"><input type="checkbox" id="option"><span>${cfg.option.label}</span></label>`:""}
        <div class="nav-etapes"><button type="button" class="btn" id="prec">Précédent</button><button type="button" class="btn btn-primary" id="suiv">Étape suivante</button></div>
      </section>
      <ol class="liste-etapes">${ET.map((e,i)=>`<li><button type="button" data-i="${i}"><span class="n">${i+1}</span><span>${e.court}</span></button></li>`).join("")}</ol>
    </div>
  </div>`;
  const $=s=>main.querySelector(s),feuille=$("#feuille"),pause=$("#pause");
  function maj(){
    const e=ET[etape],vus=new Set();
    ET.slice(0,etape+1).forEach(x=>x.voir.forEach(c=>vus.add(c)));
    if(cfg.option&&option&&etape>=cfg.option.apres)cfg.option.couches.forEach(c=>vus.add(c));
    if(cfg.option&&!option)cfg.option.couches.forEach(c=>vus.delete(c));
    main.querySelectorAll("[data-c]").forEach(g=>g.classList.toggle("cache",!vus.has(g.dataset.c)));
    main.querySelectorAll(".marq").forEach(g=>{const i=+g.dataset.m;g.classList.toggle("cache",i!==etape);g.classList.add("ici");});
    $("#num").textContent=`Étape ${etape+1} sur ${ET.length}`;
    $("#titre").textContent=e.titre;$("#texte").textContent=(option&&e.texteOption)||e.texte;$("#observe").textContent=(option&&e.observeOption)||e.observe;
    main.querySelectorAll(".points i").forEach((p,i)=>p.className=i===etape?"ici":i<etape?"fait":"");
    main.querySelectorAll(".liste-etapes button").forEach((b,i)=>{b.classList.toggle("fait",i<etape);if(i===etape)b.setAttribute("aria-current","step");else b.removeAttribute("aria-current");});
    if(cfg.option)$("#optionBloc").hidden=etape<cfg.option.apres;
    $("#prec").disabled=etape===0;
    $("#suiv").textContent=etape===ET.length-1?cfg.suite.txt:"Étape suivante";
  }
  function majLecture(){feuille.classList.toggle("en-pause",!lecture);pause.textContent=lecture?"Pause":"Lecture";
    pause.setAttribute("aria-label",lecture?"Mettre l’animation en pause":"Lancer l’animation");}
  $("#prec").onclick=()=>{if(etape>0){etape--;maj();}};
  $("#suiv").onclick=()=>{if(etape<ET.length-1){etape++;maj();}else location.hash=cfg.suite.href;};
  main.querySelectorAll(".liste-etapes button").forEach(b=>b.onclick=()=>{etape=+b.dataset.i;maj();});
  pause.onclick=()=>{lecture=!lecture;majLecture();};
  if(cfg.option)$("#option").onchange=ev=>{option=ev.target.checked;maj();};
  const clavier=ev=>{
    if(ev.target.closest("input,textarea,select,[role=button]"))return;
    if(ev.key==="ArrowRight"&&etape<ET.length-1){etape++;maj();}
    else if(ev.key==="ArrowLeft"&&etape>0){etape--;maj();}
  };
  document.addEventListener("keydown",clavier);
  maj();majLecture();
  return ()=>document.removeEventListener("keydown",clavier);
}

function segment(courant){
  const l=[["complet","Le sas complet"],["confinement","Confinement"],["caisson","Caisson filtre"],["defi-erreurs","Défi : trouve les erreurs"]];
  return `<nav class="segment" aria-label="Activités du sas">${l.map(([id,t])=>`<a href="#/sas/${id}"${id===courant?' aria-current="page"':""}>${t}</a>`).join("")}</nav>`;
}

window.ITSasDessin={dessin,guide,segment,marqueurs:m=>m.map((p,i)=>`<g class="marq couche" data-m="${i}" aria-hidden="true"><circle cx="${p[0]}" cy="${p[1]}" r="12"/><text x="${p[0]}" y="${p[1]+4}" text-anchor="middle">${i+1}</text></g>`).join("")};
})();
