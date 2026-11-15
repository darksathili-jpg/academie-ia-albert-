# Cahier des charges opposable — Académie IA & Albert
Version 1.0 — 15 novembre 2026 — statut : exigences de conception (non homologation ministérielle).

## 1. Périmètre
Plateforme publique de formation continue des enseignants : tronc commun interdisciplinaire (8 h) et spécialisation NSI Première/Terminale (4 h). Formation non certifiante institutionnellement. L'utilisateur reste responsable de ses ressources.

## 2. Référentiel institutionnel et traçabilité
- Cadre ministériel d'usage de l'IA en éducation, juin 2025 : https://www.education.gouv.fr/cadre-d-usage-de-l-ia-en-education-450647
- Éduscol, programmes et ressources NSI : https://eduscol.education.gouv.fr/5823/programmes-et-ressources-en-numerique-et-sciences-informatiques-voie-g
- Épreuve NSI, session 2027 : https://www.education.gouv.fr/bo/2026/Special4/MENE2622643N
- CNIL, enseignants : https://www.cnil.fr/fr/enseignant-usage-systeme-ia
- CNIL, responsables de traitement : https://www.cnil.fr/fr/education-mise-en-place-systeme-ia

Chaque ressource pédagogique porte : discipline, niveau, objectif, capacités attendues, source officielle (URL et date de vérification), auteur/réviseur, version, statut BROUILLON/À VÉRIFIER/VALIDÉ, preuves de validation. Ne jamais déclarer une conformité officielle ou une approbation du ministère.

## 3. Critères bloquants
- Pas de données personnelles réelles d'élèves dans les prompts, exercices, journaux ou exemples. Jeux de données fictifs.
- Pas d'obligation de créer un compte auprès d'un service d'IA grand public ; parcours utilisable sans Albert.
- Les conditions d'accès à Albert doivent être vérifiées ; démonstrations enregistrées clairement identifiées, jamais présentées comme des appels réels.
- Pas de clé API dans le code client, GitHub, les journaux ou les captures.
- Les contenus générés ne deviennent publics qu'après audit pédagogique humain ; aucune notation automatique d'élève à effet décisionnel.
- Usage critique, transparent, frugal et à plus-value pédagogique justifiée ; pas de détecteur automatique d'IA comme preuve de fraude.
- Contrôle des licences et droits d'auteur des ressources intégrées.
- Accessibilité : objectif RGAA/WCAG à auditer ; ne pas prétendre à la conformité avant audit.
- NSI : vocabulaire officiel, Python exécutable, jeux de tests reproductibles ; modalités bac 2027 citées avec date d'application.

## 4. Contrat pédagogique par module
Situation professionnelle -> objectifs observables -> références -> apport conceptuel -> démonstration -> activité active -> retour explicatif -> production -> audit -> trace portfolio.
Au moins une erreur typique à diagnostiquer, une activité non-QCM, et une évaluation de transfert par module. Corrigés distincts des fiches élèves.

## 5. Architecture
Un seul dépôt public et branche main ; React + TypeScript + Vite ; GitHub Pages ; contenus locaux versionnés ; stockage local exportable ; Pyodide isolé dans Web Worker uniquement pour ateliers Python ; aucune intégration Albert réelle sans architecture serveur et autorisation adaptées. Tests : compilation, unitaires, liens internes, accessibilité automatisable, parcours navigateur, vérification manuelle pédagogique et visuelle.

## 6. Lots, budget et arbitrage
L0 2h architecture ; L1 4h interface ; L2 6h M01 complet ; L3 6h ateliers du tronc commun ; L4 4h NSI ; L5 2h audit/publication. 24h = plafond cible de travail effectif pour un prototype exploitable, non promesse d'achèvement de 12h de cours. Journal horodaté du temps réellement passé. Un lot au-delà du budget : arrêter, publier le constat, arbitrer le périmètre. Deux tentatives au maximum par incident ; pas de boucle de correction illimitée.

## 7. Automatisation
GitHub Actions sur push et manuellement : installation verrouillée, lint, tests, build, tests d'interface et rapport. Publication uniquement si contrôles bloquants verts. Développement autonome uniquement par tâches explicitement configurées, autorisées et contrôlées ; ne jamais confondre déclenchement d'une tâche avec une preuve de réalisation. Ne pas créer de tâches horaires concurrentes. Pas de service payant.

## 8. Preuves de livraison
Chaque lot livre : SHA commit, fichiers modifiés, temps effectif, commandes/tests et résultats, captures des interfaces clés, points non vérifiés, décision PASS/BLOCKED. Pas de « terminé » sans preuves.

## 9. Recette M01
Compréhension correcte de la génération probabiliste et des limites de l'IA ; distinction entre Albert plateforme/API et modèles sous-jacents ; exercices de comparaison, critique des hallucinations, données personnelles, justification de plus-value ; progression sauvegardée et exportable ; modes clair/sombre/projecteur ; usage mobile et clavier ; contenu révisé par un enseignant.
