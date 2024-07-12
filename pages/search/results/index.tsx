import { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import SearchAsideBlock from "../../../components/Search/components/SearchAsideBlock";
import SearchFooter from "../../../components/Search/components/SearchFooter";
import SearchComponent from "../../../components/Search/Search";
import BackButton from "../../../components/ui-kit/BackButton";
import Flag from "../../../components/ui-kit/Flag";
import YaytsoLineykoy from "../../../components/YaytsoLineykoy/YaytsoLineykoy";
import { COUNTRIES_COORDINAT } from "../../../utils/constants/Countries.Constant";
import { CUSTOM_COUNTRIES } from "../../../utils/constants/Customs.Constant";
import getServerSideTranslations from "../../../utils/getServerSideTranslations";
import { countries } from "../../../assets/constants/countries";

const MapResult = dynamic(
  () => import("../../../components/MapResult/MapResult"),
  {
    ssr: false,
  }
);

interface Results {
  countryCode: string;
}

export default function Results({ countryCode }: Results) {
  const router = useRouter();
  const { query } = router;
  const { load, unload } = query;
  const loadString = String(load);
  const unloadString = String(unload);
  const positionCountryLoad = COUNTRIES_COORDINAT.find(
    (el) => el.country_code === loadString?.toUpperCase()
  );

  const positionCountryUnload = COUNTRIES_COORDINAT.find(
    (el) => el.country_code === unloadString?.toUpperCase()
  );

  const { latitude: loadLat, longitude: loadLng } = positionCountryLoad || {};
  const { latitude: unloadLat, longitude: unloadLng } =
    positionCountryUnload || {};
  const { t } = useTranslation();

  return (
    <>
      <main className="bg-white-1 pt-[30px]">
        <section className="container grid grid-cols-12 relative">
          <div className="border border-gray-2 rounded-[14px] col-span-9 bg-white relative">
            <div className="p-[24px] border-b border-gray-2">
              <BackButton />
              <div className="flex items-center gap-[20px] ">
                <div>
                  <Flag countryCode={String(load)} />{" "}
                  {`${countries[loadString]} (${loadString}) `}
                </div>{" "}
                <YaytsoLineykoy />
                <div>
                  <Flag countryCode={String(unload)} />{" "}
                  {`${countries[unloadString]} (${unloadString})`}
                </div>
                <div className="py-[5px] px-[7px] bg-gray-2 rounded-xl">
                  {256}
                </div>
              </div>
            </div>
            <div className="bg-[#F7F7F8] relative z-10 h-[110px] rounded-b-xl p-[25px]">
              <div className="flex px-[23px] xl:gap-[135px]"></div>
              <div className="flex px-[23px] xl:gap-[135px]">
                <div>
                  <h4>{t("available_transport_companies")}</h4>
                  <h5 className="text-[32px] font-semibold">{148}</h5>
                </div>
                <div>
                  <h4>{t("available_load_companies")}</h4>
                  <h5 className="text-[32px] font-semibold">{98}</h5>
                </div>
              </div>
            </div>
            <div className="max-sm:hidden h-[720px] w-full bg-label-gray rounded-[14px] border border-gray-2 -mt-5 relative overflow-hidden z-0">
              {load && unload && (
                <MapResult
                  zoom={6}
                  lat={loadLat}
                  lng={loadLng}
                  heatPoints={undefined}
                  heatType={undefined}
                  placeOfLoading={String(load)}
                  placeOfUnloading={String(unload)}
                />
              )}
            </div>
          </div>
          <SearchAsideBlock />
        </section>

        <SearchFooter />
      </main>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await getServerSideTranslations(locale)),
    },
  };
}
