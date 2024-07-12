import { useTranslation } from "next-i18next";

interface ActivityBlockProps {
  activityName?: string;
  excises?: boolean;
  vat?: boolean;
  date?: string;
}

export default function ActivityBlock({
  activityName,
  excises,
  vat,
  date,
}: ActivityBlockProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-xl border border-gray-2 col-span-7 bg-white font-medium shadow-search">
      <div className="w-full flex justify-between px-5 py-2.5 border-b border-gray-2 text-[#37383A]">
        <p className="text-[14px] font-semibold">{t("activity")}</p>
      </div>
      <div className="px-5 py-2.5 border-b border-gray-2">
        <p className="text-[12px] font-[500] mb-2.5">{t("primary_activity")}</p>
        <ol className="list-disc text-[13px] font-[400] px-[20px]">
          <li>{activityName || "-"}</li>
        </ol>
      </div>
      <div className="px-5 py-2.5">
        <div className="grid grid-cols-12 text-[12px] font-[500] mb-[10px]">
          <p className="col-span-4">{t("excises")}</p>
          <p className="col-span-3">{t("vat")}</p>
        </div>
        <div className="grid grid-cols-12 text-[13px] font-[400]">
          <p className="col-span-4">
            {t("pays_excises")}
            {": "}
            <span className="font-bold ml-[5px]">
              {excises ? t("yes") : t("no_")}
            </span>
          </p>
          <p className="col-span-3">
            {t("pays")}
            <sup className="text-[8px]">{t("vat")}</sup>:{" "}
            <span className="font-bold ml-[5px]">
              {vat ? t("yes") : t("no_")}
            </span>
          </p>
          <p className="col-span-5">
            {t("registration_date")}:
            <span className="font-bold ml-[5px]"> {date || "-"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
