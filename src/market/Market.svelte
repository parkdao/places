<script lang="ts">
  import { onMount } from "svelte";
  import Topbar from "./Topbar.svelte";
  import { init as initNear, api } from "../near";
  import { sales, me } from "../store/near";
  import Tile from "./Tile2.svelte";
  import Buy from "./Buy.svelte";
  import Create from "./Create.svelte";

  // limit to 1 nft per user?
  // receiver_id on mint nft
  // bid auto settles if past exp and >

  onMount(async () => {
    await initNear();
    const s = await api.market.get_all_sales();
    console.log("SALES", s);
    sales.set(s);
  });

  let terrain = 0;
  function onSelectTerrain(i: number) {
    terrain = i;
  }
</script>

<main>
  <Topbar />
  <Tile {terrain} {onSelectTerrain} />
  <Buy {terrain} />
  <Create {terrain} />
</main>

<style>
  main {
    position: relative;
    z-index: 1000;
    width: 100%;
  }
</style>
