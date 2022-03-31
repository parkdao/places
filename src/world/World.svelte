<script lang="ts">
  import { onMount } from "svelte";
  import Mesh from "../mesh";
  import { init as initNear, api } from "../near";
  import Meet from "../video/Meet.svelte";

  let w = new Mesh.World();
  let podling = new Mesh.Player(0, 0);

  onMount(async () => {
    let s = Mesh.initScene();
    const layers: string[][] = [
      ["grassrock"],
      ["fullHex", "grassrock", "sonoran", "snowrock", "fullHex", "sandtile"],
    ];
    await w.init(layers, 5.65);

    podling.init("podling", new Mesh.Input(s, { isMobile: false }));

    s.registerBeforeRender(() => podling.beforeRenderUpdate());

    await initNear();
    const ps = await api.park.proposals();
    console.log("PROPOSALS", ps);
  });
</script>

<Meet />
