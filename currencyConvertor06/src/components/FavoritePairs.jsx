function FavoritePairs({
    favorites,
    setFavorites,
    setFrom,
    setTo,
}) {
    return (
        <div className="mt-4">
            <h3 className="text-white font-semibold mb-2">
                Favorite Pairs
            </h3>

            <div className="flex flex-wrap gap-2">
                {favorites.map((pair) => (
                    <div
                        key={pair}
                        className="flex items-center gap-2 bg-white/20 rounded-lg px-2 py-1"
                    >
                        <button
                            type="button"
                            onClick={() => {
                                const [favFrom, favTo] = pair.split("-");

                                setFrom(favFrom);
                                setTo(favTo);
                            }}
                            className="text-white"
                        >
                            ⭐ {pair}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                const updated = favorites.filter(
                                    (item) => item !== pair
                                );

                                setFavorites(updated);

                                localStorage.setItem(
                                    "favorites",
                                    JSON.stringify(updated)
                                );
                            }}
                            className="text-red-400 hover:text-red-600"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavoritePairs;