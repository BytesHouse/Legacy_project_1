import Image from "next/image";
import mask from "../../public/assets/images/Mask.png";
import AdminIcon from "../Icons/AdminIcon";

export default function AdminOverview({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  return (
    <div className="grid grid-cols-12 mb-[8px]">
      <div className="col-span-4 font-[500] text-[13px]">
        <h3 className="bg-purple w-[72px] flex items-center gap-[10px] text-white py-[1px] px-[6px] rounded-[4px] ">
          <AdminIcon />
          Admin
        </h3>
      </div>
      <div className="col-span-8 font-[600] flex items-center gap-[10px]">
        <Image width={"18"} src={image} alt={"mock"} />
        <p>{name}</p>
      </div>
    </div>
  );
}
