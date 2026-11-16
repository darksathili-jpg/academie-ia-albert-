/** Moteur déterministe des missions Albert : aucune exécution de code élève ici.
 * Les commandes sont produites par un futur interpréteur Python isolé (Web Worker).
 */
export type Direction = 'nord' | 'est' | 'sud' | 'ouest';
export type Commande = 'avancer' | 'tourner_gauche' | 'tourner_droite';
export type Position = Readonly<{ x: number; y: number; direction: Direction }>;
export type Mission = Readonly<{
  largeur: number; hauteur: number; depart: Position;
  objectif: Readonly<{ x: number; y: number }>;
  obstacles: ReadonlyArray<Readonly<{ x: number; y: number }>>;
  limiteInstructions: number;
}>;
export type Resultat = Readonly<{
  position: Position; trace: ReadonlyArray<Position>;
  reussite: boolean; erreur?: string;
}>;
const directions: readonly Direction[] = ['nord', 'est', 'sud', 'ouest'];
const vecteurs: Record<Direction, readonly [number, number]> = {
  nord: [0, -1], est: [1, 0], sud: [0, 1], ouest: [-1, 0],
};
export const missionDecouverte: Mission = {
  largeur: 4, hauteur: 3,
  depart: { x: 0, y: 2, direction: 'est' },
  objectif: { x: 2, y: 1 },
  obstacles: [{ x: 1, y: 1 }],
  limiteInstructions: 20,
};
export function executerMission(mission: Mission, commandes: readonly Commande[]): Resultat {
  let position: Position = { ...mission.depart };
  const trace: Position[] = [position];
  const terminer = (erreur?: string): Resultat => ({
    position, trace, reussite: !erreur && position.x === mission.objectif.x
      && position.y === mission.objectif.y, ...(erreur ? { erreur } : {}),
  });
  if (!Number.isInteger(mission.largeur) || !Number.isInteger(mission.hauteur)
    || mission.largeur < 1 || mission.hauteur < 1
    || !Number.isInteger(mission.limiteInstructions) || mission.limiteInstructions < 1) {
    return terminer('Configuration de mission invalide.');
  }
  if (commandes.length > mission.limiteInstructions) return terminer('Limite d’instructions dépassée.');
  for (const commande of commandes) {
    if (commande === 'tourner_gauche' || commande === 'tourner_droite') {
      const index = directions.indexOf(position.direction);
      if (index === -1) return terminer('Orientation invalide.');
      const delta = commande === 'tourner_gauche' ? 3 : 1;
      position = { ...position, direction: directions[(index + delta) % 4] };
    } else if (commande === 'avancer') {
      const vecteur = vecteurs[position.direction];
      if (!vecteur) return terminer('Orientation invalide.');
      const x = position.x + vecteur[0], y = position.y + vecteur[1];
      if (x < 0 || y < 0 || x >= mission.largeur || y >= mission.hauteur
        || mission.obstacles.some(obstacle => obstacle.x === x && obstacle.y === y)) {
        return terminer('Déplacement impossible : obstacle ou bord de la grille.');
      }
      position = { ...position, x, y };
    } else {
      return terminer('Instruction inconnue.');
    }
    trace.push(position);
  }
  return terminer();
}
