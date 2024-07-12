import StarComponent from "./StarComponent";

interface StarRateProps {
  rate: number;
}

export default function StarRate({ rate }: StarRateProps) {
  return (
    <div className="flex">
      {[...Array(5)].map((item, i) => (
        <StarComponent rate={rate} index={i} key={rate * i + i} />
      ))}
    </div>
  );
}
