import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import moment from "moment";
import { useTranslation } from "next-i18next";

import SearchAsideBlock from "../../../../components/Search/components/SearchAsideBlock";
import SearchFooter from "../../../../components/Search/components/SearchFooter";
import SearchComponent from "../../../../components/Search/Search";
import { CustomsService } from "../../../../services/Customs.service";
import CustomsSpecific from "../../../../components/Search/CustomsVariants/CustomsSpecific";
import getServerSideTranslations from "../../../../utils/getServerSideTranslations";
import Faq from "../../../../components/Faq/Faq";
import { getFaqCustoms } from "../../../../utils/getFaqCustoms";

export default function Search({
  customs,
  countryCode,
}: {
  customs: any;
  countryCode: string;
}) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  moment.locale(locale);

  const { nameAddress, customId, hours, vidoo, email, phones } = customs[0];
  const faqCustoms = getFaqCustoms({
    title_1: t("custom_faq_title_1"),
    nameAddress,
    text_1: t("custom_faq_text_1"),
    customId,
    title_2: t("custom_faq_title_2"),
    text_2: t("custom_faq_text_2"),
    hours,
    title_3: t("custom_faq_title_3"),
    vidoo,
    text_3: t("custom_faq_text_3"),
    no_data_3: t("custom_faq_3_no_data"),
    title_4: t("custom_faq_title_4"),
    text_4: t("custom_faq_text_4"),
    no_data_4: t("custom_faq_4_no_data"),
    title_5: t("custom_faq_title_5"),
    text_5: t("custom_faq_text_5"),
    email,
    phones,
  });
  return (
    <>
      <main className="bg-white-1 pt-[30px] min-h-screen">
        <section className="container grid grid-cols-12 relative mb-[72px] ">
          <SearchComponent
            variant="/search/customs"
            Child={() => (
              <CustomsSpecific countryCode={countryCode} data={customs} />
            )}
          />
          <SearchAsideBlock />
        </section>
        <section className="container grid grid-cols-12 relative mb-[72px]">
          <div className="col-span-9">
            <Faq faq={faqCustoms} />
          </div>
        </section>
        <SearchFooter />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const { locale } = ctx;
  const countryCode: string =
    ctx?.params?.countryCode! && Array.isArray(ctx.params.countryCode)
      ? ctx.params.countryCode[0]!
      : ctx?.params?.countryCode!;
  const id: string =
    ctx?.params?.slug! && Array.isArray(ctx.params.slug)
      ? ctx.params.slug[0]!
      : ctx?.params?.slug!;
  const code = id?.match(/-__-(.*)$/)?.[1]!;
  const { data } = await CustomsService.getCustomById(code);

  return {
    props: {
      customs: data || {},
      countryCode: countryCode || "",
      ...(await getServerSideTranslations(locale)),
    },
    revalidate: 1209600,
  };
}
