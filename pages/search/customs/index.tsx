import dynamic from "next/dynamic";

import SearchComponent from "../../../components/Search/Search";
import SearchAsideBlock from "../../../components/Search/components/SearchAsideBlock";
import SearchFooter from "../../../components/Search/components/SearchFooter";
import { CustomsService } from "../../../services/Customs.service";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import getServerSideTranslations from "../../../utils/getServerSideTranslations";
import { useTranslation } from "next-i18next";
import Faq from "../../../components/Faq/Faq";

const Trends = dynamic(() => import("../../../components/Trends/Trends"));
const CustomsForArchive = dynamic(
  () => import("../../../components/Search/CustomsVariants/CustomsForArchive")
);

export interface CustomSearchInterface {
  countriesList: Record<string, number>;
}

export default function CustomSearch({ countriesList }: CustomSearchInterface) {
  const { t } = useTranslation();
  const faqArchive = [
    {
      title: `${t("archive_faq_title_1")}`,
      text: `${t("archive_faq_text_1_start")} customs total ${t(
        "archive_faq_text_1_end"
      )}`,
    },
    {
      title: `${t("archive_faq_title_2")}`,
      text: `${t("archive_faq_text_2")}`,
    },
    {
      title: `${t("archive_faq_title_3")}`,
      text: [
        `${t("archive_faq_text_3_1")}`,
        `${t("archive_faq_text_3_2")}`,
        `${t("archive_faq_text_3_3")}`,
        `${t("archive_faq_text_3_4")}`,
        `${t("archive_faq_text_3_5")}`,
      ],
    },
    {
      title: `${t("archive_faq_title_4")}`,
      text: `${t("archive_faq_text_4")}`,
    },
  ];
  return (
    <>
      <main className="bg-white-1 pt-[30px]">
        <section className="container grid grid-cols-12 relative">
          <div className="col-span-9">
            <SearchComponent
              variant="/search/customs"
              Child={() => <CustomsForArchive countriesList={countriesList} />}
            />
          </div>
          <SearchAsideBlock />
        </section>
        <section className="container grid grid-cols-12 mb-[62px]">
          <Trends />
        </section>
        <section className="container grid grid-cols-12 mb-[62px]">
          <div className="col-span-9">
            <Faq companyName={"QCustoms"} faq={faqArchive} />
          </div>
        </section>
        <SearchFooter />
      </main>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const { data } = await CustomsService.getCustomCountries();

  return {
    props: {
      countriesList: data || {},
      ...(await getServerSideTranslations(locale)),
    },
    revalidate: 1209600,
  };
}
