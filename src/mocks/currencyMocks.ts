import type { CurrencyType, CurrencyMap } from "../types";

export const sampleCurrencyGBP: CurrencyType = {
  code: "GBP",
  alphaCode: "GBP",
  name: "U.K. Pound Sterling",
  rate: 1,
};

export const sampleCurrencyUSD: CurrencyType = {
  code: "USD",
  alphaCode: "USD",
  name: "US Dollar",
  rate: 1,
};

export const sampleCurrencyEUR: CurrencyType = {
  code: "EUR",
  alphaCode: "EUR",
  name: "Euro",
  rate: 0.9,
};

export const sampleRates: CurrencyMap = {
  GBP: sampleCurrencyGBP,
  USD: sampleCurrencyUSD,
  EUR: sampleCurrencyEUR,
};
