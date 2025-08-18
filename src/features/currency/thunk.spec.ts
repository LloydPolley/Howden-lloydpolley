import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./slice";
import { fetchRates } from "./thunk";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("fetchRates thunk", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns rates when fetch succeeds", async () => {
    const mockResponse = {
      USD: {
        code: "USD",
        name: "US Dollar",
        rate: 1,
        alphaCode: "USD",
      },
    };

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve(mockResponse) })
      ) as any
    );

    const store = configureStore({ reducer: { currency: currencyReducer } });
    const resultAction = await store.dispatch(fetchRates("USD"));

    expect(resultAction.payload).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      "http://www.floatrates.com/daily/usd.json"
    );
  });

  it("returns a rejected action when fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: false, status: 500 })) as any
    );

    const store = configureStore({ reducer: { currency: currencyReducer } });
    const resultAction = await store.dispatch(fetchRates("USD"));

    if (fetchRates.rejected.match(resultAction)) {
      expect(resultAction.error.message).toBe("HTTP error: 500");
    } else {
      throw new Error("Expected fetchRates to be rejected");
    }
  });
});
