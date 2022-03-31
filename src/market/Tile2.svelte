<script lang="ts">
  import { onMount } from "svelte";
  import Mesh from "../mesh";
  import Leva from "../3d/Leva.svelte";
  import { enumerate, Controls, controls } from "./controls";
  // import type { Kinds } from "../mash/models";

  export let terrain = 0;
  export let onSelectTerrain = (i: number) => {};

  const terrains: string[] = [
    "grassrock",
    "snowrock",
    "sandtile",
    "fullHex",
    "sonoran",
  ];
  const tiles: any[] = terrains.map((p) => new Mesh.Model(0, 0));

  let inDebounce;
  function debounce(func, delay) {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  }

  function setTile(index: number) {
    debounce(() => {
      onSelectTerrain(index);
    }, 99);
    terrain = index;
    for (let i = 0; i < terrains.length; i++) {
      tiles[i].setEnabled(i === terrain);
    }
  }

  function control(c: Controls) {
    // setCamera(c.Cam);
    // hex.setBiome(c.Biome);
    setTile(c.Range - 1);
  }

  onMount(async () => {
    const s = Mesh.initScene();
    // await hex.init("fullHex");
    for (let i = 0; i < tiles.length; i++) {
      await tiles[i].init(terrains[i]);
      if (i !== terrain) {
        tiles[i].setEnabled(false);
      }
    }
    // await nature.init("nature");
    controls.subscribe(control);
  });
</script>

<Leva controls={enumerate()} />

<style>
</style>
