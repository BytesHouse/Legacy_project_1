import { ButtonProps } from "../interfaces/SnowButtonInterface.interface";

export default function PrimaryButton({
  text,
  onClick,
  search,
  customStyle,
}: ButtonProps) {
  return (
    <button
      className={`bg-purple text-white ${
        search ? "px-[27px] py-[7px]" : ""
      } rounded-[6px] hover:bg-[#7D4AD0] duration-300 ${customStyle}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
