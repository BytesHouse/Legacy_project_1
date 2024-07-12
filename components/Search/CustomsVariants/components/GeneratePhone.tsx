import Link from "next/link";
import Flag from "../../../ui-kit/Flag";

export default function GeneratePhone({
  type,
  data,
  countryCode,
}: {
  type: string;
  data: string[] | string;
  countryCode: string;
}): any {
  const classNames = "col-span-9 col-start-4 font-semibold text-[#166AFF]";
  return data && Array.isArray(data) ? (
    data?.map((el) => {
      const elSplited = el.split("+");
      if (elSplited.length > 2) {
        return elSplited.map((eSel) => {
          return eSel ? (
            <div key={eSel} className={classNames}>
              <Link
                className="flex w-max items-center gap-x-1.5"
                href={type + ":" + eSel}
              >
                <Flag countryCode={countryCode} size="md" />+
                {eSel?.replace(",", "") || "-"}
              </Link>
            </div>
          ) : (
            <></>
          );
        });
      }
      return (
        <div key={el} className={classNames}>
          <Link
            className="flex w-max items-center gap-x-1.5"
            href={type + ":" + el}
          >
            <Flag countryCode={countryCode} size="md" />
            {el?.replace(",", "") || "-"}
          </Link>
        </div>
      );
    })
  ) : (
    <div className={classNames}>
      <Link
        className="flex w-max items-center gap-x-1.5"
        href={type + ":" + data}
      >
        <Flag countryCode={countryCode} size="md" />
        {data || "-"}
      </Link>
    </div>
  );
}
