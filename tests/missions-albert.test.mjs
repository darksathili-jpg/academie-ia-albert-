import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync('src/missions-albert/moteur.ts', 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { executerMission, missionDecouverte } = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));

test('La mission initiale se termine uniquement à la bonne case', () => {
  const succes = executerMission(missionDecouverte, [
    'avancer', 'avancer', 'tourner_gauche', 'avancer',
  ]);
  assert.equal(succes.reussite, true);
  assert.deepEqual([succes.position.x, succes.position.y], [2, 1]);
  assert.equal(succes.trace.length, 5);
  assert.equal(executerMission(missionDecouverte, ['avancer']).reussite, false);
});
test('Les obstacles bloquent réellement le déplacement', () => {
  const resultat = executerMission(missionDecouverte, [
    'avancer', 'tourner_gauche', 'avancer',
  ]);
  assert.match(resultat.erreur, /obstacle/);
  assert.deepEqual([resultat.position.x, resultat.position.y], [1, 2]);
  assert.equal(resultat.reussite, false);
});
test('Les bords bloquent et les rotations sont cohérentes', () => {
  const resultat = executerMission(missionDecouverte, [
    'tourner_gauche', 'tourner_gauche', 'avancer',
  ]);
  assert.match(resultat.erreur, /bord/);
  assert.equal(resultat.position.direction, 'ouest');
});
test('Une limite stricte et les instructions inconnues sont refusées', () => {
  assert.match(executerMission(missionDecouverte, Array(21).fill('avancer')).erreur, /Limite/);
  assert.match(executerMission(missionDecouverte, ['teleporter']).erreur, /inconnue/);
});
test('Le moteur ne modifie pas la configuration initiale', () => {
  const avant = JSON.stringify(missionDecouverte);
  executerMission(missionDecouverte, ['avancer', 'tourner_droite']);
  assert.equal(JSON.stringify(missionDecouverte), avant);
});
