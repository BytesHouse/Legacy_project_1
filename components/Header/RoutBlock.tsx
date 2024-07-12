import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { countries } from "../../assets/constants/countries";

interface RoutBlockProps {
  text: string;
  href: string;
  countryCode?: string;
}

export default function RoutBlock({ text, href, countryCode }: RoutBlockProps) {
  const router = useRouter();
  const { locale, asPath } = router;
  const { t } = useTranslation();
  const heading =
    asPath === "/archive"
      ? "Profile archive"
      : countryCode
      ? t(countryCode)
      : null;
  return (
    <div className="text-white">
      <div className="text-[12px] mb-[5px] text-[#ffffffdd]">
        <Link shallow={true} href={"/"}>
          {t("home")}
        </Link>
        /{" "}
        <Link shallow={true} href={""} className="capitalize">
          {locale}
        </Link>{" "}
        <Link shallow={true} className="capitalize" href={href}>
          /{text.split("/")[1].split("?")[0]}
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-[32px] font-bold tracking-[.03em]">{heading}</h1>
      </div>
    </div>
  );
}
