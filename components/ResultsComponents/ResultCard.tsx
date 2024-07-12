import Image from "next/image";
import StatusLight from "../ui-kit/StatusLight";
import PrimaryButton from "../ui-kit/PrimaryButton";
import SecondaryButton from "../ui-kit/SecondaryButton";
import StyledLink from "../ui-kit/StyledLink";
import { getInitials } from "../../utils/getInitials";
import Flag from "../ui-kit/Flag";
import moment from "moment";
import { modalState, peoplesOrCompanies } from "../../store/states";
import { useRecoilState, useRecoilValue } from "recoil";
import { useTranslation } from "next-i18next";
import { LoadTypes } from "../Icons/LoadTypeIconRender";
import Link from "next/link";
import { UtilityService } from "../../services/Utility.Service";

export interface ResultCard {
  name: string;
  headerImageId?: string;
  imageId?: string;
  role?: string;
  company?: string;
  link?: string;
  rate?: number;
  type?: keyof typeof LoadTypes;
  address?: string;
  countryIsoCode?: string;
  lastCheckinStamp?: number;
  isAside?: boolean;
  verified?: boolean;
  id?: string;
  companyNumber?: string;
  isSingle?: boolean;
}

export default function ResultCard({
  name,
  headerImageId,
  imageId = "",
  role,
  company = "",
  id,
  address = "",
  companyNumber,
  countryIsoCode = "",
  lastCheckinStamp = 0,
}: ResultCard) {
  const isPeople = useRecoilValue(peoplesOrCompanies);
  const [_isModalOpen, setModalState] = useRecoilState(modalState);

  const link = isPeople
    ? `/users/${id}`
    : `/companies/${countryIsoCode.toLocaleLowerCase()}/${UtilityService.getSlugB2B(
        {
          name: name,
          shortName: name,
          brandName: name,
          internationalNumber: companyNumber,
        }
      )}`;
  const companyLink = `/companies/${countryIsoCode.toLocaleLowerCase()}/${UtilityService.getSlugB2B(
    {
      name: company,
      shortName: company,
      brandName: company,
      internationalNumber: companyNumber,
    }
  )}`;
  const initials = getInitials(name);
  const { t } = useTranslation();
  return (
    <div className="bg-white col-span-6 h-[250px] border border-[#E2E5E9] rounded-[14px] relative flex flex-col justify-between">
      {headerImageId ? (
        <Image
          src={`${process.env.API}/files/${headerImageId}`}
          alt={""}
          width={400}
          height={74}
          className={"w-full h-[74px]"}
        />
      ) : (
        <div className="w-full bg-[#EAEAEA] h-[74px] rounded-tl-[10px] rounded-tr-[10px]" />
      )}
      <div className="absolute top-9 left-3">
        {imageId ? (
          <Image
            src={`${process.env.API}/files/${imageId}`}
            alt={""}
            width={70}
            height={70}
            className={"rounded-full border-[3px] border-white "}
          />
        ) : (
          <div
            className={`w-[70px] h-[70px] rounded-full border-[3px] border-white ${
              isPeople ? "bg-purple text-white" : "bg-gray-2"
            } flex justify-center items-center`}
          >
            {isPeople ? initials : initials[0]}
          </div>
        )}
      </div>
      <div className="px-[20px] pb-[20px] text-[12px] text-[#626262]">
        <div className="mb-[10px]">
          <h4 className="text-[18px] font-bold text-black mb-[10px] truncate w-full">
            {name}
          </h4>
          {(role || company) && (
            <>
              <p className="flex flex-col">{role || "-"} | </p>
              <StyledLink
                text={company}
                link={companyNumber ? companyLink : "#"}
              ></StyledLink>
            </>
          )}
          {countryIsoCode && (
            <div className="flex items-center pb-[10px]">
              <Flag countryCode={countryIsoCode} size="md" />
              <p className="ml-[10px] text-[#626262] text-[12px] truncate">
                {address || "-"}
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-between gap-x-2.5">
          <Link href={link} className="w-full">
            <PrimaryButton
              text={t("view_profile")}
              customStyle={"px-0 w-full py-1 border border-purple"}
            />
          </Link>
          <SecondaryButton
            text={t("connect")}
            customStyle={"px-0 w-full py-1"}
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              setModalState(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}
