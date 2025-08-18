import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import useAmountValidation from "./useAmountValidation";

describe("useAmountValidation", () => {
  it("returns error if amount is 0 or negative", () => {
    const { result } = renderHook(() => useAmountValidation(0, "USD", "GBP"));
    expect(result.current.error).toBe("Amount must be positive");
    expect(result.current.isValid).toBe(false);

    const { result: negResult } = renderHook(() =>
      useAmountValidation(-10, "USD", "GBP")
    );
    expect(negResult.current.error).toBe("Amount must be positive");
    expect(negResult.current.isValid).toBe(false);
  });

  it("returns error if amount has more than 2 decimals", () => {
    const { result } = renderHook(() =>
      useAmountValidation(1.234, "USD", "GBP")
    );
    expect(result.current.error).toBe(
      "Amount must have maximum 2 decimal places"
    );
    expect(result.current.isValid).toBe(false);
  });

  it("returns error if toCurrency is empty", () => {
    const { result } = renderHook(() => useAmountValidation(10, "USD", ""));
    expect(result.current.error).toBe("Please select a target currency");
    expect(result.current.isValid).toBe(false);
  });

  it("returns no error if valid", () => {
    const { result } = renderHook(() => useAmountValidation(10, "USD", "GBP"));
    expect(result.current.error).toBeNull();
    expect(result.current.isValid).toBe(true);
  });
});
