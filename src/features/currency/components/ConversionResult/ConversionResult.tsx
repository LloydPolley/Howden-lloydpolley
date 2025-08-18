export default function ConversionResult({ result }: { result: number }) {
  return (
    <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6  border border-white/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/70 text-sm mb-1">Converted Amount</p>
          <p className="text-2xl font-bold text-white">{result}</p>
        </div>
      </div>
    </div>
  );
}
