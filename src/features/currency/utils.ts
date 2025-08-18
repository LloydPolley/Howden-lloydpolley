export function convertCurrency({
  amount,
  fromRate,
  toRate,
}: {
  amount: number;
  fromRate: number;
  toRate: number;
}) {
  const result = (amount * toRate) / fromRate;
  return Math.round(result * 100) / 100;
}
