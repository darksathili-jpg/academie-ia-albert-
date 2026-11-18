# L0 — Protocole reproductible de recette navigateur et clavier

Statut : **À EXÉCUTER — aucune validation humaine ni conformité RGAA revendiquée**. Périmètre : interface pilote M01 de `main`. Ce document est un protocole, **pas** un résultat de test.

## Préparation

1. Sur une copie propre du dépôt, relever le SHA de `main` avec `git rev-parse HEAD`.
2. Exécuter `npm ci --ignore-scripts --no-audit --no-fund`, `npm test`, puis `npm run build`. Consigner séparément codes de sortie et sorties utiles.
3. Démarrer `npm run dev -- --host 127.0.0.1` et ouvrir l'adresse locale affichée dans un navigateur récent, sans extension de navigation. Ne saisir **aucune donnée personnelle réelle**.
4. Relever navigateur, version, système, résolution, zoom et date. Refaire au minimum à 200 % de zoom et en largeur mobile. Ne pas utiliser Albert ni de clé API.

## Parcours au clavier (sans souris)

| Étape | Action | Résultat attendu |
| --- | --- | --- |
| 1 | Recharger, puis parcourir avec Tab et Maj+Tab | Focus visible ; ordre logique ; aucun piège clavier |
| 2 | Activer « Sombre », « Projecteur », puis « Clair » avec Entrée ou Espace | Mode affiché changé ; `aria-pressed` cohérent ; focus conservé |
| 3 | Atteindre « Votre discipline » et changer l'option au clavier | Choix modifié, libellé associé, aucun saut de focus |
| 4 | Sélectionner une réponse radio avec les flèches et Espace | Un seul choix actif ; retour explicatif lisible et annoncé par `role=status` |
| 5 | Rédiger « Vérifier la référence sur le site officiel » dans la zone de texte | Texte visible ; aucune donnée envoyée à un service externe |
| 6 | Activer « Afficher les critères d’autoévaluation » | `aria-expanded=true` ; cible `verification-checklist` visible ; texte lisible |
| 7 | Replier les critères | `aria-expanded=false` ; cible conservée dans le DOM et masquée ; pas de contenu replié atteignable au clavier |
| 8 | Enregistrer le brouillon, recharger, puis l'effacer | Brouillon restauré localement puis effacé ; messages d'état cohérents |
| 9 | Exporter un brouillon fictif | Fichier texte créé sur l'appareil, contenu attendu ; aucune transmission à Albert |

## Vérifications complémentaires

- Examiner les modes clair, sombre et projecteur, le zoom 200 %, la largeur mobile et la lisibilité du focus.
- Vérifier dans les outils réseau l'absence de requête d'envoi du brouillon ; ne pas conclure à une garantie générale de confidentialité sur ce seul contrôle.
- Contrôler au lecteur d'écran, si disponible, les noms des boutons, du sélecteur, du groupe radio, du champ texte et l'annonce des messages d'état.
- Consigner les écarts d'accessibilité à examiner selon le Référentiel général d'amélioration de l'accessibilité (RGAA). Aucun résultat automatique ne vaut audit complet.

## Fiche de preuve à remplir après exécution

- SHA testé :
- Date et durée **mesurée** (ou « non mesurée ») :
- Navigateur/version, système, taille et zoom :
- Commandes et résultats :
- Étapes 1 à 9 : PASS / FAIL / NON EXÉCUTÉ, avec preuves et description des anomalies :
- Vérifications complémentaires : PASS / FAIL / NON EXÉCUTÉ :
- Captures d'écran (sans données personnelles) et emplacement :
- Réviseur humain, rôle, date, version examinée et décision pédagogique : **NON RÉALISÉ tant que non renseigné**.
- Décision technique : **BLOCKED tant que les contrôles bloquants ne sont pas exécutés et réussis**.

Toute anomalie doit être traitée au maximum deux fois avant arrêt et signalement. Ce protocole n'autorise ni publication ni déclaration de conformité institutionnelle.
