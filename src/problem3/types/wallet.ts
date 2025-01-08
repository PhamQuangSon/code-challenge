export enum BlockchainPriority {
  Osmosis = 100,
  Ethereum = 50,
  Arbitrum = 30,
  Zilliqa = 20,
  Neo = 20,
  Default = -99
}

export enum CurrencySymbol {
  ETH = 'Ξ',
  OSMO = 'Ο',
  ARB = 'A',
  ZIL = 'Z',
  NEO = 'N',
  DEFAULT = '$'
}

export type Blockchain = keyof typeof BlockchainPriority;
export type Currency = keyof typeof CurrencySymbol;

export interface WalletBalance {
  currency: Currency;
  amount: number;
  blockchain: Blockchain;
}

export interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  symbol: CurrencySymbol;
}

export interface PriceData {
  [key in Currency]?: number;
}

export interface WalletRowProps {
  balance: FormattedWalletBalance;
  usdValue: number;
  className?: string;
}
