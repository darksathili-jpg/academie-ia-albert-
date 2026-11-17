# Académie IA & Albert

Formation interactive à la conception pédagogique assistée par IA, pour toutes les disciplines, avec spécialisation Première et Terminale NSI.

## Contrat de développement

- Dépôt unique, branche `main`, publication GitHub Pages uniquement.
- Aucun service payant, aucune clé Albert dans le navigateur.
- Lots bornés ; deux tentatives maximum par anomalie avant diagnostic.
- Aucun contenu déclaré validé sans vérification humaine et technique.
- Première cible : module M01 complet, interactif et vérifié.

## Parcours

- Tronc commun : 8 h — IA et Albert, prompts, cours, activités, évaluations, DM, audit.
- Spécialisation NSI : 4 h — TP Python, tests, algorithmique, évaluations et Albert API.
- Les exemples doivent être autonomes, sans dépendance à des exercices externes.

## Lots et budgets cibles

| Lot | Objet | Budget cible | État |
| --- | --- | ---: | --- |
| L0 | Architecture et contrat | 2 h | En cours |
| L1 | Interface et navigation | 4 h | À faire |
| L2 | M01 complet | 6 h | À faire |
| L3 | Tronc commun et ateliers | 6 h | À faire |
| L4 | Spécialisation NSI | 4 h | À faire |
| L5 | Audit et publication | 2 h | À faire |

Le budget total de 24 h vise une première version exploitable, non l'intégralité des 12 h de formation rédigées.

## Conditions de sortie L0

1. Cahier des charges et périmètre consignés.
2. Architecture technique et conventions fixées.
3. Critères de recette M01 définis.
4. Temps effectif et preuves consignés dans un rapport de livraison.

## Architecture cible

React, TypeScript et Vite ; contenus structurés et versionnés ; exercices interactifs ; Pyodide dans un Web Worker pour les ateliers Python ; stockage local et export du portfolio ; GitHub Actions pour tests et publication.

## Conditions d'arrêt

Bloquer la livraison en cas d'erreur scientifique majeure, de test essentiel en échec, de risque de sécurité ou de dépassement non arbitré du budget. Les automatisations ne doivent pas prétendre avoir développé ou publié sans preuve de commit, de tests et de déploiement.

## Vérification des contributions automatisées

Une modification automatisée est une proposition technique, **pas une validation pédagogique humaine**. Avant toute publication de contenus destinés aux enseignants ou aux élèves, conserver une trace de la relecture humaine (identité ou rôle du réviseur, date, version examinée et décision). En l'absence de cette preuve, conserver le statut **À VÉRIFIER** ; ne pas afficher **VALIDÉ**. Les contrôles automatiques ne remplacent pas cette étape.
