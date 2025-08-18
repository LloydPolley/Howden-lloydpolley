import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FromPricing from "./FromPricing";
import type { CurrencyMap } from "@/types";

describe("FromPricing", () => {
  const mockRates: CurrencyMap = {
    USD: {
      code: "USD",
      alphaCode: "USD",
      name: "US Dollar",
      rate: 1,
    },
    GBP: {
      code: "GBP",
      alphaCode: "GBP",
      name: "British Pound",
      rate: 0.8,
    },
  };

  it("renders the label", () => {
    render(
      <FromPricing
        rates={mockRates}
        onAmountChange={() => {}}
        handleSetFrom={() => {}}
        value="USD"
        name="fromCurrency"
        amount={1}
      />
    );
    expect(screen.getByText(/From/)).toBeInTheDocument();
  });

  it("calls onAmountChange when input value changes", () => {
    const handleAmountChange = vi.fn();
    render(
      <FromPricing
        rates={mockRates}
        onAmountChange={handleAmountChange}
        handleSetFrom={() => {}}
        value="USD"
        name="fromCurrency"
        amount={1}
      />
    );

    const input = screen.getByPlaceholderText(/enter amount/i);
    fireEvent.change(input, { target: { value: "100" } });
    expect(handleAmountChange).toHaveBeenCalledWith(100);
  });

  it("renders the select with correct value", () => {
    render(
      <FromPricing
        rates={mockRates}
        onAmountChange={() => {}}
        handleSetFrom={() => {}}
        value="GBP"
        name="fromCurrency"
        amount={1}
      />
    );

    const select = screen.getByTestId("select");
    expect(select).toHaveValue("GBP");
  });
});
