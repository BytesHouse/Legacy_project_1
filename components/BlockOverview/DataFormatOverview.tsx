import { Overview } from "./OverviewFromArray";
import moment from "moment";

interface DataFormatOverviewProps {
  data: Overview;
}

const DataFormatOverview = ({ data }: DataFormatOverviewProps) => {
  const { text, title } = data;
  const sText = Array.isArray(text) ? text[0] : text;
  const month = new Date(Number(sText)).getMonth();
  const day = new Date(Number(sText)).getDate();
  const year = new Date(Number(sText)).getFullYear();
  const date =
    sText.length === 4
      ? sText
      : (day ? (Number(day) < 10 ? "0" + day : day) + "/" : "") +
        (month ? (Number(month) < 10 ? "0" + month : month + "/") : "") +
        "/" +
        year;
  const selectedDate = !Number.isNaN(year) ? date : sText;
  return (
    <div className="grid grid-cols-12 mb-[8px]">
      <h3 className="col-span-4 font-[500]">{title}</h3>
      {sText !== "-" ? (
        <div className="col-span-8 font-[600]">
          {selectedDate} (
          {selectedDate &&
            moment(
              selectedDate,
              selectedDate.length === 4 ? "yyyy" : "dd/mm/yyyy"
            )?.fromNow()}
          )
        </div>
      ) : (
        <div className="col-span-8 font-[600]">-</div>
      )}
    </div>
  );
};

export default DataFormatOverview;
