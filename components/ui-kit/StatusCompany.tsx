import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { Tooltip } from "../Tooltip/Tooltip";

interface StatusCompanyProps {
  status: string;
  color?: string;
  isRelated?: boolean;
}

export default function StatusCompany({
  status,
  color = "bg-[#389F1E]",
  isRelated = false,
}: StatusCompanyProps) {
  const { t } = useTranslation();
  return (
    <div
      className={`${
        status === "liquidated" || status === t("liquidated")
          ? "bg-status-red"
          : status === t("in_liquidated")
          ? "bg-[#FAB543]"
          : color
      } ${
        isRelated ? "w-max px-2.5" : "px-[15px]"
      } truncate bg-opacity-100 py-[3px] rounded-2xl text-white text-[12px] group relative`}
    >
      {t(status)}
    </div>
  );
}
