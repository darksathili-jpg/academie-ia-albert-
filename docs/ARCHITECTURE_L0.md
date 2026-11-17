# Architecture et frontières de sécurité — L0

Statut : **décision technique de conception**, non validation pédagogique, juridique ou ministérielle. Version 1 — 16 novembre 2026.

## Périmètre du prototype

- Une seule application React + TypeScript compilée par Vite, servie statiquement sur GitHub Pages, depuis la branche `main`.
- Aucun serveur applicatif ni authentification dans ce prototype. Le navigateur ne possède **aucune clé d'interface de programmation d'application (API)** d'Albert.
- Les exemples et exercices utilisent exclusivement des données fictives. Les réponses d'un modèle, si elles sont présentées ultérieurement sous forme d'exemples enregistrés, portent la mention explicite **« démonstration enregistrée — aucun appel réel »**.
- L'utilisation du parcours ne requiert ni compte chez un fournisseur d'IA grand public, ni accès à Albert.

## Frontières de données

| Donnée | Destination autorisée pour le prototype | Interdit |
| --- | --- | --- |
| Choix de discipline et mode d'affichage | État temporaire du navigateur | Transmission à un service tiers |
| Réponses aux activités | État local temporaire ; export volontaire dans une évolution future | Collecte automatique de données d'élèves |
| Portfolio futur | Stockage local et export explicite, avec fonction d'effacement à prévoir et tester | Synchronisation distante implicite |
| Clés d'accès à Albert | Aucune dans le prototype statique | Code source, navigateur, dépôt, captures, journaux |

Un futur appel réel à Albert exige une architecture serveur appropriée, une autorisation d'accès vérifiée, une analyse des données traitées et une revue humaine préalable. **Aucun appel direct depuis le navigateur ne doit être ajouté.**

## Séparation des responsabilités

1. **Contenu** : chaque module doit disposer de métadonnées (discipline, niveau, objectifs, sources officielles avec date de vérification, auteur/réviseur, version, statut et preuves). Statut initial obligatoire : `BROUILLON`.
2. **Interface** : modes clair, sombre et projecteur ; clavier et lecteur d'écran à vérifier. L'objectif d'accessibilité ne vaut pas déclaration de conformité au Référentiel général d'amélioration de l'accessibilité (RGAA).
3. **Ateliers Python futurs** : exécution uniquement dans un Web Worker isolé via Pyodide ; aucun code Python arbitraire sur le fil principal de l'interface.
4. **Évaluation** : retour formatif et explicatif ; aucune décision automatique sur la note d'un élève. Une réponse générée n'est jamais une preuve de véracité.
5. **Publication** : tests, compilation, vérifications de sécurité et contrôle pédagogique humain doivent être documentés avant toute mise en ligne de contenus pédagogiques nouveaux.

## Contrôles et limites de la chaîne actuelle

Le workflow `.github/workflows/ci.yml` exécute `npm ci --ignore-scripts --no-audit --no-fund`, `npm test` et `npm run build` sans publication. Les tests de structure existants vérifient quelques invariants textuels, **pas** un parcours navigateur, un audit d'accessibilité, une revue scientifique ou une validation humaine.

Avant de déclarer L0 terminé : produire une preuve horodatée des contrôles, consigner le temps réellement mesuré (sinon « non mesurable »), et identifier explicitement les contrôles manquants. La présente note ne clôt pas L0 à elle seule.

## Sources de référence

- [Cahier des charges du projet](CAHIER_DES_CHARGES.md), version 1.0 du 15 novembre 2026.
- [Cadre d'usage de l'IA en éducation](https://www.education.gouv.fr/cadre-d-usage-de-l-ia-en-education-450647), ministère chargé de l'Éducation nationale, référence à vérifier avant validation pédagogique.
- [CNIL — usage d'un système d'IA par un enseignant](https://www.cnil.fr/fr/enseignant-usage-systeme-ia), référence à vérifier avant validation.
- [Éduscol — NSI](https://eduscol.education.gouv.fr/5823/programmes-et-ressources-en-numerique-et-sciences-informatiques-voie-g), référence à vérifier avant validation.

## Critères de recette observables pour M01 (proposition à vérifier)

La recette de M01 doit produire des preuves distinctes pour chaque capacité : (1) expliquer que la génération de texte est probabiliste sans confondre plausibilité et vérité ; (2) distinguer le service Albert, son interface de programmation d'application et les modèles qu'il expose ; (3) identifier et corriger une affirmation inventée à l'aide d'une source vérifiable ; (4) transformer une consigne contenant des données personnelles en exemple fictif ; (5) argumenter la plus-value pédagogique et les limites d'un usage d'IA ; (6) réaliser une activité ouverte, non limitée à un questionnaire à choix multiples, et une tâche de transfert ; (7) exporter localement sa progression ; (8) utiliser les interactions essentielles au clavier et sur mobile.

Pour chaque critère, conserver : version du module, scénario de test, résultat observé, preuve et statut. Les contrôles automatiques peuvent établir le fonctionnement technique, **pas** l'exactitude pédagogique ni l'accord d'un réviseur humain. Toute ressource sans relecture humaine tracée reste « À VÉRIFIER » et n'est pas publiable comme contenu validé.

Cette section définit une **recette future**, non une exécution ni une homologation.
