// import type { Kinds } from "../mash/models";

export interface Position {
  distance: number; // between 0 and 1
  angle: number; // between 0 and 360
  height?: number;
}

type Placements = Placement[];
interface Placement {
  kind: string;
  pos: Position;
  rotate?: number;
}
function pos(ns: number[]): Position {
  return { angle: ns[0], distance: ns[1] };
}

export const placements: Placements[] = [
  [
    // biome 1
    { kind: "douglasFir02", pos: pos([45, 2]) },
    { kind: "douglasFir02", pos: pos([289, 1.5]) },
    { kind: "douglasFir02", pos: pos([350, 2.25]) },
    { kind: "fern01", pos: pos([340, 1.2]), rotate: Math.PI },
    { kind: "fern01", pos: pos([324, 1.5]), rotate: Math.PI },
    { kind: "fern01", pos: pos([9, 1.9]), rotate: Math.PI },
    { kind: "fern01", pos: pos([182, 1]), rotate: Math.PI },
    { kind: "fern01", pos: pos([146, 2]), rotate: Math.PI },
    { kind: "fern01", pos: pos([32, 1.1]), rotate: Math.PI },
    { kind: "fern01", pos: pos([28, 1.7]), rotate: Math.PI },
    { kind: "fern01", pos: pos([140, 1]), rotate: Math.PI },
    { kind: "fern01", pos: pos([140, 1]), rotate: Math.PI },
  ],
  [
    { kind: "tree_pine3", pos: pos([10, 2]) },
    { kind: "tree_pine4", pos: pos([267, 1.5]) },
    { kind: "tree_pine4", pos: pos([299, 1.3]) },
    { kind: "stone03", pos: pos([40, 1.6]) },
    { kind: "bush01", pos: pos([95, 1.6]) },
    { kind: "bush02", pos: pos([120, 1.4]) },
    { kind: "bush03", pos: pos([104, 1.8]) },
  ],
  [
    { kind: "weed01", pos: pos([10, 2]) },
    { kind: "weed02", pos: pos([267, 1.5]) },
    { kind: "weed02", pos: pos([167, 1.5]) },
    { kind: "weed01", pos: pos([200, 1.5]) },
    { kind: "weed03", pos: pos([299, 1.3]) },
    { kind: "weedplant01", pos: pos([40, 1.6]) },
    { kind: "weedplant02", pos: pos([95, 1.6]) },
    { kind: "weedplant03", pos: pos([120, 1.4]) },
    { kind: "weedplant04", pos: pos([104, 1.8]) },
    { kind: "weedplant05", pos: pos([124, 1.2]) },
    { kind: "weedplant02", pos: pos([184, 1.3]) },
    { kind: "weedplant01", pos: pos([330, 1.7]) },
    { kind: "weedplant01", pos: pos([60, 2.0]) },
    { kind: "weedplant03", pos: pos([140, 2.4]) },
    { kind: "weedplant05", pos: pos([144, 2.2]) },
    { kind: "weedplant02", pos: pos([204, 2.3]) },

    { kind: "weedplant02", pos: pos([204, 2.3]) },
    { kind: "weedplant02", pos: pos([224, 1.4]) },
    { kind: "weedplant02", pos: pos([244, 2.1]) },
    { kind: "weedplant02", pos: pos([260, 1.8]) },
    { kind: "weedplant02", pos: pos([254, 1.0]) },
    { kind: "weedplant02", pos: pos([244, 1.9]) },
  ],
  [
    { kind: "tree_pine1", pos: pos([30, 2]) },
    { kind: "tree_pine2", pos: pos([167, 1.5]) },
    { kind: "tree_pine4", pos: pos([299, 1.2]) },
    { kind: "tree_pine4", pos: pos([260, 1.2]) },
    { kind: "tree_pine4", pos: pos([282, 1.8]) },
    { kind: "stone01", pos: pos([140, 1.6]) },
    { kind: "weedplant01", pos: pos([95, 1.6]) },
    { kind: "weedplant03", pos: pos([120, 1.4]) },
    { kind: "weedplant02", pos: pos([104, 1.8]) },
  ],
  [
    { kind: "bush04", pos: pos([90, 2]) },
    { kind: "bush02", pos: pos([57, 1.5]) },
    { kind: "bush03", pos: pos([199, 1.3]) },
    { kind: "stone01", pos: pos([140, 1.9]) },
    { kind: "stone02", pos: pos([195, 1.6]) },
    { kind: "stone03", pos: pos([20, 1.4]) },
    { kind: "stone04", pos: pos([84, 1.3]) },
    { kind: "tree_pine4", pos: pos([269, 1.2]) },
    { kind: "tree_pine4", pos: pos([230, 1.2]) },
    { kind: "tree_pine4", pos: pos([252, 1.8]) },
    { kind: "tree_pine4", pos: pos([290, 1.7]) },
    { kind: "tree_pine4", pos: pos([312, 1.8]) },
    { kind: "tree_pine4", pos: pos([342, 1.4]) },
  ],
];
