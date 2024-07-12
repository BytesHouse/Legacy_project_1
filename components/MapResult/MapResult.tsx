import * as L from "leaflet";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Map, TileLayer } from "react-leaflet";
import { COUNTRIES_COORDINAT } from "../../utils/constants/Countries.Constant";
import { findCoordinates } from "../../utils/findCoordenates";
import { getDrawCountry } from "../../utils/getDrawCountry";

import "leaflet/dist/leaflet.css";
import styles from "./Map.module.scss";
import BoundsComponent from "./BoundsComponent";
import { MapLogo } from "../MapLogo";

const MapHeatLayerComponent = dynamic(
  () => import("../MapHeatLayer/MapHeatLayer.Component"),
  { ssr: false }
);

const defaultProps = {
  lat: 48,
  lng: 20,
};

const outer = L.latLngBounds([
  { lat: -180, lng: -180 },
  { lat: 180, lng: 180 },
]);

const MapResult = (props: {
  zoom: any;
  heatPoints: any;
  heatType: any;
  lat: any;
  lng: any;
  placeOfLoading: string;
  placeOfUnloading: string;
}) => {
  const {
    zoom,
    heatPoints,
    heatType,
    lat,
    lng,
    placeOfLoading,
    placeOfUnloading,
  } = props;

  const position = L.latLng(lat, lng);

  const [mapParams, setMapParams] = useState({});
  const [countryBounds, setCountryBounds] = useState<Record<string, string[]>>(
    {}
  );

  const getBorders = async (
    placeOfLoading: string,
    placeOfUnloading: string
  ) => {
    const loadingPlace = findCoordinates(placeOfLoading);
    const unloadingPlace = findCoordinates(placeOfUnloading);
    const loadingShape = await getDrawCountry(placeOfLoading);
    const unLoadingShape = await getDrawCountry(placeOfUnloading);
    try {
      const reverseLoading = loadingShape.map((item) => item.reverse());
      const reverseUnloading = unLoadingShape.map((item) => item.reverse());
      setMapParams({
        ...mapParams,
        lat: loadingPlace?.latitude,
        lng: unloadingPlace?.longitude,
      });
      setCountryBounds({
        loading: reverseLoading,
        unloading: reverseUnloading,
      });
    } catch (e: any) {
      console.log("error");
    }
  };
  getBorders(placeOfLoading, placeOfUnloading);

  return (
    <>
      <Map
        key="map"
        className={styles.map}
        center={position}
        zoom={zoom}
        zoomControl={false}
        minZoom={3}
        maxZoom={12}
        useFlyTo={false}
        maxBounds={outer}
        attributionControl={false}
        duration={0.3}
        // animate
      >
        {heatPoints && (
          <MapHeatLayerComponent heatPoints={heatPoints} heatType={heatType} />
        )}

        <TileLayer
          url="https://qoobus.com/maps/basic/{z}/{x}/{y}.png"
          tileSize={512}
          zoomOffset={-1}
        />

        {/* {customMarkers
            ? customMarkers.map((CustomMarker: any, id: any) => (
                <CustomMarker key={id.toString()} />
              ))
            : null} */}

        {countryBounds &&
          Object.keys(countryBounds).map((type) => (
            <BoundsComponent
              key={type}
              positions={countryBounds[type]}
              type={type}
            />
          ))}
        <MapLogo />
      </Map>
    </>
  );
};
const Memoized = React.memo(MapResult);
export default Memoized;

// export default MapResult;
