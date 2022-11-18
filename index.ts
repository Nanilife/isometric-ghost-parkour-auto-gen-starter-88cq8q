import './style.css';
import p5 = require('p5');
import { DecorationFrame, getDecorationValue, getTileHeight, getTileWidth, GhostFrame, TileFrame } from './spritesheet';
import {
  getRandomDecoration,
  getRandomTileName,
  getRandomValueDecoration,
  parseLevel,
  removeInvalidBridgeDirections,
  Tile,
} from './gameTile';
import { Ghost, Position } from './ghost';

export let p: p5;
export let images: p5.Image;
let font: p5.Font;
const SCALE = 0.5;
export const SIDE_LENGTH = 10;
const SCROLL_SPEED = 10; // 1, 5, 10, 25, 50
const SCROLL_BORDER = 0.2;
const SHIFT = 50;

let translation: { x: number; y: number };
let shift: { x: number; y: number };

const ghost = new Ghost(GhostFrame.Orange, 0, 0);
let lost = false;
let won = false;
let points = 0;

export const dx = 70;
export const dy = 10;

const level: Tile[][] = [];

new p5((pp: p5) => {
  pp.setup = setup;
  pp.draw = draw;
  pp.keyPressed = keyPressed;
  p = pp;
});

function setup() {
  p.createCanvas(window.innerWidth - 20, window.innerHeight - 50);
  images = p.loadImage('https://i.ibb.co/zSyWRdQ/isometric.png');
  font = p.loadFont('https://cddataexchange.blob.core.windows.net/images/space-race/Lobster-Regular.ttf');

  for (let y = 0; y < SIDE_LENGTH; y++) {
    const row: Tile[] = [];
    level.push(row);
    for (let x = 0; x < SIDE_LENGTH; x++) {
      {
        let tileName = getRandomTileName();
        const randFrame = TileFrame[tileName];

        let decoFrame = DecorationFrame.None;
        if (tileName.endsWith('Sunken')) {
          decoFrame = getRandomValueDecoration();
        } else if (tileName.startsWith('Green')) {
          decoFrame = getRandomDecoration();
        }
        row.push(new Tile(randFrame, decoFrame));
      }
    }
  }

  removeInvalidBridgeDirections(level);

  const tileHeight = getTileHeight() + dy;
  translation = { x: p.width / SCALE / 2, y: tileHeight };
  shift = { x: 0, y: 0 };
}

function draw() {
  p.background('white');
  p.textFont(font);
  p.textSize(100);
  p.fill('black');

  p.scale(SCALE, SCALE);

  p.push();
  const tileWidth = getTileWidth() + dx;
  const tileHeight = getTileHeight() + dy;

  won = level.filter((row) => row.filter((t) => getDecorationValue(t.decoration) > 0).length > 0).length === 0;

  p.imageMode(p.CENTER);

  if (shift.y > 0) {
    translation.y += SCROLL_SPEED;
    shift.y -= SCROLL_SPEED;
  } else if (shift.y < 0) {
    translation.y -= SCROLL_SPEED;
    shift.y += SCROLL_SPEED;
  }
  if (shift.x > 0) {
    translation.x += SCROLL_SPEED;
    shift.x -= SCROLL_SPEED;
  } else if (shift.x < 0) {
    translation.x -= SCROLL_SPEED;
    shift.x += SCROLL_SPEED;
  }

  p.translate(translation.x, translation.y);
  for (let y = 0; y < SIDE_LENGTH; y++) {
    for (let x = 0; x < SIDE_LENGTH; x++) {
      if (level[y][x]) {
        p.push();
        let tilePosX = ((x - y) * tileWidth) / 2;
        let tilePosY = ((x + y) * tileHeight) / 2;
        p.translate(tilePosX, tilePosY);
        level[y][x].draw();

        if (y === ghost.position.y && x === ghost.position.x) {
          ghost.draw();

          if (shift.y === 0) {
            if (tilePosY + translation.y + shift.y > (p.height / SCALE) * (1 - SCROLL_BORDER)) {
              shift.y -= SHIFT;
            } else if (tilePosY + translation.y + shift.y < (p.height / SCALE) * SCROLL_BORDER) {
              shift.y += SHIFT;
            }
          }

          if (shift.x === 0) {
            if (tilePosX + translation.x > (p.width / SCALE) * (1 - SCROLL_BORDER)) {
              shift.x -= SHIFT;
            } else if (tilePosX + translation.x < (p.width / SCALE) * SCROLL_BORDER) {
              shift.x += SHIFT;
            }
          }
        }

        if ((lost || won) && y === ghost.position.y && x === ghost.position.x) {
          p.push();
          p.textAlign(p.CENTER, p.CENTER);
          p.text(lost ? 'Lost!' : 'Won!', dx / 2, dy / 2 - 100);
          p.pop();
        }
        p.pop();
      }
    }
  }

  p.pop();

  p.textAlign(p.LEFT, p.TOP);
  p.text(`Points: ${points.toString()}`, 50, 50);
}

function keyPressed() {
  if (lost || won) {
    return;
  }

  let moveX = 0,
    moveY = 0;
  if (p.keyCode == 37) {
    moveX = -1;
  } else if (p.keyCode == 38) {
    moveY = -1;
  } else if (p.keyCode == 39) {
    moveX = 1;
  } else if (p.keyCode == 40) {
    moveY = 1;
  }

  let newPosition: Position = { x: ghost.position.x + moveX, y: ghost.position.y + moveY };
  if (canGoTo(newPosition)) {
    ghost.position = { ...newPosition };

    const target = level[newPosition.y][newPosition.x];
    const value = getDecorationValue(target.decoration);
    if (value > 0) {
      points += value;
      target.decoration = DecorationFrame.None;
    }
  }
}

export function canGoTo(position: Position): boolean {
  if (position.x >= 0 && position.y >= 0 && position.x < SIDE_LENGTH && position.y < SIDE_LENGTH) {
    return level[position.y][position.x].acceptsGhost;
  }

  return false;
}
