import Image from "next/image";
import { getMarkerIconPath } from "../../../../utils/getMarkerIcon";
import Link from "next/link";
import { UtilityService } from "../../../../services/Utility.Service";

interface CustomListItemInterface {
  title: string;
  type: any;
  id: string;
  countryCode: string;
}

export default function CustomListItem({
  title,
  type,
  id,
  countryCode,
}: CustomListItemInterface) {
  return (
    <Link
      shallow={true}
      prefetch={false}
      href={`/search/customs/${countryCode}/${UtilityService.getSlugCustom({
        name: title,
        nameAddress: title,
        customId: id,
      })}`}
      className={`grid grid-cols-12 w-full px-5 py-2.5 text-xs2 leading-[22px] font-medium border-t duration-300 transition-all hover:bg-white`}
    >
      <div className="col-span-7">{title}</div>
      <div className="col-span-3">
        <Image
          alt={type + title}
          src={getMarkerIconPath(type)}
          width={22}
          height={22}
        />
      </div>
      <div className="col-span-2">{id}</div>
    </Link>
  );
}
