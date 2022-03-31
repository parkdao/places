<script>
  // import Button from "../ui/Button.svelte";
  import * as near from "../near";
  import Me from "./Me.svelte";
  import { Globe } from "phosphor-svelte";
  function login() {
    near.connectAndSignIn();
  }
  function nav() {
    window.location.assign("https://parkdao.xyz/world");
  }
</script>

<header>
  <div />
  <div class="righty">
    <button on:click={nav}>
      <Globe size="1rem" />
    </button>
    <Me />
  </div>
  <!-- <Button on:click={login}>LOGIN</Button> -->
</header>

<style>
  header {
    width: 100%;
    height: 60px;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .righty {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  button {
    margin-right: 1rem;
  }
  button {
    border: 2px solid white;
    border-radius: 1.18rem;
    height: 2.36rem;
    display: flex;
    align-items: center;
    outline: none;
    padding: 0 1rem;
    cursor: pointer;
    background: transparent;
    color: white;
  }
  button svg {
    fill: black;
    height: 1.4rem;
    width: 1.4rem;
    margin-left: 0.8rem;
  }
  button:hover {
    color: #1e2429;
    background: white;
  }
  button:hover svg {
    fill: white;
  }
</style>
