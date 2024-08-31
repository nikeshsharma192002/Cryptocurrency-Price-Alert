import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const CryptoPriceAlert = () => {
    const [cryptos, setCryptos] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState("");
    const [upperTargetPrice, setUpperTargetPrice] = useState("");
    const [lowerTargetPrice, setLowerTargetPrice] = useState("");
    const [alerts, setAlerts] = useState([]); 
    const [currentPrices, setCurrentPrices] = useState({});

    useEffect(() => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/coins/markets",
                    {
                        params: {
                            vs_currency: "usd",
                            order: "market_cap_desc",
                            per_page: 100,
                            page: 1,
                            sparkline: false,
                        },
                    }
                );
                setCryptos(response.data);
            } catch (error) {
                console.error("Error fetching cryptocurrencies:", error);
            }
        };
        fetchCryptos();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (alerts.length > 0) {
                try {
                    const ids = alerts.map(alert => alert.crypto).join(',');
                    const response = await axios.get(
                        `https://api.coingecko.com/api/v3/simple/price`,
                        {
                            params: {
                                ids: ids,
                                vs_currencies: "usd",
                            },
                        }
                    );

                    const newPrices = {};
                    alerts.forEach(alert => {
                        const price = response.data[alert.crypto]?.usd;

                        newPrices[alert.crypto] = price;

                        if (price !== undefined) {
                            if (price >= alert.upperTargetPrice) {
                                showNotification(`${alert.crypto.toUpperCase()} price has reached or exceeded $${alert.upperTargetPrice}! Current price: $${price}`);
                            } 
                            if (price <= alert.lowerTargetPrice) {
                                showNotification(`${alert.crypto.toUpperCase()} price has dropped to or below $${alert.lowerTargetPrice}! Current price: $${price}`);
                            }
                        }
                    });

                    setCurrentPrices(newPrices); 
                } catch (error) {
                    console.error("Error fetching prices:", error);
                }
            }
        }, 50000); 

        return () => clearInterval(interval); 
    }, [alerts]);

    const showNotification = (message) => {
        if (Notification.permission === "granted") {
            new Notification("Crypto Price Alert", { body: message });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedCrypto || !upperTargetPrice || !lowerTargetPrice) return;

        const newAlert = {
            crypto: selectedCrypto,
            upperTargetPrice: parseFloat(upperTargetPrice),
            lowerTargetPrice: parseFloat(lowerTargetPrice),
        };

        setAlerts([...alerts, newAlert]); 
        setSelectedCrypto(""); 
        setUpperTargetPrice(""); 
        setLowerTargetPrice(""); 
    };

    return (
        <div className="container">
            <h1>Crypto Price Alert</h1>
            <form onSubmit={handleSubmit}>
                <select value={selectedCrypto} onChange={(e) => setSelectedCrypto(e.target.value)} required>
                    <option value="">Select Cryptocurrency</option>
                    {cryptos.map((crypto) => (
                        <option key={crypto.id} value={crypto.id}>
                            {crypto.name} ({crypto.symbol.toUpperCase()}) - ${crypto.current_price}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Upper Target Price in USD"
                    value={upperTargetPrice}
                    onChange={(e) => setUpperTargetPrice(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Lower Target Price in USD"
                    value={lowerTargetPrice}
                    onChange={(e) => setLowerTargetPrice(e.target.value)}
                    required
                />
                <button type="submit">Set Alert</button>
            </form>
            <div className="crypto-list">
                <h2>Available Cryptocurrencies</h2>
                {cryptos.map((crypto) => (
                    <div key={crypto.id} className="crypto-item">
                         <img src={crypto.image} alt={`${crypto.name} logo`} width="30" height="30" style={{ marginRight: "10px" }} />
                        <span>{crypto.name} ({crypto.symbol.toUpperCase()})</span>
                        <span>${currentPrices[crypto.id] || crypto.current_price}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

ReactDOM.render(<CryptoPriceAlert />, document.getElementById("root"));
