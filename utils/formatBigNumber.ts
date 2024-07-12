export const formatBigNumber = (
  num: number,
  fix?: number,
  multiply?: number
) => {
  // The financial data for MD is in thousands, hence the condition is missing three zeroes
  let fixNumber = 1;
  let multiplyNumber = 1;
  if (fix !== undefined) {
    fixNumber = fix;
  }
  if (multiply !== undefined) {
    multiplyNumber = multiply;
  }
  return Math.abs(num * multiplyNumber) > 999_999_999
    ? `${(Number(num * multiplyNumber) / 1000000).toFixed(fixNumber)}b`
    : Math.abs(num * multiplyNumber) > 999_999
    ? `${(Number(num * multiplyNumber) / 1000000).toFixed(fixNumber)}m`
    : Math.abs(num * multiplyNumber) > 999
    ? `${(Number(num * multiplyNumber) / 1000).toFixed(fixNumber)}K`
    : Math.abs(num * multiplyNumber) > 0
    ? `${(num * multiplyNumber).toFixed(1)}`
    : "0";
};

export const formatBigNumberFinancial = (
  num: number,
  fix?: number,
  multiply?: number
) => {
  // The financial data for MD is in thousands, hence the condition is missing three zeroes
  let fixNumber = 1;
  let multiplyNumber = 1;
  if (fix !== undefined) {
    fixNumber = fix;
  }
  if (multiply !== undefined) {
    multiplyNumber = multiply;
  }
  return Math.abs(num * multiplyNumber) > 999_999_999
    ? `${(Number(num * multiplyNumber) / 1000000).toFixed(fixNumber)}`
        .split(/(?=(?:...)*$)/)
        .join(" ") + " m"
    : Math.abs(num * multiplyNumber) > 100_000
    ? `${(Number(num * multiplyNumber) / 1000).toFixed(fixNumber)}`
        .split(/(?=(?:...)*$)/)
        .join(" ") + " K"
    : Math.abs(num * multiplyNumber) > 0
    ? `${(num * multiplyNumber).toFixed(1)}`
    : "0";
};
