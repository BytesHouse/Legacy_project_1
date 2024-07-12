import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { peoplesOrCompanies } from "../../store/states";
import { useRouter } from "next/router";

interface ResultSelectorProps {
  peoplesCount: number;
  companiesCount: number;
  leftText: string;
  rightText: string;
  callback?: () => void;
}

export default function ResultSelector({
  peoplesCount = 0,
  companiesCount = 0,
  leftText,
  rightText,
  callback = () => {},
}: ResultSelectorProps) {
  const [isPeople, setIsPeople] = useRecoilState(peoplesOrCompanies);

  return (
    <div className="p-[2px] border border-[#E2E5E9] rounded-[8px] flex text-center items-center bg-white mb-[15px] gap-x-[10px]">
      <div
        className={`${
          isPeople
            ? "bg-transparent  border-purple text-purple hover:text-purple/80 hover:border-purple/80 "
            : "border-transparent hover:border-purple  hover:text-[#37383ab6]/80"
        } border  flex flex-1 justify-center items-center rounded-md  text-[12px] font-[500] cursor-pointer group`}
        onClick={() => {
          if (!isPeople) {
            setIsPeople(true);
            callback();
          }
        }}
      >
        {leftText}{" "}
        <div
          className={`ml-[13px] group-hover:bg-[#efefef] group-hover:text-[#37383ab6]/80 bg-gray-2 text-black text-[9px] rounded-[4px] px-1 text-center `}
        >
          {peoplesCount}
        </div>
      </div>
      <div
        className={`${
          !isPeople
            ? "bg-transparent  border-purple text-purple hover:text-purple/80 hover:border-purple/80"
            : "border-transparent hover:border-purple/80 hover:text-[#37383A]/80 "
        } border  flex flex-1 justify-center items-center rounded-md  text-[12px] font-[500] cursor-pointer hover:text-[#37383A] group`}
        onClick={() => {
          if (isPeople) {
            setIsPeople(false);
            callback();
          }
        }}
      >
        {rightText}{" "}
        <div
          className={`ml-[13px] group-hover:bg-[#efefef] group-hover:text-[#37383A] bg-gray-2 text-black text-[9px] rounded-[4px] px-1 text-center`}
        >
          {companiesCount}
        </div>
      </div>
    </div>
  );
}
