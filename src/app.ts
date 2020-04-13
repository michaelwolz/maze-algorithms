import { BinaryTreeMaze } from './binary-tree/binaryTree';
import * as p5 from 'p5';

// Create maze and append to output
window.onload = function (): void {
  // Get output container
  const output = document.getElementById('canvas');

  // Create maze
  const maze = new BinaryTreeMaze(100, 100);
  maze.generateMaze();

  // Create output table
  const table = document.createElement('table');

  // Iterate over all cells
  for (const y in maze.grid.cells) {
    // Append row
    const tr = document.createElement('tr');
    table.appendChild(tr);

    for (const x of maze.grid.cells[y]) {
      // Append column
      const td = document.createElement('td');
      const cellWalls = x.walls;

      // Set walls
      if (cellWalls[0]) td.classList.add('top');
      if (cellWalls[1]) td.classList.add('right');
      if (cellWalls[2]) td.classList.add('bottom');
      if (cellWalls[3]) td.classList.add('left');

      tr.appendChild(td);
    }
  }

  // Append to output container
  output.appendChild(table);

  new p5((p5: p5) => {
    let model: any;

    p5.setup = (): any => {
      console.log('setup');
      p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    };
    p5.draw = (): any => {
      p5.background(255);
      p5.line(15, 25, 70, 90);
    };
  });
};
