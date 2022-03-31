<script lang="ts">
  import router from "page";
  import "carbon-components-svelte/css/g100.css";
  import "./ui/GlobalStyles.svelte";
  import Main from "./Main.svelte";
  import Playground from "./Playground.svelte";
  import Market from "./market/Market.svelte";
  import World from "./world/World.svelte";

  let page;

  router("/main", () => (page = Main));
  router("/playground", () => (page = Playground));
  router("/world", () => (page = World));
  router("/", () => (page = Market));

  router.start();
</script>

<main>
  <svelte:component this={page} />
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap");

  main {
    font-family: Inter, sans-serif;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
</style>
