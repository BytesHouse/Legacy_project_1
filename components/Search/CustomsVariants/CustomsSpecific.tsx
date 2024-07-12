// eslint-disable-next-line react-hooks/exhaustive-deps
import router from "next/router";
import React, { useEffect, useState } from "react";
import { countries } from "../../../utils/constants/countries";
import CustomsSpecificItem from "./components/CustomsSpecificItem";
import moment from "moment";
import dynamic from "next/dynamic";
import CustomsInput from "./CustomsInput";
import CustomsSpecificLinkItem from "./components/CustomsSpecificLinkItem";
import CameraCustom from "../../CameraCustom/CameraCustom.Component";
import CustomsSpecificRolesItem from "./components/CustomSpecificRolesItem";
import NoCamera from "./components/NoCamera";
import { useTranslation } from "react-i18next";
import { CustomsService } from "../../../services/Customs.service";
import { CustomsLatLongInterface } from "./CustomsInterface.interface";
import { UtilityService } from "../../../services/Utility.Service";
import { useRecoilState } from "recoil";
import { recentCustoms } from "../../../store/states";

const MarkerCustom = dynamic(
  () => import("../../MarkerCustom/MarkerCustom.Component"),
  { ssr: false }
);
const MapComponent = dynamic(() => import("../../Map/Map.Component"), {
  ssr: false,
});
interface CustomsSpecificInterface {
  data: any;
  countryCode?: string;
}

export default function CustomsSpecific({
  data,
  countryCode = "",
}: CustomsSpecificInterface) {
  const [recentCustomsArr, setRecentCustoms] = useRecoilState(recentCustoms);
  const customs = data[0];
  const { vidoo, exitCamera, enterCamera, videoSource } = customs;

  const { t } = useTranslation();
  const [markers, setMarkers] = useState<any[]>([]);
  const { lat, lng } = customs;
  const getAllMarkers = async () => {
    const newMarkersData = await CustomsService.getCustomByCountry(countryCode);
    onMarkers(newMarkersData.data);
  };
  function openCustom(el: any) {
    router.push(
      `/search/customs/${countryCode}/${UtilityService.getSlugCustom(el)}`
    );
  }
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
    const mainMarker = React.memo(function () {
      return <MarkerCustom isMain item={customs} position={[lat, lng]} />;
    });
    setMarkers([...markers, mainMarker]);
  }
  const officeRoles = customs.officeRoles && JSON.parse(customs.officeRoles);
  useEffect(() => {
    getAllMarkers();
    setRecentCustoms([
      data[0],
      ...recentCustomsArr
        .filter((el: any) => data?.[0]?.id !== el?.id)
        .slice(0, 10),
    ]);
  }, []);

  return (
    <>
      <CustomsInput />
      <div className="flex flex-col mt-6 text-black-txt">
        <h2 className="text-2xl font-bold">
          {customs.name || customs.nameAddress}
        </h2>
        <p className="text-[12px] font-[400] mt-4">
          ID: {customs.customId || customs.providerId}
        </p>
        <p className="text-[12px] font-[400] mt-6 text-pewter-gray">
          {t("online_monitoring")}: {moment().format("MMMM Do YYYY - h:mm a")}
        </p>
        <span className="bg-gray-2 h-px my-6" />
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-6">
            <p>{t("entry_traffic")}</p>
            <div className="aspect-video w-full bg-[#E9E9E9] rounded-sm mt-6">
              {enterCamera && vidoo ? (
                <CameraCustom
                  source={enterCamera}
                  video={vidoo}
                  type={videoSource}
                />
              ) : (
                <NoCamera />
              )}
            </div>
          </div>
          <div className="col-span-6">
            <p>{t("exit_traffic")}</p>
            <div className="aspect-video w-full bg-[#E9E9E9] rounded-sm mt-6">
              {exitCamera && vidoo ? (
                <CameraCustom
                  source={exitCamera}
                  video={vidoo}
                  type={videoSource}
                />
              ) : (
                <NoCamera />
              )}
            </div>
          </div>
        </div>
        <div className="h-[430px] w-full flex bg-label-gray rounded-[14px] border border-gray-2 mt-5 relative overflow-hidden">
          <MapComponent zoom={8} lat={lat} lng={lng} customMarkers={markers} />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-2.5">
          <CustomsSpecificItem
            title={t("work_time")}
            data={customs.hours && JSON.parse(customs.hours)}
          />
          <CustomsSpecificItem
            title={t("address")}
            data={`${countries[customs.addressCountry]} ${
              customs.addressLocality ? customs.addressLocality : ""
            }`}
          />
          <CustomsSpecificItem
            title={t("street_address")}
            data={customs.streetAddres}
          />
          <CustomsSpecificLinkItem
            type={"mail"}
            title={t("email")}
            data={customs.email}
          />
          <CustomsSpecificItem
            title={t("postal_code")}
            data={customs.postalCode}
          />
          <CustomsSpecificLinkItem
            type={"fax"}
            title={t("fax")}
            data={customs.fax}
            countryCode={countryCode}
          />
          <CustomsSpecificLinkItem
            type={"tel"}
            countryCode={countryCode}
            title={t("contact_details")}
            data={
              customs.phones &&
              JSON.parse(customs.phones).map((el: any) => el.phone)
            }
          />
          <CustomsSpecificRolesItem
            title={t("office_roles")}
            data={officeRoles}
          />
        </div>
      </div>
    </>
  );
}
