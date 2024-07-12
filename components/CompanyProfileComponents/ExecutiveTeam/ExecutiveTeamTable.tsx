import { FounderInterface } from "../../../utils/getStatus";
import ExecutiveTeamTableItem from "./ExecutiveTeamTableItem";
import { getTableData } from "./helpers/getTableData";

interface ExecutiveTeamTableInterface {
  tableData: FounderInterface[];
  authorizedCapital?: string;
}

export default function ExecutiveTeamTable(props: ExecutiveTeamTableInterface) {
  const tableData = getTableData(props.tableData, props.authorizedCapital);

  const colours = [
    "#001B4C",
    "#BB120F",
    "#157BFA",
    "#FF5952",
    "#68B6F3",
    "#F5BDBB",
  ];

  return (
    <div className="grid grid-cols-12 col-span-full py-[15px] px-5 text-xs gap-y-3">
      {tableData.map((item: FounderInterface | FounderInterface, i) => {
        return (
          <ExecutiveTeamTableItem
            key={`${item?.fullName!}-${item?.name!}`}
            color={colours[i % colours.length]}
            item={item}
          />
        );
      })}
    </div>
  );
}
