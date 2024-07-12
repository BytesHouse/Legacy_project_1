import isArray from "lodash/isArray";

import PhoneItem from "./items/PhoneItem";
import EmailItem from "./items/EmailItem";
import { Overview } from "./OverviewFromArray";
import WebsiteItem from "./items/WebSiteItem";
import DefaultItem from "./items/DefaultItem";
import PhoneNotAvailable from "./PhoneNotAvailable";
import { useTranslation } from "next-i18next";

export interface PhoneOverviewProps {
  data: Overview;
}

const PhoneOverview = ({ data }: PhoneOverviewProps) => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-12 mb-[8px]">
      <h3 className="col-span-4 font-[500]">{t(data.title)}</h3>
      {data?.text.length && data.text !== "-" ? (
        isArray(data.text) ? (
          <div className="col-span-8">
            {data.text.map((el, index) => (
              <div key={el} className={"font-[600] text-14-20 md:text-16-22"}>
                {Number(el.replace(/[+\-()\s]/g, "")) ? (
                  <PhoneItem el={el} text={"phone"} />
                ) : el.includes("@") ? (
                  <EmailItem el={el} text={"email"} />
                ) : el.includes("www") ? (
                  <WebsiteItem el={el} text={"website"} />
                ) : index === 0 ? (
                  <PhoneNotAvailable text={"-"} />
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          data?.text.length && <DefaultItem data={data} />
        )
      ) : (
        <PhoneNotAvailable text={"-"} />
      )}
    </div>
  );
};

export default PhoneOverview;
