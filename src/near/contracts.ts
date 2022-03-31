import * as constants from "./constants.js";
import NEAR from "./near";

export function nft(account, accountId: string) {
  return new NEAR.Contract(account, constants.NFT_CONTRACT, {
    viewMethods: [
      "nft_token",
      "nft_tokens",
      "nft_supply_for_owner",
      "nft_tokens_for_owner",
      "nft_metadata",
      "nft_is_approved",
      "nft_total_supply",
    ],
    changeMethods: [
      "new",
      "new_default_meta",
      "nft_mint",
      "nft_transfer",
      "nft_transfer_call",
      "nft_approve",
      "nft_revoke",
      "nft_revoke_all",
    ],
    sender: accountId,
  });
}

export function market(account, accountId: string) {
  return new NEAR.Contract(account, constants.MARKET_CONTRACT, {
    viewMethods: [
      "supported_ft_contracts",
      "supported_nft_contracts",
      "get_now",
      "get_supply_sales",
      "get_all_sales",
      "get_sales_by_contract",
      "get_sale",
    ],
    changeMethods: [
      "new",
      "add_nft_contract",
      "add_ft_contract",
      "bid",
      "settle",
    ],
    sender: accountId,
  });
}

export function park(account, accountId: string) {
  return new NEAR.Contract(account, constants.PARK_CONTRACT, {
    viewMethods: [
      "genesis",
      "reward_rate",
      "epoch_of",
      "ft_balance_of",
      "ft_total_supply",
    ],
    changeMethods: [
      "new",
      "new_default_meta",
      "add_nft_contract",
      "mint",
      "set_reward_rate",
      "reward",
      "ft_transfer",
      "ft_transfer_call",
    ],
    sender: accountId,
  });
}
