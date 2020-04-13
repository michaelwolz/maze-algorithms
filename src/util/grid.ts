import { Cell } from './cell';
import * as p5 from 'p5';

export class Grid {
  // Cells within the grid
  private _cells: Cell[][] = [];

  /**
   * Constructor
   * @param width width of the grid (number of cells)
   * @param height height of the grid (number of cells)
   */
  constructor(
    public readonly width: number,
    public readonly height: number,
    protected readonly canvas: p5
  ) {
    for (let y = 0; y < this.height; y++) {
      this._cells[y] = [];
      for (let x = 0; x < this.width; x++) {
        this._cells[y].push(new Cell(x, y, this));
      }
    }
  }

  /**
   * Return all cells of the grid object
   */
  public get cells(): Cell[][] {
    return this._cells;
  }
}
