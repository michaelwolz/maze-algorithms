import * as p5 from 'p5';
import { BinaryTreeMaze } from './maze-generation/binary-tree/binaryTree';
import { BaseMaze } from './maze-generation/baseMaze';

const sketch = (s: p5): void => {
  let maze: BaseMaze;
  const mazeWidth = 20;
  const mazeHeight = 20;
  const cellSize = 30;

  s.setup = (): void => {
    // init
    s.createCanvas(s.windowWidth, s.windowHeight, s.WEBGL);
    s.background(0);
    s.stroke(255, 255, 255);
    s.strokeWeight(2);

    maze = new BinaryTreeMaze(mazeWidth, mazeHeight, cellSize, s);
  };

  s.draw = (): void => {
    // center canvas
    s.translate((-mazeWidth * cellSize) / 2, (-mazeHeight * cellSize) / 2, 0);
    maze.generateMazeStepByStep();
  };
};

new p5(sketch);
