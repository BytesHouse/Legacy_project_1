import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API
    ? `${process.env.API}/v2/qcheq/n/customs`
    : "${process.env.API}/v2/qcheq/n/customs",
});

export class CustomsService {
  static getCustomCountries() {
    return instance.get("count");
  }

  static getCustomById(id: string) {
    return instance.get("", {
      params: { customId: id },
    });
  }

  static getCustomByCountryQuery(countryCode: string, page?: number) {
    return instance.get("country/p/" + countryCode.toLocaleUpperCase(), {
      params: {
        page: Number(page) - 1 || 0,
        pageSize: 10,
      },
    });
  }
  static getCustomByCountry(countryCode: string) {
    return instance.get("country/" + countryCode.toLocaleUpperCase());
  }
}
