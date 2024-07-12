import { ReactElement } from "react";

interface InteractiveButtonProps {
  number: number;
  icon: ReactElement;
}

export default function InteractiveButton({
  number,
  icon,
}: InteractiveButtonProps) {
  return (
    <button className="bg-[#F2F2F3] px-[15px] py-[5px] rounded-[10px]   mr-[20px]">
      <div className="flex justify-between items-center w-[32px]">
        {icon}
        {number}
      </div>
    </button>
  );
}
