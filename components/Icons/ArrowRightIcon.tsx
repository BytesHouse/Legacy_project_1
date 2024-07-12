import { ChevronProps } from "./ArrowDownIcon";

export default function ArrowrightIcon({ color = "#D3D4D5" }: ChevronProps) {
  return (
    <svg
      width="3"
      height="6"
      viewBox="0 0 3 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.873615 5.87134C0.674418 6.04289 0.370397 6.04289 0.171199 5.87134C-0.0570669 5.67476 -0.0570665 5.33443 0.1712 5.13785L1.19948 4.2523C1.97892 3.58104 1.97892 2.41896 1.19948 1.7477L0.171199 0.86215C-0.0570671 0.665567 -0.0570674 0.325245 0.171199 0.128661C0.370396 -0.0428875 0.674418 -0.042887 0.873615 0.128662L2.18806 1.26066C3.27065 2.19299 3.27065 3.80701 2.18806 4.73934L0.873615 5.87134Z"
        fill={color}
      />
    </svg>
  );
}
