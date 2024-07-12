import { CUSTOM_TYPES } from "./constants/Customs.Constant";

export function getMarkerIconPath(type: string) {
  switch (true) {
    case CUSTOM_TYPES.AUTO.includes(type):
      return "/assets/images/car.svg";
    case CUSTOM_TYPES.AIR.includes(type):
      return "/assets/images/aeroplane.svg";
    case CUSTOM_TYPES.RIVER.includes(type):
      return "/assets/images/boat.svg";
    case CUSTOM_TYPES.RAILWAY.includes(type):
      return "/assets/images/train.svg";
    case CUSTOM_TYPES.PEDESTRIAN.includes(type):
      return "/assets/images/walk.svg";
    default:
      return "/assets/images/car.svg";
  }
}
