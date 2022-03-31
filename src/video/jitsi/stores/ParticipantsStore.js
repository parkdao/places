import { derived, writable, get } from "svelte/store";
import omit from "../utils/omit.js";
import { wireEventListeners } from "../utils/events.js";

function createSingleParticipantStore(isLocal = false) {
  // Stores participant properties
  const fieldsStore = writable({
    jid: null,
    role: null,

    audioEnabled: false,
    videoEnabled: false,
    desktopEnabled: false,

    // boolean
    isLocal: isLocal,
  });

  // Stores JitsiTrack by track type ('audio' | 'video')
  const tracksStore = writable({});

  // Store audioLevel separately because it changes frequently (~40ms)
  const audioLevelStore = writable(0.0);

  // The main participant store, derived from other stores
  const store = derived(
    [fieldsStore, tracksStore, audioLevelStore],
    ([$fields, $tracks, $audioLevel], set) => {
      set({
        ...$fields,
        ...$tracks,
        audioLevel: $audioLevel,
      });
    },
    {}
  );

  const events = {
    audio: {
      track: {
        TRACK_AUDIO_LEVEL_CHANGED: (audioLevel) => {
          audioLevelStore.set(audioLevel);
        },
        TRACK_MUTE_CHANGED: (track) => {
          fieldsStore.update(($fields) => ({
            ...$fields,
            audioEnabled: !track.isMuted(),
          }));
        },
      },
    },
    video: {
      track: {
        TRACK_MUTE_CHANGED: (track) => {
          fieldsStore.update(($fields) => ({
            ...$fields,
            videoEnabled: !track.isMuted(),
          }));
        },
      },
    },
  };

  return {
    subscribe: store.subscribe,

    setJid: (jid) => {
      fieldsStore.update(($fields) => ({ ...$fields, jid }));
    },

    setRole: (role) => {
      fieldsStore.update(($fields) => ({ ...$fields, role }));
    },

    setAudioEnabled: (enabled) => {
      const tracks = get(tracksStore);
      if (tracks.audio) {
        if (enabled) {
          tracks.audio.unmute();
        } else {
          tracks.audio.mute();
        }
      }
    },

    setVideoEnabled: (enabled) => {
      const tracks = get(tracksStore);
      if (tracks.video) {
        if (enabled) {
          tracks.video.unmute();
        } else {
          tracks.video.mute();
        }
      }
    },

    setAudioLevel: (audioLevel) => {
      audioLevelStore.set(audioLevel);
    },

    updateFieldsFromJitsiParticipant: (participant) => {
      fieldsStore.update(($fields) => {
        return {
          ...$fields,
          jid: participant.getId(),
          role: participant.getRole(),
        };
      });
    },

    addTrack: (track) => {
      if (track) {
        const trackType = track.getType();
        if (events[trackType]) {
          wireEventListeners("add", track, events[trackType]);
        }
        fieldsStore.update(($fields) => ({
          ...$fields,
          [`${trackType}Enabled`]: !track.isMuted(),
        }));
        tracksStore.update(($tracks) => ({
          ...$tracks,
          [trackType]: track,
        }));
      }
    },

    removeTrack: (track) => {
      if (track) {
        const trackType = track.getType();
        if (events[trackType]) {
          wireEventListeners("remove", track, events[trackType]);
        }
        tracksStore.update(($tracks) => omit($tracks, [trackType]));
      }
    },

    // Expose read-only versions of stores so they can be subscribed to individually
    fieldsStore: { subscribe: fieldsStore.subscribe },
    tracksStore: { subscribe: tracksStore.subscribe },
    audioLevelStore: { subscribe: audioLevelStore.subscribe },
  };
}

function createParticipantsStore() {
  const store = writable({});

  const { subscribe, update, set } = store;

  const updateParticipant = (participantId, action) => {
    let participant = get(store)[participantId];
    if (participant) {
      action(participant, false);
    } else {
      store.update(($participants) => {
        if ($participants[participantId]) {
          console.warn(`participant '${participantId}' should not exist`);
        }
        participant = createSingleParticipantStore();
        action(participant, true);
        return {
          ...$participants,
          [participantId]: participant,
        };
      });
    }
  };

  return {
    subscribe,
    update,
    updateParticipant,
    set,
  };
}

export { createParticipantsStore, createSingleParticipantStore };
