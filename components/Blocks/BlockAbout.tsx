import { useTranslation } from "next-i18next";

export default function BlockAbout({ text }: { text: string }) {
  const { t } = useTranslation();

  return (
    <div className="px-[20px]">
      <div className="w-full rounded-[8px] bg-[#FAFAFA] text-[#37383A]">
        <div className="text-[14px] border-b border-[#e2e5e9] px-[20px] py-[10px] fonr-semibold">
          {t("about_company")}
        </div>
        <p className="text-[13px] py-[15px] px-[20px]">{text || "-"}</p>
      </div>
    </div>
  );
}
