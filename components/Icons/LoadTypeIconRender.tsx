import Image from "next/image";
import { useTranslation } from "next-i18next";

enum TrueTypeStyles {
  "shipper" = 1,
  "carrier" = 0,
  "expedition" = 0,
  "load" = 1,
  "transport" = 0,
}

export enum LoadTypes {
  "shipper" = "/assets/images/load_type.svg",
  "carrier" = "/assets/images/truck_type.svg",
  "expedition" = "/assets/images/forward_type.svg",
  "load" = LoadTypes["shipper"],
  "transport" = LoadTypes["carrier"],
}

enum LoadTypesAlt {
  "shipper" = "Shipper type image",
  "carrier" = "Carrier type image",
  "expedition" = "Forwarder type image",
  "load" = "Load type image",
  "transport" = "Transport type image",
}

enum LoadTypesStyling {
  "shipper" = "bg-green-zinc",
  "carrier" = "bg-yellow-70",
  "expedition" = "bg-gray-7",
  "load" = LoadTypesStyling["shipper"],
  "transport" = LoadTypesStyling["carrier"],
}

interface LoadTypeIconRenderInterface {
  type?: keyof typeof LoadTypes;
  title?: string;
}

export default function LoadTypeIconRender({
  type = "expedition",
  title,
}: LoadTypeIconRenderInterface) {
  const src = LoadTypes[type];
  const classes = LoadTypesStyling[type];
  const alt = LoadTypesAlt[type];
  const { t } = useTranslation();
  return (
    <span
      className={
        `w-full flex self-center items-center justify-center h-4 py-0.5 px-1 rounded-[4px] ${
          title ? "min-w-[76px] px-1.5" : ""
        } ` + classes
      }
    >
      <Image
        src={src}
        alt={alt}
        className="w-max h-full"
        width={"100"}
        height={"100"}
      />
      {!title ? null : (
        <p
          className={`${
            TrueTypeStyles[type] ? "text-white ml-2.5 " : " ml-[5px] "
          }capitalize text-[12px] font-[600] truncate`}
        >
          {t(title)}
        </p>
      )}
    </span>
  );
}
