function Analytics({
    totalConversions,
    mostUsedPair,
    lastConversion,
    favoritesCount,
}) {
    return (
        <div className="mt-4 bg-white/20 rounded-lg p-3 text-white">
            <h3 className="font-semibold mb-2">
                Analytics
            </h3>

            <p>Total Conversions: {totalConversions}</p>
            <p>Most Used Pair: {mostUsedPair}</p>
            <p>Last Conversion: {lastConversion}</p>
            <p>Favorites Saved: {favoritesCount}</p>
        </div>
    );
}

export default Analytics;