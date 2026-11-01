/* Intervention TIIN — plan des rubriques et des vues.
   Une vue « prete:false » est annoncée « en préparation » et n'est pas ouverte. */
window.IT_RUBRIQUES=[
  {id:"tenues",num:"01",titre:"Tenues et protections",court:"Tenues",
   desc:"De la tenue de base à la tenue étanche ventilée : quand, pourquoi, et dans quel ordre s’habiller et se déshabiller.",
   resume:"Habillage animé · Catalogue · 2 défis",
   icone:'<circle cx="12" cy="4.8" r="2.4"/><path d="M8.5 21v-5.5L6 16.5V11a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5.5l-2.5-1V21M12 13v8"/>',
   vues:[
    {id:"habillage",type:"guide",titre:"Du vestiaire au chantier",desc:"Habillage animé couche par couche."},
    {id:"catalogue",type:"fiche",titre:"Catalogue des tenues",desc:"Base, surtenue, ventilée, étanche, gants, protection respiratoire : quand et pourquoi."},
    {id:"deshabillage",type:"guide",titre:"Sortir sans se contaminer",desc:"Déshabillage pas à pas."},
    {id:"defi-ordre",type:"defi",titre:"Remets l’habillage dans l’ordre",desc:"Des cartes à replacer."},
    {id:"defi-choix",type:"defi",titre:"Quelle tenue pour ce chantier ?",desc:"Un choix à justifier selon le risque."}]},
  {id:"sas",num:"02",titre:"Sas et confinement",court:"Sas",
   desc:"Monter un sas pas à pas, comprendre la cascade de dépressions et le rôle du filtre THE.",
   resume:"Montage guidé · Flux d’air · Défi erreurs",
   icone:'<rect x="2.5" y="5" width="19" height="14" rx="1.5"/><path d="M9 5v4.5M9 14.5V19M15 5v4.5M15 14.5V19M5 12h12m-2.5-2.5L17 12l-2.5 2.5"/>',
   vues:[
    {id:"confinement",type:"guide",titre:"Le confinement dynamique",desc:"Suivre l’air du côté propre jusqu’au rejet filtré, en six étapes.",prete:true},
    {id:"defi-erreurs",type:"defi",titre:"Trouve les erreurs du sas",desc:"Quatre défauts sont cachés dans ce montage. À toi de les toucher.",prete:true},
    {id:"montage",type:"guide",titre:"Monter un sas",desc:"Structure, film, transit, extraction : l’ordre des opérations."},
    {id:"controles",type:"situation",titre:"Contrôles avant utilisation",desc:"La vérification à faire avant d’entrer."},
    {id:"sortie",type:"guide",titre:"Sortie de sas",desc:"L’ordre des gestes en zone de transit."}]},
  {id:"carto",num:"03",titre:"Cartographie radiologique",court:"Carto",
   desc:"Relever, reporter sur plan, baliser, puis réduire l’exposition : temps, distance, écran.",
   resume:"Relevé guidé · Simulateur ALARA · Défi",
   icone:'<path d="M3 6.5l6-2.5 6 2.5 6-2.5v13.5L15 20l-6-2.5L3 20z"/><path d="M9 4v13.5M15 6.5V20"/>',
   vues:[
    {id:"releve",type:"guide",titre:"Faire un relevé",desc:"Débit de dose, contamination, frottis."},
    {id:"plan",type:"situation",titre:"Reporter sur plan",desc:"Placer les mesures sur le plan d’un local."},
    {id:"zonage",type:"fiche",titre:"Zonage et balisage",desc:"Codes couleur et signalisation."},
    {id:"alara",type:"situation",titre:"Temps, distance, écran",desc:"Simulateur d’optimisation."},
    {id:"defi",type:"defi",titre:"Complète la cartographie",desc:"Un plan à compléter et à baliser."}]},
  {id:"mesure",num:"04",titre:"Appareils de mesure",court:"Mesure",
   desc:"Dosimètres, débitmètres, contaminamètres, balises, portiques : ce que mesure chacun et le bon geste.",
   resume:"Galerie · Bon geste · Pièges · Défi",
   icone:'<path d="M4 16.5a8 8 0 1 1 16 0"/><path d="M12 16.5l4.2-5"/><circle cx="12" cy="16.5" r="1.4"/><path d="M4 20h16"/>',
   vues:[
    {id:"appareils",type:"fiche",titre:"Galerie des appareils",desc:"Dosimètres, débitmètres, contaminamètres, balises, portiques, contrôleurs mains-pieds."},
    {id:"geste",type:"guide",titre:"Le bon geste de mesure",desc:"Distance, vitesse de déplacement, temps de réponse."},
    {id:"pieges",type:"fiche",titre:"Pièges courants",desc:"Unités, bruit de fond, saturation…"},
    {id:"defi",type:"defi",titre:"Quel appareil pour cette mesure ?",desc:"Associer un besoin et un appareil."}]},
  {id:"decontamination",num:"05",titre:"Décontamination",court:"Décont.",
   desc:"Choisir une technique selon la surface et la contamination, gérer les déchets, principes pour la personne.",
   resume:"Techniques · Aide au choix · Défi",
   icone:'<path d="M12 3s-5.5 6.3-5.5 10a5.5 5.5 0 0 0 11 0C17.5 9.3 12 3 12 3z"/><path d="M9.5 13.5A2.5 2.5 0 0 0 12 16"/>',
   vues:[
    {id:"techniques",type:"fiche",titre:"Les techniques",desc:"Mécaniques, chimiques, aspiration, essuyage, pelables."},
    {id:"choix",type:"situation",titre:"Choisir sa technique",desc:"Selon la surface et la contamination."},
    {id:"dechets",type:"fiche",titre:"Les déchets produits",desc:"Ce que chaque technique génère."},
    {id:"personne",type:"fiche",titre:"La personne : principes",desc:"Sans geste médical."},
    {id:"defi",type:"defi",titre:"Défi décontamination",desc:"Des cas à résoudre."}]}
];
window.IT_TYPES={guide:"Lecture guidée",fiche:"Fiche",situation:"Mise en situation",defi:"Défi"};
