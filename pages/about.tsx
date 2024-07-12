import dynamic from "next/dynamic";
import FooterAbout from "../components/About/FooterAbout";
import { GetStaticPropsContext } from "next";
import getServerSideTranslations from "../utils/getServerSideTranslations";
import { useTranslation } from "next-i18next";
import { useRecoilState } from "recoil";
import { modalState } from "../store/states";

const SectionOne = dynamic(() => import("../components/About/SectionOne"));
const SectionTwo = dynamic(() => import("../components/About/SectionTwo"));
const SectionThree = dynamic(() => import("../components/About/SectionThree"));
const SuggestionBlock = dynamic(
  () => import("../components/Blocks/SuggestionsBlock")
);
const HeaderAbout = dynamic(() => import("../components/Header/HeaderAbout"));

export const About = () => {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);
  const { t } = useTranslation();
  return (
    <section className="bg-white-1">
      <HeaderAbout />
      <main className="container py-25">
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SuggestionBlock
          title={t("main_about_21")}
          link={{
            isLink: true,
            callback: (e: any) => {
              e.stopPropagation();
              setModalState(true);
            },
            text: t("create_account"),
          }}
        />
      </main>
      <FooterAbout />
    </section>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await getServerSideTranslations(locale)),
    },
  };
}

export default About;
