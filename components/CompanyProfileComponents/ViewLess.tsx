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

interface ViewMoreInterface {
  size?: keyof typeof Sizes;
  cb?: () => void;
}

export default function ViewLess({ size = "xs2", cb }: ViewMoreInterface) {
  const [_isModalOpen, setModalState] = useRecoilState(modalState);

  const { t } = useTranslation();
  const onClick = (e: any) => {
    if (!cb) {
      return (e: any) => {
        e.stopPropagation();
        setModalState(true);
      };
    }
    e.preventDefault();
    return cb();
  };
  return (
    <button
      onClick={onClick}
      className={
        "p-3 flex w-full justify-center border-t border-gray-2 items-center gap-x-2.5 " +
        Sizes[size]
      }
    >
      {t("view_more")}
      <ArrowrightIcon color={"currentColor"} />
    </button>
  );
}
