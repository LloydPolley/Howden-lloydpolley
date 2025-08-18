import CurrencyConverter from "@/features/currency/components/CurrencyConverter/CurrencyConverter";
import Hero from "@/shared/components/Hero/Hero";

function App() {
  return (
    <div className="min-h-screen flex items-center mt-[100px] p-4 flex-col">
      <Hero />
      <CurrencyConverter />
    </div>
  );
}

export default App;
