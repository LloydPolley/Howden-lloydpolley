export type CurrencyType = {
  name: string;
  code: string;
  alphaCode: string;
  rate: number;
};

export type CurrencyMap = Record<string, CurrencyType>;

export type CurrencyState = {
  fromCurrency: CurrencyType;
  toCurrency: CurrencyType;
  amount: number;
  result: number | null;
  rates: Record<string, CurrencyType>;
  loading: boolean;
  error: string | null;
};
