import { GetServerSideProps, GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";

import SearchComponent from "../../../../components/Search/Search";
import SearchAsideBlock from "../../../../components/Search/components/SearchAsideBlock";
import SearchFooter from "../../../../components/Search/components/SearchFooter";
import { CustomsService } from "../../../../services/Customs.service";
import getServerSideTranslations from "../../../../utils/getServerSideTranslations";
import Faq from "../../../../components/Faq/Faq";
import { useTranslation } from "next-i18next";

const CustomsMap = dynamic(
  () => import("../../../../components/Search/CustomsVariants/CustomsMap")
);
interface SearchProps {
  countryCode: string;
  data: any;
  isMobile: boolean;
}
export default function Search({ countryCode, data, isMobile }: SearchProps) {
  const { t } = useTranslation();
  const country = t(`from_${countryCode}`);
  const { totalElements } = data;
  const faqCountry = [
    {
      title: `${t("country_faq_title_1")}`,
      text: `${t("country_faq_text_1")}`,
    },
    {
      title: `${t("country_faq_title_2")}`,
      text: `${t("country_faq_text_2")}`,
    },
    {
      title: `${t("country_faq_title_3")}`,
      text: [
        `${t("country_faq_text_3_1")}`,
        `${t("country_faq_text_3_2")}`,
        `${t("country_faq_text_3_3")}`,
        `${t("country_faq_text_3_4")}`,
        `${t("country_faq_text_3_5")}`,
      ],
    },
    {
      title: `${t("country_faq_title_4")}`,
      text: `${t("country_faq_text_4")}`,
    },
    {
      title: `${t("country_faq_title_5_start")} ${country} ${t(
        "country_faq_title_5_end"
      )}`,
      text: `${t("country_faq_text_5_start_ru")} ${country} ${t(
        "country_faq_text_5_start"
      )}  ${totalElements} ${t("country_faq_text_5_end")}`,
    },
  ];
  return (
    <>
      <main className="bg-white-1 pt-[30px] min-h-screen">
        <section className="container grid grid-cols-12 relative mb-[50px]">
          <SearchComponent
            variant="/search/customs"
            Child={() => (
              <CustomsMap
                countryCode={countryCode}
                data={data}
                isMobile={isMobile}
              />
            )}
          />
          <SearchAsideBlock />
        </section>
        <section className="container grid grid-cols-12 relative">
          <div className="col-span-9">
            <Faq companyName={"QCustoms"} faq={faqCountry} />
          </div>
        </section>
        <SearchFooter />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const isMobile = (
    ctx?.req! ? ctx.req.headers["user-agent"] : navigator.userAgent
  )?.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );
  const { locale } = ctx;
  const countryCode =
    ctx?.params?.countryCode! && Array.isArray(ctx.params.countryCode)
      ? ctx.params.countryCode[0]!
      : ctx?.params?.countryCode!;
  const query = ctx.query;
  const { data } = await CustomsService.getCustomByCountryQuery(
    countryCode,
    Number(query?.page) || 1
  );
  // const fullData = (await CustomsService.getCustomByCountry(countryCode)).data
  return {
    props: {
      countryCode: countryCode,
      isMobile: Boolean(isMobile),
      data: data || {},
      ...(await getServerSideTranslations(locale)),
    },
  };
};
