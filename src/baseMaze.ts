import { Grid } from './util/grid';

/**
 * Base class for all maze generation algorithms
 */
export abstract class BaseMaze {
  protected _grid: Grid;

  /**
   * Constructor
   * @param width width of the grid (number of cells)
   * @param height height of the grid (number of cells)
   */
  constructor(
    protected readonly width: number,
    protected readonly height: number
  ) {
    this._grid = new Grid(this.width, this.height);
  }

  /**
   * Implementation of the actual algorithm to create the maze
   */
  public abstract generateMaze(): void;

  /**
   * Getter method for _grid
   */
  public get grid(): Grid {
    return this._grid;
  }
}
