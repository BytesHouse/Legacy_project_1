import Link from "next/link";
import { countries } from "../../assets/constants/countries";
import Faq from "../../components/Faq/Faq";
import FaqGreenBox from "../../components/Faq/FaqGreenBox";
import FaqItem from "../../components/Faq/FaqItem";
import Flag from "../../components/ui-kit/Flag";
import FooterAbout from "../../components/About/FooterAbout";
import HeaderAbout from "../../components/Header/HeaderAbout";
import Companies from "../../components/Search/SearchVariants/Companies";
import { CustomsService } from "../../services/Customs.service";
import { SearchService } from "../../services/Search.service";
import { faq } from "../../utils/constants/faq";
import { useTranslation } from "next-i18next";
import getServerSideTranslations from "../../utils/getServerSideTranslations";
import { GetStaticPropsContext } from "next";
import { CountryService } from "../../services/Countries.service";

interface CountriesSearchInterface {
  countriesList: Record<string, string>[];
}

export default function Archive({ countriesList }: CountriesSearchInterface) {
  const { t } = useTranslation();
  const counties = ["RU", "RO", "UA", "MD"];
  // const objToArr = (obj: any) => {
  //   if (!obj) return [];
  //   const arr = [];
  //   // if (counties.includes(item))
  //   // for (let item in obj) arr.push({ countryCode: item, count: obj[item] });
  //   // }
  //   return arr;
  // };
  // const countriesArr = objToArr(countriesList);
  const initial = 0;
  const countriesNumber = countriesList.reduce(
    (acc, curr) => (acc += Number(curr.count)),
    initial
  );

  const faqArchive = [
    {
      title: `${t("archive_faq_title_1_1")}`,
      text: `${t("archive_faq_text_1_1")}`,
    },
  ];

  return (
    <>
      <main className="bg-white-1 h-screen flex flex-col justify-between">
        <HeaderAbout />
        <div className="container">
          <p className="text-[#000000] text-[24px] font-bold mb-[15px]">
            {t("search")} {countriesNumber.toLocaleString()}{" "}
            {t("companies_from")} {countriesList.length} {t("countries")}
          </p>
          <p className="text-[12px] font-[600] mb-[25px]">{t("information")}</p>
          <div className="max-w-[530px] mb-[40px]">
            <Companies placeholder={t("search_on_comp")} />
          </div>
          <div>
            <div className="flex flex-wrap w-full gap-y-4 justify-between gap-x-5 mt-[25px] after:flex-auto after:content-[''] mb-[100px]">
              {countriesList?.map((country, i) => (
                <>
                  <Link
                    key={country.countryCode + i}
                    href={`archive/${country.countryCode.toLocaleLowerCase()}`}
                    className={`flex gap-2 items-center hover:border-hover-violet transition-all text-black-carbon bg-white p-2 rounded-md border border-label-gray`}
                  >
                    <Flag size="md" countryCode={country.countryCode} />
                    <p className="text-[13px] font-bold">
                      {t(country.countryCode.toLocaleLowerCase())}
                    </p>
                    <span className="bg-label-gray text-xxs px-1 py-0.5 rounded-[4px] font-bold">
                      {country.count.toLocaleString()}
                    </span>
                  </Link>
                </>
              ))}
            </div>
          </div>
          <Faq faq={faqArchive} />
        </div>
        <FooterAbout />
      </main>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const data = await CountryService.getCountries();
  return {
    props: {
      countriesList: data.data || {},
      ...(await getServerSideTranslations(locale)),
    },
    revalidate: 1209600,
  };
}
