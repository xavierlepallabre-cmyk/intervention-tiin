/* Intervention TIIN — Sas : lecture guidée « Le caisson de filtration ».
   Source principale : IRSN, spécification technique CTHEN 14-07 (2014), caisson pour filtres THE du
   dernier niveau de filtration. Deux THE en série si risque alpha : enseignant. Voir SOURCES.md.
   Les valeurs d'essai d'homologation (pressions, températures) ne sont volontairement pas affichées. */
(function(){
"use strict";
function svg(marq){
  const plis=(x)=>{let d=`M${x} 118`;for(let y=118;y<282;y+=12)d+=` L${x+30} ${y+6} L${x} ${y+12}`;return d;};
  return `<svg class="sch" role="img" aria-labelledby="caissonTitre" viewBox="0 0 800 400">
  <title id="caissonTitre">Schéma de principe d’un caisson de filtration vu de côté : gaine venant du sas, préfiltre, filtre THE, manomètre, sac de changement, extracteur et rejet</title>
  <defs><pattern id="caiPoints" width="8" height="8" patternUnits="userSpaceOnUse"><circle class="pf-point" cx="4" cy="4" r="1.6"/></pattern></defs>
  <g class="couche" data-c="base">
    <rect class="gaine-rect" x="20" y="172" width="112" height="56"/>
    <text class="t-petit" x="76" y="160" text-anchor="middle">depuis le sas</text><text class="t-petit" x="76" y="250" text-anchor="middle">de travail</text>
    <rect class="piece" x="130" y="92" width="482" height="216" rx="8"/>
    <text class="t-zone" x="476" y="332" text-anchor="middle">Caisson de filtration (« BSS »)</text>
    <rect class="gaine-rect" x="610" y="172" width="112" height="56"/>
    <rect class="fond trait" x="720" y="146" width="62" height="108" rx="6"/>
    <circle class="trait" cx="751" cy="200" r="15"/><path class="trait fin" d="M751 185 L756 200 L751 215 M736 200 L751 195 L766 200"/>
    <text class="t-moyen" x="751" y="272" text-anchor="middle">Extracteur</text><text class="t-petit" x="751" y="287" text-anchor="middle">groupe</text><text class="t-petit" x="751" y="300" text-anchor="middle">déprimogène</text>
    <path class="trait" d="M751 146 V48"/><path class="trait" d="M743 58 L751 46 L759 58"/>
    <text class="t-petit" x="740" y="40" text-anchor="end">rejet</text>
    <path class="air" d="M28 200 H720"/>
    <path class="fleche" d="M110 192 L120 200 L110 208 M700 192 L710 200 L700 208"/>
  </g>
  <g class="couche" data-c="dnf"><rect class="cadre-dnf" x="122" y="100" width="498" height="216" rx="10"/><text class="t-dnf" x="500" y="354" text-anchor="middle">dernier niveau de filtration avant le rejet</text></g>
  <g class="couche" data-c="prefiltre">
    <rect class="prefiltre" x="186" y="112" width="26" height="176" fill="url(#caiPoints)"/>
    <circle class="grosse" cx="172" cy="150" r="4.5"/><circle class="grosse" cx="168" cy="214" r="5"/><circle class="grosse" cx="176" cy="256" r="4"/>
    <text class="t-petit" x="199" y="302" text-anchor="middle">préfiltre</text>
  </g>
  <g class="couche" data-c="the">
    <rect class="the-cadre" x="294" y="112" width="42" height="176"/><path class="the-plis" d="${plis(300)}"/>
    <circle class="fine" cx="280" cy="140" r="2"/><circle class="fine" cx="284" cy="178" r="2"/><circle class="fine" cx="279" cy="230" r="2"/><circle class="fine" cx="285" cy="262" r="2"/>
    <text class="t-the" x="342" y="284">THE</text>
  </g>
  <g class="couche" data-c="joint"><rect class="joint" x="290" y="106" width="50" height="7" rx="2"/><rect class="joint" x="290" y="287" width="50" height="7" rx="2"/>
    <text class="t-petit t-equip" x="344" y="117">joint</text></g>
  <g class="couche" data-c="coef"><text class="t-moyen" x="253" y="246" text-anchor="middle">C amont</text><text class="t-moyen" x="384" y="168" text-anchor="middle">C aval</text></g>
  <g class="couche" data-c="the2">
    <rect class="the-cadre" x="424" y="112" width="42" height="176"/><path class="the-plis" d="${plis(430)}"/>
    <text class="t-the" x="472" y="284">2ᵉ THE</text>
  </g>
  <g class="couche" data-c="mano">
    <path class="trait fin" d="M262 92 V58 H298 M368 92 V58 H332"/>
    <circle class="fond trait" cx="315" cy="52" r="17"/><path class="aiguille" d="M315 52 L325 42"/>
    <text class="t-petit" x="345" y="40">manomètre :</text><text class="t-petit" x="345" y="53">perte de charge</text>
  </g>
  <g class="couche" data-c="sac">
    <rect class="fond trait" x="292" y="306" width="46" height="12" rx="2"/>
    <path class="sac" d="M294 318 C 280 360, 290 388, 315 390 C 340 388, 350 360, 336 318"/>
    <text class="t-petit" x="352" y="390">sac vinyle de changement</text>
  </g>
  ${window.ITSasDessin.marqueurs(marq)}
</svg>`;
}
const ETAPES=[
  {court:"Le dernier niveau de filtration",titre:"Le dernier niveau de filtration",voir:["base","dnf"],m:[150,120],
   texte:"L’air aspiré dans le sas de travail traverse un caisson de filtration avant d’atteindre l’extracteur et le rejet. Sur les chantiers, ce caisson est souvent appelé « caisson BSS » ou « BSS ». C’est le dernier niveau de filtration : le dernier dispositif qui arrête les aérosols avant tout rejet dans l’environnement.",
   observe:"deux fonctions distinctes : le BSS filtre l’air, l’extracteur (groupe déprimogène) l’aspire."},
  {court:"Le préfiltre protège le THE",titre:"Le préfiltre protège le THE",voir:["prefiltre"],m:[199,330],
   texte:"Placé en amont, le préfiltre piège les plus grosses particules. Il évite que le filtre THE se colmate trop vite.",
   observe:"les grosses particules s’arrêtent sur le préfiltre."},
  {court:"Le filtre THE et son joint",titre:"Le filtre THE et son joint",voir:["the","joint","coef"],m:[392,250],
   texte:"Le filtre THE est un médium plissé monté dans un cadre rigide. Son joint s’écrase sur le plan de joint du caisson : l’air ne peut pas contourner le filtre. Son efficacité se mesure par le coefficient d’épuration, rapport des concentrations en aérosols avant et après le filtre : plus de 5 000 pour un filtre THE neuf.",
   observe:"un joint mal écrasé, et l’air passe à côté du filtre.",
   texteOption:"Risque de contamination alpha : le caisson reçoit deux filtres THE en série. L’air traverse le premier, puis le second : si le premier laisse passer des particules, le second les arrête.",
   observeOption:"deux filtres THE l’un derrière l’autre dans le même caisson."},
  {court:"Le manomètre surveille le colmatage",titre:"Le manomètre surveille le colmatage",voir:["mano"],m:[262,40],
   texte:"Deux prises de pression, avant et après le filtre, mesurent sa perte de charge. Plus le filtre se charge en particules, plus elle augmente et plus le débit d’extraction baisse. Au-delà d’une certaine perte de charge, le médium filtrant peut se déchirer.",
   observe:"un filtre colmaté affaiblit tout le confinement : on le change à temps."},
  {court:"Changer le filtre sans rompre le confinement",titre:"Changer le filtre sans rompre le confinement",voir:["sac"],m:[262,372],
   texte:"Le caisson est « à sas étanche » : on change le filtre à travers un sac vinyle fixé sur le caisson. Le filtre usagé passe dans le sac sans que l’intérieur du réseau ne communique avec le local. Le filtre contaminé devient un déchet.",
   observe:"le filtre usagé ne sort jamais à l’air libre."}
];
function ouvrir(main){
  return window.ITSasDessin.guide(main,{
    id:"caisson",courant:"caisson",tag:"02 · Lecture guidée",
    titre:"Le caisson de filtration",
    lead:"Ce qui se passe entre le sas de travail et le rejet : préfiltre, filtre THE, surveillance du colmatage et changement du filtre sans rompre le confinement.",
    vue:"Vue de côté · schéma de principe",svg,
    legende:'<span><i></i>sens de l’air</span><span>Schéma de principe, non dimensionné</span>',
    etapes:ETAPES,option:{label:"Risque de contamination alpha",couches:["the2"],apres:2},
    suite:{href:"#/sas/defi-erreurs",txt:"Passer au défi"}
  });
}
window.ITSasCaisson={ouvrir,ETAPES};
})();
