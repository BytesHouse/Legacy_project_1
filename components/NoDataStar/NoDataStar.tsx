import { useTranslation } from "next-i18next";
import { StarIconNoData } from "../Icons/StarIconNoData";

interface NoDataStarProps {
  company: string;
  text: string;
}

export default function NoDataStar({ text, company }: NoDataStarProps) {
  const { t } = useTranslation();
  return (
    <div className="pt-[20px] flex flex-col items-center gap-[40px] text-center">
      <StarIconNoData />
      <div className="w-full flex flex-col">
        <p className="font-bold w-full truncate text-[14px]">{`${company}`}</p>
        <p className="w-[210px] mx-auto text-[14px]">{`${text}`}</p>
      </div>
      <p></p>
    </div>
  );
}
