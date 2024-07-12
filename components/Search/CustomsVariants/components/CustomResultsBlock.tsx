import Link from "next/link";
import { useTranslation } from "next-i18next";

import Flag from "../../../ui-kit/Flag";
import EmptySearch from "./EmptySearch";
import NoResults from "../../SearchVariants/NoResults";
import { UtilityService } from "../../../../services/Utility.Service";
import { useRecoilState, useRecoilValue } from "recoil";
import { recentCustoms } from "../../../../store/states";
import { CrossIcon } from "../../../Icons/CrossIcon";

interface Custom {
  addressCountry: string;
  customId: string;
  id: string;
  name: string;
  nameAddress: string;
  providerId: string;
  trafficTypes: string[];
  translatedName: string;
}

interface CustomResultsBlockProps {
  data: Custom[];
  input?: string;
}

export default function CustomResultsBlock({
  data,
  input = "",
}: CustomResultsBlockProps) {
  const [recentCustomsArr, setRecentCustoms] = useRecoilState(recentCustoms);
  return input.length ? (
    !data.length ? (
      <NoResults input={input} />
    ) : (
      <Results data={data} />
    )
  ) : recentCustomsArr.length ? (
    <Results data={recentCustomsArr} setRecentState={setRecentCustoms} />
  ) : (
    <EmptySearch />
  );
}

const Results = ({ data, setRecentState }: any) => {
  const { t } = useTranslation();
  const deleteSelf = (id: number) => {
    setRecentState(
      data?.filter((el: any) => {
        return el.id !== id;
      })
    );
  };
  return (
    <>
      <div
        className={`bg-white w-full flex justify-between rounded-t-md border-b border-gray-2 px-5 py-2.5`}
      >
        <p className="text-[14px] font-semibold">{t("search_results")}</p>
        {setRecentState && (
          <button
            className="text-c-blue hover:text-c-blue/70 text-xs font-medium"
            onClick={() => setRecentState([])}
          >
            {t("clear_recent")}
          </button>
        )}
      </div>
      {data?.length ? (
        <>
          <div>
            {data?.slice(0, 5).map((item: any, i: number) => {
              const {
                name,
                id,
                nameAddress,
                addressCountry,
                addressLocality,
                streetAddres,
                translatedName,
                providerId,
                customId,
              } = item;

              const customName = name || translatedName;
              const idCustom = customId || providerId;
              return (
                <div
                  key={name + id + i}
                  className="px-3 py-3 text-xs2 hover:bg-gray rounded-b-xl cursor-pointer flex w-full"
                >
                  <Link
                    href={`/search/customs/${addressCountry.toLocaleLowerCase()}/${UtilityService.getSlugCustom(
                      {
                        name: name,
                        nameAddress: nameAddress,
                        customId: idCustom.toLocaleUpperCase(),
                      }
                    )}`}
                    prefetch
                    className="flex w-full"
                  >
                    <div className="flex flex-col gap-y-2 pr-3 ml-2.5 w-full">
                      <div className="truncate max-w-[250px] flex items-center gap-x-2.5">
                        <Flag countryCode={addressCountry} size="md" />
                        <p className="mt-1 ">
                          {customName?.toLocaleUpperCase() || "-"}
                        </p>
                      </div>
                      <p className="w-full truncate text-sm font-normal flex gap-x-1.5">
                        {t("address")}:
                        <p className="w-full truncate font-bold">
                          {(addressCountry
                            ? t(addressCountry.toLocaleLowerCase()) + ", "
                            : "") +
                            (addressLocality ? addressLocality + ", " : "") +
                            (streetAddres ? streetAddres + ", " : "") || "-"}
                        </p>
                      </p>
                    </div>
                  </Link>
                  <button
                    className="ml-auto z-10 p-5 text-pewter-gray hover:opacity-70"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      deleteSelf(id);
                    }}
                  >
                    <CrossIcon />
                  </button>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </>
  );
};
