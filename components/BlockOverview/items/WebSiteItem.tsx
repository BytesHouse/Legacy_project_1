import Link from "next/link";
import { useRecoilState } from "recoil";
import { modalState } from "../../../store/states";

export interface PhoneOverviewItemProps {
  el: string;
  text: string;
}

const WebsiteItem = ({ el, text }: PhoneOverviewItemProps) => {
  const [_, setModalState] = useRecoilState(modalState);
  return (
    <div>
      <div className="inline-block group">
        <button
          onClick={(e: any) => {
            e.stopPropagation();
            setModalState(true);
          }}
        >
          <div className="inline-block text-secondary-50 hover:text-secondary-60 hover:underline cursor-pointer">
            {el}
          </div>
        </button>
      </div>
    </div>
  );
};
export default WebsiteItem;
