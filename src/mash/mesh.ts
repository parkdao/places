import { Position, polarToCoords } from "./position";

export interface Coords {
  x: number;
  z: number;
  height?: number;
}

export default class Mesh {
  public meshes: any[];
  public enabled: boolean;
  public pos: Position;
  public coords: Coords;
  public rotation: number;

  constructor(p: Position, r?: number) {
    this.meshes = [];
    this.pos = p;
    this.coords = polarToCoords(p);
    this.rotation = r || 0;
    return this;
  }

  public setEnabled(b: boolean) {
    this.enabled = b;
    if (this.meshes.length > 0) {
      this.meshes.forEach((m) => {
        m.setEnabled(b);
      });
    }
  }

  toggleEnabled() {
    this.enabled = !this.enabled;
    if (this.meshes.length > 0) {
      this.meshes.forEach((m) => {
        m.setEnabled(this.enabled);
      });
    }
  }
}
