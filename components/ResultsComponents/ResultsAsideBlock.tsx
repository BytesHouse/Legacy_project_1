import moment from "moment";
import { GetStaticPropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import { SearchService } from "../../services/Search.service";
import { modalState, peoplesOrCompanies } from "../../store/states";
import { arraySearch } from "../../utils/constants/arrayMenuItems";
import { getCurrentYear } from "../../utils/getCurrentYear";
import getServerSideTranslations from "../../utils/getServerSideTranslations";
import Footer from "../Footer/Footer";
import ArrowrightIcon from "../Icons/ArrowRightIcon";
import LocaleSwitch from "../LocaleSwitch/LocaleSwitch";
import StatusLight from "../ui-kit/StatusLight";
import Link from "next/link";
import { UtilityService } from "../../services/Utility.Service";
import { CompaniesKnowInterface } from "../../interfaces/qobCompanyProfile/companiesKnow.interface";
import { Company, RandomPeople } from "../interfaces/RandomPeople.interface";
import { getInitials } from "../../utils/getInitials";
import Flag from "../ui-kit/Flag";

interface ResultsAsideBlock {
  randomPeoples?: RandomPeople[];
  randomCompanies?: CompaniesKnowInterface[];
  isUserPage?: boolean;
}

export default function ResultsAsideBlock({
  randomPeoples,
  randomCompanies,
  isUserPage = false,
}: ResultsAsideBlock) {
  const isPeople = useRecoilValue(peoplesOrCompanies);
  const [_isModalOpen, setModalState] = useRecoilState(modalState);
  const router = useRouter();
  const { locale, locales, asPath: currentPath } = router;
  const { t } = useTranslation();
  return (
    <div className="col-span-4">
      <div className="border border-gray-2 rounded-[12px] shadow-search mb-[33px]">
        <div className="bg-white px-[20px] py-[10px] rounded-t-[12px] border-b border-gray-2">
          <p className="text-[12px]">{t("people_also_viewed")}</p>
        </div>
        <div className="bg-white">
          <ul className="px-[22px] py-[16px] flex flex-col gap-[9px]">
            {!isPeople || isUserPage
              ? randomPeoples?.map(
                  (
                    {
                      imageId,
                      displayName,
                      company,
                      lastCheckinStamp,
                      position,
                      id,
                    }: any,
                    i
                  ) => (
                    <AsideBlockItemPeople
                      imageId={imageId}
                      displayName={displayName}
                      userId={id}
                      userPosition={position}
                      company={company}
                      lastCheckinStamp={lastCheckinStamp}
                      key={displayName + i}
                    />
                  )
                )
              : randomCompanies?.map((item, i) => (
                  <AsideBlockItemCompany
                    {...item}
                    key={item.companyNumber + item.displayName + item.id + i}
                  />
                ))}
          </ul>
        </div>
        <div
          className="flex items-center justify-center p-[11px] bg-[#FAFAFA] rounded-b-[12px] border-t border-gray-2 cursor-pointer"
          onClick={(e: any) => {
            e.stopPropagation();
            setModalState(true);
          }}
        >
          <p className="text-[12px] mr-[10px]">{t("view_more")}</p>
          <ArrowrightIcon color={"#000000"} />
        </div>
      </div>
      <div>
        <Footer array={arraySearch} styles="[&>*]:mr-0" />
        <div className="flex justify-between mt-8 pb-0">
          <LocaleSwitch
            locale={locale}
            locales={locales}
            currentPath={currentPath}
          />
          <p className="text-[12px] text-[#87949E]">
            {getCurrentYear()} © Qoobus Corporation
          </p>
        </div>
      </div>
    </div>
  );
}
interface AsideBlockItemProps {
  imageId: string;
  displayName: string;
  userId: number;
  userPosition: string;
  company: Company;
  lastCheckinStamp: number;
}

const AsideBlockItemPeople = ({
  imageId,
  displayName,
  userId,
  userPosition,
  company,
  lastCheckinStamp,
}: AsideBlockItemProps) => {
  const companyName =
    company?.displayName || company.shortName || company.name || "";
  const initials = getInitials(displayName);

  return (
    <li className="border border-gray-2 rounded-[10px] p-[14px] flex gap-[15px] shadow-search">
      <div className="relative w-[40px] h-[40px]">
        {imageId ? (
          <Image
            src={`${process.env.API}/files/${imageId}`}
            alt={displayName}
            width={40}
            height={40}
            className={
              "rounded-full w-[40px] h-[40px] object-cover text-xs  overflow-hidden"
            }
          />
        ) : (
          <div
            className={`w-[40px] bg-purple text-white h-[40px] rounded-full border-[3px] border-white  flex justify-center items-center`}
          >
            {initials}
          </div>
        )}
      </div>
      <div className="w-full flex flex-col truncate">
        <Link href={`/users/${userId}`} className="text-[14px] font-bold ">
          {displayName}
        </Link>
        <div className="flex gap-x-1 text-[13px] w-full">
          <p className="text-[#37383A]">{userPosition || "-"} | </p>
          <Link
            href={`/companies/${company?.countryIsoCode?.toLocaleLowerCase()}/${UtilityService.getSlugB2B(
              {
                name: companyName,
                shortName: companyName,
                brandName: companyName,
                internationalNumber: company?.companyNumber,
              }
            )}`}
            className="inline-block text-c-blue hover:text-secondary-60 hover:underline truncate cursor-pointer w-max"
          >
            {companyName}
          </Link>
        </div>
      </div>
    </li>
  );
};

const AsideBlockItemCompany = (props: CompaniesKnowInterface) => {
  const {
    displayName,
    shortName,
    name,
    imageId,
    companyNumber,
    countryIsoCode,
    lastCheckinStamp,
    address,
  } = props;
  const companyName = displayName || shortName || name || "";
  const initials = getInitials(displayName);
  return (
    <li className="border border-gray-2 rounded-[10px] p-[14px] flex gap-[15px] shadow-search">
      <div className="relative">
        {imageId ? (
          <Image
            src={`${process.env.API}/files/${imageId}`}
            alt={displayName}
            width={40}
            height={40}
            className={
              "rounded-full w-[40px] h-[40px] object-cover text-xs overflow-hidden"
            }
          />
        ) : (
          <div
            className={`w-[40px] bg-gray-2 text-black h-[40px] rounded-full border-[3px] border-white  flex justify-center items-center`}
          >
            {initials?.[0]}
          </div>
        )}
      </div>
      <div className="w-full flex flex-col truncate">
        {/* <Link href={`/users/${userId}`} className="text-[14px] font-bold ">
          {displayName}
        </Link> */}
        <Link
          href={`/companies/${countryIsoCode?.toLocaleLowerCase()}/${UtilityService.getSlugB2B(
            {
              name: companyName,
              shortName: companyName,
              brandName: companyName,
              internationalNumber: companyNumber,
            }
          )}`}
          className="text-[13px] text-[#626262]"
        >
          {companyName}
        </Link>
        <div className="flex items-center">
          <Flag countryCode={countryIsoCode.toLocaleLowerCase()} size="md" />
          <p className="ml-[10px] text-[12px] truncate font-[600] text-[#37383A]">
            {address}
          </p>
        </div>
      </div>
    </li>
  );
};
