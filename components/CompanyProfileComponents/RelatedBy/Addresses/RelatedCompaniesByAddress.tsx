import Link from "next/link";
import { useTranslation } from "next-i18next";

import AddressTable from "./AddressTable";
import BlockTitle from "../../BlockTitle";
import { CompanyDataInterface } from "../../../../pages/activity/index";
import TableTitle from "../TableTitle";
import NoDataResults from "../../../NoDataResults/NoDataResults";
import NoDataRelatedAddress from "../../../Icons/NoDataRelatedAddress";

interface RelatedCompaniesByAddressInterface {
  relatedByAddress: {
    results: CompanyDataInterface[];
  };
  address: string;
  companyName: string;
}
export default function RelatedCompaniesByAddress({
  relatedByAddress,
  address,
  companyName,
}: RelatedCompaniesByAddressInterface) {
  const { t } = useTranslation();
  return (
    <div className="col-span-7 bg-white border border-gray-2 rounded-[12px] shadow-search w-full text-sm">
      <BlockTitle text={"related_address"} />
      {relatedByAddress?.results?.length ? (
        <div className="px-5 py-[15px] text-blue-black text-sm capitalize">
          <h4 className="text-sm font-medium">{address.toLocaleLowerCase()}</h4>

          <div className="grid grid-cols-10 mt-[15px] border border-gray-2 rounded-lg ">
            <TableTitle />
            {relatedByAddress.results.length && (
              <AddressTable tableData={relatedByAddress.results} />
            )}
          </div>
        </div>
      ) : (
        <NoDataResults
          icon={<NoDataRelatedAddress />}
          text={t("no_data_related_address")}
        />
      )}
    </div>
  );
}
