import { Grid } from '../util/grid';
import * as p5 from 'p5';

/**
 * Base class for all maze generation algorithms
 */
export abstract class BaseMaze {
  protected _grid: Grid;
  protected _currentCellIndex = 0;
  protected ready = false;

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
    this._grid = new Grid(this.width, this.height, cellSize, canvas);
  }

  /**
   * Implementation of the actual algorithm to create the maze
   */
  public abstract generateMaze(): void;

  /**
   * Generates the maze using the same algorithm as in generateMaze
   * but instead of generating the whole maze at once, each cell
   * is processed step by step to visualize the algorithm
   */
  public abstract generateMazeStepByStep(): void;

  /**
   * Returns grid of the maze
   */
  public get grid(): Grid {
    return this._grid;
  }

  /**
   * Render the maze
   */
  public renderMaze(): void {
    // reset the background for redrawing
    this.canvas.background(0);

    for (const cell of this.grid.cells) {
      cell.render();
    }
  }
}
