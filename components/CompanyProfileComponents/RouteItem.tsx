import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";

import Flag from "../ui-kit/Flag";
import LoadTypeIconRender from "../Icons/LoadTypeIconRender";
import { RoutesUsersInterface } from "../../interfaces/qobCompanyProfile/Users.interface";
import { getInitials } from "../../utils/getInitials";
import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../store/states";

interface Route {
  loadingCountry: string;
  transport: boolean;
  truckTypes: string[];
  unLoadingCountry: string;
  owners: RoutesUsersInterface[];
}
interface RouteItemInterface {
  route: Route;
}

export default function RouteItem({ route }: RouteItemInterface) {
  const [_, setModalState] = useRecoilState(modalState);

  const remainingUsers = route.owners.length - 1;
  const { t } = useTranslation();
  const type = (route.transport && "transport") || "load";
  const title = t(type);
  return (
    // here link maybe
    <button
      onClick={(e: any) => {
        e.stopPropagation();
        setModalState(true);
      }}
      className="flex p-2.5 border border-gray-2 hover:border-blue-400 cursor-pointer transition-all rounded-lg gap-x-[15px]"
    >
      <div
        className={`w-[35px] relative flex text-[8px] leading-[10px] items-center${
          remainingUsers > 0 ? "" : " justify-center"
        }`}
      >
        <div className="bg-gray-2 h-4 w-4 rounded-full flex items-center justify-center relative">
          {route.owners.slice(0, 1).map((owner) => {
            const { imageId, displayName } = owner;
            return (
              <React.Fragment key={displayName + imageId}>
                {imageId ? (
                  <Image
                    src={`${process.env.API}/files/${imageId}`}
                    alt={"alt"}
                    width={20}
                    height={20}
                    className={"rounded-full"}
                  />
                ) : (
                  <div
                    className={`text-[10px] min-w-[20px] h-[20px] rounded-full border-white bg-purple text-white flex justify-center items-center`}
                  >
                    {displayName ? getInitials(displayName) : "-"}
                  </div>
                )}
              </React.Fragment>
            );
          })}
          {remainingUsers > 0 && (
            <div className={`absolute left-3 -top-1`}>
              <div
                className={`text-[10px] min-w-[24px] h-[24px] rounded-full border-[4px] border-white bg-gray-2 flex justify-center items-center`}
              >
                +{remainingUsers}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-x-1.5">
        <Flag
          size="md"
          countryCode={route.loadingCountry.toLocaleUpperCase()}
        />
        <p className="text-xxs font-bold w-4">
          {route.loadingCountry.toLocaleUpperCase()}
        </p>
      </div>
      <div className="my-auto">
        <Image
          alt={"line Throught Routes"}
          src={"/assets/images/lineRoutesThrought.svg"}
          width={35}
          height={5}
        />
      </div>

      <div className="flex items-center gap-x-1.5">
        <Flag
          size="md"
          countryCode={route.unLoadingCountry.toLocaleUpperCase()}
        />
        <p className="text-xxs font-bold w-4">
          {route.unLoadingCountry.toLocaleUpperCase()}
        </p>
      </div>
      <div className="ml-auto flex w-25">
        <LoadTypeIconRender type={type} title={title} />
      </div>
    </button>
  );
}
