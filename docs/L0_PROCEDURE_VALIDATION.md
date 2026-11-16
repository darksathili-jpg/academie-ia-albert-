# L0 — Procédure de vérification et de validation

Statut : BROUILLON — document de travail, sans validation institutionnelle ni pédagogique humaine.

## Objet

Distinguer les vérifications techniques reproductibles de la validation pédagogique humaine avant toute diffusion de ressources de formation. Ce document ne constitue ni une homologation ni une attestation de conformité.

## Contrôles techniques préalables

1. Vérifier que le contenu est versionné et que ses sources institutionnelles sont citées avec date de consultation.
2. Vérifier l'absence de données personnelles réelles d'élèves, de secrets, de clés API et de journaux sensibles.
3. Exécuter les commandes de contrôle effectivement disponibles dans le dépôt (installation verrouillée, lint, tests, build, navigation, accessibilité automatisable). Consigner les commandes et résultats exacts, sans inventer de tests.
4. Vérifier que les démonstrations d'Albert sont identifiées comme simulées si aucun appel autorisé n'est effectué.
5. Vérifier que les ressources et exemples sont utilisables sans création de compte IA grand public, avec une solution locale lorsqu'elle est prévue.

## Validation pédagogique humaine — obligatoire avant publication

Un enseignant réviseur identifié examine les objectifs, le niveau, les exemples, la justesse scientifique, le vocabulaire officiel, les erreurs typiques, les activités non-QCM, l'évaluation de transfert et la conformité des consignes aux programmes applicables. Il consigne une décision datée et des réserves éventuelles. **Aucune validation humaine n'est présumée ou automatisée.**

## Décision de livraison

- **PASS technique** : tous les contrôles techniques bloquants applicables ont réussi et leurs preuves sont enregistrées.
- **BLOCKED** : contrôle bloquant non exécuté, échec technique, risque de données personnelles, absence de validation pédagogique humaine pour une publication de contenu pédagogique, ou dépassement budgétaire non arbitré.
- Toute ressource reste **BROUILLON** ou **À VÉRIFIER** jusqu'à décision humaine documentée ; aucune publication de contenu généré n'est autorisée avant cette décision.

Références : [cahier des charges](CAHIER_DES_CHARGES.md), [README](../README.md). À revoir au prochain audit L0.
