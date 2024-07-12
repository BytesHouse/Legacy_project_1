import { useTranslation } from "next-i18next";

import ViewMore from "../../ViewMore";
import FoundersTable from "./FoundersTable";
import BlockTitle from "../../BlockTitle";
import { CompanyDataInterface } from "../../../../pages/activity/index";
import TableTitle from "../TableTitle";
import NoDataResults from "../../../NoDataResults/NoDataResults";
import NoDataRelatedFounders from "../../../Icons/NoDataRelatedFounders";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../store/states";
interface RelatedCompaniesByFoundersInterface {
  relatedByOfficers: {
    results: CompanyDataInterface[];
    name: string;
  }[];
  companyNumber: string;
}
export default function RelatedCompaniesByFounders({
  relatedByOfficers,
  companyNumber,
}: RelatedCompaniesByFoundersInterface) {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);
  const { t } = useTranslation();
  const onClick = (e: any) => {
    e.stopPropagation();
    setModalState(true);
  };
  return (
    <div className="col-span-7 bg-white border border-gray-2 rounded-[12px] shadow-search w-full text-sm">
      <BlockTitle text={"related_founders"} />
      {relatedByOfficers.length && relatedByOfficers?.[0]?.results?.length ? (
        <>
          <div className="px-5 py-[15px] text-blue-black text-sm capitalize">
            <h4 className="text-sm font-medium">
              {relatedByOfficers.length
                ? relatedByOfficers?.[0]?.name?.toLocaleLowerCase()
                : "-"}
            </h4>
            <div className="grid grid-cols-10 mt-[15px] border border-gray-2 rounded-lg ">
              <TableTitle />
              <FoundersTable
                companyNumber={companyNumber}
                tableData={relatedByOfficers[0].results}
              />
            </div>
          </div>
          {relatedByOfficers?.length ? (
            <ViewMore cb={onClick} size={"xs"} />
          ) : null}
        </>
      ) : (
        <NoDataResults
          icon={<NoDataRelatedFounders />}
          text={t("no_data_related_founder")}
        />
      )}
    </div>
  );
}
