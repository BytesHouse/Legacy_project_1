import Link from "next/link";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../../utils/hooks/useOutsideClick";

import ArrowrightIcon from "../../Icons/ArrowRightIcon";
import ItemMenu from "./ItemMenu";

interface FooterItemProps {
  arrItems?: Record<string, string>[]; //todo: make interface
  text: string;
  top?: boolean;
  href?: string;
  isLastIndex?: boolean;
}

export default function FooterItem({
  arrItems,
  text,
  top,
  href,
  isLastIndex,
}: FooterItemProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => closeDropdown());

  const openDropdown = () => {
    setShowMenu(true);
  };
  const closeDropdown = () => {
    setShowMenu(false);
  };

  const clr = top ? `text-white` : "text-pewter-gray";
  if (href) {
    return (
      <Link shallow={true} href={href}>
        <div className="flex items-center cursor-pointer relative">
          <span
            className={`mr-[12px] text-[12px] ${clr} ${
              top ? "hover:text-[#BABABA]" : "hover:text-[#000000]"
            } `}
          >
            {text}
          </span>{" "}
        </div>
      </Link>
    );
  }

  return (
    <div
      onClick={() => setShowMenu(!showMenu)}
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
      className={`flex items-center cursor-pointer relative`}
      ref={ref}
    >
      <span
        className={`mr-[12px] text-[12px]  ${
          showMenu
            ? top
              ? "hover:text-[#BABABA]"
              : "hover:text-[#000000]"
            : "text-pewter-gray"
        } ${clr}`}
      >
        {text}
      </span>{" "}
      <span
        className={`transition-all ${
          showMenu ? (top ? "rotate-90" : "-rotate-90") : ""
        }`}
      >
        {arrItems && (
          <ArrowrightIcon
            color={showMenu ? (top ? "#BABABA" : "#000000") : "#D3D4D5"}
          />
        )}
      </span>
      {showMenu && (
        <ItemMenu isLastIndex={isLastIndex} top={top} arrItems={arrItems} />
      )}
    </div>
  );
}
