import BABYLON from "./babylon";
import { scene } from "./scene";
import { keys } from "./keys";
// import type { AbstractMesh } from "@babylonjs/core";
import Mesh from "./mesh";
import type Input from "./inputController";

type Kinds = "podling";

const SPEED = 5;
const ROTATE_SPEED = 1.5;

interface Animations {
  JOG: any; //BABYLON.AnimationGroup;
  JUMP_FORWARD: any; //BABYLON.AnimationGroup;
  JUMP_UP: any; //BABYLON.AnimationGroup;
  STAND: any; //BABYLON.AnimationGroup;
}

export default class Player extends Mesh {
  anims: Animations;
  private _input: Input;
  private _h: number;
  private _v: number;

  constructor(distance: number, angle: number) {
    super({ distance, angle }, 0);
    return this;
  }

  beforeRenderUpdate() {
    if (this.meshes.length < 1) return;
    this._updateFromControls();
  }

  private _updateFromControls(): void {
    if (this.meshes.length === 0) return;

    this._h = this._input.horizontal; //x-axis
    this._v = this._input.vertical; //z-axis

    let player = this.meshes[0];
    let rotation = BABYLON.Vector3.Zero();
    if (player.rotationQuaternion) {
      rotation = player.rotationQuaternion.toEulerAngles();
    }

    const moveSpeed = 100 / SPEED;
    const rotateSpeed = ROTATE_SPEED / 20;
    if (this._v > 0) {
      this.anims.JOG.start();
      player.moveWithCollisions(
        new BABYLON.Vector3(
          parseFloat(Math.sin(rotation.y) as any) / moveSpeed,
          0,
          parseFloat(Math.cos(rotation.y) as any) / moveSpeed
        )
      );
    } else if (this._v < 0) {
      this.anims.JOG.stop();
      player.moveWithCollisions(
        new BABYLON.Vector3(
          parseFloat(Math.sin(rotation.y) as any) / -moveSpeed / 3,
          0,
          parseFloat(Math.cos(rotation.y) as any) / -moveSpeed / 3
        )
      );
    }
    if (this._h > 0) {
      player.rotate(BABYLON.Axis.Y, rotateSpeed, BABYLON.Space.WORLD);
    } else if (this._h < 0) {
      player.rotate(BABYLON.Axis.Y, -rotateSpeed, BABYLON.Space.WORLD);
    }
  }

  async init(kind: Kinds, input?: Input) {
    if (input) this._input = input;
    if (kind === "podling") {
      const { mesh, anims } = await createPodling();
      this.meshes = [mesh];
      this.anims = anims;
      return this;
    }
  }

  loop() {
    if (this.meshes.length > 0) {
      podlingLoop(this.meshes[0], this.anims);
    }
  }
}

export function createPodling(): Promise<{
  mesh: any; //BABYLON.AbstractMesh;
  anims: Animations;
}> {
  return new Promise((resolve, reject) => {
    BABYLON.SceneLoader.ImportMesh(
      "", // empty
      "/models/",
      "podling.glb",
      scene(),
      function (meshes, particles, skeletons, animationRanges) {
        const mesh = meshes[0];
        mesh.addRotation(0, 0, 0);
        // podl.rotate(BABYLON.Vector3.Up(), _r);
        mesh.position.y = 0.0;
        mesh.position.x = 0.0;
        mesh.position.z = 5;
        mesh.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);

        const anims: Animations = {
          JOG: animationRanges[0],
          JUMP_FORWARD: animationRanges[1],
          JUMP_UP: animationRanges[2],
          STAND: animationRanges[3],
        };

        anims.JOG.stop();
        anims.STAND.start();
        resolve({ mesh, anims });
      }
    );
  });
}

export function podlingLoop(podl: any, anims: Animations) {
  if (keys().UP || keys().DOWN) {
    var playerSpeed = 0.1;
    var gravity = 0;
    var x = playerSpeed * Math.sin(podl.rotation.y);
    var z = playerSpeed * Math.cos(podl.rotation.y);
    if (keys().UP) {
      var forwards = new BABYLON.Vector3(x, gravity, z);
      podl.moveWithCollisions(forwards);
      anims.JOG.start();
    } else {
      anims.JOG.stop();
    }
    if (keys().DOWN) {
      var backwards = new BABYLON.Vector3(-x, gravity, -z);
      podl.moveWithCollisions(backwards);
    }
  }
  if (keys().LEFT) {
    podl.rotate(BABYLON.Vector3.Up(), -0.05);
  }
  if (keys().RIGHT) {
    podl.rotate(BABYLON.Vector3.Up(), 0.05);
  }
  if (keys().SPACE) {
    anims.JUMP_FORWARD.start();
    setTimeout(() => {
      anims.JUMP_FORWARD.stop();
    }, 1000);
  }
}
