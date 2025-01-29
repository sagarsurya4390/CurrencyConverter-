import { useState } from 'react';
import { InputBox } from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    // Swap the currencies
    setFrom(to);
    setTo(from);
    
    // Recalculate the amount for the "To" currency after swap
    const newConvertedAmount = amount * currencyInfo[to];
    setConvertedAmount(newConvertedAmount);
  };

  const convert = () => {
    const newConvertedAmount = amount * currencyInfo[to];
    setConvertedAmount(newConvertedAmount);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          `url(https://images.pexels.com/photos/259209/pexels-photo-259209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)} // Fixed setState
                selectedCurrency={from}
                onAmountChange={(newAmount) => {
                  setAmount(newAmount);
                  setConvertedAmount(newAmount * currencyInfo[to]); // Recalculate the converted amount
                }}
              />
            </div>

            <div className="relative w-full">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2
                         border-white rounded-md
                         bg-blue-600 text-white px-2
                         py-0.5"
                onClick={swap}
              >
                Swap
              </button>

              <div className="w-full mb-1">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)} // Fixed setState
                  selectedCurrency={to} // Corrected to use `to`
                  amountDisabled
                />
              </div>

              <button
                type="submit" // Corrected typo here
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
