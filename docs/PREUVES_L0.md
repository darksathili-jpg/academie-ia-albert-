# L0 — État des preuves techniques et limites de validation

Date de constat : 17 novembre 2026. Statut : **À VÉRIFIER — lot non clôturé**.

## Périmètre et sources
- Cahier des charges : `docs/CAHIER_DES_CHARGES.md` (version 1.0).
- Contrat de livraison : `README.md`, conditions de sortie L0.
- Architecture : `docs/ARCHITECTURE_L0.md`.
- CI : `.github/workflows/ci.yml` ; branche `main`.

## Preuve CI observée
- Exécution GitHub Actions : https://github.com/darksathili-jpg/academie-ia-albert-/actions/runs/44108473628
- Révision associée signalée lors du contrôle précédent : `8074769961ad574999342705c13844051b4d0b48`.
- Job « Tests et compilation — sans publication » : `completed / success`, vérifié par consultation des jobs GitHub Actions le 17 novembre 2026.
- Étapes « Vérifier l'installation reproductible », « Exécuter les tests », « Vérifier TypeScript et compiler Vite » et « Consigner les preuves techniques » : chacune `completed / success`.
- Le workflow ne contient aucune étape de déploiement. Ce constat n'est **pas** une preuve d'audit pédagogique, d'accessibilité ou de sécurité exhaustive.

## Vérification complémentaire — tests des liens internes (17 novembre 2026)
- Commit testé : `d579e67c201d0bd42880e46db9a28c6d8e2beede`.
- Exécution GitHub Actions : https://github.com/darksathili-jpg/academie-ia-albert-/actions/runs/44143906532 (n° 46, événement `push`, branche `main`, conclusion `success`, 17 novembre 2026 à 18:04 UTC).
- Job « Tests et compilation — sans publication » : `success` ; étapes installation reproductible, tests, compilation TypeScript/Vite et consignation des preuves : `success`.
- `tests/links.test.mjs` contient trois tests statiques (ressources locales de `index.html`, ancres internes littérales et `aria-controls` littéraux). Leur exécution est couverte par l'étape globale de tests réussie ; aucun parcours réel dans un navigateur n'est ainsi démontré.
- Ces contrôles n'inspectent pas tous les liens construits dynamiquement, ne prouvent pas l'accessibilité et ne constituent pas un audit de sécurité exhaustif.

## Vérification du correctif JSX M01 — 18 novembre 2026
- Commit vérifié : `91f06a81fdc518e8d01279bdd4f7699968bb0cfc` (correction d'une accolade JSX superflue dans `src/main.tsx`).
- Exécution CI n° 50 : https://github.com/darksathili-jpg/academie-ia-albert-/actions/runs/44194693154 ; déclenchement `push`, branche `main`, SHA correspondant, état `completed`, conclusion `success` (17 novembre 2026, 22:55 UTC).
- Job « Tests et compilation — sans publication » : `success`. Étapes « Vérifier l'installation reproductible », « Exécuter les tests », « Vérifier TypeScript et compiler Vite », « Consigner les preuves techniques » : toutes `success`, selon l'API des jobs GitHub Actions.
- Il s'agit d'une preuve de réussite de la CI pour ce commit, pas d'un audit navigateur, RGAA, sécurité, licences ou d'une validation pédagogique humaine. Aucun test local supplémentaire exécuté pour ce constat.
- Temps effectif de cette vérification : non mesuré ; le budget cumulé L0 demeure non vérifiable.

## Vérification des garde-fous statiques de confidentialité — 18 novembre 2026
- Commit contrôlé : `b05c747681dd46ec9a73747f8009ebbe2e460fec` (ajout de `tests/privacy.test.mjs`).
- Exécution GitHub Actions n° 53 : https://github.com/darksathili-jpg/academie-ia-albert-/actions/runs/44234215112 ; événement `push`, branche `main`, SHA correspondant, état `completed`, conclusion `success` (18 novembre 2026, 03:59 UTC).
- Job « Tests et compilation — sans publication » : `success`. Étapes installation reproductible, tests, TypeScript/Vite et consignation des preuves : `success`, selon les résultats des jobs GitHub Actions consultés.
- L'étape `npm test` réussie inclut les trois tests statiques de `tests/privacy.test.mjs` ; aucun test navigateur ni contrôle réseau dynamique n'est démontré. La réussite ne prouve pas la conformité RGPD, RGAA ou la validation pédagogique humaine.
- Temps effectif : non mesuré ; budget cumulé L0 non vérifiable. Aucune publication autorisée par cette seule preuve.


## Vérification des tests statiques clavier et statuts M01 — 18 novembre 2026
- Commit vérifié : `ba0ff6bcbc371dabcf07d8e10302e57b5b425686` (deux tests statiques ajoutés à `tests/links.test.mjs`).
- Exécution GitHub Actions n° 55 : https://github.com/darksathili-jpg/academie-ia-albert-/actions/runs/44255103542 ; événement `push`, branche `main`, SHA identique, état `completed`, conclusion `success` (18 novembre 2026, 06:57 UTC).
- Job « Tests et compilation — sans publication » : `success` ; étapes installation reproductible, `npm test`, compilation TypeScript/Vite et consignation des preuves : toutes `success` selon les résultats des jobs GitHub Actions.
- Ces tests inspectent le code source : ils ne démontrent ni le comportement réel du focus et du clavier dans un navigateur, ni la conformité RGAA/WCAG, ni une validation pédagogique humaine.
- Temps effectif de cette vérification : non mesuré ; budget cumulé L0 non vérifiable. Aucune publication autorisée par cette seule preuve.


## Vérification CI du correctif de focus clavier — 18 novembre 2026
- Commit vérifié : `6e6ece67c016ff86334290d4c4d48c57f4e7e9f9` (`src/style.css`, focus des contrôles en modes sombre et projecteur).
- Exécution CI n° 57 : https://github.com/darksathili-jpg/academie-ia-albert-/actions/runs/44271870135 ; événement `push`, branche `main`, SHA identique, état `completed`, conclusion `success` (18 novembre 2026, 09:00 UTC).
- Job « Tests et compilation — sans publication » : `success` ; installation reproductible, tests, TypeScript/Vite et consignation des preuves : toutes les étapes `success` selon l'API des jobs GitHub Actions.
- Aucun essai réel au clavier, mesure de contraste, capture d'écran ou audit RGAA n'a été exécuté lors de ce constat. L'efficacité perceptive du focus demeure **À VÉRIFIER**.
- Temps de travail effectif : non mesuré. Aucune validation pédagogique humaine, aucune publication autorisée par cette seule preuve.

## Contrôles encore absents ou non démontrés (état actualisé au 18 novembre 2026)
- Lint dédié : non défini dans `package.json` ; la compilation TypeScript ne le remplace pas.
- Parcours navigateur automatisé M01 : **attesté** par les CI n° 65 et n° 66 (étape Chromium `success`). Recette **manuelle** clavier, focus perceptible, zoom et mobile : non attestée ; les tests automatisés ne remplacent pas ces observations.
- Audit d'accessibilité automatisé et contrôle manuel RGAA : non attestés.
- Liens internes : contrôle statique partiel automatisé, exécuté avec succès sur `d579e67` ; audit exhaustif des liens dynamiques et des licences des ressources : non attesté.
- Relecture scientifique et pédagogique humaine nominative, datée et versionnée : **non réalisée / non fournie**.
- Captures d'écran des interfaces clés : non fournies.
- Temps de travail effectif cumulé de L0 : **non mesuré**, donc impossible de prouver le respect du budget de 2 h.

## Décision
**PASS technique limité** pour les étapes CI observées sur la révision citée ; **BLOCKED pour la clôture L0** et pour toute déclaration de validation pédagogique ou de conformité institutionnelle. Ne pas publier de nouveaux contenus pédagogiques comme « VALIDÉS » sans preuve de relecture humaine.

## Prochaine action prioritaire
Exécuter le protocole `docs/RECETTE_MANUELLE_M01.md` sur une révision identifiée, relever les observations visuelles et clavier avec captures sans données personnelles, puis obtenir séparément la relecture pédagogique humaine. Le passage à L1 nécessite un arbitrage explicite des preuves encore manquantes.

Ce document consigne des faits techniques et des lacunes, sans approbation du ministère, de la CNIL ou d'un réviseur humain.

## Recette navigateur du commit 87a19a4 — constat du 18 novembre 2026
- SHA contrôlé : `87a19a4891771e372cb67e0f00de35eddf8aaf7e` sur `main`.
- Exécution CI n° 63 : https://github.com/darksathili-jpg/academie-ia-albert-/actions/runs/44320395333 ; événement `push`, démarrée le 18 novembre 2026 à 14:05 UTC, état `completed`, conclusion **`cancelled`** (mise à jour à 14:15 UTC).
- D'après les étapes du job : installation reproductible **success**, tests **success**, compilation TypeScript/Vite **success**, installation Playwright **success** ; recette navigateur M01 **cancelled**. Il est donc incorrect de déclarer le parcours navigateur réussi ou échoué sur la base de cette exécution.
- Aucune nouvelle exécution des tests pendant ce constat : seules les étapes CI ont été consultées. Le motif exact de l'annulation n'est pas établi par ces métadonnées.
- Temps effectif de travail : non mesuré ; aucune relecture pédagogique humaine, aucun audit RGAA, aucune publication autorisée. **BLOCKED** pour la recette navigateur et la clôture L0.
- Prochaine action : déterminer la cause de l'annulation du job puis obtenir une exécution complète de la recette navigateur avant toute décision de livraison.


## Vérification de la terminaison Chromium — 18 novembre 2026
- Révision contrôlée : `c17d77a3802b01aa68a94fe2b8effb65e9b9876f` sur `main`.
- Exécution CI n° 65 : https://github.com/darksathili-jpg/academie-ia-albert-/actions/runs/44365454627 ; événement `push`, démarrage le 18 novembre 2026 à 18:03 UTC, état `completed`, conclusion **`success`** (API GitHub Actions consultée).
- Job `135017842805` : `completed / success`. Étapes installation reproductible, tests, compilation TypeScript/Vite, installation Playwright, **recette navigateur M01** et consignation des preuves : toutes `success` selon l'API des jobs.
- Le blocage précédent de terminaison du parcours Chromium est levé pour cette révision : le job s'est achevé avec succès, contrairement à l'exécution n° 63 annulée. Cette preuve ne constitue pas un audit RGAA complet, une revue scientifique et pédagogique humaine, ni une homologation institutionnelle.
- Contrôles supplémentaires exécutés pendant la rédaction de ce constat : aucun ; seuls les résultats GitHub Actions ont été consultés. Temps effectif de l'intervention : non mesuré ; temps cumulé L0 non vérifiable.
- **Décision : PASS pour la recette navigateur automatisée de cette révision ; BLOCKED pour la clôture globale de L0**, en attente des preuves humaines, visuelles et d'accessibilité manuelle. Aucune publication autorisée par cette seule réussite technique.

## Actualisation des preuves — CI n° 66 (18 novembre 2026)
- Exécution : https://github.com/darksathili-jpg/academie-ia-albert-/actions/runs/44386020133 ; job `135090694937`, `completed / success`, consulté via GitHub Actions.
- Étapes `Vérifier l'installation reproductible`, `Exécuter les tests`, `Vérifier TypeScript et compiler Vite`, `Installer Playwright pour la recette navigateur (sans modifier le verrou)`, `Exécuter la recette navigateur M01` et `Consigner les preuves techniques` : toutes `completed / success`.
- Il s'agit d'une preuve d'exécution automatisée, **pas** d'une recette manuelle ni d'une validation pédagogique humaine. Le protocole à exécuter figure dans `docs/RECETTE_MANUELLE_M01.md` ; son statut reste **À VÉRIFIER**.
- Aucun test supplémentaire lancé pour cette actualisation documentaire. Temps effectif non mesuré ; budget cumulé L0 non vérifiable.
- **Décision : PASS pour les contrôles automatisés observés ; BLOCKED pour la clôture L0 et la publication de nouveaux contenus non validés.**
