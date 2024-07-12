import { useRouter } from "next/router";
import { countries } from "../../assets/constants/countries";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
const ArchiveActivities = dynamic(() => import("./ArchiveActivities"));
export interface ArchiveActivityInterface {
  name: string;
  id: string;
  count: number;
}

export interface CompaniesCount {
  count: number;
  countryCode: string;
}

export interface DataProps {
  activities: ArchiveActivityInterface[];
  menu: {
    letter: string;
    firstId: string;
    count: number;
    firstIndex: number;
  }[];
  countryCode: string;
  companiesCount: CompaniesCount;
  totalCount: number;
}

export default function ArchiveTable({
  activities,
  menu,
  companiesCount,
  countryCode,
  totalCount,
}: DataProps) {
  const { pathname, locale, locales, asPath: currentPath } = useRouter();
  const { t } = useTranslation();
  const percent = ((companiesCount.count / totalCount) * 100).toFixed(2);
  return (
    <section className="border border-gray-2 rounded-[14px] mb-[20px] bg-white shadow-search">
      <div className="border-b border-gray-2 px-[20px] pb-[20px]">
        <h3 className="text-[18px] text-bold my-[20px]">
          {t("industry_breakdown")} {t(`from_${countryCode}`)}
        </h3>
        <p className="text-[13px] text-c-gray">
          {t("number_of_companies")} {t("je")} {t(`from_${countryCode}`)}{" "}
          {t("is_")} {companiesCount.count.toLocaleString()},{" "}
          {t("which_represents")} {percent}% {t("of_all")}{" "}
          {totalCount.toLocaleString()} {t("companies_in_the_database")}
        </p>
      </div>
      {activities && (
        <ArchiveActivities
          activitiesMenu={menu}
          activities={activities}
          country={currentPath}
          totalCount={companiesCount.count}
        />
      )}
    </section>
  );
}
