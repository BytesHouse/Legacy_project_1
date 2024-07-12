import CustomsSpecificItem from "./CustomsSpecificItem";
import GenerateMail from "./GenerateMail";
import GeneratePhone from "./GeneratePhone";

interface CustomsSpecificLinkItemInterface {
  type: string;
  title: string;
  data: string[] | string;
  countryCode?: string;
}

export default function CustomsSpecificLinkItem({
  type,
  title,
  data,
  countryCode,
}: CustomsSpecificLinkItemInterface) {
  return data ? (
    <div className="grid grid-cols-12 text-xs2 text-black-carbon">
      <p className="col-span-3 font-medium">{title}</p>
      {type === "tel" || type === "fax" ? (
        <GeneratePhone
          countryCode={countryCode ? countryCode : ""}
          type={type}
          data={data}
        />
      ) : null}
      {type === "mail" ? <GenerateMail data={data} /> : null}
    </div>
  ) : (
    <CustomsSpecificItem title={title} data={data} />
  );
}
