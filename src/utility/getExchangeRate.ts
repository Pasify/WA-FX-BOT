import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

type ExchangeRateResult = {
  from: string;
  to: string;
  amount: number;
  convertedAmount: number;
  rate: number;
};
export default async function getExchangeRate(
  amount: number,
  from: string,
  to: string,
): Promise<ExchangeRateResult | null> {
  try {
    let apiUrl = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/${from}/${to}/${amount}`;
    let response = await axios.get(apiUrl);
    const { conversion_rate: rate, conversion_result: convertedAmount } =
      response.data;
    return {
      from,
      to,
      amount,
      rate,
      convertedAmount,
    };
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else {
      console.log(`Error received:`, error.message);
    }
    return null;
  }
}
