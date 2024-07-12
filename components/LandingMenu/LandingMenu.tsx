import { useRouter } from "next/router";
import React from "react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { getCurrentYear } from "../../utils/getCurrentYear";
import { useTranslation } from "next-i18next";

// const Logo = dynamic(() => import("../Logo"));
const PrimaryButton = dynamic(() => import("../ui-kit/PrimaryButton"));
const SecondaryButton = dynamic(() => import("../ui-kit/SecondaryButton"));
const InputNavigate = dynamic(() => import("../ui-kit/InputNavigate"));
const LogoAndText = dynamic(() => import("../ui-kit/LogoAndText"));
const Footer = dynamic(() => import("../Footer/Footer"));
const LocaleSwitch = dynamic(() => import("../LocaleSwitch/LocaleSwitch"));

export default function LandingMenu() {
  const router = useRouter();
  const { locale, locales, asPath: currentPath } = useRouter();
  const { t } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <div className="float-right h-screen px-[30px] py-[25px] ">
      <div className="flex flex-col h-full bg-white w-full sm:w-[480px] rounded-[14px] p-[50px] shadow-land relative">
        <div className="flex items-center mb-[60px]">
          <LogoAndText />
        </div>
        <InputNavigate />
        <div className="max-w-[320px] mx-auto my-auto pb-10 ">
          <div className="mb-[75px]">
            <h1 className="text-center font-bold text-[24px] mb-[18px] tracking-[0.8px]">
              {t("welcome")} {t("business_network")}
            </h1>
            <p className="text-pewter-gray text-center text-[12px]">
              {t("join_today")}
            </p>
          </div>
          <div className="flex flex-col items-center my-auto">
            <PrimaryButton
              customStyle={"text-[14px] w-[252px] py-[10px]"}
              text={t("login")}
              onClick={() => router.push("https://qoobus.com/auth")}
            />
            <p className="my-[25px] text-[12px] font-[600]">
              {t("have_account")}
            </p>
            <SecondaryButton
              customStyle={"mb-[25px] text-[14px] w-[252px] py-[10px]"}
              text={t("register_on_qoobus")}
              onClick={() => router.push("https://qoobus.com/register")}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Footer />
          <div className="flex justify-between items-center text-pewter-gray mt-6">
            <LocaleSwitch
              locale={locale}
              locales={locales}
              currentPath={currentPath}
              isMenuOpen={isMenuOpen}
            />
            <p className="text-[12px]">
              {getCurrentYear()} © Qoobus Corporation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
