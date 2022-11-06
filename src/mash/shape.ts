import BABYLON from "./babylon";
import Mesh, { Coords } from "./mesh";

type Form = "box" | "sphere" | "cone" | "cylinder";

function createShape(form: Form, coords: Coords, color) {
  let shape;
  const y = 0.2 + (coords.height || 0);
  console.log(coords, form, color, y);
  if (form == "box") {
    shape = BABYLON.Mesh.CreateBox("box1", 0.5);
    shape.position.y = y;
  } else if (form == "sphere") {
    shape = BABYLON.MeshBuilder.CreateSphere("sphere", {});
    shape.position.y = y;
  } else if (form == "cylinder") {
    shape = BABYLON.MeshBuilder.CreateCylinder("cylinder", {
      diameter: 0.15,
      height: 0.8,
      faceColors: color,
    });
    shape.position.y = y;
  } else if (form == "cone") {
    shape = BABYLON.MeshBuilder.CreateCylinder("cylinder", {
      diameterBottom: 0.63,
      diameterTop: 0,
      height: 1.4,
      faceColors: color,
      tessellation: 9,
    });
    shape.position.y = y;
  }
  const { x, z } = coords;
  shape.position.x = x;
  shape.position.z = z;
  shape.checkCollisions = true;
  // camera.lockedTarget = box1;
  return shape;
}

export default class Shape extends Mesh {
  form: Form = "sphere";

  constructor(angle: number, distance: number, height?: number) {
    super({ angle, distance, height });
    return this;
  }

  async init(form: Form, color) {
    this.form = form;
    return await createShape(form, this.coords, color);
  }
}
