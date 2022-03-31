<script lang="ts">
  import { Globe } from "phosphor-svelte";
</script>

<button>
  <Globe size={24} weight="fill" />
</button>

<style>
  button {
    border: 2px solid white;
    border-radius: 1.18rem;
    height: 2.36rem;
    display: flex;
    align-items: center;
    outline: none;
    padding: 0 1rem;
    cursor: pointer;
  }
  button svg {
    fill: black;
    height: 1.4rem;
    width: 1.4rem;
    margin-left: 0.8rem;
  }
  button:hover {
    color: white;
    background: #1e2429;
  }
  button:hover svg {
    fill: white;
  }
</style>
