import currencyReducer, {
  setFromCurrency,
  setToCurrency,
  setAmount,
  setRates,
  setResult,
} from "./slice";
import { fetchRates } from "./thunk";
import type { CurrencyState } from "../../types";
import { describe, it, expect } from "vitest";
import {
  sampleCurrencyUSD,
  sampleCurrencyGBP,
  sampleRates,
} from "../../mocks/currencyMocks";

describe("currency slice", () => {
  const initialState: CurrencyState = {
    fromCurrency: sampleCurrencyGBP,
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

  it("handles setFromCurrency", () => {
    const nextState = currencyReducer(
      initialState,
      setFromCurrency(sampleCurrencyUSD)
    );
    expect(nextState.fromCurrency.code).toBe("USD");
  });

  it("handles setToCurrency", () => {
    const nextState = currencyReducer(
      initialState,
      setToCurrency(sampleCurrencyUSD)
    );
    expect(nextState.toCurrency.code).toBe("USD");
  });

  it("handles setAmount", () => {
    const nextState = currencyReducer(initialState, setAmount(100));
    expect(nextState.amount).toBe(100);
  });

  it("handles setRates", () => {
    const nextState = currencyReducer(initialState, setRates(sampleRates));
    expect(nextState.rates).toEqual(sampleRates);
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
    const nextState = currencyReducer(initialState, {
      type: fetchRates.fulfilled.type,
      payload: sampleRates,
    });
    expect(nextState.rates).toEqual(sampleRates);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it("handles fetchRates.rejected", () => {
    const nextState = currencyReducer(initialState, {
      type: fetchRates.rejected.type,
    });
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(
      "Failed to fetch exchange rates, please try again"
    );
  });
});
