// Select.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Select from "./Select";
import { sampleRates } from "@/mocks/currencyMocks";

describe("Select", () => {
  it("renders placeholder when no value is provided", () => {
    render(<Select data={sampleRates} func={() => {}} />);
    expect(screen.getByText("Select a currency")).toBeInTheDocument();
  });

  it("renders the current value when provided (endpoint doesnt provide own currency GBP - U.K. Pound Sterling)", () => {
    render(
      <Select
        data={sampleRates}
        value="AED"
        name="U.A.E. Dirham"
        func={() => {}}
      />
    );
    expect(screen.getByText("U.A.E. Dirham")).toBeInTheDocument();
  });

  it("calls func with the selected value on change", () => {
    const handleChange = vi.fn();
    render(<Select data={sampleRates} func={handleChange} />);

    const select = screen.getByTestId("select");
    fireEvent.change(select, { target: { value: "GBP" } });

    expect(handleChange).toHaveBeenCalledWith("GBP");
  });
});
