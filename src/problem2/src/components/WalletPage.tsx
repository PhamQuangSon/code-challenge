import React, { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  WalletBalance,
  FormattedWalletBalance,
  BlockchainPriority,
} from "@/types/wallet";
import { getPriority } from "@/utils/walletUtils";
import { useWalletBalances } from "@/hooks/useWalletBalances";
import WalletRow from "@/components/WalletRow";

interface WalletPageProps {
  children?: React.ReactNode;
}

const WalletPage: React.FC<WalletPageProps> = ({ children, ...rest }) => {
  const { balances } = useWalletBalances();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(
          balance.blockchain as keyof typeof BlockchainPriority
        );
        return (
          balancePriority >= BlockchainPriority.Default && balance.amount > 0
        );
      })
      .sort((a: WalletBalance, b: WalletBalance) => {
        return (
          getPriority(b.blockchain as keyof typeof BlockchainPriority) -
          getPriority(a.blockchain as keyof typeof BlockchainPriority)
        );
      });
  }, [balances]);

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      return (
        <WalletRow
          key={`${balance.currency}-${index}`}
          balance={{
            currency: balance.currency,
            amount: balance?.amount || 0,
            blockchain: "Default",
            formatted: balance.price.toFixed(6),
            usdValue: balance?.usdValue || 0,
            price: balance.price,
            date: new Date().toISOString(),
          }}
          className="wallet-row mb-2"
        />
      );
    }
  );

  return (
    <Card className="w-full max-w-lg mx-auto" {...rest}>
      <CardHeader>
        <CardTitle className="text-xl font-extrabold leading-tight text-gray-900 py-1 lg:text-2xl dark:text-white my-2 relative animate animate-fade-up animate-duration-1000 animate-delay-300">
          Wallet Balances
        </CardTitle>
      </CardHeader>
      <CardContent>
        {rows}
        {children}
      </CardContent>
    </Card>
  );
};

export default WalletPage;
