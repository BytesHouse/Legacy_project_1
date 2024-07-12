import * as L from "leaflet";
import React from "react";
import dynamic from "next/dynamic";
import { Map, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import styles from "./Map.module.scss";
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

/**
 *
 * @param {object} props
 * @param {number} props.zoom
 * @param {number} [props.lat]
 * @param {number} [props.lng]
 * @param {Array} [props.heatPoints]
 * @param {string} [props.heatType]
 * @param {Array} [props.customMarkers]
 */

const MapComponent = (props: any) => {
  const { zoom, heatPoints, heatType, customMarkers, lat, lng } = props;

  const position = L.latLng(lat, lng);

  return (
    <>
      {position && (
        <Map
          key="map"
          className={styles.map}
          center={position}
          zoom={zoom}
          minZoom={3}
          maxZoom={12}
          useFlyTo={false}
          maxBounds={outer}
          zoomControl={false}
          attributionControl={false}
          duration={0.3}
          // animate
        >
          {heatPoints && (
            <MapHeatLayerComponent
              heatPoints={heatPoints}
              heatType={heatType}
            />
          )}
          <TileLayer
            url="https://qoobus.com/maps/basic/{z}/{x}/{y}.png"
            tileSize={512}
            zoomOffset={-1}
          />

          {customMarkers
            ? customMarkers.map((CustomMarker: any, id: any) => (
                <CustomMarker key={id.toString()} />
              ))
            : null}
          <MapLogo />
        </Map>
      )}
    </>
  );
};

MapComponent.defaultProps = defaultProps;

export default MapComponent;
