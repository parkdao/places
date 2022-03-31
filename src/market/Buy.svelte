<script lang="ts">
  import { sales } from "../store/near";
  import { api } from "../near";
  import * as constants from "../near/constants";
  import Big from "big.js";
  import Button from "./Button.svelte";

  export let terrain = 0;

  $: priceText = "";
  $: price = 0;
  $: {
    const sale = $sales && $sales.find((s) => s.token_id === terrain + "");
    if (sale) {
      price = sale.min_price;
      priceText = `Price: ${sale.min_price} Ⓝ`;
    } else {
      price = 0;
      priceText = "";
    }
  }

  let loading = false;
  async function mint() {
    if (!priceText) return;
    loading = true;
    const gas = Big(1).times(10 ** 14);
    console.log(gas.toFixed());
    const deposit = Big(price).times(10 ** 24);
    const ok = await api.market.bid(
      {
        nft_contract: constants.NFT_CONTRACT,
        token_id: terrain + "",
      },
      gas.toFixed(),
      deposit.toFixed()
    );
    console.log("bid", ok);
    loading = false;
  }
</script>

{#if priceText}
  <section>
    <p>{priceText}</p>
    <Button text="MINT" disabled={!priceText} {loading} onClick={mint} />
  </section>
{/if}

<style>
  section {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10rem;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
  }
  p {
    width: 7rem;
    margin: 0 1rem;
  }
</style>
