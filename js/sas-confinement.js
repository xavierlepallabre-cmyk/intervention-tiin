/* Intervention TIIN — Sas : lecture guidée du confinement dynamique, sur le sas complet.
   Principes : confinement statique (enceinte) + confinement dynamique (cascade de dépressions, air du
   moins contaminé vers le plus contaminé, filtration THE avant rejet, deux THE en série si risque alpha).
   Sources : SOURCES.md. Critères de contrôle : CEA, monographie Assainissement-démantèlement (2017), valeurs données à titre d'exemple ; les consignes du site priment. */
(function(){
"use strict";
const SALLES=["entree","inter","travail","nappe","sortie"];
const ETAPES=[
  {court:"Une enceinte étanche",titre:"Une enceinte étanche",voir:SALLES,m:[470,392],
   texte:"Les quatre sas sont fermés par du film vinyle tendu sur une structure, jointures scotchées : c’est le confinement statique. Il ne suffit pas, car à chaque passage une porte s’ouvre.",
   observe:"les portes relient les sas entre eux, jamais le sas de travail à la zone propre."},
  {court:"L’extraction aspire le sas de travail",titre:"L’extraction aspire le sas de travail",voir:["extraction"],m:[690,160],
   texte:"Une unité d’extraction est raccordée au sas de travail. Elle aspire en permanence : le chantier passe en dépression. C’est le confinement dynamique.",
   observe:"l’extraction est au fond du sas de travail, loin des portes."},
  {court:"La cascade de dépressions",titre:"La cascade de dépressions",voir:["air"],m:[100,170],
   texte:"La pression baisse de la zone propre vers le sas de travail : P₀ > P₁ > P₂ > P₃. Par une porte ouverte ou une fuite, l’air va toujours vers le plus contaminé, jamais l’inverse.",
   observe:"suis les flèches : aucune ne revient vers la zone propre."},
  {court:"La filtration THE",titre:"La filtration très haute efficacité",voir:["the","air-rejet"],m:[680,320],
   texte:"Avant d’être rejeté, l’air aspiré traverse un filtre à très haute efficacité (THE) : les aérosols contaminés y restent piégés. Sur les chantiers, ces filtres du confinement dynamique sont souvent appelés « BSS ».",
   observe:"le filtre est placé avant le rejet, jamais après.",
   texteOption:"Risque de contamination alpha : on monte deux filtres THE en série. Si le premier laisse passer des particules, le second les arrête.",
   observeOption:"deux filtres THE l’un derrière l’autre avant le rejet."},
  {court:"Surveiller et contrôler",titre:"Surveiller et contrôler",voir:["indic","aerosol"],m:[470,330],
   texte:"Avant d’entrer, on vérifie que le confinement dynamique fonctionne. Sur un sas souple en vinyle, le CEA contrôle plutôt une vitesse d’air à travers un orifice calibré, au moins 1 m/s, avec une alarme si elle baisse. Sur une enceinte rigide et étanche, on contrôle une dépression, de l’ordre de –20 à –40 Pa. Pendant le chantier, la balise aérosols surveille la contamination de l’air dans le sas. Les valeurs de ton chantier sont celles des consignes du site.",
   observe:"si l’alarme sonne ou si la dépression tombe : on arrête, on sort, on prévient."}
];
function ouvrir(main){
  return window.ITSasDessin.guide(main,{
    id:"conf",courant:"confinement",tag:"02 · Lecture guidée",
    titre:"Le confinement dynamique",
    lead:"Suis l’air : il entre par le côté propre, traverse les sas vers le sas de travail et ressort filtré. Cinq étapes pour comprendre pourquoi la contamination reste dans le chantier.",
    legende:'<span><i></i>sens de l’air</span><span>P₀ &gt; P₁ &gt; P₂ &gt; P₃ : la pression baisse vers le sas de travail</span><span>Schéma de principe, non dimensionné</span>',
    etapes:ETAPES,option:{label:"Risque de contamination alpha",couches:["the2","alpha"],apres:3},
    suite:{href:"#/sas/defi-erreurs",txt:"Passer au défi"}
  });
}
window.ITSasConfinement={ouvrir,ETAPES};
})();
