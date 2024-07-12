import React from "react";
import { Marker, Tooltip } from "react-leaflet";
import { CUSTOM_TYPES } from "../../utils/constants/Customs.Constant";
import {
  greenAir,
  greenBoat,
  greenCar,
  greenTrain,
  greenWalk,
} from "../../utils/constants/MapMarker.Constant";
import { Icon, Point } from "leaflet";

/**
 *
 * @param {object} props
 * @param {object} props.item
 * @param {boolean} props.isMain
 * @param {Array} props.position
 * @param {any} props.open
 */
const MarkerCustom = (props: any) => {
  const { item, position, open, isMain = false } = props;

  const categories = item.categories ? JSON.parse(item.categories) : null;
  const type = Array.isArray(categories) ? categories[0] : null;

  const onOpen = () => {
    if (!open) {
      return;
    }
    return open(item);
  };
  function getMarkerIcon() {
    switch (true) {
      case CUSTOM_TYPES.AUTO.includes(type):
        return greenCar;
      case CUSTOM_TYPES.AIR.includes(type):
        return greenAir;
      case CUSTOM_TYPES.RIVER.includes(type):
        return greenBoat;
      case CUSTOM_TYPES.RAILWAY.includes(type):
        return greenTrain;
      case CUSTOM_TYPES.PEDESTRIAN.includes(type):
        return greenWalk;
      default:
        return greenCar;
    }
  }
  const icon = getMarkerIcon();

  if (isMain) {
    icon.options.iconSize = new Point(30, 30);
  }

  return (
    <Marker position={position} icon={icon} onClick={onOpen}>
      <Tooltip direction="top">
        <span>{item.name || item.nameAddress}</span>
      </Tooltip>
    </Marker>
  );
};

export default MarkerCustom;
