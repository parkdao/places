<script>
  import {
    Hexagon,
    Users,
    Chat,
    UserCircle,
    MicrophoneSlash,
    Microphone,
    VideoCamera,
    VideoCameraSlash,
    Wallet,
  } from "phosphor-svelte";
  import { nav } from "../store";

  export let conference;

  const me = conference.localParticipant;

  const leftNavItems = [
    { name: "Chat", icon: Chat },
    { name: "Places", icon: Hexagon },
    { name: "People", icon: Users },
  ];
  $: rightNavItems = [
    {
      id: 4,
      name: $me.videoEnabled ? "Video" : "Video",
      icon: $me.videoEnabled ? VideoCamera : VideoCameraSlash,
      func: () => {
        console.log(me);
        me.setVideoEnabled(!$me.videoEnabled);
      },
    },
    {
      id: 3,
      name: $me.audioEnabled ? "Mute" : "Mute",
      icon: $me.audioEnabled ? Microphone : MicrophoneSlash,
      func: () => me.setAudioEnabled(!$me.audioEnabled),
    },
    { id: 5, name: "Connect Wallet", icon: Wallet },
  ];

  function activate(b) {
    if (b.func) b.func();
    else if (b.name) nav.set(b.id);
  }
</script>

<div class="ui-top">
  <div class="ui-top-left">
    {#each leftNavItems as lb}
      <button
        on:click={() => activate(lb)}
        class={$nav === lb.id ? "active" : ""}
      >
        <svelte:component this={lb.icon} weight="fill" size={24} />
        {lb.name}
      </button>
    {/each}
  </div>
  <div class="ui-top-right">
    {#each rightNavItems as rb}
      <button
        on:click={() => activate(rb)}
        class={$nav === rb.id ? "active" : ""}
      >
        {rb.name}
        <svelte:component this={rb.icon} weight="fill" size={24} />
      </button>
    {/each}
  </div>
</div>

<style>
  button.active {
    background-color: rgba(255, 255, 255, 0.9) !important;
  }
  .ui-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 1rem;
    margin-bottom: 1rem;
  }

  .ui-top-left,
  .ui-top-right {
    width: auto;
    display: flex;
    grid-column-gap: 1rem;
  }

  .ui-top-left > button,
  .ui-top-right > button {
    background-color: rgba(255, 255, 255, 0);
    display: flex;
    align-items: center;
    grid-column-gap: 0.5rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    border: none;
    cursor: pointer;
    font-weight: 500;
    letter-spacing: 0.2px;
  }

  .ui-top-left > button:hover,
  .ui-top-right > button:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }

  .ui-top-right:first-child {
    background-color: white;
  }
</style>
