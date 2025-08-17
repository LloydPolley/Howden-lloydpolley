// ToPricing.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ToPricing from "./ToPricing";
import type { CurrencyMap } from "../../../types";

describe("ToPricing", () => {
  const mockRates: CurrencyMap = {
    USD: {
      code: "USD",
      alphaCode: "USD",
      numericCode: "840",
      name: "US Dollar",
      rate: 1,
      inverseRate: 1,
    },
    EUR: {
      code: "EUR",
      alphaCode: "EUR",
      numericCode: "978",
      name: "Euro",
      rate: 0.9,
      inverseRate: 1.11,
    },
  };

  it("renders the label", () => {
    render(<ToPricing rates={mockRates} handleSetTo={() => {}} />);
    expect(screen.getByText(/To/)).toBeInTheDocument();
  });

  it("renders the select", () => {
    render(<ToPricing rates={mockRates} handleSetTo={() => {}} />);
    expect(screen.getByTestId("select")).toBeInTheDocument();
  });

  it("calls handleSetTo when selection changes", () => {
    const handleSetTo = vi.fn();
    render(<ToPricing rates={mockRates} handleSetTo={handleSetTo} />);

    const select = screen.getByTestId("select");
    fireEvent.change(select, { target: { value: "EUR" } });

    expect(handleSetTo).toHaveBeenCalledWith("EUR");
  });
});
