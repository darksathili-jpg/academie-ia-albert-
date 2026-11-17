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

## Contrôles encore absents ou non démontrés
- Lint dédié : non défini dans `package.json` ; la compilation TypeScript ne le remplace pas.
- Tests de navigation en navigateur, parcours mobile et clavier : non attestés par cette CI.
- Audit d'accessibilité automatisé et contrôle manuel RGAA : non attestés.
- Audit des liens internes et des licences des ressources : non attesté.
- Relecture scientifique et pédagogique humaine nominative, datée et versionnée : **non réalisée / non fournie**.
- Captures d'écran des interfaces clés : non fournies.
- Temps de travail effectif cumulé de L0 : **non mesuré**, donc impossible de prouver le respect du budget de 2 h.

## Décision
**PASS technique limité** pour les étapes CI observées sur la révision citée ; **BLOCKED pour la clôture L0** et pour toute déclaration de validation pédagogique ou de conformité institutionnelle. Ne pas publier de nouveaux contenus pédagogiques comme « VALIDÉS » sans preuve de relecture humaine.

## Prochaine action prioritaire
Mettre en place et exécuter un contrôle reproductible des liens internes ou un parcours navigateur minimal, puis joindre son résultat au rapport. Ne pas confondre ajout d'un test et réussite de son exécution. Le passage à L1 nécessite un arbitrage explicite des preuves encore manquantes.

Ce document consigne des faits techniques et des lacunes, sans approbation du ministère, de la CNIL ou d'un réviseur humain.
