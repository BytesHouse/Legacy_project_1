import DropDown from "./DropDown";
import SkajiKudaTebeNado from "../../Icons/SkajiGdeTiNahodishsea";
import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import Flag from "../../ui-kit/Flag";
import { useOutsideClick } from "../../../utils/hooks/useOutsideClick";

interface RoutesInput {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  results: never[] | any[];
  handleClick: (item: any) => void;
  placeholder: string;
  color: string;
  focusState: [boolean, Dispatch<SetStateAction<boolean>>];
  country?: string;
}

const RoutesInput = ({
  onChange,
  value,
  results,
  handleClick,
  placeholder,
  focusState,
  color,
  country,
}: RoutesInput) => {
  const ref = useRef(null);

  const closeDropdown = () => {
    setIsFocus(false);
  };

  useOutsideClick(ref, () => closeDropdown());

  const [isFocus, setIsFocus] = focusState;
  return (
    <div
      ref={ref}
      onFocus={() => {
        setIsFocus(true);
      }}
      className={`bg-white w-full flex items-center border border-gray-2 rounded-md px-3 transition-all hover:border-purple relative focus-within:!border-black-focus`}
    >
      {country ? (
        <Flag countryCode={country} size="md" />
      ) : (
        <SkajiKudaTebeNado color={color} />
      )}
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-2 my-auto outline-none text-sm rounded-md"
        onChange={onChange}
        value={value}
      />
      {isFocus && <DropDown arr={results} onClick={handleClick} />}
    </div>
  );
};

export default RoutesInput;
