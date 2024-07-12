import Link from "next/link";
import { Overview } from "./OverviewFromArray";
import Flag from "../ui-kit/Flag";

interface LinkOverviewProps {
  data: Overview;
}

const LinkOverview = ({ data }: LinkOverviewProps) => {
  let textLink = [`${data.text}`];
  if (data.title === "profile_primary_office") {
    textLink = String(data.text).split(",");
  }
  return (
    <div className="grid grid-cols-12 mb-[8px]">
      <h3 className="col-span-4 font-[500]">{data.title}</h3>
      {data.text ? (
        data.isCountry ? (
          <div className="group col-span-8 font-[600] w-max">
            <Link
              shallow={true}
              prefetch={false}
              href={String(data.link) || "/"}
              className="w-max"
            >
              <div className="text-secondary-50 hover:text-secondary-60 hover:underline cursor-pointer font-[600] text-14-20 md:text-16-22 flex items-center gap-x-1.5">
                <Flag countryCode={data?.isCountry!} size="md" />
                {textLink.map((item, index) => (
                  <span key={`${item}`}>
                    <span>{item}</span>
                    {textLink.length - 1 === index ? null : <br />}
                  </span>
                ))}
              </div>
            </Link>
          </div>
        ) : (
          <div className="group col-span-8 font-[600] w-max">
            <Link
              shallow={true}
              prefetch={false}
              href={String(data.link) || "/"}
              className="w-max"
            >
              <div className="text-secondary-50 hover:text-secondary-60 hover:underline cursor-pointer font-[600] text-14-20 md:text-16-22">
                {textLink.map((item, index) => (
                  <span key={`${item}`}>
                    <span>{item}</span>
                    {textLink.length - 1 === index ? null : <br />}
                  </span>
                ))}
              </div>
            </Link>
          </div>
        )
      ) : (
        <div className="font-[600]">{"-"}</div>
      )}
    </div>
  );
};
export default LinkOverview;
