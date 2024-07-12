import { useTranslation } from "next-i18next";

export default function AboutBlock() {
  const { t } = useTranslation();
  return (
    <div className="text-white">
      <div className="text-[12px] mb-[5px] text-[#ffffffdd]">
        {t("nice_to_meet_you")}
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-[32px] font-bold tracking-[.03em]">
          {t("about_our_company")}
        </h1>
        <p className="text-[14px] mt-2 text-[500] text-[#ffffffdd]">
          {t("welcome_to_a_world")} <br /> {t("of_digital_logistics")}
        </p>
      </div>
    </div>
  );
}
