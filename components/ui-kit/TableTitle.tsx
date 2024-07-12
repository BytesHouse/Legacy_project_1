import { useTranslation } from "next-i18next";

interface TableTitleProps {
  firstText?: string;
  secondText?: string;
  thirdText?: string;
  bool?: boolean;
}

export default function TableTitle({
  firstText = "company_name",
  secondText = "inc_date",
  thirdText = "status",
  bool,
}: TableTitleProps) {
  const { t } = useTranslation();
  const checker = !bool ? "col-span-5" : "col-span-7";
  const checkerTwo = !bool ? "col-span-4" : "col-span-3";
  return (
    <div className="grid grid-cols-12 col-span-full py-3 px-5 bg-gray-fa border-b border-gray-2 rounded-lg text-[12px] font-[400]">
      <div className={`${checker} flex items-center`}>{t(firstText)}</div>
      <div className={`${checkerTwo} flex items-center`}>{t(secondText)}</div>
      <div className={`col-span-2 flex items-center`}>{t(thirdText)}</div>
    </div>
  );
}
