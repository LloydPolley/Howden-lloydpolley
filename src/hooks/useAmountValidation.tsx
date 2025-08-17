import { useEffect, useState } from "react";

export default function useAmountValidation(
  amount: number,
  fromCurrency: string,
  toCurrency: string
) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (amount <= 0) {
      setError("Amount must be positive");
    } else if (!/^\d+(\.\d{1,2})?$/.test(amount.toString())) {
      setError("Amount must have maximum 2 decimal places");
    } else if (!toCurrency || toCurrency?.trim() === "") {
      setError("Please select a target currency");
    } else {
      setError(null);
    }
  }, [amount, fromCurrency, toCurrency]);

  return { error, isValid: !error };
}
