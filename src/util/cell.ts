import { Grid } from './grid';
import * as p5 from 'p5';

/**
 * Definition for CellNeighbors
 */
interface CellNeighbors {
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
  // Top, Right, Bottom, Left (as known from CSS)
  private _walls: boolean[] = [true, true, true, true];

  // Cell neighbors
  private _neighbors: CellNeighbors;

  // Indicates wether the cell was already visited or not
  private visited = false;

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
    this.visited = true;
  }

  public get cellCoordinates(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  /**
   * Remove the top wall of a cell
   */
  public removeTopWall(includeNeighbor = true): void {
    this._walls[0] = false;
    if (includeNeighbor) this.getNeighbors().top?.removeBottomWall(false);
  }

  /**
   * Remove the right wall of a cell
   */
  public removeRightWall(includeNeighbor = true): void {
    this._walls[1] = false;
    if (includeNeighbor) this.getNeighbors().right?.removeLeftWall(false);
  }

  /**
   * Remove the bottom wall of a cell
   */
  public removeBottomWall(includeNeighbor = true): void {
    this._walls[2] = false;
    if (includeNeighbor) this.getNeighbors().bottom?.removeTopWall(false);
  }

  /**
   * Remove the left wall of a cell
   */
  public removeLeftWall(includeNeighbor = true): void {
    this._walls[3] = false;
    if (includeNeighbor) this.getNeighbors().bottom?.removeLeftWall(false);
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
    if (this._walls[0]) this.canvas.line(this.x * w, this.y * w, this.x * w + w, this.y * w);
    if (this._walls[1]) this.canvas.line(this.x * w + w, this.y * w, this.x * w + w, this.y * w + w);
    if (this._walls[2]) this.canvas.line(this.x * w + w, this.y * w + w, this.x * w, this.y * w + w);
    if (this._walls[3]) this.canvas.line(this.x * w, this.y * w + w, this.x * w, this.y * w);

    // fill cell based on it's status
    this.canvas.noStroke();
    if (this._active) {
      this.canvas.fill(0, 255, 0);
      this.canvas.rect(this.x * w, this.y * w, w, w);
    } else if (this.visited) {
      this.canvas.fill(105, 35, 139);
      this.canvas.circle(this.x * w + w / 2, this.y * w + w / 2, 5);
    }
    this.canvas.stroke(255, 255, 255);
  }
}
