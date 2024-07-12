import { ChevronProps } from "./ArrowDownIcon";

export const Devider = ({ color = "black" }: ChevronProps) => {
  return (
    <svg
      width="2"
      height="16"
      viewBox="0 0 2 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.00538 0.0664062H0.6875V15.9528H1.00538V0.0664062Z"
        fill={color}
      />
    </svg>
  );
};
