import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

const Buttons = dynamic(() => import("./components/Buttons"));

const SectionThree = () => {
  const { t } = useTranslation();
  return (
    <section className="my-25 grid grid-cols-12 gap-x-5 select-none">
      <div className="col-span-5 my-auto">
        <p className="mb-4 text-c-gray text-xs">{t("main_about_17")}</p>
        <h4 className="text-2xl font-bold mb-10">{t("main_about_18")}</h4>
        <p className="indent-3 text-c-gray text-sm mb-5">
          {t("main_about_19")}{" "}
          <span className="text-[#000000] font-[700]">
            9 {t("c_countries")}.
          </span>
        </p>
        <p className="indent-3 text-c-gray text-sm">{t("main_about_20")}</p>
      </div>
      <div className="col-span-6 col-start-7 z-10">
        <Buttons />
      </div>
    </section>
  );
};

export default SectionThree;
