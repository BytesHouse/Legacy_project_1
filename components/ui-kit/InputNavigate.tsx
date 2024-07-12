import Link from "next/link";

import PrimaryButton from "./PrimaryButton";
import SearchIcon from "../Icons/SearchIcon";
import { useTranslation } from "next-i18next";

export default function InputNavigate() {
  const { t } = useTranslation();
  return (
    <Link href={"/search"} shallow={true}>
      <div className="bg-gray flex items-center justify-between p-[6px] rounded-xl">
        <div className="flex items-center ml-[14px]">
          <SearchIcon />
          <p className="ml-[15px] text-[12px] text-medium">
            {t("search_on_qoobus")}
          </p>
        </div>
        <PrimaryButton customStyle="text-[12px]" search text={t("search")} />
      </div>
    </Link>
  );
}
