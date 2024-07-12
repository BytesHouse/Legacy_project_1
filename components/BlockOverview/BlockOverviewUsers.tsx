import Link from "next/link";
import ArrowrightIcon from "../Icons/ArrowRightIcon";
import OverviewFromArr, { Overview } from "./OverviewFromArray";
import { useTranslation } from "next-i18next";
import { UserProfile } from "../../interfaces/UserProfile/UserProfile.interface";
import { useRecoilState } from "recoil";
import { modalState } from "../../store/states";

interface BlockOverviewInterface {
  phone?: string;
  data?: UserProfile;
  isPeople: boolean;
}

export default function BlockOverviewUsers({
  phone = "-",
  data,
  isPeople,
}: BlockOverviewInterface) {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);
  const { t } = useTranslation();

  const countriesArr = ["RU", "RO", "UA", "MD"];

  const results: Overview[] = [
    {
      title: t("with_us_from"),
      isDate: true,
      text: String(data?.created) || "-",
    },
    {
      title: t("position"),
      text: data?.position || "-",
    },
    {
      title: t("departament"),
      text: data?.department || "-",
    },
    {
      title: t("contact_details"),
      text: data?.phone || "-",
      phone: true,
    },
    {
      title: t("spoken_languages"),
      text: data?.spokenLanguages || "-",
      isCountries: true,
    },
    {
      title: t("optional_email"),
      text: data?.secondaryEmail || "-",
      phone: true,
    },
  ];

  return (
    <div className="w-full rounded-[8px] bg-[#FAFAFA] text-[#37383A] mb-[15px]">
      <div className="text-[14px] border-b border-[#e2e5e9] px-[20px] py-[10px] font-semibold">
        {isPeople ? t("user_details") : t("company_details")}
      </div>
      <div className="text-[13px] py-[15px] px-[20px]">
        <OverviewFromArr overviewArray={results} admin={{}} />
      </div>
      <div className="border-t border-[#e2e5e9] flex justify-center items-center text-[13px] text-center px-[20px] py-[10px]">
        <button
          onClick={(e: any) => {
            e.stopPropagation();
            setModalState(true);
          }}
        >
          <p className="text-[12px] font-[600] mr-[10px]">{t("view_more")}</p>
        </button>
        <ArrowrightIcon color={"#000000"} />
      </div>
    </div>
  );
}
