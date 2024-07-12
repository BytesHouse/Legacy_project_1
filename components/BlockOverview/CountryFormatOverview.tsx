import Flag from "../ui-kit/Flag";
import { Overview } from "./OverviewFromArray";

interface CountryFormatOverviewProps {
  data: Overview;
}

const CountryFormatOverview = ({ data }: CountryFormatOverviewProps) => {
  const { text, title, isCountry } = data;
  const sText = Array.isArray(text) ? text[0] : text;
  return (
    <div className="grid grid-cols-12 mb-[8px]">
      <h3 className="col-span-3 font-[500]">{title}</h3>
      {sText ? (
        <div className="col-span-9 font-[600]">
          flag
          <Flag countryCode={data?.isCountry!} />
          {sText}
        </div>
      ) : (
        <div className=" col-span-9 font-[600]">{"notAvailable"}</div>
      )}
    </div>
  );
};

export default CountryFormatOverview;
