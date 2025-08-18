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
import { useEffect } from "react";
import { fetchRates } from "@/features/currency/thunk";
import Loading from "@/shared/components/Loading/Loading";
import SubmitButton from "@/shared/components/SubmitButton/SubmitButton";

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
    const calculatedResult = convertCurrency({
      amount: amount,
      fromRate: fromCurrency.rate,
      toRate: toCurrency.rate,
    });

    dispatch(setResult(calculatedResult));
  };

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
        <Error error={fetchError || error} />
        <SubmitButton disabled={!isValid || loading}>
          {loading ? <Loading /> : "Convert Currency"}
        </SubmitButton>
      </form>
    </div>
  );
}
