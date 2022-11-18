import { dx, dy, p, SIDE_LENGTH } from ".";
import { DecorationFrame, drawItem, TileFrame } from "./spritesheet";

const tileMap = new Map([
  ['Empt', TileFrame.Empty], // Empty, no tile
  ['Gren', TileFrame.Green], // Green grass
  ['GrSu', TileFrame.GreenSunken], // Green grass (sunken, ideal for adding decoration)
  ['GrEa', TileFrame.GreenEarth], // Green grass with earth
  ['Snow', TileFrame.Snow], // Snow
  ['SnSu', TileFrame.SnowSunken], // Snow (sunken, ideal for adding decoration)
  ['SnSt', TileFrame.SnowStone], // Snow with small stone
  ['SnSs', TileFrame.SnowStones], // Snow with multiple small stones
  ['SnBc', TileFrame.SnowStoneBlock], // Snow with small stone block
  ['Wood', TileFrame.Bridge1], // Wood
  ['Brdg', TileFrame.Bridge2], // Wooden bridge
]);

const decoMap = new Map([
  ['None', DecorationFrame.None], // No decoration
  ['01Pi', DecorationFrame.Pink1], // Pink numbers (1 to 10)
  ['02Pi', DecorationFrame.Pink2],
  ['03Pi', DecorationFrame.Pink3],
  ['04Pi', DecorationFrame.Pink4],
  ['05Pi', DecorationFrame.Pink5],
  ['06Pi', DecorationFrame.Pink6],
  ['07Pi', DecorationFrame.Pink7],
  ['08Pi', DecorationFrame.Pink8],
  ['09Pi', DecorationFrame.Pink9],
  ['10Pi', DecorationFrame.Pink10],

  ['01Bw', DecorationFrame.Brown1], // Brown numbers (1 to 10)
  ['02Bw', DecorationFrame.Brown2],
  ['03Bw', DecorationFrame.Brown3],
  ['04Bw', DecorationFrame.Brown4],
  ['05Bw', DecorationFrame.Brown5],
  ['06Bw', DecorationFrame.Brown6],
  ['07Bw', DecorationFrame.Brown7],
  ['08Bw', DecorationFrame.Brown8],
  ['09Bw', DecorationFrame.Brown9],
  ['10Bw', DecorationFrame.Brown10],

  ['Bush', DecorationFrame.Bush], // Brown bush
  ['Flow', DecorationFrame.Flower], // Small flower
  ['Ston', DecorationFrame.BigStone], // Big stone
  ['SnTr', DecorationFrame.SnowTree], // Large snowy tree
  ['GrTr', DecorationFrame.Tree], // Large tree
]);

export class Tile {
  constructor(public tile: TileFrame, public decoration: DecorationFrame) { }

  public draw() {
    if (this.tile) {
      drawItem(this.tile, dx / 2, dy / 2, this.decoration);
    }
  }

  get acceptsGhost() {
    return this.tile !== TileFrame.Empty &&
      this.decoration !== DecorationFrame.Tree &&
      this.decoration !== DecorationFrame.SnowTree &&
      this.decoration !== DecorationFrame.BigStone;
  }
}

export function getRandomTileName(withEmpty: boolean = false): string {
  const tileFrameKeys = Object.keys(TileFrame);
  let tileName: string = '';
  while (tileName === '' || (tileName === 'Empty' && !withEmpty)) {
    tileName = tileFrameKeys[Math.floor(p.random(0, tileFrameKeys.length))];
  }

  return tileName;
}

export function getRandomValueDecoration(): DecorationFrame {
  return DecorationFrame[`${p.random(0, 1) > 0.5 ? 'Brown' : 'Pink'}${Math.floor(p.random(1, 11))}`];
}

export function removeInvalidBridgeDirections(level: Tile[][]) {
  for (let y = 0; y < SIDE_LENGTH; y++) {
    for (let x = 0; x < SIDE_LENGTH; x++) {
      if (level[y][x].tile === TileFrame.Bridge2) {
        if (y > 0) {
          level[y - 1][x].tile = TileFrame.Empty;
        }
        if (y < SIDE_LENGTH - 1) {
          level[y + 1][x].tile = TileFrame.Empty;
        }
      }
    }
  }
}

export function getRandomDecoration(): DecorationFrame {
  if (p.random(0, 1) > 0.9) {
    return DecorationFrame.Tree;
  } else if (p.random(0, 1) > 0.9) {
    return DecorationFrame.SnowTree;
  } else if (p.random(0, 1) > 0.85) {
    return DecorationFrame.Flower;
  } else if (p.random(0, 1) > 0.85) {
    return DecorationFrame.Bush;
  }

  return DecorationFrame.None;
}

export function parseLevel(level: string): Tile[][] {
  const tiles: Tile[][] = [];

  level = level.trim();
  level.split('\n').forEach((l) => {
    l = l.trim();
    while (l.indexOf('  ') != -1) {
      l = l.replaceAll('  ', ' ');
    }

    const tileRow: Tile[] = [];

    l.split(' ').forEach((t) => {
      const tileDeco = t.trim().split('+');
      tileRow.push(new Tile(tileMap.get(tileDeco[0]), decoMap.get(tileDeco[1])));
    });

    tiles.push(tileRow);
  });

  return tiles;
}