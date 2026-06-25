export default function formatCurrency(
  amount: number,
  toCurrency: string,
): string {
  const formattedCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: toCurrency,
  }).format(amount);

  return formattedCurrency;
}
