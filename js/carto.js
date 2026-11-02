/* Intervention TIIN — Cartographie radiologique.
   Zonage : Code du travail R4451-22 et R4451-23 (version 2025) ; repères opérationnels en débit de dose :
   EDF, rapport de sûreté FA3 chap. 12 (distingués des exigences réglementaires).
   Relevé, points chauds, frottis : EDF, mémento (2014) § 3.1, 3.2, 5.3. Temps-distance-écran : RP Cirkus DOC-FO-6_3. */
(function(){
"use strict";
const K=()=>window.ITCommun;
const LIENS=[["zonage","Les zones"],["releve","Faire un relevé"],["alara","Temps, distance, écran"],["defi","Défi : classe le local"]];
const RET={href:"#/carto",txt:"Cartographie radiologique"};
const ZONES=[
  {id:"hors",nom:"Hors zone contrôlée",sous:"zone surveillée bleue ou non délimitée, selon l’évaluation",max:7.5,c:"#9AA8C6"},
  {id:"verte",nom:"Zone contrôlée verte",sous:"repère EDF : jusqu’à 25 µSv/h",max:25,c:"#2E9E5B"},
  {id:"jaune",nom:"Zone contrôlée jaune",sous:"moins de 2 mSv sur une heure",max:2000,c:"#E6B422"},
  {id:"orange",nom:"Zone contrôlée orange",sous:"moins de 100 mSv sur une heure",max:100000,c:"#EE7A2E"},
  {id:"rouge",nom:"Zone contrôlée rouge",sous:"100 mSv ou plus sur une heure : accès interdit",max:Infinity,c:"#D63A2F"}
];
const zoneDe=v=>ZONES.find(z=>v<z.max);
const fmt=v=>v>=1000?(v/1000).toLocaleString("fr-FR",{maximumSignificantDigits:3})+" mSv/h":v.toLocaleString("fr-FR",{maximumSignificantDigits:3})+" µSv/h";

/* 1. Les zones */
function zonage(main){
  main.innerHTML=K().tete({retour:RET,tag:"03 · Fiche interactive",titre:"Les zones et leurs couleurs",
    lead:"Le zonage dit où l’on peut aller et à quelles conditions. Fais varier le débit de dose et regarde la zone changer.",nav:K().nav("carto",LIENS,"zonage")})+`
  <div class="guide">
    <section class="bloc">
      <h2 class="petit">Simulateur : débit de dose mesuré au poste</h2>
      <label class="curseur-lbl" for="ddd">Débit d’équivalent de dose : <b id="val"></b></label>
      <input type="range" id="ddd" min="-1" max="6" step="0.05" value="1.2">
      <div class="echelle-zones" aria-hidden="true">${ZONES.map(z=>`<span style="background:${z.c}"></span>`).join("")}</div>
      <div class="zone-res" id="res" aria-live="polite"></div>
      <p class="lead petit-txt">Équivalences en débit de dose : repères opérationnels du rapport de sûreté EDF de Flamanville 3, que le rapport distingue lui-même des exigences réglementaires. Sur ton chantier, c’est le classement affiché à l’entrée du local qui compte.</p>
    </section>
    <div class="panneau">
      <section class="bloc"><h2 class="petit">Ce que dit le Code du travail</h2>
        <table class="tab-zones"><tbody>
          <tr><td><i style="background:#4A7BD0"></i>Surveillée bleue</td><td>moins de 1,25 mSv sur un mois</td></tr>
          <tr><td><i style="background:#2E9E5B"></i>Contrôlée verte</td><td>moins de 4 mSv sur un mois</td></tr>
          <tr><td><i style="background:#E6B422"></i>Contrôlée jaune</td><td>moins de 2 mSv sur une heure</td></tr>
          <tr><td><i style="background:#EE7A2E"></i>Contrôlée orange</td><td>moins de 100 mSv sur une heure</td></tr>
          <tr><td><i style="background:#D63A2F"></i>Contrôlée rouge</td><td>100 mSv ou plus sur une heure</td></tr>
        </tbody></table>
        <p class="petit-txt">On délimite une zone dès que l’exposition peut dépasser 0,08 mSv par mois pour le corps entier. Il existe aussi une zone d’extrémités (mains, peau) et une zone radon. Articles R4451-22 et R4451-23.</p></section>
      <section class="bloc"><h2 class="petit">Propreté : un autre zonage</h2>
        <p class="petit-txt">La contamination a son propre zonage. Dans les centrales EDF en mode EVEREST : zone propre (moins de 0,4 Bq/cm² de contamination non fixée), contaminée (0,4 à 40 Bq/cm²), très contaminée (plus de 40). Un local peut être en zone verte et contaminé : les deux classements se lisent séparément.</p>
        <a class="btn" href="#/tenues/habillage">Voir les tenues par zone</a></section>
    </div>
  </div>`;
  const r=main.querySelector("#ddd");
  function maj(){const v=Math.pow(10,+r.value),z=zoneDe(v);
    main.querySelector("#val").textContent=fmt(v);r.setAttribute("aria-valuetext",fmt(v)+", "+z.nom);
    main.querySelector("#res").innerHTML=`<span class="pastille-zone" style="background:${z.c}"></span><span><strong>${z.nom}</strong><br><span class="petit-txt">${z.sous}</span></span>`;}
  r.oninput=maj;maj();
  return ()=>{};
}

/* 2. Faire un relevé (lecture guidée sur plan) */
const pt=(x,y,txt,id)=>`<g class="couche" data-c="${id}"><circle class="pt-mesure" cx="${x}" cy="${y}" r="7"/><rect class="etiq" x="${x+10}" y="${y-13}" width="${txt.length*7.4+12}" height="22" rx="5"/><text class="t-etiq" x="${x+16}" y="${y+3}">${txt}</text></g>`;
function plan(m){
  return `<svg class="sch" role="img" aria-labelledby="planTitre" viewBox="0 0 760 440">
  <title id="planTitre">Plan d’un local vu de dessus : porte d’entrée, tuyauterie avec une vanne, poste de travail, points de mesure</title>
  <rect class="zone-ok couche" data-c="zonage" x="40" y="40" width="660" height="360"/>
  <circle class="zone-chaud couche" data-c="zonage" cx="480" cy="150" r="62"/>
  <rect class="mur" x="40" y="40" width="660" height="360" rx="4"/>
  <rect class="porte-plan" x="34" y="200" width="12" height="60"/>
  <text class="t-petit" x="52" y="194">entrée</text>
  <path class="tuyau" d="M200 150 H700"/><path class="vanne" d="M462 136 L498 164 L498 136 L462 164 Z"/>
  <text class="t-petit" x="200" y="136">tuyauterie</text>
  <rect class="poste" x="420" y="236" width="110" height="52" rx="6"/><text class="t-petit" x="475" y="267" text-anchor="middle">poste de travail</text>
  <g class="couche" data-c="appareil"><rect class="appareil" x="70" y="300" width="46" height="34" rx="6"/><circle class="t-cadran" cx="93" cy="317" r="10"/><path class="aiguille" d="M93 317 L99 310"/><text class="t-petit" x="93" y="356" text-anchor="middle">radiamètre</text></g>
  ${pt(110,230,"4 µSv/h","p1")}${pt(290,320,"12 µSv/h","p2")}${pt(475,300,"20 µSv/h","p3")}${pt(620,340,"9 µSv/h","p5")}
  <g class="couche" data-c="chaud">${pt(480,180,"1,2 mSv/h au contact","p4")}<g transform="translate(560 96)"><rect class="pancarte" x="-18" y="-18" width="36" height="36" rx="4"/>${trefle(0,0,12)}</g><text class="t-petit" x="584" y="92">point chaud</text></g>
  <g class="couche" data-c="sonde"><path class="trajet-sonde" d="M240 380 H660"/><rect class="sonde-plan" x="232" y="370" width="24" height="16" rx="3"/><text class="t-petit" x="300" y="372">mesure directe au sol</text></g>
  <g class="couche" data-c="frottis"><rect class="frottis" x="430" y="196" width="16" height="16" rx="3"/><rect class="frottis" x="120" y="270" width="16" height="16" rx="3"/><text class="t-petit" x="150" y="284">frottis</text><text class="t-petit" x="352" y="208">frottis</text></g>
  <g class="couche" data-c="affiche"><rect class="affiche" x="4" y="120" width="30" height="40" rx="3"/><rect class="affiche-b" x="8" y="126" width="22" height="10"/><text class="t-petit" x="4" y="112">affiché</text>
    <g transform="translate(560 270)"><rect class="balise-g" x="-14" y="-18" width="28" height="36" rx="5"/><path class="aiguille" d="M-6 0 H6"/></g><text class="t-petit" x="580" y="290">balise gamma</text></g>
  ${window.ITSasDessin.marqueurs(m)}
</svg>`;
}
function trefle(x,y,r){const a=d=>[x+r*Math.cos(d*Math.PI/180),y+r*Math.sin(d*Math.PI/180)],ri=r*0.35;let p="";
  [-90,30,150].forEach(c=>{const[a1,a2]=[c-30,c+30];const P=(rr,d)=>{const t=d*Math.PI/180;return `${(x+rr*Math.cos(t)).toFixed(1)} ${(y+rr*Math.sin(t)).toFixed(1)}`;};
    p+=`M${P(ri,a1)} L${P(r,a1)} A${r} ${r} 0 0 1 ${P(r,a2)} L${P(ri,a2)} A${ri} ${ri} 0 0 0 ${P(ri,a1)} Z `;});
  return `<path class="trefle" d="${p}"/><circle class="trefle" cx="${x}" cy="${y}" r="${(r*0.22).toFixed(1)}"/>`;}
const RELEVE=[
  {court:"Vérifier l’appareil",titre:"Vérifier le radiamètre",voir:["appareil"],m:[140,316],
   texte:"Le radiamètre mesure le débit d’équivalent de dose ambiant : c’est l’appareil des cartographies. On contrôle son bon fonctionnement en le sortant du magasin : on le met en service et on vérifie l’absence de message de défaut (pile, capteur). Par précaution, on le recontrôle après usage.",
   observe:"un appareil douteux s’échange, il ne se « tente » pas."},
  {court:"Mesurer l’ambiance",titre:"Mesurer le débit de dose ambiant",voir:["p1","p2","p3","p5"],m:[290,290],
   texte:"On mesure en plusieurs points du local, et surtout aux postes de travail, pour vérifier que les débits sont conformes à la prévision. Certains appareils ont un temps de réponse long : on attend que la valeur soit stable avant de la lire.",
   observe:"la valeur au poste de travail est celle qui compte pour la dose de l’équipe."},
  {court:"Repérer les points chauds",titre:"Repérer les points chauds",voir:["chaud"],m:[420,190],
   texte:"Un point chaud est une partie de matériel où le débit est particulièrement élevé. Une petite source peut donner un débit modéré à 1 m et extrêmement élevé au contact : pour une source ponctuelle, le facteur peut atteindre 10 000 entre 1 m et 1 cm. Les points chauds sont signalés par une pancarte à trisecteur jaune, orange ou rouge, et balisés.",
   observe:"on ne manipule jamais un objet qui n’a pas été contrôlé."},
  {court:"Contamination : mesure directe",titre:"Contamination de surface : mesure directe",voir:["sonde"],m:[210,378],
   texte:"Avec un contaminamètre, on approche la sonde à moins de 5 mm de la surface, sans la toucher, et on la déplace très lentement. Les surfaces doivent être sèches et planes. La mesure directe voit la contamination fixée et la contamination non fixée.",
   observe:"trop loin ou trop vite, la sonde passe à côté de la contamination."},
  {court:"Contamination : frottis",titre:"Contamination de surface : le frottis",voir:["frottis"],m:[400,204],
   texte:"Le frottis prélève la contamination non fixée, celle qui peut se déplacer : frottis coton de 15 cm² pour une mesure, chiffonnette de 100 à 200 cm² pour un dépistage. Le support est ensuite contrôlé au plus près de la sonde. Une mesure, qui donne une valeur, est faite par du personnel de radioprotection ; un dépistage, qui dit seulement « contaminé ou pas », peut être fait par un intervenant formé.",
   observe:"le frottis ne voit pas la contamination fixée : il complète la mesure directe."},
  {court:"Reporter et signaler",titre:"Reporter, classer, signaler",voir:["zonage","affiche"],m:[86,140],
   texte:"Les mesures sont reportées sur le plan. Le local est classé et ce classement est affiché à son entrée ; le point chaud est balisé. S’il y a un risque d’évolution, on place une balise gamma près du chantier, après avoir mesuré le bruit de fond pour choisir son emplacement et son seuil d’alarme.",
   observe:"ici : local en zone verte, point chaud en jaune autour de la vanne."}
];
function releve(main){return window.ITSasDessin.guide(main,{id:"rel",courant:"releve",statique:true,vue:"Plan du local · schéma de principe",
  retour:RET,nav:K().nav("carto",LIENS,"releve"),svg:plan,tag:"03 · Lecture guidée",titre:"Faire un relevé radiologique",
  lead:"Six étapes pour cartographier un local avant une intervention : ambiance, points chauds, contamination, affichage.",
  legende:"<span>Valeurs inventées pour l’exercice</span><span>Repères de zone : rapport de sûreté EDF FA3</span>",
  etapes:RELEVE,base:[],suite:{href:"#/carto/alara",txt:"Temps, distance, écran"}});}

/* 3. Temps, distance, écran (simulateur) */
function alara(main){
  main.innerHTML=K().tete({retour:RET,tag:"03 · Mise en situation",titre:"Temps, distance, écran",
    lead:"Une source de césium 137 sur le chantier. Joue sur les trois leviers et regarde la dose reçue.",nav:K().nav("carto",LIENS,"alara")})+`
  <div class="guide">
    <figure class="feuille"><div class="feuille-tete"><span>Vue de côté · schéma de principe</span></div>
      <svg class="sch" role="img" aria-label="Source, écran de plomb et intervenant" viewBox="0 0 760 260">
        <line class="sol" x1="20" y1="220" x2="740" y2="220"/>
        <g transform="translate(70 196)"><circle class="source" r="16"/><text class="t-moyen" y="54" text-anchor="middle">Cs 137</text></g>
        <rect class="plomb" id="plomb" x="110" y="120" width="0" height="100"/>
        <text class="t-petit" id="plombTxt" x="112" y="112"></text>
        <path class="rayon" id="rayon" d="M86 190 H700"/>
        <g id="perso"><circle class="perso" cx="0" cy="110" r="14"/><path class="perso" d="M-14 220 V140 Q0 126 14 140 V220 Z"/></g>
        <path class="cote" id="cote" d="M70 238 H600"/><text class="t-petit" id="coteTxt" x="300" y="254" text-anchor="middle"></text>
      </svg>
      <figcaption><span>Source ponctuelle, sans rayonnement diffusé : un calcul de principe</span></figcaption></figure>
    <div class="panneau">
      <section class="bloc">
        <label class="curseur-lbl" for="act">Activité de la source : <b id="actV"></b></label><input type="range" id="act" min="0" max="2" step="1" value="1">
        <label class="curseur-lbl" for="dist">Distance : <b id="distV"></b></label><input type="range" id="dist" min="0.25" max="5" step="0.25" value="1">
        <label class="curseur-lbl" for="tps">Temps passé : <b id="tpsV"></b></label><input type="range" id="tps" min="5" max="120" step="5" value="30">
        <label class="curseur-lbl" for="pb">Écran de plomb : <b id="pbV"></b></label><input type="range" id="pb" min="0" max="5" step="0.5" value="0">
      </section>
      <section class="bloc resultat" aria-live="polite">
        <p class="petit-txt">Débit au poste</p><p class="gros" id="debit"></p>
        <p class="petit-txt">Dose reçue pendant le travail</p><p class="gros" id="dose"></p>
        <ul class="points" id="leviers"></ul>
      </section>
    </div>
  </div>
  <section class="bloc formule"><h2 class="petit">Comment c’est calculé</h2>
    <p class="petit-txt">À 1 m d’une source ponctuelle de 1 GBq de césium 137, le débit de dose dans l’air vaut environ 73 µGy/h ; il est proportionnel à l’activité. La distance agit en 1/d² : deux fois plus loin, quatre fois moins. Le plomb atténue en e<sup>−µx</sup>, avec µ ≈ 1,19 cm⁻¹ à 662 keV. La dose est le débit multiplié par le temps. Le rayonnement diffusé est négligé : en vrai, le débit est un peu plus élevé.</p></section>`;
  const $=s=>main.querySelector(s),ACT=[0.1,1,10];
  function maj(){
    const A=ACT[+$("#act").value],d=+$("#dist").value,t=+$("#tps").value,x=+$("#pb").value;
    const d1=73*A,att=Math.exp(-1.19*x),deb=d1/(d*d)*att,dose=deb*t/60;
    $("#actV").textContent=A.toLocaleString("fr-FR")+" GBq";$("#distV").textContent=d.toLocaleString("fr-FR")+" m";
    $("#tpsV").textContent=t+" min";$("#pbV").textContent=x?x.toLocaleString("fr-FR")+" cm":"aucun";
    const f=v=>v>=1000?(v/1000).toLocaleString("fr-FR",{maximumSignificantDigits:3})+" mGy":v.toLocaleString("fr-FR",{maximumSignificantDigits:3})+" µGy";
    $("#debit").textContent=f(deb)+"/h";$("#dose").textContent=f(dose);
    $("#leviers").innerHTML=`<li>Distance : ${d===1?"référence à 1 m":"× "+(1/(d*d)).toLocaleString("fr-FR",{maximumSignificantDigits:2})+" par rapport à 1 m"}</li><li>Écran : ${x?"débit divisé par "+(1/att).toLocaleString("fr-FR",{maximumSignificantDigits:3}):"pas d’atténuation"}</li><li>Temps : ${t} min, la dose suit le temps</li>`;
    const px=70+Math.min(d,5)*120;$("#perso").setAttribute("transform",`translate(${px} 0)`);
    $("#rayon").setAttribute("d",`M86 190 H${px-16}`);$("#cote").setAttribute("d",`M70 238 H${px}`);$("#coteTxt").setAttribute("x",(70+px)/2);$("#coteTxt").textContent=d.toLocaleString("fr-FR")+" m";
    $("#plomb").setAttribute("width",x*8);$("#plomb").setAttribute("x",Math.min(110,px-30-x*8));$("#plombTxt").textContent=x?"plomb":"";$("#plombTxt").setAttribute("x",Math.min(110,px-30-x*8));
  }
  main.querySelectorAll("input[type=range]").forEach(i=>i.oninput=maj);maj();
  return ()=>{};
}

/* 4. Défi : classe les points du local */
const POINTS=[{id:"a",lieu:"Entrée du local",v:3},{id:"b",lieu:"Allée centrale",v:14},{id:"c",lieu:"Poste de travail",v:60},
  {id:"d",lieu:"Au contact de la vanne",v:1500},{id:"e",lieu:"Fond de la casemate",v:6000},{id:"f",lieu:"Fond de piscine vide",v:180000}];
function defi(main){
  const rep={};let verif=false;
  main.innerHTML=K().tete({retour:RET,tag:"03 · Défi",titre:"Classe les points mesurés",
    lead:"Pour chaque débit mesuré, choisis la zone, avec les repères EDF en débit de dose. Puis vérifie.",nav:K().nav("carto",LIENS,"defi")})+`
  <div class="ordre-zone"><ol class="cartes-ordre" id="pts"></ol>
    <aside class="bloc"><p class="petit-txt">Repères : contrôlée verte au-delà de 7,5 µSv/h et jusqu’à 25 µSv/h ; jaune jusqu’à 2 mSv/h ; orange jusqu’à 100 mSv/h ; rouge au-delà.</p>
      <p class="compteur" id="etat" aria-live="polite"></p>
      <div class="nav-etapes"><button type="button" class="btn" id="raz">Recommencer</button><button type="button" class="btn btn-primary" id="verif">Vérifier</button></div></aside></div>`;
  const $=s=>main.querySelector(s);
  function rendu(){
    $("#pts").innerHTML=POINTS.map(p=>{const bon=zoneDe(p.v).id,ok=rep[p.id]===bon;
      return `<li class="carte-zone${verif?(ok?" bon":" faux"):""}"><div class="txt"><strong>${p.lieu}</strong><span class="petit-txt">${fmt(p.v)}</span></div>
      <div class="choix-zone" role="group" aria-label="Zone pour ${p.lieu}">${ZONES.map(z=>`<button type="button" class="z-btn" data-p="${p.id}" data-z="${z.id}" aria-pressed="${rep[p.id]===z.id}" title="${z.nom}"><i style="background:${z.c}"></i><span>${z.id==="hors"?"Hors ZC":z.nom.replace("Zone contrôlée ","")}</span></button>`).join("")}</div>
      ${verif&&!ok?`<p class="petit-txt corr">Réponse : ${zoneDe(p.v).nom}</p>`:""}</li>`;}).join("");
    main.querySelectorAll(".z-btn").forEach(b=>b.onclick=()=>{rep[b.dataset.p]=b.dataset.z;verif=false;rendu();});
    const n=Object.keys(rep).length;
    $("#etat").innerHTML=verif?`<b>${POINTS.filter(p=>rep[p.id]===zoneDe(p.v).id).length}</b> / ${POINTS.length} points bien classés`:`<b>${n}</b> / ${POINTS.length} points classés`;
  }
  $("#verif").onclick=()=>{verif=true;rendu();};$("#raz").onclick=()=>{for(const k in rep)delete rep[k];verif=false;rendu();};
  rendu();return ()=>{};
}
window.ITCarto={zonage,releve,alara,defi,RELEVE,POINTS,zoneDe};
})();
