import { BaseMaze } from '../baseMaze';
import { Cell, CellNeighbors } from '../../util/cell';
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
      const current: Cell = this.cellStack.pop();
      current.visit();
      current.active = true;

      // 2. If the current cell has any neighbors which have not been visited
      const cellNeighborKeys = Object.keys(current.getNeighbors()).filter(
        (neighbor: keyof CellNeighbors) => current.getNeighbors()[neighbor] && !current.getNeighbors()[neighbor].visited
      ) as (keyof CellNeighbors)[];

      if (cellNeighborKeys.length > 0) {
        // 2.1 Push the current cell to the stack
        this.cellStack.push(current);

        // 2.2 Choose one of the unvisited neighbors
        const nextPos = cellNeighborKeys[Math.floor(Math.random() * cellNeighborKeys.length)];
        const next: Cell = current.getNeighbors()[nextPos];

        // 2.3 Remove the wall between the current cell and the chosen cell
        if (nextPos === 'top') current.removeTopWall();
        if (nextPos === 'right') current.removeRightWall();
        if (nextPos === 'bottom') current.removeBottomWall();
        if (nextPos === 'left') current.removeLeftWall();

        // 2.4 Mark the chosen cell as visited and push it to the stack
        this.cellStack.push(next);
      }

      // render the maze & reset cell active state
      this.renderMaze();
      current.active = false;
    }
  }
}
