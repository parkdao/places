<script lang="ts">
  export let placeholder = "Start typing to chat...";
  export let onSend: (text: string) => void = (t) => {};

  let value = "";

  function send() {
    onSend(value);
    value = "";
  }
  function keypress(e) {
    if (e.key === "Enter") {
      send();
    }
  }
</script>

<input {placeholder} bind:value on:keypress={keypress} />
<button disabled={!value} on:click={send}>Send ↩</button>

<style>
  button {
    width: 5rem;
    height: 1.5rem;
    position: absolute;
    right: 3.5rem;
    bottom: 3.5rem;
    border-radius: 0.5rem;
    border: none;
    background: rgb(230, 230, 230);
    cursor: pointer;
  }

  input {
    width: 100%;
    height: 2.5rem;
    border: none;
    outline: none;
    border-radius: 1rem;
    font-size: 1rem;
    color: black;
    resize: none;
    white-space: normal;
    text-align: justify;
    padding: 1rem;
  }

  input::placeholder {
    font-size: 1rem;
  }
</style>
