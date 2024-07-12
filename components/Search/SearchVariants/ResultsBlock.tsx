import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRecoilState } from "recoil";

import { UtilityService } from "../../../services/Utility.Service";
import { modalState, recent } from "../../../store/states";
import { boldStringQuery } from "../../../utils/boldStringQuery";
import { getInitials } from "../../../utils/getInitials";
import ViewMore from "../../CompanyProfileComponents/ViewMore";
import LoadTypeIconRender from "../../Icons/LoadTypeIconRender";
import Flag from "../../ui-kit/Flag";
import EmptySearch from "./EmptySearch";
import NoResults from "./NoResults";
import { RecentItem, RecentItemProps } from "./RecentItem";

export default function ResultsBlock({
  peoples,
  companies,
  input = "",
  isProfile = false,
  isLoading,
  onClick = () => {},
}: {
  companies: any[];
  peoples: any[];
  input?: string;
  isProfile?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}) {
  const { t } = useTranslation();
  const [recentState, setRecentState] = useRecoilState(recent);
  const [_, setModalState] = useRecoilState(modalState);

  return input?.length ? (
    !isLoading && input?.length && !peoples?.length && !companies?.length ? (
      <NoResults input={input} />
    ) : (
      <div
        className={`border border-gray-2 ${
          isProfile ? "rounded-xl" : "rounded-md"
        }`}
      >
        <div
          className={`bg-white w-full flex justify-between ${
            isProfile ? "rounded-t-xl" : "rounded-t-md"
          } px-5 py-2.5`}
        >
          <p className="text-[14px] font-semibold">{t("search_results")}</p>
          <Link
            className="text-c-blue hover:text-c-blue/70 text-xs font-medium"
            href="/archive"
          >
            {t("view_companies")}
          </Link>
        </div>
        {companies?.length ? (
          <>
            <p className="text-[14px] font-semibold bg-gray px-5 py-2.5">
              {t("companies")}
            </p>
            <div>
              {companies.map(
                (
                  {
                    countryIsoCode,
                    name,
                    shortName,
                    brandName,
                    address,
                    billingAddress,
                    id,
                    companyNumber,
                    forwarder,
                    carrier,
                    shipper,
                    imageId,
                    isPeople,
                  },
                  i
                ) => {
                  const displayName = name || shortName || brandName;

                  const initials = getInitials(displayName || "");

                  const type =
                    (shipper && "shipper") ||
                    (forwarder && "forwarder") ||
                    (carrier && "carrier") ||
                    "shipper";
                  const href = `/companies/${countryIsoCode.toLocaleLowerCase()}/${UtilityService.getSlugB2B(
                    {
                      name,
                      shortName,
                      brandName,
                      internationalNumber: companyNumber,
                    }
                  )}`;
                  return (
                    <Link
                      onClick={onClick}
                      href={href}
                      key={name + id + i}
                      className="px-5 py-4 text-xs2 hover:bg-gray cursor-pointer flex"
                    >
                      {imageId ? (
                        <Image
                          src={`${process.env.API}/files/${imageId}`}
                          alt={""}
                          width={40}
                          height={40}
                          className={"rounded-full border-[4px] border-white "}
                        />
                      ) : (
                        <div
                          className={`w-[40px] h-[40px] rounded-full border-[4px] border-white ${
                            isPeople ? "bg-purple text-white" : "bg-gray-2"
                          } flex justify-center items-center`}
                        >
                          {isPeople ? initials : initials[0]}
                        </div>
                      )}
                      <div className="flex flex-col gap-y-2 ml-5">
                        <LoadTypeIconRender type={type} />
                        <Flag size={"md"} countryCode={countryIsoCode} />
                      </div>
                      <div className="flex flex-col gap-y-2 ml-2.5">
                        <p
                          className="truncate max-w-[250px]"
                          dangerouslySetInnerHTML={{
                            __html: boldStringQuery(
                              displayName.toLocaleUpperCase(),
                              input?.toLocaleUpperCase()
                            ),
                          }}
                        />
                        <p className="truncate capitalize max-w-[250px] font-bold text-gray-3">
                          {address || billingAddress || "-"}
                        </p>
                      </div>
                    </Link>
                  );
                }
              )}
            </div>
          </>
        ) : null}
        {peoples?.length ? (
          <>
            <p className="text-[14px] font-semibold bg-gray px-5 py-2.5">
              {t("peoples")}
            </p>
            <div>
              {peoples.map(
                ({
                  position,
                  displayName,
                  id,
                  companyName,
                  imageId,
                  firstName,
                  lastName,
                }) => {
                  const name = displayName || `${firstName} ${lastName}`;
                  const initials = getInitials(name);
                  const href = `/users/${id}`;
                  return (
                    <Link
                      onClick={onClick}
                      href={href}
                      key={name + id}
                      className="px-5 py-4 text-xs2 hover:bg-gray cursor-pointer flex"
                    >
                      {imageId ? (
                        <Image
                          src={`${process.env.API}/files/${imageId}`}
                          alt={""}
                          width={40}
                          height={40}
                          className={"rounded-full border-[4px] border-white "}
                        />
                      ) : (
                        <div
                          className={`w-[40px] h-[40px] rounded-full text-white bg-purple border-[4px] border-white flex justify-center items-center`}
                        >
                          {initials}
                        </div>
                      )}
                      <div className="flex flex-col gap-y-2 ml-2.5">
                        <p
                          className="truncate max-w-[250px]"
                          dangerouslySetInnerHTML={{
                            __html: boldStringQuery(
                              name.toLocaleUpperCase(),
                              input?.toLocaleUpperCase()
                            ),
                          }}
                        />
                        <p className="truncate max-w-[250px] font-bold text-gray-3">
                          {position || "-"} | {companyName || "-"}
                        </p>
                      </div>
                    </Link>
                  );
                }
              )}
            </div>
          </>
        ) : null}
        <Link
          href={`/results?searchStr=${input}`}
          className="bg-gray-2 mt-auto"
        >
          <ViewMore isCallBack={false} />
        </Link>
      </div>
    )
  ) : recentState.length ? (
    <div
      className={`border border-gray-2  ${
        isProfile ? "rounded-xl" : "rounded-md"
      }`}
    >
      <div
        className={`w-full flex justify-between border-b bg-gray-fa border-gray-2 ${
          isProfile ? "rounded-t-xl" : "rounded-t-md"
        } px-5 py-2.5`}
      >
        <p className="text-[14px] font-semibold">{t("recent_search")}</p>
        <button
          className="text-c-blue hover:text-c-blue/70 text-xs font-medium"
          onClick={() => setRecentState([])}
        >
          {t("clear_recent")}
        </button>
      </div>
      <div className="flex flex-col">
        {recentState.slice(0, 6).map((el: RecentItemProps) => {
          const deleteSelf = (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            setRecentState(
              recentState.filter(
                (recent: RecentItemProps) => recent.href !== el.href
              )
            );
          };
          const props = { ...el, deleteSelf: deleteSelf, onClick };
          return <RecentItem key={el.href} {...props} />;
        })}
      </div>
      <ViewMore
        cb={(e: any) => {
          e.stopPropagation();
          e.preventDefault();
          setModalState(true);
        }}
        text={"advanced_search"}
        isCallBack={true}
      />
    </div>
  ) : (
    <EmptySearch />
  );
}
