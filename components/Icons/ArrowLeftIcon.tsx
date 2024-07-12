import { ChevronProps } from "./ArrowDownIcon";

export default function ArrowLeftIcon({ color }: ChevronProps) {
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
        d="M2.12638 0.128662C2.32558 -0.0428868 2.6296 -0.0428868 2.8288 0.128662C3.05707 0.325245 3.05707 0.665568 2.8288 0.862151L1.80052 1.7477C1.02108 2.41896 1.02108 3.58104 1.80052 4.2523L2.8288 5.13785C3.05707 5.33443 3.05707 5.67476 2.8288 5.87134C2.6296 6.04289 2.32558 6.04289 2.12638 5.87134L0.811938 4.73934C-0.270647 3.80701 -0.270646 2.19299 0.811939 1.26066L2.12638 0.128662Z"
        fill={color}
      />
    </svg>
  );
}
