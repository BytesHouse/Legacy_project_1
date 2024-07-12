import Link from "next/link";
import { Overview } from "../OverviewFromArray";
import { isArray } from "lodash";
import { useRecoilState } from "recoil";
import { modalState } from "../../../store/states";

interface PhoneOverviewProps {
  data: Overview;
}
function DefaultItem({ data }: PhoneOverviewProps) {
  const [_, setModalState] = useRecoilState(modalState);
  const phone = isArray(data.text)
    ? data?.text[0]
        .split("")
        .map((el: string, index: number) => {
          if (index > el.length / 2) {
            return "*";
          }
          return el;
        })
        .join("")
    : data?.text.split("").map((el: string, index: number) => {
        if (index > data.text.length / 2) {
          return "*";
        }
        return el;
      });
  const classes = `font-[600]${
    phone !== "-" ? " text-c-blue hover:text-c-blue/70" : ""
  } w-max hover:text-secondary-60 hover:underline cursor-pointer text-14-20 md:text-16-22 xs:col-span-2`;
  return (
    <div className="group">
      <button
        onClick={(e: any) => {
          e.stopPropagation();
          setModalState(true);
        }}
      >
        <div className={classes}>{phone}</div>
      </button>
    </div>
  );
}
export default DefaultItem;
