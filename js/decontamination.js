/* Intervention TIIN — Décontamination.
   Sources : CEA, monographie Assainissement-démantèlement (2017) ; CEA, posters INFODEM (2006) et dossier de presse
   PVSI (2015) ; EDF, mémento (2014) chap. 3 et 4 ; Radioprotection Cirkus DOC-FO-7_2 (décontamination corporelle).
   Aucun geste médical : la contamination interne relève du médecin du travail. */
(function(){
"use strict";
const K=()=>window.ITCommun;
const LIENS=[["techniques","Les techniques"],["choix","Choisir sa technique"],["personne","La personne"],["defi","Défi"]];
const RET={href:"#/decontamination",txt:"Décontamination"};

const TECH=[
  {titre:"Le principe",sous:"Concentrer la radioactivité dans le plus petit volume de déchets possible.",points:["Décontaminer abaisse la dose sur le chantier et peut faire passer des déchets dans une catégorie moins contraignante.","On ne décontamine pas sans avoir caractérisé la contamination, défini le scénario d’intervention et prévu la gestion des déchets secondaires."],
   retenir:"une décontamination déplace la contamination : il faut savoir où elle va."},
  {titre:"Chimique : les gels aspirables",sous:"Pour la contamination fixée dans les oxydes, surtout sur les métaux.",points:["On applique au pinceau ou par pulvérisation un film de gel de 0,5 à 2 mm.","En séchant quelques heures, il se fracture en paillettes qui emprisonnent la contamination.","On récupère les paillettes par brossage ou aspiration."],
   retenir:"pas d’effluent liquide et peu de déchets solides."},
  {titre:"Chimique : les mousses",sous:"Pour les grands volumes de forme complexe (générateurs de vapeur, circuits).",points:["Une mousse stable plusieurs heures porte le réactif contre les parois.","Elle remplace des solutions chimiques qui produisent beaucoup d’effluents liquides."],
   retenir:"moins de liquide à traiter qu’un bain ou un rinçage."},
  {titre:"Mécanique",sous:"Enlever une fine couche de béton ou de métal.",points:["Raboteuse, sablage : on retire la surface qui porte la contamination.","Surtout en assainissement final, sur des surfaces de locaux ou de gros équipements en béton ou en métal."],
   attention:"enlever de la matière peut remettre la contamination en suspension : les protections sont fixées par l’analyse de risques."},
  {titre:"Thermique",sous:"Projeter des granulés de glace carbonique à très grande vitesse.",points:["Utilisé sur des surfaces de béton ou de métal."]},
  {titre:"Laser",sous:"Décaper la peinture d’un mur, d’un sol ou d’une pièce métallique.",points:["Le faisceau balaie la surface et l’enlève par micro-explosions.","Pas d’effluent liquide, moins de poussière : les aérosols sont aspirés dès leur émission.","Sélectif, automatisable, adapté aux grandes surfaces."]},
  {titre:"Sur le chantier, au quotidien",sous:"Limiter la contamination à la source.",points:["Maintenir humides les surfaces contaminées quand c’est possible, pour limiter la remise en suspension.","Décontaminer les outillages avant de les sortir, pour ne pas transférer la contamination vers un autre chantier.","Déchets d’un chantier à risque alpha : gérés à part, sans les mélanger aux autres."]}
];
function techniques(main){
  main.innerHTML=K().tete({retour:RET,tag:"05 · Fiche",titre:"Les techniques de décontamination",
    lead:"Chimique, mécanique, thermique, laser : ce que fait chaque famille, et les déchets qu’elle laisse.",nav:K().nav("decontamination",LIENS,"techniques")})+K().fiches(TECH)+
  `<p class="encadre observe"><strong>Le choix dépend · </strong>du niveau radiologique, de l’accessibilité, de la quantité de déchets générés, des possibilités de mise en œuvre et de la gestion possible des déchets liquides ou solides.</p>`;
  return ()=>{};
}

/* Aide au choix : on choisit une situation, l'application propose une famille et explique pourquoi. */
const SITU=[
  {id:"metal",nom:"Pièce métallique, contamination fixée dans les oxydes",tech:"Gel aspirable",pourquoi:"Le gel est fait pour la contamination fixée dans les couches d’oxydes métalliques. Il sèche en paillettes récupérées par brossage ou aspiration.",dechets:"Des paillettes solides, en petite quantité ; pas d’effluent liquide."},
  {id:"complexe",nom:"Grand volume de forme complexe (générateur de vapeur, circuit)",tech:"Mousse de décontamination",pourquoi:"La mousse remplit les volumes et mouille les parois, même entre des tubes, en portant le réactif là où il faut.",dechets:"Beaucoup moins d’effluents liquides qu’avec des solutions chimiques."},
  {id:"peint",nom:"Mur en béton peint, possiblement contaminé par des poussières",tech:"Décapage laser de la peinture",pourquoi:"La contamination est dans la peinture : on enlève la peinture, sans attaquer le béton. Le procédé est automatisable sur de grandes surfaces.",dechets:"Seulement la matière enlevée, aspirée dès son émission ; pas d’effluent liquide."},
  {id:"beton",nom:"Grande surface de béton ou de métal, assainissement final",tech:"Décontamination mécanique (raboteuse, sablage)",pourquoi:"On enlève une fine couche de matériau qui porte la contamination.",dechets:"La couche enlevée, sous forme de poussières et de gravats à collecter."},
  {id:"outil",nom:"Petit outillage à sortir du chantier",tech:"Décontaminer avant la sortie, puis contrôler",pourquoi:"Un outil contaminé transfère la contamination vers un autre chantier. Les outillages sont décontaminés et contrôlés avant de sortir.",dechets:"Les supports de nettoyage, à gérer comme des déchets du chantier."}
];
function choix(main){
  main.innerHTML=K().tete({retour:RET,tag:"05 · Mise en situation",titre:"Choisir sa technique",
    lead:"Choisis une situation : l’application propose la famille de technique adaptée, et les déchets qu’elle produira.",nav:K().nav("decontamination",LIENS,"choix")})+`
  <div class="ordre-zone"><div class="options" role="group" aria-label="Situations">${SITU.map(s=>`<button type="button" class="option-btn" data-s="${s.id}" aria-pressed="false">${s.nom}</button>`).join("")}</div>
  <section class="bloc" id="reco" aria-live="polite"><p class="lead">Choisis une situation à gauche.</p></section></div>
  <p class="encadre observe" style="margin-top:14px"><strong>Rappel · </strong>dans la réalité, le choix suit la caractérisation de la contamination et l’analyse de risques du chantier.</p>`;
  main.querySelectorAll(".option-btn").forEach(b=>b.onclick=()=>{const s=SITU.find(x=>x.id===b.dataset.s);
    main.querySelectorAll(".option-btn").forEach(x=>x.setAttribute("aria-pressed",x===b));
    main.querySelector("#reco").innerHTML=`<p class="tag">Technique proposée</p><h2>${s.tech}</h2><p>${s.pourquoi}</p><p class="encadre observe"><strong>Déchets · </strong>${s.dechets}</p>`;});
  return ()=>{};
}

const PERS=[
  {titre:"Contamination ou irradiation ?",points:["Une personne irradiée par une source extérieure ne devient pas radioactive.","Une personne contaminée porte de la matière radioactive : sur la peau (contamination externe) ou dans le corps (contamination interne)."]},
  {titre:"Les deux règles",points:["Éviter qu’une contamination externe devienne interne : ne pas toucher son visage, ne pas manger, ne pas boire.","Décontaminer au plus tôt, chaque fois que c’est possible."],
   retenir:"le temps joue contre la personne contaminée."},
  {titre:"La décontamination de la peau",points:["Avec de l’eau et du savon doux, des gants, du papier, un sac à déchets.","Sans jamais abîmer la peau : une peau lésée laisse entrer la contamination.","On suit la prise en charge prévue sur le site, sans improviser."],
   attention:"on ne frotte pas fort, on ne gratte pas."},
  {titre:"Garder la trace",points:["Il faut décontaminer vite, mais aussi pouvoir estimer la dose.","On mesure sur la peau avant la décontamination, ou on garde la lingette qui a recueilli la particule."]},
  {titre:"La contamination interne",points:["Elle se détecte par des examens : mesure du corps entier, analyses.","Sa prise en charge relève uniquement du médecin du travail."]}
];
function personne(main){
  main.innerHTML=K().tete({retour:RET,tag:"05 · Fiche",titre:"La personne contaminée : les principes",
    lead:"Ce que l’intervenant doit savoir. Aucun geste médical ici : ils relèvent du service de santé au travail.",nav:K().nav("decontamination",LIENS,"personne")})+K().fiches(PERS);
  return ()=>{};
}

const CAS=[
  {q:"Une grosse pièce métallique porte une contamination fixée dans sa couche d’oxyde. On veut éviter les effluents liquides.",o:["Un rinçage à grande eau","Un gel aspirable","Un frottis"],b:1,
   e:"Le gel aspirable traite la contamination fixée dans les oxydes et ne produit pas d’effluent liquide : il sèche en paillettes récupérées par aspiration."},
  {q:"Il faut décontaminer l’intérieur d’un générateur de vapeur, plein de tubes.",o:["Une mousse de décontamination","Une raboteuse","Un décapage laser"],b:0,
   e:"La mousse remplit les volumes complexes et mouille les parois en produisant beaucoup moins d’effluents qu’une solution chimique."},
  {q:"Un mur en béton peint a pu être contaminé par des poussières.",o:["On ponce à sec sans aspiration","On décape la peinture, par exemple au laser avec aspiration","On repeint par-dessus"],b:1,
   e:"La contamination est dans la peinture : on l’enlève. Le laser décape sans effluent liquide et aspire les aérosols dès leur émission."},
  {q:"Le sol d’un local est contaminé et il faut y travailler longtemps.",o:["Le garder sec pour qu’il ne colle pas","Le maintenir humide quand c’est possible","Souffler la poussière vers la sortie"],b:1,
   e:"Une surface humide limite la remise en suspension de la contamination dans l’air."},
  {q:"Pourquoi caractérise-t-on la contamination avant de décontaminer ?",o:["Pour choisir la technique et prévoir les déchets qu’elle produira","Ce n’est pas utile, on décontamine toujours de la même façon","Pour remplir un formulaire"],b:0,
   e:"On ne décontamine pas sans savoir ce qu’on traite, comment on interviendra et où iront les déchets secondaires."},
  {q:"Après le portique, une contamination est trouvée sur ta main.",o:["Je frotte fort à la brosse pour aller vite","Je suis la prise en charge : eau et savon doux, sans abîmer la peau, puis nouveau contrôle","J’attends la fin de la journée"],b:1,
   e:"Décontaminer au plus tôt, sans léser la peau, et contrôler à nouveau. Une peau abîmée laisse entrer la contamination."},
  {q:"Les déchets d’un chantier à risque alpha…",o:["Vont avec les autres déchets du chantier","Sont gérés à part, sans mélange avec les déchets non alpha","Partent en déchets conventionnels"],b:1,
   e:"Les déchets alpha sont gérés spécifiquement, sans les mélanger aux déchets non contaminés alpha."}
];
function defi(main){return K().quiz(main,{retour:RET,tag:"05 · Défi",titre:"Défi décontamination",lead:"Sept situations. Choisis, puis lis l’explication.",nav:K().nav("decontamination",LIENS,"defi"),cas:CAS});}

window.ITDecont={techniques,choix,personne,defi,TECH,SITU,CAS};
})();
