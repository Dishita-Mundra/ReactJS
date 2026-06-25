function ConversionHistory({
    history,
    setHistory,
}) {
    return (
        <div className="mt-4 text-white">

            <button
                type="button"
                onClick={() => {
                    setHistory([]);
                    localStorage.removeItem(
                        "conversionHistory"
                    );
                }}
                className="mb-2 bg-red-500 text-white px-3 py-1 rounded-lg"
            >
                Clear History
            </button>

            <h3 className="font-semibold mb-2">
                Recent Conversions
            </h3>

            {history.map((item, index) => (
                <div
                    key={index}
                    className="bg-white/20 rounded-lg p-2 mb-2 text-sm"
                >
                    {item.amount} {item.from} → {item.to}
                    = {item.result}
                </div>
            ))}
        </div>
    );
}

export default ConversionHistory;