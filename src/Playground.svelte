<script lang="ts">
  import Mesh from "./mesh";
  import { onMount } from "svelte";
  import Leva from "./3d/Leva.svelte";
  import { enumerate, controls, Controls } from "./market/controls";

  console.log($controls);

  const pod1 = new Mesh.Model(0, 0);
  const hex = new Mesh.Hex(0, 0);

  function control(c: Controls) {
    // Mesh.setCamera(c.Cam);
    pod1.setEnabled(c.Pod);
    hex.setBiome(c.Biome);
  }

  onMount(async () => {
    Mesh.initScene();
    await pod1.init("pod");
    await hex.init("forest");
    controls.subscribe(control);
  });
</script>

<Leva controls={enumerate()} />

<style>
</style>
