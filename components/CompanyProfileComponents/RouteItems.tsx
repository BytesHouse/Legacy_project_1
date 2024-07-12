import { useRecoilState } from "recoil";
import { useTranslation } from "next-i18next";

import ArrowrightIcon from "../Icons/ArrowRightIcon";
import RouteItem from "./RouteItem";
import { RoutesInterface } from "../../interfaces/qobCompanyProfile/routes.interface";
import { RoutesUsersInterface } from "../../interfaces/qobCompanyProfile/Users.interface";
import NoRoutes from "../NoRoutes/NoRoutes";
import { modalState } from "../../store/states";
import ViewMore from "./ViewMore";

interface RouteItems {
  routes?: RoutesInterface[];
  users?: RoutesUsersInterface[];
  company: string;
}

export default function RouteItems({ routes, users, company }: RouteItems) {
  const [_, setModalState] = useRecoilState(modalState);
  const { t } = useTranslation();
  if (!routes?.length && !users?.length) {
    return (
      <div className="mt-5 bg-white border border-gray-2 rounded-[12px] shadow-search w-full text-sm ">
        <p className="text-[14px] w-full px-5 py-3 border-b border-gray-2 font-bold text-[#37383A]">
          {t("company_routes")}
        </p>
        <div className="px-5 py-4 flex flex-col gap-y-2.5">
          <NoRoutes company={company} text={t("has_no_routes")} />
        </div>
      </div>
    );
  }

  const routesWithUsers = routes?.map((route) => {
    const newUsers: RoutesUsersInterface[] = [];
    Object.values(users!)?.forEach((user) =>
      route.users.forEach((item) =>
        item === user.id ? newUsers.push(user) : null
      )
    );
    return { ...route, owners: newUsers };
  });

  return (
    <div className="mt-5 bg-white border border-gray-2 rounded-[12px] shadow-search w-full text-sm">
      <p className="w-full px-5 py-3 border-b border-gray-2">
        {t("company_routes")}
      </p>
      <div className="px-5 py-4 flex flex-col gap-y-2.5">
        {routesWithUsers?.map((route) => {
          return (
            <RouteItem
              key={route.loadingCountry + route.users + route.unLoadingCountry}
              route={route}
            />
          );
        })}
      </div>
      <ViewMore
        cb={(e: any) => {
          e.stopPropagation();
          setModalState(true);
        }}
        text={"view_all_routes"}
      />
    </div>
  );
}
