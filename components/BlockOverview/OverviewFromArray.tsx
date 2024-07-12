import AdminOverview from "./AdminOverview";
import CountriesOverview from "./CountriesOverview";
import CountryFormatOverview from "./CountryFormatOverview";
import DataFormatOverview from "./DataFormatOverview";
import LinkOverview from "./LinkOverview";
import PhoneOverview from "./PhoneOverview";
import SimpleOverview from "./SimpleOverview";

export interface Overview {
  title: string;
  text: string | string[];
  link?: string | Record<string, string>[];
  phone?: boolean;
  isDate?: boolean;
  isCountry?: string;
  isCountries?: true;
}

interface OverviewFromArrProps {
  overviewArray: Overview[];
  admin?: any;
}
const OverviewFromArr = ({ overviewArray, admin }: OverviewFromArrProps) => {
  return (
    <>
      {overviewArray.map((el: Overview, i) => {
        if (el.text == "-") return;
        if (el.phone) {
          return <PhoneOverview key={el.title + i} data={el} />;
        }
        if (el.link) {
          return <LinkOverview key={el.title + i} data={el} />;
        }
        if (el.isDate) {
          return <DataFormatOverview key={el.title + i} data={el} />;
        }
        if (el.isCountries) {
          return <CountriesOverview key={el.title + i} data={el} />;
        }
        return <SimpleOverview key={el.title + i} data={el} />;
      })}
      {admin?.name && <AdminOverview name={admin.name} image={admin.image} />}
    </>
  );
};

export default OverviewFromArr;
