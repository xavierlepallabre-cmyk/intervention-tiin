/* Intervention TIIN — Appareils de mesure.
   Sources : EDF, mémento de la radioprotection en exploitation (2014) chap. 3 et 5 ; EDF, rapport de sûreté FA3
   chap. 12 (balises) ; Radioprotection Cirkus DOC-FO-21_1 (sondes, précautions d'emploi). Pas de noms de marques. */
(function(){
"use strict";
const K=()=>window.ITCommun;
const LIENS=[["appareils","Les appareils"],["geste","Le bon geste"],["sortie","Contrôles de sortie"],["pieges","Pièges"],["defi","Défi : quel appareil ?"]];
const RET={href:"#/mesure",txt:"Appareils de mesure"};

/* 1. Galerie */
const APPAREILS=[
  {titre:"Dosimètre passif",sous:"La dose reçue, lue après coup.",points:["Nominatif, porté sur la poitrine, nom visible ; rangé dans son rack quand il n’est pas porté.","Chez EDF : changé chaque mois et lu par un laboratoire agréé ; le résultat arrive plus tard.","Il existe des dosimètres gamma et des dosimètres neutrons."],
   retenir:"c’est la dosimétrie de référence, mais elle ne prévient pas pendant le travail."},
  {titre:"Dosimètre opérationnel",sous:"La dose en temps réel, avec alarmes.",points:["Attribué à son porteur à l’entrée de zone contrôlée, initialisé et contrôlé : on ne l’échange jamais ensuite.","Deux alarmes : sur le débit de dose et sur la dose cumulée.","Alarme débit : on se retire immédiatement de la zone d’exposition. Alarme dose : on sort immédiatement de zone contrôlée."],
   attention:"un dosimètre saturé n’affiche plus une valeur normale : prévenir la radioprotection."},
  {titre:"Radiamètre",sous:"Le débit d’équivalent de dose ambiant, en µSv/h ou mSv/h.",points:["Sert aux cartographies et à vérifier le débit au poste de travail.","Le plus souvent un compteur Geiger-Müller, pour les gamma.","Contrôle de bon fonctionnement au retrait du magasin ; attendre la stabilité de la mesure si le temps de réponse est long."],
   attention:"hors zone contrôlée, les débits sont faibles : il faut un appareil plus sensible."},
  {titre:"Radiamètre neutrons",sous:"Pour les neutrons, autour du combustible ou du réacteur en puissance.",points:["Une sphère de polyéthylène ralentit les neutrons pour qu’ils soient détectés.","On oriente la sphère vers la source et on tient l’appareil éloigné du corps, qui perturbe la mesure."]},
  {titre:"Contaminamètre et ses sondes",sous:"La contamination des surfaces, en coups par seconde.",points:["Sonde alpha (scintillateur ZnS) : fenêtre fragile, contrôler à moins de 5 cm sans toucher, ne jamais la couvrir d’un film, craint l’humidité.","Sonde bêta (scintillateur plastique) : pour les bêta d’énergie maximale supérieure à 200 keV.","Sonde X (cristal NaI mince) et sonde gamma (NaI épais) : la sonde gamma a un bruit de fond élevé, peu adaptée aux faibles activités.","Sonde Geiger-Müller « bêta mous » : bêta de faible énergie, mais sensible à tous les rayonnements."],
   attention:"une sonde alpha ressemble beaucoup à une sonde bêta : lire l’étiquette."},
  {titre:"Balises",sous:"La surveillance continue d’un local ou d’un chantier, avec alarme.",points:["Balise gamma : suit le débit de dose ; mesurer le bruit de fond avant de choisir son emplacement et son seuil.","Balise aérosols : l’air passe sur un filtre qui avance devant la sonde ; elle distingue les aérosols alpha et bêta et ignore le bruit de fond gamma.","Balise iode : même principe avec une cartouche qui piège l’iode.","Il existe aussi des balises gaz rares et neutrons."]},
  {titre:"Contrôleurs de sortie",sous:"Les barrières successives contre la dissémination par les personnes.",points:["Contrôleur mains-pieds (CMP), portiques C1 et C2, contrôleur de petits objets (CPO), portique C3 en sortie de site.","Chacun a ses seuils d’alarme : voir l’activité « Contrôles de sortie »."]}
];
function appareils(main){
  main.innerHTML=K().tete({retour:RET,tag:"04 · Fiche",titre:"Les appareils de mesure",
    lead:"Ce que mesure chaque appareil, dans quelle unité, et les précautions à connaître.",nav:K().nav("mesure",LIENS,"appareils")})+K().fiches(APPAREILS)+
  `<section class="bloc"><h2 class="petit">Deux familles de détecteurs</h2><p class="petit-txt">Les détecteurs à gaz (chambre d’ionisation, compteur proportionnel, Geiger-Müller) comptent les charges créées dans un gaz. Les scintillateurs transforment le rayonnement en lumière : NaI pour les gamma, plastique pour les bêta, ZnS pour les alpha. Les dosimètres électroniques utilisent des semi-conducteurs.</p></section>`;
  return ()=>{};
}

/* 2. Le bon geste (lecture guidée) */
function sondeSvg(m){
  const dots=[[200,262],[290,258],[350,262],[480,258],[540,262],[620,258]].map(([x,y],i)=>`<circle class="${i%2?"contam-nf":"contam-f"}" cx="${x}" cy="${y}" r="5"/>`).join("");
  return `<svg class="sch" role="img" aria-labelledby="sondeTitre" viewBox="0 0 760 330">
  <title id="sondeTitre">Contaminamètre et sonde au-dessus d’une surface contaminée, vue de côté</title>
  <rect class="surface" x="40" y="264" width="680" height="34"/>${dots}
  <text class="t-petit" x="40" y="320">surface à contrôler (sèche et plane)</text>
  <g class="couche" data-c="boitier"><rect class="boitier" x="40" y="40" width="150" height="96" rx="10"/><rect class="ecran-m" x="56" y="56" width="118" height="40" rx="4"/>
    <text class="t-ecran" id="ecranTxt" x="115" y="82" text-anchor="middle"></text><circle class="bouton-m" cx="80" cy="116" r="7"/><circle class="bouton-m" cx="150" cy="116" r="7"/>
    <path class="cable" d="M190 88 C 260 88, 300 120, 330 196"/></g>
  <g class="couche" data-c="bdf"><text class="t-moyen" x="115" y="160" text-anchor="middle">bruit de fond</text><text class="t-petit" x="115" y="176" text-anchor="middle">loin de toute source</text></g>
  <g class="couche" data-c="types"><g transform="translate(560 60)"><rect class="sonde-type" x="0" y="0" width="56" height="30" rx="5"/><text class="t-petit" x="28" y="20" text-anchor="middle">alpha</text></g>
    <g transform="translate(624 60)"><rect class="sonde-type" x="0" y="0" width="56" height="30" rx="5"/><text class="t-petit" x="28" y="20" text-anchor="middle">bêta</text></g>
    <g transform="translate(560 100)"><rect class="sonde-type" x="0" y="0" width="56" height="30" rx="5"/><text class="t-petit" x="28" y="20" text-anchor="middle">X</text></g>
    <g transform="translate(624 100)"><rect class="sonde-type" x="0" y="0" width="56" height="30" rx="5"/><text class="t-petit" x="28" y="20" text-anchor="middle">gamma</text></g></g>
  <g class="couche" data-c="sonde"><rect class="sonde-c" x="300" y="196" width="120" height="58" rx="8"/><rect class="fenetre" x="306" y="248" width="108" height="6"/>
    <path class="cote-m" d="M436 254 V264 M430 254 H442 M430 264 H442"/><text class="t-cote" x="448" y="248">moins de 5 mm</text></g>
  <g class="couche" data-c="vitesse"><path class="fleche-v" d="M310 180 H520"/><path class="fleche-v" d="M508 172 L520 180 L508 188"/><text class="t-cote" x="410" y="170" text-anchor="middle">très lentement</text></g>
  ${window.ITSasDessin.marqueurs(m)}
</svg>`;
}
const GESTE=[
  {court:"Mettre en route",titre:"Mettre l’appareil en route à l’avance",voir:["boitier"],ecran:"démarrage",m:[210,40],
   texte:"On allume l’appareil quelques minutes avant la mesure et on vérifie qu’il n’a pas reçu de coup : un appareil abîmé peut mesurer faux.",
   observe:"un appareil froid ou abîmé donne une mesure douteuse."},
  {court:"Bruit de fond",titre:"Mesurer le bruit de fond",voir:["bdf"],ecran:"2 c/s",m:[210,160],
   texte:"On mesure en l’absence de toute source : c’est le bruit de fond, ou mouvement propre. Une mesure ne veut rien dire si on ne sait pas d’où l’on part.",
   observe:"toute mesure se compare au bruit de fond."},
  {court:"Choisir la sonde",titre:"Choisir la sonde selon le rayonnement",voir:["types"],ecran:"2 c/s",m:[540,46],
   texte:"Chaque sonde voit certains rayonnements : alpha, bêta, X ou gamma. La sonde alpha a un bruit de fond si faible qu’on ne voit pas qu’elle fonctionne : on fait un test de bon fonctionnement régulier. On ne couvre jamais une sonde alpha d’un film : il arrêterait les alpha.",
   observe:"la mauvaise sonde ne voit rien, même sur une surface contaminée."},
  {court:"Approcher",titre:"Approcher sans toucher",voir:["sonde"],ecran:"38 c/s",m:[460,222],
   texte:"On approche la sonde à moins de 5 mm de la surface, sans la toucher : la fenêtre est fragile et on contaminerait la sonde. Les alpha ne parcourent que quelques centimètres dans l’air : trop loin, ils n’arrivent pas.",
   observe:"la distance compte encore plus pour les alpha que pour les bêta."},
  {court:"Balayer lentement",titre:"Balayer très lentement",voir:["vitesse"],ecran:"41 c/s",m:[540,180],
   texte:"On déplace la sonde très lentement. L’appareil a besoin de temps pour compter : un balayage rapide passe sur une contamination sans la voir.",
   observe:"la lenteur fait partie de la mesure."},
  {court:"Lire et interpréter",titre:"Lire et interpréter",voir:[],ecran:"39 c/s",m:[210,90],
   texte:"Un ictomètre affiche un taux de comptage en coups par seconde, qui fluctue : il faut apprécier une valeur moyenne. Une échelle de comptage compte pendant un temps programmé : plus le comptage est long, plus il est précis. La correspondance entre coups par seconde et Bq/cm² est donnée par le service de radioprotection.",
   observe:"une valeur sans son unité ne veut rien dire."}
];
function geste(main){
  const nettoyer=window.ITSasDessin.guide(main,{id:"geste",courant:"geste",statique:true,vue:"Vue de côté · schéma de principe",
    retour:RET,nav:K().nav("mesure",LIENS,"geste"),svg:sondeSvg,tag:"04 · Lecture guidée",titre:"Contrôler une surface",
    lead:"Six gestes pour une mesure de contamination qui veut dire quelque chose.",
    legende:"<span>Valeurs affichées inventées pour l’exercice</span>",etapes:GESTE,base:[],suite:{href:"#/mesure/sortie",txt:"Contrôles de sortie"}});
  const ecr=()=>{const n=+((main.querySelector("#num")||{}).textContent||"1").match(/\d+/)[0];const t=main.querySelector("#ecranTxt");if(t)t.textContent=GESTE[n-1].ecran;};
  const obs=new MutationObserver(ecr);const num=main.querySelector("#num");if(num)obs.observe(num,{childList:true,characterData:true,subtree:true});ecr();
  return ()=>{obs.disconnect();nettoyer();};
}

/* 3. Contrôles de sortie (lecture guidée sur un parcours) */
const POSTES=[["chantier","Chantier",60],["cmp","CMP",160],["c1","C1",260],["vc","Vestiaire chaud",360],["c2","C2 + CPO",470],["vf","Vestiaire froid",580],["c3","C3",680]];
function couloir(m){
  return `<svg class="sch" role="img" aria-labelledby="sortieTitre" viewBox="0 0 760 260">
  <title id="sortieTitre">Parcours de sortie : chantier, contrôleur mains-pieds, portique C1, vestiaire chaud, portique C2, vestiaire froid, portique C3</title>
  <rect class="zone-c" x="20" y="70" width="210" height="110" rx="6"/><text class="t-petit" x="30" y="62">zone contrôlée</text>
  <path class="parcours sortie" d="M40 150 H720"/><path class="parcours-fleche sortie" d="M710 142 L720 150 L710 158"/>
  ${POSTES.map(([id,nom,x])=>`<g class="poste-ctrl couche" data-c="${id}"><rect x="${x-34}" y="${id.startsWith("v")?96:104}" width="68" height="${id.startsWith("v")?72:56}" rx="${id.startsWith("v")?6:4}" class="${id.startsWith("v")?"vestiaire":"portique"}"/><text class="t-moyen" x="${x}" y="${id.startsWith("v")?130:138}" text-anchor="middle">${nom.split(" ")[0]}</text>${nom.includes(" ")?`<text class="t-petit" x="${x}" y="148" text-anchor="middle">${nom.split(" ").slice(1).join(" ")}</text>`:""}</g>`).join("")}
  <g class="couche" data-c="alarme"><circle class="alarme" cx="470" cy="80" r="14"/><path class="alarme-r" d="M450 60 A28 28 0 0 1 490 60"/><text class="t-petit" x="470" y="214" text-anchor="middle">douche puis 2ᵉ contrôle</text></g>
  ${window.ITSasDessin.marqueurs(m)}
</svg>`;
}
const SORTIE=[
  {court:"Au chantier",titre:"Au saut de zone du chantier",voir:["chantier"],m:[60,214],
   texte:"Au niveau du saut de zone, ou tout près, un moyen de contrôle de la contamination des personnes et du matériel est installé. C’est le premier contrôle, avant même de quitter le chantier.",
   observe:"plus la contamination est arrêtée tôt, moins elle voyage."},
  {court:"Contrôleur mains-pieds",titre:"Le contrôleur mains-pieds (CMP)",voir:["cmp"],m:[160,214],
   texte:"Il détecte la contamination bêta des mains et des pieds. Dans le mémento EDF, son premier seuil d’alarme est inférieur à 800 Bq (équivalent cobalt 60) pour les mains et à 3 000 Bq pour les pieds. Son détecteur est fragile, et un rayonnement gamma ambiant augmente son bruit de fond.",
   observe:"les mains et les pieds touchent tout : on les contrôle en premier."},
  {court:"Portique C1",titre:"Le portique C1, vers le vestiaire chaud",voir:["c1"],m:[260,214],
   texte:"Entre la zone contrôlée et le vestiaire chaud, il détecte la contamination des vêtements ou du corps par les gamma, sur tout le corps. Il ne contrôle pas les chaussures : on les contrôle avant. Ses détecteurs sont très sensibles au bruit de fond : on éloigne les bacs à linge contaminé. Premier seuil : moins de 15 000 Bq. En mode EVEREST, il n’est pas requis, mais un contrôle gamma reste recommandé.",
   observe:"un bac de linge sale à côté du portique fausse le contrôle."},
  {court:"Portique C2",titre:"Le portique C2, vers le vestiaire froid",voir:["vc","c2"],m:[470,214],
   texte:"C’est le contrôle corporel, en bêta et gamma. Premier seuil : moins de 200 Bq sur 100 cm² pour les mains, 400 Bq sur 100 cm² pour le corps, 800 Bq ponctuels. Les bêta portent peu : il faut se placer contre les détecteurs, une face puis l’autre, avec le corps et les mains secs. Les petits objets passent au CPO (moins de 800 Bq).",
   observe:"trop loin des détecteurs, le portique ne voit pas les bêta."},
  {court:"Si le C2 sonne",titre:"Si le portique C2 sonne",voir:["alarme"],m:[520,70],
   texte:"Prise en charge immédiate au vestiaire chaud. La règle : éviter qu’une contamination externe devienne interne, et décontaminer au plus tôt. Après la douche, un deuxième contrôle au C2. S’il est encore positif, le service de santé au travail prend le relais.",
   observe:"on ne se frotte pas le visage, on ne mange pas, on ne repart pas."},
  {court:"Portique C3",titre:"Le portique C3, sortie du site",voir:["vf","c3"],m:[680,214],
   texte:"En sortie de site, il vérifie par les gamma qu’aucune contamination ne quitte l’installation. Premier seuil : moins de 3 000 Bq.",
   observe:"chaque portique est une barrière de plus ; aucun ne remplace les précédents."}
];
function sortie(main){return window.ITSasDessin.guide(main,{id:"sor",courant:"sortie",statique:true,vue:"Parcours de sortie · schéma de principe",
  retour:RET,nav:K().nav("mesure",LIENS,"sortie"),svg:couloir,tag:"04 · Lecture guidée",titre:"Les contrôles en sortie de zone",
  lead:"Du chantier à la sortie du site, les barrières successives qui empêchent la contamination de partir avec les personnes.",
  legende:"<span>Seuils d’alarme : mémento EDF (2014), centrales EDF</span><span>Les consignes du site priment</span>",
  etapes:SORTIE,base:[],suite:{href:"#/mesure/pieges",txt:"Les pièges"}});}

/* 4. Pièges */
const PIEGES=[
  {titre:"Oublier le bruit de fond",points:["Sans bruit de fond, impossible de savoir si une valeur est anormale.","Une balise gamma se place après une mesure du bruit de fond ; son seuil se règle en conséquence."]},
  {titre:"Se tromper de sonde",points:["Une sonde alpha et une sonde bêta se ressemblent.","Une sonde gamma ne voit pas une contamination alpha."]},
  {titre:"Mesurer trop loin ou trop vite",points:["Au-delà de quelques millimètres, les alpha n’arrivent plus à la sonde.","Un balayage rapide passe sur la contamination sans la compter."]},
  {titre:"Mélanger les unités",points:["c/s (comptage), Bq ou Bq/cm² (activité), µSv/h (débit de dose), mSv (dose) : quatre grandeurs différentes.","Le passage des c/s aux Bq/cm² dépend de la sonde et du radionucléide : c’est le service de radioprotection qui le donne."]},
  {titre:"Se fier à la distance",points:["Une petite source peut être modérée à 1 m et extrêmement forte au contact.","Ne jamais ramasser un objet qui n’a pas été contrôlé."]},
  {titre:"Perturber l’appareil",points:["Humidité : la sonde alpha la craint, les surfaces doivent être sèches.","Le corps perturbe un radiamètre neutrons ; un bac de linge contaminé perturbe un portique.","Postes de soudure haute fréquence et téléphones peuvent perturber les dosimètres électroniques.","Piles faibles : on n’utilise pas l’appareil."]},
  {titre:"Lire un dosimètre saturé",points:["Un débit très élevé peut saturer un dosimètre opérationnel : il n’affiche plus une valeur normale.","On sort et on prévient la radioprotection."]}
];
function pieges(main){
  main.innerHTML=K().tete({retour:RET,tag:"04 · Fiche",titre:"Les pièges de la mesure",
    lead:"Les erreurs qui font croire qu’il n’y a rien… ou qu’il y a quelque chose.",nav:K().nav("mesure",LIENS,"pieges")})+K().fiches(PIEGES);
  return ()=>{};
}

/* 5. Défi */
const CAS=[
  {q:"Avant d’intervenir, tu veux connaître le débit de dose à ton poste de travail.",o:["Un contaminamètre avec sonde alpha","Un radiamètre","Un dosimètre passif"],b:1,
   e:"Le radiamètre mesure le débit d’équivalent de dose ambiant, en µSv/h : c’est l’appareil des cartographies et du contrôle au poste."},
  {q:"Tu veux savoir si le sol près d’une tuyauterie ouverte est contaminé, contamination fixée comprise.",o:["Un frottis seul","Une mesure directe avec un contaminamètre et la bonne sonde","Un radiamètre posé au sol"],b:1,
   e:"La mesure directe voit la contamination fixée et non fixée. Le frottis ne prélève que la contamination non fixée."},
  {q:"On cherche une contamination alpha sur une paillasse. Ta sonde est protégée par un film plastique pour rester propre.",o:["C’est parfait, la sonde reste propre","Il faut retirer le film : il arrête les alpha","Il faut mesurer à 20 cm pour ne pas la salir"],b:1,
   e:"Un film suffit à arrêter les alpha. On ne couvre jamais une sonde alpha et on mesure à quelques millimètres sans toucher."},
  {q:"Ton dosimètre opérationnel déclenche l’alarme de débit de dose.",o:["Je termine ma tâche puis je sors","Je me retire immédiatement de la zone d’exposition","J’éteins l’alarme et je préviens à la pause"],b:1,
   e:"Alarme débit : retrait immédiat de la zone d’exposition. Alarme dose cumulée : sortie immédiate de zone contrôlée."},
  {q:"On veut surveiller en continu la contamination de l’air dans un sas pendant tout le chantier.",o:["Une balise aérosols","Un dosimètre passif","Un contrôleur mains-pieds"],b:0,
   e:"La balise aérosols aspire l’air sur un filtre analysé en continu et déclenche une alarme au seuil réglé."},
  {q:"Au vestiaire chaud, le portique C2 sonne.",o:["Je repasse jusqu’à ce qu’il ne sonne plus","Je pars au vestiaire froid et je préviens demain","Je reste au vestiaire chaud et je suis la prise en charge : décontamination au plus tôt, puis second contrôle"],b:2,
   e:"La contamination ne doit ni devenir interne ni sortir. Prise en charge immédiate, douche, second contrôle ; le service de santé au travail prend le relais si besoin."},
  {q:"Tu trouves une petite pièce métallique au fond d’un aspirateur de chantier.",o:["Je la mets dans ma poche pour la montrer","Je ne la touche pas, je préviens la radioprotection","Je mesure à 1 m : si c’est faible, je la ramasse"],b:1,
   e:"Une pièce activée peut être modérée à 1 m et extrêmement irradiante au contact. On ne manipule jamais un objet non caractérisé."},
  {q:"Le radiamètre que tu sors du magasin affiche « défaut pile ».",o:["Je l’utilise quand même, il marche encore","Je l’échange au magasin en signalant le défaut","Je le secoue et je recommence"],b:1,
   e:"Contrôle de bon fonctionnement au retrait du magasin : en cas de défaut, on échange l’appareil et on recommence avec un autre."}
];
function defi(main){return K().quiz(main,{retour:RET,tag:"04 · Défi",titre:"Quel appareil, quel geste ?",lead:"Huit situations de terrain. Choisis, puis lis l’explication.",nav:K().nav("mesure",LIENS,"defi"),cas:CAS});}

window.ITMesure={appareils,geste,sortie,pieges,defi,GESTE,SORTIE,CAS};
})();
