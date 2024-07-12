import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Footer from "../Footer/Footer";
import LocaleSwitch from "../LocaleSwitch/LocaleSwitch";
import RoundedButton from "../ui-kit/RoundedButton";

export default function FooterAbout() {
  const { locale, locales, asPath: currentPath } = useRouter();
  const { t } = useTranslation();
  return (
    <footer className="bg-white h-[90px]">
      <div className="container h-full">
        <div className="h-full flex justify-between items-center">
          <div>
            <RoundedButton text={t("back")} />
          </div>
          <div className="flex justify-between">
            <Link
              shallow={true}
              href="/"
              className="text-xs text-pewter-gray hover:text-[#000000] mr-[25px] leading-[1.4rem]"
            >
              {t("home")}
            </Link>
            <Footer />
            <LocaleSwitch
              locale={locale}
              locales={locales}
              currentPath={currentPath}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
