import dynamic from "next/dynamic";
import { GetServerSidePropsContext } from "next";

import SearchFooter from "../components/Search/components/SearchFooter";
import { SearchService } from "../services/Search.service";
import getServerSideTranslations from "../utils/getServerSideTranslations";
import { SearchCompany } from "../components/interfaces/SearchCompany.interface";
import { SearchPeople } from "../components/interfaces/SearchPeople.interface";
import { CompaniesKnowInterface } from "../interfaces/qobCompanyProfile/companiesKnow.interface";

const ResultsDisplay = dynamic(
  () => import("../components/ResultsComponents/ResultsDisplay")
);
const ResultsAsideBlock = dynamic(
  () => import("../components/ResultsComponents/ResultsAsideBlock")
);

interface ResultsProps {
  peoples: SearchPeople;
  companies: SearchCompany;
  randomPeoples: any[];
  randomCompanies: CompaniesKnowInterface[];
}

export default function Results({
  peoples,
  companies,
  randomPeoples,
  randomCompanies,
}: ResultsProps) {
  return (
    <main className="bg-white-1 py-[30px] min-h-screen">
      <section className="container grid grid-cols-12 relative mb-[72px] gap-[25px]">
        <ResultsDisplay companies={companies} peoples={peoples} />
        <ResultsAsideBlock
          randomPeoples={randomPeoples}
          randomCompanies={randomCompanies}
        />
      </section>
      <SearchFooter />
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query, locale } = context;
  const [peoples, companies, randomPeoples, randomCompanies] =
    await Promise.allSettled([
      Promise.resolve(
        SearchService.searchPeoples(
          String(query.searchStr),
          6,
          Number(query.page) - 1
        )
      )
        .then((res) => res.data)
        .catch((err) => []),
      Promise.resolve(
        SearchService.searchCompanies(
          String(query.searchStr),
          6,
          Number(query.page) - 1
        )
      )
        .then((res) => res.data)
        .catch((err) => []),
      Promise.resolve(SearchService.random("", 5))
        .then((res) => res.data)
        .catch((err) => []),
      Promise.resolve(SearchService.similiar({ countryIsoCodes: [] }, 5))
        .then((res) => res.data)
        .catch((err) => []),
    ]).then((values) => values.map((value: any) => value.value));

  return {
    props: {
      randomCompanies: randomCompanies,
      randomPeoples,
      peoples,
      companies,
      ...(await getServerSideTranslations(locale)),
    },
  };
}
