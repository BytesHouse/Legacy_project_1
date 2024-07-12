import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { arrayHeader, arrayItems } from "../../utils/constants/arrayMenuItems";

import Footer from "../Footer/Footer";
import LocaleSwitch from "../LocaleSwitch/LocaleSwitch";
import LogoAndText from "../ui-kit/LogoAndText";
import PrimaryButton from "../ui-kit/PrimaryButton";
import SecondaryButton from "../ui-kit/SecondaryButton";
import AboutBlock from "./AboutBlock";
import RoutBlock from "./RoutBlock";
import { useRecoilState } from "recoil";
import { modalState } from "../../store/states";

interface HeaderAbout {
  countryCode?: string;
}

export default function HeaderAbout({ countryCode }: HeaderAbout) {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);
  const router = useRouter();
  const { locale, locales, asPath: currentPath } = router;
  const isSearch = currentPath === "/about";
  const { t } = useTranslation();

  return (
    <div className="w-full h-[245px] bg-purple">
      <div className="container">
        <header className="flex justify-between items-center py-[28px] border-b border-[#ffffff34] border-opacity-50 mb-[43px]">
          <LogoAndText color="#ffffff" />
          <Footer array={arrayHeader} top />
          <div className="flex justify-between items-center [&>button]:mr-[15px]">
            <PrimaryButton
              text={t("register")}
              customStyle={"text-[12px] border px-[35px] py-[5px]"}
              onClick={(e: any) => {
                e.stopPropagation();
                setModalState(true);
              }}
            />
            <SecondaryButton
              text={t("login")}
              customStyle={"text-[12px] px-[35px] py-[5px]"}
              onClick={(e: any) => {
                e.stopPropagation();
                setModalState(true);
              }}
            />
            <LocaleSwitch
              locale={locale}
              locales={locales}
              currentPath={currentPath}
              top
            />
          </div>
        </header>
        {isSearch ? (
          <AboutBlock />
        ) : (
          <RoutBlock countryCode={countryCode} text={currentPath} href={""} />
        )}
      </div>
    </div>
  );
}
