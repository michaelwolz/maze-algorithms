import { Cell } from './cell';
import * as p5 from 'p5';

export class Grid {
  // Cells within the grid
  private _cells: Cell[] = [];

  /**
   * Constructor
   * @param width width of the grid (number of cells)
   * @param height height of the grid (number of cells)
   * @param cellSize - size of one cell element in pixels
   * @param canvas - p5 canvas element to draw the maze on
   */
  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly cellSize: number,
    protected readonly canvas: p5
  ) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this._cells.push(new Cell(x, y, this, canvas));
      }
    }
  }

  /**
   * Return all cells of the grid object
   */
  public get cells(): Cell[] {
    return this._cells;
  }

  /**
   * Return cell by coordinates
   *
   * @param x - x coordinate of the cell
   * @param y - y coordinate of the cell
   *
   * @returns Cell of the grid at the position `x,y`
   */
  public getCell(x: number, y: number): Cell | undefined {
    if (x >= 0 && y >= 0 && x < this.width && y < this.height) {
      return this._cells[x + y * this.height];
    }
    return undefined;
  }
}
