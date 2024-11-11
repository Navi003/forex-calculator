import axios from "axios";

// Replace with your chosen Forex API endpoint and API key
const API_URL = "https://api.exchangeratesapi.io/latest";
const API_KEY = "Ub0p0QkCyGyy3W7BPWcNFC64r4dbGXAh";

export const fetchForexRates = async () => {
  try {
    const response = await axios.get(`${API_URL}?access_key=${API_KEY}`);
    console.log(response);
    return response.data.rates;
  } catch (error) {
    console.error("Error fetching forex rates:", error);
    throw error;
  }
};
