/* Intervention TIIN — Tenues : catalogue des équipements.
   Sources : EDF mémento (2014) chap. 6 ; INRS ED 6546 (2024) pour les normes EN 1073. */
(function(){
"use strict";
const FICHES=[
  {titre:"Tenue de base",couches:["visage","bleu","chaussures","casque","lunettes","dosi"],
   pour:"Circuler et travailler en zone contrôlée quand le risque de contamination est exclu. En mode EVEREST : bleu de travail, casque, lunettes, chaussures de sécurité.",
   contre:"Elle ne protège pas de la contamination : c’est la dernière ligne de défense, à ne jamais contaminer."},
  {titre:"Tenue EVEREST, surchaussures, gants",couches:["visage","bleu","everest","surbottes","gants","casque","lunettes"],
   pour:"Zone contaminée : par-dessus la tenue de zone propre. Gants étanches fins (type chirurgien) et / ou épais (type ménagère) par-dessus les gants coton.",
   contre:"Les gants coton seuls ne protègent pas de la contamination."},
  {titre:"Surtenue non tissée",couches:["visage","bleu","surtenue","surbottes2","gants","casque","lunettes"],
   pour:"Contamination particulaire non fixée et petites éclaboussures. Usage unique, portée sur une tenue, jamais à même la peau.",
   contre:"Pas de protection suffisante contre les produits chimiques dangereux, la flamme, la chaleur ou les projections de métal en fusion."},
  {titre:"Masque ou demi-masque filtrant",couches:["visage","bleu","masque","gants"],
   pour:"Aérosols radioactifs, iodes et certains produits chimiques, selon le filtre. L’air ambiant est filtré à l’entrée.",
   contre:"Interdit en atmosphère dangereuse pour la vie (manque d’oxygène, azote, dioxyde de carbone, gaz, vapeur, atmosphère explosive)."},
  {titre:"Heaume ventilé (HV)",couches:["bleu","cagoule","heaume","ceinture","flexible","ufs","gants"],
   pour:"Une des protections respiratoires les plus efficaces contre les aérosols et les projections limitées : l’air apporté maintient une surpression. Usage unique, relié au réseau d’air par une UFS.",
   contre:"Interdit sans alimentation en air, interdit contre les produits chimiques dangereux et en atmosphère non respirable. Surveillance visuelle permanente."},
  {titre:"Tenue étanche ventilée (TEV)",couches:["dessous","tev-bas","tev-tronc","tev-bras","bande","flexible","ufs"],
   pour:"Protège le corps et la respiration, et refroidit l’intervenant. Usage unique. Habillage et déshabillage avec un assistant.",
   contre:"Son autonomie sans air ne suffit pas pour évacuer : déconnexion de 30 secondes au plus (passage d’échelle, par exemple). Mêmes interdits que le heaume."}
];

function ouvrir(main){
  const D=window.ITTenuesDessin;
  main.innerHTML=`
  <div class="page-head"><div>
    <a class="retour" href="#/tenues">← Tenues et protections</a>
    <p class="tag"><span class="bars" aria-hidden="true"><i></i><i></i><i></i></span>01 · Fiche</p>
    <h1>Le catalogue des tenues</h1>
    <p class="lead">Pour chaque équipement : contre quoi il protège, et ce qu’il ne fait pas. Le choix final vient toujours de l’analyse de risques du chantier.</p>
  </div>${D.nav("catalogue")}</div>
  <div class="catalogue">${FICHES.map((f,i)=>`
    <article class="bloc fiche-tenue">
      <figure class="mini" aria-hidden="true">${D.silhouette({id:"cat"+i})}</figure>
      <div class="fiche-txt">
        <h2>${f.titre}</h2>
        <p class="encadre retenir"><strong>Protège · </strong>${f.pour}</p>
        <p class="encadre non"><strong>Limites · </strong>${f.contre}</p>
      </div>
    </article>`).join("")}
  </div>
  <div class="infos-tenues">
    <section class="bloc"><h2>Aucune tenue ne protège de l’irradiation</h2>
      <p>Les tenues arrêtent la contamination : des particules qu’on pourrait toucher, respirer ou avaler. Contre l’irradiation, on agit sur le temps, la distance et les écrans.</p></section>
    <section class="bloc"><h2>Ouverture de secours d’une TEV ou d’un heaume</h2>
      <p>Si l’air manque (bruit qui baisse, tenue qui dégonfle, indicateur de bas débit au rouge) ou sur ordre du surveillant : s’éloigner de quelques mètres du poste, déchirer la bande au niveau des voies respiratoires pour faire entrer l’air, puis, en TEV, arracher la bande déchirable du poignet gauche jusqu’à la base du cou. Rejoindre sans tarder, mais sans précipitation, la zone de déshabillage, retirer la tenue normalement et appeler la radioprotection pour un contrôle.</p>
      <p class="encadre observe"><strong>À retenir · </strong>le risque d’asphyxie passe avant le risque de contamination.</p></section>
    <section class="bloc"><h2>Alarme de l’UFS</h2>
      <p>L’UFS bascule sur ses bouteilles d’air de secours : sirène et flash. On quitte la zone à risque sans délai mais sans précipitation, en gardant l’équipement, qui reste alimenté pendant quelques minutes.</p></section>
    <section class="bloc"><h2>Normes</h2>
      <p>Les vêtements de protection contre la contamination radioactive relèvent des normes EN 1073-1 (vêtements ventilés par adduction d’air) et EN 1073-2 (vêtements non ventilés contre les particules).</p></section>
  </div>`;
  FICHES.forEach((f,i)=>{const fig=main.querySelectorAll(".fiche-tenue")[i];
    fig.querySelectorAll("[data-c]").forEach(g=>g.classList.toggle("cache",!f.couches.includes(g.dataset.c)));});
  return ()=>{};
}
window.ITTenuesCatalogue={ouvrir,FICHES};
})();
