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
      assert.ok(target.startsWith(resolve('.') + sep), `Lien hors dépôt dans ${file} : ${href}`);
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
