import { writable } from "svelte/store";
import type { Biome } from "./hex";

// the starting values
const values: Controls = {
  Cam: true,
  Pod: true,
  Biome: "forest",
  Range: 1,
};

// the leva config
const config: Config = {
  Cam: {
    label: "Free Cam",
    value: values.Cam,
  },
  Pod: values.Pod,
  Biome: {
    value: values.Biome,
    options: ["forest", "tundra"],
  },
  Range: {
    min: 1,
    max: 5,
    step: 1,
    value: values.Range,
  },
};

export interface Controls {
  Cam: boolean;
  Pod: boolean;
  Biome: Biome;
  Range: number;
}

export const controls = writable<Controls>(values);

export interface Config {
  Cam: WithLabel;
  Pod: boolean;
  Biome: Select;
  Range: Range;
}

interface Range {
  value: number;
  min: number;
  max: number;
  step: number;
}
interface Select {
  value: any;
  options: any[];
}
interface WithLabel {
  value: any;
  label: string;
}

export function enumerate() {
  const ret: any = {};
  Object.entries(config).forEach(([k, v]) => {
    if (typeof v === "object") ret[k] = { ...v };
    else ret[k] = { value: v };
    ret[k].onChange = function (newValue) {
      controls.update((ctrl) => ({ ...ctrl, [k]: newValue }));
    };
  });
  return ret;
}
