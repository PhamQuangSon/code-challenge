import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useCallback,
  memo,
  useMemo,
} from "react";
import Select from "react-select";
import { CURRENCY } from "@/constants/currency";
import WalletRow from "@/components/WalletRow";

interface Currency {
  currency: string;
  price: number;
  date: string | Date;
}

const CurrencySwapForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedInputCurrency, setSelectedInputCurrency] = useState<Currency>(
    CURRENCY[0]
  );
  const [selectedOutputCurrency, setSelectedOutputCurrency] =
    useState<Currency>(CURRENCY[1]);

  const handleSubmit = (event: FormEvent) => {};
  const handleSelectedInputCurrency = useCallback(
    (currency: Currency) => {
      setSelectedInputCurrency(currency);
      if (currency.currency === selectedOutputCurrency.currency) {
        setSelectedOutputCurrency(
          CURRENCY.find(
            (item) => item.currency !== currency.currency
          ) as Currency
        );
      }
    },
    [selectedOutputCurrency]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h5 className="text-2xl font-semibold text-center mb-6">Swap</h5>

      <div className="mb-4">
        <label
          htmlFor="input-amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount to send
        </label>

        <Select
          value={selectedInputCurrency}
          onChange={(event) => handleSelectedInputCurrency(event as Currency)}
          options={CURRENCY}
          formatOptionLabel={(option) => {
            const formattedOption = {
              ...option,
              formatted: `${option.currency} - ${option.price}`,
              icon: "", // Add appropriate icon URL or component
              amount: option.price,
              blockchain: "", // Add appropriate blockchain info
            };
            return (
              <WalletRow
                key={`${option.currency}`}
                balance={formattedOption}
                usdValue={0}
                className="wallet-row"
              />
            );
          }}
          className="mt-2"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="output-amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount to receive
        </label>

        <Select
          value={selectedOutputCurrency}
          onChange={(event) => setSelectedOutputCurrency(event as Currency)}
          options={CURRENCY}
          formatOptionLabel={(option) => {
            const formattedOption = {
              ...option,
              formatted: `${option.currency} - ${option.price}`,
              icon: "", // Add appropriate icon URL or component
              amount: option.price,
              blockchain: "", // Add appropriate blockchain info
            };
            return (
              <WalletRow
                key={`${option.currency}`}
                balance={formattedOption}
                usdValue={0}
                className="wallet-row"
              />
            );
          }}
          className="mt-2"
        />
      </div>

      <button
        type="submit"
        className="w-full h-11 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <img
              src="/icons/loading.svg"
              alt="Loading"
              className="w-full h-full"
            />
          </div>
        ) : (
          "CONFIRM SWAP"
        )}
      </button>
    </form>
  );
};

export default CurrencySwapForm;
