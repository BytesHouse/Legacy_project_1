import moment from 'moment';
import { useEffect, useState } from 'react';

import styles from './MapHint.module.scss';
import Image from 'next/image';

const cities = require('./cities.json');
const tones = [
  '1t',
  '2t',
  '3t',
  '4t',
  '5t',
  '6t',
  '7t',
  '8t',
  '9t',
  '10t',
  '11t',
  '12t',
  '13t',
  '14t',
  '15t',
  '16t',
  '17t',
  '18t',
  '19t',
  '20t',
  '21t',
  '22t',
  '23t',
  '24t',
];
const trucks = [
  'BOX',
  'COIL_WELL',
  'CONTAINER',
  'JUMBO_TRUCK',
  'MEGA',
  'REFRIGERATOR_TRUCK',
  'TILT',
];

/**
 *
 * @param {object} props
 * @param {boolean} [props.dark]
 */
const MapHint = ({ dark }: any) => {

  function getTwoPoints() {
    const list = cities;
    const first = list[Math.floor(Math.random() * list.length)];
    list.splice(list.indexOf(first), 0);
    const second = list[Math.floor(Math.random() * list.length)];
    const weight = tones[Math.floor(Math.random() * tones.length)];
    const truck = trucks[Math.floor(Math.random() * trucks.length)];
    const { lat, lng, city, iso } = first;
    return {
      lat,
      lng,
      loading: city,
      unloading: second.city,
      loadingIso: iso,
      unloadingIso: second.iso,
      item: first,
      weight: weight,
      truck: truck,
    };
  }

  let [point, setPoints] = useState<any>({ loadingIso: '', unloadingIso: '' });

  const period = moment().hour();

  function setPeriod() {
    if (period < 8) return 20000;
    if (period >= 8 && period <= 18) return 1000;
    if (period > 18 && period <= 21) return 5000;
    if (period > 21) return 10000;
  }
  useEffect(() => {
    let interval: any = null;
    setPoints(getTwoPoints())
    interval = setInterval(() => setPoints(getTwoPoints()), setPeriod());
    return () => clearInterval(interval);
  }, []);

  function getPinPosition(item: any) {
    const x = item.lng - 6;
    const xy = x < -180 ? x + 360 : x;
    return {
      top: item.lat * (-100 / 180) + 50 + '%',
      left: xy * (100 / 360) + 50 + '%',
    };
  }

  const handleClick = () => {
    window.location.replace("https://qoobus.com/search-load")
  }

  return (
    <div className={styles.maphint}>
      <figure className={styles.worldmap}>
        <Image
          className={styles.map}
          src={dark ? '/images/map_world_dark.svg' : '/images/map_world.svg'}
          alt="map world"
          width={1078} height={510}
        />
        <div
          className={styles.maplocation}
          key={point.loadingIso}
          style={{
            ...getPinPosition(point),
          }}
        >
          <div className={styles.locationbubble} onClick={handleClick}>
            <div className={styles.locationname}>
              <div className={styles.first}>
                <span className={`fflag ff-sm ${point.loadingIso}`} />
                {point.loading}, {point.loadingIso}
              </div>
              <div className={styles.second}> {point.weight}</div>
            </div>

            <div className={styles.locationname}>
              <div className={styles.first}>
                <span className={`fflag ff-sm ${point.unloadingIso}`} />
                {point.unloading}, {point.unloadingIso}
              </div>
              <div className={styles.second}>
                {point.truck && (
                  <img
                    src={`/images/${point.truck}.svg`}
                    className={styles.truck}
                    alt="truck"
                    width={42} height={12}
                  />
                )}
              </div>
            </div>
          </div>
          <Image src="/images/pin.svg" className={styles.svgicon} alt="Pin" width={30} height={30} />
        </div>
      </figure>
    </div>
  );
};
export default MapHint;
