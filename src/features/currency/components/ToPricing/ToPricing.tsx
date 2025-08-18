import Select from "@/shared/components/Select/Select";
import type { CurrencyMap } from "@/types";
import Label from "@/shared/components/Label/Label";

export default function ToPricing({
  rates,
  handleSetTo,
}: {
  rates: CurrencyMap;
  handleSetTo: (value: string) => void;
}) {
  return (
    <div className="mb-6">
      <Label>To</Label>
      <Select data={rates as unknown as CurrencyMap} func={handleSetTo} />
    </div>
  );
}
