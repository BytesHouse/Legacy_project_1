import { getValueByYear } from "./../../components/CompanyProfileComponents/FinancialBlock/FinancialBlock";

export const getValueByYearOptional = (props: any, optional?: string) => {
  const { year, index, finances } = props;
  if (!optional) {
    return getValueByYear(year, index, finances);
  }
  return (
    getValueByYear(year, index, finances) ||
    getValueByYear(year, optional, finances)
  );
};
