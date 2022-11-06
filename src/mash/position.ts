import type { Coords } from "./mesh";

export interface Position {
  distance: number; // between 0 and 1
  angle: number; // between 0 and 360
  height?: number;
}

export const SIZE = 27.25;

export function polarToCoords(p: Position) {
  const x = Math.sin(toRadians(p.angle)) * p.distance;
  const z = Math.cos(toRadians(p.angle)) * p.distance;
  return { x, z, height: p.height };
}

export function toRadians(angle) {
  return angle * (Math.PI / 180);
}

export function toDegrees(angle) {
  return angle * (180 / Math.PI);
}
