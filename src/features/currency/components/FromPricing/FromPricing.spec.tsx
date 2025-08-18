import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FromPricing from "./FromPricing";
import {
  sampleRates,
  sampleCurrencyUSD,
  sampleCurrencyGBP,
} from "@/mocks/currencyMocks";

describe("FromPricing", () => {
  it("renders the label", () => {
    render(
      <FromPricing
        rates={sampleRates}
        onAmountChange={() => {}}
        handleSetFrom={() => {}}
        value={sampleCurrencyUSD.code}
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
        rates={sampleRates}
        onAmountChange={handleAmountChange}
        handleSetFrom={() => {}}
        value={sampleCurrencyUSD.code}
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
        rates={sampleRates}
        onAmountChange={() => {}}
        handleSetFrom={() => {}}
        value={sampleCurrencyGBP.code}
        name="fromCurrency"
        amount={1}
      />
    );

    const select = screen.getByTestId("select");
    expect(select).toHaveValue(sampleCurrencyGBP.code);
  });
});
