<script lang="ts">
  import { onMount } from "svelte";
  import Mesh from "../mesh";
  import Leva from "../3d/Leva.svelte";
  import { enumerate, Controls, controls } from "./controls";
  import { placements } from "./tiles";

  export let terrain = 0;
  export let onSelectTerrain = (i: number) => {};

  const hex = new Mesh.Hex(0, 0);
  const pod1 = new Mesh.Model(0, 0);
  const shapes: any[][] = placements.map((ps) => {
    return ps.map((p) => new Mesh.Model(p.pos.angle, p.pos.distance, p.rotate));
  });

  let inDebounce;
  function debounce(func, delay) {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  }

  function resetPlacement(index: number) {
    debounce(() => {
      onSelectTerrain(index);
    }, 99);
    terrain = index;
    for (let ii = 0; ii < shapes.length; ii++) {
      for (let i = 0; i < shapes[ii].length; i++) {
        if (ii !== index) {
          shapes[ii][i].setEnabled(false);
        } else {
          shapes[ii][i].setEnabled(true);
        }
      }
    }
  }

  function control(c: Controls) {
    // setCamera(c.Cam);
    pod1.setEnabled(c.Pod);
    hex.setBiome(c.Biome);
    resetPlacement(c.Range - 1);
  }

  onMount(async () => {
    const s = Mesh.initScene();
    await pod1.init("pod");
    await hex.init("forest");

    for (let ii = 0; ii < shapes.length; ii++) {
      for (let i = 0; i < shapes[ii].length; i++) {
        const ps = placements[ii];
        await shapes[ii][i].init(ps[i].kind);
        if (ii !== terrain) {
          shapes[ii][i].setEnabled(false);
        }
      }
    }
    // await nature.init("nature");
    controls.subscribe(control);
  });
</script>

<Leva controls={enumerate()} />

<style>
</style>
