const k = {
  LEFT: false,
  RIGHT: false,
  UP: false,
  DOWN: false,
  SPACE: false,
};

export function keys() {
  return k;
}

export function init() {
  document.addEventListener("keydown", (e) => {
    // console.log(e.code);
    if (e.code == "KeyW") {
      k.UP = true;
    }
    if (e.code == "KeyA") {
      k.LEFT = true;
    }
    if (e.code == "KeyS") {
      k.DOWN = true;
    }
    if (e.code == "KeyD") {
      k.RIGHT = true;
    }
    if (e.code == "Space") {
      k.SPACE = true;
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.code == "KeyW") {
      k.UP = false;
    }
    if (e.code == "KeyA") {
      k.LEFT = false;
    }
    if (e.code == "KeyS") {
      k.DOWN = false;
    }
    if (e.code == "KeyD") {
      k.RIGHT = false;
    }
    if (e.code == "Space") {
      k.SPACE = false;
    }
  });
}
