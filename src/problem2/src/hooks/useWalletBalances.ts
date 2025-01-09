import { useState } from "react";
import type { WalletBalance, FormattedWalletBalance } from "@/types/wallet";
import { CURRENCY } from "@/constants/currency";

export function useWalletBalances() {
  // Example initial balances
  const [balances, setBalances] = useState<WalletBalance[]>([
    { currency: "ETH", amount: 1.5, blockchain: "Ethereum"},
    { currency: "OSMO", amount: 100, blockchain: "Osmosis"},
    { currency: "USDC", amount: 1000, blockchain: "Ethereum"},
    { currency: "USD", amount: 1000, blockchain: "Default"},
  ]);

  const getFormattedBalances = (): FormattedWalletBalance[] => {
    return balances.map(balance => {
      const currencyData = CURRENCY.find(c => c.currency === balance.currency)
      const usdValue = currencyData ? balance.amount * currencyData.price : 0
      
      return {
        ...balance,
        usdValue,
        formatted: balance.amount.toFixed(6),
        price: currencyData ? currencyData.price : 0,
        date: currencyData ? currencyData.date : new Date().toISOString(),
      }
    })
  }

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
