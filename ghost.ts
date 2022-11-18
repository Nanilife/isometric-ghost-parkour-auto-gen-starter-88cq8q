import { canGoTo, dx, dy, p, SIDE_LENGTH } from '.';
import { drawGhost, GhostFrame } from './spritesheet';

export type Position = { x: number; y: number };

export class Ghost {
  public position: Position;
  private animation: { height: number; direction: number } = { height: 0, direction: 1 };

  constructor(private frame: GhostFrame, x: number = null, y: number = null) {
    if (x === null || y === null) {
      this.position = { x: 0, y: 0 };
      while (this.position.x === 0 && this.position.y === 0) {
        this.position = { x: Math.floor(p.random(0, SIDE_LENGTH)), y: Math.floor(p.random(0, SIDE_LENGTH)) };
      }
    } else {
      this.position = { x, y };
    }
  }

  public draw() {
    this.animation.height += this.animation.direction;
    if (this.animation.height >= 30) {
      this.animation.direction = -1;
    } else if (this.animation.height <= 0) {
      this.animation.direction = 1;
    }

    drawGhost(this.frame, dx / 2, dy / 2 + this.animation.height);
  }

  public moveRandomly() {
    let newPosition: Position;
    do {
      newPosition = { ...this.position };
      if (p.random() < 0.5) {
        newPosition.x += p.random() < 0.5 ? -1 : 1;
      } else {
        newPosition.y += p.random() < 0.5 ? -1 : 1;
      }
    } while (!canGoTo(newPosition));
    this.position = newPosition;
  }
}
