
import { CURRENCY } from "@/constants/currency";
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
export type Currency = (typeof CURRENCY)[number]['currency'];

export interface WalletBalance {
  currency: Currency;
  price: number;
	date: string | Date;
  amount: number;
  blockchain: Currency;
}

export interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

export interface PriceData {
  [key in Currency]?: number;
}

export interface WalletRowProps {
  balance: FormattedWalletBalance;
  className?: string;
}
