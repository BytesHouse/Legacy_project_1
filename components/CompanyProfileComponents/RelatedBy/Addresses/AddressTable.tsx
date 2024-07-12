import React from "react";

import { CompanyInterface } from "../../../../utils/getStatus";
import { CompanyDataInterface } from "../../../../pages/activity";
import TableItem from "../TableItem";

export type CompanyType = CompanyInterface | CompanyDataInterface;

interface AddressTableInterface {
  tableData: CompanyType[];
}

export default function AddressTable(props: AddressTableInterface) {
  return (
    <div className="grid grid-cols-12 col-span-full py-[15px] px-5 text-xs gap-y-3">
      {props?.tableData?.map(
        (item: CompanyInterface | CompanyDataInterface) => {
          return (
            <TableItem
              key={`${item.companyNumber}-${item.shortName}`}
              item={item}
            />
          );
        }
      )}
    </div>
  );
}
