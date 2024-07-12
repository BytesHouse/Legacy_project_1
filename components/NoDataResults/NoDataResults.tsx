import { ReactElement } from "react";
import { useTranslation } from "next-i18next";

interface NoDataResultsProps {
  icon: ReactElement;
  //   company: string;
  text: string;
}

export default function NoDataResults({
  icon,
  //   company,
  text,
}: NoDataResultsProps) {
  const { t } = useTranslation();

  return (
    <div className=" py-[100px] flex flex-col justify-center items-center text-center col-span-10">
      {icon}
      <div className="w-full flex flex-col mt-[30px]">
        {/* <p className="font-bold w-full truncate text-[14px]">{`${company}`}</p> */}
        <p className="w-[250px] mx-auto text-[16px] font-semibold">{`${text}`}</p>
      </div>
      <p></p>
    </div>
  );
}
