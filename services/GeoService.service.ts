export class GeoService {
  static getCountryBounds(code: string) {
    const data = require(`../utils/Countries/${code.toLocaleUpperCase()}.json`);

    return (data && data.coordinates) || [];
  }
}
