import { BlockchainPriority, Blockchain} from "@/types/wallet";

export const getPriority = (blockchain: Blockchain): number => {
  return BlockchainPriority[blockchain];
};

