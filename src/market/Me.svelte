<script>
  import { me } from "../store/near";
  import * as near from "../near";
  import { nearD } from "../ui";
  import Nft from "./Nft.svelte";

  $: text = $me.accountId || "LOGIN";

  let showAccount = false;
  function click() {
    if ($me.accountId) {
      showAccount = !showAccount;
    } else {
      near.connectAndSignIn();
    }
  }

  function logout() {
    near.signOut();
    showAccount = false;
  }

  $: nearBalance = near.formatNearAmount($me.balance || "0");
  $: parkBalance = near.formatNearAmount($me.park || "0");
  $: firstNFT = $me.nfts && $me.nfts.length && $me.nfts[0];
</script>

<button on:click={click}>
  <span>{text}</span>
  <svg version="1.1" viewBox="0 0 90.1 90" height={24} width={24}>
    <path d={nearD} />
  </svg>
</button>

{#if showAccount}
  <div class="account">
    <div class="content">
      <div class="column">
        <div class="row">NEAR:</div>
        <div class="row">Park:</div>
      </div>
      <div class="column column-right">
        <div class="row">{nearBalance} Ⓝ</div>
        <div class="row">{parkBalance} 🅟</div>
      </div>
    </div>
    <div class="logout" on:click={logout}>LOGOUT</div>
  </div>
{/if}

{#if showAccount && firstNFT}
  <Nft nft={firstNFT} />
{/if}

<style>
  button {
    border: 2px solid white;
    border-radius: 1.18rem;
    height: 2.36rem;
    display: flex;
    align-items: center;
    outline: none;
    padding: 0 1rem;
    cursor: pointer;
  }
  button svg {
    fill: black;
    height: 1.4rem;
    width: 1.4rem;
    margin-left: 0.8rem;
  }
  button:hover {
    color: white;
    background: #1e2429;
  }
  button:hover svg {
    fill: white;
  }
  .account {
    position: absolute;
    top: 3.6rem;
    right: 17px;
    border: 2px solid white;
    width: 13rem;
    height: 6.3rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }
  .content {
    display: flex;
    flex: 1;
    padding: 10px 12px;
    max-height: calc(100% - 24px);
  }
  .logout {
    position: absolute;
    bottom: 0;
    left: -1px;
    width: 101%;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 1.75rem;
    min-height: 1.75rem;
    font-size: 0.8rem;
    cursor: pointer;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
  }
  .logout:hover {
    color: black;
    background: white;
  }
  .column {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
  .column-right {
    align-items: flex-end;
  }
  .row {
    height: 20px;
    align-items: center;
    display: flex;
  }
</style>
