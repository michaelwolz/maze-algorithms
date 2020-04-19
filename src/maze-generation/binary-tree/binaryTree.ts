import { BaseMaze } from '../baseMaze';
import { Cell } from '../../util/cell';

export class BinaryTreeMaze extends BaseMaze {
  protected currentCellIndex = 0;
  protected ready = false;

  /**
   * Generate a maze using the binary tree algorithm
   */
  public generateMaze(): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // First handle "edge" cases
        const cell: Cell = this.grid.getCell(x, y);
        if (x === this.width - 1 && y !== this.height - 1) {
          cell.removeBottomWall();
        } else if (x !== this.width - 1 && y === this.height - 1) {
          cell.removeRightWall();
        } else if (x !== this.width - 1 && y !== this.height - 1) {
          // Randomly remove either the right or the top wall
          Math.random() >= 0.5 ? cell.removeBottomWall() : cell.removeRightWall();
        }
      }
    }
  }

  public generateMazeStepByStep(): void {
    if (!this.ready) {
      const cell: Cell = this.grid.cells[this.currentCellIndex];
      const { x, y } = cell.cellCoordinates;

      // visit cell and set state to active
      cell.visit();
      cell.active = true;

      if (x === this.width - 1 && y !== this.height - 1) {
        cell.removeBottomWall();
      } else if (x !== this.width - 1 && y === this.height - 1) {
        cell.removeRightWall();
      } else if (x !== this.width - 1 && y !== this.height - 1) {
        // Randomly remove either the right or the top wall
        Math.random() >= 0.5 ? cell.removeBottomWall() : cell.removeRightWall();
      }

      // render the maze
      this.renderMaze();

      // reset cell active state
      cell.active = false;

      // increment index to process next cell
      this.currentCellIndex++;
      if (this.currentCellIndex === this.grid.cells.length) {
        this.ready = true;
      }
    }
  }
}
