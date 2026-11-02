"""Tests de non-régression d'Intervention TIIN dans un vrai navigateur (Playwright + Chromium).

Usage, depuis le dossier du projet :
    python -m http.server 8000          (dans un premier terminal)
    python tests/test_app.py            (dans un second terminal)
Option : python tests/test_app.py --captures   enregistre des captures dans tests/captures/
"""
import asyncio, os, re, sys
from playwright.async_api import async_playwright

BASE = os.environ.get("INTERVENTION_URL", "http://localhost:8000/")
CAPTURES = "--captures" in sys.argv
ROUTES = ["accueil", "tenues", "sas", "carto", "mesure", "decontamination", "infos",
          "sas/complet", "sas/confinement", "sas/caisson", "sas/defi-erreurs",
          "tenues/habillage", "tenues/tev", "tenues/deshabillage", "tenues/catalogue", "tenues/defi-ordre", "tenues/defi-choix",
          "carto/zonage", "carto/releve", "carto/alara", "carto/defi",
          "mesure/appareils", "mesure/geste", "mesure/sortie", "mesure/pieges", "mesure/defi",
          "decontamination/techniques", "decontamination/choix", "decontamination/personne", "decontamination/defi"]
LARGEURS = [(360, 780), (390, 844), (820, 1180), (1440, 900)]
resultats = []

def verifie(cond, nom):
    resultats.append((bool(cond), nom))
    print(("  OK  " if cond else "  ÉCHEC ") + nom)

async def capture(pg, nom):
    if CAPTURES:
        os.makedirs("tests/captures", exist_ok=True)
        await pg.screenshot(path=f"tests/captures/{nom}.png", full_page=True)

async def main():
    async with async_playwright() as p:
        nav = await p.chromium.launch()
        erreurs = []

        print("Chaque rubrique s'ouvre, thèmes clair et sombre, sans débordement")
        for theme in ("light", "dark"):
            for w, h in LARGEURS:
                pg = await nav.new_page(viewport={"width": w, "height": h}, color_scheme=theme)
                pg.on("pageerror", lambda e: erreurs.append(str(e)))
                pg.on("console", lambda m: erreurs.append(m.text) if m.type == "error" else None)
                deborde = []
                for r in ROUTES:
                    await pg.goto(BASE + "#/" + r); await pg.wait_for_timeout(250)
                    if not await pg.locator("main h1").count():
                        deborde.append(r + " (pas de titre)")
                    d = await pg.evaluate("document.documentElement.scrollWidth - innerWidth")
                    if d > 0:
                        deborde.append(f"{r} (+{d}px)")
                    await capture(pg, f"{theme}-{w}-{r.replace('/', '_')}")
                verifie(not deborde, f"{theme} {w}px : toutes les pages s'affichent sans débordement {deborde or ''}")
                await pg.close()

        pg = await nav.new_page(viewport={"width": 1280, "height": 860})
        pg.on("pageerror", lambda e: erreurs.append(str(e)))

        print("Onglet actif et adresses directes")
        await pg.goto(BASE + "#/sas/confinement"); await pg.wait_for_timeout(300)
        verifie(await pg.get_attribute('.tabs a[data-onglet="sas"]', "aria-current") == "page", "l'onglet Sas est marqué actif")
        verifie("Intervention TIIN" in await pg.title(), "titre de page renseigné")

        print("Lecture guidée du sas complet")
        await pg.goto(BASE + "#/sas/complet"); await pg.wait_for_timeout(300)
        verifie("1 sur 6" in await pg.text_content("#num"), "commence à l'étape 1")
        verifie(await pg.locator('[data-c="sortie"].cache').count() == 1, "le sas de sortie est masqué au départ")
        for _ in range(4):
            await pg.click("#suiv")
        verifie("5 sur 6" in await pg.text_content("#num"), "Étape suivante avance")
        verifie(await pg.locator('[data-c="sauts"].cache').count() == 0, "les sauts de zone apparaissent à l'étape 5")
        verifie(await pg.locator('[data-c="contam"].cache').count() == 1, "les équipements restent masqués avant l'étape 6")
        await pg.click("#prec")
        verifie("4 sur 6" in await pg.text_content("#num"), "Précédent recule")
        await pg.keyboard.press("ArrowRight")
        verifie("5 sur 6" in await pg.text_content("#num"), "flèche droite du clavier")
        await pg.click('.liste-etapes button[data-i="5"]')
        verifie(await pg.locator('[data-c="contam"].cache').count() == 0, "accès direct à l'étape des équipements")
        verifie("confinement" in (await pg.inner_text("#suiv")).lower(), "la dernière étape mène au confinement")

        print("Lecture guidée du confinement, option alpha")
        await pg.goto(BASE + "#/sas/confinement"); await pg.wait_for_timeout(300)
        verifie(await pg.locator('[data-c="air"].cache').count() == 1, "les flux d'air sont masqués au départ")
        verifie(await pg.locator("#optionBloc").is_hidden(), "l'option alpha n'apparaît pas avant l'étape du filtre")
        for _ in range(3):
            await pg.click("#suiv")
        verifie(await pg.locator('[data-c="air"].cache').count() == 0, "les flux d'air apparaissent")
        verifie(await pg.locator('[data-c="the2"].cache').count() == 1, "un seul filtre THE sans risque alpha")
        await pg.check("#option"); await pg.wait_for_timeout(100)
        verifie(await pg.locator('[data-c="the2"].cache').count() == 0, "deux filtres THE en série avec le risque alpha")
        verifie("alpha" in (await pg.text_content("#texte")).lower(), "le texte explique le cas alpha")
        await pg.click("#pause")
        verifie(await pg.locator("#feuille.en-pause").count() == 1, "le bouton Pause arrête l'animation")
        await pg.click("#pause")
        verifie(await pg.locator("#feuille.en-pause").count() == 0, "le bouton Lecture la relance")
        await pg.click("#suiv")
        verifie("caisson" in (await pg.inner_text("#suiv")).lower(), "la dernière étape mène au caisson filtre")

        print("Lecture guidée du caisson de filtration")
        await pg.goto(BASE + "#/sas/caisson"); await pg.wait_for_timeout(300)
        verifie("1 sur 5" in await pg.text_content("#num"), "cinq étapes, commence à la première")
        verifie(await pg.locator('[data-c="prefiltre"].cache').count() == 1, "le préfiltre est masqué au départ")
        await pg.click("#suiv"); await pg.click("#suiv")
        verifie("5 000" in await pg.text_content("#texte"), "le coefficient d'épuration est expliqué")
        await pg.check("#option"); await pg.wait_for_timeout(100)
        verifie(await pg.locator('[data-c="the2"].cache').count() == 0, "deux THE en série avec le risque alpha")
        await pg.click("#suiv"); await pg.click("#suiv")
        verifie(await pg.locator('[data-c="sac"].cache').count() == 0, "le sac de changement apparaît à la dernière étape")
        verifie("défi" in (await pg.inner_text("#suiv")).lower(), "la dernière étape mène au défi")

        print("Tenues : lecture guidée selon la zone")
        await pg.goto(BASE + "#/tenues/habillage"); await pg.wait_for_timeout(300)
        verifie(await pg.locator("#pause").count() == 0, "pas de bouton Pause sur un schéma sans animation")
        verifie(await pg.locator('[data-c="everest"].cache').count() == 1, "zone propre : pas de tenue EVEREST")
        await pg.click("#suiv")
        verifie(await pg.locator('[data-c="everest"].cache').count() == 0 and await pg.locator('[data-c="bleu"].cache').count() == 0, "zone contaminée : la tenue EVEREST s'ajoute par-dessus le bleu")
        await pg.click("#suiv"); await pg.click("#suiv")
        verifie(await pg.locator('[data-c="masque"].cache').count() == 0, "contamination dans l'air : masque filtrant")
        await pg.click("#suiv")
        verifie(await pg.locator('[data-c="masque"].cache').count() == 1 and await pg.locator('[data-c="heaume"].cache').count() == 0, "le heaume remplace le masque")
        await pg.click("#suiv")
        verifie(await pg.locator('[data-c="heaume"].cache').count() == 1 and await pg.locator('[data-c="tev-tronc"].cache').count() == 0, "dernière étape : la TEV")

        print("Tenues : retirer une TEV")
        await pg.goto(BASE + "#/tenues/deshabillage"); await pg.wait_for_timeout(300)
        verifie("1 sur 8" in await pg.text_content("#num"), "huit gestes, en commençant par le fixateur")
        verifie(await pg.locator('[data-c="tev-tronc"].cache').count() == 0, "la TEV est portée au départ")
        for _ in range(7):
            await pg.click("#suiv")
        verifie(await pg.locator('[data-c="tev-bas"].cache').count() == 1 and await pg.locator('[data-c="cagoule"].cache').count() == 1, "à la fin, TEV et cagoule sont retirées")

        print("Tenues : catalogue")
        await pg.goto(BASE + "#/tenues/catalogue"); await pg.wait_for_timeout(300)
        verifie(await pg.locator(".fiche-tenue").count() == 6, "six fiches d'équipement")
        verifie("irradiation" in (await pg.inner_text("main")).lower(), "le catalogue rappelle qu'aucune tenue ne protège de l'irradiation")

        print("Tenues : défi de l'ordre")
        await pg.goto(BASE + "#/tenues/defi-ordre"); await pg.wait_for_timeout(300)
        await pg.click('.chip-btn[data-s="gants"]')
        verifie(await pg.locator(".carte-ordre").count() == 3, "la séquence des gants a trois gestes")
        await pg.click("#solution")
        verifie(await pg.locator(".carte-ordre.bon").count() == 3, "Voir l'ordre range tout correctement")
        await pg.click("#melanger")
        verifie(await pg.locator(".carte-ordre.bon").count() == 0, "Mélanger efface la vérification")
        premier = await pg.locator(".carte-ordre .txt").first.inner_text()
        await pg.locator('.btn-fleche[data-k="0"][data-d="1"]').click()
        verifie(await pg.locator(".carte-ordre .txt").nth(1).inner_text() == premier, "la flèche descend un geste d'un cran")

        print("Tenues : défi quelle tenue")
        await pg.goto(BASE + "#/tenues/defi-choix"); await pg.wait_for_timeout(300)
        await pg.click(".option-btn >> nth=0")
        verifie(await pg.locator(".option-btn.bon").count() == 1 and "Oui" in await pg.inner_text("#explication"), "la bonne réponse est confirmée et expliquée")
        await pg.click("#suiv"); await pg.click(".option-btn >> nth=0")
        verifie("Non" in await pg.inner_text("#explication"), "une mauvaise réponse est expliquée")
        verifie(await pg.locator("#prec").is_enabled(), "on peut revenir à la situation précédente")

        print("Mouvement réduit")
        ctx = await nav.new_context(reduced_motion="reduce", viewport={"width": 1280, "height": 860})
        pr = await ctx.new_page()
        await pr.goto(BASE + "#/sas/confinement"); await pr.wait_for_timeout(300)
        verifie(await pr.locator("#feuille.en-pause").count() == 1, "animation en pause d'emblée si le système réduit les mouvements")
        await ctx.close()

        print("Défi : trouve les erreurs")
        await pg.goto(BASE + "#/sas/defi-erreurs"); await pg.wait_for_timeout(300)
        await pg.click('.defi-zone[data-id="inter"]')
        verifie(await pg.inner_text("#nb") == "0", "un élément correct n'est pas compté comme erreur")
        for z in ("film", "passage", "alpha", "contam"):
            await pg.click(f'.defi-zone[data-id="{z}"]')
        verifie(await pg.inner_text("#nb") == "4", "quatre erreurs trouvées")
        await pg.focus('.defi-zone[data-id="indic"]'); await pg.keyboard.press("Enter")
        verifie(await pg.inner_text("#nb") == "5", "la dernière erreur se trouve au clavier")
        verifie("terminé" in await pg.inner_text("#retour"), "message de fin de défi")
        await pg.click("#raz")
        verifie(await pg.inner_text("#nb") == "0", "Recommencer remet à zéro")
        await pg.click("#solution")
        verifie(await pg.inner_text("#nb") == "5", "Voir la solution montre les cinq erreurs")

        print("Toutes les rubriques sont publiées")
        for r in ("tenues", "sas", "carto", "mesure", "decontamination"):
            await pg.goto(BASE + "#/" + r); await pg.wait_for_timeout(150)
            verifie(await pg.locator(".vue.prep").count() == 0 and await pg.locator("a.vue").count() >= 4, f"{r} : toutes les vues sont ouvertes")

        print("Cartographie")
        await pg.goto(BASE + "#/carto/zonage"); await pg.wait_for_timeout(200)
        await pg.fill("#ddd", "1"); await pg.locator("#ddd").dispatch_event("input")
        verifie("verte" in (await pg.inner_text("#res")).lower(), "10 µSv/h : zone contrôlée verte")
        await pg.fill("#ddd", "3"); await pg.locator("#ddd").dispatch_event("input")
        verifie("jaune" in (await pg.inner_text("#res")).lower(), "1 mSv/h : zone contrôlée jaune")
        await pg.fill("#ddd", "5.5"); await pg.locator("#ddd").dispatch_event("input")
        verifie("rouge" in (await pg.inner_text("#res")).lower(), "plus de 100 mSv/h : zone rouge")
        await pg.goto(BASE + "#/carto/alara"); await pg.wait_for_timeout(200)
        verifie("73" in await pg.inner_text("#debit"), "1 GBq de Cs 137 à 1 m : 73 µGy/h")
        await pg.fill("#dist", "2"); await pg.locator("#dist").dispatch_event("input")
        verifie("18,3" in await pg.inner_text("#debit"), "deux fois plus loin : quatre fois moins")
        await pg.fill("#tps", "60"); await pg.locator("#tps").dispatch_event("input")
        verifie("18,3" in await pg.inner_text("#dose"), "une heure à 18,3 µGy/h : 18,3 µGy")
        await pg.goto(BASE + "#/carto/releve"); await pg.wait_for_timeout(200)
        verifie(await pg.locator('[data-c="zonage"].cache').count() == 2, "le zonage n'apparaît qu'à la fin du relevé")
        for _ in range(5):
            await pg.click("#suiv")
        verifie(await pg.locator('[data-c="zonage"].cache').count() == 0, "dernière étape : local classé et affiché")
        await pg.goto(BASE + "#/carto/defi"); await pg.wait_for_timeout(200)
        for pid, z in (("a","hors"),("b","verte"),("c","jaune"),("d","jaune"),("e","orange"),("f","rouge")):
            await pg.click(f'.z-btn[data-p="{pid}"][data-z="{z}"]')
        await pg.click("#verif")
        verifie("6" in await pg.inner_text("#etat") and await pg.locator(".carte-zone.bon").count() == 6, "défi carto : six points bien classés")

        print("Mesure")
        await pg.goto(BASE + "#/mesure/geste"); await pg.wait_for_timeout(200)
        verifie("démarrage" in await pg.text_content("#ecranTxt"), "l'écran de l'appareil suit l'étape")
        await pg.click("#suiv")
        verifie("c/s" in await pg.text_content("#ecranTxt"), "bruit de fond affiché en c/s")
        await pg.goto(BASE + "#/mesure/sortie"); await pg.wait_for_timeout(200)
        for _ in range(5):
            await pg.click("#suiv")
        verifie("3 000" in await pg.text_content("#texte"), "le portique C3 et son seuil terminent le parcours")
        await pg.goto(BASE + "#/mesure/defi"); await pg.wait_for_timeout(200)
        await pg.click(".option-btn >> nth=1")
        verifie("Oui" in await pg.inner_text("#explication"), "défi mesure : réponse expliquée")

        print("Décontamination")
        await pg.goto(BASE + "#/decontamination/choix"); await pg.wait_for_timeout(200)
        await pg.click('.option-btn[data-s="metal"]')
        verifie("gel" in (await pg.inner_text("#reco")).lower(), "métal oxydé : gel aspirable proposé")
        await pg.goto(BASE + "#/decontamination/personne"); await pg.wait_for_timeout(200)
        verifie("médecin du travail" in await pg.inner_text("main"), "la contamination interne renvoie au médecin du travail")

        print("Thème mémorisé")
        await pg.goto(BASE + "#/accueil"); await pg.wait_for_timeout(200)
        await pg.click("#themeToggle")
        theme = await pg.evaluate("document.documentElement.dataset.theme")
        await pg.reload(); await pg.wait_for_timeout(300)
        verifie(await pg.evaluate("document.documentElement.dataset.theme") == theme, "le choix du thème est conservé")

        print("Mentions obligatoires")
        pied = await pg.inner_text("footer")
        verifie("Conception originale : Xavier Le Pallabre" in pied and "CC BY-NC-SA 4.0" in pied, "mention d'auteur et licence en pied de page")
        verifie("sans valeur de procédure" in pied, "avertissement « schémas de principe » en pied de page")

        print("Hors connexion")
        ctx = await nav.new_context(viewport={"width": 1280, "height": 860})
        po = await ctx.new_page()
        await po.goto(BASE + "#/accueil")
        await po.evaluate("navigator.serviceWorker.ready")
        await po.reload(); await po.wait_for_timeout(500)
        await ctx.set_offline(True)
        await po.goto(BASE + "#/sas/complet"); await po.reload(); await po.wait_for_timeout(500)
        verifie("sas complet" in (await po.inner_text("main h1")).lower(), "la lecture guidée s'ouvre hors connexion")
        verifie(not await po.locator("#netStatus").is_hidden(), "la pastille « Hors ligne » s'affiche")
        await ctx.set_offline(False)

        print("Proposition de mise à jour")
        sw = open("sw.js", encoding="utf-8").read()
        try:
            open("sw.js", "w", encoding="utf-8").write(re.sub(r"const CACHE='[^']*';", "const CACHE='intervention-tiin-test-maj';", sw))
            await po.evaluate("navigator.serviceWorker.getRegistration().then(r=>r.update())")
            await po.wait_for_timeout(2000)
            verifie(await po.locator(".update-bar").is_visible(), "le bandeau « Mettre à jour » apparaît quand une version est prête")
            await po.click(".update-bar .btn-primary"); await po.wait_for_timeout(2000)
            cle = await po.evaluate("caches.keys()")
            verifie("intervention-tiin-test-maj" in cle, "« Mettre à jour » installe la nouvelle version")
        finally:
            open("sw.js", "w", encoding="utf-8").write(sw)
        await ctx.close()

        verifie(not erreurs, f"aucune erreur JavaScript {erreurs[:3] if erreurs else ''}")
        await nav.close()

    ok = sum(1 for r in resultats if r[0])
    print(f"\n{ok} / {len(resultats)} vérifications réussies")
    sys.exit(0 if ok == len(resultats) else 1)

asyncio.run(main())
