import { useState } from "react";
import type { WalletBalance, FormattedWalletBalance } from "@/types/wallet";

export function useWalletBalances() {
  // Example initial balances
  const [balances, setBalances] = useState<WalletBalance[]>([
    { currency: "ETH", amount: 1.5, blockchain: "Ethereum", price: 3000, date: new Date() },
    { currency: "OSMO", amount: 100, blockchain: "Osmosis", price: 5, date: new Date() },
    { currency: "USDC", amount: 1000, blockchain: "Ethereum", price: 1, date: new Date() },
    { currency: "USD", amount: 1000, blockchain: "USD", price: 1, date: new Date() },
  ]);



  const getFormattedBalances = (): FormattedWalletBalance[] => {
    return balances.map((balance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed(6),
      };
    });
  };

  const updateBalance = (currency: string, amount: number) => {
    setBalances((prev) => {
      const index = prev.findIndex((b) => b.currency === currency);
      if (index === -1) return prev;

      const newBalances = [...prev];
      newBalances[index] = {
        ...newBalances[index],
        amount: newBalances[index].amount + amount,
      };
      return newBalances;
    });
  };

  return {
    balances: getFormattedBalances(),
    updateBalance,
  };
}
