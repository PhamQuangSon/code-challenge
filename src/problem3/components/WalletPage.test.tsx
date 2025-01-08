import React from "react";
import { render, screen } from "@testing-library/react";
import WalletPage from "@/components/WalletPage";
import { useWalletBalances, usePrices } from "@/hooks/wallet";

// Mock the custom hooks
jest.mock("@/hooks/wallet", () => ({
  useWalletBalances: jest.fn(),
  usePrices: jest.fn(),
}));

describe("WalletPage", () => {
  const mockBalances = [
    { currency: "ETH", amount: 1.5, blockchain: "Ethereum" },
    { currency: "OSMO", amount: 100, blockchain: "Osmosis" },
    { currency: "ARB", amount: 50, blockchain: "Arbitrum" },
    { currency: "ZIL", amount: 1000, blockchain: "Zilliqa" },
  ];

  const mockPrices = {
    ETH: 2000,
    OSMO: 1,
    ARB: 1.2,
    ZIL: 0.05,
  };

  beforeEach(() => {
    (useWalletBalances as jest.Mock).mockReturnValue(mockBalances);
    (usePrices as jest.Mock).mockReturnValue(mockPrices);
  });

  it("renders wallet rows in correct order", () => {
    render(<WalletPage />);

    const walletRows = screen.getAllByTestId("wallet-row");
    expect(walletRows).toHaveLength(4);

    // Check if the order is correct (Osmosis, Ethereum, Arbitrum, Zilliqa)
    expect(walletRows[0]).toHaveTextContent("OSMO");
    expect(walletRows[1]).toHaveTextContent("ETH");
    expect(walletRows[2]).toHaveTextContent("ARB");
    expect(walletRows[3]).toHaveTextContent("ZIL");
  });

  it("calculates and passes correct USD values", () => {
    render(<WalletPage />);

    const walletRows = screen.getAllByTestId("wallet-row");

    // Check if USD values are calculated correctly
    expect(walletRows[0]).toHaveTextContent("$100"); // OSMO: 100 * $1
    expect(walletRows[1]).toHaveTextContent("$3000"); // ETH: 1.5 * $2000
    expect(walletRows[2]).toHaveTextContent("$60"); // ARB: 50 * $1.2
    expect(walletRows[3]).toHaveTextContent("$50"); // ZIL: 1000 * $0.05
  });

  it("formats amounts correctly", () => {
    render(<WalletPage />);

    const walletRows = screen.getAllByTestId("wallet-row");

    // Check if amounts are formatted correctly
    expect(walletRows[0]).toHaveTextContent("100.00 OSMO");
    expect(walletRows[1]).toHaveTextContent("1.50 ETH");
    expect(walletRows[2]).toHaveTextContent("50.00 ARB");
    expect(walletRows[3]).toHaveTextContent("1000.00 ZIL");
  });
});
