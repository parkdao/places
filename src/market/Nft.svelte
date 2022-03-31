<script lang="ts">
  import { onMount } from "svelte";
  import type { Nft } from "../store/near";
  export let nft: Nft | null = null;
  import { fetchMedia } from "./utils";

  onMount(() => {
    if (nft && !nft.data && nft.metadata) {
      fetchMedia(nft.token_id, nft.metadata.media);
    }
  });

  $: img = nft.data || nft.metadata.media;
</script>

<div class="nft">
  <div class="nft-title">
    {nft.metadata.title}
  </div>
  <div class="nft-image" style={`background-image:url(${img})`} />
</div>

<style>
  .nft {
    position: absolute;
    top: 10.25rem;
    right: 17px;
    border: 2px solid white;
    width: 13rem;
    height: 12.5rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .nft-title {
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    padding: 0 1rem;
    height: 32px;
  }
  .nft-image {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 196px;
    height: 196px;
  }
</style>
