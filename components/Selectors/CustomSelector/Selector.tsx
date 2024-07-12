import { useRef, useState } from "react";
import { useOutsideClick } from "../../../utils/hooks/useOutsideClick";

import ArrowrightIcon from "../../Icons/ArrowRightIcon";
import SelectorItem from "./SelectorItem";
import ItemsArr from "./interfaces/ItemsArr.interface";
import { useTranslation } from 'next-i18next';

interface SelectorProps {
  arrItems: ItemsArr[];
  text: string;
  field: string;
  onClick?: (f: string, id: number) => void;
}

export default function Selector({ arrItems, text, onClick = () => { }, field }: SelectorProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => closeDropdown());
  const { t } = useTranslation()

  const openDropdown = () => {
    setShowMenu(true);
  };
  const closeDropdown = () => {
    setShowMenu(false);
  };

  return (
    <div
      onClick={() => setShowMenu(!showMenu)}
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
      className="flex items-center cursor-pointer relative mt-px"
      ref={ref}
    >
      <span
        className={`mr-[12px] text-[12px] text-black-txt`}
      >
        {t(text)}
      </span>{" "}
      <span
        className={`transition-all ${showMenu ? " rotate-90" : ""
          }`}
      >
        <ArrowrightIcon
          color={"#000000"}
        />
      </span>
      {showMenu && <SelectorItem arrItems={arrItems} onClick={onClick} current={text} field={field} />}
    </div>
  );
}
