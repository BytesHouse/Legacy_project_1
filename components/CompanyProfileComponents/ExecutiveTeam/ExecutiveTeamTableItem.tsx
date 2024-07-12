import Link from "next/link";
import { useTranslation } from "next-i18next";

import { FounderInterface } from "../../../utils/getStatus";
import BackgroundRandomText from "../../ui-kit/BackgroundRandomText";

interface ExecutiveTeamTableItemInterface {
  item: FounderInterface;
  color: string;
}

export default function ExecutiveTeamTableItem({
  item,
  color,
}: ExecutiveTeamTableItemInterface) {
  const { t } = useTranslation();
  return (
    <>
      <div className="col-span-7 mr-5 flex items-center text-black">
        <p className="truncate font-medium text-xs2">
          {item.name || item.fullName || item.companyName}
        </p>
      </div>
      <div className="col-span-2 font-semibold flex items-center">
        {t("founder")}
      </div>
      <span className="col-span-1" />
      <div className={`col-span-2 font-semibold flex items-center`}>
        <BackgroundRandomText
          color={color}
          text={
            item?.shareSize?.amount ||
            item?.shares ||
            item?.shareValue?.amount! ||
            item?.stake! ||
            0
          }
        />
      </div>
    </>
  );
}
