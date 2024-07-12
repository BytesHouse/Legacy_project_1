import { useTranslation } from "next-i18next";
import Link from "next/link";
import { CompanyDataInterface } from "../../pages/activity";
import { CompanyInterface, getStatus } from "../../utils/getStatus";
import { Tooltip } from "../Tooltip/Tooltip";
import Flag from "../ui-kit/Flag";
import StatusCompany from "../ui-kit/StatusCompany";

interface CompanyItemProps {
  countryCode: string;
  name: string;
  createdDate: string;
  address: string;
  status: string;
  company: CompanyInterface | CompanyDataInterface;
  id: string;
}

interface CompanyListProps {
  array: any[];
}

export default function CompanyList({ array }: CompanyListProps) {
  return (
    <ul className="bg-white rounded-xl shadow-search cursor-pointer">
      {array.map(
        ({ countryCode, name, createdDate, address, status, id }, i) => (
          <CompanyItem
            key={countryCode + i + "gss"}
            name={name}
            countryCode={countryCode}
            createdDate={createdDate}
            address={address}
            status={status}
            company={array[i]}
            id={id}
          />
        )
      )}
    </ul>
  );
}

const CompanyItem = ({
  countryCode,
  name,
  createdDate = "",
  address = "",
  status,
  company,
  id,
}: CompanyItemProps) => {
  const test = getStatus(company);
  const { t } = useTranslation();
  return (
    <li className="mb-[20px] border border-gray-2 rounded-xl shadow-search hover:border-purple">
      <Link
        href={`/companies/[...slug]`}
        as={`/companies/${countryCode.toLowerCase()}/${encodeURIComponent(id)}`}
      >
        <div className="p-[23px] flex items-center justify-between bg-white-1 rounded-t-xl border-b border-gray-2 ">
          <div className="flex items-center">
            <Flag size="md" countryCode={countryCode} />
            <p className="text-[#0A090F] text-[16px] font-[600] ml-[12px]">
              {name}
            </p>
          </div>
          <div className="group relative">
            <StatusCompany status={test[0]} color={test[1]} />
            <Tooltip />
          </div>
        </div>
        <div className="py-[15px] px-[20px]">
          <p className="text-[13px] font-[400] text-[#686B6F]">
            <span className="text-12-16 md:text-14-20 text-gray-80">
              {t("is_a_comp_from")}{" "}
              <span className="">
                {t(`from_${countryCode.toLocaleLowerCase()}`)}{" "}
              </span>
              {t("founded_in")}
              {createdDate ? (
                <span className="text-gray-90 ">
                  {` ${
                    createdDate.includes("/")
                      ? createdDate.split("/")[2]
                      : createdDate.includes(".")
                      ? createdDate.split(".")[2]
                      : createdDate
                  } `}
                </span>
              ) : (
                <span className="text-gray-90">{" - "}</span>
              )}
              {t("with_reg_num")}
              {` `}
              <span className={`text-gray-90`} />
              {address ? (
                <>
                  {" "}
                  {t("and_reg_address")}
                  <span
                    className={`text-gray-90 ${
                      address?.includes(address!) ? "font-bold" : ""
                    }`}
                  >{` ${address}.`}</span>
                </>
              ) : (
                "."
              )}
            </span>
          </p>
        </div>
      </Link>
    </li>
  );
};
