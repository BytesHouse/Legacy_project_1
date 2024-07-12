import Link from "next/link";
import { countries } from "../../../utils/constants/countries";
import Flag from "../../ui-kit/Flag";
import CustomsInput from "./CustomsInput";
import { useTranslation } from "next-i18next";
import React from "react";

interface CustomsForArchiveInterface {
  countriesList: Record<string, number>;
}

export default function CustomsForArchive({
  countriesList,
}: CustomsForArchiveInterface) {
  const { t } = useTranslation();

  return (
    <>
      <CustomsInput />
      <div className="flex flex-wrap w-full gap-y-4 justify-between gap-x-5 mt-[25px] after:flex-auto after:content-['']">
        {Object.entries(countriesList).map((entry) => (
          <React.Fragment key={entry[0] + entry[1]}>
            <Link
              shallow={true}
              prefetch={false}
              href={"/search/customs/" + entry[0].toLocaleLowerCase()}
              className={`flex gap-2 items-center hover:border-hover-violet transition-all text-black-carbon bg-white p-2 rounded-md border border-label-gray`}
            >
              <Flag size="md" countryCode={entry[0]} />
              <p className="text-xs2 font-bold">
                {t(entry[0].toLocaleLowerCase())}
              </p>
              <span className="bg-label-gray text-xxs px-1 py-0.5 rounded-[4px] font-bold">
                {entry[1]}
              </span>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
