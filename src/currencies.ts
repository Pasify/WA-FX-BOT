type Currency = {
  code: string;
  aliases: string[];
};

let currencies : Currency[] =  [
  { code: "USD", aliases: ["usd", "dollar", "dollars", "us dollar"] },
  { code: "NGN", aliases: ["ngn", "naira"] },
  { code: "GBP", aliases: ["gbp", "pound", "pounds", "sterling"] },
  { code: "EUR", aliases: ["eur", "euro", "euros"] },
];

export default currencies;