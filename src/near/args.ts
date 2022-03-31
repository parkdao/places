export interface FtBalanceOf {
  account_id: string;
}

export interface FtTransfer {
  receiver_id: string;
  amount: string;
  memo?: string;
}

export interface FtTransferCall {
  receiver_id: string;
  amount: string;
  memo?: string;
  msg: string;
}

export interface NftTransfer {
  receiver_id: string;
  token_id: string;
  approval_id?: number;
  memo?: string;
}

export interface NftTransferCall {
  receiver_id: string;
  token_id: string;
  approval_id?: number;
  memo?: string;
  msg: string;
}

export interface Stake {
  receiver_id: string;
  token_id: string;
  msg: NftCall;
}

export interface NftToken {
  token_id: string;
}

export interface NftApprove {
  token_id: string;
  account_id: string;
  msg?: string;
}

export interface NftRevoke {
  token_id: string;
  account_id: string;
}

export interface NftRevokeAll {
  token_id: string;
}

export interface NftIsApproved {
  token_id: string;
  approved_account_id: string;
  approval_id?: number;
}

export interface NftTokens {
  from_index?: string;
  limit?: string;
}

export interface NftSupplyForOwner {
  account_id: string;
}

export interface NftTokensForOwner {
  account_id: string;
  from_index?: string;
  limit?: string;
}

export interface GetSalesByContract {
  nft_contract: string;
}

export interface Bid {
  nft_contract: string;
  token_id: string;
}

export interface Settle {
  nft_contract: string;
  token_id: string;
}

export interface StorageBalanceOf {
  account_id: String;
}

export interface StorageDeposit {
  account_id: String;
  registration_only: boolean;
}

export interface CompleteProposal {
  nft_contract: String;
  token_id: String;
}

export interface Proposal {
  owner_id: String;
  name: String;
  lifetime: number; // days
  metadata?: Metadata;
  tasks: Metadata[];
}

export interface Metadata {
  name: String;
  budget?: String; // U128
  ft_contract?: String;
  note?: String;
  url?: String;
  contact?: String;
  media?: String;
}

export interface NftCall {
  proposal_id?: String;
  proposal?: Proposal;
}

export function stake_args(s: Stake): NftTransferCall {
  return {
    receiver_id: s.receiver_id,
    token_id: s.token_id,
    msg: JSON.stringify(s.msg),
  };
}
