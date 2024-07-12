export interface ChevronProps {
  color?: string;
  width?: number;
  height?: number;
}
//todo: in interface file

export default function ArrowDownIcon({ color = "#D3D4D5" }: ChevronProps) {
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
        d="M0.128662 1.37362C-0.0428872 1.17442 -0.0428872 0.870397 0.128662 0.671199C0.325245 0.442933 0.665568 0.442934 0.862151 0.6712L1.7477 1.69948C2.41896 2.47892 3.58104 2.47892 4.2523 1.69948L5.13785 0.6712C5.33443 0.442933 5.67476 0.442933 5.87134 0.6712C6.04289 0.870397 6.04289 1.17442 5.87134 1.37362L4.73934 2.68806C3.80701 3.77065 2.19299 3.77065 1.26066 2.68806L0.128662 1.37362Z"
        fill={color}
      />
    </svg>
  );
}
