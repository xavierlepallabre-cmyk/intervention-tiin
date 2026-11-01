# Sources — Intervention TIIN

Règle de l'application : **aucune valeur réglementaire, aucun seuil, aucun code couleur n'est affiché sans source citée ici.** Une donnée non confirmée est signalée à l'auteur au lieu d'être écrite. Les schémas sont des schémas de principe, non dimensionnés, sans valeur de procédure : les consignes du site, de l'exploitant et du service de radioprotection priment toujours.

## Rubrique Sas et confinement

### Ce qui est affiché

| Notion affichée | Source |
|---|---|
| Organisation d'un sas complet idéal : sas d'entrée → sas intermédiaire → sas de travail ; sortie par le sas intermédiaire puis le sas de sortie (quatrième sas) | Enseignant [E] |
| Nappe de travail dans le sas de travail | Enseignant [E] |
| Saut de zone : chaque changement de sas ; sortir de la nappe de travail, même sans changer de sas | Enseignant [E] |
| Saut de zone : séparation physique entre deux zones de niveaux de contamination différents où le personnel passe ; on y retire les EPI en revenant vers la zone moins contaminée ; contrôle de contamination de la personne, de sa tenue et du matériel en sortie ; collecte des EPI en sortie | EDF [3] § « zonage propreté » |
| Sas intermédiaire souvent utilisé pour le déshabillage en tenue étanche ventilée (TEV) | Enseignant [E] |
| Équipements d'un sas : contaminamètre en sortie, balise aérosols (contamination de l'air du sas), surveillance de l'irradiation, poubelles à différents endroits | Enseignant [E] ; balises mobiles de chantier (aérosols, gamma…) : EDF [3] ; contrôle de non-contamination obligatoire à chaque sortie de zone : CEA [5] |
| Risque de contamination alpha : deux filtres THE en série | Enseignant [E] |
| Filtres du confinement dynamique souvent appelés « BSS » sur les chantiers | Enseignant [E] |
| Deux niveaux de confinement : statique (enceinte) et dynamique (ventilation) | IRSN [1], INRS [2] |
| Cascade de dépressions : l'air va des zones les moins contaminées vers les plus contaminées | IRSN [1], INRS [2] |
| Filtration très haute efficacité (THE) avant tout rejet | IRSN [1] |
| Extraction mettant la zone de travail en dépression, contrôle du confinement avant les travaux | INRS [2], CEA [4] |
| Contrôle du confinement dynamique : sas souple en vinyle → vitesse d'air ≥ 1 m/s à travers un orifice calibré, avec alarme ; enceinte rigide étanche → dépression de –20 à –40 Pa | CEA [4] chap. « Le confinement des chantiers d'assainissement-démantèlement » (tableau 10 et fig. 96) |
| Caisson de filtration : dernier niveau de filtration (DNF) = dispositif ultime de filtration des aérosols avant tout rejet ; caisson « à sas étanche » permettant de changer le filtre sans rupture de confinement, par sac vinyle | IRSN [7] § 1.2.1 à 1.2.3, § 2.3 |
| Préfiltre en amont des filtres principaux, pour limiter leur colmatage | IRSN [7] § 1.2.9 |
| Filtre THE : médium filtrant dans un cadre rigide, joint écrasé sur le plan de joint contre les fuites de contournement ; plusieurs filtres possibles en série dans un caisson | IRSN [7] § 1.2.4 à 1.2.8 |
| Coefficient d'épuration E = concentration amont / concentration aval ; supérieur à 5 000 pour un filtre THE neuf (aérosol d'uranine, NF X 44-011) | IRSN [7] § 1.2.8 et 1.2.10 |
| Manomètre et prises de pression mesurant la perte de charge ; rupture possible du médium en cas de colmatage excessif | IRSN [7] § 1.2.11, § 2.3 |
| Colmatage des filtres → baisse du débit d'extraction | CEA [4] |
| Défi « Trouve les erreurs » : passage qui court-circuite le sas intermédiaire, pas de contaminamètre en sortie, un seul THE malgré le risque alpha, film déchiré, pas de dépression | Conséquences directes des lignes ci-dessus |

### Volontairement non affiché

- **Valeur de dépression d'un sas** : la valeur INRS [2] (chantiers d'amiante) n'est pas utilisée. Les critères affichés sont ceux du CEA [4], présentés comme des exemples ; l'application rappelle que les consignes du site priment.
- **Valeurs d'essai d'homologation des caissons** (pressions, pertes de charge et températures d'essai de l'IRSN [7]) : non affichées, ce sont des conditions de laboratoire, pas des consignes d'exploitation.
- **Placement exact des équipements et des poubelles** : les positions du schéma sont des positions de principe.

### Références

- [E] Xavier Le Pallabre, professeur de lycée professionnel (Bac Pro TIIN), ancien du CEA : organisation d'un sas complet, sauts de zone, équipements, filtration en cas de risque alpha. Validation du 1er novembre 2026.
1. IRSN (E. Bauduin), *Les risques de dissémination de substances radioactives pendant l'exploitation de Cigéo, point de vue de l'IRSN*, dialogue technique ANCCLI / CLIS de Bure / IRSN, 10 avril 2015. Partie « confinement statique / confinement dynamique ». https://anccli.org/wp-content/uploads/2014/06/IRSN-Risques-Diss%c3%83%c2%a9mination.pdf
2. INRS, *Aéraulique des chantiers d'amiante : étude et analyse des écoulements de ventilation du sas d'accès du personnel*, Cahiers de notes documentaires — Hygiène et sécurité du travail, ND 2185-190-03, 1er trimestre 2003. https://www.inrs.fr/dms/inrs/CataloguePapier/HST/TI-ND-2185/nd2185.pdf — utilisé pour les **principes** du confinement de chantier uniquement (contexte amiante).

3. EDF, *Rapport de sûreté de Flamanville 3, chapitre 12 « Radioprotection »*, version publique, édition « demande de mise en service », © EDF 2023. Zonage radioprotection (§ 3), zonage propreté/déchets, barrières de contamination et sauts de zone, balises fixes et mobiles.
4. CEA, *L'assainissement-démantèlement des installations nucléaires*, monographie de la Direction de l'énergie nucléaire n° 13, Éditions du Moniteur, 2017. Confinement des chantiers (barrières statiques et dynamiques, types de sas, critères de dépression et de vitesse d'air, ventilation), techniques de décontamination (gels, mousses, décapage), caractérisation et cartographie radiologique, déchets.
5. CEA, posters de l'exposition INFODEM (démantèlement), conception CEA 2006. Accès en zone contrôlée par un sas, habillage et déshabillage, contrôle de non-contamination à chaque sortie de zone, protections contre la contamination (tenue de zone, masque et combinaison, tenue ventilée), frottis, cartographie.
6. CEA, dossier de presse *De l'assainissement-démantèlement des anciennes installations nucléaires au pôle de valorisation des sites industriels*, voyage de presse du 1er avril 2015. Mesure et cartographie radiologiques, décontamination.
7. IRSN (H. Desjonquères), *Spécification technique CTHEN 14-07 : caisson pour filtres THE pouvant équiper le dernier niveau de filtration des installations nucléaires*, rapport PSN-RES/SCA/2014-59, indice 1, 2014.

## Rubriques à venir : sources disponibles

- **Tenues et équipements de protection** : CEA [5] (tenue de zone → masque et combinaison → tenue ventilée selon le milieu ; habillage et déshabillage en sas) ; EDF [3] (tenue adaptée au risque de contamination en zone contaminée) ; INRS à compléter pour la protection respiratoire.
- **Cartographie, zonage, balisage** : EDF [3] § 3 : zone surveillée bleue, zone contrôlée verte, jaune, orange, rouge, avec leurs limites réglementaires (dose intégrée) et les équivalents opérationnels en débit de dose, que le rapport distingue explicitement des exigences réglementaires ; zonage propreté/déchets (ZDC/K, ZppDN : NP, N1, N2, NC). Référence réglementaire citée : arrêté « zonage » du 15 mai 2006 modifié en 2020. CEA [4] [5] [6] : cartographie radiologique, frottis.
- **Appareils de mesure** : EDF [3] (balises fixes et mobiles : iode, aérosols, gaz rares, gamma, neutrons ; portiques) ; CEA [5] (dosimètres personnels, contrôle avant sortie de zone).
- **Décontamination** : CEA [4] (gels aspirables, gels de nappage, mousses, décapage, choix selon le matériau et le radionucléide, déchets produits) ; CEA [6].
