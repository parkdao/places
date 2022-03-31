<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Input from "../ui/Input.svelte";
  import Message from "./Message.svelte";
  import type { Message as MessageType } from "../types";
  import { addMessage, chat, initChat, stopChat } from "../store/chat";
  import Toolbar from "./Toolbar.svelte";

  export let conference;

  // uncomment for gun chat
  onMount(initChat);
  onDestroy(stopChat);

  function onSendMessage(text: string) {
    addMessage(text);
  }
</script>

<ul class="messages">
  {#each $chat.messages as message}
    <Message {message} />
  {/each}
</ul>

<div class="ui-wrap">
  <div class="ui-container">
    <Toolbar {conference} />
    <Input onSend={onSendMessage} />
  </div>
</div>

<style>
  .messages {
    z-index: 1001;
    width: 92%;
    display: flex;
    flex-direction: column;
    max-width: 25rem;
  }

  .ui-wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    position: absolute;
    bottom: 1rem;
    z-index: 1000;
  }
  .ui-container {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 1rem;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin: 1rem;
    padding: 1rem;
  }

  .messages {
    position: absolute;
    bottom: 12rem;
    left: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
