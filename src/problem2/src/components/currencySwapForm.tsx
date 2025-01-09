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
    if (!amount || !fromCurrencyData || !toCurrencyData) return;

    setIsLoading(true);
    try {
      const inputAmount = parseFloat(amount);
      const outputAmount = parseFloat(calculateOutputAmount());

      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 1000))

      updateBalance(fromCurrency, -inputAmount);
      updateBalance(toCurrency, outputAmount);
      setAmount("");
    } catch (error) {
      console.error("Swap failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
			<CardTitle>Currency Swap</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount to send</label>
              <div className="space-y-2">
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
                            price: currency.price,
                            date: new Date().toISOString(),
                          }}
                          className={"min-w-80"}
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
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleSwap}
              className="flex mx-auto"
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>

            <div className="space-y-2">
              <label className="text-sm font-medium">Amount to receive</label>
              <div className="space-y-2">
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
                            price: currency.price,
                            date: new Date().toISOString(),
                          }}
                          className={"min-w-80"}
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
            </div>
          </div>

          <Button
            type="submit"
            className="w-full hover:bg-blue-600 active:bg-blue-700"
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
