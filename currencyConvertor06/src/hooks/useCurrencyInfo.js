import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`https://open.er-api.com/v6/latest/${currency.toUpperCase()}`)
            .then((res) => res.json())
            .then((res) =>
                setData({
                    rates: res.rates,
                    time: res.time_last_update_utc,
                })
            );
    }, [currency]);

    return data;
}

export default useCurrencyInfo;