import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import type { CurrencyMap } from "../../../types";
import Label from "../../../components/Label/Label";

export default function FromPricing({
  rates,
  onAmountChange,
  handleSetFrom,
  value,
  name,
}: {
  rates: CurrencyMap;
  onAmountChange: (value: number) => void;
  handleSetFrom: (value: string) => void;
  value: string;
  name: string;
}) {
  return (
    <div className="mb-6">
      <Label>From</Label>
      <div className="space-y-3">
        <Input
          onChange={(e) => onAmountChange(Number(e.target.value))}
          placeholder="Enter amount"
        />
        <Select data={rates} value={value} name={name} func={handleSetFrom} />
      </div>
    </div>
  );
}
