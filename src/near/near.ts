declare global {
  interface Window {
    NEAR: any;
  }
}

const NEAR = window.NEAR;

export default NEAR;
