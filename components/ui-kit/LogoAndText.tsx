import Link from "next/link";
import { ChevronProps } from "../Icons/ArrowDownIcon";
import { Devider } from "../Icons/DeviderIcon";
import Logo from "./Logo";
import Slogan from "../Icons/Slogan";
import { LogoAndTextProps } from "../interfaces/LogoAndText.interface";

export default function LogoAndText({ color }: LogoAndTextProps) {
  const text = `text-[${color}]`;
  return (
    <div className="flex items-center">
      <Link shallow={true} href="/">
        <Logo color={color} />
      </Link>
      <div className={`mx-[13px] ${text}`}>
        <Devider color={color} />
      </div>
      <Slogan color={color} />
    </div>
  );
}
