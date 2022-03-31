<script>
  import Vid from "./vid";
  import Conference from "./Conference.svelte";
  import { connection, ID } from "../store/video";
  import Chat from "../chat/Chat.svelte";

  const conferences = connection.conferencesStore;

  let joining = true;
  function join() {
    joining = false;
    conferences.join(ID);
  }
</script>

{#if joining}
  <div class="mirror">
    <div class="mirror-inner">
      <svelte:component this={Vid.Mirror} on:done={join} />
    </div>
  </div>
{/if}

{#each Object.entries($conferences) as [conferenceId, conference], key}
  <Conference {conferenceId} {conference} permitEntry={!joining} />
  <!-- <button on:click={() => conferences.leave(conferenceId)}
    >Leave Conference</button
  > -->
  <Chat {conference} />
{/each}

<style>
  .mirror {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 3001;
    height: 100vh;
  }
  .mirror-inner {
    background: #ffffff1c;
    padding: 2rem;
    border-radius: 1.2rem;
  }
</style>
