export default function SubmitButton({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      className={`
    w-full font-semibold py-4 px-6 rounded-2xl transition-all duration-300 
    focus:outline-none focus:ring-2 focus:ring-white/50 h-18
    ${
      disabled
        ? "bg-gray-500/30 text-gray-400 cursor-not-allowed"
        : "bg-white/20 hover:bg-white/30 text-white hover:shadow-lg"
    }
  `}
      disabled={disabled}
      data-testid="submit-btn"
      type="submit"
    >
      {children}
    </button>
  );
}
