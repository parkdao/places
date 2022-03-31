export const NFT_CONTRACT = "nft6.evanfeenstra.testnet";
export const MARKET_CONTRACT = "market3.evanfeenstra.testnet";
export const PARK_CONTRACT = "park3.evanfeenstra.testnet";

export function config(keyStore) {
  return {
    networkId: "testnet",
    keyStore, // optional if not signing transactions
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    headers: {},
  };
}
