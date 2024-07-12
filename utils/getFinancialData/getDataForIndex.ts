import { getValueByYearOptional } from "./getValueByYearOptional";
import { TaxesInterface, AnualReport } from "./../getStatus";

export const getDataForIndex = (
  prop: string[],
  data: {
    t: (s: string) => string;
    selectedYear: number;
    finances: Record<string, TaxesInterface | AnualReport>;
    previousYear: number;
  }
) => {
  const [index, translate, optional] = prop;
  const { t, selectedYear, finances, previousYear } = data;
  return {
    name: t(translate ? translate : "financial_" + index),
    currentYearValue: getValueByYearOptional(
      {
        year: selectedYear,
        index: index,
        finances: finances,
      },
      optional
    ),
    previousYearValue: getValueByYearOptional(
      {
        year: previousYear,
        index: index,
        finances: finances,
      },
      optional
    ),
  };
};
