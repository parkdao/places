import { derived, Readable } from "svelte/store";
import Vid from "../video/vid";

export let ID = "pod-test." + window.location.hostname;
export const connection = Vid.createConnectionStore(
  Vid.DEFAULT_JITSI_CONFIG,
  ID
);

export function localParticipant(conn) {
  return derived(
    [conn],
    ([$conn], set) => {
      if (!$conn) return set({});
      Object.values($conn).forEach((v, i) => {
        if (i == 0) set(v.localParticipant);
      });
      set({});
    },
    {}
  );
}

export function firstConference(conn) {
  return derived(
    [conn],
    ([$conn], set) => {
      if (!$conn) return set({});
      Object.values($conn).forEach((v, i) => {
        if (i == 0) set(v);
      });
      set({});
    },
    {}
  );
}

export function remoteParticipants(participants, myID) {
  return derived(
    [participants],
    ([$participants]) => {
      const newobj = remove_from_object($participants, myID);
      return myID ? newobj : {};
    },
    {}
  );
}

export const filter_object = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

export function remove_from_object(obj, k) {
  const ret = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key !== k) {
      ret[key] = value;
    }
  }
  return ret;
}
