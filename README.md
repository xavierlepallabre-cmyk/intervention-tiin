# Intervention TIIN

Application web pédagogique sur les **techniques d'intervention en milieu nucléaire**, pour les apprentis du Bac Pro TIIN du Lycée Alexis de Tocqueville (Cherbourg-en-Cotentin). Elle rejoint Nucléa TIIN, Élec TIIN et Sûreté & Cycle TIIN, dont elle reprend l'identité visuelle.

En ligne : https://xavierlepallabre-cmyk.github.io/intervention-tiin/

## Contenu

Cinq rubriques, chacune en trois temps : une **lecture guidée** sur un schéma animé, une **mise en situation**, des **défis**. Aucune note, aucun historique de réussite, aucun compte.

| Rubrique | Adresse | État |
|---|---|---|
| Tenues et protections | `#/tenues` | en préparation |
| Sas et confinement | `#/sas` | **Le confinement dynamique** (`#/sas/confinement`) et **Trouve les erreurs du sas** (`#/sas/defi-erreurs`) publiés ; montage, contrôles et sortie en préparation |
| Cartographie radiologique | `#/carto` | en préparation |
| Appareils de mesure | `#/mesure` | en préparation |
| Décontamination | `#/decontamination` | en préparation |
| Informations | `#/infos` | sources, droits, mise à jour |

Chaque vue a son adresse : le Portail TIIN peut ouvrir directement une rubrique ou une vue.

Les schémas sont des **schémas de principe non dimensionnés, sans valeur de procédure**. Aucune valeur réglementaire n'est affichée sans source : voir `SOURCES.md`.

## Utilisation

Site statique (HTML, CSS, JavaScript natifs), sans framework, sans compilation, sans serveur, sans traceur. Le servir en HTTPS (GitHub Pages) ou, pour un essai local :

```sh
python -m http.server 8000
```

puis ouvrir http://localhost:8000/. Installable sur tablette Android (« Ajouter à l'écran d'accueil ») et utilisable hors connexion après la première ouverture.

## Mettre à jour

1. Modifier les fichiers.
2. Si un fichier est ajouté, l'ajouter à la liste `ASSETS` de `sw.js`.
3. Lancer `python tools/version.py` : le numéro de cache est recalculé à partir du contenu.
4. Publier. Les tablettes proposent « Mettre à jour » à leur prochaine ouverture avec connexion.

## Tests

```sh
pip install playwright && python -m playwright install chromium
python -m http.server 8000          # premier terminal
python tests/test_app.py            # second terminal (--captures pour enregistrer des captures)
```

Les tests vérifient : chaque rubrique s'ouvre en thème clair et sombre à 360, 390, 820 et 1440 px sans débordement horizontal ; la lecture guidée (étapes, clavier, pause, mouvement réduit) ; le défi ; le thème mémorisé ; les mentions obligatoires ; le fonctionnement hors connexion ; la proposition de mise à jour ; l'absence d'erreur JavaScript.

## Auteur et droits

Conception originale : Xavier Le Pallabre  
Ressource pédagogique développée à titre personnel, avec l’assistance d’outils d’intelligence artificielle.  
© 2026 Xavier Le Pallabre — Attribution de l’auteur original à conserver lors des réutilisations et adaptations, conformément à la licence applicable : [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr).

## Licence

Sauf mention contraire, le contenu de ce dépôt (code, textes, schémas, illustrations) est mis à disposition selon les termes de la licence **Creative Commons Attribution – Pas d'utilisation commerciale – Partage dans les mêmes conditions 4.0 International** ([CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr)). Texte complet : fichier `LICENSE`.

Tu peux le réutiliser, le copier et l'adapter, à trois conditions :
- **Attribution** : citer l'auteur original (Xavier Le Pallabre), indiquer la licence et signaler les modifications ;
- **Pas d'utilisation commerciale** : pas de vente ni d'usage dans un service payant ;
- **Partage dans les mêmes conditions** : diffuser les adaptations sous la même licence.

Le logo du Bac Pro TIIN est une création de Xavier Le Pallabre : il est couvert par cette licence, comme le reste de ses contenus.

Ne sont pas couverts par cette licence :
- la police Lexend (`assets/fonts/`), sous licence SIL Open Font License 1.1 (voir `assets/fonts/OFL.txt`) ;
- le logo du lycée Alexis de Tocqueville, propriété de l'établissement ;
- les documents, normes et marques des organismes cités dans `SOURCES.md`, qui restent soumis aux conditions de leurs producteurs.
