import { GetStaticPropsContext } from "next";
import { countries } from "../../../assets/constants/countries";
import ArchiveTable, {
  ArchiveActivityInterface,
  DataProps,
} from "../../../components/ArchiveTable/ArchiveTable";
import Faq from "../../../components/Faq/Faq";
import FooterAbout from "../../../components/About/FooterAbout";
import HeaderAbout from "../../../components/Header/HeaderAbout";
import Companies from "../../../components/Search/SearchVariants/Companies";
import { SearchService } from "../../../services/Search.service";
import getServerSideTranslations from "../../../utils/getServerSideTranslations";
import { useTranslation } from "next-i18next";

interface ArchiveResultProps {
  countryCode: string;
}

export default function ArchiveResult({ activityData, totalCount }: any) {
  const { countryCode, activities, menu, companiesCount } = activityData;
  const { t } = useTranslation();
  return (
    <main className="bg-[#F8F9FB]">
      <HeaderAbout countryCode={countryCode} />
      <div className="container mt-[100px]">
        <p className="text-[#000000] text-[24px] font-bold mb-[15px]">
          {t("search")} {companiesCount.count.toLocaleString()}{" "}
          {t("companies_from")} {t(`from_${countryCode}`)}
        </p>
        <p className="text-[12px] font-[600] mb-[25px]">{t("information")}</p>
        <div className="max-w-[530px] mb-[40px]">
          <Companies placeholder={t("search_on_comp")} />
        </div>
        <ArchiveTable
          activities={activities}
          menu={menu}
          countryCode={countryCode}
          companiesCount={companiesCount}
          totalCount={totalCount}
        />
        {/* <Faq /> */}
      </div>
      <FooterAbout />
    </main>
  );
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export async function getStaticProps(ctx: GetStaticPropsContext) {
  const countryCode = String(ctx?.params?.countryCode);
  const { locale } = ctx;
  const res = await SearchService.ArchiveActivities(countryCode);
  const sortFunc = () =>
    countryCode === "ru"
      ? (a: ArchiveActivityInterface, b: ArchiveActivityInterface) =>
          a.name < b.name ? -1 : +(a.name > b.name)
      : (a: ArchiveActivityInterface, b: ArchiveActivityInterface) =>
          a?.name?.localeCompare(b?.name!);

  const sortArray = Array.isArray(res?.data)
    ? res?.data
        .map((item) =>
          item.name
            ? item
            : {
                ...item,
                // name: searchActivity.getActivity(countryCode, item.id),
              }
        )
        .sort(sortFunc())
    : [];
  let checkUa;
  if (countryCode === "ua") {
    const tmp = sortArray.shift();
    checkUa = tmp;
  }
  const companiesCount = await SearchService.companiesCount();
  const obj = sortArray.reduce((acc, activity, index) => {
    const name = activity?.name?.[0] || null;
    if (!acc[name!]!) {
      acc[name!]! = {
        letter: name!,
        firstId: activity?.id!,
        count: 0,
        firstIndex: index!,
      };
    }
    acc[name].count += 1;

    return acc;
  }, {} as Record<string, { letter: string; firstId: string; count: number; firstIndex: number }>);
  if (checkUa) {
    sortArray.splice(1213, 0, checkUa);
  }
  const tmp = await getCount(companiesCount.data, countryCode);

  const activityData = {
    activities: sortArray,
    menu: Object.values(obj),
    countryCode,
    companiesCount: tmp,
  };
  const initial = 0;
  const totalCompanyCount = companiesCount.data.reduce(
    (acc: any, curr: any) => acc + curr.count,
    initial
  );

  return {
    props: {
      totalCount: totalCompanyCount,
      activityData,
      countryCode: countryCode,
      fallback: "blocking",
      revalidate: 3000,
      ...(await getServerSideTranslations(locale)),
    },
  };
}

export const getCount = (arr: any[], code: string) => {
  return arr.find((item) => item.countryCode === code.toLocaleUpperCase());
};
