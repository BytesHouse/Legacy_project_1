import Link from "next/link";
import { useTranslation } from "next-i18next";
import ZalupaNakloneonaiavLevo from "../../Icons/ZalupaNakloneonaniavLevo";

export default function EmptySearch() {
  const { t } = useTranslation();
  return (
    <div className="rounded-md border border-gray-2">
      <div className="bg-white w-full flex justify-between rounded-t-md px-5 py-2.5">
        <p className="text-[14px] font-semibold">{t("search_results")}</p>
        <Link
          className="text-c-blue hover:text-c-blue/70 text-xs font-medium"
          href="/archive"
        >
          {t("view_companies")}
        </Link>
      </div>
      <div className="bg-gray rounded-b-md w-full p-5 flex">
        <ZalupaNakloneonaiavLevo />
        <p className="text-sm ml-6 my-auto">
          {t("here_you_can")} <b>{t("people")}</b> {t("and")}{" "}
          <b>{t("c_companies")}</b>
        </p>
      </div>
    </div>
  );
}
