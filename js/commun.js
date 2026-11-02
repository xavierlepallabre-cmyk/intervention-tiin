/* Intervention TIIN — briques communes : en-tête de page, onglets d'activités, quiz commenté, fiches. */
(function(){
"use strict";
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function nav(rub,liens,courant){
  return `<nav class="segment" aria-label="Activités">${liens.map(([id,t])=>`<a href="#/${rub}/${id}"${id===courant?' aria-current="page"':""}>${t}</a>`).join("")}</nav>`;
}
function tete(c){
  return `<div class="page-head"><div>
    <a class="retour" href="${c.retour.href}">← ${c.retour.txt}</a>
    <p class="tag"><span class="bars" aria-hidden="true"><i></i><i></i><i></i></span>${c.tag}</p>
    <h1>${c.titre}</h1>
    <p class="lead">${c.lead}</p>
  </div>${c.nav||""}</div>`;
}
/* Quiz : une situation à la fois, explication après la réponse, aucune note. */
function quiz(main,c){
  let n=0,rep=null;
  main.innerHTML=tete(c)+`
  <section class="bloc cas" aria-live="polite">
    <p class="etape-num" id="num"></p>
    <h2 id="question"></h2>
    <div class="options" id="options"></div>
    <div id="explication" class="retour-zone"></div>
    <div class="nav-etapes"><button type="button" class="btn" id="prec">Situation précédente</button><button type="button" class="btn btn-primary" id="suiv">Situation suivante</button></div>
  </section>`;
  const $=s=>main.querySelector(s),C=c.cas;
  function rendu(){
    const x=C[n];
    $("#num").textContent=`Situation ${n+1} sur ${C.length}`;$("#question").textContent=x.q;
    $("#options").innerHTML=x.o.map((t,i)=>`<button type="button" class="option-btn${rep===null?"":i===x.b?" bon":i===rep?" faux":""}" data-i="${i}"${rep!==null?" disabled":""}>${esc(t)}</button>`).join("");
    $("#explication").innerHTML=rep===null?"":`<p class="encadre ${rep===x.b?"retenir":"non"}"><strong>${rep===x.b?"Oui · ":"Non · "}</strong>${x.e}</p>`;
    main.querySelectorAll(".option-btn").forEach(b=>b.onclick=()=>{rep=+b.dataset.i;rendu();});
    $("#prec").disabled=n===0;$("#suiv").disabled=n===C.length-1;
  }
  $("#prec").onclick=()=>{n--;rep=null;rendu();};
  $("#suiv").onclick=()=>{n++;rep=null;rendu();};
  rendu();
  return ()=>{};
}
/* Fiches : cartes avec un titre, des lignes « protège / limite / à retenir ». */
function fiches(liste){
  return `<div class="catalogue">${liste.map(f=>`<article class="bloc fiche-simple">
    <h2>${f.titre}</h2>${f.sous?`<p class="lead">${f.sous}</p>`:""}
    ${(f.points||[]).length?`<ul class="points">${f.points.map(p=>`<li>${p}</li>`).join("")}</ul>`:""}
    ${f.retenir?`<p class="encadre retenir"><strong>À retenir · </strong>${f.retenir}</p>`:""}
    ${f.attention?`<p class="encadre observe"><strong>Attention · </strong>${f.attention}</p>`:""}
  </article>`).join("")}</div>`;
}
window.ITCommun={esc,nav,tete,quiz,fiches};
})();
