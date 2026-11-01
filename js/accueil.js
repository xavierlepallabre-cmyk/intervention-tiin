/* Intervention TIIN — accueil et pages de rubrique. */
(function(){
"use strict";
const R=window.IT_RUBRIQUES,T=window.IT_TYPES;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const icone=(r,cls)=>`<svg class="${cls||""}" aria-hidden="true" viewBox="0 0 24 24">${r.icone}</svg>`;

function accueil(main){
  main.innerHTML=`
  <section class="hero">
    <div class="hero-txt">
      <p class="tag"><span class="bars" aria-hidden="true"><i></i><i></i><i></i></span>La pratique avant la théorie</p>
      <h1>Intervenir en zone contrôlée, geste par geste</h1>
      <p class="lead">S’habiller, confiner, cartographier, mesurer, décontaminer. Chaque notion commence par un schéma animé que l’on suit pas à pas, puis une mise en situation et des défis.</p>
      <div class="actions">
        <a class="btn btn-primary" href="#/sas/confinement">Commencer par le sas</a>
        <a class="btn" href="#/sas/defi-erreurs">Un défi</a>
      </div>
    </div>
    <div class="situation">
      <p class="tag">Mise en situation</p>
      <h2>Remplacer la garniture d’une vanne en zone contrôlée</h2>
      <p>Avant d’ouvrir le circuit : quelle tenue, quel confinement, quelles mesures, et que faire des déchets ? On prépare l’intervention en traversant les cinq rubriques.</p>
      <div class="chips">${["Tenues","Sas","Mesure","Cartographie","Décontamination"].map(c=>`<span class="chip">${c}</span>`).join("")}</div>
      <a class="suite" href="#/sas">Préparer l’intervention →</a>
    </div>
  </section>
  <h2 class="titre-section">Les cinq rubriques</h2>
  <div class="rubriques">${R.map(r=>`
    <a class="rub" href="#/${r.id}">
      <span class="vignette"><span class="num">${r.num}</span>${icone(r)}</span>
      <span class="corps"><h3>${esc(r.titre)}</h3><p>${esc(r.desc)}</p><span class="vues">${esc(r.resume)}</span><span class="ouvrir">Ouvrir →</span></span>
    </a>`).join("")}
  </div>`;
  return ()=>{};
}

function rubrique(main,id){
  const r=R.find(x=>x.id===id);
  if(!r)return accueil(main);
  const prets=r.vues.filter(v=>v.prete),prep=r.vues.filter(v=>!v.prete);
  const carte=v=>v.prete?`
    <a class="vue" href="#/${r.id}/${v.id}"><span class="type ${v.type}">${T[v.type]}</span><h3>${esc(v.titre)}</h3><p>${esc(v.desc)}</p><span class="ouvrir">Ouvrir →</span></a>`:`
    <div class="vue prep"><span class="type ${v.type}">${T[v.type]}</span><h3>${esc(v.titre)}</h3><p>${esc(v.desc)}</p><span class="ouvrir">En préparation</span></div>`;
  main.innerHTML=`
  <div class="page-head"><div>
    <a class="retour" href="#/accueil">← Accueil</a>
    <p class="tag"><span class="bars" aria-hidden="true"><i></i><i></i><i></i></span>${r.num} · ${esc(r.court)}</p>
    <h1>${esc(r.titre)}</h1>
    <p class="lead">${esc(r.desc)}</p>
  </div></div>
  ${prets.length?`<div class="vues-liste">${prets.map(carte).join("")}</div>`:`<p class="lead" style="margin-bottom:12px">Cette rubrique est en cours de rédaction : ses contenus seront publiés après vérification des sources.</p>`}
  ${prep.length?`<h2 class="titre-section" style="margin-top:22px">${prets.length?"Bientôt":"Au programme"}</h2><div class="vues-liste">${prep.map(carte).join("")}</div>`:""}`;
  return ()=>{};
}

window.ITAccueil={accueil,rubrique};
})();
