import { isArray } from "lodash";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const getSources: Record<string, any> = {
  MD: {
    text: ["Guvernul Republicii Moldova ,", "Serviciu Fiscal de Stat"],
    link: ["http://data.gov.md/", "http://fisc.md/"],
  },
  RO: {
    text: [
      "Portalul Seturilor De Date Deschise ,",
      "Agenția Națională De Administrare Fiscală",
    ],
    link: ["http://data.gov.ro/", "http://anaf.ro/"],
  },
  UA: {
    text: ["Єдиний державний веб-портал відкритих даних"],
    link: ["http://data.gov.ua/"],
  },
  RU: {
    text: ["Портал Открытых Данных Российской Федерации"],
    link: ["http://data.gov.ru/"],
  },
};

interface LastUpdateProps {
  countryCode: string;
  data: string;
}

export default function LastUpdate({ countryCode, data }: LastUpdateProps) {
  const { t } = useTranslation();
  return (
    <div className="col-span-7 bg-white border border-gray-2 rounded-[12px] shadow-search w-full text-sm p-5">
      <p className="text-[12px] font-bold text-black mb-[15px]">
        {t("last_update")} {data}
      </p>
      <p className="text-[12px] text-[#87888A]">{t("data_is_up_to_date")}</p>
      <p className="text-[12px] font-bold text-black flex items-center gap-[10px]">
        {t("sources")}{" "}
        <div className="flex gap-[5px]">
          {getSources?.[countryCode].link.map(
            (item: Record<string, any>, i: number) => (
              <Link
                href={getSources?.[countryCode].link[i]}
                className="text-c-blue hover:text-c-blue/70 transition-all"
                key={String(item)}
              >
                {getSources?.[countryCode]?.text[i]}
              </Link>
            )
          )}
        </div>
      </p>
    </div>
  );
}
