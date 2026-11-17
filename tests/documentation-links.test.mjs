import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';

// Vérifie les liens Markdown locaux des documents contractuels L0.
// Les URL externes sont hors périmètre : leur disponibilité n'est pas attestée.
const documents = [
  'README.md',
  'docs/CAHIER_DES_CHARGES.md',
  'docs/ARCHITECTURE.md',
  'docs/L0_PROCEDURE_VALIDATION.md',
];
for (const file of documents) {
  test(`Liens internes du document ${file}`, () => {
    assert.ok(existsSync(file), `Document absent : ${file}`);
    const content = readFileSync(file, 'utf8');
    const links = [...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(m => m[1]);
    for (const href of links) {
      if (/^(https?:|mailto:|#)/i.test(href)) continue;
      const pathname = decodeURIComponent(href.split('#')[0].split('?')[0]);
      if (!pathname) continue;
      const target = resolve(dirname(file), pathname);
      const root = resolve('.');
      assert.ok(target === root || target.startsWith(root + sep), `Lien hors dépôt dans ${file} : ${href}`);
      assert.ok(existsSync(target), `Lien local cassé dans ${file} : ${href}`);
    }
  });
}

test('Le cahier des charges conserve les garde-fous L0 essentiels', () => {
  const contract = readFileSync('docs/CAHIER_DES_CHARGES.md', 'utf8');
  const checks = [
    ['protection des données', /Pas de données personnelles réelles d’élèves|Pas de données personnelles réelles d'élèves/],
    ['clés API', /Pas de clé API dans le code client/],
    ['validation pédagogique humaine', /audit pédagogique humain/],
    ['absence de compte obligatoire', /Pas d’obligation de créer un compte|Pas d'obligation de créer un compte/],
    ['accessibilité', /Accessibilité\s*:/],
    ['absence de notation automatique décisionnelle', /aucune notation automatique d’élève à effet décisionnel|aucune notation automatique d'élève à effet décisionnel/],
  ];
  for (const [name, pattern] of checks) {
    assert.match(contract, pattern, `Exigence L0 manquante : ${name}`);
  }
});

test('La CI L0 reste en lecture seule, sans publication automatique', () => {
  const workflow = readFileSync('.github/workflows/ci.yml', 'utf8');
  assert.match(workflow, /permissions:\s*\n\s+contents:\s*read\b/, 'Permissions minimales manquantes');
  assert.match(workflow, /run:\s*npm ci --ignore-scripts --no-audit --no-fund/, 'Installation verrouillée absente');
  assert.match(workflow, /run:\s*npm test\b/, 'Tests absents');
  assert.match(workflow, /run:\s*npm run build\b/, 'Compilation absente');
  assert.match(workflow, /if:\s*always\(\)/, 'Résumé des échecs absent');
  assert.match(workflow, /Validation pédagogique humaine : non réalisée/, 'Distinction de validation absente');
  assert.doesNotMatch(workflow, /actions\/deploy-pages|peaceiris\/actions-gh-pages|npm run deploy/, 'Publication non autorisée par L0');
});

test('Le pilote M01 conserve les garde-fous de confidentialité et de vérification', () => {
  // Contrôle statique ciblé : il ne remplace ni un test navigateur ni un audit RGPD.
  const app = readFileSync('src/main.tsx', 'utf8');
  assert.match(app, /Vérifier la référence dans la source officielle/, 'Vérification indépendante absente');
  assert.match(app, /sans notation automatique/, 'Mention de non-notation absente');
  assert.match(app, /localStorage\.setItem\(STORAGE_KEY/, 'Enregistrement local absent');
  assert.match(app, /localStorage\.removeItem\(STORAGE_KEY\)/, 'Effacement du brouillon absent');
  assert.match(app, /Exporter en fichier texte/, 'Export local absent');
  assert.match(app, /Aucun appel réel à Albert/, 'Statut de la démonstration absent');
  assert.match(app, /ne saisissez aucune donnée personnelle/, 'Avertissement de confidentialité absent');
  assert.doesNotMatch(app, /\bfetch\s*\(|\bXMLHttpRequest\b|\bsendBeacon\s*\(/, 'Appel réseau inattendu dans le pilote M01');
});
