/* Intervention TIIN — plan des rubriques et des vues.
   Une vue « prete:false » est annoncée « en préparation » et n'est pas ouverte. */
window.IT_RUBRIQUES=[
  {id:"tenues",num:"01",titre:"Tenues et protections",court:"Tenues",
   desc:"De la tenue de base à la tenue étanche ventilée : quand, pourquoi, et dans quel ordre s’habiller et se déshabiller.",
   resume:"Selon la zone · TEV · Catalogue · 2 défis",
   icone:'<circle cx="12" cy="4.8" r="2.4"/><path d="M8.5 21v-5.5L6 16.5V11a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5.5l-2.5-1V21M12 13v8"/>',
   vues:[
    {id:"habillage",type:"guide",titre:"Quelle tenue, dans quelle zone ?",desc:"De la zone propre à la tenue étanche ventilée : chaque risque ajoute une protection.",prete:true},
    {id:"tev",type:"guide",titre:"Mettre une tenue étanche ventilée",desc:"Les gestes d’habillage, dans l’ordre, avec un assistant.",prete:true},
    {id:"deshabillage",type:"guide",titre:"Retirer une tenue étanche ventilée",desc:"Huit gestes pour sortir sans se contaminer.",prete:true},
    {id:"catalogue",type:"fiche",titre:"Catalogue des tenues",desc:"Ce que protège chaque équipement, ses limites, les gestes d’urgence.",prete:true},
    {id:"defi-ordre",type:"defi",titre:"Remets les gestes dans l’ordre",desc:"Six séquences d’habillage et de déshabillage.",prete:true},
    {id:"defi-choix",type:"defi",titre:"Quelle tenue pour ce chantier ?",desc:"Dix situations à trancher.",prete:true}]},
  {id:"sas",num:"02",titre:"Sas et confinement",court:"Sas",
   desc:"Les quatre sas d’un chantier, les sauts de zone, la cascade de dépressions et la filtration THE.",
   resume:"Sas complet · Confinement · Caisson · Défi",
   icone:'<rect x="2.5" y="5" width="19" height="14" rx="1.5"/><path d="M9 5v4.5M9 14.5V19M15 5v4.5M15 14.5V19M5 12h12m-2.5-2.5L17 12l-2.5 2.5"/>',
   vues:[
    {id:"complet",type:"guide",titre:"Le sas complet",desc:"Entrée, intermédiaire, travail, sortie : comment on circule et où sont les sauts de zone.",prete:true},
    {id:"confinement",type:"guide",titre:"Le confinement dynamique",desc:"Suivre l’air de la zone propre au rejet filtré ; le cas du risque alpha.",prete:true},
    {id:"caisson",type:"guide",titre:"Le caisson de filtration",desc:"Préfiltre, filtre THE, colmatage et changement du filtre sans rompre le confinement.",prete:true},
    {id:"defi-erreurs",type:"defi",titre:"Trouve les erreurs du sas",desc:"Cinq défauts sont cachés dans ce sas. À toi de les toucher.",prete:true}]},
  {id:"carto",num:"03",titre:"Cartographie radiologique",court:"Carto",
   desc:"Relever, reporter sur plan, baliser, puis réduire l’exposition : temps, distance, écran.",
   resume:"Zones · Relevé · Temps-distance-écran · Défi",
   icone:'<path d="M3 6.5l6-2.5 6 2.5 6-2.5v13.5L15 20l-6-2.5L3 20z"/><path d="M9 4v13.5M15 6.5V20"/>',
   vues:[
    {id:"zonage",type:"fiche",titre:"Les zones et leurs couleurs",desc:"Le zonage du Code du travail, avec un simulateur de débit de dose.",prete:true},
    {id:"releve",type:"guide",titre:"Faire un relevé radiologique",desc:"Ambiance, points chauds, mesure directe, frottis, affichage.",prete:true},
    {id:"alara",type:"situation",titre:"Temps, distance, écran",desc:"Une source de césium 137 : joue sur les trois leviers.",prete:true},
    {id:"defi",type:"defi",titre:"Classe les points mesurés",desc:"Six mesures à ranger dans la bonne zone.",prete:true}]},
  {id:"mesure",num:"04",titre:"Appareils de mesure",court:"Mesure",
   desc:"Dosimètres, débitmètres, contaminamètres, balises, portiques : ce que mesure chacun et le bon geste.",
   resume:"Appareils · Bon geste · Sortie · Pièges · Défi",
   icone:'<path d="M4 16.5a8 8 0 1 1 16 0"/><path d="M12 16.5l4.2-5"/><circle cx="12" cy="16.5" r="1.4"/><path d="M4 20h16"/>',
   vues:[
    {id:"appareils",type:"fiche",titre:"Les appareils de mesure",desc:"Dosimètres, radiamètres, contaminamètres et sondes, balises, contrôleurs de sortie.",prete:true},
    {id:"geste",type:"guide",titre:"Contrôler une surface",desc:"Six gestes pour une mesure de contamination fiable.",prete:true},
    {id:"sortie",type:"guide",titre:"Les contrôles en sortie de zone",desc:"Du chantier au portique de sortie du site.",prete:true},
    {id:"pieges",type:"fiche",titre:"Les pièges de la mesure",desc:"Bruit de fond, sonde, distance, unités…",prete:true},
    {id:"defi",type:"defi",titre:"Quel appareil, quel geste ?",desc:"Huit situations de terrain.",prete:true}]},
  {id:"decontamination",num:"05",titre:"Décontamination",court:"Décont.",
   desc:"Choisir une technique selon la surface et la contamination, gérer les déchets, principes pour la personne.",
   resume:"Techniques · Choix · Personne · Défi",
   icone:'<path d="M12 3s-5.5 6.3-5.5 10a5.5 5.5 0 0 0 11 0C17.5 9.3 12 3 12 3z"/><path d="M9.5 13.5A2.5 2.5 0 0 0 12 16"/>',
   vues:[
    {id:"techniques",type:"fiche",titre:"Les techniques",desc:"Chimique, mécanique, thermique, laser, et les déchets produits.",prete:true},
    {id:"choix",type:"situation",titre:"Choisir sa technique",desc:"Une situation, une famille de technique, ses déchets.",prete:true},
    {id:"personne",type:"fiche",titre:"La personne contaminée",desc:"Les principes, sans geste médical.",prete:true},
    {id:"defi",type:"defi",titre:"Défi décontamination",desc:"Sept situations à trancher.",prete:true}]}
];
window.IT_TYPES={guide:"Lecture guidée",fiche:"Fiche",situation:"Mise en situation",defi:"Défi"};
