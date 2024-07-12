import Link from "next/link";
import { useRecoilState } from "recoil";
import { modalState } from "../../../store/states";

export interface PhoneOverviewItemProps {
  el: string;
  text: string;
}

const EmailItem = ({ el, text }: PhoneOverviewItemProps) => {
  const [_, setModalState] = useRecoilState(modalState);
  const mail = text.split("").map((el: string, index: number) => {
    if (index > el.length / 2) {
      return "*";
    }
    return el;
  });
  return (
    <div className="flex">
      <button
        onClick={() => {
          setModalState;
        }}
      >
        <div className="break-all inline-block text-c-blue w-full hover:text-secondary-60 hover:underline cursor-pointer my-0.5">
          {mail}
        </div>
      </button>
    </div>
  );
};
export default EmailItem;
