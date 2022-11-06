import BABYLON from "./babylon";
import { scene, shadowGenerator } from "./scene";
import Mesh, { Coords } from "./mesh";
import Shape from "./shape";
import { colors3 } from "./colors";
import type { Position } from "./position";
import { modelz, Kinds, ModelConfig } from "./models";

// https://creazilla.com/nodes/1423678-low-poly-nature-pack-3d-model
// https://creazilla.com/nodes/5113-fantasy-town-kit-3d-model
// ./FBX2glTF ./lowpoly_tree/fbx/tree.fbx

async function createTree(p: Position): Promise<any[]> {
  const cone = new Shape(p.angle, p.distance, 1);
  const trunk = new Shape(p.angle, p.distance);
  const c = await cone.init("cone", colors3()["green"]);
  const t = await trunk.init("cylinder", colors3()["saddlebrown"]);
  return [c, t];
}

function meshCallback(c: ModelConfig, ms, coords: Coords, rotation: number) {
  return ms.map((m) => {
    m.position.y = 0.0;
    const { x, z } = coords;
    m.position.x = c.offset ? x + c.offset[0] : x;
    m.position.z = c.offset ? z + c.offset[1] : z;
    const rot = rotation || c.rotate;
    if (rot) {
      m.addRotation(0, rot, 0);
    }
    m.scaling = new BABYLON.Vector3(c.scale, c.scale, c.scale);
    if (c.shadow) {
      shadowGenerator().addShadowCaster(m);
      shadowGenerator().useBlurExponentialShadowMap = true;
      shadowGenerator().getShadowMap().renderList.push(m);
      m.receiveShadows = true;
    }
    return m;
  });
}
function isNum(n) {
  return typeof n === "number";
}
function createModel(
  kind: Kinds,
  coords: Coords,
  rotation: number
): Promise<any[]> {
  const c = modelz[kind];
  return new Promise((resolve, reject) => {
    BABYLON.SceneLoader.ImportMesh(
      "", // empty
      c.path,
      c.file,
      scene(),
      function (ms) {
        let mesh = ms[0];
        if (isNum(c.child)) {
          const children = mesh.getChildren();
          children.forEach((child, i) => {
            if (i !== c.child) {
              child.dispose();
            }
          });
          // mesh = mesh.getChildren()[c.child];
        }
        const meshes = meshCallback(c, [mesh], coords, rotation);
        resolve(meshes);
      }
    );
  });
}

function createPod(coords: Coords) {
  return new Promise((resolve, reject) => {
    BABYLON.SceneLoader.ImportMesh(
      "", // empty
      "/models/",
      "pod1.gltf",
      scene(),
      function (meshes) {
        const pod1 = meshes[0];
        pod1.addRotation(0, Math.PI * 1.25, 0);
        pod1.position.y = 0.0;
        const { x, z } = coords;
        pod1.position.x = x;
        pod1.position.z = z;
        pod1.scaling = new BABYLON.Vector3(0.23, 0.23, 0.23);
        shadowGenerator().addShadowCaster(pod1);
        shadowGenerator().useExponentialShadowMap = true;
        pod1.receiveShadows = true;
        resolve(pod1);
      }
    );
  });
}

export default class Model extends Mesh {
  kind: Kinds = "pod";

  constructor(angle: number, distance: number, rotation?: number) {
    super({ angle, distance }, rotation);
    return this;
  }

  async init(kind: Kinds) {
    this.kind = kind;
    const meshes = await createModel(kind, this.coords, this.rotation);
    this.meshes = meshes;
    return this;
  }
}
