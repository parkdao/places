<script lang="ts">
  import type { Message } from "../types";
  export let message: Message | null = null;
</script>

<li class="message">
  <div class="avatar" />
  <span class="username">username</span>
  <span>{message.text}</span>
</li>

<style>
  .message {
    color: black;
    background-color: rgba(255, 255, 255, 0.6);
    padding: 0.75rem 0.75rem 0.75rem 0.75rem;
    border-radius: 0.1rem 1rem 1rem 1rem;
    margin-bottom: 0.5rem;
    margin-left: 3rem;
    display: flex;
    flex-direction: column;
    max-width: 24rem;
  }

  .username {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .avatar {
    width: 2.5rem;
    height: 2.5rem;
    background-color: rgb(182, 255, 182);
    position: absolute;
    border-radius: 2.5rem;
    left: 0;
    margin-top: -0.5rem;
  }
</style>
