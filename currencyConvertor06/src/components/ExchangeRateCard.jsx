function ExchangeRateCard({
    from,
    to,
    currInfo,
    lastUpdated,
}) {
    return (
        <div className="mt-4 bg-white/20 rounded-lg p-3 text-white">
            <h3 className="font-semibold">
                Current Exchange Rate
            </h3>

            <p>
                1 {from.toUpperCase()} ={" "}
                {currInfo[to]?.toFixed(4)}{" "}
                {to.toUpperCase()}
            </p>

            <p className="text-xs mt-2 text-gray-200">
                Updated: {lastUpdated}
            </p>
        </div>
    );
}

export default ExchangeRateCard;