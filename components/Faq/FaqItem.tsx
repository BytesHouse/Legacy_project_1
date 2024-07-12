import { boldStringQuery } from "../../utils/boldStringQuery";
import { FaqItemProps } from "../interfaces/FaqItem.interface";
import FaqGreenBox from "./FaqGreenBox";

export default function FaqItem({
  title,
  text,
  companyName = "",
  note,
  last,
}: FaqItemProps) {
  return (
    <div
      className={`p-[25px]  ${last ? "" : "border-b border-gray-2"}
      `}
    >
      <h3
        className="mb-[25px] text-[18px] font-[600]"
        dangerouslySetInnerHTML={{
          __html: boldStringQuery(title, companyName, "text-purple"),
        }}
      />
      {typeof text === "string" ? (
        <p
          className="text-[13px] font-[400] text-[#686B6F]"
          dangerouslySetInnerHTML={{
            __html: boldStringQuery(text, companyName, "text-purple"),
          }}
        />
      ) : (
        <ol className="list-decimal	text-[13px] font-[400] text-[#686B6F] px-[13px]">
          {text.map((item, i) => {
            return <li key={item}>{item}</li>;
          })}
        </ol>
      )}
      {note ? (
        <FaqGreenBox>
          {note.map((item, i) => {
            return (
              <p key={item} className="text-[13px] font-[400] text-[#686B6F]">
                {item}
              </p>
            );
          })}
        </FaqGreenBox>
      ) : null}
    </div>
  );
}
