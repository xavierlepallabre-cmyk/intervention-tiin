/* Intervention TIIN — Sas : défi « Trouve les erreurs » sur le sas complet.
   Cinq défauts de principe (aucune valeur chiffrée) et des éléments corrects pour vérifier
   que l'élève raisonne. Aucune note, aucun historique : tout est oublié en quittant la page. */
(function(){
"use strict";
const ZONES=[
  {id:"inter",erreur:false,cible:[322,165,106,100],titre:"Sas intermédiaire",expl:"Correct : il relie l’entrée, le sas de travail et la sortie."},
  {id:"nappe",erreur:false,cible:[502,152,136,156],titre:"Nappe de travail",expl:"Correct : le poste de travail est sur la nappe."},
  {id:"aerosol",erreur:false,cible:[458,84,34,34],titre:"Balise aérosols",expl:"Correct : elle surveille la contamination de l’air dans le sas."},
  {id:"poubelle",erreur:false,cible:[266,318,32,32],titre:"Poubelle du sas de sortie",expl:"Correct : des poubelles sont prévues à différents endroits."},
  {id:"passage",erreur:true,cible:[300,54,150,38],
   titre:"Passage direct entre l’entrée et le sas de travail",
   expl:"Ce passage court-circuite le sas intermédiaire. On circule toujours entrée → intermédiaire → travail."},
  {id:"contam",erreur:true,cible:[176,352,70,52],
   titre:"Pas de contaminamètre en sortie",
   expl:"On ne rejoint pas la zone propre sans se contrôler : un contaminamètre doit être installé en sortie."},
  {id:"alpha",erreur:true,cible:[698,180,76,100],
   titre:"Un seul filtre THE malgré le risque alpha",
   expl:"Avec un risque de contamination alpha, on monte deux filtres THE en série avant le rejet."},
  {id:"film",erreur:true,cible:[582,38,68,26],
   titre:"Film déchiré",
   expl:"L’enceinte n’est plus étanche : le confinement statique n’est plus assuré et l’extraction aspire par la déchirure."},
  {id:"indic",erreur:true,cible:[330,282,128,102],
   titre:"Pas de dépression",
   expl:"L’indicateur montre la même pression dans le sas intermédiaire et le sas de travail : la cascade de dépressions n’existe plus. On n’entre pas, on prévient."}
];
const NB=ZONES.filter(z=>z.erreur).length;
const MASQUES=["the2","air","air-rejet","parcours-entree","parcours-sortie","sauts"];

function ouvrir(main){
  const trouves=new Set();
  const cibles=ZONES.map(z=>`<g class="defi-zone" data-id="${z.id}" role="button" tabindex="0" aria-label="${z.titre}"><rect class="cible" x="${z.cible[0]}" y="${z.cible[1]}" width="${z.cible[2]}" height="${z.cible[3]}" rx="10"/></g>`).join("");
  main.innerHTML=`
  <div class="page-head"><div>
    <a class="retour" href="#/sas">← Sas et confinement</a>
    <p class="tag"><span class="bars" aria-hidden="true"><i></i><i></i><i></i></span>02 · Défi</p>
    <h1>Trouve les erreurs du sas</h1>
    <p class="lead">Ce sas est prêt, paraît-il. ${NB} défauts s’y cachent : touche chaque élément qui te semble incorrect. Les éléments corrects te le diront aussi.</p>
  </div>${window.ITSasDessin.segment("defi-erreurs")}</div>
  <div class="guide">
    <figure class="feuille"><div class="feuille-tete"><span>Vue de dessus · sas à vérifier</span></div>
      ${window.ITSasDessin.dessin({id:"defi",role:"group",titre:"Sas à vérifier, vue de dessus. Touche les éléments que tu juges incorrects.",
        erreurs:{passage:true,sansContam:true,film:true,sansDepression:true},extra:cibles})}
      <figcaption><span>Le chantier est classé « risque alpha »</span><span>Schéma de principe, non dimensionné</span></figcaption></figure>
    <div class="panneau">
      <section class="bloc">
        <p class="compteur" aria-live="polite"><b id="nb">0</b> / ${NB} erreurs trouvées</p>
        <div class="retour-zone" id="retour" aria-live="polite"><p class="lead">Touche un élément du schéma.</p></div>
        <div class="nav-etapes"><button type="button" class="btn" id="raz">Recommencer</button><button type="button" class="btn btn-primary" id="solution">Voir la solution</button></div>
      </section>
      <section class="bloc"><h2 class="petit">Erreurs repérées</h2><ul class="trouvailles" id="liste"><li class="lead">Aucune pour l’instant.</li></ul></section>
    </div>
  </div>`;
  MASQUES.forEach(c=>main.querySelectorAll(`[data-c="${c}"]`).forEach(g=>g.classList.add("cache")));
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
    const expl=z.erreur?z.expl:z.expl.replace(/^Correct : (.)/,(m,c)=>c.toUpperCase());
    $("#retour").innerHTML=`<p class="encadre ${z.erreur?"non":"retenir"}"><strong>${z.erreur?"Erreur · ":"Correct · "}</strong>${z.titre}. ${expl}</p>`+
      (fini?`<p class="encadre retenir" style="margin-top:8px"><strong>Défi terminé · </strong>les ${NB} erreurs sont repérées. <a href="#/sas/complet">Revoir le sas complet</a></p>`:"");
    liste();
  }
  main.querySelectorAll(".defi-zone").forEach(g=>{
    g.addEventListener("click",()=>choisir(g.dataset.id));
    g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();choisir(g.dataset.id);}});
  });
  $("#raz").onclick=()=>{trouves.clear();main.querySelectorAll(".defi-zone").forEach(g=>g.classList.remove("trouve","correct"));$("#retour").innerHTML='<p class="lead">Touche un élément du schéma.</p>';liste();};
  $("#solution").onclick=()=>{ZONES.filter(z=>z.erreur).forEach(z=>{trouves.add(z.id);main.querySelector(`.defi-zone[data-id="${z.id}"]`).classList.add("trouve");});
    $("#retour").innerHTML=`<p class="encadre observe"><strong>Solution · </strong>les ${NB} erreurs sont entourées et expliquées ci-dessous.</p>`;liste();};
  return ()=>{};
}
window.ITSasDefi={ouvrir,ZONES};
})();
