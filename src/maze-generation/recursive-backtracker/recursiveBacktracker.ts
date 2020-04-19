import { BaseMaze } from '../baseMaze';
import { Cell } from '../../util/cell';
import * as p5 from 'p5';

export class RecursiveBacktrackerMaze extends BaseMaze {
  protected cellStack: Cell[] = [];

  /**
   * Constructor
   * @param width - width of the grid (number of cells)
   * @param height - height of the grid (number of cells)
   * @param cellSize - size of one cell element in pixels
   * @param canvas - p5 canvas element to draw the maze on
   */
  constructor(
    protected readonly width: number,
    protected readonly height: number,
    protected readonly cellSize: number,
    protected readonly canvas: p5
  ) {
    super(width, height, cellSize, canvas);
    this.cellStack.push(this.grid.cells[0]);
  }

  public generateMaze(): void {
    throw new Error('Method not implemented.');
  }

  public generateMazeStepByStep(): void {
    if (this.cellStack.length > 0) {
      // 1. Pop a cell from the stack and make it a current cell
      const cell: Cell = this.cellStack.pop();
      cell.visit();
      cell.active = true;

      // 2. If the current cell has any neighbors which have not been visited
      const neighborIds: string[] = Object.keys(cell.getNeighbors()).filter((neighbor) => {
        const neighborObj = cell.getNeighbors() as any;
        return neighborObj[neighbor] && !neighborObj[neighbor].visited;
      });

      if (neighborIds.length > 0) {
        // 2.1 Push the current cell to the stack
        this.cellStack.push(cell);

        // 2.2 Choose one of the unvisited neighbors
        const randNeighborId: string = neighborIds[Math.floor(Math.random() * neighborIds.length)];
        const randNeighbor: Cell = (cell.getNeighbors() as any)[randNeighborId];

        // 2.3 Remove the wall between the current cell and the chosen cell
        switch (randNeighborId) {
          case 'top':
            cell.removeTopWall();
            break;
          case 'right':
            cell.removeRightWall();
            break;
          case 'bottom':
            cell.removeBottomWall();
            break;
          case 'left':
            cell.removeLeftWall();
            break;
        }

        // 2.4 Mark the chosen cell as visited and push it to the stack
        this.cellStack.push(randNeighbor);
      }

      // render the maze & reset cell active state
      this.renderMaze();
      cell.active = false;
    }
  }
}
