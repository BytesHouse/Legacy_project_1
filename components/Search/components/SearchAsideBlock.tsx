import { useRouter } from "next/router";
import { getCurrentYear } from "../../../utils/getCurrentYear";
import Footer from "../../Footer/Footer";
import LocaleSwitch from "../../LocaleSwitch/LocaleSwitch";
import NewToQoobus from "../../NewToQoobus/NewToQoobus";
import { arraySearch } from "../../../utils/constants/arrayMenuItems";

export default function SearchAsideBlock() {
  const router = useRouter();
  const { locale, locales, asPath: currentPath } = router;
  return (
    <aside className="flex flex-col gap-6 absolute -right-8 col-span-3">
      <NewToQoobus />
      <div>
        <Footer array={arraySearch} styles="[&>*]:mr-0" />
        <div className="flex justify-between mt-7 pb-0">
          <LocaleSwitch
            locale={locale}
            locales={locales}
            currentPath={currentPath}
          />
          <p className="text-[12px] text-[#87949E]">
            {getCurrentYear()} © Qoobus Corporation
          </p>
        </div>
      </div>
    </aside>
  );
}
