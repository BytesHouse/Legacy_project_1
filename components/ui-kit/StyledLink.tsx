import Link from "next/link";
import { StyledLinkProps } from "../interfaces/StyledLink.interface";

export default function StyledLink({ text, link, cb }: StyledLinkProps) {
  return (
    <span className="text-c-blue hover:text-c-blue/70 text-[13px] font-[400] hover:underline">
      {link ? (
        <Link shallow={true} href={link}>
          {text}
        </Link>
      ) : cb ? (
        <button onClick={cb}>{text}</button>
      ) : (
        text
      )}
    </span>
  );
}
