import { writable } from "svelte/store";

export interface Me {
  accountId?: string;
  balance?: any;
  park?: any;
  nfts?: Nft[];
}

export interface Sale {
  owner_id: string;
  bid: any;
  created_at: string;
  exp: string;
  ft_contract: string;
  min_price: number;
  nft_contract: string;
  token_id: string;
}

export interface NftMetadata {
  description: string;
  media: string;
  title: string;
}

export interface Nft {
  owner_id: string;
  token_id: string;
  approved_account_ids: Object;
  metadata: NftMetadata;
  data?: string; // media base64 for cache
}

export const me = writable<Me>({});

export const sales = writable<Sale[]>([]);
