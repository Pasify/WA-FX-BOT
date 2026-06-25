type ParsedRequest = {
  amount: number;
  from: string;
  to: string;
} | null;

import currencies from "../currencies.ts";
function findCurrencyCode(word: string) {
  for (let currency of currencies) {
    if (currency.aliases.includes(word)) {
      return currency.code;
    }
  }
  return null;
}

export function parseConversionRequest(message: string): ParsedRequest {
  let cleanedUpMessage = message.toLowerCase().trim();
  if (cleanedUpMessage.split(" ").length < 4) return null;
  let [amountString, fromCurrency, , toCurrency] = cleanedUpMessage.split(" ");

  let wordToCurrencyMap = {
    amount: parseFloat(amountString),
    from: findCurrencyCode(fromCurrency),
    to: findCurrencyCode(toCurrency),
  };
  if (
    isNaN(wordToCurrencyMap.amount) ||
    wordToCurrencyMap.from === null ||
    wordToCurrencyMap.to === null
  ) {
    return null;
  }

  const from = wordToCurrencyMap.from;
  const to = wordToCurrencyMap.to;
  console.log(wordToCurrencyMap);
  return {
    amount: wordToCurrencyMap.amount,
    from,
    to,
  };
}

// parseConversionRequest("100 USD to EUR");
