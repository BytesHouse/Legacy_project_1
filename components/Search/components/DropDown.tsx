import { countries } from "../../../assets/constants/countries";
import Flag from "../../ui-kit/Flag";

interface DropDownProps {
  arr: any[];
  onClick: any;
}

const DropDown = ({ arr, onClick }: DropDownProps) => {
  const checArr = arr.length ? true : false;
  return (
    <ul
      className={`absolute z-10 bg-white rounded-[4px]  top-11 w-full max-h-[320px] left-0 overflow-y-scroll scrollbar-hide ${
        checArr ? "border border-gray-2" : ""
      }`}
    >
      {arr.map((item, i) => {
        return (
          <div
            className="hover:bg-gray flex items-center gap-[10px] p-2 cursor-pointer"
            key={item + i}
            onClick={() => onClick(item)}
          >
            <Flag countryCode={item.country_code} size="md" />
            {countries[item.country_code]}, {item.country_code}
          </div>
        );
      })}
    </ul>
  );
};
export default DropDown;
