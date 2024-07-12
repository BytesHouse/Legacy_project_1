import { SizesEnum } from "./enums/SizesEnum.enum";

export interface FlagInterface {
  countryCode: string;
  size?: keyof typeof SizesEnum;
}
