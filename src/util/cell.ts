import { Grid } from './grid';
import * as p5 from 'p5';

/**
 * Definition for CellNeighbors
 */
export interface CellNeighbors {
  top: Cell | undefined;
  right: Cell | undefined;
  bottom: Cell | undefined;
  left: Cell | undefined;
}

/**
 * A cell within the grid of the maze
 */
export class Cell {
  // Walls of the cell object
  // Right, Bottom
  private _walls: boolean[] = [true, true];

  // Cell neighbors
  private _neighbors: CellNeighbors;

  // Indicates wether the cell was already visited or not
  private _visited = false;

  // Indicates if the cell is currently processed
  private _active = false;

  /**
   * Constructor
   * @param x x coordinate of the cell
   * @param y y coordinate of the cell
   * @param grid reference to the grid object where the cell is located in
   */
  constructor(
    protected readonly x: number,
    protected readonly y: number,
    protected readonly grid: Grid,
    protected readonly canvas: p5
  ) {}

  /**
   * Sets cell active state
   */
  public set active(value: boolean) {
    this._active = value;
  }

  /**
   * Sets the visited field to true
   */
  public visit(): void {
    this._visited = true;
  }

  /**
   * Get visited field
   */
  public get visited(): boolean {
    return this._visited;
  }

  public get cellCoordinates(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  /**
   * Remove the top wall of a cell via bottom wall of the top neighbor cell
   */
  public removeTopWall(): void {
    this.getNeighbors().top?.removeBottomWall();
  }

  /**
   * Remove the right wall of a cell
   */
  public removeRightWall(): void {
    this._walls[0] = false;
  }

  /**
   * Remove the bottom wall of a cell
   */
  public removeBottomWall(): void {
    this._walls[1] = false;
  }

  /**
   * Remove the left wall of a cell via right wall of the left neighbor cell
   */
  public removeLeftWall(): void {
    this.getNeighbors().left?.removeRightWall();
  }

  /**
   * Get the neighbors of the cell
   */
  public getNeighbors(): CellNeighbors {
    if (!this._neighbors) {
      this._neighbors = {
        top: this.grid.getCell(this.x, this.y - 1),
        right: this.grid.getCell(this.x + 1, this.y),
        bottom: this.grid.getCell(this.x, this.y + 1),
        left: this.grid.getCell(this.x - 1, this.y)
      };
    }
    return this._neighbors;
  }

  /**
   * Getter for private variable _walls
   */
  public get walls(): boolean[] {
    return this._walls;
  }

  /**
   * Draw cell on canvas
   * @param canvas p5 object to draw the cell in
   */
  public render(): void {
    const w = this.grid.cellSize; // cell width

    // draw walls
    if (this._walls[0]) this.canvas.line(this.x * w + w, this.y * w, this.x * w + w, this.y * w + w);
    if (this._walls[1]) this.canvas.line(this.x * w + w, this.y * w + w, this.x * w, this.y * w + w);

    // draw top and left line if current cell is on the left or top edge
    if (this.x === 0) this.canvas.line(this.x * w, this.y * w + w, this.x * w, this.y * w); // left
    if (this.y === 0) this.canvas.line(this.x * w, this.y * w, this.x * w + w, this.y * w); // top

    // fill cell based on it's status
    this.canvas.noStroke();
    if (this._active) {
      this.canvas.fill(0, 255, 0);
      this.canvas.rect(this.x * w, this.y * w, w, w);
    } else if (this._visited) {
      this.canvas.fill(105, 35, 139);
      this.canvas.circle(this.x * w + w / 2, this.y * w + w / 2, 5);
    }
    this.canvas.stroke(255, 255, 255);
  }
}
