/* Intervention TIIN — Tenues : défis « Remets dans l'ordre » et « Quelle tenue ? ».
   Séquences et cas tirés du mémento EDF (2014), chap. 3 et 6, et de son quiz. Aucune note, aucun historique. */
(function(){
"use strict";
const SEQ=[
  {id:"tev-retrait",titre:"Retirer une TEV",etapes:[
    "Faire pulvériser un fixateur sur le haut de la TEV","Arracher la bande déchirable d’un poignet à l’autre","Sortir les bras de la TEV",
    "Enrouler l’avant et l’arrière jusqu’à la taille","Faire déconnecter le flexible et le sortir du passant","Le déshabilleur termine le retrait",
    "Changer de gants","Retirer la cagoule avec précaution"]},
  {id:"tev-mise",titre:"Mettre une TEV",etapes:[
    "Tester la TEV sous air et viser l’étiquette","Enfiler le bas par la fermeture dorsale","Raccorder le flexible via le passant et finir l’habillage",
    "Fermer les deux fermetures arrière","Attacher les lacets des surbottes aux chevilles","Ajuster le débit interne"]},
  {id:"heaume-mise",titre:"Mettre un heaume",etapes:[
    "Tester le heaume sous air","Inscrire et viser le résultat sur l’étiquette","Mettre le heaume sur la tête",
    "Raccorder le flexible en le passant sur la ceinture","Bien positionner le heaume","Ajuster la ceinture","Ajuster le débit interne"]},
  {id:"heaume-retrait",titre:"Retirer un heaume",etapes:[
    "Déconnecter le flexible","Sortir le flexible du passant","Retirer la ceinture",
    "Retirer le heaume en se penchant vers l’avant","Changer de gants","Retirer la cagoule avec précaution"]},
  {id:"gants",titre:"Retirer des gants étanches",etapes:[
    "Retourner un gant sur la paume, doigts encore engagés","Retirer complètement le deuxième gant et le jeter","Laisser tomber le premier gant dans le sac de déchets"]},
  {id:"surtenue",titre:"Retirer une surtenue",etapes:[
    "Ouvrir la fermeture éclair en tirant le haut vers l’avant","Rentrer les mains à l’intérieur et extraire les épaules sans toucher l’extérieur","Enlever la surtenue en l’enroulant sur elle-même, par l’intérieur"]}
];

const melange=a=>{const b=a.map((t,i)=>({t,i}));do{for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}}while(b.every((x,k)=>x.i===k));return b;};

function ordre(main){
  const D=window.ITTenuesDessin;let seq=SEQ[0],cartes=[],verifie=false;
  main.innerHTML=`
  <div class="page-head"><div>
    <a class="retour" href="#/tenues">← Tenues et protections</a>
    <p class="tag"><span class="bars" aria-hidden="true"><i></i><i></i><i></i></span>01 · Défi</p>
    <h1>Remets les gestes dans l’ordre</h1>
    <p class="lead">Choisis une séquence, range les gestes avec les flèches, puis vérifie.</p>
  </div>${D.nav("defi-ordre")}</div>
  <div class="choix-seq" role="group" aria-label="Séquence">${SEQ.map(s=>`<button type="button" class="chip-btn" data-s="${s.id}">${s.titre}</button>`).join("")}</div>
  <div class="ordre-zone">
    <ol class="cartes-ordre" id="cartes"></ol>
    <aside class="bloc">
      <p class="compteur" id="etat" aria-live="polite"></p>
      <div class="nav-etapes"><button type="button" class="btn" id="melanger">Mélanger</button><button type="button" class="btn btn-primary" id="verifier">Vérifier</button></div>
      <button type="button" class="btn btn-ghost" id="solution">Voir l’ordre</button>
    </aside>
  </div>`;
  const $=s=>main.querySelector(s);
  function rendu(){
    $("#cartes").innerHTML=cartes.map((c,k)=>`<li class="carte-ordre${verifie?(c.i===k?" bon":" faux"):""}">
      <span class="pos">${k+1}</span><span class="txt">${c.t}</span>
      <span class="fleches"><button type="button" class="btn-fleche" data-k="${k}" data-d="-1" aria-label="Monter : ${c.t}"${k===0?" disabled":""}>↑</button><button type="button" class="btn-fleche" data-k="${k}" data-d="1" aria-label="Descendre : ${c.t}"${k===cartes.length-1?" disabled":""}>↓</button></span></li>`).join("");
    main.querySelectorAll(".btn-fleche").forEach(b=>b.onclick=()=>{const k=+b.dataset.k,d=+b.dataset.d;[cartes[k],cartes[k+d]]=[cartes[k+d],cartes[k]];verifie=false;rendu();
      const n=main.querySelector(`.btn-fleche[data-k="${k+d}"][data-d="${d}"]`)||main.querySelector(`.btn-fleche[data-k="${k+d}"]`);if(n)n.focus();});
    main.querySelectorAll(".chip-btn").forEach(b=>b.setAttribute("aria-pressed",b.dataset.s===seq.id));
    if(!verifie){$("#etat").innerHTML=`<b>${cartes.length}</b> gestes à ranger`;return;}
    const bons=cartes.filter((c,k)=>c.i===k).length;
    $("#etat").innerHTML=bons===cartes.length?`<span class="encadre retenir" style="display:block"><strong>Bravo · </strong>la séquence est dans le bon ordre.</span>`:`<b>${bons}</b> / ${cartes.length} gestes à la bonne place`;
  }
  function charger(s){seq=s;cartes=melange(s.etapes);verifie=false;rendu();}
  main.querySelectorAll(".chip-btn").forEach(b=>b.onclick=()=>charger(SEQ.find(s=>s.id===b.dataset.s)));
  $("#melanger").onclick=()=>charger(seq);
  $("#verifier").onclick=()=>{verifie=true;rendu();};
  $("#solution").onclick=()=>{cartes=seq.etapes.map((t,i)=>({t,i}));verifie=true;rendu();};
  charger(seq);
  return ()=>{};
}

const CAS=[
  {q:"Tu interviens dans un local en zone propre (contamination non fixée inférieure à 0,4 Bq/cm²), site en mode EVEREST.",
   o:["Bleu de travail, casque, lunettes, chaussures de sécurité","Tenue EVEREST et surbottes par-dessus le bleu","Tenue étanche ventilée"],b:0,
   e:"En zone propre, la tenue de zone propre suffit. Ajouter des couches inutiles complique la sortie sans rien protéger."},
  {q:"Le local est contaminé : 5 Bq/cm² de contamination non fixée.",
   o:["Bleu de travail seul, en faisant attention","Par-dessus le bleu : tenue EVEREST, surchaussures ou surbottes, gants adaptés","Masque filtrant seul"],b:1,
   e:"Entre 0,4 et 40 Bq/cm², on ajoute la tenue EVEREST, des surchaussures ou surbottes et des gants adaptés par-dessus la tenue de zone propre."},
  {q:"Le local est très contaminé : 60 Bq/cm² de contamination non fixée.",
   o:["La même tenue qu’en zone contaminée","On ajoute la surtenue EVEREST et des surbottes","On remplace le bleu par une surtenue"],b:1,
   e:"Au-delà de 40 Bq/cm², on ajoute la surtenue EVEREST et des surbottes. On ajoute des couches, on ne retire pas la tenue de base."},
  {q:"Pendant une activité à risque de contamination, que fais-tu de tes gants coton ?",
   o:["Je garde les gants coton seuls","Je les remplace par des gants étanches","Je mets des gants étanches par-dessus les gants coton"],b:2,
   e:"Les gants étanches se portent par-dessus les gants coton. Au déshabillage, on retire la paire extérieure sans toucher la peau."},
  {q:"Tu dois scier une tuyauterie qui a contenu un liquide contaminé.",
   o:["Une surtenue non tissée blanche","Une combinaison en tissu","Une TEV, ou une tenue vinyle avec un heaume ventilé"],b:2,
   e:"Scier crée des projections et de la contamination dans l’air : il faut protéger le corps et la respiration. Une surtenue non tissée ne protège que des petites éclaboussures."},
  {q:"Le chantier présente seulement un risque d’irradiation (débit de dose élevé, pas de contamination). Quelle surtenue te protège ?",
   o:["Une tenue étanche ventilée","Aucune : contre l’irradiation, on joue sur le temps, la distance et les écrans","Une surtenue non tissée"],b:1,
   e:"Les tenues arrêtent la contamination, pas les rayonnements. Contre l’irradiation, on réduit le temps, on augmente la distance, on met des écrans."},
  {q:"Tu dois entrer dans une capacité où l’air risque de manquer d’oxygène.",
   o:["Un masque filtrant","Un heaume ventilé","Ni masque filtrant, ni heaume, ni TEV : c’est l’analyse de risques qui décide, un appareil respiratoire isolant peut être plus approprié"],b:2,
   e:"Les masques filtrants, heaumes et TEV sont interdits en atmosphère dangereuse pour la vie : il faut pouvoir retirer l’équipement à tout moment pour évacuer. Le mémento cite l’appareil respiratoire isolant (ARI) comme plus approprié dans certaines situations."},
  {q:"Chantier à risque alpha : tu dois meuler, et la contamination surfacique alpha mesurée est faible (moins de 8 Bq/cm²).",
   o:["Pas besoin de protection individuelle, la mesure est faible","On porte quand même une TEV ou un heaume, selon l’analyse de risques","Un simple demi-masque suffit toujours"],b:1,
   e:"Pour les travaux abrasifs comme le meulage, les protections individuelles doivent être portées même si la contamination alpha est inférieure à 8 Bq/cm²."},
  {q:"En TEV, l’indicateur de bas débit passe au rouge.",
   o:["Je retiens ma respiration et j’évacue en gardant la TEV fermée","Je continue tant que l’UFS ne sonne pas","Je m’éloigne de quelques mètres, je fais l’ouverture de secours et je rejoins la zone de déshabillage"],b:2,
   e:"Le risque d’asphyxie passe avant le risque de contamination. On déchire la bande au niveau des voies respiratoires, puis la bande déchirable, et on rejoint sans tarder la zone de déshabillage."},
  {q:"L’alarme de l’UFS se déclenche (sirène et flash).",
   o:["J’évacue sans délai mais sans précipitation, en gardant mon équipement","Je déconnecte tout de suite mon flexible","J’attends que le logisticien vienne voir"],b:0,
   e:"L’UFS est passée sur ses bouteilles de secours : l’équipement reste alimenté quelques minutes. Il faut avoir lu cette autonomie avant d’entrer."}
];

function choix(main){
  const D=window.ITTenuesDessin;let n=0,rep=null;
  main.innerHTML=`
  <div class="page-head"><div>
    <a class="retour" href="#/tenues">← Tenues et protections</a>
    <p class="tag"><span class="bars" aria-hidden="true"><i></i><i></i><i></i></span>01 · Défi</p>
    <h1>Quelle tenue pour ce chantier ?</h1>
    <p class="lead">Dix situations. Choisis, lis l’explication, passe à la suivante.</p>
  </div>${D.nav("defi-choix")}</div>
  <section class="bloc cas" aria-live="polite">
    <p class="etape-num" id="num"></p>
    <h2 id="question"></h2>
    <div class="options" id="options"></div>
    <div id="explication" class="retour-zone"></div>
    <div class="nav-etapes"><button type="button" class="btn" id="prec">Situation précédente</button><button type="button" class="btn btn-primary" id="suiv">Situation suivante</button></div>
  </section>`;
  const $=s=>main.querySelector(s);
  function rendu(){
    const c=CAS[n];
    $("#num").textContent=`Situation ${n+1} sur ${CAS.length}`;$("#question").textContent=c.q;
    $("#options").innerHTML=c.o.map((t,i)=>`<button type="button" class="option-btn${rep===null?"":i===c.b?" bon":i===rep?" faux":""}" data-i="${i}"${rep!==null?" disabled":""}>${t}</button>`).join("");
    $("#explication").innerHTML=rep===null?"":`<p class="encadre ${rep===c.b?"retenir":"non"}"><strong>${rep===c.b?"Oui · ":"Non · "}</strong>${c.e}</p>`;
    main.querySelectorAll(".option-btn").forEach(b=>b.onclick=()=>{rep=+b.dataset.i;rendu();});
    $("#prec").disabled=n===0;$("#suiv").disabled=n===CAS.length-1;
  }
  $("#prec").onclick=()=>{n--;rep=null;rendu();};
  $("#suiv").onclick=()=>{n++;rep=null;rendu();};
  rendu();
  return ()=>{};
}
window.ITTenuesDefis={ordre,choix,SEQ,CAS};
})();
