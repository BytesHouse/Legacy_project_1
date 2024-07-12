import dynamic from "next/dynamic";
import Link from "next/link";
import { countryCodes } from "../../../utils/constants/countryCodes";

const CountryButton = dynamic(() => import("./CountryButton"));

export default function Buttons() {
  return (
    <div className="grid grid-cols-2 w-full gap-5 z-10">
      {countryCodes.map((countryCode) => {
        return (
          <Link shallow={true} href="/search" key={countryCode}>
            <CountryButton countryCode={countryCode} />
          </Link>
        );
      })}
      <div className="flex items-center rounded-xl border border-gray-1 p-4 col-span-1 bg-white">
        <p className="text-lg text-c-gray text-opacity-50 font-semibold">
          Soon
        </p>
      </div>
    </div>
  );
}
