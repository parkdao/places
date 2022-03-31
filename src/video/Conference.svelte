<script lang="ts">
  // import { localTracksStore } from "./jitsi-svelte";
  import Participant from "./Participant.svelte";
  import * as videoStore from "../store/video";
  //./localTracksStore.shareDesktop(true/false)

  export let conferenceId;
  export let conference;
  export let permitEntry;
  export let onLeave = () => {};

  const participants = conference.participants;
  const localParticipant = conference.localParticipant;
  const myID = ($localParticipant as any).jid;
  const remoteParticipants = videoStore.remoteParticipants(participants, myID);

  $: conference.permitEntry(permitEntry);
</script>

<main>
  <div class="self">
    <Participant participant={localParticipant} index={0} />
  </div>
  {#each Object.entries($remoteParticipants) as [participantId, participant], key}
    <Participant {participant} index={key + 1} />
  {/each}
</main>

<style>
  main {
    min-width: 100vw;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 2rem;
  }
  .self {
    position: absolute;
    bottom: 175px;
    right: 5px;
  }
</style>
