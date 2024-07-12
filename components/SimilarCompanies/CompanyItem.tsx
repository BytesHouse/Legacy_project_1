import moment from "moment";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { peoplesOrCompanies } from "../../store/states";
import { getInitials } from "../../utils/getInitials";
import Flag from "../ui-kit/Flag";
import LoadTypeIconRender from "../Icons/LoadTypeIconRender";
import { ResultCard } from "../ResultsComponents/ResultCard";
import StarRate from "../StarRate/StarRate";
import SecondaryButton from "../ui-kit/SecondaryButton";
import StyledLink from "../ui-kit/StyledLink";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import VerifiedIcon from "../Icons/VerifiedIcon";

export default function CompanyItem({
  name,
  headerImageId,
  imageId = "",
  role,
  company = "",
  link = "",
  type,
  address = "",
  countryIsoCode = "",
  lastCheckinStamp = 0,
  rate,
  isAside = false,
  verified,
  isSingle,
}: ResultCard) {
  const initials = getInitials(name);
  const { t } = useTranslation();
  return (
    <div className={`${isAside ? "w-full" : "w-[48%]"}`}>
      <div className="bg-white col-span-6 h-[250px] border border-[#E2E5E9] rounded-[14px] relative flex flex-col justify-between hover:shadow-md transition-shadow	duration-300">
        {headerImageId ? (
          <Image
            src={`${process.env.API}/files/${headerImageId}`}
            alt={""}
            width="0"
            height="0"
            priority
            sizes="100vw"
            className={"w-full h-[74px] object-cover rounded-t-[14px]"}
          />
        ) : (
          <div className="w-full bg-[#EAEAEA] h-[74px] rounded-tl-[10px] rounded-tr-[10px]" />
        )}
        <div className="absolute top-9 left-3">
          {imageId ? (
            <Image
              src={`${process.env.API}/files/${imageId}`}
              alt={""}
              width="0"
              height="0"
              priority
              sizes="100vw"
              className={
                "rounded-full w-[70px] h-[70px] border-[3px] border-white "
              }
            />
          ) : (
            <div
              className={`w-[70px] h-[70px] rounded-full border-[3px] border-white bg-gray-2 flex justify-center items-center text-[35px]`}
            >
              {initials?.[0]}
            </div>
          )}
          {verified && (
            <div className="absolute bottom-0 right-0">
              <VerifiedIcon size="sm" />
            </div>
          )}
        </div>
        {!isAside && (
          <span className="flex flex-col items-center absolute right-[20px] top-[63px]">
            <span className="mb-[5px] border-[3px] border-white rounded-[6px]">
              <LoadTypeIconRender type={type} title={type} />
            </span>
            <StarRate rate={rate || 0} />
          </span>
        )}
        <div className="px-[20px] pb-[20px] text-[12px] text-[#626262]">
          <div className="mb-[10px]">
            <div className="mb-[10px] w-max">
              <Link
                href={link}
                className={`${
                  isSingle ? "text-[20px]" : "text-xs2"
                } font-bold w-max mr-0 text-black hover:text-black/70 transition-all`}
              >
                {name}
              </Link>
            </div>
            {role && (
              <>
                {role} / <br /> at{" "}
                <StyledLink text={company} link={link}></StyledLink>
              </>
            )}
            {address && (
              <div className="flex items-center pb-[10px]">
                <Flag countryCode={countryIsoCode} size="md" />
                <p className="ml-[10px] text-[#626262] text-xs truncate">
                  {address}
                </p>
              </div>
            )}
          </div>
          <div className={`flex ${isAside ? "" : "justify-center"}`}>
            <Link href={link}>
              <SecondaryButton
                text={t("view_profile")}
                customStyle={"px-[18px] py-1 font-[600]"}
                onClick={() => {}}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
