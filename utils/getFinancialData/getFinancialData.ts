import { getDataForIndex } from "./getDataForIndex";
import { TaxesInterface, AnualReport } from "../getStatus";
import { getIndexesByCountry } from "./getIndexesByCountry";

export function getFinancialData(
  t: (s: string) => string,
  selectedYear: number,
  finances: Record<string, TaxesInterface | AnualReport>,
  previousYear: number,
  countryCode: string
) {
  const indexes = getIndexesByCountry(countryCode);
  return indexes.map((index) => {
    return getDataForIndex(index, {
      t: t,
      selectedYear: selectedYear,
      finances: finances,
      previousYear: previousYear,
    });
  });
}
