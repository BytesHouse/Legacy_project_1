import Image from "next/image";
import KebabMenu from "../Icons/KebabMenu";
import StyledLink from "../ui-kit/StyledLink";

export interface TrendsPostProps {
  text: string;
  date: string;
  avatar?: string;
  img?: string;
  alt?: string;
}

export default function TrendsPost({ text, date }: TrendsPostProps) {
  return (
    <li className="border-gray-2 relative border rounded-2xl shadow-search ">
      <Image
        src="/assets/images/aboutImage2.jpg"
        alt="img1"
        width={368}
        height={576}
        loading="lazy"
        className="h-[234px] w-full object-cover col-span-4 rounded-tl-xl rounded-tr-xl"
      />
      <div className="absolute top-[100px] text-white p-[35px]">
        <p className="text-[20px] font-[700] mb-[10px]">{text}</p>
        <p className="text-[11px] text-[#87949E] font-[500]">{date}</p>
      </div>
      <div className="p-[25px]">
        <div className="mb-[25px] flex justify-between items-center">
          <div>
            <p className="text-[11px] text-[#87949E] font-[500] mb-[15px]">
              Tranding worldwide
            </p>
            <p className="text-[14px] fonr-[700] mb-[5px]">
              Supply chain agility
            </p>
            <p className="text-[#87949E] text-[13px] fonr-[500]">128 posts</p>
          </div>
          <KebabMenu />
        </div>
        <div className="mb-[25px] flex justify-between items-center">
          <div>
            <p className="text-[11px] text-[#87949E] font-[500] mb-[15px]">
              Trends in your area
            </p>
            <p className="text-[14px] fonr-[700] mb-[5px]">
              Less than truckload demand
            </p>
            <p className="text-[#87949E] text-[13px] fonr-[500]">1 000 posts</p>
          </div>
          <KebabMenu />
        </div>
        <StyledLink text={"Show more trends"} link={""} />
      </div>
    </li>
  );
}
