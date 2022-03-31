<script lang="ts">
  import Vid from "./vid";
  export let onJoin = () => {};
</script>

<section class="centered">
  <div class="panel">
    <svelte:component this={Vid.Mirror} on:done={onJoin} />
  </div>
</section>

<style>
  .centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
  }
  .panel {
    padding: 28px 18px;
    background: whitesmoke;
    border-radius: 1rem;
  }
</style>
