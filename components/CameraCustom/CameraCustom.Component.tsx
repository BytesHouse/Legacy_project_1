import React, { useEffect, useState } from "react";
// @ts-ignore
import ReactPlayer from "react-player";

import styles from "./CameraCustom.module.scss";

let interval: string | number | NodeJS.Timeout | undefined;

/**
 *
 * @param {object} props
 * @param {string} props.source
 * @param {boolean} props.video
 * @param {'video' | 'iframe'} [props.type]
 */
const CameraCustom = (props: {
  source: string;
  video: boolean;
  type?: "video" | "iframe";
}) => {
  const { video, type } = props;
  const [source, setSource] = useState(props?.source);
  useEffect(() => {
    if (video) return;
    interval = setInterval(() => {
      setSource(`${source}${source.includes("?") ? "&" : "?"}${Date.now()}`);
    }, 1 * 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const isIframe = type === "iframe";

  return (
    <div className={styles.cameracustom}>
      {video ? (
        isIframe ? (
          <iframe allowFullScreen allow="autoplay" src={source} />
        ) : (
          <ReactPlayer
            width="100%"
            height="100%"
            url={props.source}
            controls
            playing
            muted
            volume={1}
          />
        )
      ) : (
        <img src={source} alt="Camera" width={384} height={486} />
      )}
    </div>
  );
};

export default CameraCustom;
