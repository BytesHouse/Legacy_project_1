import dynamic from 'next/dynamic';
import React from 'react';

const HeatmapLayer = dynamic(
  // @ts-ignore
  () => import('react-leaflet-heatmap-layer'),
  { ssr: false }
);

const HEAT_TYPE = {
  IMPORT: 'import',
  EXPORT: 'export',
};

/**
 *
 * @param {object} props
 * @param {any} props.heatPoints
 * @param {string} props.heatType
 */
const MapHeatLayer = (props: any) => {
  const { heatPoints, heatType } = props;

  function extractLongitude(m: any) {
    return m[1];
  }

  function extractLatitude([latitude]: any) {
    return latitude;
  }

  function extractIntensity(m: any) {
    return parseFloat(m[2]);
  }

  function getGradient() {
    switch (heatType) {
      case HEAT_TYPE.IMPORT:
        return {
          0.5: '#55b555',
          0.7: '#4bb94b',
          0.8: 'yellow',
          1: 'red',
        };
      case HEAT_TYPE.EXPORT:
        return {
          0.5: '#304ffe',
          0.7: '#00e5ff',
          0.8: 'yellow',
          1.0: 'red',
        };
      default:
        break;
    }
  }

  return (
    <HeatmapLayer
      // @ts-ignore
      points={heatPoints}
      longitudeExtractor={extractLongitude}
      latitudeExtractor={extractLatitude}
      intensityExtractor={extractIntensity}
      gradient={getGradient()}
    />
  );
}

export default MapHeatLayer;