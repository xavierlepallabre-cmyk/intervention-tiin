/* Intervention TIIN — Sas : lecture guidée « Le sas complet ».
   Organisation validée par l'enseignant (voir SOURCES.md) : entrée → intermédiaire → travail (nappe),
   sortie par l'intermédiaire puis le sas de sortie ; sauts de zone ; équipements de surveillance. */
(function(){
"use strict";
const ETAPES=[
  {court:"Le sas d’entrée",titre:"Le sas d’entrée",voir:["entree"],m:[278,96],
   texte:"Depuis la zone propre, on entre dans le chantier par le sas d’entrée. Il sert uniquement à entrer.",
   observe:"l’entrée et la sortie sont deux sas différents."},
  {court:"Le sas intermédiaire",titre:"Le sas intermédiaire",voir:["inter"],m:[375,200],
   texte:"Il relie le sas d’entrée, le sas de travail et le sas de sortie : on le traverse à l’aller comme au retour. Quand on intervient en tenue étanche ventilée (TEV), c’est souvent là qu’on se déshabille.",
   observe:"le sas intermédiaire est un carrefour à trois portes."},
  {court:"Le sas de travail et sa nappe",titre:"Le sas de travail et sa nappe",voir:["travail","nappe"],m:[655,340],
   texte:"C’est là qu’on intervient. Le poste de travail est installé sur la nappe de travail. Sortir de la nappe, même sans quitter le sas de travail, c’est déjà changer de zone.",
   observe:"la nappe est une zone à l’intérieur du sas de travail."},
  {court:"Le sas de sortie",titre:"Le sas de sortie",voir:["sortie"],m:[278,340],
   texte:"Pour sortir, on revient par le sas intermédiaire, puis on passe dans le quatrième sas : le sas de sortie, qui débouche sur la zone propre.",
   observe:"on ne ressort jamais par le sas d’entrée."},
  {court:"Le parcours et les sauts de zone",titre:"Le parcours et les sauts de zone",voir:["parcours-entree","parcours-sortie","sauts"],m:[640,380],
   texte:"À l’aller (en bleu), on va de la zone propre jusqu’à la nappe. Au retour (en orange), chaque changement de zone est un saut de zone : sortir de la nappe, entrer dans le sas intermédiaire, entrer dans le sas de sortie, rejoindre la zone propre.",
   observe:"compte les sauts de zone sur le trajet orange."},
  {court:"La surveillance et les déchets",titre:"La surveillance et les déchets",voir:["contam","aerosol","irradiation","poubelles"],m:[565,128],
   texte:"Un sas complet comporte aussi : un contaminamètre en sortie, pour se contrôler avant la zone propre ; une balise aérosols, qui surveille la contamination de l’air à l’intérieur du sas ; une surveillance de l’irradiation ; des poubelles à différents endroits.",
   observe:"repère les trois poubelles le long du trajet de sortie."}
];
function ouvrir(main){
  return window.ITSasDessin.guide(main,{
    id:"complet",courant:"complet",tag:"02 · Lecture guidée",
    titre:"Le sas complet",
    lead:"Quatre sas, une nappe de travail, un parcours d’entrée et un parcours de sortie. Six étapes pour comprendre comment on circule dans un chantier confiné.",
    legende:'<span><i class="l-entree"></i>aller</span><span><i class="l-sortie"></i>retour et sauts de zone</span><span>Schéma de principe, non dimensionné</span>',
    etapes:ETAPES,suite:{href:"#/sas/confinement",txt:"Voir le confinement"}
  });
}
window.ITSasComplet={ouvrir,ETAPES};
})();
