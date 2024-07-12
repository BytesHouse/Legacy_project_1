import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPropsContext,
} from "next";
import { countries } from "../../assets/constants/countries";
import CompanyList from "../../components/Activity/CompanyList";
import ArchiveTable, {
  ArchiveActivityInterface,
  DataProps,
} from "../../components/ArchiveTable/ArchiveTable";
import Faq from "../../components/Faq/Faq";
import FaqGreenBox from "../../components/Faq/FaqGreenBox";
import FaqItem from "../../components/Faq/FaqItem";
import Flag from "../../components/ui-kit/Flag";
import FooterAbout from "../../components/About/FooterAbout";
import HeaderAbout from "../../components/Header/HeaderAbout";
import { PaginationComponent } from "../../components/ui-kit/Pagination";
import Companies from "../../components/Search/SearchVariants/Companies";
import { CompaniesQuery, SearchService } from "../../services/Search.service";
import { faq } from "../../utils/constants/faq";
import { useTranslation } from "next-i18next";
import { getCount } from "../archive/[countryCode]";
import getServerSideTranslations from "../../utils/getServerSideTranslations";

interface Rates {
  id: number;
  base: string;
  rates: string;
  data: string;
}

export interface Currencies {
  base: string;
  rates: Array<Rates>;
}

export interface YearsCount {
  year: string;
  count: number;
}

export interface CompanyRegistrationInterface {
  createdYear?: string;
  firstDate: string;
  registrationId: string;
  secondDate: string;
}

export interface CompaniesCount {
  count: number;
  countryCode: string;
}

export interface CompanyDataInterface {
  id: string;
  createdDate: string;
  companyNumber?: string;
  localRegistrationNumber?: string;
  registration?: CompanyRegistrationInterface;
  registrationId?: string;
  name: string | string[];
  address: string;
  countryCode: string;
  isLogged?: boolean;
  statuses?: string[];
  status: string | string[];

  liquidationDate?: string;
  shortName?: string[] | string;
}

export interface ResultsInterface {
  count: number;
  results: CompanyDataInterface[];
  years: YearsCount[];
  countries: CompaniesCount[];
}

interface ArchiveResultProps {
  filteredResults: ResultsInterface;
  query: CompaniesQuery;
  allResults: ResultsInterface;
  currencies?: Array<Currencies>;
  time: number;
  companiesCount: Record<string, string>;
  activityName: string;
  totalCount: number;
  pageCount: number;
}

export default function ActivityResult({
  activityName,
  filteredResults,
  companiesCount,
  query,
  allResults,
  totalCount,
  pageCount,
}: ArchiveResultProps) {
  const { t } = useTranslation();
  const { count } = filteredResults;
  const percent = ((+companiesCount.count / totalCount) * 100).toFixed(2);
  const maxCount = count > 300 ? 300 : count;
  return (
    <main className="bg-[#F8F9FB]">
      <HeaderAbout countryCode={query.countryCode} />
      <div className="container mt-[100px]">
        <p className="text-[#000000] text-[24px] font-bold mb-[15px]">
          {t("search")} {companiesCount.count.toLocaleString()}{" "}
          {t("companies_from")} {t(`from_${query.countryCode!}`)}
        </p>
        <p className="text-[12px] font-[600] mb-[25px]">{t("information")}</p>
        <div className="max-w-[530px] mb-[40px]">
          <Companies placeholder={t("search_on_comp")} />
        </div>
        <div className="bg-white rounded-xl border border-gray-2 mb-[20px]">
          <div className="p-[20px]">
            <p className="text-[13px] text-[#686B6F] font-[500]">
              {t("number_of_companies")} {t("je")}{" "}
              {t(`from_${query.countryCode}`)} {t("is_")}{" "}
              {companiesCount.count.toLocaleString()}, {t("which_represents")}{" "}
              {percent}% {t("of_all")} {} {t("companies_in_the_database")}
            </p>
          </div>
          <div className="px-[16px] pb-[16px]">
            <CompanyList array={filteredResults.results} />
            <div className="flex justify-between items-center">
              <p className="text-[14px] text-[#686B6F] font-[400]">
                {t("showing")} {pageCount} {t("results_of")} {maxCount}
              </p>
              <PaginationComponent
                currentPage={query.page ? Number(query.page) : 1}
                totalCount={maxCount}
                pageSize={10}
                query={query}
              />
            </div>
          </div>
        </div>
        {/* <Faq /> */}
      </div>
      <FooterAbout />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query, locale } = context;
  const { activity, countryCode, page } = query;
  const start = Date.now();

  const activityName = await SearchService.getActivity(
    String(activity),
    String(countryCode),
    Number(page)
  );
  if (
    !Number.isInteger(+query?.page!) ||
    +query?.page! <= 0 ||
    +query?.page! > 30
  ) {
    return {
      redirect: {
        destination: `/404`,
        statusCode: 301,
      },
    };
  }

  const count = await SearchService.companiesCount();
  const res = await SearchService.companies(query);

  if (!res.data.results.length) {
    context.res.statusCode = 404;
  }

  const lastPage = Math.ceil(res.data.count / 10) || 1;

  if (+query?.page! > lastPage) {
    return {
      redirect: {
        destination: `/404`,
        statusCode: 301,
      },
    };
  }

  const allResults =
    query?.searchQuery! || query?.activity!
      ? await SearchService.resultCompanies(query)
      : { data: {} };

  const tmp = getCount(count.data, String(countryCode));

  const companiesCount = await SearchService.companiesCount();

  const initial = 0;
  const totalCompanyCount = companiesCount.data.reduce(
    (acc: any, curr: any) => acc + curr.count,
    initial
  );
  return {
    props: {
      activityName: activityName.data,
      filteredResults: res.data,
      companiesCount: tmp,
      totalCount: totalCompanyCount,
      pageCount: res.data.results.length,
      query,
      allResults: allResults.data,
      ...(await getServerSideTranslations(locale)),
    },
  };
};
