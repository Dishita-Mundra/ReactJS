import { useState } from 'react'
import { InputBox } from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import currencybg from './assets/currencybg.jpg';
import Analytics from "./components/Analytics";
import FavoritePairs from "./components/FavoritePairs";
import ConversionHistory from "./components/ConversionHistory";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("conversionHistory")) || []
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const [isListening, setIsListening] = useState(false);

  const currencyData = useCurrencyInfo(from);

  const currInfo = currencyData.rates || {};
  const lastUpdated = currencyData.time;

  const options = Object.keys(currInfo);

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    setIsListening(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase();

      console.log(text);

      const match = text.match(
        /convert (\d+) (\w+) to (\w+)/
      );

      if (match) {
        const amountValue = Number(match[1]);
        const fromCurrency = match[2].toUpperCase();
        const toCurrency = match[3].toUpperCase();

        setAmount(amountValue);
        setFrom(fromCurrency);
        setTo(toCurrency);

        setTimeout(() => {
          setConvertedAmount(
            amountValue * (currInfo[toCurrency] || 0)
          );
        }, 500);
      }

      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const convert = () => {
    const result = amount * currInfo[to];

    setConvertedAmount(result);

    const newEntry = {
      amount,
      from,
      to,
      result: result.toFixed(2),
      time: new Date().toLocaleString(),
    };

    const updatedHistory = [newEntry, ...history].slice(0, 5);

    setHistory(updatedHistory);

    localStorage.setItem(
      "conversionHistory",
      JSON.stringify(updatedHistory)
    );
  };

  const totalConversions = history.length;

  const mostUsedPair = history.length
    ? history
      .map((item) => `${item.from}-${item.to}`)
      .sort(
        (a, b) =>
          history.filter((x) => `${x.from}-${x.to}` === b).length -
          history.filter((x) => `${x.from}-${x.to}` === a).length
      )[0]
    : "None";

  const lastConversion =
    history.length > 0
      ? `${history[0].amount} ${history[0].from} → ${history[0].to}`
      : "No conversions yet";

  return (
    <div
      className="w-full min-h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat py-10"
      style={{
        backgroundImage: `url('${currencybg}')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert()
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 hover:bg-blue-700 hover:scale-110 hover:shadow-xl
                active:scale-95
                transition-all duration-300"
                onClick={swap}
              >
                swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>

            <button
              type="button"
              onClick={startListening}
              className="w-full mb-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
            >
              {isListening ? "🎙 Listening..." : "🎤 Voice Convert"}
            </button>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg
              hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1
             active:scale-95
             transition-all duration-300"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>

            <button
              type="button"
              onClick={() => {
                const pair = `${from}-${to}`;

                if (!favorites.includes(pair)) {
                  const updated = [...favorites, pair];

                  setFavorites(updated);

                  localStorage.setItem(
                    "favorites",
                    JSON.stringify(updated)
                  );
                }
              }}
              className="w-full mt-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-all"
            >
              ⭐ Save Pair
            </button>

            <FavoritePairs
              favorites={favorites}
              setFavorites={setFavorites}
              setFrom={setFrom}
              setTo={setTo}
            />

            <ConversionHistory
              history={history}
              setHistory={setHistory}
            />

            <div className="mt-4 bg-white/20 rounded-lg p-3 text-white">
              <h3 className="font-semibold">
                Current Exchange Rate
              </h3>

              <p>
                1 {from.toUpperCase()} = {currInfo[to]?.toFixed(4)} {to.toUpperCase()}
              </p>

              <p className="text-xs mt-2 text-gray-200">
                Updated: {lastUpdated}
              </p>
            </div>

            <Analytics
              totalConversions={totalConversions}
              mostUsedPair={mostUsedPair}
              lastConversion={lastConversion}
              favoritesCount={favorites.length}
            />

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;