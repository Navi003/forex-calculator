import React, { useState, useEffect } from "react";
import { fetchForexRates } from "../api/forexApi";

const PositionSizeCalculator = () => {
  const [rates, setRates] = useState({});
  const [currencyPair, setCurrencyPair] = useState("EURUSD");
  const [accountBalance, setAccountBalance] = useState("");
  const [riskPercentage, setRiskPercentage] = useState("");
  const [stopLossPips, setStopLossPips] = useState("");
  const [positionSize, setPositionSize] = useState(null);

  useEffect(() => {
    // Fetch forex rates on component mount
    const loadRates = async () => {
      const data = await fetchForexRates();
      console.log(data);
      setRates(data);
    };
    loadRates();
  }, []);
  console.log(rates);
  const calculatePositionSize = () => {
    const riskAmount = accountBalance * (riskPercentage / 100);
    const pipValue = 0.0001; // Modify as needed for calculation
    const positionSize = riskAmount / (stopLossPips * pipValue);

    setPositionSize(positionSize.toFixed(2));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        Forex Position Size Calculator
      </h2>

      <div className="mb-4">
        <label className="block font-medium">Currency Pair</label>
        <select
          className="mt-1 block w-full p-2 border rounded"
          //   value={currencyPair}
          //   onChange={(e) => setCurrencyPair("")}
        >
          {rates &&
            Object.keys(rates).map((pair) => (
              <option key={pair} value={pair}>
                {pair}
              </option>
            ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Account Balance</label>
        <input
          type="number"
          className="mt-1 block w-full p-2 border rounded"
          value={accountBalance}
          onChange={(e) => setAccountBalance(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Risk Percentage (%)</label>
        <input
          type="number"
          className="mt-1 block w-full p-2 border rounded"
          value={riskPercentage}
          onChange={(e) => setRiskPercentage(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Stop Loss (Pips)</label>
        <input
          type="number"
          className="mt-1 block w-full p-2 border rounded"
          value={stopLossPips}
          onChange={(e) => setStopLossPips(e.target.value)}
        />
      </div>

      <button
        onClick={calculatePositionSize}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Calculate Position Size
      </button>

      {positionSize && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold">
            Position Size: {positionSize} units
          </h3>
        </div>
      )}
    </div>
  );
};

export default PositionSizeCalculator;
