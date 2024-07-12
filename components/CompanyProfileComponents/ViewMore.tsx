import Link from "next/link";
import { useTranslation } from "next-i18next";

import ArrowrightIcon from "../Icons/ArrowRightIcon";
import { useRecoilState } from "recoil";
import { modalState } from "../../store/states";

enum Sizes {
  "xs" = "text-xs",
  "xs2" = "text-xs2",
  "sm" = "text-sm",
  "md" = "text-md",
  "lg" = "text-lg",
  "xl" = "text-xl",
}

enum Texts {
  "show_more",
  "show_less",
  "view_more",
  "view_all_reviews",
  "view_all_routes",
  "advanced_search",
}

interface ViewMoreInterface {
  size?: keyof typeof Sizes;
  cb?: (e?: any) => void;
  isCallBack?: boolean;
  text?: keyof typeof Texts;
}

export default function ViewMore({
  size = "xs2",
  cb,
  isCallBack = true,
  text = "view_more",
}: ViewMoreInterface) {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);
  const { t } = useTranslation();

  const onClick = (e: any) => {
    if (!isCallBack) {
      return (e: any) => {};
    }
    if (!cb && isCallBack) {
      return (e: any) => {
        e.stopPropagation();
        setModalState(true);
      };
    }
    e.stopPropagation();
    return cb?.(e);
  };

  return (
    <button
      onClick={onClick}
      className={
        "p-3 w-full flex justify-center text-center border-t bg-gray-fa transition-all hover:opacity-80 border-gray-2 rounded-b-2xl items-center gap-x-2.5 " +
        Sizes[size]
      }
    >
      {t(text)}
      <span className="mt-px">
        <ArrowrightIcon color={"currentColor"} />
      </span>
    </button>
  );
}
