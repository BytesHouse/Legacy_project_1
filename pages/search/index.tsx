import { GetStaticPropsContext } from "next";

import SearchComponent from "../../components/Search/Search";
import Companies from "../../components/Search/SearchVariants/Companies";
import SearchAsideBlock from "../../components/Search/components/SearchAsideBlock";
import SearchFooter from "../../components/Search/components/SearchFooter";
import Trends from "../../components/Trends/Trends";
import getServerSideTranslations from "../../utils/getServerSideTranslations";

export default function Search() {
  return (
    <>
      <main className="bg-white-1 pt-[30px]">
        <section className="container grid grid-cols-12 relative">
          <SearchComponent variant="/search" Child={() => <Companies />} />
          <SearchAsideBlock />
        </section>
        <section className="container grid grid-cols-12 mb-[62px]">
          <Trends />
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
