import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import router, { useRouter } from "next/router";

import { countries } from "../../../assets/constants/countries";
import Selector from "../../Selectors/CustomSelector/Selector";
import CheckIcon from "../../Icons/CheckIcon";
import { UtilityService } from "../../../services/Utility.Service";
import { CUSTOM_COUNTRIES } from "../../../utils/constants/Customs.Constant";
import { CustomsLatLongInterface } from "./CustomsInterface.interface";
import CustomsInput from "./CustomsInput";
import { PaginationComponent } from "../../ui-kit/Pagination";
import { CustomsService } from "../../../services/Customs.service";
import { useTranslation } from "next-i18next";

const CustomListItem = dynamic(() => import("./components/CustomListItem"));
const MarkerCustom = dynamic(
  () => import("../../MarkerCustom/MarkerCustom.Component"),
  { ssr: false }
);
const MapComponent = dynamic(() => import("../../Map/Map.Component"), {
  ssr: false,
});

const typeList = [
  { text: "all" },
  { text: "automobile" },
  { text: "air" },
  { text: "river" },
  { text: "railway" },
  { text: "pedestrian" },
];
interface CustomsMapProps {
  countryCode: string;
  data: any;
  isMobile: boolean;
}
export default function CustomsMap({
  countryCode,
  data,
  isMobile,
}: CustomsMapProps) {
  const { numberOfElements, totalElements, size } = data;
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(0);
  const [markers, setMarkers] = useState<any[]>([]);
  const [withCamera, setWithCamera] = useState(false);
  const selectState: Record<string, Dispatch<SetStateAction<number>>> = {
    type: setType,
  };
  const { t } = useTranslation();
  const { query } = useRouter();
  const positionCountry =
    countryCode &&
    CUSTOM_COUNTRIES.find((el) => el.iso === countryCode.toUpperCase());

  const { lat, lng } = positionCountry || {};
  const onClick = (state: string, id: number) => {
    const setState = selectState[state];
    return setState(id);
  };
  const getAllMarkers = async () => {
    const newMarkersData = await CustomsService.getCustomByCountry(countryCode);
    onMarkers(newMarkersData.data);
  };
  useEffect(() => {
    if (!loading && !isMobile) {
      getAllMarkers();
    }
  }, [loading]);
  useEffect(() => {
    if (!isMobile) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [data]);

  function onMarkers(data: CustomsLatLongInterface[]) {
    const filtered = data
      ?.filter((el) => el.lat && el.lng)
      .map((item) => [item.lat, item.lng, item]);
    const markers = filtered.map(([lat, lng, item], index) =>
      React.memo(function () {
        return (
          <MarkerCustom
            item={item}
            position={[lat, lng]}
            open={openCustom}
            key={index.toString()}
          />
        );
      })
    );

    setMarkers(markers);
  }

  function openCustom(el: any) {
    router.push(
      `/search/customs/${countryCode}/${UtilityService.getSlugCustom(el)}`
    );
  }

  const arrayItems = [
    {
      field: "traffic_type",
      fieldState: "type",
      text: typeList[type].text,
      items: typeList,
    },
  ];

  return (
    <>
      <CustomsInput />
      <div className="mt-6">
        <h2 className="text-2xl text-black-txt font-bold">{t("custom_map")}</h2>
        <div className="flex text-xs font-medium mt-6">
          <Link shallow={true} className="text-pewter-gray mr-1" href="/search">
            {t("customs")}
          </Link>{" "}
          /{" "}
          <Link
            shallow={true}
            className="text-pewter-gray mx-1"
            href="/search/customs"
          >
            {t("archive")}
          </Link>{" "}
          /{" "}
          <Link
            shallow={true}
            className="ml-1 text-black-carbon"
            href={`/search/customs/${countryCode}`}
          >
            {t(countryCode.toLocaleLowerCase())}
          </Link>
        </div>
        <div className="flex gap-5 mt-3 text-black-txt">
          {arrayItems.map(({ field, fieldState, text, items }, i) => (
            <div key={field + i} className="flex items-center">
              <p className="text-xs mr-2">{t(field)}:</p>
              <Selector
                key={text}
                text={text}
                arrItems={items}
                field={fieldState}
                onClick={onClick}
              />
            </div>
          ))}
          <div
            onClick={() => {
              setWithCamera(!withCamera);
            }}
            className="ml-auto flex items-center p-1"
          >
            <div className="relative border border-gray-light-bord rounded-[4px] w-[14px] h-[14px] cursor-pointer bg-white">
              {withCamera ? (
                <span className="absolute left-px top-0">
                  <CheckIcon />
                </span>
              ) : null}
            </div>
            <p className="font-semibold ml-3 text-xs">{t("with_camera")}</p>
          </div>
        </div>
        <div className="max-sm:hidden h-[430px] w-full bg-label-gray rounded-[14px] border border-gray-2 mt-5 relative overflow-hidden">
          {!loading && !isMobile && (
            <MapComponent
              zoom={6}
              lat={lat}
              lng={lng}
              customMarkers={markers}
            />
          )}
        </div>
        <div className="w-full mt-6 border border-gray-2 [&>*]:border-gray-2 rounded-lg text-blue-black">
          <div
            className={`grid grid-cols-12 w-full px-5 py-2.5 text-[12px] font-[400] leading-[15px]`}
          >
            <div className="col-span-7">{t("custom_name")}</div>
            <div className="col-span-3">{t("custom_type")}</div>
            <div className="col-span-2">{t("custom_id")}</div>
          </div>
          {data.content.map((ctm: any) => {
            const categories = ctm.categories
              ? JSON.parse(ctm.categories)
              : null;
            const type = Array.isArray(categories) ? categories[0] : null;
            const id = ctm.customId || ctm.providerId;
            return (
              <CustomListItem
                key={id}
                countryCode={countryCode}
                title={ctm.name || ctm.nameAddress}
                type={type}
                id={id}
              />
            );
          })}
          <div className="col-span-full flex justify-between items-center px-5 border-t">
            <p className="text-xs text-[#686B6F] font-[400] py-2.5">
              {t("showing")} {numberOfElements} {t("results_of")}{" "}
              {totalElements}
            </p>
            <PaginationComponent
              currentPage={query.page ? Number(query.page) : 1}
              totalCount={totalElements}
              pageSize={size}
              query={{ page: query.page || 1 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
