import { CURRENCY } from "@/constants/currency";
export enum BlockchainPriority {
  Osmosis = 100,
  Ethereum = 50,
  Arbitrum = 30,
  Zilliqa = 20,
  Neo = 20,
  Default = -99,
}

export type Blockchain = keyof typeof BlockchainPriority;
export type Currency = (typeof CURRENCY)[number]["currency"];

export interface WalletBalance {
  currency: Currency;
  amount: number;
  blockchain: Currency;
}

export interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
	usdValue: number;
	price: number;
	date: string | Date;
}


export interface WalletRowProps {
  balance: FormattedWalletBalance;
  className?: string;
}
