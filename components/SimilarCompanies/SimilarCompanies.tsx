import ViewMore from "../CompanyProfileComponents/ViewMore";
import CompanyItem from "./CompanyItem";
import { CompaniesKnowInterface } from "../../interfaces/qobCompanyProfile/companiesKnow.interface";
import React from "react";
import { UtilityService } from "../../services/Utility.Service";
import { useTranslation } from "next-i18next";
import { useRecoilState } from "recoil";
import { modalState } from "../../store/states";
import { LoadTypes } from "../Icons/LoadTypeIconRender";

interface SimilarCompaniesProps {
  similarCompanies: CompaniesKnowInterface[];
}
function SimilarCompanies({ similarCompanies }: SimilarCompaniesProps) {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);
  const { t } = useTranslation();
  const onClick = () => {
    setModalState(true);
  };
  return (
    <div className="rounded-xl border border-gray-2 col-span-7 bg-white font-medium shadow-search">
      <div className="w-full flex justify-between px-5 py-2.5 border-b border-gray-2 text-[#37383A]">
        <p className="text-[14px] font-semibold">{t("similar_companies")}</p>
      </div>
      <ul className="px-5 py-[20px] flex flex-wrap gap-y-[16px] justify-between">
        {similarCompanies.map((item) => {
          const {
            shipper,
            forwarder,
            carrier,
            imageId,
            headerImageId,
            shortName,
            name,
            displayName,
            address,
            score,
            lastCheckinStamp,
            countryIsoCode,
            companyNumber,
            brandName,
            verified,
            type,
          } = item;
          return (
            <CompanyItem
              headerImageId={headerImageId}
              imageId={imageId}
              role={""}
              type={type?.toLocaleLowerCase() as keyof typeof LoadTypes}
              rate={score.score || 0}
              company={displayName || shortName || name || "-"}
              link={`/companies/${countryIsoCode.toLocaleLowerCase()}/${UtilityService.getSlugB2B(
                {
                  name,
                  shortName,
                  brandName,
                  internationalNumber: companyNumber,
                }
              )}`}
              address={address || "-"}
              countryIsoCode={countryIsoCode || "-"}
              lastCheckinStamp={lastCheckinStamp}
              key={item + displayName}
              name={displayName || shortName || name}
              verified={verified}
            />
          );
        })}
      </ul>
      <ViewMore cb={onClick} />
    </div>
  );
}
const Memoized = React.memo(SimilarCompanies);
export default Memoized;
