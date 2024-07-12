import { useTranslation } from "next-i18next";
import StarRate from "../StarRate/StarRate";

interface BlockRatesProps {
  scoreObject?: {
    score?: number;
    count: number;
  };
}
function getTranslates(index: number) {
  switch (index) {
    case 1:
      return "very_poor";
    case 2:
      return "fair";
    case 3:
      return "good";
    case 4:
      return "very_good";
    case 5:
      return "excellent";
    default:
      return "no_reviews";
  }
}
export default function BlockRates({ scoreObject }: BlockRatesProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col flex-1 min-w-[140px] items-end text-[#626262] text-[12px] font-[500]">
      <p className="text-[13px] font-[500]">
        {t("user_score")} — {t(getTranslates(Math.round(scoreObject?.score!)))}
      </p>
      <StarRate rate={scoreObject?.score! || 0} />
      <p>
        {t("based_on")} {scoreObject?.count || 0} {t("reviews")}
      </p>
    </div>
  );
}
