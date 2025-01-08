import React from "react";
import { WalletRowProps } from "@/types/wallet";

const WalletRow: React.FC<WalletRowProps> = ({ balance, usdValue, className }) => {
  return (
    <div className={`flex justify-between items-center p-4 border-b ${className}`} data-testid="wallet-row">
      <div className="flex items-center">
        <span className="text-2xl mr-2">{balance.symbol}</span>
        <div>
          <p className="font-bold">{balance.currency}</p>
          <p className="text-sm text-gray-500">{balance.blockchain}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold">{balance.formatted} {balance.currency}</p>
        <p className="text-sm text-gray-500">${usdValue.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default WalletRow;

