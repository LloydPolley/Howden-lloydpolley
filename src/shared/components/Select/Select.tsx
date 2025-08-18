import type { CurrencyMap } from "@/types";

export default function Select({
  data,
  value,
  name,
  func,
}: {
  data: CurrencyMap;
  value?: string;
  name?: string;
  func: (value: string) => void;
}) {
  return (
    <select
      onChange={(e) => func(e.target.value)}
      value={value}
      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
      role="combobox"
      data-testid="select"
    >
      {!value && <option>Select a currency</option>}
      {value && <option value={value}>{name}</option>}
      {data &&
        Object.entries(data).map(([key, objectValue]) => {
          return (
            <option key={key} value={objectValue.code}>
              {objectValue.name}
            </option>
          );
        })}
    </select>
  );
}
