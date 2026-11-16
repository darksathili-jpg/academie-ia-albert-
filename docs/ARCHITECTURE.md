# L0 — Architecture technique et frontières de confiance

Statut : **BROUILLON** (16 novembre 2026). Décision d'architecture de travail, sans validation pédagogique humaine ni homologation institutionnelle.

## 1. État vérifié du dépôt `main`

- `package.json` : React 19, React DOM 19, TypeScript 5.8 et Vite 6.3 déclarés ; scripts `dev`, `test` et `build`. Les versions sont des contraintes de dépendances, non une preuve d'installation.
- `vite.config.ts` : chemin de base `/academie-ia-albert-/`, adapté à une publication sous le dépôt GitHub Pages.
- `.github/workflows/ci.yml` : contrôle sur `main` avec `npm ci --ignore-scripts --no-audit --no-fund`, `npm test` et `npm run build` sous Node.js 22. **Aucune étape de publication** dans ce workflow.
- Aucune exécution locale ou distante de ces commandes n'a été observée pendant la rédaction du présent document.

## 2. Architecture cible, non réputée implémentée

```text
GitHub Pages (fichiers publics statiques)
  ├─ Interface React + TypeScript : tronc commun / spécialisation NSI
  ├─ Contenus locaux versionnés : objectifs, sources, révisions, statuts
  ├─ Exercices : entrées fictives, corrigés distincts, rétroactions explicatives
  ├─ Portfolio local : consentement éclairé, export, suppression
  └─ Atelier Python : Web Worker dédié + Pyodide, bornes et interruption
        (jamais d'exécution Python dans le fil principal)
```

Les contenus pédagogiques sont livrés uniquement après revue humaine documentée. Les fonctionnalités listées ici sont des exigences et non des fonctionnalités attestées.

## 3. Frontières de confiance et données

| Frontière | Règle bloquante |
| --- | --- |
| Dépôt GitHub public et site statique | Aucune clé API, donnée personnelle réelle d'élève, identifiant de session ni journal sensible |
| Navigateur et stockage local | Données fictives par défaut ; informer sur la persistance ; export et effacement explicites ; ne pas présumer qu'un stockage local est chiffré |
| Atelier Python | Isoler Pyodide dans un Web Worker ; prévoir arrêt, limites de ressources, validation des sorties et tests de terminaison |
| Services d'IA | Aucun appel réel à Albert sans étude préalable des conditions d'accès, autorisation, hébergement, protection des données et architecture serveur appropriée |
| Contenus générés | Statut BROUILLON ou À VÉRIFIER jusqu'à validation pédagogique humaine datée ; aucune publication automatique |

Une démonstration enregistrée ou simulée d'Albert doit être signalée comme telle, sans ambiguïté.

## 4. Contrat minimal d'une ressource pédagogique

Métadonnées obligatoires : identifiant stable, discipline, niveau, objectif observable, capacités attendues, source officielle avec URL et date de vérification, auteur/réviseur, version, statut (`BROUILLON`, `À VÉRIFIER`, `VALIDÉ`), preuve de validation. La mention `VALIDÉ` est interdite sans décision humaine documentée.

Chaque module doit proposer situation professionnelle, apport conceptuel, démonstration, activité active non-QCM, erreur typique à diagnostiquer, retour explicatif, production, évaluation de transfert, audit et trace de portfolio. Les corrigés restent distincts des supports élèves.

## 5. Contrôles et décision de sortie

1. **CI technique** : installation verrouillée, tests, vérification TypeScript et build ; ajouter ultérieurement lint, tests de liens internes, accessibilité automatisable et navigation navigateur.
2. **Audit sécurité et droits** : absence de secrets et données personnelles, licences des illustrations et documents, identification des simulations.
3. **Audit scientifique et institutionnel** : vérification des sources officielles datées, vocabulaire NSI et exactitude des exercices Python.
4. **Validation humaine** : revue par un enseignant identifié et décision datée, indépendante du résultat CI.
5. **Publication** : GitHub Pages uniquement après contrôles bloquants verts **et** validation humaine des contenus publiés.

Un test automatisé réussi n'est ni une validation pédagogique humaine ni une attestation de conformité RGAA/WCAG.

## 6. Périmètre de cette livraison L0

Ce fichier fixe les frontières et le contrat de contrôle ; il ne modifie pas le code applicatif, ne crée aucune branche, ne configure aucune publication et n'ajoute aucun service. La prochaine tâche cohérente sera un audit de l'arborescence réelle et des contrôles manquants, suivi de correctifs unitaires avec preuves.

Références internes : [cahier des charges](CAHIER_DES_CHARGES.md), [procédure de validation](L0_PROCEDURE_VALIDATION.md), [README](../README.md).
