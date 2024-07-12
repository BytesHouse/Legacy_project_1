import Link from "next/link";
import VerifiedIcon from "../../Icons/VerifiedIcon";
import Image from "next/image";
import { RecentIcon } from "../../Icons/RecentIcon";
import { CrossIcon } from "../../Icons/CrossIcon";

export interface RecentItemProps {
  href: string;
  imageId?: string;
  initials: string;
  verified?: boolean;
  isUser?: boolean;
  name: string;
}
interface RecentItemInterface extends RecentItemProps {
  deleteSelf: (e: any) => void;
  onClick?: () => void;
}

export const RecentItem = (props: RecentItemInterface) => {
  const {
    href,
    imageId,
    initials,
    verified,
    name,
    isUser,
    deleteSelf,
    onClick,
  } = props;
  return (
    <div className="flex justify-between hover:bg-gray-fa transition-all ">
      <Link
        className="flex gap-x-[15px] items-center w-full py-3 px-5"
        key={href}
        onClick={onClick}
        href={href}
      >
        <RecentIcon />
        <div className="relative">
          {imageId ? (
            <Image
              src={`${process.env.API}/files/${imageId}`}
              alt={""}
              width={30}
              height={30}
              className={
                "rounded-full border-[4px] border-white w-[30px] h-[30px]"
              }
            />
          ) : (
            <div
              className={`w-[30px] h-[30px] rounded-full text-[8px] ${
                isUser ? "bg-purple text-white" : "bg-gray-2 text-black"
              }  border-[4px] border-white flex justify-center items-center`}
            >
              {initials}
            </div>
          )}
          {verified && (
            <div className="absolute bottom-0.5 right-0.5">
              <VerifiedIcon size="xs" />
            </div>
          )}
        </div>
        <p className="text-[13px] leading-4 font-semibold my-auto">{name}</p>
      </Link>
      <button
        className="ml-auto z-10 p-5 text-pewter-gray hover:opacity-70"
        onClick={deleteSelf}
      >
        <CrossIcon />
      </button>
    </div>
  );
};
