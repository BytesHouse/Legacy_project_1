import { useRecoilState } from "recoil";
import { useTranslation } from "next-i18next";

import ArrowrightIcon from "../Icons/ArrowRightIcon";
import OverviewFromArr, { Overview } from "./OverviewFromArray";
import { CompanyInterface, getStatus } from "../../utils/getStatus";
import { formatBigNumber } from "../../utils/formatBigNumber";
import { QoobusProfile } from "../../interfaces/qobCompanyProfile/qobCompanyProfileInterfaces.interface";
import { modalState } from "../../store/states";
import ViewMore from "../CompanyProfileComponents/ViewMore";
import { addressEditor } from "../../utils/addressEditor";

interface BlockOverviewInterface {
  phone?: string;
  dataQorp?: CompanyInterface;
  dataQob?: QoobusProfile;
  isPeople: boolean;
}

const archiveIncludes = ["md", "ro", "ua", "ru"];

export default function BlockOverview({
  phone,
  dataQorp,
  dataQob,
  isPeople,
}: BlockOverviewInterface) {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);
  const companyNumber =
    (dataQob && dataQob?.company?.companyNumber) || dataQorp?.companyNumber;
  const registration = dataQorp?.registration;
  const createdYear = dataQorp?.createdYear && String(dataQorp?.createdYear);
  const verified = dataQob?.company?.verified;
  const juridic = dataQorp ? getStatus(dataQorp) : "";

  const createdDate =
    dataQorp?.createdDate?.replaceAll(".", "/") ||
    (dataQob?.company?.created && String(dataQob?.company?.created)) ||
    dataQorp?.registration?.firstDate ||
    dataQorp?.registration?.createdYear;

  const activity =
    (dataQorp && dataQorp?.activities?.[0].name) ||
    dataQob?.company?.activities?.[0]?.name! ||
    dataQorp?.mainActivity?.name;
  const type =
    dataQorp?.type || dataQob?.company?.type || (dataQorp && dataQorp?.name)
      ? dataQorp?.name
          ?.split(" ")
          ?.filter(
            (item) => !String(dataQorp?.shortName).split(" ").includes(item)
          )
          .join(" ")
      : "individual_entrepreneur" || "-";
  const countryCode = dataQorp?.countryCode || dataQob?.company?.countryIsoCode;
  const address =
    dataQorp?.address ||
    dataQob?.company?.address ||
    (dataQorp?.registeringAuthority?.address &&
      addressEditor(dataQorp?.registeringAuthority?.address));
  const capitalMd = dataQorp
    ? Number(
        dataQorp?.taxes?.[Object?.keys(dataQorp?.taxes)?.pop()!]?.[
          "net_profit_management_period"
        ]!
      )
    : "";
  const capitalRo =
    dataQorp?.finances &&
    dataQorp?.finances?.annualReports?.length! &&
    dataQorp.finances.annualReports![
      Number(dataQorp.finances!.annualReports!.length) - 1
    ]["-profit net"] === "0"
      ? dataQorp?.finances?.annualReports![
          Number(dataQorp?.finances?.annualReports?.length) - 1
        ]["-pierdere net"]
      : dataQorp?.finances?.annualReports?.[
          Number(dataQorp?.finances?.annualReports?.length) - 1
        ]["-profit net"] || "0";
  const { t } = useTranslation();
  const capital =
    formatBigNumber(
      capitalMd ||
        -Number(capitalRo) ||
        Number(dataQorp?.authorizedCapital?.replace(",", ".")) ||
        Number(dataQorp?.capital?.amount),
      1,
      countryCode === "MD" ? 1000 : 1
    ) || "-";

  const results: Overview[] = [
    {
      title: companyNumber ? t("company_number") : t("registry_number"),
      text: companyNumber || registration?.registrationId! || "-",
    },
    {
      title: t("incorporation_date"),
      isDate: true,
      text: createdDate || createdYear || "-",
    },
    {
      title: t("primary_activity"),
      text: activity || "-",
    },
    {
      title: t("company_type"),
      text: type || "-",
    },
    {
      title: t("jurisdiction"),
      text: (countryCode && t(countryCode?.toLocaleLowerCase())) || "-",
      isCountry: countryCode,
      ...(archiveIncludes?.includes(
        countryCode ? countryCode?.toLocaleLowerCase() : ""
      ) && {
        link: `/archive/${countryCode?.toLocaleLowerCase()}`,
      }),
    },
    {
      title: t("address"),
      text: address! || "-",
    },
    {
      title: t("capital"),
      text: capital && Number(capital) !== 0 ? capital : "-",
    },
    {
      title: t("contact_details"),
      text:
        countryCode === "UA"
          ? dataQorp?.contacts?.filter((el) => !el.includes("ПАСПОРТ")) || ["-"]
          : phone || "-",
      phone: true,
    },
    {
      title: t("status_juridic"),
      text: t(juridic[0]),
    },
    {
      title: t("status_profile"),
      text: verified ? "verified" : "pending",
    },
  ];
  return (
    <div className="w-full rounded-[8px] bg-[#FAFAFA] text-[#37383A] mb-[15px]">
      <div className="text-[14px] border-b border-[#e2e5e9] px-[20px] py-[10px] font-semibold">
        {isPeople ? t("user_details") : t("company_details")}
      </div>
      <div className="text-[13px] py-[15px] px-[20px] grid grid-cols-1">
        <OverviewFromArr overviewArray={results} admin={{}} />
      </div>
      <ViewMore
        cb={(e: any) => {
          e.stopPropagation();
          setModalState(true);
        }}
        text={"view_more"}
      />
    </div>
  );
}
