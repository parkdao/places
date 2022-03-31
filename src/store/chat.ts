import type { Message } from "../types";
import { writable } from "svelte/store";
import { gun } from "./gun";

const topic = "pod-ch4atttt__3saejni2";

type ChatState = {
  last: number;
  messages: Message[];
};

const emptyChatState: ChatState = {
  last: Date.now(),
  messages: [],
};

export const chat = writable<ChatState>(emptyChatState);

export function addMessage(text: string) {
  const now = Date.now();
  const message = { text, time: now };
  gun.get(topic).set(message);
}

export function deleteMessage(msgId) {
  gun.get(topic).get(msgId).put(null);
}

export function stopChat() {
  // remove gun listeners
  gun.get(topic).off();
}

export function initChat() {
  let state: { [k: string]: Message } = {};
  function chatFromState() {
    const arr = Object.values(state);
    const sorted = arr.sort((a, b) => a.time - b.time);
    // console.log("MESSAGES", sorted);
    chat.update((s) => ({
      last: s.last,
      messages: sorted,
    }));
  }
  setInterval(() => {
    chatFromState();
  }, 200);
  gun
    .get(topic)
    .map()
    .on((val, msgId) => {
      if (val) {
        state[msgId] = { msgId, ...val };
      } else {
        delete state[msgId];
        chatFromState();
      }
    });
}
