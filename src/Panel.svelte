<script lang="ts">
  import { css } from "./ui/utils";

  type Pin = "UL" | "UR" | "LL" | "LR";
  type Pos = {
    x?: number;
    y?: number;
    pin?: Pin;
    h: number;
    w: number;
  };
  export let pos: Pos = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  };
  let style = css({
    width: pos.w,
    height: pos.h,
    top: pos.y || 0,
    left: pos.x || 0,
  });
</script>

<main {style}>
  <slot />
</main>

<style>
  main {
    background: white;
    height: 300px;
    width: 200px;
    border-radius: 10px;
    position: fixed;
    z-index: 3000;
  }
</style>
