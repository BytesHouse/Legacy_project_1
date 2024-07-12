import { mock } from "../mock";
import ExecutiveTeamTable from "./ExecutiveTeamTable";
import ExecutiveTeamTableTitle from "./ExecutiveTeamTableTitle";
import { useState } from "react";
import ViewMore from "../ViewMore";
import BlockTitle from "../BlockTitle";
import { FounderInterface } from "../../../utils/getStatus";

interface ExecutiveTeamProps {
  founders: FounderInterface[];
  authorizedCapital?: string;
}

export default function ExecutiveTeam({
  founders,
  authorizedCapital,
}: ExecutiveTeamProps) {
  const [showCount, setShowCount] = useState(4);
  return (
    <div className="col-span-7 bg-white border border-gray-2 rounded-[12px] shadow-search w-full text-sm">
      <BlockTitle text={"executive_team"} />
      <div className="px-5 py-[15px] text-blue-black text-sm capitalize">
        <div className="grid grid-cols-10 border border-gray-2 rounded-lg ">
          <ExecutiveTeamTableTitle />
          <ExecutiveTeamTable
            tableData={
              founders.length > 4 ? founders.slice(0, showCount) : founders
            }
            authorizedCapital={authorizedCapital}
          />
        </div>
      </div>
      {founders.length > 4 &&
        (showCount < founders.length ? (
          <ViewMore
            text={"show_more"}
            cb={() => {
              setShowCount((prev) => (prev += 4));
            }}
          />
        ) : (
          <ViewMore
            text={"show_less"}
            cb={() => {
              setShowCount(4);
            }}
          />
        ))}
    </div>
  );
}
