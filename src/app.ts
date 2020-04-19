import * as p5 from 'p5';
import { BinaryTreeMaze } from './maze-generation/binary-tree/binaryTree';
import { BaseMaze } from './maze-generation/baseMaze';

const sketch = (s: p5): void => {
  let maze: BaseMaze;

  s.setup = (): void => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.frameRate(20);
    s.background(0);
    s.stroke(255, 255, 255);
    s.strokeWeight(1);
    maze = new BinaryTreeMaze(20, 20, 30, s);
  };

  s.draw = (): void => {
    maze.generateMazeStepByStep();
  };
};

new p5(sketch);
