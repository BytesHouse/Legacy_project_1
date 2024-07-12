import { countriesIndexes } from "./constants";

export const getIndexesByCountry = (countryCode: string) => {
  return countriesIndexes[countryCode];
};
