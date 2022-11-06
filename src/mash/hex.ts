import BABYLON from "./babylon";
import { colors, colors3 } from "./colors";
import Mesh, { Coords } from "./mesh";
import { shadowGenerator } from "./scene";
import { dumbGrass, materialToonGrass } from "./materials";

export type Biome = "forest" | "tundra";

const colorz = {
  forest: [colors3()["brown"], colors3()["tilegreen"]],
  tundra: [colors3()["bluegrey"], colors3["white"]],
};

function createHex(biome: Biome, coords: Coords) {
  const { x, z } = coords;
  //top one
  const hex1 = BABYLON.MeshBuilder.CreateCylinder("hexTop", {
    height: 0.15,
    diameter: 6,
    tessellation: 6,
    faceColors: colorz[biome][1],
  });
  hex1.position.y = -0.05;
  hex1.position.x = x;
  hex1.position.z = z;
  hex1.receiveShadows = true;
  // hex1.material = dumbGrass();

  const hex2 = BABYLON.MeshBuilder.CreateCylinder("hexBottom", {
    height: 0.4,
    diameter: 6,
    tessellation: 6,
    faceColors: colorz[biome][0],
  });
  hex2.position.y = -0.32;
  hex2.position.x = x;
  hex2.position.z = z;

  return [hex1, hex2];
}

export default class Hex extends Mesh {
  biome: Biome = "forest";

  constructor(angle: number, distance: number) {
    super({ angle, distance });
    return this;
  }

  async init(biome: Biome) {
    this.biome = biome;
    const hexes = await createHex(biome, this.coords);
    this.meshes = hexes;
    return this;
  }

  async setBiome(biome: Biome) {
    if (this.biome === biome) return;
    this.biome = biome;
    this.meshes.forEach((m) => {
      m.dispose();
    });
    const hexes = await createHex(biome, this.coords);
    this.meshes = hexes;
  }
}
