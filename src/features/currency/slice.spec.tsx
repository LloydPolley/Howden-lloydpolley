import currencyReducer, {
  setFromCurrency,
  setToCurrency,
  setAmount,
  setRates,
  setResult,
} from "./slice";
import { fetchRates } from "./thunk";
import type { CurrencyState, CurrencyType, CurrencyMap } from "../../types";
import { describe, it, expect } from "vitest";

describe("currency slice", () => {
  const initialState: CurrencyState = {
    fromCurrency: {
      code: "GBP",
      alphaCode: "GBP",
      name: "U.K. Pound Sterling",
      rate: 1,
    },
    toCurrency: {
      code: "",
      alphaCode: "",
      name: "",
      rate: 1,
    },
    amount: 0,
    result: 0,
    rates: {},
    loading: false,
    error: null,
  };

  const sampleCurrency: CurrencyType = {
    code: "USD",
    alphaCode: "USD",
    name: "US Dollar",
    rate: 1,
  };

  it("handles setFromCurrency", () => {
    const nextState = currencyReducer(
      initialState,
      setFromCurrency(sampleCurrency)
    );
    expect(nextState.fromCurrency.code).toBe("USD");
  });

  it("handles setToCurrency", () => {
    const nextState = currencyReducer(
      initialState,
      setToCurrency(sampleCurrency)
    );
    expect(nextState.toCurrency.code).toBe("USD");
  });

  it("handles setAmount", () => {
    const nextState = currencyReducer(initialState, setAmount(100));
    expect(nextState.amount).toBe(100);
  });

  it("handles setRates", () => {
    const rates: CurrencyMap = { USD: sampleCurrency };
    const nextState = currencyReducer(initialState, setRates(rates));
    expect(nextState.rates).toEqual(rates);
  });

  it("handles setResult", () => {
    const nextState = currencyReducer(initialState, setResult(50));
    expect(nextState.result).toBe(50);
  });

  it("handles fetchRates.pending", () => {
    const nextState = currencyReducer(initialState, {
      type: fetchRates.pending.type,
    });
    expect(nextState.loading).toBe(true);
  });

  it("handles fetchRates.fulfilled", () => {
    const rates: CurrencyMap = { USD: sampleCurrency };
    const nextState = currencyReducer(initialState, {
      type: fetchRates.fulfilled.type,
      payload: rates,
    });
    expect(nextState.rates).toEqual(rates);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it("handles fetchRates.rejected", () => {
    const nextState = currencyReducer(initialState, {
      type: fetchRates.rejected.type,
    });
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe("Failed to fetch exchange rates");
  });
});
