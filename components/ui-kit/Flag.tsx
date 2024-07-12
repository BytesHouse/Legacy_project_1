import { SizesEnum } from "../interfaces/enums/SizesEnum.enum";
import { FlagInterface } from "../interfaces/Flag.interface";

export default function Flag({ countryCode, size = "2xl" }: FlagInterface) {
  return (
    <span
      className={`fflag ff-round ff-${
        SizesEnum[size]
      } fflag-${countryCode.toLocaleUpperCase()}`}
    />
  );
}
