<script lang="ts">
  export let onClick = () => {};
  export let disabled = false;
  export let loading = false;
  export let text = "";
  export let width = 12;

  export const loadD =
    "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z";
</script>

<div
  on:click={onClick}
  class={disabled ? "disabled" : ""}
  style="width:{width}rem"
>
  <aside />
  <span>{text}</span>
  <aside>
    {#if loading}
      <svg class="loading" height={24} width={24} viewBox="0 0 1024 1024">
        <path d={loadD} />
      </svg>
    {/if}
  </aside>
</div>

<style>
  div {
    border: 2px solid white;
    border-radius: 0.3rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    width: 12rem;
  }
  div:hover {
    background: white;
    color: black;
  }
  div.disabled {
    user-select: none;
    cursor: default;
    border: 2px solid #bbb;
    color: #bbb;
  }
  div.disabled:hover {
    background: transparent;
  }
  aside {
    width: 30px;
    margin: 0 8px;
  }
  svg {
    transition: transform 0.2s;
    z-index: 99;
    fill: white;
  }
  div:hover svg {
    fill: black;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .loading {
    height: 18px;
    width: 18px;
    animation-name: spin;
    animation-duration: 600ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
</style>
