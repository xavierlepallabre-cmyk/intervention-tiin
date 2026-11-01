/* Intervention TIIN — navigation, thème, état réseau, mises à jour. */
(function(){
"use strict";
const VERSION="0.1.0";
const main=document.getElementById("main");
let quitter=()=>{};

function infos(){
  main.innerHTML=`
    <div class="page-head"><div>
      <p class="tag"><span class="bars" aria-hidden="true"><i></i><i></i><i></i></span>Informations</p>
      <h1>À propos d’Intervention TIIN</h1>
      <p class="lead">Techniques d’intervention en milieu nucléaire pour les apprentis du Bac Pro TIIN, Lycée Alexis de Tocqueville.</p>
    </div></div>
    <div class="infos">
      <section class="bloc"><h2>Ce que montre l’application</h2>
        <p>Des schémas de principe, non dimensionnés et sans valeur de procédure. Ils expliquent pourquoi on fait les gestes ; les consignes du site, de l’exploitant et du service de radioprotection priment toujours.</p>
        <p>Aucune valeur réglementaire n’est affichée sans source. Les sources sont listées dans le fichier SOURCES.md du dépôt.</p></section>
      <section class="bloc"><h2>Confidentialité</h2>
        <p>Aucun compte, aucune note, aucun historique. L’application n’enregistre que le choix du thème clair ou sombre sur l’appareil.</p></section>
      <section class="bloc"><h2>Version et mise à jour</h2>
        <p>Version ${VERSION}. L’application fonctionne hors connexion après la première ouverture.</p>
        <div class="actions"><button type="button" class="btn" id="checkUpdate">Rechercher une mise à jour</button></div>
        <p id="updateStatus" class="lead" aria-live="polite"></p></section>
      <section class="bloc"><h2>Auteur et droits</h2>
        <p>Conception originale : Xavier Le Pallabre</p><p>Ressource pédagogique développée à titre personnel, avec l’assistance d’outils d’intelligence artificielle.</p><p>© 2026 Xavier Le Pallabre — Attribution de l’auteur original à conserver lors des réutilisations et adaptations, conformément à la licence applicable. Licence <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr" rel="license noopener" target="_blank">CC BY-NC-SA 4.0</a>.</p><p>Police Lexend, licence SIL Open Font License (assets/fonts/OFL.txt). Logo du lycée Alexis de Tocqueville : propriété de l’établissement.</p></section>
    </div>`;
  document.getElementById("checkUpdate").addEventListener("click",()=>{
    const st=document.getElementById("updateStatus");
    if(!("serviceWorker" in navigator)){st.textContent="Mise à jour automatique indisponible dans ce navigateur.";return;}
    navigator.serviceWorker.getRegistration().then(reg=>{
      if(!reg){st.textContent="Mise à jour indisponible ici : ouvre l’application depuis son adresse en ligne.";return;}
      return reg.update().then(()=>{st.textContent=reg.waiting?"Une mise à jour est disponible.":"Vérification effectuée : aucune mise à jour en attente.";});
    }).catch(()=>{st.textContent="Vérification indisponible hors connexion.";});
  });
  return ()=>{};
}

const VUES={"sas/confinement":m=>window.ITSasConfinement.ouvrir(m),"sas/defi-erreurs":m=>window.ITSasDefi.ouvrir(m)};

function route(){
  quitter();
  const h=(location.hash||"#/accueil").replace(/^#\/?/,"").split("/");
  const onglet=h[0]||"accueil";
  document.querySelectorAll("[data-onglet]").forEach(a=>{
    if(a.dataset.onglet===onglet)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");
  });
  const rub=window.IT_RUBRIQUES.find(r=>r.id===onglet);
  let titre="";
  try{
    if(onglet==="infos"){quitter=infos();titre="Informations";}
    else if(rub&&h[1]&&VUES[onglet+"/"+h[1]]){quitter=VUES[onglet+"/"+h[1]](main);titre=(rub.vues.find(v=>v.id===h[1])||{}).titre||rub.titre;}
    else if(rub){quitter=window.ITAccueil.rubrique(main,onglet);titre=rub.titre;}
    else quitter=window.ITAccueil.accueil(main);
  }catch(err){
    console.error(err);
    main.innerHTML=`<p class="lead">Cette page n’a pas pu s’afficher. <a href="#/accueil">Retour à l’accueil</a></p>`;
    quitter=()=>{};
  }
  document.title=(titre?titre+" · ":"")+"Intervention TIIN";
  window.scrollTo(0,0);
}
window.addEventListener("hashchange",route);
route();

/* thème */
document.getElementById("themeToggle").addEventListener("click",()=>{
  const r=document.documentElement;
  const sombre=r.dataset.theme?r.dataset.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches;
  r.dataset.theme=sombre?"light":"dark";
  try{localStorage.setItem("intervention-theme",r.dataset.theme);}catch(e){}
});

/* état du réseau */
const net=document.getElementById("netStatus");
const majNet=()=>{net.hidden=navigator.onLine;};
addEventListener("online",majNet);addEventListener("offline",majNet);majNet();

/* service worker et proposition de mise à jour */
if("serviceWorker" in navigator&&location.protocol!=="file:"){
  const bar=document.createElement("aside");bar.className="update-bar";bar.hidden=true;bar.setAttribute("aria-live","polite");
  bar.innerHTML='<span>Une mise à jour d’Intervention TIIN est prête.</span><button type="button" class="btn btn-primary">Mettre à jour</button><button type="button" class="btn btn-ghost">Plus tard</button>';
  document.body.append(bar);
  let attente=null,accepte=false;
  bar.querySelectorAll("button")[0].onclick=()=>{if(!attente)return;accepte=true;attente.postMessage({type:"ACTIVATE_UPDATE"});};
  bar.querySelectorAll("button")[1].onclick=()=>bar.hidden=true;
  navigator.serviceWorker.addEventListener("controllerchange",()=>{if(accepte)location.reload();});
  navigator.serviceWorker.register("sw.js").then(reg=>{
    const proposer=()=>{if(reg.waiting&&navigator.serviceWorker.controller){attente=reg.waiting;bar.hidden=false;}};
    proposer();
    reg.addEventListener("updatefound",()=>{const i=reg.installing;i&&i.addEventListener("statechange",()=>{if(i.state==="installed")proposer();});});
  }).catch(()=>{});
}
})();
