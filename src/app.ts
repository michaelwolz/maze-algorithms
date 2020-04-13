import * as p5 from 'p5';
import { BinaryTreeMaze } from './maze-generation/binary-tree/binaryTree';
import { BaseMaze } from './maze-generation/baseMaze';

const sketch = (s: p5): void => {
  let maze: BaseMaze;

  s.setup = (): void => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.frameRate(5);

    maze = new BinaryTreeMaze(10, 10, s);
    maze.generateMaze();
  };

  s.draw = (): void => {
    s.background(0);
    s.stroke(69, 245, 66);
    for (const y of maze.grid.cells) {
      for (const x of y) {
        x.show(s);
      }
    }
  };
};

new p5(sketch);
