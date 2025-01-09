import React from "react";
import { WalletRowProps } from "@/types/wallet";

const WalletRow: React.FC<WalletRowProps> = ({ balance, usdValue, className }) => {
  const getImageUrl = (name: string) =>{
    // note that this does not include files in subdirectories
    return new URL(`@/assets/tokens/${name}.svg`, import.meta.url).href
  }
  return (
    <div className={`flex justify-between items-center p-4 border-b ${className}`} data-testid="wallet-row">
      <div className="flex items-center">
        {/* <span className="text-2xl mr-2">{balance.symbol}</span> */}
        <img
        src={getImageUrl(balance.currency)}
        alt={balance.currency}
        className="w-6 h-6 mr-2"
      />
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

