export const getShares = (newValue: string | undefined, oldValue: string) => {
  if (newValue && oldValue) {
    return Number(newValue?.slice(0, -1).replace(",", ".")) + oldValue;
  }
  if (newValue) {
    return Number(newValue?.slice(0, -1).replace(",", "."));
  }

  return oldValue;
};
