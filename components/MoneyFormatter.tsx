const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export const Dollars = (num: number) => {
  return formatter.format(num);
};
