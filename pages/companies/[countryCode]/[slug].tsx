import moment from "moment";
import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import StickyBox from "react-sticky-box";
import { useRecoilState } from "recoil";

import { countries } from "../../../assets/constants/countries";
import { nearbyCountries } from "../../../assets/constants/nearbyCountries";
import VerifiedIcon from "../../../components/Icons/VerifiedIcon";
import LastUpdate from "../../../components/LastUpdate/LastUpdate";
import Companies from "../../../components/Search/SearchVariants/Companies";
import { RecentItemProps } from "../../../components/Search/SearchVariants/RecentItem";
import { RoutesUsersInterface } from "../../../interfaces/qobCompanyProfile/Users.interface";
import { CompaniesKnowInterface } from "../../../interfaces/qobCompanyProfile/companiesKnow.interface";
import { CompanyUsersInterface } from "../../../interfaces/qobCompanyProfile/companyUsers.interface";
import { FeedBacksInterface } from "../../../interfaces/qobCompanyProfile/feedBacks.interface";
import { QoobusProfile } from "../../../interfaces/qobCompanyProfile/qobCompanyProfileInterfaces.interface";
import { RoutesInterface } from "../../../interfaces/qobCompanyProfile/routes.interface";
import { SearchService } from "../../../services/Search.service";
import { modalState, recent } from "../../../store/states";
import { arraySearch } from "../../../utils/constants/arrayMenuItems";
import { getCurrentYear } from "../../../utils/getCurrentYear";
import { getInitials } from "../../../utils/getInitials";
import getServerSideTranslations from "../../../utils/getServerSideTranslations";
import { CompanyInterface, getStatus } from "../../../utils/getStatus";
import { CompanyDataInterface } from "../../activity/index";
import { addressEditor } from "../../../utils/addressEditor";

const ActivityBlock = dynamic(
  () => import("../../../components/ActivityBlock/ActivityBlock")
);
const BackButton = dynamic(
  () => import("../../../components/ui-kit/BackButton")
);
const Flag = dynamic(() => import("../../../components/ui-kit/Flag"));
const NewToQoobus = dynamic(
  () => import("../../../components/NewToQoobus/NewToQoobus")
);
const BlockEmpoyees = dynamic(
  () => import("../../../components/Blocks/BlockEmpoyees")
);
const BlockRates = dynamic(
  () => import("../../../components/Blocks/BlockRates")
);
const SecondaryButton = dynamic(
  () => import("../../../components/ui-kit/SecondaryButton")
);
const PrimaryButton = dynamic(
  () => import("../../../components/ui-kit/PrimaryButton")
);
const BlockOverview = dynamic(
  () => import("../../../components/BlockOverview/BlockOverview")
);
const BlockAbout = dynamic(
  () => import("../../../components/Blocks/BlockAbout")
);
const FinancialBlock = dynamic(
  () =>
    import(
      "../../../components/CompanyProfileComponents/FinancialBlock/FinancialBlock"
    )
);
const RouteItems = dynamic(
  () => import("../../../components/CompanyProfileComponents/RouteItems")
);
const RelatedCompaniesByFounders = dynamic(
  () =>
    import(
      "../../../components/CompanyProfileComponents/RelatedBy/Founders/RelatedCompaniesByFounders"
    )
);
const RelatedCompaniesByAddress = dynamic(
  () =>
    import(
      "../../../components/CompanyProfileComponents/RelatedBy/Addresses/RelatedCompaniesByAddress"
    )
);
const ExecutiveTeam = dynamic(
  () =>
    import(
      "../../../components/CompanyProfileComponents/ExecutiveTeam/ExecutiveTeam"
    )
);
const Footer = dynamic(() => import("../../../components/Footer/Footer"));
const LocaleSwitch = dynamic(
  () => import("../../../components/LocaleSwitch/LocaleSwitch")
);
const SimilarCompanies = dynamic(
  () => import("../../../components/SimilarCompanies/SimilarCompanies")
);
const Faq = dynamic(() => import("../../../components/Faq/Faq"));
const SearchFooter = dynamic(
  () => import("../../../components/Search/components/SearchFooter")
);
const PostsAndNews = dynamic(
  () =>
    import(
      "../../../components/CompanyProfileComponents/PostsNews/PostsAndNews"
    )
);

const CompanyType = dynamic(
  () => import("../../../components/CompanyType/CompanyType")
);

interface ProfileProps {
  companyProfileQorporates?: CompanyInterface;
  companyProfileQoobus?: QoobusProfile;
  companiesKnow: CompaniesKnowInterface[];
  routesUsers: RoutesUsersInterface[];
  routes: RoutesInterface[];
  companyUsers: CompanyUsersInterface[];
  // feedBackTo: FeedBacksInterface;
  // feedBackFrom: FeedBacksInterface;
  relatedDataByAddress: {
    results: CompanyDataInterface[];
  };
  relatedDataByOfficer: {
    results: CompanyDataInterface[];
    name: string;
  }[];
  countryCode: string;
}

export default function Profile({
  companyProfileQoobus,
  companyProfileQorporates,
  companiesKnow,
  // feedBackTo,
  // feedBackFrom,
  countryCode,
  routesUsers,
  routes,
  companyUsers,
  relatedDataByAddress,
  relatedDataByOfficer,
}: ProfileProps) {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);
  const [recentState, setRecentState] = useRecoilState(recent);

  const companyQob = companyProfileQoobus?.company;

  const {
    headerImageId,
    imageId,
    score,
    followersSize,
    phone,
    type,
    verified,
    founded,
  } = companyQob || {};

  const router = useRouter();
  const companyName =
    companyProfileQoobus?.company?.displayName ||
    companyProfileQoobus?.company?.name ||
    (companyProfileQorporates?.shortName?.length
      ? Array.isArray(companyProfileQorporates?.shortName!)
        ? companyProfileQorporates?.shortName?.[0]
        : String(companyProfileQorporates?.shortName)
      : companyProfileQorporates?.name);
  const companyNumber =
    companyProfileQoobus?.internationalNumber ||
    companyProfileQorporates?.companyNumber ||
    "-";
  const initials = getInitials(companyName!);
  const { locale, locales, asPath: currentPath } = router;
  moment.locale(locale);
  const { t } = useTranslation();

  const taxes = companyProfileQorporates?.taxes
    ? Object.keys(companyProfileQorporates?.taxes).reverse()[0]
    : "";
  const employeesQorp = companyProfileQorporates?.taxes?.[taxes]?.employees;
  const activities = companyProfileQorporates?.activities?.[0]?.name;
  const address = companyProfileQorporates?.address;
  const admin = companyProfileQorporates?.ceos?.[0]?.name;
  const length =
    companyProfileQorporates?.taxes &&
    Object.keys(companyProfileQorporates?.taxes!)?.length;
  const data = [
    companyProfileQorporates?.taxes &&
      Object.keys(companyProfileQorporates?.taxes)?.[0],
    companyProfileQorporates?.taxes &&
      Object.keys(companyProfileQorporates?.taxes)?.reverse()?.[0],
  ];
  const status = companyProfileQorporates
    ? getStatus(companyProfileQorporates)
    : "";
  const country = countries[companyProfileQorporates?.countryCode!];
  const lastUpdate = useMemo(
    () => moment(companyProfileQorporates?.lastUpdate).format("LLLL"),
    [companyProfileQorporates?.lastUpdate]
  );
  useEffect(() => {
    setRecentState([
      {
        name: companyName || "-",
        initials: initials?.[0],
        verified,
        imageId,
        href: router.asPath,
      },
      ...recentState.filter((el: RecentItemProps) => el.href !== router.asPath),
    ]);
  }, [companyProfileQoobus, companyProfileQoobus]);
  const ceos = companyProfileQorporates?.ceos;

  const tmp = [
    {
      title: `${t("when_was")} ${companyName}  ${t("established")}`,
      text: founded
        ? `${companyName} ${t("founded_on")} ${moment(founded).format(
            "MMMM Do YYYY"
          )}`
        : `${t("faq_no_data")} ${companyName}`,
    },
    {
      title: `${t("comp_faq_title_2_start")} ${companyName} ${t(
        "comp_faq_title_2_end"
      )}`,
      text:
        employeesQorp && taxes
          ? `${t("comp_faq_text_2_start")} ${taxes} ${t(
              "comp_faq_text_2_middle"
            )} ${employeesQorp} ${t("comp_faq_text_2_end")}`
          : `${t("comp_faq_text_2_no_data")}`,
    },
    {
      title: `${t("comp_faq_title_3")} ${companyName}?`,
      text: activities
        ? `${t("comp_faq_text_3_start")} ${companyName} ${t(
            "comp_faq_text_3_end"
          )} ${activities}`
        : `${t("comp_faq_text_3_no_data")} ${companyName}`,
    },
    {
      title: `${t("comp_faq_title_4_start")} ${companyName} ${t(
        "comp_faq_title_4_end"
      )}`,
      text: address
        ? `${t("comp_faq_text_4_start")} ${companyName} ${t(
            "comp_faq_text_4_end"
          )} ${address}`
        : `${t("comp_faq_text_4_no_data")} ${companyName}`,
    },
    {
      title: `${t("comp_faq_title_5")} ${companyName}`,
      text: admin
        ? `${admin} ${t("comp_faq_text_5")} ${companyName} `
        : `${t("comp_faq_text_5_no_data")} ${companyName}`,
    },
    {
      title: `${t("comp_faq_title_6_start")} ${companyName} ${t(
        "comp_faq_title_6_end"
      )}`,
      text: [
        `${t("comp_faq_title_6_list_1")}`,
        `${t("comp_faq_title_6_list_2")} ${t(
          "comp_faq_title_6_list_2_start"
        )} ${length} ${t("comp_faq_title_6_list_2_end")} ${data[0]} - ${
          data[1]
        }`,
        `${t("comp_faq_title_6_list_3")}`,
        `${t("comp_faq_title_6_list_4")}`,
      ],
      note: [
        `${t("note")}`,
        `${t("note_2")}${lastUpdate}`,
        `${t("while_we_strive")}`,
      ],
    },
    {
      title: `${t("comp_faq_title_7_start")} ${companyName} ${t(
        "comp_faq_title_7_end"
      )}`,
      text: `${t("comp_faq_text_7_start")} ${companyName} ${t(
        "comp_faq_text_7_end"
      )} ${t(status[0])}`,
    },
    {
      title: `${t("comp_faq_title_8_start")} ${ceos?.map(
        (item) => item.name
      )} ${t("comp_faq_title_8_end")} ${country}`,
      text: `${t("comp_faq_text_8_start")} ${ceos?.map(
        (item) => item.name
      )} ${t("comp_faq_text_8_middle")} countCompany ${t(
        "comp_faq_text_8_end"
      )} ${country} ${t("legislation")}`,
      note: [
        `${t("note")}`,
        `${t("note_2")}${lastUpdate}`,
        `${t("while_we_strive")}`,
      ],
    },
    {
      title: `${t("comp_faq_title_9_start")} ${companyName} ${t(
        "comp_faq_title_9_end"
      )} ${address}`,
      text: `${t("comp_faq_text_9_start")} ${companyName} ${t(
        "comp_faq_text_9_end"
      )} ${companyName}`,
    },
  ];
  return (
    <main className="bg-[#F8F9FB]">
      <div
        className="absolute w-0.5 h-0.5 top-0 left-0"
        onClick={() => {
          window.alert(
            "This site was developed by Andrew Lightgholt and David Beregoi"
          );
        }}
      />
      <div className="container grid grid-cols-12 gap-[20px] pt-[30px]">
        <div className="col-span-7 grid grid-cols-7 gap-[20px]">
          <div className="relative col-span-7 border border-gray-2 rounded-[12px] shadow-search">
            <div className="bg-white rounded-xl pb-[20px]">
              <div className="relative p-[10px]">
                {headerImageId ? (
                  <Image
                    src={`${process.env.API}/files/${headerImageId}`}
                    alt={""}
                    width="0"
                    height="0"
                    priority
                    sizes="100vw"
                    className={"w-full h-[140px] object-cover"}
                  />
                ) : (
                  <div className="w-full bg-[#EAEAEA] h-[140px] rounded-[10px] rounded-tr-[10px]" />
                )}
                <div className="absolute top-[54%] left-5">
                  {imageId ? (
                    <Image
                      src={`${process.env.API}/files/${imageId}`}
                      alt={""}
                      width="0"
                      height="0"
                      priority
                      sizes="100vw"
                      className={
                        "rounded-full border-[4px] w-[130px] h-[130px] border-white "
                      }
                    />
                  ) : (
                    <div
                      className={`text-[60px] w-[130px] h-[130px] rounded-full border-[4px] border-white bg-gray-2 flex justify-center items-center`}
                    >
                      {initials?.[0]}
                    </div>
                  )}
                  {verified && (
                    <div className="absolute bottom-1 right-1">
                      <VerifiedIcon size="lg" />
                    </div>
                  )}
                </div>
                {type && <CompanyType type={type} />}
              </div>
              <div className="px-[20px] mt-[78px] flex">
                <div className="flex flex-col flex-2">
                  <h1 className="text-[20px] text-[#37383A] font-bold">
                    {companyName}
                  </h1>
                  <div className="flex items-center mt-[12px] mb-[22px]">
                    <Flag
                      countryCode={
                        companyProfileQoobus?.company?.countryIsoCode ||
                        companyProfileQorporates?.countryCode ||
                        ""
                      }
                      size="md"
                    />
                    <p className="ml-[10px] text-[12px] font-[600] text-[#37383A] truncate">
                      {companyProfileQorporates?.address ||
                        (companyProfileQorporates?.registeringAuthority
                          ?.address &&
                          addressEditor(
                            companyProfileQorporates?.registeringAuthority
                              ?.address
                          )) ||
                        companyProfileQoobus?.company?.address ||
                        "-"}
                    </p>
                  </div>
                </div>
                <BlockRates scoreObject={score} />
              </div>
              <BlockEmpoyees
                employees={companyUsers}
                following={followersSize}
                followers={0}
                isCompany
              />
              <div className="mb-[25px] px-[20px] flex justify-end min-w-max">
                <SecondaryButton
                  // hasIcon раскоментировать для показа иконки
                  text={t("message")}
                  customStyle={"px-[24px] py-[2px] text-[12px]"}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setModalState(true);
                  }}
                />
                <PrimaryButton
                  text={t("follow")}
                  customStyle={"ml-[20px] px-[37px] text-[12px]"}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setModalState(true);
                  }}
                />
              </div>
              <div className="px-[20px]">
                <BlockOverview
                  phone={
                    phone || companyProfileQorporates?.finances?.phone! || ""
                  }
                  isPeople={false}
                  dataQorp={companyProfileQorporates}
                  dataQob={companyProfileQoobus}
                />
              </div>
              {companyProfileQoobus?.about && (
                <BlockAbout text={companyProfileQoobus?.about || "-"} />
              )}
              <BackButton />
            </div>
          </div>
          <SimilarCompanies similarCompanies={companiesKnow} />
          {countryCode !== "ua" && companyProfileQoobus && (
            <FinancialBlock
              financesData={
                companyProfileQorporates?.finances ||
                companyProfileQorporates?.taxes ||
                {}
              }
              countryCode={
                companyProfileQoobus?.company?.countryIsoCode ||
                companyProfileQorporates?.countryCode ||
                ""
              }
            />
          )}
          {/* <CompanyTransport /> */}
          {/* <LicensesBlock licenses={companyProfileQoobus?.licenses} /> */}
          <ActivityBlock
            vat={companyProfileQoobus?.paysVat || false}
            date={
              companyProfileQorporates?.fisc?.tvaRegistrationDate
                ? moment(
                    companyProfileQorporates?.fisc?.tvaRegistrationDate,
                    "DD/MM/YYYY"
                  ).format("DD.MM.YYYY")
                : null || companyProfileQoobus?.vatDate
                ? moment(companyProfileQoobus?.vatDate)
                    .utc()
                    .format("DD.MM.YYYY")
                : null || "-"
            }
            excises={companyProfileQoobus?.paysExcise || false}
            activityName={
              companyProfileQoobus?.activities?.find(
                (el) => el.type.name === "Primary"
              )?.providerName ||
              companyProfileQorporates?.activities?.[0]?.name ||
              companyProfileQorporates?.mainActivity?.name ||
              "-"
            }
          />
          {/* <InsolvenciesBlock /> */}
          {companyProfileQorporates?.founders && (
            <ExecutiveTeam
              founders={companyProfileQorporates?.founders || []}
              authorizedCapital={companyProfileQorporates?.authorizedCapital}
            />
          )}

          {companyProfileQorporates?.id && (
            <RelatedCompaniesByAddress
              address={
                companyProfileQorporates?.address ||
                companyProfileQoobus?.address ||
                "-"
              }
              relatedByAddress={relatedDataByAddress}
              companyName={
                String(companyProfileQorporates?.shortName) ||
                String(companyProfileQoobus?.name)
              }
            />
          )}
          {companyProfileQorporates?.id && (
            <RelatedCompaniesByFounders
              companyNumber={companyNumber}
              relatedByOfficers={relatedDataByOfficer || []}
            />
          )}
          {companyProfileQoobus &&
            Object.keys(companyProfileQoobus).length > 1 && <PostsAndNews />}
          {companyProfileQorporates?.lastUpdatedDate && (
            <LastUpdate
              countryCode={countryCode.toLocaleUpperCase()}
              data={companyProfileQorporates?.lastUpdatedDate}
            />
          )}
          <div className="col-span-7">
            <Faq faq={tmp} companyName={String(companyName)} />
          </div>
        </div>
        <div className="col-span-4">
          <StickyBox offsetTop={20} offsetBottom={100}>
            <Companies isProfile placeholder="search_on_qoobus" />
            <NewToQoobus />
            {/* {companyProfileQoobus?.id && (
              <ReviewBlock
                reviewDataTo={feedBackTo}
                reviewDataFrom={feedBackFrom}
                companyName={companyName ? companyName : ""}
              />
            )} */}

            {companyProfileQoobus?.id && (
              <RouteItems
                routes={routes}
                users={routesUsers}
                company={companyName ? companyName : ""}
              />
            )}
            <div className="mt-[25px]">
              <Footer array={arraySearch} styles="[&>*]:mr-0" />
              <div className="flex justify-between mt-7 pb-0">
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
          </StickyBox>
        </div>
      </div>
      <SearchFooter />
    </main>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({
  locale,
  params,
}: GetStaticPropsContext) {
  const countryCode: string =
    params?.countryCode! && Array.isArray(params.countryCode)
      ? params.countryCode[0]!
      : params?.countryCode!;
  const id: string =
    params?.slug! && Array.isArray(params.slug)
      ? params.slug[0]!
      : params?.slug!;
  const code = id?.split("-")?.pop()!;
  const companiesYouMayKnowCountries = nearbyCountries
    .filter((item: any) => item![countryCode]!)
    .map((el: any) => el[countryCode])
    .flat()
    .map((ell) => ell.country_code);

  const [qor, qoob, qoobId, companiesKnow] =
    /*feedBackTo, feedBackFrom */
    await Promise.all([
      Promise.resolve(
        SearchService.getCompanyProfileQorp(
          countryCode.toLocaleLowerCase(),
          code
            .toLocaleLowerCase()
            .replace(countryCode.toLocaleLowerCase(), "")
            .trim()
        )
      )
        .then(({ data }) => data)
        .catch(() => []),
      Promise.resolve(
        SearchService.getCompanyProfileQoob(
          countryCode,
          code?.split("-")?.pop()!
        )
      )
        .then(({ data }) => data)
        .catch(() => []),
      Promise.resolve(
        SearchService.getCompanyProfileQoobId(
          countryCode,
          code?.split("-")?.pop()!
        )
      )
        .then(({ data }) => data)
        .catch(() => []),
      Promise.resolve(
        SearchService.similiar(
          { countryIsoCodes: companiesYouMayKnowCountries },
          4
        )
      )
        .then((res) => res.data)
        .catch((err) => []),
      // Promise.resolve(SearchService.getFeedback("to", code, countryCode))
      //   .then((res) => res.data)
      //   .catch((err) => []),
      // Promise.resolve(SearchService.getFeedback("from", code, countryCode))
      //   .then((res) => res.data)
      //   .catch((err) => []),
    ]);
  const companyId = qoobId.id;

  const [routes, companyUsers] = await Promise.all([
    Promise.resolve(SearchService.getRoutes(companyId))
      .then((res) => res.data.slice(0, 4))
      .catch(() => []),
    Promise.resolve(SearchService.getUsersByCompanyId(companyId))
      .then((res) => res.data.slice(0, 3))
      .catch(() => []),
  ]);

  const usersIds = routes?.map((route: any) => route?.users).flat();

  const users = await Promise.resolve(SearchService.getUsers(usersIds || []))
    .then((res) => res.data)
    .catch(() => []);
  const relatedByAddress = qor
    ? qor?.relatedAddress?.results?.length &&
      qor.relatedAddress.results.filter(
        (el: CompanyInterface) =>
          el.companyNumber !== qor.corp.companyNumber &&
          (el.name || el.shortName)
      )
    : [];
  const relatedDataByOfficer =
    qor?.relatedByOfficer?.length &&
    qor.relatedByOfficer.filter((el: any) => {
      const results = el.results?.filter(
        (result: CompanyInterface) =>
          result.companyNumber !== qor.corp.companyNumber &&
          (result.name || result.shortName)
      );
      return (
        results.length && {
          results: results,
          name: el.name,
        }
      );
    });

  return {
    props: {
      companyProfileQorporates: qor?.corp || {},
      companyProfileQoobus: { id: companyId || null, ...qoob },
      companiesKnow: companiesKnow,
      // feedBackTo: feedBackTo || [],
      // feedBackFrom: feedBackFrom || [],
      companyUsers: companyUsers || [],
      routesUsers: users || [],
      routes: routes || [],
      relatedDataByAddress: relatedByAddress
        ? { results: relatedByAddress }
        : [],
      countryCode: countryCode,
      relatedDataByOfficer: relatedDataByOfficer || [],
      ...(await getServerSideTranslations(locale)),
    },
  };
}
