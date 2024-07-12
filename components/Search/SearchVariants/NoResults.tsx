import Link from "next/link";
import { useTranslation } from "next-i18next";
import ZalupaNakloneonaiavLevo from "../../Icons/ZalupaNakloneonaniavLevo";
import { useState } from "react";

export default function NoResults({ input = "" }: { input?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  setTimeout(() => {
    setIsLoading(false);
  }, 200);
  return !isLoading && input.length ? (
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
      <div className="bg-gray rounded-b-md w-full px-5 py-20 flex flex-col items-center">
        <ZalupaNakloneonaiavLevo />
        <p className="text-sm mt-10 mb-1.5">
          {t("nothing_found")} <b>{input}</b>
        </p>
        <p className="text-xs text-gray-4">{t("try_rephrasing")}</p>
      </div>
    </div>
  ) : null;
}
