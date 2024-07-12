import dynamic from "next/dynamic";
import Image from "next/image";

import { SnowButtonInterface } from "../interfaces/SnowButtonInterface.interface";

const SnowButton = dynamic(() => import("../Buttons/SnowButton"));

interface SuggestionBlockInterface {
  title: string;
  secondaryText?: string;
  link: SnowButtonInterface;
}

const SuggestionBlock = ({
  title,
  secondaryText = undefined,
  link,
}: SuggestionBlockInterface) => {
  return (
    <div className="col-span-full flex items-center justify-between h-[153px] relative text-white font-semibold px-12 pt-7 pb-9">
      <Image
        src="/assets/images/aboutImage1.jpg"
        alt="img1"
        width={1084}
        height={153}
        loading="lazy"
        className="h-[153px] w-full object-cover left-0 top-0 absolute"
      />
      <div className="flex flex-wrap h-full items-center justify-between z-10 ">
        {secondaryText ? (
          <p className="opacity-50 text-xs ">{secondaryText}</p>
        ) : null}
        <p className="text-2xl font-bold w-full tracking-[0.4px]">{title}</p>
      </div>
      <SnowButton {...link} />
    </div>
  );
};

export default SuggestionBlock;
