# M01 — Protocole de recette visuelle et clavier (à exécuter)

Statut : **À VÉRIFIER**. Ce document est un protocole, **pas** une attestation de conformité RGAA, de validation pédagogique humaine ou de recette réalisée.

## Préconditions
- Examiner la version exacte de `main` (noter le SHA), le navigateur et sa version, le système, la date et le rôle du vérificateur.
- Utiliser uniquement des données fictives ; ne jamais saisir de nom d'élève, de donnée personnelle réelle ni de clé API.
- Réaliser la recette sans connexion à Albert ; aucune démonstration enregistrée ne doit être présentée comme un appel réel.
- Conserver les captures sans données personnelles et les associer au SHA testé.

## Parcours visuel et clavier à consigner
Pour chacun des modes **clair**, **sombre** et **projecteur**, relever **PASS / FAIL / NON TESTÉ**, une capture et une observation :
1. Vérifier la lisibilité du titre, des consignes, des boutons, des liens, des champs et des retours de correction ; inspecter le contraste réel (pas seulement la couleur prévue dans le CSS).
2. Parcourir toute l'interface avec **Tab** et **Maj+Tab**, sans souris : ordre logique, focus visible et absence de piège clavier.
3. Activer les changements de mode avec **Entrée** et **Espace** ; vérifier le focus conservé et l'état annoncé du bouton.
4. Ouvrir et fermer la liste de vérification au clavier ; vérifier l'état développé/replié et la lecture des consignes.
5. Répondre à l'activité, enregistrer un brouillon fictif, recharger, vérifier la persistance, effacer, puis recharger pour confirmer l'effacement.
6. Refaire le parcours sur un écran étroit (par exemple 375 px de large) et à 200 % de zoom ; relever les débordements et éléments inaccessibles.
7. Vérifier que les messages d'état sont perceptibles et compréhensibles sans se fonder exclusivement sur la couleur.

## Relecture scientifique et pédagogique humaine (distincte)
Le réviseur enseignant consigne : version, date, rôle, sources institutionnelles vérifiées et leur date, exactitude de la génération probabiliste, distinction entre Albert et ses modèles, confidentialité, pertinence de l'activité, qualité des retours et décision **À CORRIGER / VALIDÉ**. Une CI verte ne peut pas remplir cette rubrique.

## Fiche de résultat (à remplir après exécution)
- SHA / URL de l'exécution :
- Date et durée réellement chronométrée (ou « non mesurée ») :
- Vérificateur (rôle) :
- Navigateur / version / système / largeur / zoom :
- Modes clair, sombre, projecteur (résultats et captures) :
- Clavier, focus, messages d'état (résultats et preuves) :
- Mobile, zoom, contrastes (résultats et preuves) :
- Anomalies et tentatives (maximum deux par anomalie) :
- Décision technique : **PASS / BLOCKED** :
- Relecture pédagogique humaine : **NON RÉALISÉE / À CORRIGER / VALIDÉE**, avec preuve :
- Décision de publication : **BLOQUÉE** tant que les contrôles bloquants et la validation humaine ne sont pas établis.

## État technique connu avant cette recette
GitHub Actions n° 66, sur `feec15405de77e3b4f5f948231673e2075c29e91`, est `completed/success` le 18 novembre 2026 (UTC) : installation, tests, compilation et recette navigateur automatisée M01 réussis selon les étapes GitHub. Voir https://github.com/darksathili-jpg/academie-ia-albert-/actions/runs/44386020133 . Cela ne prouve **aucune** des observations manuelles demandées ci-dessus.
