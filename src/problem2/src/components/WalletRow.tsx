import React from "react";
import { WalletRowProps } from "@/types/wallet";
import viteLogo from "/vite.svg";

const WalletRow: React.FC<WalletRowProps> = ({ balance, className }) => {
  return (
    <div
      className={`flex justify-between items-center ${className}`}
      data-testid="wallet-row"
    >
      <div className="flex items-center">
        <img
          src={`/tokens/${balance.currency}.svg` ? `/tokens/${balance.currency}.svg` : viteLogo}
          alt={balance.currency}
          className="w-6 h-6 mr-2"
        />
        <div>
          <p className="font-bold">{balance.currency}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold">
          {balance.formatted} {balance.currency}
        </p>
      </div>
    </div>
  );
};

export default WalletRow;
