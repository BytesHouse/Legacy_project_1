import React from "react";
import { Polyline } from "react-leaflet";
import { getColor } from "../../utils/getColorPolyline";

function BoundsComponent(props: { positions: any; type: any }) {
  const { positions, type } = props;

  return <Polyline color={getColor(type)} positions={positions} />;
}

export default React.memo(BoundsComponent);
