interface InsolvenciesItemProps {
  type?: string;
  number?: string;
  order?: number;
}

export default function InsolvenciesItem({
  type,
  number,
  order,
}: InsolvenciesItemProps) {
  return (
    <li className="grid grid-cols-12 col-span-full text-[13px] font-[400] text-[#434C5F] px-[20px] py-[15px]">
      <p className="col-span-6 flex items-center">
        Convocare adunare creditori, nr. 126
      </p>
      <span className="col-span-1"></span>
      <p className="col-span-3 flex items-center">Giurgiu</p>
      <p className="col-span-2 flex items-center">2020 - 01 - 15</p>
    </li>
  );
}
