<script lang="ts">
  import { me } from "../store/near";
  import { api } from "../near";
  import Big from "big.js";
  import Button from "./Button.svelte";
  import * as constants from "../near/constants";

  export let terrain = 0;

  $: myNFT = $me.nfts && $me.nfts.find((n) => n.token_id === terrain + "");

  let loading = false;
  async function create() {
    if (!myNFT) return;
    loading = true;
    const gas = Big(1).times(10 ** 14);
    console.log(gas.toFixed());
    // send the nft to parkdao
    const args = {
      receiver_id: constants.PARK_CONTRACT,
      token_id: myNFT.token_id,
      msg: {
        proposal: {
          owner_id: $me.accountId,
          name: "Proposal " + myNFT.token_id,
          lifetime: 1,
          tasks: [],
        },
      },
    };
    const deposit = Big(1).toFixed();
    const r = await api.nft.stake(args, gas.toFixed(), deposit);
    console.log(r);
    // const deposit = Big(price).times(10 ** 24);
    loading = false;
  }
</script>

{#if myNFT}
  <section>
    <Button text="CREATE WORLD" {loading} onClick={create} width={16} />
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
</style>
