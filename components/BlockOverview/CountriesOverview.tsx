import { useTranslation } from "next-i18next";

import { Overview } from "./OverviewFromArray";
import Flag from "../ui-kit/Flag";
import { useState, useTransition } from "react";
import { isArray } from "lodash";

interface PhoneOverviewProps {
  data: Overview;
}
function CountriesOverview({ data }: PhoneOverviewProps) {
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState(false);
  return data.text.length ? (
    <div className="grid grid-cols-12 mb-[8px]">
      <h3 className="col-span-4 font-[500]">{data.title}</h3>
      {data.text !== "-" ? (
        <div className="col-span-8 font-[600] flex gap-x-3">
          {Array.isArray(data.text) ? (
            data.text?.map((country, i) => {
              if (country === "Other") return;
              if (i < 2) {
                return (
                  <div className="flex gap-x-1.5" key={data.title + country}>
                    <Flag countryCode={country} size="md" />
                    {t(country?.toLocaleUpperCase())}
                  </div>
                );
              }
              if (i < 3) {
                return (
                  <div
                    className="flex px-1 text-[12px] justify-center items-center text-white bg-pewter-gray rounded-full relative hover:cursor-pointer"
                    key={data.title + country}
                    onMouseEnter={() => setIsShow(true)}
                    onMouseLeave={() => setIsShow(false)}
                  >
                    +{data.text.length - 2}
                    {isShow && (
                      <DropDown
                        text={data.text.slice(2, data.text.length)}
                        countryCode={country}
                      />
                    )}
                  </div>
                );
              }
              return;
            })
          ) : (
            <div className="flex gap-x-1.5" key={data?.text}>
              <Flag countryCode={data?.text} size="md" />
              {t(data?.text?.toLocaleUpperCase())}
            </div>
          )}
        </div>
      ) : (
        <div className="col-span-8 font-[600]">-</div>
      )}
    </div>
  ) : null;
}
export default CountriesOverview;

interface DropDown {
  text: string | string[];
  countryCode: string;
}

const DropDown = ({ text, countryCode }: DropDown) => {
  const { t } = useTranslation();
  return (
    <ul className="absolute bg-white text-black p-2.5 flex flex-col gap-1.5 font-bold top-5 left-7 shadow-lg rounded-xl">
      {!isArray(text) ? (
        <li className="flex">
          <Flag size="md" countryCode={countryCode} />
          {text}{" "}
        </li>
      ) : (
        text.map((item) => {
          return (
            <li className="flex items-center gap-1.5" key={item}>
              <Flag size="md" countryCode={item} />
              {t(item.toLocaleUpperCase())}{" "}
            </li>
          );
        })
      )}
    </ul>
  );
};
