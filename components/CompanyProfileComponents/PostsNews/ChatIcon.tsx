import Image from "next/image";

enum Icons {
  hearth = "/assets/images/hearth.svg",
  filledHearth = "/assets/images/hearthFilled.png",
  comments = "/assets/images/comments.svg",
  repost = "/assets/images/repost.svg",
  shield = "/assets/images/shield.svg",
  kebabMenu = "/assets/images/kebabMenu.svg",
  fly = "/assets/images/fly.svg",
}

enum Sizes {
  inherit = 0,
}

interface ChatIconInterface {
  icon?: keyof typeof Icons;
  size?: keyof typeof Sizes;
}

export default function ChatIcon({
  icon = "hearth",
  size = "inherit",
}: ChatIconInterface) {
  return (
    <Image
      className="w-full h-full"
      src={Icons[icon]}
      width={"100"}
      height={"100"}
      alt={icon}
    />
  );
}
