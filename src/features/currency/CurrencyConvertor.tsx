import { useAppDispatch, useAppSelector } from "../../hooks/useCurrency";
import {
  setFromCurrency,
  setToCurrency,
  setResult,
  setAmount,
} from "@/features/currency/currencySlice";
import Button from "@/components/Button/Button";
import FromPricing from "@/components/CurrencyComponents/FromPricing/FromPricing";
import ToPricing from "@/components/CurrencyComponents/ToPricing/ToPricing";
import ConversionResult from "@/components/CurrencyComponents/ConversionResult/ConversionResult";
import { convertCurrency } from "@/features/currency/currencyUtils";
import useAmountValidation from "../../hooks/useAmountValidation";
import Error from "@/components/Error/Error";
import { useEffect } from "react";
import { fetchRates } from "@/features/currency/currencyThunk";
import Loading from "@/components/Loading/Loading";

export default function CurrencyConvertor() {
  const dispatch = useAppDispatch();
  const {
    rates,
    fromCurrency,
    toCurrency,
    result,
    amount,
    loading,
    error: fetchError,
  } = useAppSelector((state) => state.currency);

  useEffect(() => {
    dispatch(fetchRates(fromCurrency.code));
  }, [dispatch, fromCurrency]);

  const { error, isValid } = useAmountValidation(
    amount,
    fromCurrency.code,
    toCurrency?.code || ""
  );

  const handleAmountChange = (value: number) => {
    dispatch(setAmount(Number(value)));
  };

  const handleSetTo = (value: string) => {
    const currency = rates[value.toLowerCase()];
    dispatch(setToCurrency(currency));
  };

  const handleSetFrom = (value: string) => {
    const currency = rates[value.toLowerCase()];
    dispatch(setFromCurrency(currency));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toRate = rates[toCurrency.code.toLowerCase()];
    const fromRate = rates[fromCurrency.code.toLowerCase()];

    console.log("submit");
    console.log("toRate", toRate);
    console.log("fromRate", fromRate);

    if (!toRate || !fromRate) {
      return;
    }

    const calculatedResult = convertCurrency({
      amount: amount,
      fromRate: fromRate.rate,
      toRate: toRate.rate,
    });

    dispatch(setResult(calculatedResult));
  };

  if (loading) {
    return <Loading />;
  }

  if (fetchError) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
        <Error error={fetchError} />
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full max-w-md">
      <form
        onSubmit={onSubmit}
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20"
      >
        <FromPricing
          rates={rates}
          onAmountChange={handleAmountChange}
          handleSetFrom={handleSetFrom}
          value={fromCurrency.code}
          name={fromCurrency.name}
        />
        <ToPricing rates={rates} handleSetTo={handleSetTo} />
        <ConversionResult result={result || 0} />
        <Error error={fetchError || error} />
        <Button type="submit" disabled={!isValid}>
          Convert Currency
        </Button>
      </form>
    </div>
  );
}
