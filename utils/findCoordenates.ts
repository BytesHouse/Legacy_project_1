import { COUNTRIES_COORDINAT } from "./constants/Countries.Constant";

export const findCoordinates = (code: string) => {
  const countries = COUNTRIES_COORDINAT;
  return countries.find((item) => item.country_code === code);
};
