import Link from "next/link";
import { useRouter } from "next/router";
import ArrowLeftIcon from "../Icons/ArrowLeftIcon";
import { RoundedButtonProps } from "../interfaces/SnowButtonInterface.interface";

export default function RoundedButton({ text }: RoundedButtonProps) {
  const router = useRouter();
  return (
    <div onClick={() => router.back()} className="flex cursor-pointer">
      <div className="bg-[#E2E5E9] p-[10px] rounded-full">
        <ArrowLeftIcon color="#000000" />
      </div>
      <p className="ml-[10px]">{text}</p>
    </div>
  );
}
