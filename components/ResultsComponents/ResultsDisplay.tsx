import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

import ChevronLeftIcon from "../Icons/ChevronLeftIcon";
import { PaginationComponent } from "../ui-kit/Pagination";
import { SearchPeople } from "../interfaces/SearchPeople.interface";
import { SearchCompany } from "../interfaces/SearchCompany.interface";
import { useRecoilValue } from "recoil";
import { peoplesOrCompanies } from "../../store/states";
import { useEffect, useMemo, useState } from "react";

const ResultGrid = dynamic(() => import("./ResultGrid"));
const ResultSelector = dynamic(() => import("./ResultSelector"));
interface ResultsDisplayProps {
  peoples: SearchPeople;
  companies: SearchCompany;
}

export default function ResultsDisplay({
  companies,
  peoples,
}: ResultsDisplayProps) {
  const router = useRouter();
  const { query } = router;

  const isPeople = useRecoilValue(peoplesOrCompanies);
  const [page, setPage] = useState(query.page);

  const callback = () => {
    setPage("1");
    router.push({
      pathname: router.basePath,
      query: { ...query, page: "1" },
    });
  };
  useEffect(() => {
    if (query.page !== page) {
      setPage(query.page);
    }
  }, [query]);

  const number = peoples.totalElements + companies.totalElements;
  const { t } = useTranslation();
  return (
    <div className="border border-gray-2 rounded-[14px] h-max col-span-8  bg-white relative shadow-search flex flex-col">
      <header className="p-5 flex items-center">
        <h1 className="text-[18px] font-[700] tracking-[1.2px]">
          {t("people_companies")}
        </h1>
        <p className="ml-[23px] text-[13px]  bg-gray-2 py-[3px] rounded-[6px] min-w-[35px] text-center">
          {number}
        </p>
      </header>
      <span
        className="flex items-center justify-center bg-gray-2 w-6 aspect-square rounded-full absolute -left-[15px] top-[22px]"
        onClick={() => {
          router.back();
        }}
      >
        <ChevronLeftIcon />
      </span>
      <div className="px-[23px] py-[20px] bg-[#F7F7F8] h-full">
        <ResultSelector
          peoplesCount={peoples.totalElements}
          companiesCount={companies.totalElements}
          leftText={t("peoples")}
          rightText={t("companies")}
          callback={callback}
        />
        <ResultGrid companies={companies.content} peoples={peoples.content} />
      </div>
      <div className="self-center">
        <PaginationComponent
          currentPage={page ? Number(page) : 1}
          totalCount={
            isPeople
              ? Number(peoples.totalElements)
              : Number(companies.totalElements)
          }
          pageSize={peoples.size}
          query={query}
        />
      </div>
    </div>
  );
}
