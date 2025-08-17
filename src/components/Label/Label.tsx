export default function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-white/90 mb-3">
      {children}
    </label>
  );
}
