import { useTranslation } from "next-i18next";

export default function ExecutiveTeamTableTitle() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-12 col-span-full py-3 px-5 bg-gray-fa border-b border-gray-2 rounded-lg text-[12px] font-[400]">
      <div className="col-span-7 flex items-center">{t("founder_name")}</div>
      <div className="col-span-2 flex items-center">{t("role")}</div>

      <span className="col-span-1" />
      <div className="col-span-2 flex items-center">{t("stake")}</div>
    </div>
  );
}
