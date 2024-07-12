import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import ViewMore from "../../CompanyProfileComponents/ViewMore";
import TableTitle from "../../ui-kit/TableTitle";
import InsolvenciesItem from "./InsolvenciesItem";

export default function InsolvenciesBlock() {
  const tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sort((a, b) => +b - +a);
  const [showAll, setShowAll] = useState(false);
  const [activitiesData, setActivitiesData] = useState(tempArr?.slice(0, 5));
  const { t } = useTranslation();
  const handleShowMore = () => {
    if (showAll) {
      setActivitiesData(tempArr?.slice(0, 5));
    } else {
      setActivitiesData(tempArr);
    }
    setShowAll((s) => !s);
  };
  return (
    <div className="rounded-xl border border-gray-2 col-span-7 bg-white font-medium">
      <div className="w-full flex justify-between px-5 py-2.5 border-b border-gray-2 text-[#37383A]">
        <p className="text-[14px] font-semibold">{t("insolvencies")}</p>
      </div>
      <div className="m-[20px] border border-gray-2 rounded-[9px]">
        <TableTitle
          firstText={"document_name"}
          secondText={"county"}
          thirdText={"document_date"}
          bool
        />
        <div>
          {/* {activitiesData.map((item, i) => (
            <React.Fragment key={item + "i"}>
              <InsolvenciesItem key={item + "i"} />
              {i !== activitiesData.length - 1 && (
                <div className="border-b border-gray-2" />
              )}
            </React.Fragment>
          ))} */}
        </div>
        <ViewMore
          text={showAll ? "show_less" : "show_more"}
          cb={handleShowMore}
        />
      </div>
    </div>
  );
}
