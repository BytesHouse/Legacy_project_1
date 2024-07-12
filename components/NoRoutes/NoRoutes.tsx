import { useTranslation } from "next-i18next";
import NoRoutesIcon from "../Icons/NoRoutesIcon";
import StarIcon from "../Icons/StarIcon";
import { StarIconNoData } from "../Icons/StarIconNoData";

interface NoRoutesProps {
  company: string;
  text: string;
}

export default function NoRoutes({ text, company }: NoRoutesProps) {
  const { t } = useTranslation();
  return (
    <div className="pt-[20px] flex flex-col items-center gap-[40px] text-center">
      <NoRoutesIcon />
      <div className="w-full flex flex-col">
        <p className="font-bold w-full truncate text-[14px]">{`${company}`}</p>
        <p className="w-[210px] mx-auto text-[14px]">{`${text}`}</p>
      </div>
      <p></p>
    </div>
  );
}
