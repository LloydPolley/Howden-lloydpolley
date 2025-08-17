import CurrencyConvertor from "./features/currency/CurrencyConvertor";
import Hero from "./components/Hero/Hero";

function App() {
  return (
    <div className="min-h-screen flex items-center mt-[100px] p-4 flex-col">
      <Hero />
      <CurrencyConvertor />
    </div>
  );
}

export default App;
