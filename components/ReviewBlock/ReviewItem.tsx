import Image from "next/image";
import HalfPastFiveArrowIcon from "../Icons/HalfPastFiveArrowIcon";
import StarRate from "../StarRate/StarRate";
import { getInitials } from "../../utils/getInitials";
import { useTranslation } from "next-i18next";
import Link from "next/link";

interface FromId extends toId {
  isUser: boolean;
}
interface toId {
  countryCode: string;
  id: string;
}

export type ReviewItemProps = {
  companyName: string;
  name: string;
  score: any;
  comment: string;
  reasons: any;
  imageId?: string;
  companyImage?: string;
  fromId: FromId;
  toId: toId;
};

export default function ReviewItem(props: ReviewItemProps) {
  const {
    companyName,
    name,
    score,
    fromId,
    toId,
    comment,
    reasons,
    imageId,
    companyImage,
  } = props;

  const fromLinkPath = fromId.isUser
    ? `/user/${fromId.id}`
    : `/companies/${fromId.countryCode}/${fromId.id}`;
  const toLinkPath = `/companies/${toId.countryCode}/${toId.id}`;

  const { t } = useTranslation();
  return (
    <li className="border border-gray-2 rounded-[8px]  mb-[10px] text-[#37383A] hover:border-purple">
      <div className="border-b border-gray-2 px-[20px] py-[15px]">
        <div className="flex items-center">
          {imageId ? (
            <Image
              src={`${process.env.API}/files/${imageId}`}
              alt={"alt"}
              width={25}
              height={25}
              className={"rounded-full"}
            />
          ) : (
            <div
              className={`text-[10px] w-[25px] h-[25px] rounded-full border-[4px] border-white bg-gray-2 flex justify-center items-center`}
            >
              {name ? getInitials(name) : "-"}
            </div>
          )}
          <Link
            href={fromLinkPath}
            className="text-[13px] font-[700] ml-[10px]"
          >
            {name}
          </Link>
        </div>
        <div className="flex ml-3">
          <HalfPastFiveArrowIcon />
          <div className="flex items-center relative top-1.5 left-1.5">
            {companyImage ? (
              <Image
                src={`${process.env.API}/files/${companyImage}`}
                alt={"alt"}
                width={25}
                height={25}
                className={"rounded-full"}
              />
            ) : (
              <div
                className={`text-[10px] w-[25px] h-[25px] rounded-full border-[4px] border-white bg-gray-2 flex justify-center items-center`}
              >
                {companyName ? getInitials(companyName)[0] : "-"}
              </div>
            )}
            <Link
              href={toLinkPath}
              className="truncate text-[12px] font-[600] ml-[10px]"
            >
              {companyName}
            </Link>
          </div>
        </div>
      </div>
      <div className="p-[20px]">
        <div className="flex justify-between items-center mb-[20px]">
          <p className="text-[10px] bg-gray-2 px-[10px] rounded-[4px]">
            {t("reason")} {t(reasons?.[0])}
          </p>
          <StarRate rate={score} />
        </div>
        <p className="text-[13px] font-[400] line-clamp">{comment}</p>
      </div>
    </li>
  );
}
