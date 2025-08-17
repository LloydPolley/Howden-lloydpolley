// Select.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Select from "./Select";
import type { CurrencyMap } from "../../types";

describe("Select", () => {
  const mockRates: CurrencyMap = {
    USD: {
      code: "USD",
      alphaCode: "USD",
      numericCode: "840",
      name: "US Dollar",
      rate: 1,
      inverseRate: 1,
    },
    GBP: {
      code: "GBP",
      alphaCode: "GBP",
      numericCode: "826",
      name: "British Pound",
      rate: 0.8,
      inverseRate: 1.25,
    },
  };

  const mockRates2: CurrencyMap = {
    GBP: {
      code: "GBP",
      alphaCode: "GBP",
      numericCode: "826",
      name: "British Pound",
      rate: 0.8,
      inverseRate: 1.25,
    },
  };

  it("renders placeholder when no value is provided", () => {
    render(<Select data={mockRates} func={() => {}} />);
    expect(screen.getByText("Select a currency")).toBeInTheDocument();
  });

  it("renders the current value when provided", () => {
    render(
      <Select data={mockRates2} value="USD" name="US Dollar" func={() => {}} />
    );
    expect(screen.getByText("US Dollar")).toBeInTheDocument();
  });

  it("calls func with the selected value on change", () => {
    const handleChange = vi.fn();
    render(<Select data={mockRates} func={handleChange} />);

    const select = screen.getByTestId("select");
    fireEvent.change(select, { target: { value: "GBP" } });

    expect(handleChange).toHaveBeenCalledWith("GBP");
  });
});
