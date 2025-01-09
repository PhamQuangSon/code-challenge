import React, { useMemo } from "react";
import { Box, BoxProps } from "@/components/ui/box";
import { WalletBalance, FormattedWalletBalance, PriceData, BlockchainPriority } from '@/types/wallet';
import { getPriority, formatBalance } from '@/utils/walletUtils';
import { useWalletBalances, usePrices } from "@/hooks/wallet";
import WalletRow from "@/components/WalletRow";

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices: PriceData = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > BlockchainPriority.Default && balance.amount > 0;
      })
      .sort((a: WalletBalance, b: WalletBalance) => {
        return getPriority(b.blockchain) - getPriority(a.blockchain);
      });
  }, [balances]);

  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map(formatBalance);

  const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    return (
      <WalletRow
        key={`${balance.currency}-${index}`}
        balance={{
          currency: balance.currency,
          amount: balance?.amount || 0,
          blockchain: 'Default',
          formatted: balance.price.toFixed(6),
          price: balance.price,
          date: new Date().toISOString(),
        }}
        className="wallet-row"
      />
    );
  });

  return (
    <Box className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden" {...rest}>
      <h2 className="text-2xl font-bold p-4 bg-gray-100">Wallet Balances</h2>
      {rows}
			{children} 
    </Box>
  );
};

export default WalletPage;

