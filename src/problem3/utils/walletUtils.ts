import { BlockchainPriority, CurrencySymbol, Blockchain, Currency, WalletBalance, FormattedWalletBalance } from "@/types/wallet";

export const getPriority = (blockchain: Blockchain): number => {
  return BlockchainPriority[blockchain];
};

export const getCurrencySymbol = (currency: Currency): CurrencySymbol => {
  return CurrencySymbol[currency];
};

export const formatBalance = (balance: WalletBalance): FormattedWalletBalance => {
  return {
    ...balance,
    formatted: balance.amount.toFixed(2),
    symbol: getCurrencySymbol(balance.currency)
  };
};

