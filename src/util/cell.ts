import { Grid } from './grid';

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

  // Indicates if the cell was already visited or not
  private visited = false;

  /**
   * Constructor
   * @param x x coordinate of the cell
   * @param y y coordinate of the cell
   * @param grid reference to the grid object where the cell is located in
   */
  constructor(
    protected readonly x: number,
    protected readonly y: number,
    protected readonly grid: Grid
  ) {}

  /**
   * Sets the visited field to true
   */
  public visit(): void {
    this.visited = true;
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
    return {
      top: this.y > 0 ? this.grid.cells[this.y - 1][this.x] : undefined,
      right:
        this.x < this.grid.width - 1
          ? this.grid.cells[this.y][this.x + 1]
          : undefined,
      bottom:
        this.y < this.grid.height - 1
          ? this.grid.cells[this.y + 1][this.x]
          : undefined,
      left: this.x > 0 ? this.grid.cells[this.y][this.x - 1] : undefined
    };
  }

  /**
   * Getter for private variable _walls
   */
  public get walls(): boolean[] {
    return this._walls;
  }
}
