import { ChevronProps } from "./ArrowDownIcon";

export default function ArrowTopIcon({ color = "#D3D4D5" }: ChevronProps) {
  return (
    <svg
      width="6"
      height="4"
      viewBox="0 0 6 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.86944 2.13945C6.04008 2.33943 6.03869 2.64344 5.86624 2.84186C5.66861 3.06922 5.32829 3.06767 5.13276 2.83851L4.25191 1.8062C3.58421 1.0237 2.42215 1.01839 1.74734 1.79476L0.857101 2.81898C0.659478 3.04635 0.319159 3.0448 0.12362 2.81564C-0.0470179 2.61566 -0.0456294 2.31164 0.126827 2.11323L1.26482 0.803963C2.20207 -0.274353 3.81609 -0.266984 4.74346 0.819847L5.86944 2.13945Z"
        fill={color}
      />
    </svg>
  );
}
