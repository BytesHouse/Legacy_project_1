import { useTranslation } from "next-i18next";
import Flag from "../ui-kit/Flag";

export default function LanguageItem({ countryCode }: { countryCode: string }) {
  const { t } = useTranslation();
  return (
    <div>
      <Flag countryCode={countryCode} size={"md"} />
      {t(countryCode)}
    </div>
  );
}
