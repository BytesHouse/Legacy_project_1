import { useRef } from "react";
import { useTranslation } from "react-i18next";

interface TooltipProps {
  childNodeNumber?: number;
  menu?: boolean;
}

export const Tooltip = ({ childNodeNumber, menu }: TooltipProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const cheker = childNodeNumber
    ? ref.current?.parentElement?.childNodes[childNodeNumber]?.textContent
    : ref.current?.parentElement?.firstChild?.textContent;
  const text =
    cheker === t("in_liquidation") ? t("in_liquidation_hint") : cheker;
  return (
    <div
      ref={ref}
      className="absolute w-max invisible group-hover:visible z-[9999] transform -top-1 -translate-y-full hidden lg:block"
    >
      <div
        className={`text-[12px] ${
          menu ? "max-w-402" : ""
        }  text-black px-2 py-1 bg-white rounded-md font-medium capitalize border-gray-2 shadow-lg`}
      >
        {text}
        {/* <div className="border-t-black absolute bottom-0 left-1/4 transform translate-y-full -translate-x-1/2 border-4 border-transparent" /> */}
      </div>
    </div>
  );
};
