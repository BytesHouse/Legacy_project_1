import axios from "axios";
import { countries } from "../assets/constants/countries";

const instance = axios.create({
  baseURL: "https://qoobus.com/api",
});

const instanceQorp = axios.create({
  baseURL: "https://api.qorporates.com",
});

export class CountryService {
  static searchCountry(q: string) {
    const query = q.toLocaleUpperCase();
    const res = countries[query];
    return instance.get(
      `/geo/search?func=search&format=json&q=${
        res ? res : q
      }&fq=feature_code:PCLI`
    );
  }
  static getCountries() {
    return instanceQorp.get(`/qcheck/countries`);
  }
}
