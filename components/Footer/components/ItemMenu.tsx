import Link from "next/link";
import { useTranslation } from "next-i18next";

interface ItemMenuProps {
  arrItems?: Record<string, string>[];
  top?: boolean;
  isLastIndex?: boolean;
}

export default function ItemMenu({
  arrItems,
  top,
  isLastIndex,
}: ItemMenuProps) {
  const { t } = useTranslation();
  return (
    <div
      className={`absolute z-20 ${isLastIndex && !top ? "right-0" : "left-0"} ${
        top ? "top-[15px] pt-[15px]" : "bottom-[15px] pb-[15px]"
      }`}
    >
      <div className={`bg-white rounded-[10px] shadow-menu p-[10px]`}>
        <ul>
          {arrItems &&
            arrItems.map(({ text, href }) => (
              <li
                key={text}
                className="text-[12px] hover:bg-light-gray py-[10px] px-[20px] rounded-md "
              >
                <Link shallow={true} href={href}>
                  <p className="min-w-max">{t(text)}</p>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
