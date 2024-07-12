import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { arrayItems } from "../../utils/constants/arrayMenuItems";
import { FooterProps } from "../interfaces/FooterProps.interface";
import FooterItem from "./components/FooterItem";

export default function Footer({
  top,
  styles,
  array = arrayItems,
}: FooterProps) {
  const router = useRouter();
  const { asPath } = router;
  const isAbout =
    asPath === "/about" ? true : asPath === "/archive" ? true : false;
  const isSearch = asPath.includes("search") ? true : false;
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-wrap justify-between gap-y-3 ${
        isSearch ? "w-[300px]" : ""
      } ${isAbout ? "[&>*]:mr-7" : "[&>*]:mr-2"} ${styles}`}
    >
      {array.map(({ text, items, href }, i) => (
        <FooterItem
          key={text}
          top={top}
          text={t(text)}
          arrItems={items!}
          href={href}
          isLastIndex={array.length - 1 === i}
        />
      ))}
    </div>
  );
}
