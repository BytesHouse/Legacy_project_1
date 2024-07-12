import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";
import { useTranslation } from "next-i18next";

import { peoplesOrCompanies } from "../../store/states";
import { PeopleContent } from "../interfaces/SearchPeople.interface";
import { CompanyContent } from "../interfaces/SearchCompany.interface";

const ResultCard = dynamic(() => import("./ResultCard"));
interface ResultGridProps {
  peoples: PeopleContent[];
  companies: CompanyContent[];
}
export default function ResultGrid({ peoples, companies }: ResultGridProps) {
  const isPeople = useRecoilValue(peoplesOrCompanies);
  return (
    <div className="grid grid-cols-12 gap-[20px] h-full">
      {isPeople ? (
        !peoples.length ? (
          <NoResults />
        ) : (
          peoples?.map((item: PeopleContent, i: number) => (
            <ResultCard
              key={item.id + item?.companyName + i}
              role={item?.position}
              id={item.id}
              companyNumber={item.companyId}
              company={item?.companyName}
              name={item?.firstName + " " + item.lastName}
              imageId={item.imageId}
              headerImageId={item.headerImageId}
            />
          ))
        )
      ) : !companies.length ? (
        <NoResults />
      ) : (
        companies?.map((item: CompanyContent, i: number) => {
          return (
            <ResultCard
              key={item?.name + i}
              companyNumber={item?.companyNumber || item.internationalNumber}
              name={item?.name || item?.shortName}
              address={item.address}
              imageId={item.imageId}
              headerImageId={item.headerImageId}
              countryIsoCode={item.countryIsoCode}
            />
          );
        })
      )}
    </div>
  );
}
const NoResults = () => {
  const { t } = useTranslation();
  return (
    <div className="col-span-12 flex flex-col items-center pb-72 pt-28 gap-y-10">
      <svg
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.746 49.4919C38.8605 49.4919 49.4919 38.8605 49.4919 25.746C49.4919 12.6314 38.8605 2 25.746 2C12.6314 2 2 12.6314 2 25.746C2 38.8605 12.6314 49.4919 25.746 49.4919Z"
          stroke="#1C274C"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M52.0001 52.0001L47.001 47.001"
          stroke="#1C274C"
          stroke-opacity="0.5"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      {t("results_no_results")}
    </div>
  );
};
