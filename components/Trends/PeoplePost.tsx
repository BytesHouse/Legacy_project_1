import Image from "next/image";
import InteractiveButton from "../ui-kit/InteractiveButton";
import { TrendsPostProps } from "./TrendsPost";

import HeartIcon from "../Icons/HeartIcon";
import CommentIcon from "../Icons/CommentIcon";
import SharesIcon from "../Icons/SharesIcon";

export default function PeoplePost({
  img = "/assets/images/defaultAvatar.png",
  alt = "text",
}: TrendsPostProps) {
  return (
    <li className="border-gray-2 relative border rounded-2xl shadow-search ">
      <div className="p-[20px] flex items-center border-b border-b-gray-2">
        <Image width={40} height={40} src={img} alt={alt} />
        <div className="flex flex-col ml-[20px]">
          <p className="text-[13px] font-[700]">Eleanor Pena</p>
          <p className="text-[11px] font-[500] text-[#87949E]">1 hour ago</p>
        </div>
      </div>
      <div className="p-[20px] border-b border-b-gray-2">
        <Image
          src="/assets/images/aboutImage2.jpg"
          alt="img1"
          width={368}
          height={300}
          loading="lazy"
          className="h-[300px] w-full object-cover col-span-4 rounded-tl-xl rounded-xl mb-[20px]"
        />
        <p className="text-[13px] text-[#37383A] font-[500] leading-[22px]">
          The recording starts with the patter of a summer squall. A drifting
          tone like that of a not-quite-tuned-in radio station rises and for a
          while drowns out the patter. These are the sounds encountered by
          NASA’s Cassini spacecraft as it dove through the gap between Saturn
          and its innermost ring.
        </p>
      </div>
      <div className="p-[20px] flex">
        <InteractiveButton number={1} icon={<HeartIcon />} />{" "}
        <InteractiveButton number={3} icon={<CommentIcon />} />{" "}
        <InteractiveButton number={0} icon={<SharesIcon />} />
      </div>
    </li>
  );
}
