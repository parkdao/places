export interface ModelConfig {
  path: string;
  file: string;
  scale: number;
  rotate?: number;
  shadow?: boolean;
  child?: number;
  offset?: number[];
}

const pre = "/models/import/";
const space = "https://art.parkdao.art/models/";

// https://creazilla.com/nodes/1423678-low-poly-nature-pack-3d-model
// https://www.turbosquid.com/3d-models/lowpoly-cartoon-fantasy-nature-asset-model-1830061

export type Kinds =
  | "pod"
  | "stone01"
  | "stone02"
  | "stone03"
  | "stone04"
  | "tree01"
  | "nature"
  | "tree_round"
  | "tree_cone"
  | "tree_pine1"
  | "tree_pine2"
  | "tree_pine3"
  | "tree_pine4"
  | "lgrock1"
  | "lgrock2"
  | "lgrock3"
  | "bush01"
  | "bush02"
  | "bush03"
  | "bush04"
  | "weed01"
  | "weed02"
  | "weed03"
  | "weedplant01"
  | "weedplant02"
  | "weedplant03"
  | "weedplant04"
  | "weedplant05"
  | "nopal"
  | "douglasFir01"
  | "douglasFir02"
  | "fern01"
  | "fullHex"
  | "sandtile"
  | "grassrock"
  | "snowrock"
  | "sonoran"
  | "tile1"
  | "tile2"
  | "tile3"
  | "tile4"
  | "tile5"
;

export const modelz: { [k: string]: ModelConfig } = {
  fullHex: {
    path: "/models/tiles/",
    file: "fullHex.glb",
    scale: 0.2,
    rotate: Math.PI / 6,
  },
  sandtile: {
    path: "/models/tiles/",
    file: "sandtile.glb",
    scale: 0.2,
    rotate: Math.PI / 6,
  },
  sonoran: {
    path: "/models/tiles/",
    file: "sonoran.glb",
    scale: 0.2,
    rotate: Math.PI / 6,
  },
  grassrock: {
    path: "/models/tiles/",
    file: "grassrock.glb",
    scale: 0.2,
    rotate: Math.PI / 6,
  },
  snowrock: {
    path: "/models/tiles/",
    file: "snowrock.glb",
    scale: 0.2,
    rotate: Math.PI / 6,
  },
  nopal: {
    path: pre + "nopal/",
    file: "Nopal_Big.gltf",
    scale: 0.45,
  },
  pod: {
    path: "/models/",
    file: "pod1.gltf",
    scale: 0.23,
    rotate: Math.PI * 1.25,
    shadow: true,
  },
  tree01: {
    path: pre + "town_trees/",
    file: "tree.glb",
    scale: 0.75,
  },
  tree_round: {
    path: pre,
    file: "nature.glb",
    scale: 0.25,
    child: 28,
    offset: [-4.2, -4.6],
  },
  tree_cone: {
    path: pre,
    file: "nature.glb",
    scale: 0.25,
    child: 29,
    offset: [-4.2, -4],
  },
  tree_pine1: {
    path: pre,
    file: "nature.glb",
    scale: 0.25,
    child: 30,
    offset: [-4.2, -3.125],
  },
  tree_pine2: {
    path: pre,
    file: "nature.glb",
    scale: 0.26,
    child: 31,
    offset: [-4.2, -2.25],
  },
  tree_pine3: {
    path: pre,
    file: "nature.glb",
    scale: 0.26,
    child: 32,
    offset: [-4.2, -1.5],
  },
  tree_pine4: {
    path: pre,
    file: "nature.glb",
    scale: 0.26,
    child: 33,
    offset: [-4.2, -0.5],
    // shadow: true,
  },
  lgrock1: {
    path: pre,
    file: "nature.glb",
    scale: 0.26,
    child: 12,
    offset: [-6, 3.7],
  },
  lgrock2: {
    path: pre,
    file: "nature.glb",
    scale: 0.26,
    child: 14,
    offset: [-6, 5.4],
  },
  lgrock3: {
    path: pre,
    file: "nature.glb",
    scale: 0.26,
    child: 15,
    offset: [-6, 6.3],
  },
  bush01: {
    path: pre + "nature/",
    file: "bush01.gltf",
    scale: 0.46,
  },
  bush02: {
    path: pre + "nature/",
    file: "bush02.gltf",
    scale: 0.46,
  },
  bush03: {
    path: pre + "nature/",
    file: "bush03.gltf",
    scale: 0.46,
  },
  bush04: {
    path: pre + "nature/",
    file: "bush04.gltf",
    scale: 0.46,
  },
  stone01: {
    path: pre + "nature/",
    file: "stone01.gltf",
    scale: 0.5,
  },
  stone02: {
    path: pre + "nature/",
    file: "stone02.gltf",
    scale: 0.5,
  },
  stone03: {
    path: pre + "nature/",
    file: "stone03.gltf",
    scale: 0.5,
  },
  stone04: {
    path: pre + "nature/",
    file: "stone04.gltf",
    scale: 0.5,
  },
  weed01: {
    path: pre + "nature/",
    file: "weed01.gltf",
    scale: 0.5,
  },
  weed02: {
    path: pre + "nature/",
    file: "weed02.gltf",
    scale: 0.5,
  },
  weed03: {
    path: pre + "nature/",
    file: "weed03.gltf",
    scale: 0.5,
  },
  weedplant01: {
    path: pre + "nature/",
    file: "weedplant01.gltf",
    scale: 0.5,
  },
  weedplant02: {
    path: pre + "nature/",
    file: "weedplant02.gltf",
    scale: 0.5,
  },
  weedplant03: {
    path: pre + "nature/",
    file: "weedplant03.gltf",
    scale: 0.5,
  },
  weedplant04: {
    path: pre + "nature/",
    file: "weedplant04.gltf",
    scale: 0.5,
  },
  weedplant05: {
    path: pre + "nature/",
    file: "weedplant05.gltf",
    scale: 0.5,
  },
  douglasFir01: {
    path: pre + "biome-conForest/",
    file: "douglasFir01.glb",
    scale: 0.2,
    shadow: true,
  },
  douglasFir02: {
    path: pre + "biome-conForest/",
    file: "douglasFir02.glb",
    scale: 0.2,
    shadow: true,
  },
  fern01: {
    path: pre + "biome-conForest/",
    file: "conForest-fern.glb",
    scale: 0.04,
    shadow: true,
  },

  // new tiles
  tile1: {
    path: "/models/tiles/",
    file: "tile1.glb",
    scale: 0.2,
    rotate: Math.PI / 6,
    shadow: true,
  },

  tile2: {
    path: "/models/tiles/",
    file: "tile2.glb",
    scale: 0.2,
    rotate: Math.PI / 6,
    shadow: true,
  },

  tile3: {
    path: "/models/tiles/",
    file: "tile3.glb",
    scale: 0.2,
    rotate: Math.PI / 6,
    shadow: true,
  },

  tile4: {
    path: "/models/tiles/",
    file: "tile4.glb",
    scale: 0.2,
    rotate: Math.PI / 6,
    shadow: true,
  },

  tile5: {
    path: "/models/tiles/",
    file: "tile5.glb",
    scale: 0.2,
    rotate: Math.PI / 6,
    shadow: true,
  },
};

// pebble: 9
// smallrock: 10
// medrock: 11
// lgrock1: 12
// lgrock2: 13
// lgrock3: 14
// lgrock4: 15
// boulder1: 20
// balltree1: 25/26/27
// tree_1: 28
// tree_cone: 29
