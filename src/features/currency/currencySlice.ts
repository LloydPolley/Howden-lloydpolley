import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchRates } from "./currencyThunk";
import type { CurrencyMap, CurrencyType } from "../../types";
import type { CurrencyState } from "../../types";

const defaultRate = {
  code: "GBP",
  alphaCode: "GBP",
  numericCode: "826",
  name: "U.K. Pound Sterling",
  rate: 1,
  inverseRate: 1,
};

const defaultToRate = {
  code: "",
  alphaCode: "",
  numericCode: "",
  name: "",
  rate: 1,
  inverseRate: 1,
};

const initialState: CurrencyState = {
  fromCurrency: defaultRate,
  toCurrency: defaultToRate,
  amount: 0,
  result: 0,
  rates: {},
  loading: false,
  error: null,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setFromCurrency: (state, action: PayloadAction<CurrencyType>) => {
      const { code, alphaCode, numericCode, name } = action.payload;
      state.fromCurrency = {
        code,
        alphaCode,
        numericCode,
        name,
        rate: 1,
        inverseRate: 1,
      };
    },
    setToCurrency: (state, action: PayloadAction<CurrencyType>) => {
      state.toCurrency = action.payload;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setRates: (state, action: PayloadAction<Record<string, CurrencyType>>) => {
      state.rates = action.payload;
    },
    setResult: (state, action: PayloadAction<number>) => {
      state.result = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchRates.fulfilled,
        (state, action: PayloadAction<CurrencyMap>) => {
          state.rates = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchRates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRates.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch exchange rates";
      });
  },
});

export const {
  setFromCurrency,
  setToCurrency,
  setAmount,
  setRates,
  setResult,
} = currencySlice.actions;
export default currencySlice.reducer;
