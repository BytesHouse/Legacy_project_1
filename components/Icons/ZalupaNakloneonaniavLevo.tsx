export default function ZalupaNakloneonaiavLevo({
  w = 27,
  h = 27,
}: {
  w?: number;
  h?: number;
}) {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12.875" cy="12.875" r="11.875" stroke="#171717" />
      <path d="M23.5 23.5L26 26" stroke="#171717" strokeLinecap="round" />
    </svg>
  );
}
