import * as walletUtils from "./wallet";
import * as contracts from "./contracts";
import * as nearStore from "../store/near";
import NEAR from "./near";
import type { Me, Sale, Nft, NftMetadata } from "../store/near";
import * as args from "./args";
import * as constants from "./constants.js";
// import Big from "big.js";

export { Me, Sale, Nft, NftMetadata, args as Args };

let wallet;
let nft;
let market;
let park;

const userAPI = {
  get_balance: async () => (await wallet.account().state()).amount,
};
const marketAPI = {
  get_all_sales: async (): Promise<Sale[]> =>
    await view(market, "get_all_sales"),
  get_supply_sales: async () => await view(market, "get_supply_sales"),
  get_sales_by_contract: async (a: args.GetSalesByContract) =>
    await view(market, "get_sales_by_contract", a),
  bid: async (a: args.Bid, gas: number, deposit: number) =>
    await change(market, "bid", a, gas, deposit),
  settle: async (a: args.Settle) => await change(market, "settle", a),
};
const parkAPI = {
  ft_balance_of: async (a: args.FtBalanceOf) =>
    await view(park, "ft_balance_of", a),
  ft_total_supply: async () => await view(park, "ft_total_supply"),
  ft_transfer: async (a: args.FtTransfer) =>
    await change(park, "ft_transfer", a),
  ft_transfer_call: async (a: args.FtTransferCall) =>
    await change(park, "ft_transfer_call", a),
  storage_balance_of: async (a: args.StorageBalanceOf) =>
    await view(park, "storage_balance_of"),
  storage_balance_bounds: async () =>
    await view(park, "storage_balance_bounds"),
  storage_deposit: async (a: args.StorageDeposit, deposit: number) =>
    await change(park, "storage_deposit", a, null, deposit),
  stakes: async () => await view(park, "stakes"),
  proposals: async () => await view(park, "proposals"),
  complete_proposal: async (a: args.CompleteProposal, gas: number) =>
    await change(park, "complete_proposal", gas),
};
const nftAPI = {
  nft_is_approved: async (a: args.NftIsApproved) =>
    await view(nft, "nft_is_approved", a),
  nft_total_supply: async () => await view(nft, "nft_total_supply"),
  nft_tokens: async (a: args.NftTokens) => await view(nft, "nft_tokens", a),
  nft_supply_for_owner: async (a: args.NftSupplyForOwner) =>
    await view(nft, "nft_supply_for_owner", a),
  nft_tokens_for_owner: async (a: args.NftTokensForOwner) =>
    await view(nft, "nft_tokens_for_owner", a),
  nft_token: async (a: args.NftToken) => await view(nft, "nft_token", a),
  nft_metadata: async () => await view(nft, "nft_metadata"),
  nft_approve: async (a: args.NftApprove) =>
    await change(nft, "nft_approve", a),
  nft_revoke: async (a: args.NftRevoke) => await change(nft, "nft_revoke", a),
  nft_revoke_all: async (a: args.NftRevokeAll) =>
    await change(nft, "nft_revoke_all", a),
  nft_transfer: async (a: args.NftTransfer) =>
    await change(nft, "nft_transfer", a),
  nft_transfer_call: async (a: args.NftTransferCall) =>
    await change(nft, "nft_transfer_call", a),
  stake: async (a: args.Stake, gas: number, deposit: number) =>
    await change(nft, "nft_transfer_call", args.stake_args(a), gas, deposit),
};

export const api = {
  user: userAPI,
  market: marketAPI,
  park: parkAPI,
  nft: nftAPI,
};

async function view(contract: any, name: string, args?: any) {
  try {
    return await contract[name](args);
  } catch (e) {
    console.log(`=> VIEW ERROR: ${name}`, e);
  }
}
async function change(
  contract: any,
  name: string,
  args?: any,
  gas?: number,
  deposit?: number
) {
  try {
    console.log("CHANGE", name, args, gas, deposit);
    return await contract[name](args, gas, deposit);
  } catch (e) {
    console.log("=> CHANGE ERROR", e);
  }
}

export function formatNearAmount(amount: string) {
  return NEAR.utils.format.formatNearAmount(amount, 2);
}

export async function connectAndSignIn() {
  const conn = await walletUtils.connect();
  await conn.wallet.requestSignIn(constants.MARKET_CONTRACT, "MARKET");
}

let NEAR_INITIALIZED = false;

export async function init() {
  if (NEAR_INITIALIZED) return;
  const conn = await walletUtils.connect();
  const me = conn.wallet.getAccountId();
  if (me) {
    wallet = conn.wallet;
    const acc = wallet.account();
    nft = contracts.nft(acc, me);
    market = contracts.market(acc, me);
    park = contracts.park(acc, me);
    await initUser();
    NEAR_INITIALIZED = true;
  }
}

async function initUser() {
  const me: Me = {};
  const myid = wallet.getAccountId();
  if (myid) {
    me.accountId = myid;
    me.balance = await api.user.get_balance();
  }
  if (park) {
    const parkbal = await api.park.ft_balance_of({
      account_id: myid,
    });
    me.park = parkbal;
  }
  if (nft) {
    const mynfts = await api.nft.nft_tokens_for_owner({
      account_id: myid,
    });
    me.nfts = mynfts;
  }
  console.log("=>", me);
  nearStore.me.set(me);
}

export function signOut() {
  walletUtils.signOut(wallet);
  nearStore.me.set({});
  nft = null;
  market = null;
  park = null;
}
