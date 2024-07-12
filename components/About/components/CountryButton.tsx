import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

const Flag = dynamic(() => import("../../ui-kit/Flag"));

interface CountryButtonInterface {
  countryCode: string;
}

export default function CountryButton({ countryCode }: CountryButtonInterface) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center rounded-xl border border-gray-1 p-4 col-span-1 bg-white hover:border-purple">
      <Flag countryCode={countryCode} size={"2xl"} />
      <p className="ml-4 text-lg font-bold">{t(countryCode)}</p>
    </div>
  );
}
