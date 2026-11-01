/* Intervention TIIN — Sas : lecture guidée du confinement dynamique.
   Principes : confinement statique (enceinte) + confinement dynamique (cascade de dépressions,
   air du moins contaminé vers le plus contaminé, filtration très haute efficacité avant rejet).
   Sources : SOURCES.md. Aucune valeur de dépression n'est donnée tant qu'elle n'est pas sourcée. */
(function(){
"use strict";
const ETAPES=[
  {court:"La structure délimite le chantier",titre:"La structure délimite le chantier",
   texte:"Un cadre et des montants entourent le point d’intervention. Ils portent l’enceinte : ce qui sera contaminé doit rester à l’intérieur.",
   observe:"le chantier est fermé de tous côtés, sauf vers le sas de transit.",m:[384,76]},
  {court:"Le film vinyle rend l’enceinte étanche",titre:"Le film vinyle rend l’enceinte étanche",
   texte:"Le film habille la structure, jointures scotchées : c’est le confinement statique. Un sas de transit sépare la zone propre du chantier : on ne passe jamais directement de l’un à l’autre.",
   observe:"deux passages en ligne : propre, puis transit, puis chantier.",m:[234,144]},
  {court:"L’extracteur aspire l’air du chantier",titre:"L’extracteur aspire l’air du chantier",
   texte:"Une unité d’extraction est raccordée au chantier. Elle aspire en permanence : l’enceinte passe en dépression, c’est le confinement dynamique.",
   observe:"l’extracteur est du côté opposé à l’entrée : l’air balaie tout le chantier.",m:[660,150]},
  {court:"L’air va du propre vers le contaminé",titre:"L’air va toujours du propre vers le contaminé",
   texte:"La pression baisse d’une zone à l’autre : propre, puis transit, puis chantier. C’est la cascade de dépressions. Par une fuite ou une porte ouverte, l’air entre dans le chantier : il n’en sort pas.",
   observe:"suis une flèche : aucune ne revient vers la zone propre.",m:[150,196]},
  {court:"Le filtre THE retient les aérosols",titre:"Le filtre THE retient les aérosols",
   texte:"Avant d’être rejeté, l’air aspiré traverse un filtre à très haute efficacité (THE). Les particules contaminées y restent piégées : le filtre usagé devient lui-même un déchet.",
   observe:"le filtre est placé avant le rejet, jamais après.",m:[695,306]},
  {court:"On contrôle avant d’entrer",titre:"On contrôle avant d’entrer",
   texte:"Avant utilisation : l’indicateur montre que le chantier est bien en dépression, le film est intact, le balisage est en place. La valeur de dépression attendue est fixée par les consignes du site.",
   observe:"un sas qui ne tient pas sa dépression ne confine plus rien.",m:[336,128]}
];

function schema(){
  return `<svg class="sch" role="img" aria-labelledby="schTitre" viewBox="0 0 760 440">
  <title id="schTitre">Schéma de principe d’un sas vu de dessus : zone propre, sas de transit, chantier, extracteur avec filtre THE</title>
  <defs><pattern id="hachures" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line class="hach" x1="0" y1="0" x2="0" y2="6"/></pattern></defs>
  <rect class="zone-propre" x="20" y="60" width="180" height="320" rx="6"/>
  <text class="t-zone" x="110" y="48" text-anchor="middle">Zone propre</text>
  <text class="t-p" x="110" y="364" text-anchor="middle">P₁</text>
  <g class="couche" data-c="0">
    <rect class="zone-chantier" x="370" y="60" width="290" height="320" rx="4"/><rect class="structure" x="370" y="60" width="290" height="320" rx="4"/>
    <circle class="poteau" cx="370" cy="60" r="5"/><circle class="poteau" cx="660" cy="60" r="5"/><circle class="poteau" cx="370" cy="380" r="5"/><circle class="poteau" cx="660" cy="380" r="5"/>
    <text class="t-zone" x="515" y="48" text-anchor="middle">Chantier</text>
    <path class="trait" d="M495 205 L535 235 L535 205 L495 235 Z"/><path class="trait" d="M515 220 V190 M503 190 H527"/>
    <text class="t-petit" x="515" y="256" text-anchor="middle">point d’intervention</text>
    <text class="t-p" x="515" y="364" text-anchor="middle">P₃</text>
  </g>
  <g class="couche" data-c="1">
    <rect class="film" x="372" y="62" width="286" height="316" rx="3"/>
    <rect class="zone-transit" x="220" y="130" width="130" height="180"/>
    <path class="film" d="M220 130 H350 V200 M350 240 V310 H220 V240 M220 200 V130"/>
    <path class="film" style="stroke-dasharray:none" d="M350 200 H370 M350 240 H370"/>
    <text class="t-zone" x="285" y="122" text-anchor="middle">Sas de transit</text>
    <text class="t-p" x="285" y="296" text-anchor="middle">P₂</text>
    <text class="t-petit" x="515" y="400" text-anchor="middle">film vinyle (pointillés)</text>
  </g>
  <g class="couche" data-c="2">
    <path class="gaine" d="M660 220 H682"/>
    <rect class="fond trait" x="682" y="178" width="62" height="86" rx="6"/>
    <circle class="trait" cx="724" cy="221" r="13"/>
    <path class="trait" style="stroke-width:1.6" d="M724 208 L728 221 L724 234 M711 221 L724 217 L737 221"/>
    <text class="t-moyen" x="713" y="282" text-anchor="middle">Extracteur</text>
  </g>
  <g class="couche" data-c="3">
    <path class="air" d="M60 220 H490"/><path class="air" d="M540 220 H700"/>
    <path class="air fin" d="M380 100 Q 600 110 664 206"/><path class="air fin" d="M380 340 Q 600 330 664 234"/>
    <path class="fleche" d="M190 212 L200 220 L190 228 M330 212 L340 220 L330 228 M470 212 L480 220 L470 228"/>
    <text class="t-air" x="110" y="250" text-anchor="middle">entrée d’air</text>
  </g>
  <g class="couche" data-c="4">
    <rect class="the" x="688" y="186" width="14" height="70"/>
    <text class="t-the" x="695" y="176" text-anchor="middle">THE</text>
    <path class="air" d="M724 178 V86"/><path class="fleche" d="M716 96 L724 84 L732 96"/>
    <text class="t-moyen" style="font-weight:400" x="752" y="72" text-anchor="end">rejet filtré</text>
  </g>
  <g class="couche" data-c="5">
    <circle class="fond trait" cx="360" cy="96" r="14"/><path class="aiguille" d="M360 96 L367 88"/>
    <path class="trait" style="stroke-width:1.4;stroke-dasharray:3 3" d="M360 110 V130"/>
    <text class="t-petit" x="300" y="82" text-anchor="end">indicateur</text><text class="t-petit" x="300" y="96" text-anchor="end">de dépression</text>
  </g>
  ${ETAPES.map((e,i)=>`<g class="marq couche" data-m="${i}" aria-hidden="true"><circle cx="${e.m[0]}" cy="${e.m[1]}" r="12"/><text x="${e.m[0]}" y="${e.m[1]+4}" text-anchor="middle">${i+1}</text></g>`).join("")}
</svg>`;
}

function ouvrir(main){
  const reduit=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let etape=0,lecture=!reduit;
  main.innerHTML=`
  <div class="page-head"><div>
    <a class="retour" href="#/sas">← Sas et confinement</a>
    <p class="tag"><span class="bars" aria-hidden="true"><i></i><i></i><i></i></span>02 · Lecture guidée</p>
    <h1>Le confinement dynamique d’un sas</h1>
    <p class="lead">Suis l’air : il entre toujours par le côté propre et sort filtré. Six étapes pour comprendre pourquoi la contamination reste dans le chantier.</p>
  </div>
  <nav class="segment" aria-label="Activités du sas"><a href="#/sas/confinement" aria-current="page">Lecture guidée</a><a href="#/sas/defi-erreurs">Défi : trouve les erreurs</a></nav>
  </div>
  <div class="guide">
    <figure class="feuille" id="feuille">
      <div class="feuille-tete"><span>Vue de dessus · schéma de principe</span><button type="button" class="btn btn-pause" id="pause"></button></div>
      ${schema()}
      <figcaption><span><i></i>sens de l’air</span><span>P₁ &gt; P₂ &gt; P₃ : la pression baisse vers le chantier</span><span>Schéma non dimensionné</span></figcaption>
    </figure>
    <div class="panneau">
      <section class="bloc" aria-live="polite">
        <p class="etape-num"><span id="num"></span><span class="points" aria-hidden="true">${ETAPES.map(()=>"<i></i>").join("")}</span></p>
        <h2 class="etape-titre" id="titre"></h2>
        <p class="etape-texte" id="texte"></p>
        <p class="encadre observe"><strong>Observe · </strong><span id="observe"></span></p>
        <div class="nav-etapes"><button type="button" class="btn" id="prec">Précédent</button><button type="button" class="btn btn-primary" id="suiv">Étape suivante</button></div>
      </section>
      <ol class="liste-etapes">${ETAPES.map((e,i)=>`<li><button type="button" data-i="${i}"><span class="n">${i+1}</span><span>${e.court}</span></button></li>`).join("")}</ol>
    </div>
  </div>`;
  const $=s=>main.querySelector(s);
  const feuille=$("#feuille"),pause=$("#pause");
  function maj(){
    const e=ETAPES[etape];
    $("#num").textContent=`Étape ${etape+1} sur ${ETAPES.length}`;
    $("#titre").textContent=e.titre;$("#texte").textContent=e.texte;$("#observe").textContent=e.observe;
    main.querySelectorAll(".couche[data-c]").forEach(g=>g.classList.toggle("cache",+g.dataset.c>etape));
    main.querySelectorAll(".marq").forEach(g=>{const i=+g.dataset.m;g.classList.toggle("cache",i>etape);g.classList.toggle("ici",i===etape);});
    main.querySelectorAll(".points i").forEach((p,i)=>p.className=i===etape?"ici":i<etape?"fait":"");
    main.querySelectorAll(".liste-etapes button").forEach((b,i)=>{b.classList.toggle("fait",i<etape);if(i===etape)b.setAttribute("aria-current","step");else b.removeAttribute("aria-current");});
    $("#prec").disabled=etape===0;
    $("#suiv").textContent=etape===ETAPES.length-1?"Passer au défi":"Étape suivante";
  }
  function majLecture(){
    feuille.classList.toggle("en-pause",!lecture);
    pause.textContent=lecture?"Pause":"Lecture";
    pause.setAttribute("aria-label",lecture?"Mettre l’animation en pause":"Lancer l’animation");
  }
  $("#prec").onclick=()=>{if(etape>0){etape--;maj();}};
  $("#suiv").onclick=()=>{if(etape<ETAPES.length-1){etape++;maj();}else location.hash="#/sas/defi-erreurs";};
  main.querySelectorAll(".liste-etapes button").forEach(b=>b.onclick=()=>{etape=+b.dataset.i;maj();});
  pause.onclick=()=>{lecture=!lecture;majLecture();};
  const clavier=ev=>{
    if(ev.target.closest("input,textarea,select"))return;
    if(ev.key==="ArrowRight"&&etape<ETAPES.length-1){etape++;maj();}
    else if(ev.key==="ArrowLeft"&&etape>0){etape--;maj();}
  };
  document.addEventListener("keydown",clavier);
  maj();majLecture();
  return ()=>document.removeEventListener("keydown",clavier);
}
window.ITSasConfinement={ouvrir,ETAPES};
})();
