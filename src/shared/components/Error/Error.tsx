export default function Error({ error }: { error: string | null }) {
  return (
    <div className="p-2">
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
}
