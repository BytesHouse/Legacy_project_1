import debounce from "lodash/debounce";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import useHover from "react-use-hover";
import ArrowrightIcon from "../Icons/ArrowRightIcon";
import {
  LocaleData,
  LocaleSwitchProps,
} from "../interfaces/LocaleSwith.interface";

import { useTranslation } from "next-i18next";

const localesMap: Record<string, LocaleData> = {
  en: {
    name: "English",
  },
  ro: {
    name: "Română",
  },
  ru: {
    name: "Русский",
  },
  ua: {
    name: "Українська",
  },
  cz: {
    name: "Česky",
  },
};

const icon: Record<string, string> = {
  en: "GB",
  ro: "RO",
  ru: "RU",
  ua: "UA",
  cz: "CZ",
};

export default function LocaleSwitch({
  locales,
  currentPath,
  isMenuOpen,
  isAuthPage,
  top,
}: LocaleSwitchProps) {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { pathname, asPath, query, locale } = router;

  const defaultLocale = locale === "default" ? "en" : locale;
  const [isHovering, hoverProps] = useHover({
    mouseEnterDelayMS: 0,
    mouseLeaveDelayMS: 150,
  });

  const setFocusFalse = () => {
    setFocus(false);
  };

  const debouncedChangeHandler = useCallback(debounce(setFocusFalse, 2000), []);

  const [isFocus, setFocus] = useState<boolean>(false);
  const hoveredLocale = `text-[12px] absolute z-30 ${
    top ? "top-[25px]" : "bottom-[25px]"
  } border border-gray w-[205px] ${
    top ? "right-0" : "left-0"
  }  bg-white p-[10px] rounded-md w-36 3xl:w-40 shadow-menu`;
  const mobileLocale = "grid grid-flow-col bg-none border-none pt-5 lg:hidden";

  const hoverSectionClassName = isMenuOpen ? mobileLocale : hoveredLocale;

  const filteredLocales = locales?.filter((loc) => loc !== "default");
  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng, () => {
      router.push({ pathname, query }, asPath, {
        locale: lng,
        shallow: true,
      });
    });
  };
  return (
    <div {...hoverProps} className="relative">
      <div
        className={`flex group h-full `}
        onKeyPress={() => setFocus(true)}
        role={"button"}
        tabIndex={0}
      >
        <span
          role="img"
          aria-label={`flag of ${defaultLocale} country`}
          className={`fflag fflag-${
            icon[defaultLocale!]
          } ff-sixteen ff-round cursor-pointer ${
            top ? "" : "mr-2"
          }  border-2 border-white`}
        />

        {!top && (
          <>
            <p className="text-[12px] leading-[1.35rem] mr-2 text-[#87949E]">
              {localesMap[defaultLocale!].name}
            </p>
            <div className="cursor-pointer my-auto ml-1.25 transition-all transform group-hover:-rotate-90 ">
              <ArrowrightIcon />
            </div>
          </>
        )}
      </div>

      {(isHovering || isFocus || isMenuOpen) && (
        <ul className={hoverSectionClassName}>
          {filteredLocales?.map((loc) => (
            <li
              tabIndex={0}
              onClick={async () => {
                changeLang(loc);
                setFocus(false);
              }}
              onFocus={() => setFocus(true)}
              onBlur={() => debouncedChangeHandler()}
              key={loc}
            >
              <div
                className={`py-2 px-2 mx-auto rounded-[6px] md:px-5 md:flex hover:bg-light-gray ${
                  loc === defaultLocale ? "font-bold" : ""
                } ${isAuthPage ? "px-5 flex" : ""}`}
              >
                <span
                  className={`fflag fflag-${icon[loc]} ff-sixteen ff-round cursor-pointer`}
                />
                <span
                  className={`cursor-pointer text-[#87949E] pl-3.5 ${
                    isAuthPage ? "block" : "hidden md:block"
                  }`}
                >
                  {localesMap[loc].name}
                </span>
                <span
                  className={`cursor-pointer pl-2.5 my-auto ${
                    isAuthPage ? "hidden" : "md:hidden "
                  }`}
                >
                  {loc.toUpperCase()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
