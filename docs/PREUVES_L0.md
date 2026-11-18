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

## Contrôles encore absents ou non démontrés
- Lint dédié : non défini dans `package.json` ; la compilation TypeScript ne le remplace pas.
- Tests de navigation en navigateur, parcours mobile et clavier : non attestés par cette CI.
- Audit d'accessibilité automatisé et contrôle manuel RGAA : non attestés.
- Liens internes : contrôle statique partiel automatisé, exécuté avec succès sur `d579e67` ; audit exhaustif des liens dynamiques et des licences des ressources : non attesté.
- Relecture scientifique et pédagogique humaine nominative, datée et versionnée : **non réalisée / non fournie**.
- Captures d'écran des interfaces clés : non fournies.
- Temps de travail effectif cumulé de L0 : **non mesuré**, donc impossible de prouver le respect du budget de 2 h.

## Décision
**PASS technique limité** pour les étapes CI observées sur la révision citée ; **BLOCKED pour la clôture L0** et pour toute déclaration de validation pédagogique ou de conformité institutionnelle. Ne pas publier de nouveaux contenus pédagogiques comme « VALIDÉS » sans preuve de relecture humaine.

## Prochaine action prioritaire
Mettre en place et exécuter un parcours navigateur minimal avec contrôle clavier, puis joindre son résultat au rapport. Ne pas confondre ajout d'un test et réussite de son exécution. Le passage à L1 nécessite un arbitrage explicite des preuves encore manquantes.

Ce document consigne des faits techniques et des lacunes, sans approbation du ministère, de la CNIL ou d'un réviseur humain.
