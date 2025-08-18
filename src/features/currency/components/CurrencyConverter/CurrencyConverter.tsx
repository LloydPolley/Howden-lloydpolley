import { useAppDispatch, useAppSelector } from "@/hooks/useCurrency";
import {
  setFromCurrency,
  setToCurrency,
  setResult,
  setAmount,
} from "@/features/currency/slice";
import FromPricing from "@/features/currency/components/FromPricing/FromPricing";
import ToPricing from "@/features/currency/components/ToPricing/ToPricing";
import ConversionResult from "@/features/currency/components/ConversionResult/ConversionResult";
import { convertCurrency } from "@/features/currency/utils";
import useAmountValidation from "@/hooks/useAmountValidation";
import Error from "@/shared/components/Error/Error";
import { useEffect, useState } from "react";
import { fetchRates } from "@/features/currency/thunk";
import Loading from "@/shared/components/Loading/Loading";
import SubmitButton from "@/shared/components/SubmitButton/SubmitButton";

export default function CurrencyConverter() {
  const [submitted, setSubmitted] = useState(false);
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
    setSubmitted(true);
    const calculatedResult = convertCurrency({
      amount: amount,
      fromRate: fromCurrency.rate,
      toRate: toCurrency.rate,
    });

    dispatch(setResult(calculatedResult));
  };

  if (fetchError) {
    return <Error error={fetchError} />;
  }

  return (
    <div className="relative z-10 w-full max-w-md">
      <form
        data-testid="currency-form"
        onSubmit={onSubmit}
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20"
      >
        <FromPricing
          rates={rates}
          onAmountChange={handleAmountChange}
          handleSetFrom={handleSetFrom}
          value={fromCurrency.code}
          name={fromCurrency.name}
          amount={amount}
        />
        <ToPricing rates={rates} handleSetTo={handleSetTo} />
        <ConversionResult result={result || 0} />

        <div className="min-h-10">{submitted && <Error error={error} />}</div>
        <SubmitButton disabled={!isValid || loading}>
          {loading ? <Loading /> : "Convert Currency"}
        </SubmitButton>
      </form>
    </div>
  );
}
