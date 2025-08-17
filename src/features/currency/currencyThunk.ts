import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CurrencyMap } from "../../types";

export const fetchRates = createAsyncThunk(
  "currency/fetchRates",
  async (baseCurrency: string) => {
    const res = await fetch(
      `http://www.floatrates.com/daily/${baseCurrency.toLowerCase()}.json`
    );

    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const rates = (await res.json()) as CurrencyMap;
    return rates;
  }
);
