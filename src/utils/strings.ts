export const numToPrice = (num: number) =>
  `$${(Math.round(num * 100) / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
