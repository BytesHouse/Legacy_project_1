import Link from "next/link";
import { useRecoilState } from "recoil";
import { modalState } from "../../../store/states";

export interface PhoneOverviewItemProps {
  el: string;
  text: string;
}

const PhoneItem = ({ el, text }: PhoneOverviewItemProps) => {
  const [_, setModalState] = useRecoilState(modalState);

  const phone = el
    .split("")
    .map((ell, index) => {
      if (index > el.length / 2) {
        return "*";
      }
      return ell;
    })
    .join("");
  return (
    <div>
      <div className="inline-block group ">
        <button
          onClick={(e: any) => {
            e.stopPropagation();
            setModalState(true);
          }}
        >
          <div className="inline-block text-c-blue hover:text-secondary-60 hover:underline cursor-pointer">
            {phone.replace(/[()\-]/g, "")}
          </div>
        </button>
      </div>
    </div>
  );
};
export default PhoneItem;
