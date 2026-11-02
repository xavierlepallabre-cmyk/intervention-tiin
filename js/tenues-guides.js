/* Intervention TIIN — Tenues : trois lectures guidées.
   Source principale : EDF, Mémento de la radioprotection en exploitation (édition 2014), chap. 3 et 6.
   Les seuils affichés sont ceux du mémento (mode EVEREST) ; les consignes du site priment. */
(function(){
"use strict";
const D=()=>window.ITTenuesDessin;
const commun=(id,courant)=>({id,courant,statique:true,vue:"Vue de face · schéma de principe",
  retour:{href:"#/tenues",txt:"Tenues et protections"},nav:D().nav(courant),
  svg:m=>D().silhouette({id,marqueurs:m})});

/* 1. Choisir sa tenue selon la zone */
const ZONE=[
  {court:"Zone propre",titre:"Zone propre : bleu de travail",voir:["bleu","chaussures","casque","lunettes","dosi"],m:[150,140],focus:["bleu"],
   texte:"Dans une centrale en mode EVEREST, on entre en zone propre (contamination non fixée inférieure à 0,4 Bq/cm²) en bleu de travail, avec casque, lunettes et chaussures de sécurité. Les dosimètres sont portés sur la poitrine. Sur les sites qui ne sont pas en mode EVEREST, on porte une tenue de circulation : combinaison blanche, chaussettes, tee-shirt, calot, gants coton, chaussures blanches de sécurité, casque.",
   observe:"la tenue de base est la dernière ligne de défense : elle ne doit jamais être contaminée."},
  {court:"Zone contaminée",titre:"Zone contaminée : on ajoute par-dessus",voir:["everest","surbottes","gants"],m:[100,272],focus:["everest","surbottes","gants"],
   texte:"Entre 0,4 et 40 Bq/cm² de contamination non fixée, on enfile par-dessus la tenue de zone propre : la tenue EVEREST (combinaison ou blouse), des surchaussures ou des surbottes et des gants adaptés. Pour se protéger de la contamination, on porte des gants étanches par-dessus les gants coton.",
   observe:"on ajoute des couches, on ne remplace pas la tenue de base."},
  {court:"Zone très contaminée",titre:"Zone très contaminée : une couche de plus",voir:["surtenue","surbottes2"],m:[300,330],focus:["surtenue","surbottes2"],
   texte:"Au-delà de 40 Bq/cm², on ajoute encore la surtenue EVEREST et des surbottes. Chaque couche retirée au saut de zone emporte avec elle la contamination de la zone qu’on quitte.",
   observe:"plus la zone est contaminée, plus il y a de couches à retirer en sortie."},
  {court:"Contamination dans l’air",titre:"Contamination dans l’air : protéger la respiration",voir:["masque"],retirer:["lunettes"],m:[262,98],focus:["masque"],
   texte:"Si l’air peut être contaminé, il faut protéger les voies respiratoires. Les masques et demi-masques filtrants arrêtent les aérosols radioactifs et les iodes, selon le filtre utilisé. Ils sont interdits dans une atmosphère dangereuse pour la vie (manque d’oxygène, gaz, vapeur) : ils filtrent l’air, ils ne l’apportent pas.",
   observe:"un masque filtrant ne protège pas d’un manque d’oxygène."},
  {court:"Le heaume ventilé",titre:"Le heaume ventilé : de l’air sous pression",voir:["cagoule","heaume","ceinture","flexible","ufs"],retirer:["masque","casque","lunettes"],m:[290,60],focus:["heaume","flexible","ufs"],
   texte:"Le heaume ventilé est alimenté en air par un flexible relié au réseau d’air à travers une unité de filtration secourue (UFS). L’air entretient une surpression à l’intérieur : la contamination ne peut pas entrer. On porte une cagoule dessous et on le teste sous air avant usage. Une surveillance visuelle permanente est obligatoire.",
   observe:"le heaume ne protège que si l’air arrive : jamais sans alimentation."},
  {court:"La tenue étanche ventilée",titre:"La tenue étanche ventilée (TEV)",voir:["tev-bas","tev-tronc","tev-bras","bande"],retirer:["heaume","everest","surtenue","surbottes","surbottes2","gants"],m:[110,150],focus:["tev-tronc","tev-bras","tev-bas"],
   texte:"La TEV enveloppe tout le corps et protège aussi la respiration. Elle ventile et refroidit l’intervenant. On la met avec l’aide d’un assistant. Sur un chantier à risque de contamination alpha, on porte une TEV ou un heaume ventilé, selon l’analyse de risques ; pour les travaux abrasifs comme le meulage, même quand la contamination alpha mesurée est faible.",
   observe:"la bande orange, d’un poignet à l’autre par-dessus la tête, sert à l’ouvrir."}
];

/* 2. Mettre une TEV */
const MET=[
  {court:"Avant de s’équiper",titre:"Avant de s’équiper",voir:["dessous","cagoule","ufs"],m:[90,120],focus:["cagoule","ufs"],
   texte:"Il faut être formé au port de la TEV. On porte une cagoule pour protéger la tête et les cheveux au déshabillage. On se fait aider d’un assistant à l’habillage. On lit l’autonomie de secours affichée sur l’UFS : elle doit suffire pour replier le chantier et rejoindre la zone de déshabillage.",
   observe:"l’autonomie de l’UFS se vérifie avant d’entrer, pas pendant l’alarme."},
  {court:"Tester sous air",titre:"Tester la TEV sous air",voir:[],m:[330,250],
   texte:"On teste la TEV sous air avant de l’enfiler, puis on inscrit et on vise le résultat du test sur l’étiquette de la tenue.",
   observe:"une TEV non testée ne s’enfile pas."},
  {court:"Enfiler le bas",titre:"Enfiler le bas par la fermeture dorsale",voir:["tev-bas"],m:[150,400],focus:["tev-bas"],
   texte:"On enfile le bas de la TEV par la fermeture située dans le dos.",
   observe:"les fermetures sont à l’arrière : l’assistant les manipule."},
  {court:"Raccorder l’air",titre:"Raccorder l’air et finir l’habillage",voir:["flexible","tev-tronc","tev-bras","bande"],m:[300,300],focus:["flexible"],
   texte:"On raccorde le flexible d’air en le faisant passer dans le passant, puis on termine l’habillage : bras, buste, capuche.",
   observe:"l’air arrive dans la tenue avant qu’elle soit fermée."},
  {court:"Fermer le dos",titre:"Fermer les deux fermetures arrière",voir:[],m:[290,190],focus:["tev-tronc"],
   texte:"L’assistant ferme les deux fermetures à glissière situées à l’arrière de la TEV.",
   observe:"seul l’assistant voit le dos : il vérifie."},
  {court:"Lacer les surbottes",titre:"Attacher les surbottes",voir:["lacets"],m:[290,440],focus:["lacets"],
   texte:"On attache les lacets des surbottes autour des chevilles.",
   observe:"une surbotte qui flotte s’accroche et se déchire."},
  {court:"Régler le débit",titre:"Ajuster le débit interne",voir:["debit"],m:[268,226],focus:["debit"],
   texte:"On ajuste le débit d’air interne de la tenue. Pendant l’intervention, on surveille les alarmes de l’UFS et l’indicateur de bas débit de la tenue.",
   observe:"le bruit de l’air et le gonflage de la tenue sont des repères."}
];

/* 3. Retirer une TEV */
const RET=[
  {court:"Pulvériser le fixateur",titre:"Faire pulvériser un fixateur",voir:["fixateur"],m:[360,110],focus:["fixateur","tev-tronc"],
   texte:"Le déshabilleur pulvérise un fixateur sur la partie supérieure de la TEV. Il colle la contamination de surface pour qu’elle ne passe pas dans l’air au moment de l’ouverture. C’est obligatoire avant d’arracher la bande.",
   observe:"c’est le déshabilleur qui agit : l’intervenant ne touche pas l’extérieur."},
  {court:"Arracher la bande",titre:"Arracher la bande déchirable",voir:["bande-ouverte"],retirer:["bande"],m:[300,96],focus:["bande-ouverte"],
   texte:"On arrache la bande déchirable, d’un poignet à l’autre en passant par-dessus la tête. La tenue s’ouvre en deux.",
   observe:"la bande suit le trajet le plus court pour sortir de la tenue."},
  {court:"Sortir les bras",titre:"Sortir les bras",voir:[],retirer:["tev-bras"],m:[96,240],focus:["tev-tronc"],
   texte:"On sort les bras de la TEV, sans toucher l’extérieur de la tenue.",
   observe:"les gants étanches restent aux mains."},
  {court:"Enrouler jusqu’à la taille",titre:"Enrouler la tenue jusqu’à la taille",voir:["tev-enroule"],retirer:["tev-tronc","bande-ouverte","fixateur"],m:[290,270],focus:["tev-enroule"],
   texte:"On enroule sur elles-mêmes les parties avant et arrière de la TEV jusqu’à la taille. La face contaminée se retrouve à l’intérieur du rouleau.",
   observe:"on enroule pour emprisonner la contamination, on ne secoue jamais."},
  {court:"Déconnecter l’air",titre:"Faire déconnecter le flexible",voir:[],retirer:["flexible"],m:[310,330],
   texte:"Le déshabilleur déconnecte le flexible, puis on le sort du passant.",
   observe:"l’air est coupé seulement maintenant, tenue déjà ouverte."},
  {court:"Finir le retrait",titre:"Le déshabilleur termine le retrait",voir:[],retirer:["tev-bas","tev-enroule"],m:[130,420],
   texte:"Le déshabilleur termine le retrait de la TEV par le bas.",
   observe:"la tenue usagée part en déchet."},
  {court:"Changer de gants",titre:"Changer de gants",voir:["gants-neufs"],retirer:["gants"],m:[100,300],focus:["gants-neufs"],
   texte:"On change de gants : ceux qui ont servi au déshabillage peuvent être contaminés. Pour retirer des gants étanches, on retourne un gant sur la paume en laissant les doigts engagés, on retire complètement le second et on le jette, puis on laisse tomber le premier dans le sac de déchets.",
   observe:"des gants propres avant de toucher la cagoule."},
  {court:"Retirer la cagoule",titre:"Retirer la cagoule avec précaution",voir:["visage"],retirer:["cagoule"],m:[262,76],
   texte:"On retire la cagoule avec précaution. Ensuite, on contrôle l’absence de contamination de la personne et du matériel avant de franchir le saut de zone.",
   observe:"la cagoule a protégé la tête et les cheveux pendant tout le déshabillage."}
];

function habillage(main){return window.ITSasDessin.guide(main,Object.assign(commun("zone","habillage"),{
  tag:"01 · Lecture guidée",titre:"Quelle tenue, dans quelle zone ?",
  lead:"Six étapes de la zone propre à la tenue étanche ventilée : chaque niveau de risque ajoute une protection.",
  legende:"<span>Seuils : mémento EDF, mode EVEREST (contamination non fixée)</span><span>Les consignes du site priment</span>",
  etapes:ZONE,base:["visage"],suite:{href:"#/tenues/tev",txt:"Mettre une TEV"}}));}
function tev(main){return window.ITSasDessin.guide(main,Object.assign(commun("met","tev"),{
  tag:"01 · Lecture guidée",titre:"Mettre une tenue étanche ventilée",
  lead:"Les gestes d’habillage de la TEV, dans l’ordre, avec un assistant.",
  legende:"<span>D’après le mémento EDF (2014)</span><span>La consigne d’utilisation du site prime</span>",
  etapes:MET,base:["visage"],suite:{href:"#/tenues/deshabillage",txt:"Retirer la TEV"}}));}
function deshabillage(main){return window.ITSasDessin.guide(main,Object.assign(commun("ret","deshabillage"),{
  tag:"01 · Lecture guidée",titre:"Retirer une tenue étanche ventilée",
  lead:"Huit gestes pour sortir de la TEV sans se contaminer ni contaminer l’air.",
  legende:"<span>D’après le mémento EDF (2014)</span><span>La consigne d’utilisation du site prime</span>",
  etapes:RET,base:["dessous","cagoule","gants","flexible","ufs","tev-bas","tev-tronc","tev-bras","bande"],suite:{href:"#/tenues/defi-ordre",txt:"Passer au défi"}}));}

window.ITTenuesGuides={habillage,tev,deshabillage,ZONE,MET,RET};
})();
