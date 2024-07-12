import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const Cola = dynamic(() => import("../Icons/logos/Cola"));
const Cricova = dynamic(() => import("../Icons/logos/Cricova"));
const Kvint = dynamic(() => import("../Icons/logos/Kvint"));
const MercedesBenz = dynamic(() => import("../Icons/logos/Mercedes"));
const MMD = dynamic(() => import("../Icons/logos/MMD"));
const Orbico = dynamic(() => import("../Icons/logos/Orbico"));

const SectionTwo = () => {
  const { t } = useTranslation();
  const logos = [
    {
      Logo: Cricova,
      href: "/company/md/cricova-__-1003600086062",
    },
    {
      Logo: Orbico,
      href: "/company/md/icsorbicomasrl-__-1009600004970",
    },
    {
      Logo: Kvint,
      href: "/company/md/zaotvkzkvint-__-1003615000013",
    },
    {
      Logo: Cola,
      href: "/company/md/coca-colaimbutelierechisinausrl-__-1003600136646",
    },
    {
      Logo: MMD,
      href: "/company/md/companiammdsrl-__-1002600038569",
    },
    {
      Logo: MercedesBenz,
      href: "/company/ro/mercedes-benzromaniasrl-__-18927698",
    },
  ];
  return (
    <section className="my-25 grid grid-cols-12 gap-x-5 select-none">
      <div className="absolute left-0 w-full h-[632px] bg-[#1C202C] opacity-5"></div>
      <div className="my-25 col-span-5">
        <p className="text-xs text-carbon-black mb-4">{t("trusted_in_us")}</p>
        <p className="text-3xl text-carbon-black mb-10 font-bold">
          {t("our_clients")}
        </p>
        <p className="text-sm text-c-gray">{t("join_our_over")}</p>
      </div>
      <div className="my-25 col-span-5 col-start-8 flex justify-between flex-wrap gap-x-10">
        {logos.map(({ Logo, href }, i) => {
          return (
            <Link
              shallow={true}
              key={href + i}
              href={href}
              className={`h-max min-h-[40px] flex items-center hover:scale-110 hover:drop-shadow-logo transform transition-all ease-out  filter${
                i > 2 ? " mt-auto" : ""
              }`}
            >
              <Logo />
            </Link>
          );
        })}
      </div>
      <div className="h-[576px] col-span-full z-10 bg-white shadow-sidebar rounded-xl grid grid-cols-12 relative">
        <Image
          src="/assets/images/aboutImage2.jpg"
          alt="img1"
          width={368}
          height={576}
          loading="lazy"
          className="h-[576px] w-full object-cover col-span-4 rounded-tl-xl rounded-bl-xl"
        />
        <div className="flex flex-col absolute justify-center h-full col-span-4 px-22.5">
          <p className=" text-white text-xs">{t("main_about_limit")}</p>
          <h4 className="text-2xl text-white font-bold mb-4">
            {t("main_about_10")}
          </h4>
        </div>
        <div className="col-span-6 col-start-6 py-15">
          <h4 className="text-2xl font-bold mb-4">{t("main_about_11")}</h4>
          <p className="mb-15 text-c-gray text-xs">{t("main_about_12")}</p>
          <p className="indent-3 text-c-gray text-xs mb-11">
            {t("main_about_13")}
          </p>
          <p className="indent-3 text-c-gray text-xs mb-11">
            {t("main_about_14")}
          </p>
          <p className="indent-3 text-c-gray text-xs mb-15">
            {t("main_about_15")}
          </p>
          <h4 className="text-2xl font-bold">{t("main_about_16")}</h4>
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;
