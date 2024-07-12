import { ChevronProps } from "../Icons/ArrowDownIcon";

export default function StatusLight({
  color = "#87949E",
  width = 18,
  height = 18,
}: ChevronProps) {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 right-0"
    >
      <rect
        x="1.5"
        y="1.5"
        width={width}
        height={height}
        rx="10"
        fill={color}
      />
      <rect
        x="1.5"
        y="1.5"
        width={width}
        height={height}
        rx="9"
        stroke="white"
        strokeWidth="3"
      />
    </svg>
  );
}
