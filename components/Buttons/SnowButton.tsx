import Link from "next/link";
import { SnowButtonInterface } from "../interfaces/SnowButtonInterface.interface";

const buttonClasses =
  "py-2.5 px-20 w-max h-max shadow-snow text-sm font-medium text-carbon-black rounded-md bg-white z-10 hover:text-purple";

const SnowButton = ({
  isLink = false,
  callback = () => {},
  text = "",
  link = "",
}: SnowButtonInterface) => {
  return !isLink ? (
    <Button callback={callback} text={text} />
  ) : (
    <LinkButton link={link} text={text} />
  );
};

const Button = ({ callback, text }: SnowButtonInterface) => {
  return (
    <button className={buttonClasses} onClick={callback}>
      {text}
    </button>
  );
};
const LinkButton = ({ link = "", text }: SnowButtonInterface) => {
  return (
    <Link href={link} className={buttonClasses}>
      <p className="min-w-max hover:text-purple">{text}</p>
    </Link>
  );
};

export default SnowButton;
