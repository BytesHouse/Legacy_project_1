import moment from "moment";
import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";

import BlockOverviewUsers from "../../components/BlockOverview/BlockOverviewUsers";
import BlockInfo from "../../components/Blocks/BlockInfo";
import PostsAndNews from "../../components/CompanyProfileComponents/PostsNews/PostsAndNews";
import RouteItems from "../../components/CompanyProfileComponents/RouteItems";
import NewToQoobus from "../../components/NewToQoobus/NewToQoobus";
import ResultsAsideBlock from "../../components/ResultsComponents/ResultsAsideBlock";
import SearchFooter from "../../components/Search/components/SearchFooter";
import CompanyItem from "../../components/SimilarCompanies/CompanyItem";
import BackButton from "../../components/ui-kit/BackButton";
import PrimaryButton from "../../components/ui-kit/PrimaryButton";
import SecondaryButton from "../../components/ui-kit/SecondaryButton";
import { UserProfile } from "../../interfaces/UserProfile/UserProfile.interface";
import { RoutesUsersInterface } from "../../interfaces/qobCompanyProfile/Users.interface";
import { RoutesInterface } from "../../interfaces/qobCompanyProfile/routes.interface";
import { SearchService } from "../../services/Search.service";
import { getInitials } from "../../utils/getInitials";
import getServerSideTranslations from "../../utils/getServerSideTranslations";
import Link from "next/link";
import { UtilityService } from "../../services/Utility.Service";
import { useRecoilState } from "recoil";
import { modalState, recent } from "../../store/states";
import Companies from "../../components/Search/SearchVariants/Companies";
import { useEffect } from "react";
import { RecentItemProps } from "../../components/Search/SearchVariants/RecentItem";
import { RandomPeople } from "../../components/interfaces/RandomPeople.interface";

interface ProfileProps {
  userProfile: UserProfile;
  random: RandomPeople[];
  routesUsers: RoutesUsersInterface[];
  routes: RoutesInterface[];
}

export default function Profile({
  userProfile,
  random,
  routesUsers,
  routes,
}: ProfileProps) {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);
  const [recentState, setRecentState] = useRecoilState(recent);

  const {
    displayName,
    headerImageId,
    imageId,
    lastCheckinStamp,
    position,
    company,
    followersSize,
    connectionsSize,
  } = userProfile;
  const router = useRouter();
  const { locale } = router;
  moment.locale(locale);
  const { t } = useTranslation();
  const initials = getInitials(displayName);
  const companyLink = `/companies/${company.countryIsoCode.toLocaleLowerCase()}/${UtilityService.getSlugB2B(
    {
      name: company.name,
      shortName: company.shortName,
      brandName: company.displayName,
      internationalNumber: company.companyNumber,
    }
  )}`;
  // const isOnline = moment.now() - Number(moment(lastCheckinStamp)) < 300_000;

  useEffect(() => {
    setRecentState([
      {
        name: displayName,
        initials,
        imageId,
        href: router.asPath,
        isUser: true,
      },
      ...recentState.filter((el: RecentItemProps) => el.href !== router.asPath),
    ]);
  }, [userProfile]);

  return (
    <main className="bg-[#F8F9FB]">
      <div className="container grid grid-cols-12 gap-[20px] pt-[30px]">
        <div className="col-span-7 grid grid-cols-7 gap-[20px]">
          <div className="relative col-span-7 border border-gray-2 rounded-[12px] shadow-search">
            <div className="bg-white rounded-xl pb-[20px]">
              <div className="relative p-[10px]">
                {company.headerImageId ? (
                  <Image
                    src={`${process.env.API}/files/${company.headerImageId}`}
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
                        "rounded-full w-[130px] h-[130px] border-[4px] border-white "
                      }
                    />
                  ) : (
                    <div
                      className={`text-[52px] w-[130px] h-[130px] rounded-full border-[4px] border-white bg-purple text-white flex justify-center items-center`}
                    >
                      {initials}
                    </div>
                  )}
                </div>
              </div>
              <div className="px-[20px] mt-[70px] flex">
                <div className="flex items-center flex-1">
                  <h1 className="text-[20px] text-[#37383A] font-bold flex-1">
                    {displayName}
                  </h1>
                  <div className="flex justify-end">
                    <SecondaryButton
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
                </div>
              </div>
              <div className="px-[20px] my-[15px]">
                {position} |{" "}
                <Link
                  className="text-c-blue hover:underline hover:text-c-blue/70"
                  href={companyLink}
                >
                  {company.displayName}
                </Link>
              </div>
              <BlockInfo
                folowers={String(followersSize)}
                folowing={String(connectionsSize)}
                address={company.address}
                countryCode={company.countryIsoCode}
              />
              <div className="px-[20px] my-[15px]">
                <BlockOverviewUsers
                  phone={userProfile.phone}
                  data={userProfile}
                  isPeople={true}
                />
              </div>
              <BackButton />
            </div>
          </div>
          <PostsAndNews />
        </div>
        <div className="col-span-4 relative">
          <div className="sticky left-0 top-5 w-[386px]">
            <Companies isProfile placeholder="search_on_qoobus" />
            <NewToQoobus />
            <div className="mt-5 shadow-search">
              <CompanyItem
                headerImageId={company.headerImageId}
                imageId={company.imageId}
                role={""}
                company={company.displayName}
                link={companyLink}
                address={company.address}
                countryIsoCode={company.countryIsoCode}
                lastCheckinStamp={company.lastCheckinStamp}
                name={company.displayName}
                isAside={true}
                isSingle
              />
            </div>
            <RouteItems
              routes={routes}
              users={routesUsers}
              company={company.displayName}
            />
            <div className="mt-5">
              <ResultsAsideBlock randomPeoples={random} isUserPage={true} />
            </div>
          </div>
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
  const userId: string =
    params?.slug! && Array.isArray(params.slug)
      ? params.slug[0]!
      : params?.slug!;

  const userProfile = (await SearchService.getUserProfile(Number(userId))).data;
  const random = (await SearchService.random("", 4)).data;

  const routes = await Promise.resolve(
    SearchService.getRoutes(userProfile.company.id)
  )
    .then((res) => res.data.slice(0, 4))
    .catch((err) => []);

  const usersIds = routes?.map((route: any) => route?.users).flat();

  const users = await Promise.resolve(SearchService.getUsers(usersIds || []))
    .then((res) => res.data)
    .catch((err) => []);

  return {
    props: {
      userProfile: userProfile,
      random: random,
      routes: routes,
      routesUsers: users,
      ...(await getServerSideTranslations(locale)),
    },
  };
}
