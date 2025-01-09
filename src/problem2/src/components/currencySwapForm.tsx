"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownUp } from "lucide-react";
import { useWalletBalances } from "@/hooks/useWalletBalances";
import WalletRow from "@/components/WalletRow";
import { CURRENCY } from "@/constants/currency";
import { toast } from "react-toastify";

export default function CurrencySwapForm() {
  const { balances, updateBalance } = useWalletBalances();
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState(CURRENCY[0].currency);
  const [toCurrency, setToCurrency] = useState(CURRENCY[1].currency);
  const [isLoading, setIsLoading] = useState(false);

  const fromCurrencyData = CURRENCY.find((c) => c.currency === fromCurrency);
  const toCurrencyData = CURRENCY.find((c) => c.currency === toCurrency);
  const fromBalance = balances.find((b) => b.currency === fromCurrency);
  const toBalance = balances.find((b) => b.currency === toCurrency);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const calculateOutputAmount = () => {
    if (!amount || !fromCurrencyData || !toCurrencyData) return "0";
    const inputAmount = parseFloat(amount);
    const rate = toCurrencyData.price / fromCurrencyData.price;
    return (inputAmount * rate).toFixed(6);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !fromCurrencyData || !toCurrencyData) {
      toast.info("Please select currencies and enter an amount", {
        toastId: 1,
        updateId: 1,
      });
      return;
    }

    const inputAmount = parseFloat(amount);
    const fromBalance = balances.find((b) => b.currency === fromCurrency);

    // Validate balance
    if (!fromBalance || fromBalance.amount < inputAmount) {
      toast.error(`Insufficient ${fromCurrency} balance`, {
        toastId: 2,
        updateId: 2,
      });
      return;
    }

    setIsLoading(true);
    try {
      const outputAmount = parseFloat(calculateOutputAmount());

      // Validate output amount
      if (isNaN(outputAmount) || outputAmount <= 0) {
        throw new Error("Invalid output amount calculated");
      }

      // Simulate blockchain transaction delay
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update both balances
      const fromCurrencyExists = balances.some(
        (b) => b.currency === fromCurrency
      );
      const toCurrencyExists = balances.some((b) => b.currency === toCurrency);

      if (!fromCurrencyExists || !toCurrencyExists) {
        toast.error(
          "One of the selected currencies does not exist in your wallet balances.",
          {
            toastId: 3,
            updateId: 3,
          }
        );
        return;
      }

      updateBalance(fromCurrency, -inputAmount);
      updateBalance(toCurrency, outputAmount);

      // Reset form
      setAmount("");

      // Show success message
      toast.success(
        `Successfully swapped ${inputAmount} ${fromCurrency} for ${outputAmount.toFixed(6)} ${toCurrency}`,
        {
          toastId: 4,
          updateId: 4,
        }
      );
    } catch (error) {
      console.error("Swap failed:", error);
      alert(
        `Failed to swap currencies: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto mb-4">
      <CardHeader>
        <CardTitle className="text-xl font-extrabold leading-tight text-gray-900 py-1 lg:text-2xl dark:text-white my-2 relative animate animate-fade-up animate-duration-1000 animate-delay-300">
          Currency Swap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount to send</label>
              <div className="flex items-center space-x-2">
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCY.map((currency) => (
                      <SelectItem
                        key={currency.currency}
                        value={currency.currency}
                      >
                        <WalletRow
                          balance={{
                            currency: currency.currency,
                            amount: fromBalance?.amount || 0,
                            blockchain: "Default",
                            formatted: currency.price.toFixed(6),
                            usdValue: fromBalance?.usdValue || 0,
                            price: currency.price,
                            date: new Date().toISOString(),
                          }}
                          className={"min-w-60"}
                        />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="any"
                />
              </div>
              <div className="font-bold text-sm text-muted-foreground">
                Balance: {fromBalance?.usdValue || 0}
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleSwap}
              className="flex mx-auto hover:bg-sky-600 active:bg-sky-700 hover:text-white"
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>

            <div className="space-y-2">
              <label className="text-sm font-medium">Amount to receive</label>
              <div className="flex items-center space-x-2">
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCY.map((currency) => (
                      <SelectItem
                        key={currency.currency}
                        value={currency.currency}
                      >
                        <WalletRow
                          balance={{
                            currency: currency.currency,
                            amount: toBalance?.amount || 0,
                            blockchain: "Default",
                            formatted: currency.price.toFixed(6),
                            usdValue: toBalance?.usdValue || 0,
                            price: currency.price,
                            date: new Date().toISOString(),
                          }}
                          className={"min-w-60"}
                        />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  value={calculateOutputAmount()}
                  readOnly
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="font-bold text-sm text-muted-foreground">
                Balance: {toBalance?.usdValue || 0}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full hover:bg-sky-600 active:bg-sky-700 hover:border-color-none"
            disabled={
              isLoading ||
              !amount ||
              parseFloat(amount) <= 0 ||
              !fromBalance ||
              parseFloat(amount) > fromBalance.amount
            }
          >
            {isLoading ? "Processing..." : "Confirm Swap"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
