export interface PaginateArrowProps {
  firstOrLast: boolean;
}

export default function PaginateArrowLeft({ firstOrLast }: PaginateArrowProps) {
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
        d="M0.360617 4.64535L0.000366648 5.00111L0.34363 5.3401C0.354676 5.35213 0.366303 5.36361 0.378466 5.3745L4.91823 9.85771C5.11471 10.0517 5.43128 10.0498 5.62532 9.85328C5.81935 9.6568 5.81737 9.34022 5.62089 9.14619L1.93068 5.50195L23.5 5.50195C23.7761 5.50195 24 5.2781 24 5.00195C24 4.72581 23.7761 4.50195 23.5 4.50195L1.92899 4.50195L5.62089 0.85604C5.81737 0.662006 5.81935 0.34543 5.62532 0.148947C5.43128 -0.0475347 5.11471 -0.0495193 4.91823 0.144515L0.360617 4.64535Z"
        fill={color}
      />
    </svg>
  );
}
