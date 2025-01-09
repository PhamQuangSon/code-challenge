import React from 'react';
import { render, screen } from '@testing-library/react';
import WalletPage from './WalletPage';
import { useWalletBalances } from '@/hooks/useWalletBalances';

jest.mock('@/hooks/useWalletBalances');

describe("WalletPage Component", () => {
  beforeEach(() => {
    (useWalletBalances as jest.Mock).mockReturnValue({
      balances: [
        { symbol: 'OSMO', amount: 100, usdValue: 100 },
        { symbol: 'ETH', amount: 1.5, usdValue: 3000 },
        { symbol: 'ARB', amount: 50, usdValue: 60 },
        { symbol: 'ZIL', amount: 1000, usdValue: 50 },
      ],
    });
  });

  it("renders wallet balances correctly", () => {
    render(<WalletPage />);

    const walletRows = screen.getAllByTestId("wallet-row");

    expect(walletRows).toHaveLength(4);
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