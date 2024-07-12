import MessageIcon from "../Icons/MessageIcon";
import { ButtonProps } from "../interfaces/SnowButtonInterface.interface";

export default function SecondaryButton({
  text,
  onClick,
  search,
  customStyle,
  hasIcon,
}: ButtonProps) {
  return (
    <button
      className={`bg-white text-purple hover:text-purple/80 ${
        search ? "px-[27px] py-[9px]" : ""
      } border border-purple hover:border-purple/80  rounded-[6px] ${customStyle} duration-300 ${
        hasIcon ? "flex gap-2 items-center" : ""
      }`}
      onClick={onClick}
    >
      {hasIcon && <MessageIcon />}
      {text}
    </button>
  );
}
