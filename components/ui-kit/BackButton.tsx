import { useRouter } from "next/router";
import ChevronLeftIcon from "../Icons/ChevronLeftIcon";

export default function BackButton() {
  const router = useRouter();
  return (
    <span
      className="flex items-center justify-center bg-gray-2 w-7 aspect-square rounded-full absolute -left-10 top-0 cursor-pointer"
      onClick={() => {
        router.back();
      }}
    >
      <ChevronLeftIcon />
    </span>
  );
}
