/* Intervention TIIN — Sas : défi « Trouve les erreurs ».
   Quatre défauts de principe (aucune valeur chiffrée) et des éléments corrects pour vérifier
   que l'élève raisonne. Aucune note, aucun historique : tout est oublié en quittant la page. */
(function(){
"use strict";
const ZONES=[
  {id:"passage",erreur:true,cible:[200,326,174,48],
   titre:"Passage direct vers le chantier",
   expl:"Une porte relie la zone propre au chantier sans passer par le sas de transit. On entre et on sort toujours par le transit."},
  {id:"film",erreur:true,cible:[540,44,80,38],
   titre:"Film déchiré",
   expl:"Le film de l’enceinte est ouvert. Le confinement statique n’est plus assuré et l’extracteur aspire par la déchirure au lieu de balayer le chantier."},
  {id:"filtre",erreur:true,cible:[674,168,80,110],
   titre:"Pas de filtre THE avant le rejet",
   expl:"L’air aspiré dans le chantier est rejeté sans filtration. Le filtre très haute efficacité doit se trouver avant le rejet."},
  {id:"indic",erreur:true,cible:[290,76,96,40],
   titre:"Pas de dépression",
   expl:"L’indicateur montre la même pression dans le transit et le chantier : la cascade n’existe pas. On n’entre pas, on prévient."},
  {id:"transit",erreur:false,cible:[220,130,130,180],titre:"Sas de transit",expl:"Correct : le transit sépare bien la zone propre du chantier."},
  {id:"extracteur",erreur:false,cible:[600,190,60,60],titre:"Raccordement de l’extraction",expl:"Correct : l’extraction est à l’opposé de l’entrée, l’air balaie le chantier."},
  {id:"structure",erreur:false,cible:[380,300,120,70],titre:"Structure",expl:"Correct : la structure est complète."}
];
const NB=ZONES.filter(z=>z.erreur).length;

function schema(){
  const zone=z=>`<g class="defi-zone" data-id="${z.id}" role="button" tabindex="0" aria-label="${z.titre.replace(/"/g,"")}"><rect class="cible" x="${z.cible[0]}" y="${z.cible[1]}" width="${z.cible[2]}" height="${z.cible[3]}" rx="10"/></g>`;
  return `<svg class="sch" role="group" aria-labelledby="defiTitre" viewBox="0 0 760 440">
  <title id="defiTitre">Sas à vérifier, vue de dessus. Touche les éléments que tu juges incorrects.</title>
  <rect class="zone-propre" x="20" y="60" width="180" height="320" rx="6"/>
  <text class="t-zone" x="110" y="48" text-anchor="middle">Zone propre</text>
  <rect class="zone-chantier" x="370" y="60" width="290" height="320" rx="4"/><rect class="structure" x="370" y="60" width="290" height="320" rx="4"/>
  <circle class="poteau" cx="370" cy="60" r="5"/><circle class="poteau" cx="660" cy="60" r="5"/><circle class="poteau" cx="370" cy="380" r="5"/><circle class="poteau" cx="660" cy="380" r="5"/>
  <text class="t-zone" x="515" y="48" text-anchor="middle">Chantier</text>
  <path class="trait" d="M495 205 L535 235 L535 205 L495 235 Z"/><path class="trait" d="M515 220 V190 M503 190 H527"/>
  <path class="film" d="M372 62 H548 M612 62 H658 V378 H372 V362 M372 336 V62"/>
  <path class="dechirure" d="M548 62 L556 70 L563 58 L572 72 L580 60 L590 71 L598 59 L606 69 L612 62"/>
  <rect class="zone-transit" x="220" y="130" width="130" height="180"/>
  <path class="film" d="M220 130 H350 V200 M350 240 V310 H220 V240 M220 200 V130"/>
  <path class="film" style="stroke-dasharray:none" d="M350 200 H370 M350 240 H370"/>
  <text class="t-zone" x="285" y="122" text-anchor="middle">Sas de transit</text>
  <rect class="zone-transit" x="200" y="336" width="172" height="26"/>
  <path class="film" d="M200 336 H372 M200 362 H372"/>
  <text class="t-petit" x="286" y="353" text-anchor="middle">porte</text>
  <path class="gaine" d="M660 220 H682"/>
  <rect class="fond trait" x="682" y="178" width="62" height="86" rx="6"/>
  <circle class="trait" cx="713" cy="221" r="13"/>
  <text class="t-moyen" x="713" y="282" text-anchor="middle">Extracteur</text>
  <path class="trait" d="M713 178 V96"/><path class="trait" d="M705 106 L713 94 L721 106"/>
  <text class="t-petit" x="713" y="84" text-anchor="middle">rejet</text>
  <circle class="fond trait" cx="360" cy="96" r="14"/><path class="aiguille" d="M360 96 V82"/>
  <text class="t-petit" x="338" y="86" text-anchor="end">P₂ = P₃</text>
  ${ZONES.map(zone).join("")}
</svg>`;
}

function ouvrir(main){
  const trouves=new Set();
  main.innerHTML=`
  <div class="page-head"><div>
    <a class="retour" href="#/sas">← Sas et confinement</a>
    <p class="tag"><span class="bars" aria-hidden="true"><i></i><i></i><i></i></span>02 · Défi</p>
    <h1>Trouve les erreurs du sas</h1>
    <p class="lead">Ce sas est prêt, paraît-il. ${NB} défauts s’y cachent : touche chaque élément qui te semble incorrect. Les éléments corrects te le diront aussi.</p>
  </div>
  <nav class="segment" aria-label="Activités du sas"><a href="#/sas/confinement">Lecture guidée</a><a href="#/sas/defi-erreurs" aria-current="page">Défi : trouve les erreurs</a></nav>
  </div>
  <div class="guide">
    <figure class="feuille"><div class="feuille-tete"><span>Vue de dessus · sas à vérifier</span></div>${schema()}
      <figcaption><span>Pointillés : film vinyle</span><span>Schéma non dimensionné</span></figcaption></figure>
    <div class="panneau">
      <section class="bloc">
        <p class="compteur" aria-live="polite"><b id="nb">0</b> / ${NB} erreurs trouvées</p>
        <div class="retour-zone" id="retour" aria-live="polite"><p class="lead">Touche un élément du schéma.</p></div>
        <div class="nav-etapes"><button type="button" class="btn" id="raz">Recommencer</button><button type="button" class="btn btn-primary" id="solution">Voir la solution</button></div>
      </section>
      <section class="bloc"><h2 class="petit">Erreurs repérées</h2><ul class="trouvailles" id="liste"><li class="lead">Aucune pour l’instant.</li></ul></section>
    </div>
  </div>`;
  const $=s=>main.querySelector(s);
  function liste(){
    const l=ZONES.filter(z=>z.erreur&&trouves.has(z.id));
    $("#liste").innerHTML=l.length?l.map(z=>`<li><strong>${z.titre}</strong> — ${z.expl}</li>`).join(""):'<li class="lead">Aucune pour l’instant.</li>';
    $("#nb").textContent=l.length;
  }
  function choisir(id){
    const z=ZONES.find(x=>x.id===id),g=main.querySelector(`.defi-zone[data-id="${id}"]`);
    if(z.erreur){trouves.add(id);g.classList.add("trouve");}else g.classList.add("correct");
    const fini=trouves.size===NB;
    $("#retour").innerHTML=`<p class="encadre ${z.erreur?"non":"retenir"}"><strong>${z.erreur?"Erreur · ":"Bien vu · "}</strong>${z.titre}. ${z.erreur?z.expl:z.expl.replace(/^Correct : (.)/,(m,c)=>c.toUpperCase())}</p>`+
      (fini?`<p class="encadre retenir" style="margin-top:8px"><strong>Défi terminé · </strong>les ${NB} erreurs sont repérées. <a href="#/sas/confinement">Revoir la lecture guidée</a></p>`:"");
    liste();
  }
  main.querySelectorAll(".defi-zone").forEach(g=>{
    g.addEventListener("click",()=>choisir(g.dataset.id));
    g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();choisir(g.dataset.id);}});
  });
  $("#raz").onclick=()=>{trouves.clear();main.querySelectorAll(".defi-zone").forEach(g=>g.classList.remove("trouve","correct"));$("#retour").innerHTML='<p class="lead">Touche un élément du schéma.</p>';liste();};
  $("#solution").onclick=()=>{ZONES.filter(z=>z.erreur).forEach(z=>{trouves.add(z.id);main.querySelector(`.defi-zone[data-id="${z.id}"]`).classList.add("trouve");});
    $("#retour").innerHTML='<p class="encadre observe"><strong>Solution · </strong>les quatre erreurs sont entourées et expliquées ci-dessous.</p>';liste();};
  return ()=>{};
}
window.ITSasDefi={ouvrir,ZONES};
})();
