import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useRecoilState } from "recoil";
import { modalState } from "../../store/states";

const SuggestionBlock = dynamic(() => import("../Blocks/SuggestionsBlock"));

const SectionOne = () => {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);
  const { t } = useTranslation();
  return (
    <section className="mb-25 grid grid-cols-12 gap-x-5 select-none">
      <h3 className="col-span-full text-2xl font-bold mb-10 ">
        {t("main_about_1")}
      </h3>
      <p className="col-span-5 text-sm font-medium indent-3">
        {t("main_about_2")} {t("main_about_3")} {t("main_about_4")}
      </p>
      <p className="col-start-7 col-span-5 text-sm font-medium indent-3 mb-25">
        {t("main_about_5")}
      </p>
      <SuggestionBlock
        title={t("main_about_6")}
        secondaryText={`${t("main_about_7")} ${t("main_about_8")} `}
        link={{
          isLink: true,
          callback: (e: any) => {
            e.stopPropagation();
            setModalState(true);
          },
          text: t("create_account"),
        }}
      />
      <p className="mt-6.25 col-span-full indent-3 text-xs font-semibold text-c-gray">
        * {t("main_about_9")}
      </p>
    </section>
  );
};

export default SectionOne;
