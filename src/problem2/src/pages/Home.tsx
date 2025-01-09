import { type FC } from "react";
import CurrencySwapForm from "@/components/currencySwapForm";
import WalletPage from "@/components/WalletPage";

const Home: FC = () => {

  return (
    <>
        <CurrencySwapForm />
        <WalletPage />
    </>
  );
};

export default Home;
