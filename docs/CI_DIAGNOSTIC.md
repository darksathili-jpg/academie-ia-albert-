# Diagnostic CI — dépendances reproductibles

Date : 15 novembre 2026. Statut : **BLOQUÉ pour la validation de la compilation**, sans échec prouvé du code applicatif.

## Constat vérifié

- Le fichier `package.json` définit React, React DOM, TypeScript, Vite et les types React avec des plages de versions (`^`).
- Le workflow `.github/workflows/ci.yml` utilise provisoirement `npm install --ignore-scripts --no-audit --no-fund`, et non `npm ci`.
- Dans l'environnement de diagnostic, Node.js `v22.16.0` et npm `10.9.2` sont présents.
- Tentative de génération du verrou : `npm install --package-lock-only --ignore-scripts --no-audit --no-fund --fetch-retries=0 --fetch-timeout=10000`.
- Résultat : **échec réseau `EAI_AGAIN`** sur `registry.npmjs.org/@types%2freact`. Aucun fichier `package-lock.json` fiable n'a été produit. Cela ne démontre pas un défaut du projet.

## Remédiation autorisée (lot unique suivant)

1. Depuis un environnement disposant d'un accès normal au registre npm, générer `package-lock.json` avec `npm install --package-lock-only --ignore-scripts --no-audit --no-fund` et vérifier qu'il correspond exactement au `package.json` versionné.
2. Ajouter le verrou sur `main` sans introduire de secret, de dépendance payante ou de branche supplémentaire.
3. Remplacer dans la CI `npm install` par `npm ci --ignore-scripts --no-audit --no-fund`.
4. Exécuter effectivement `npm test` et `npm run build` sur le dépôt réel, consulter les journaux GitHub Actions et ne déclarer PASS que si les commandes réussissent.

## Critères de sortie

- Verrou présent, cohérent et relu ; installation déterministe réussie.
- Tests et compilation exécutés sur les sources réelles, avec résultats traçables.
- Aucune publication tant que ces preuves ne sont pas obtenues.

Ce document est un **constat technique**, pas une validation pédagogique, institutionnelle, RGAA ou de sécurité.
