import { images, p } from '.';

export enum TileFrame {
  Empty = '',
  Green = '26',
  GreenSunken = '27',
  GreenEarth = '28',
  Snow = '31',
  SnowSunken = '32',
  SnowStones = '33',
  SnowStone = '34',
  SnowStoneBlock = '35',
  Bridge1 = '36',
  Bridge2 = '37',
}

export enum DecorationFrame {
  None = '',
  Pink1 = '38',
  Pink2 = '39',
  Pink3 = '40',
  Pink4 = '41',
  Pink5 = '42',
  Pink6 = '43',
  Pink7 = '44',
  Pink8 = '45',
  Pink9 = '46',
  Pink10 = '47',

  Brown1 = '48',
  Brown2 = '49',
  Brown3 = '50',
  Brown4 = '51',
  Brown5 = '52',
  Brown6 = '53',
  Brown7 = '54',
  Brown8 = '55',
  Brown9 = '56',
  Brown10 = '57',

  Bush = '10',
  Flower = '16',
  BigStone = '21',
  Tree = '23',
  SnowTree = '22',
}

export enum GhostFrame {
  Orange = '14',
  Green = '13',
}

export function getTileWidth(): number {
  return getTileFrame(TileFrame.Green).frame.w;
}

export function getTileHeight(): number {
  return getTileFrame(TileFrame.Green).frame.h;
}

export function getDecorationValue(decoration: DecorationFrame): number {
  if (decoration >= DecorationFrame.Pink1 && decoration <= DecorationFrame.Pink10) {
    return parseInt(decoration) - parseInt(DecorationFrame.Pink1) + 1;
  }
  else if (decoration >= DecorationFrame.Brown1 && decoration <= DecorationFrame.Brown10) {
    return parseInt(decoration) - parseInt(DecorationFrame.Brown1) + 1;
  }

  return 0;
}

// Translations for decoration items
const NumberDy = -40;
const FlowerDy = -30;
const StoneDy = -60;
const TreeDy = -220;
const SnowTreeDy = -185;
const GhostDy = 100;

export function drawItem(tile: TileFrame, x: number, y: number, decoration?: DecorationFrame, width?: number, height?: number) {
  const itemFrame = getTileFrame(tile);
  p.image(
    images,
    x,
    y,
    width ?? itemFrame.sourceSize.w,
    height ?? itemFrame.sourceSize.h,
    itemFrame.frame.x,
    itemFrame.frame.y,
    itemFrame.frame.w,
    itemFrame.frame.h
  );

  if (decoration) {
    let dy = 0;
    if (
      (decoration >= DecorationFrame.Pink1 && decoration <= DecorationFrame.Pink10) ||
      (decoration >= DecorationFrame.Brown1 && decoration <= DecorationFrame.Brown10) ||
      decoration === DecorationFrame.Bush
    ) {
      dy = NumberDy;
    } else if (decoration === DecorationFrame.Flower) {
      dy = FlowerDy;
    } else if (decoration === DecorationFrame.BigStone) {
      dy = StoneDy;
    } else if (decoration === DecorationFrame.Tree) {
      dy = TreeDy;
    } else if (decoration === DecorationFrame.SnowTree) {
      dy = SnowTreeDy;
    }

    const itemFrame = getTileFrame(decoration);
    p.image(
      images,
      x,
      y + dy,
      width ?? itemFrame.sourceSize.w,
      height ?? itemFrame.sourceSize.h,
      itemFrame.frame.x,
      itemFrame.frame.y,
      itemFrame.frame.w,
      itemFrame.frame.h
    );
  }
}

export function drawGhost(ghost: GhostFrame, x: number, y: number, width?: number, height?: number) {
  const itemFrame = getTileFrame(ghost, 'ghost');
  p.image(
    images,
    x,
    y - GhostDy,
    width ?? itemFrame.sourceSize.w,
    height ?? itemFrame.sourceSize.h,
    itemFrame.frame.x,
    itemFrame.frame.y,
    itemFrame.frame.w,
    itemFrame.frame.h
  );
}

function getTileFrame(itemName: string, category?: string): Frame {
  return sprites.frames.filter((f) => f.filename === `${category ?? 'winter'} (${itemName}).png`)[0];
}

interface FrameCoords {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface SpriteSourceSize {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface SourceSize {
  w: number;
  h: number;
}

interface Frame {
  filename: string;
  frame: FrameCoords;
  rotated: boolean;
  trimmed: boolean;
  spriteSourceSize: SpriteSourceSize;
  sourceSize: SourceSize;
}

interface Size {
  w: number;
  h: number;
}

interface Meta {
  app: string;
  version: string;
  image: string;
  format: string;
  size: Size;
  scale: string;
}

interface SpriteFrames {
  frames: Frame[];
  meta: Meta;
}

const sprites: SpriteFrames = {
  frames: [
    {
      filename: 'ghost (10).png',
      frame: {
        x: 1,
        y: 1,
        w: 89,
        h: 99,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 89,
        h: 99,
      },
      sourceSize: {
        w: 89,
        h: 99,
      },
    },
    {
      filename: 'ghost (11).png',
      frame: {
        x: 92,
        y: 1,
        w: 89,
        h: 110,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 89,
        h: 110,
      },
      sourceSize: {
        w: 89,
        h: 110,
      },
    },
    {
      filename: 'ghost (12).png',
      frame: {
        x: 183,
        y: 1,
        w: 89,
        h: 99,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 89,
        h: 99,
      },
      sourceSize: {
        w: 89,
        h: 99,
      },
    },
    {
      filename: 'ghost (13).png',
      frame: {
        x: 274,
        y: 1,
        w: 124,
        h: 207,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 124,
        h: 207,
      },
      sourceSize: {
        w: 124,
        h: 207,
      },
    },
    {
      filename: 'ghost (14).png',
      frame: {
        x: 400,
        y: 1,
        w: 148,
        h: 150,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 148,
        h: 150,
      },
      sourceSize: {
        w: 148,
        h: 150,
      },
    },
    {
      filename: 'ghost (15).png',
      frame: {
        x: 550,
        y: 1,
        w: 101,
        h: 177,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 101,
        h: 177,
      },
      sourceSize: {
        w: 101,
        h: 177,
      },
    },
    {
      filename: 'ghost (16).png',
      frame: {
        x: 653,
        y: 1,
        w: 138,
        h: 251,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 138,
        h: 251,
      },
      sourceSize: {
        w: 138,
        h: 251,
      },
    },
    {
      filename: 'ghost (17).png',
      frame: {
        x: 793,
        y: 1,
        w: 188,
        h: 329,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 329,
      },
      sourceSize: {
        w: 188,
        h: 329,
      },
    },
    {
      filename: 'ghost (18).png',
      frame: {
        x: 983,
        y: 1,
        w: 42,
        h: 69,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 42,
        h: 69,
      },
      sourceSize: {
        w: 42,
        h: 69,
      },
    },
    {
      filename: 'ghost (19).png',
      frame: {
        x: 1027,
        y: 1,
        w: 55,
        h: 96,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 55,
        h: 96,
      },
      sourceSize: {
        w: 55,
        h: 96,
      },
    },
    {
      filename: 'ghost (1).png',
      frame: {
        x: 1084,
        y: 1,
        w: 94,
        h: 113,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 94,
        h: 113,
      },
      sourceSize: {
        w: 94,
        h: 113,
      },
    },
    {
      filename: 'ghost (20).png',
      frame: {
        x: 1180,
        y: 1,
        w: 77,
        h: 68,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 77,
        h: 68,
      },
      sourceSize: {
        w: 77,
        h: 68,
      },
    },
    {
      filename: 'ghost (21).png',
      frame: {
        x: 1259,
        y: 1,
        w: 193,
        h: 368,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 193,
        h: 368,
      },
      sourceSize: {
        w: 193,
        h: 368,
      },
    },
    {
      filename: 'ghost (22).png',
      frame: {
        x: 1454,
        y: 1,
        w: 339,
        h: 242,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 339,
        h: 242,
      },
      sourceSize: {
        w: 339,
        h: 242,
      },
    },
    {
      filename: 'ghost (23).png',
      frame: {
        x: 1795,
        y: 1,
        w: 87,
        h: 408,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 87,
        h: 408,
      },
      sourceSize: {
        w: 87,
        h: 408,
      },
    },
    {
      filename: 'ghost (24).png',
      frame: {
        x: 1,
        y: 245,
        w: 270,
        h: 242,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 242,
      },
      sourceSize: {
        w: 270,
        h: 242,
      },
    },
    {
      filename: 'ghost (25).png',
      frame: {
        x: 273,
        y: 245,
        w: 270,
        h: 243,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 243,
      },
      sourceSize: {
        w: 270,
        h: 243,
      },
    },
    {
      filename: 'ghost (26).png',
      frame: {
        x: 983,
        y: 245,
        w: 270,
        h: 201,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 201,
      },
      sourceSize: {
        w: 270,
        h: 201,
      },
    },
    {
      filename: 'ghost (27).png',
      frame: {
        x: 1454,
        y: 245,
        w: 269,
        h: 201,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 269,
        h: 201,
      },
      sourceSize: {
        w: 269,
        h: 201,
      },
    },
    {
      filename: 'ghost (28).png',
      frame: {
        x: 545,
        y: 411,
        w: 270,
        h: 242,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 242,
      },
      sourceSize: {
        w: 270,
        h: 242,
      },
    },
    {
      filename: 'ghost (29).png',
      frame: {
        x: 1725,
        y: 411,
        w: 270,
        h: 243,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 243,
      },
      sourceSize: {
        w: 270,
        h: 243,
      },
    },
    {
      filename: 'ghost (2).png',
      frame: {
        x: 1884,
        y: 1,
        w: 87,
        h: 165,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 87,
        h: 165,
      },
      sourceSize: {
        w: 87,
        h: 165,
      },
    },
    {
      filename: 'ghost (30).png',
      frame: {
        x: 1,
        y: 656,
        w: 270,
        h: 201,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 201,
      },
      sourceSize: {
        w: 270,
        h: 201,
      },
    },
    {
      filename: 'ghost (31).png',
      frame: {
        x: 273,
        y: 656,
        w: 270,
        h: 201,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 201,
      },
      sourceSize: {
        w: 270,
        h: 201,
      },
    },
    {
      filename: 'ghost (32).png',
      frame: {
        x: 545,
        y: 656,
        w: 269,
        h: 201,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 269,
        h: 201,
      },
      sourceSize: {
        w: 269,
        h: 201,
      },
    },
    {
      filename: 'ghost (33).png',
      frame: {
        x: 816,
        y: 656,
        w: 269,
        h: 201,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 269,
        h: 201,
      },
      sourceSize: {
        w: 269,
        h: 201,
      },
    },
    {
      filename: 'ghost (34).png',
      frame: {
        x: 1087,
        y: 656,
        w: 270,
        h: 201,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 201,
      },
      sourceSize: {
        w: 270,
        h: 201,
      },
    },
    {
      filename: 'ghost (35).png',
      frame: {
        x: 1359,
        y: 656,
        w: 270,
        h: 201,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 201,
      },
      sourceSize: {
        w: 270,
        h: 201,
      },
    },
    {
      filename: 'ghost (36).png',
      frame: {
        x: 817,
        y: 448,
        w: 284,
        h: 178,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 284,
        h: 178,
      },
      sourceSize: {
        w: 284,
        h: 178,
      },
    },
    {
      filename: 'ghost (37).png',
      frame: {
        x: 1631,
        y: 656,
        w: 259,
        h: 164,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 259,
        h: 164,
      },
      sourceSize: {
        w: 259,
        h: 164,
      },
    },
    {
      filename: 'ghost (38).png',
      frame: {
        x: 1255,
        y: 411,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (39).png',
      frame: {
        x: 1631,
        y: 822,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (3).png',
      frame: {
        x: 1884,
        y: 168,
        w: 87,
        h: 165,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 87,
        h: 165,
      },
      sourceSize: {
        w: 87,
        h: 165,
      },
    },
    {
      filename: 'ghost (40).png',
      frame: {
        x: 1,
        y: 965,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (41).png',
      frame: {
        x: 191,
        y: 965,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (42).png',
      frame: {
        x: 381,
        y: 965,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (43).png',
      frame: {
        x: 571,
        y: 965,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (44).png',
      frame: {
        x: 761,
        y: 965,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (45).png',
      frame: {
        x: 951,
        y: 965,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (46).png',
      frame: {
        x: 1141,
        y: 965,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (47).png',
      frame: {
        x: 1331,
        y: 965,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (48).png',
      frame: {
        x: 1521,
        y: 965,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (49).png',
      frame: {
        x: 1711,
        y: 965,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (4).png',
      frame: {
        x: 1892,
        y: 656,
        w: 87,
        h: 165,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 87,
        h: 165,
      },
      sourceSize: {
        w: 87,
        h: 165,
      },
    },
    {
      filename: 'ghost (50).png',
      frame: {
        x: 1,
        y: 1108,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (51).png',
      frame: {
        x: 191,
        y: 1108,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (52).png',
      frame: {
        x: 381,
        y: 1108,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (53).png',
      frame: {
        x: 571,
        y: 1108,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (54).png',
      frame: {
        x: 761,
        y: 1108,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (55).png',
      frame: {
        x: 951,
        y: 1108,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (56).png',
      frame: {
        x: 1141,
        y: 1108,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (57).png',
      frame: {
        x: 1331,
        y: 1108,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'ghost (58).png',
      frame: {
        x: 1521,
        y: 1108,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'ghost (59).png',
      frame: {
        x: 1712,
        y: 1108,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'ghost (5).png',
      frame: {
        x: 1901,
        y: 823,
        w: 87,
        h: 166,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 87,
        h: 166,
      },
      sourceSize: {
        w: 87,
        h: 166,
      },
    },
    {
      filename: 'ghost (60).png',
      frame: {
        x: 1,
        y: 1251,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'ghost (61).png',
      frame: {
        x: 192,
        y: 1251,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'ghost (62).png',
      frame: {
        x: 383,
        y: 1251,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'ghost (63).png',
      frame: {
        x: 574,
        y: 1251,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'ghost (64).png',
      frame: {
        x: 765,
        y: 1251,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'ghost (65).png',
      frame: {
        x: 956,
        y: 1251,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'ghost (66).png',
      frame: {
        x: 1147,
        y: 1251,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'ghost (67).png',
      frame: {
        x: 1338,
        y: 1251,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'ghost (6).png',
      frame: {
        x: 1529,
        y: 1251,
        w: 153,
        h: 138,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 153,
        h: 138,
      },
      sourceSize: {
        w: 153,
        h: 138,
      },
    },
    {
      filename: 'ghost (7).png',
      frame: {
        x: 1684,
        y: 1251,
        w: 160,
        h: 129,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 160,
        h: 129,
      },
      sourceSize: {
        w: 160,
        h: 129,
      },
    },
    {
      filename: 'ghost (8).png',
      frame: {
        x: 1846,
        y: 1251,
        w: 126,
        h: 176,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 126,
        h: 176,
      },
      sourceSize: {
        w: 126,
        h: 176,
      },
    },
    {
      filename: 'ghost (9).png',
      frame: {
        x: 1903,
        y: 991,
        w: 65,
        h: 168,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 65,
        h: 168,
      },
      sourceSize: {
        w: 65,
        h: 168,
      },
    },
    {
      filename: 'winter (10).png',
      frame: {
        x: 817,
        y: 335,
        w: 99,
        h: 79,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 99,
        h: 79,
      },
      sourceSize: {
        w: 99,
        h: 79,
      },
    },
    {
      filename: 'winter (11).png',
      frame: {
        x: 1,
        y: 168,
        w: 65,
        h: 53,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 65,
        h: 53,
      },
      sourceSize: {
        w: 65,
        h: 53,
      },
    },
    {
      filename: 'winter (12).png',
      frame: {
        x: 68,
        y: 168,
        w: 76,
        h: 68,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 76,
        h: 68,
      },
      sourceSize: {
        w: 76,
        h: 68,
      },
    },
    {
      filename: 'winter (13).png',
      frame: {
        x: 146,
        y: 168,
        w: 58,
        h: 58,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 58,
        h: 58,
      },
      sourceSize: {
        w: 58,
        h: 58,
      },
    },
    {
      filename: 'winter (14).png',
      frame: {
        x: 918,
        y: 335,
        w: 43,
        h: 88,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 43,
        h: 88,
      },
      sourceSize: {
        w: 43,
        h: 88,
      },
    },
    {
      filename: 'winter (15).png',
      frame: {
        x: 400,
        y: 168,
        w: 80,
        h: 35,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 80,
        h: 35,
      },
      sourceSize: {
        w: 80,
        h: 35,
      },
    },
    {
      filename: 'winter (16).png',
      frame: {
        x: 206,
        y: 168,
        w: 62,
        h: 71,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 62,
        h: 71,
      },
      sourceSize: {
        w: 62,
        h: 71,
      },
    },
    {
      filename: 'winter (17).png',
      frame: {
        x: 482,
        y: 168,
        w: 63,
        h: 71,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 63,
        h: 71,
      },
      sourceSize: {
        w: 63,
        h: 71,
      },
    },
    {
      filename: 'winter (18).png',
      frame: {
        x: 1,
        y: 1429,
        w: 168,
        h: 90,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 168,
        h: 90,
      },
      sourceSize: {
        w: 168,
        h: 90,
      },
    },
    {
      filename: 'winter (19).png',
      frame: {
        x: 983,
        y: 168,
        w: 42,
        h: 70,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 42,
        h: 70,
      },
      sourceSize: {
        w: 42,
        h: 70,
      },
    },
    {
      filename: 'winter (1).png',
      frame: {
        x: 171,
        y: 1429,
        w: 87,
        h: 161,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 87,
        h: 161,
      },
      sourceSize: {
        w: 87,
        h: 161,
      },
    },
    {
      filename: 'winter (20).png',
      frame: {
        x: 1821,
        y: 823,
        w: 54,
        h: 96,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 54,
        h: 96,
      },
      sourceSize: {
        w: 54,
        h: 96,
      },
    },
    {
      filename: 'winter (21).png',
      frame: {
        x: 260,
        y: 1429,
        w: 205,
        h: 153,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 205,
        h: 153,
      },
      sourceSize: {
        w: 205,
        h: 153,
      },
    },
    {
      filename: 'winter (22).png',
      frame: {
        x: 467,
        y: 1429,
        w: 236,
        h: 411,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 236,
        h: 411,
      },
      sourceSize: {
        w: 236,
        h: 411,
      },
    },
    {
      filename: 'winter (23).png',
      frame: {
        x: 705,
        y: 1429,
        w: 226,
        h: 463,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 226,
        h: 463,
      },
      sourceSize: {
        w: 226,
        h: 463,
      },
    },
    {
      filename: 'winter (24).png',
      frame: {
        x: 933,
        y: 1429,
        w: 270,
        h: 243,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 243,
      },
      sourceSize: {
        w: 270,
        h: 243,
      },
    },
    {
      filename: 'winter (25).png',
      frame: {
        x: 1205,
        y: 1429,
        w: 270,
        h: 242,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 242,
      },
      sourceSize: {
        w: 270,
        h: 242,
      },
    },
    {
      filename: 'winter (26).png',
      frame: {
        x: 1477,
        y: 1429,
        w: 270,
        h: 202,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 202,
      },
      sourceSize: {
        w: 270,
        h: 202,
      },
    },
    {
      filename: 'winter (27).png',
      frame: {
        x: 1,
        y: 1633,
        w: 270,
        h: 201,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 201,
      },
      sourceSize: {
        w: 270,
        h: 201,
      },
    },
    {
      filename: 'winter (28).png',
      frame: {
        x: 1477,
        y: 1633,
        w: 270,
        h: 202,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 202,
      },
      sourceSize: {
        w: 270,
        h: 202,
      },
    },
    {
      filename: 'winter (29).png',
      frame: {
        x: 1973,
        y: 1,
        w: 270,
        h: 243,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 243,
      },
      sourceSize: {
        w: 270,
        h: 243,
      },
    },
    {
      filename: 'winter (2).png',
      frame: {
        x: 545,
        y: 246,
        w: 87,
        h: 161,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 87,
        h: 161,
      },
      sourceSize: {
        w: 87,
        h: 161,
      },
    },
    {
      filename: 'winter (30).png',
      frame: {
        x: 1997,
        y: 246,
        w: 270,
        h: 242,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 242,
      },
      sourceSize: {
        w: 270,
        h: 242,
      },
    },
    {
      filename: 'winter (31).png',
      frame: {
        x: 1997,
        y: 490,
        w: 270,
        h: 202,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 202,
      },
      sourceSize: {
        w: 270,
        h: 202,
      },
    },
    {
      filename: 'winter (32).png',
      frame: {
        x: 1990,
        y: 694,
        w: 270,
        h: 201,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 201,
      },
      sourceSize: {
        w: 270,
        h: 201,
      },
    },
    {
      filename: 'winter (33).png',
      frame: {
        x: 1990,
        y: 897,
        w: 270,
        h: 203,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 203,
      },
      sourceSize: {
        w: 270,
        h: 203,
      },
    },
    {
      filename: 'winter (34).png',
      frame: {
        x: 1974,
        y: 1102,
        w: 270,
        h: 202,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 270,
        h: 202,
      },
      sourceSize: {
        w: 270,
        h: 202,
      },
    },
    {
      filename: 'winter (35).png',
      frame: {
        x: 1974,
        y: 1306,
        w: 269,
        h: 202,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 269,
        h: 202,
      },
      sourceSize: {
        w: 269,
        h: 202,
      },
    },
    {
      filename: 'winter (36).png',
      frame: {
        x: 1,
        y: 490,
        w: 258,
        h: 164,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 258,
        h: 164,
      },
      sourceSize: {
        w: 258,
        h: 164,
      },
    },
    {
      filename: 'winter (37).png',
      frame: {
        x: 1749,
        y: 1510,
        w: 325,
        h: 315,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 325,
        h: 315,
      },
      sourceSize: {
        w: 325,
        h: 315,
      },
    },
    {
      filename: 'winter (38).png',
      frame: {
        x: 261,
        y: 490,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'winter (39).png',
      frame: {
        x: 1445,
        y: 490,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'winter (3).png',
      frame: {
        x: 451,
        y: 490,
        w: 87,
        h: 161,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 87,
        h: 161,
      },
      sourceSize: {
        w: 87,
        h: 161,
      },
    },
    {
      filename: 'winter (40).png',
      frame: {
        x: 2076,
        y: 1510,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'winter (41).png',
      frame: {
        x: 273,
        y: 1653,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'winter (42).png',
      frame: {
        x: 2076,
        y: 1653,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'winter (43).png',
      frame: {
        x: 273,
        y: 1796,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'winter (44).png',
      frame: {
        x: 933,
        y: 1796,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'winter (45).png',
      frame: {
        x: 1124,
        y: 1796,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'winter (46).png',
      frame: {
        x: 2076,
        y: 1796,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'winter (47).png',
      frame: {
        x: 1,
        y: 1939,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'winter (48).png',
      frame: {
        x: 192,
        y: 1939,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'winter (49).png',
      frame: {
        x: 383,
        y: 1939,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'winter (4).png',
      frame: {
        x: 1103,
        y: 490,
        w: 87,
        h: 162,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 87,
        h: 162,
      },
      sourceSize: {
        w: 87,
        h: 162,
      },
    },
    {
      filename: 'winter (50).png',
      frame: {
        x: 574,
        y: 1939,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'winter (51).png',
      frame: {
        x: 764,
        y: 1939,
        w: 188,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 188,
        h: 141,
      },
      sourceSize: {
        w: 188,
        h: 141,
      },
    },
    {
      filename: 'winter (52).png',
      frame: {
        x: 954,
        y: 1939,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'winter (53).png',
      frame: {
        x: 1145,
        y: 1939,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'winter (54).png',
      frame: {
        x: 1336,
        y: 1939,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'winter (55).png',
      frame: {
        x: 1527,
        y: 1939,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'winter (56).png',
      frame: {
        x: 1718,
        y: 1939,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'winter (57).png',
      frame: {
        x: 1909,
        y: 1939,
        w: 189,
        h: 141,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 189,
        h: 141,
      },
      sourceSize: {
        w: 189,
        h: 141,
      },
    },
    {
      filename: 'winter (5).png',
      frame: {
        x: 2100,
        y: 1939,
        w: 173,
        h: 138,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 173,
        h: 138,
      },
      sourceSize: {
        w: 173,
        h: 138,
      },
    },
    {
      filename: 'winter (6).png',
      frame: {
        x: 2245,
        y: 1,
        w: 125,
        h: 176,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 125,
        h: 176,
      },
      sourceSize: {
        w: 125,
        h: 176,
      },
    },
    {
      filename: 'winter (7).png',
      frame: {
        x: 2269,
        y: 179,
        w: 45,
        h: 158,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 45,
        h: 158,
      },
      sourceSize: {
        w: 45,
        h: 158,
      },
    },
    {
      filename: 'winter (8).png',
      frame: {
        x: 2100,
        y: 2079,
        w: 161,
        h: 157,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 161,
        h: 157,
      },
      sourceSize: {
        w: 161,
        h: 157,
      },
    },
    {
      filename: 'winter (9).png',
      frame: {
        x: 2262,
        y: 694,
        w: 138,
        h: 107,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 138,
        h: 107,
      },
      sourceSize: {
        w: 138,
        h: 107,
      },
    },
  ],
  meta: {
    app: 'http://www.codeandweb.com/texturepacker',
    version: '1.0',
    image: 'spritesheet.png',
    format: 'RGBA8888',
    size: {
      w: 2401,
      h: 2237,
    },
    scale: '1',
  },
};
