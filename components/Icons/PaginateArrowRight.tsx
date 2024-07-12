import { PaginateArrowProps } from "./PaginateArrowLeft";

export default function PaginateArrowRight({
  firstOrLast,
}: PaginateArrowProps) {
  const color = firstOrLast ? "#A2A2A2" : "#000000";
  return (
    <svg
      width="24"
      height="11"
      viewBox="0 0 24 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.6394 5.6434L23.9996 5.99916L23.6564 6.33815C23.6453 6.35017 23.6337 6.36166 23.6215 6.37255L19.0818 10.8558C18.8853 11.0498 18.5687 11.0478 18.3747 10.8513C18.1806 10.6548 18.1826 10.3383 18.3791 10.1442L22.0693 6.5L0.5 6.5C0.223857 6.5 -4.12973e-07 6.27614 -4.37114e-07 6C-4.61255e-07 5.72386 0.223857 5.5 0.5 5.5L22.071 5.5L18.3791 1.85409C18.1826 1.66005 18.1806 1.34348 18.3747 1.14699C18.5687 0.950512 18.8853 0.948528 19.0818 1.14256L23.6394 5.6434Z"
        fill={color}
      />
    </svg>
  );
}
