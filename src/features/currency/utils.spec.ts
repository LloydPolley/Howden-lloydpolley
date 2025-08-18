import { describe, it, expect } from "vitest";
import { convertCurrency } from "./utils";

describe("convertCurrency", () => {
  it("converts correctly from one rate to another", () => {
    const result = convertCurrency({ amount: 100, fromRate: 1, toRate: 0.8 });
    expect(result).toBe(80);
  });

  it("rounds to 2 decimal places", () => {
    const result = convertCurrency({ amount: 10, fromRate: 3, toRate: 2 });
    expect(result).toBe(6.67);
  });

  it("returns 0 when amount is 0", () => {
    const result = convertCurrency({ amount: 0, fromRate: 1, toRate: 5 });
    expect(result).toBe(0);
  });

  it("returns the same amount if rates are equal", () => {
    const result = convertCurrency({ amount: 50, fromRate: 2, toRate: 2 });
    expect(result).toBe(50);
  });

  it("handles small fractional results", () => {
    const result = convertCurrency({ amount: 1, fromRate: 3, toRate: 1 });
    expect(result).toBe(0.33);
  });
});
