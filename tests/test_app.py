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
          "sas/confinement", "sas/defi-erreurs"]
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

        print("Lecture guidée du confinement")
        verifie("1 sur 6" in await pg.text_content("#num"), "commence à l'étape 1")
        verifie(await pg.locator('.couche[data-c="3"].cache').count() == 1, "les flux d'air sont masqués au départ")
        for _ in range(3):
            await pg.click("#suiv")
        verifie("4 sur 6" in await pg.text_content("#num"), "Étape suivante avance")
        verifie(await pg.locator('.couche[data-c="3"].cache').count() == 0, "les flux d'air apparaissent à l'étape 4")
        verifie(await pg.locator('.couche[data-c="4"].cache').count() == 1, "le filtre THE reste masqué avant l'étape 5")
        await pg.click("#prec")
        verifie("3 sur 6" in await pg.text_content("#num"), "Précédent recule")
        await pg.keyboard.press("ArrowRight")
        verifie("4 sur 6" in await pg.text_content("#num"), "flèche droite du clavier")
        await pg.click("#pause")
        verifie(await pg.locator("#feuille.en-pause").count() == 1, "le bouton Pause arrête l'animation")
        await pg.click("#pause")
        verifie(await pg.locator("#feuille.en-pause").count() == 0, "le bouton Lecture la relance")
        await pg.click('.liste-etapes button[data-i="5"]')
        verifie("6 sur 6" in await pg.text_content("#num"), "accès direct à une étape")
        verifie("défi" in (await pg.inner_text("#suiv")).lower(), "la dernière étape mène au défi")

        print("Mouvement réduit")
        ctx = await nav.new_context(reduced_motion="reduce", viewport={"width": 1280, "height": 860})
        pr = await ctx.new_page()
        await pr.goto(BASE + "#/sas/confinement"); await pr.wait_for_timeout(300)
        verifie(await pr.locator("#feuille.en-pause").count() == 1, "animation en pause d'emblée si le système réduit les mouvements")
        await ctx.close()

        print("Défi : trouve les erreurs")
        await pg.goto(BASE + "#/sas/defi-erreurs"); await pg.wait_for_timeout(300)
        await pg.click('.defi-zone[data-id="transit"]')
        verifie(await pg.inner_text("#nb") == "0", "un élément correct n'est pas compté comme erreur")
        for z in ("film", "passage", "filtre"):
            await pg.click(f'.defi-zone[data-id="{z}"]')
        verifie(await pg.inner_text("#nb") == "3", "trois erreurs trouvées")
        await pg.focus('.defi-zone[data-id="indic"]'); await pg.keyboard.press("Enter")
        verifie(await pg.inner_text("#nb") == "4", "la dernière erreur se trouve au clavier")
        verifie("terminé" in await pg.inner_text("#retour"), "message de fin de défi")
        await pg.click("#raz")
        verifie(await pg.inner_text("#nb") == "0", "Recommencer remet à zéro")
        await pg.click("#solution")
        verifie(await pg.inner_text("#nb") == "4", "Voir la solution montre les quatre erreurs")

        print("Rubrique en préparation")
        await pg.goto(BASE + "#/tenues"); await pg.wait_for_timeout(200)
        verifie(await pg.locator(".vue.prep").count() == 5, "les vues non publiées sont annoncées « En préparation »")
        verifie(await pg.locator("a.vue").count() == 0, "aucun lien vers une vue non publiée")

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
        await po.goto(BASE + "#/sas/confinement"); await po.reload(); await po.wait_for_timeout(500)
        verifie("confinement" in (await po.inner_text("main h1")).lower(), "la lecture guidée s'ouvre hors connexion")
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
