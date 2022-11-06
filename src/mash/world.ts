import Model from "./model";
import type { Kinds } from "./models";

export default class World {
  tileSize: number;
  hexes: Model[];

  constructor() {
    this.tileSize = 1;
    this.hexes = [];
    return this;
  }

  async init(tiles: Kinds[][], tileSize: number) {
    this.tileSize = tileSize;
    this.hexes.push(new Model(0, 0));

    for (let l = 0; l < tiles.length; l++) {
      let layer = tiles[l];
      const angles = newArray(layer.length);
      for (let i = 0; i < angles.length; i++) {
        let tile = layer[i];
        let m = new Model(angles[i], this.tileSize * l);
        this.hexes.push(m);
        await m.init(tile);
      }
    }

    // const angles2 = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    // for (let i = 0; i < angles2.length; i++) {
    //   this.hexes.push(new Hex(angles2[i], SIZE * 2));
    // }

    // for (let i = 0; i < this.hexes.length; i++) {
    //   const h = await this.hexes[i].init("fullHex");
    // }
    return this;
  }
}

function newArray(l) {
  return Array.from({ length: l }, (_, i) => (i * 360) / l);
}
