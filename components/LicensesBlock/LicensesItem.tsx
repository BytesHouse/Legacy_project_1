interface LicensesItemProps {
  type?: string;
  number?: string;
  order?: number;
}

export default function LicensesItem({
  type,
  number,
  order,
}: LicensesItemProps) {
  return (
    <li className="grid grid-cols-12 col-span-full text-[13px] font-[400] text-[#434C5F] px-[20px] py-[15px]">
      <p className="col-span-6 flex items-center">{type}</p>
      <span className="col-span-1"></span>
      <p className="col-span-3 flex items-center">{number || "-"}</p>
      <p className="col-span-2 flex items-center">{order || "-"}</p>
    </li>
  );
}
