export default function Loading() {
  return (
    <div className="flex items-center justify-center p-8" data-testid="loading">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
    </div>
  );
}
