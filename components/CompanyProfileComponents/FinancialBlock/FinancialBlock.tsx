import classNames from "classnames";
import { useTranslation } from "next-i18next";
import Link from "next/link";

import { getDeviationCurrent } from "../deviationCalculate";
import FinancialArrow from "./FinancialArrow";
import ViewMore from "../ViewMore";
import {
  AnualReport,
  FinancialInterface,
  TaxesInterface,
} from "../../../utils/getStatus";
import { getFinancialData } from "../../../utils/getFinancialData/getFinancialData";
import NoDataResults from "../../NoDataResults/NoDataResults";
import NoDataInsolvencies from "../../Icons/NoDataInsolvencies";
import { useRecoilState } from "recoil";
import { modalState } from "../../../store/states";

export const getValueByYear = (
  year: string | number,
  indexName: string,
  finances: any,
  ratio?: number
) => {
  const value = finances[year]?.[indexName];
  const numberValue =
    parseFloat((Number(value) / (ratio || 1)).toFixed(3)) || 0;
  return indexName === "-pierdere net" ? -numberValue : numberValue;
};

interface FinancialBlockProps {
  financesData: Record<string, TaxesInterface> | FinancialInterface;
  countryCode: string;
}
const getFinancesReport = (
  fd: Record<string, TaxesInterface> | FinancialInterface,
  countryCode: string
) => {
  if (countryCode.toLocaleLowerCase() === "ro" && fd?.annualReports) {
    let financesYearKey = {};
    //@ts-ignore
    fd?.annualReports?.forEach((yearFinance: AnualReport) => {
      financesYearKey = {
        ...financesYearKey,
        [yearFinance.year!]: yearFinance,
      };
    });
    return financesYearKey;
  }
  if (countryCode.toLocaleLowerCase() === "md") return fd;
  return [];
};

export default function FinancialBlock(props: FinancialBlockProps) {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);

  const { t } = useTranslation();
  const { financesData, countryCode } = props;
  const countries = ["md", "ro"];

  if (
    !countryCode ||
    !countries.includes(countryCode.toLocaleLowerCase()) ||
    (countryCode === "MD"
      ? !Object.keys(financesData).length
      : !financesData?.annualReports)
  ) {
    return null;
  }
  delete financesData.parsed;
  const finances = getFinancesReport(financesData, countryCode);
  const yearsFromFinances = Object.keys(finances).slice(-6);
  const years = (yearsFromFinances.length && yearsFromFinances) || [
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
  ];
  const selectedYear = years[years.length - 1];
  const previousYear = years[years.length - 2];
  const financialData = getFinancialData(
    t,
    Number(selectedYear),
    finances,
    Number(previousYear),
    countryCode.toLocaleUpperCase()
  ).filter(
    (item) => item.currentYearValue !== 0 || item.previousYearValue !== 0
  );
  const onClick = (e: any) => {
    e.stopPropagation();
    setModalState(true);
  };

  if (
    Object.keys(financialData) &&
    !Object.values(financialData).some(
      (item) => item.currentYearValue || item.previousYearValue
    )
  ) {
    return (
      <div className="rounded-xl border border-gray-2 col-span-7 bg-white font-medium shadow-search">
        <div className="w-full flex justify-between px-5 py-2.5 border-b border-gray-2 text-[#37383A]">
          <p className="text-[14px] font-semibold">
            {t("financial_information")}
          </p>
        </div>
        <div className="grid grid-cols-12 border border-gray-2 rounded-lg mx-5 my-[15px] p-0.5 gap-x-0.5">
          {years.map((year) => {
            return (
              <button
                key={year}
                onClick={onClick}
                className={classNames(
                  "col-span-2 text-center border rounded-md text-[12px] font-[400]",
                  {
                    "text-purple border-purple":
                      year === years[years.length - 1],
                    "border-transparent hover:bg-gray-fa hover:border-gray-2":
                      year !== years[years.length - 1],
                  }
                )}
              >
                {year}
              </button>
            );
          })}
        </div>
        <NoDataResults
          icon={<NoDataInsolvencies />}
          text={t("no_data_other")}
        />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-2 col-span-7 bg-white font-medium shadow-search">
      <div className="w-full flex justify-between px-5 py-2.5 border-b border-gray-2 text-[#37383A]">
        <p className="text-[14px] font-semibold">
          {t("financial_information")}
        </p>
      </div>
      <div className="grid grid-cols-12 border border-gray-2 rounded-lg mx-5 my-[15px] p-0.5 gap-x-0.5">
        {years.map((year) => {
          return (
            <button
              key={year}
              onClick={onClick}
              className={classNames(
                "col-span-2 text-center border rounded-md text-[12px] font-[400]",
                {
                  "text-purple border-purple": year === years[years.length - 1],
                  "border-transparent hover:bg-gray-fa hover:border-gray-2":
                    year !== years[years.length - 1],
                }
              )}
            >
              {year}
            </button>
          );
        })}
      </div>
      <p className="pb-[15px] border-b border-gray-2 mx-5 mb-[15px] text-xs">
        {t("net_profit_managment_period")}
      </p>
      <div className="grid grid-cols-12 text-xs2 px-5 pb-[15px] gap-y-5">
        <div className="col-span-5">{t("index_name")}</div>
        <div className="col-span-2 text-end">
          {"31.12." + years[years.length - 2]}
        </div>
        <div className="col-span-2 text-end">
          {"31.12." + years[years.length - 1]}
        </div>

        {financialData.some(
          (item) => item.currentYearValue || item.previousYearValue
        )
          ? financialData.map((el) => {
              const relative = getDeviationCurrent(
                el.currentYearValue,
                el.previousYearValue,
                countryCode.toLocaleUpperCase() === "MD" ? 1000 : 1
              );
              const currentValue = `${(
                el.currentYearValue *
                (countryCode.toLocaleUpperCase() === "MD" ? 1000 : 1)
              ).toFixed(0)}`
                .split(/(?=(?:...)*$)/)
                .join(" ");

              const previousValue = `${(
                el.previousYearValue *
                (countryCode.toLocaleUpperCase() === "MD" ? 1000 : 1)
              ).toFixed(0)}`
                .split(/(?=(?:...)*$)/)
                .join(" ");

              return (
                <div className="grid grid-cols-12 col-span-full" key={el.name}>
                  <div className="col-span-5">{el.name}</div>
                  <div className="col-span-2 text-end">{previousValue}</div>
                  <div className="col-span-2 text-end">{currentValue}</div>
                  <div className="col-span-3 text-end">
                    {relative && <FinancialArrow relative={relative} />}
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <ViewMore cb={onClick} />
    </div>
  );
}
