import { useState } from "react";
import { randomColor } from "../../utils/getRandomColor";

interface ProgressBarProps {
  percent: number;
  size: number;
}

export default function ProgressBar({
  size = 0,
  percent = 0,
}: ProgressBarProps) {
  const color = randomColor();
  const [divColor, setDivColor] = useState(color);
  return (
    <div className="flex items-center justify-end px-[20px]">
      <div className="w-[35px] text-[13px] font-[400] text-[#686B6E]">
        {percent}%
      </div>
      <div className="ml-[10px] w-[100px] max-w-[100px] h-[6px] rounded-[30px] relative bg-[#F0F0F0]">
        <div
          style={{ width: `${size}%`, backgroundColor: `${divColor}` }}
          className={`h-full rounded-[30px]`}
        ></div>
      </div>
    </div>
  );
}
