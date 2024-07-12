import { GeoService } from "../services/GeoService.service";
import { formatCoordinates } from "./formatCoordinates";

export const getDrawCountry = async (code: string) => {
  const coordinates = await GeoService.getCountryBounds(code);
  return formatCoordinates(coordinates);
};
