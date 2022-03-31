<script>
  import { MicrophoneSlash, VideoCameraSlash } from "phosphor-svelte";
  import Vid from "./vid";
  import { spring } from "svelte/motion";

  export let participant;
  export let index;

  let audioLevelSpring = spring(0, {
    stiffness: 0.3,
    damping: 0.8,
  });
  $: audioLevelSpring.set($participant.audioLevel);
</script>

<main>
  {#if $participant.video}
    <div
      class="video"
      style="--audio-level:{Math.min(1, $audioLevelSpring + 0.16)}"
    >
      {#if $participant.videoEnabled}
        <svelte:component
          this={Vid.Video}
          track={$participant.video}
          mirror={$participant.isLocal}
        />
      {:else}
        <div class="no-video">
          <VideoCameraSlash size="2rem" color="#999" />
        </div>
      {/if}
    </div>
  {/if}
  {#if !$participant.isLocal && $participant.audio}
    {#if $participant.audioEnabled}
      <svelte:component
        this={Vid.Audio}
        track={$participant.audio}
        mirror={$participant.isLocal}
      />
    {:else}
      <div class="mic-off">
        <MicrophoneSlash size="1.2rem" color="#CCC" />
      </div>
    {/if}
  {/if}
</main>

<style>
  main {
    height: 12.5rem;
    width: 12.5rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 1rem;
  }
  .video {
    border-radius: 10rem 10rem 0.5rem 0.5rem;
    height: 12rem;
    width: 12rem;
    overflow: hidden;
    box-shadow: 0px 0px 16px 8px rgba(0, 0, 0, 0.6);
  }
  .video:before {
    border-radius: 10rem 10rem 0.5rem 0.5rem;
    content: " ";
    display: block;
    position: absolute;
    z-index: 1;
    width: 13rem;
    height: 13rem;
    bottom: -0.25rem;
    left: -0.25rem;
    background-color: rgba(255, 255, 255, 1);
    opacity: var(--audio-level);
    transition: opacity 0.25s ease-in-out;
  }
  .mic-off {
    position: absolute;
    bottom: 0.75rem;
    right: 1rem;
    z-index: 1001;
  }
  .no-video {
    width: 100%;
    height: 100%;
    background: #002f3e;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  video {
    position: relative;
    z-index: 3;
  }
  .audio-level {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    height: 8rem;
    width: 0.5rem;
  }
  .audio-level:before {
    content: " ";
    display: block;
    position: absolute;
    width: 100%;
    height: var(--audio-level);
    max-height: 100%;
    bottom: 0;
    left: 0.5rem;
    background-color: rgba(255, 255, 255, 0.7);
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
</style>
