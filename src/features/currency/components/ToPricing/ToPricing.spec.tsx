import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ToPricing from "./ToPricing";
import { sampleRates } from "@/mocks/currencyMocks";

describe("ToPricing", () => {
  it("renders the label", () => {
    render(<ToPricing rates={sampleRates} handleSetTo={() => {}} />);
    expect(screen.getByText(/To/)).toBeInTheDocument();
  });

  it("renders the select", () => {
    render(<ToPricing rates={sampleRates} handleSetTo={() => {}} />);
    expect(screen.getByTestId("select")).toBeInTheDocument();
  });

  it("calls handleSetTo when selection changes", () => {
    const handleSetTo = vi.fn();
    render(<ToPricing rates={sampleRates} handleSetTo={handleSetTo} />);

    const select = screen.getByTestId("select");
    fireEvent.change(select, { target: { value: "EUR" } });

    expect(handleSetTo).toHaveBeenCalledWith("EUR");
  });
});
