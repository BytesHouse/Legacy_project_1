import StatusField from "../StatusField/StatusField";
import { Overview } from "./OverviewFromArray";
import { useTranslation } from "next-i18next";
import StatusCompany from "../ui-kit/StatusCompany";

interface SimpleOverviewProps {
  data: Overview;
}

const SimpleOverview = ({ data }: SimpleOverviewProps) => {
  const { t } = useTranslation();
  const isVerified = data.text === "verified" ? true : false;

  return (
    <div className="grid grid-cols-12 mb-[8px]">
      <h3 className="col-span-4 font-[500]">{data?.title}</h3>
      {data.text ? (
        data.title === t("status_profile") ? (
          <div className="col-span-8">
            <StatusField status={String(data.text)} isVerified={isVerified} />
          </div>
        ) : data.title === t("status_juridic") ? (
          <StatusCompany isRelated status={String(data.text)} />
        ) : (
          <div className="col-span-8 font-[600]">{data?.text}</div>
        )
      ) : (
        <div className=" col-span-8 font-[600]">{"notAwailable"}</div>
      )}
    </div>
  );
};

export default SimpleOverview;
