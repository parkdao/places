<script>
  import { onMount } from "svelte";
  import Mesh from "../mesh";
  const { Model, World, Player, initScene } = Mesh;

  const pod1 = new Model(0, 0);
  const world = new World();
  const podling = new Player();

  onMount(async () => {
    const s = initScene();
    await pod1.init("pod");
    await world.init(2);
    await podling.init("podling");
    s.registerBeforeRender(() => podling.loop());
  });
</script>

<style>
</style>
