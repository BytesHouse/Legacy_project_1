import { useRouter } from "next/router";

import ChevronLeftIcon from "../Icons/ChevronLeftIcon";
import Link from "next/link";
import { useTranslation } from "next-i18next";

interface SearchComponentInterface {
  Child: () => JSX.Element;
  variant?: Variant;
}

enum RenderVariants {
  "/search" = "people_companies",
  "/search/routes" = "routes",
  "/search/customs" = "customs",
}

type Variant = keyof typeof RenderVariants;

export default function SearchComponent({
  Child,
  variant = "/search",
}: SearchComponentInterface) {
  const router = useRouter();
  const { t } = useTranslation();
  const variants: Array<Variant> = [
    "/search",
    "/search/routes",
    "/search/customs",
  ];

  return (
    <div className="border border-gray-2 rounded-[14px] col-span-9 bg-white relative">
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4">{t("search_on_qoobus")}</h1>
        <p className="text-[12px] font-[400]">{t("fing_freight")}</p>
      </div>
      <span
        className="flex items-center justify-center bg-gray-2 w-7 aspect-square rounded-full absolute -left-3.5 top-5 cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <ChevronLeftIcon />
      </span>
      <div className="px-5 mt-1 flex gap-10">
        {variants.map((variantEl, i) => {
          return (
            <Link key={variantEl + i} href={variantEl}>
              <div
                className={`cursor-pointer relative text-sm pb-2${
                  variantEl === variant ? " text-purple font-bold" : ""
                }`}
              >
                {t(RenderVariants[variantEl])}
                {variantEl === variant ? (
                  <span className="absolute top-full left-0 bg-purple h-[3px] rounded-full w-full" />
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="p-5 rounded-b-[14px] border-t border-gray-2 gap-6 w-full bg-[#F7F7F8] shadow-search">
        <Child />
      </div>
    </div>
  );
}
