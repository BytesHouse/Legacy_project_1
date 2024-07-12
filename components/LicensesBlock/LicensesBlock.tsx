import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import ViewMore from "../CompanyProfileComponents/ViewMore";
import TableTitle from "../ui-kit/TableTitle";
import LicensesItem from "./LicensesItem";

export default function LicensesBlock({ licenses }: any) {
  const [showAll, setShowAll] = useState(false);
  const [activitiesData, setActivitiesData] = useState(licenses?.slice(0, 5));
  const { t } = useTranslation();
  const handleShowMore = () => {
    if (showAll) {
      setActivitiesData(licenses?.slice(0, 5));
    } else {
      setActivitiesData(licenses);
    }
    setShowAll((s) => !s);
  };
  return (
    <div className="rounded-xl border border-gray-2 col-span-7 bg-white font-medium shadow-search">
      <div className="w-full flex justify-between px-5 py-2.5 border-b border-gray-2 text-[#37383A]">
        <p className="text-[14px] font-semibold">{t("licenses")}</p>
      </div>
      <div className="m-[20px] border border-gray-2 rounded-[9px]">
        <TableTitle
          firstText={"license_type"}
          secondText={"number"}
          thirdText={"order"}
          bool
        />
        <div>
          {licenses && licenses.length
            ? activitiesData.map((item: any, i: number) => (
                <React.Fragment key={item + "i"}>
                  <LicensesItem
                    order={item.order}
                    type={item.type}
                    number={item.number}
                    key={item + "i"}
                  />
                  {i !== activitiesData.length - 1 && (
                    <div className="border-b border-gray-2" />
                  )}
                </React.Fragment>
              ))
            : null}
        </div>
        <ViewMore
          text={showAll ? "show_less" : "show_more"}
          cb={handleShowMore}
        />
      </div>
    </div>
  );
}
