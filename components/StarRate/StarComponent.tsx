import StarIcon from "../Icons/StarIcon";

interface StarComponentProps {
  rate: number;
  index: number;
}

export default function StarComponent({ rate, index }: StarComponentProps) {
  const integral = Math.trunc(rate);
  const isIntegral = index < integral;
  const isFloat = rate % 1 >= 0.5 && !isIntegral;
  const isOver = index > integral;
  const color = getColorRate(Math.round(rate));
  const styles = isIntegral
    ? `w-[100%] rounded-[4px] ${color}`
    : isOver || !isFloat
    ? ""
    : `w-[50%] rounded-tl-[4px] rounded-bl-[4px] ${color}`;
  return (
    <div className="relative rounded-[4px] w-[18px] h-[18px] bg-gray-2 ml-[1px]">
      <div className={`p-[2px] ${styles} h-full`}></div>
      <StarIcon />
    </div>
  );
}

function getColorRate(index: number) {
  switch (index) {
    case 1 || 0:
      return "bg-[#F44A77]";
    case 2:
      return "bg-[#FE7E51]";
    case 3:
      return "bg-[#FAB543]";
    case 4:
      return "bg-[#A3BE3A]";
    case 5:
      return "bg-[#20AC93]";
    default:
      break;
  }
}
