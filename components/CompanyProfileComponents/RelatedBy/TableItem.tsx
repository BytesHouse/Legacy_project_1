import Link from "next/link";
import moment from "moment";

import { getStatus } from "../../../utils/getStatus";
import StatusCompany from "../../ui-kit/StatusCompany";
import { CompanyDataInterface } from "../../../pages/activity";
import { CompanyInterface } from "../../../utils/getStatus";
import { Tooltip } from "../../Tooltip/Tooltip";

export type CompanyType = CompanyInterface | CompanyDataInterface;

interface TableItemInterface {
  item: CompanyType;
}

export default function TableItem({ item }: TableItemInterface) {
  const [status, color] = getStatus(item);
  const companyName = item?.shortName?.length
    ? Array.isArray(item?.shortName!)
      ? item?.shortName?.[0]
      : String(item?.shortName)
    : item?.name;

  return (
    <>
      <div className="col-span-7 flex">
        <Link
          href={`/companies/${item.countryCode.toLocaleLowerCase()}/${item.id}`}
          shallow={false}
          className="flex w-full pr-5 items-center group"
        >
          <p className="truncate font-medium text-c-blue group-hover:underline hover:text-c-blue/70 text-xs2 w-full my-auto">
            {companyName}
          </p>
        </Link>
      </div>
      <div className="col-span-2 font-semibold flex items-center">
        {moment(item.createdDate, "DDMMYYYY").format("ll")}
      </div>
      <span className="col-span-1" />
      <div
        className={`col-span-2 font-semibold flex items-center group relative`}
      >
        <StatusCompany status={status} color={color} isRelated />
        <Tooltip />
      </div>
    </>
  );
}
