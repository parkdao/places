// import "@babylonjs/loaders/glTF";
import BABYLON from "./babylon";
import * as keys from "./keys";
// import { ShadowGenerator, SpotLight, Vector3 } from "@babylonjs/core";

let sce = null;
let freeCam;
let isoCam;
let shadowGen;
export let nodeMaterial;

export function scene() {
  return sce;
}

export function camera() {
  return null;
}

export function shadowGenerator() {
  return shadowGen;
}

let switchCam: boolean = true;

export function setCamera(b: boolean) {
  if (b) {
    sce.activeCamera = freeCam;
  } else {
    sce.activeCamera = isoCam;
  }
  switchCam = b;
}

export function toggleCamera() {
  if (switchCam) {
    sce.activeCamera = freeCam;
  } else {
    sce.activeCamera = isoCam;
  }
  switchCam = !switchCam;
}

export function initScene() {
  console.log("INIT SCENE");
  // keyboard listeners
  keys.init();

  const canvas: any = document.getElementById("renderCanvas");
  if (!canvas) return;
  const engine: any = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    premultipliedAlpha: false,
  });
  createScene(canvas, engine);
  engine.runRenderLoop(function () {
    sce.render();
  });
  window.addEventListener("resize", function () {
    engine.resize();
  });
  return sce;
}

export function createScene(canvas, engine) {
  //create the scene
  sce = new BABYLON.Scene(engine);

  sce.ambientColor = new BABYLON.Color3(1, 1, 1);

  // create a new isometric camera
  isoCam = new BABYLON.TargetCamera(
    "isometricCamera",
    new BABYLON.Vector3(5, 5, 0),
    sce
  );
  isoCam.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
  isoCam.orthoTop = 10;
  isoCam.orthoBottom = -10;
  isoCam.orthoLeft = -10;
  isoCam.orthoRight = 10;

  // target the sphere with the camera
  // TO DO make this point at player using follow camera
  isoCam.setTarget(new BABYLON.Vector3(0, 0, 0));

  // This attaches the camera to the canvas
  isoCam.attachControl(canvas, true);

  // maintain size on resize
  sce.onBeforeRenderObservable.add(() => {
    const w = engine.getRenderWidth(),
      h = engine.getRenderHeight();
    isoCam.orthoLeft = (-10 * w) / h;
    isoCam.orthoTop = 10;
    isoCam.orthoRight = (10 * w) / h;
    isoCam.orthoBottom = -10;
  });

  // Create a free rotation camera
  // Creates, angles, distances and targets the camera
  freeCam = new BABYLON.ArcRotateCamera(
    "arcCamera",
    0,
    0,
    10,
    new BABYLON.Vector3(0, 0, -10),
    sce
  );

  freeCam.setPosition(new BABYLON.Vector3(0, 6, -7));

  freeCam.setTarget(new BABYLON.Vector3(0, 0, -0.5));

  // This attaches the camera to the canvas
  freeCam.attachControl(canvas, true);

  toggleCamera();

  var light = new BABYLON.DirectionalLight(
    "light1",
    new BABYLON.Vector3(0.5, -1, 0), // down
    sce
  );

  light.diffuse = new BABYLON.Color3(0.4, 0.6, 0.6);
  light.specular = new BABYLON.Color3(0.5, 0.2, 0.2);
  // light.groundColor = new BABYLON.Color3(0.2, 0.5, 0.2);
  light.intensity = 4;
  light.range = 10;
  light.shadowEnabled = true;

  shadowGen = new BABYLON.ShadowGenerator(128, light);
  shadowGen.useBlurExponentialShadowMap = true;
  shadowGen.useKernelBlur = true;
  shadowGen.blurKernel = 1;

  sce.environmentTexture = new BABYLON.CubeTexture("environment.env", sce);

  // sce.debugLayer.show();

  return sce;
}
