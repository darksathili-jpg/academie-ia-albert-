# Procédure de développement supervisé — essai d'écriture GitHub

Statut : procédure technique, **pas** une validation pédagogique ou ministérielle.

## Contrôle initial
1. Lire `docs/CAHIER_DES_CHARGES.md` et `README.md` avant toute modification.
2. Travailler exclusivement dans `darksathili-jpg/academie-ia-albert-`, sur `main`.
3. Lors de la première exécution, créer ce document, puis le relire depuis GitHub. Consigner le SHA du commit et le résultat de la relecture. Un échec d'écriture ou de relecture interdit de déclarer le contrôle réussi.

## Boucle bornée
- Une tâche prioritaire cohérente par exécution, budget cible maximal de 30 minutes de travail effectivement mesuré.
- Deux tentatives maximum pour corriger une même anomalie, puis statut **BLOCKED** avec diagnostic.
- Aucun nouveau dépôt, branche, service payant ou secret dans le code.
- Contrôles techniques proportionnés au changement ; une simple modification documentaire ne prouve ni compilation ni accessibilité.
- Pas de publication sans tests bloquants réussis ni de déclaration de validation pédagogique humaine sans revue effective.

## Compte rendu obligatoire
Tâche ; fichiers ; SHA ; lecture de contrôle ; tests exécutés et résultats ; temps mesuré ou « non mesurable » ; anomalies ; statut PASS/BLOCKED ; prochaine action.

## Priorité après le test
Vérifier l'état réel de la chaîne CI et la compilation du socle React/TypeScript, puis corriger seulement les anomalies démontrées. Ne pas avancer M01 tant que le socle ne passe pas ses contrôles bloquants.
