import { BaseMaze } from '../baseMaze';
import { Cell } from '../../util/cell';

export class BinaryTreeMaze extends BaseMaze {
  /**
   * Generate a maze using the binary tree algorithm
   */
  public generateMaze(): void {
    const cells: Cell[][] = this.grid.cells;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // First handle "edge" cases
        if (x === this.width - 1 && y !== this.height - 1) {
          cells[y][x].removeBottomWall();
        } else if (x !== this.width - 1 && y === this.height - 1) {
          cells[y][x].removeRightWall();
        } else if (x !== this.width - 1 && y !== this.height - 1) {
          // Randomly remove either the right or the top wall
          Math.random() >= 0.5 ? cells[y][x].removeBottomWall() : cells[y][x].removeRightWall();
        }
      }
    }
  }
}
