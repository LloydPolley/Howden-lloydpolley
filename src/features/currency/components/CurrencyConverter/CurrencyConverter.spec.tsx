import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "../../slice";
import CurrencyConverter from "./CurrencyConverter";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import {
  sampleRates,
  sampleCurrencyUSD,
  sampleCurrencyEUR,
} from "@/mocks/currencyMocks";

vi.mock("@/features/currency/thunk", () => ({
  fetchRates: Object.assign(() => ({ type: "mock" }), {
    pending: "currency/fetchRates/pending",
    fulfilled: "currency/fetchRates/fulfilled",
    rejected: "currency/fetchRates/rejected",
  }),
}));

describe("CurrencyConverter", () => {
  it("renders the form", () => {
    const store = configureStore({
      reducer: { currency: currencyReducer },
      preloadedState: {
        currency: {
          rates: sampleRates,
          fromCurrency: sampleCurrencyUSD,
          toCurrency: sampleCurrencyEUR,
          result: null,
          amount: 10,
          loading: false,
          error: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <CurrencyConverter />
      </Provider>
    );

    expect(screen.getByTestId("currency-form")).toBeInTheDocument();
  });

  it("shows loading spinner when loading is true", () => {
    const store = configureStore({
      reducer: { currency: currencyReducer },
      preloadedState: {
        currency: {
          rates: sampleRates,
          fromCurrency: sampleCurrencyUSD,
          toCurrency: sampleCurrencyEUR,
          result: null,
          amount: 0,
          loading: true,
          error: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <CurrencyConverter />
      </Provider>
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("shows error when error is present", () => {
    const store = configureStore({
      reducer: { currency: currencyReducer },
      preloadedState: {
        currency: {
          rates: sampleRates,
          fromCurrency: sampleCurrencyUSD,
          toCurrency: sampleCurrencyEUR,
          result: null,
          amount: 0,
          loading: false,
          error: "Failed to fetch rates",
        },
      },
    });

    render(
      <Provider store={store}>
        <CurrencyConverter />
      </Provider>
    );

    expect(screen.getByText(/failed to fetch rates/i)).toBeInTheDocument();
  });

  it("dispatches result on form submit", async () => {
    const user = userEvent.setup();

    const store = configureStore({
      reducer: { currency: currencyReducer },
      preloadedState: {
        currency: {
          rates: sampleRates,
          fromCurrency: sampleCurrencyUSD,
          toCurrency: sampleCurrencyEUR,
          result: null,
          amount: 10,
          loading: false,
          error: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <CurrencyConverter />
      </Provider>
    );

    await user.click(screen.getByTestId("submit-btn"));

    await waitFor(() => {
      expect(store.getState().currency.result).toBeCloseTo(9, 2);
    });
  });
});
