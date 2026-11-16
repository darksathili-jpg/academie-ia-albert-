# Rapport de sortie L0 — état provisoire

Date du constat : 16 novembre 2026. Branche : `main`.
Statut : **BLOCKED pour clôture L0** ; ce rapport ne vaut ni homologation, ni validation pédagogique humaine.

## Périmètre vérifié

- Cahier des charges : `docs/CAHIER_DES_CHARGES.md` (version 1.0).
- Contrat et conditions de sortie : `README.md`.
- Architecture et frontières de sécurité : `docs/ARCHITECTURE_L0.md`.
- Chaîne de contrôle : `.github/workflows/ci.yml` ; installation `npm ci --ignore-scripts --no-audit --no-fund`, `npm test`, `npm run build`, sans publication et avec permission `contents: read`.
- Dernier commit de référence observé avant ce rapport : `87e80d9b89f3012761b91ddd5d3f2403126e1d61`.

## Matrice de sortie

| Condition | Constat | Décision |
| --- | --- | --- |
| Cahier des charges et périmètre | Documentés | PASS documentaire |
| Architecture et conventions | Documentées, sans appel Albert réel ni clé côté client | PASS documentaire |
| Critères de recette M01 | Définis au §9 du cahier des charges ; non exécutés | PASS définition uniquement |
| Temps effectif L0 | Aucun chronométrage consolidé et vérifiable disponible | BLOCKED |
| Preuve CI du dernier commit | Recherche des statuts et des exécutions liées au commit : aucun résultat retourné par ces interfaces ; cela ne prouve ni succès ni échec | NON VÉRIFIÉ |
| Tests navigateur, accessibilité, liens et revue scientifique | Aucune preuve d'exécution recueillie dans ce constat | NON VÉRIFIÉ |
| Revue humaine pédagogique | Non réalisée | BLOCKED pour publication de contenus nouveaux |

## Risques et garde-fous

Aucune donnée personnelle réelle d'élève, aucun secret Albert et aucun appel API réel ne sont autorisés dans ce prototype statique. Les démonstrations enregistrées doivent être explicitement signalées. L'accessibilité est un objectif à auditer, pas une conformité acquise. La publication d'un contenu pédagogique nouveau nécessite une revue humaine traçable.

## Prochaine décision

1. Obtenir la preuve du résultat de la CI pour le commit courant (identifiant d'exécution, étapes, conclusions).
2. Consolider les temps réellement mesurés ; si indisponibles, faire arbitrer explicitement le budget L0 sans inventer de durée.
3. Après décision de sortie L0, commencer L1 par un lot borné, avec tests et contrôle humain distincts.

Ce rapport documente les lacunes de preuve ; il ne certifie ni L0, ni M01, ni le respect institutionnel du produit fini.

## Complément de preuve CI — 16 novembre 2026

L'exécution GitHub Actions [43814181604](https://github.com/darksathili-jpg/academie-ia-albert-/actions/runs/43814181604) a été interrogée directement : le job « Tests et compilation — sans publication » est `completed / success`. Les étapes « Vérifier l'installation reproductible », « Exécuter les tests » et « Vérifier TypeScript et compiler Vite » portent chacune la conclusion `success`. Cette preuve concerne **cette exécution historique**, pas nécessairement le commit qui ajoute le présent rapport ou ce complément. Aucun test local ni test navigateur supplémentaire n'a été exécuté ici.

La preuve CI antérieure ne remplace ni le relevé de temps L0 (non disponible), ni la revue pédagogique humaine (non réalisée), ni l'audit d'accessibilité. **Clôture L0 : BLOCKED**, inchangée. Aucune publication autorisée sur cette seule base.
