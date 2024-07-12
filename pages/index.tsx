import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";

import { getRandomImage } from "../utils/getRandomImage";
import { GetStaticPropsContext } from "next";
import getServerSideTranslations from "../utils/getServerSideTranslations";
import { useCallback, useState, useEffect } from "react";

const LandingMenu = dynamic(
  () => import("../components/LandingMenu/LandingMenu")
);

export default function Home() {
  const [image, setImage] = useState<any>();
  const toggleRerender = useCallback(() => {
    const { src, alt, imageBlur } = getRandomImage();
    setImage({ src, alt, imageBlur });
  }, []);
  useEffect(() => {
    toggleRerender();
  }, []);

  return (
    <>
      <Head>
        <title>Qoobus</title>
        <meta name="description" />
      </Head>
      <main>
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            // layout="responsive"
            fill
            priority
            placeholder="blur"
            blurDataURL={image.imageBlur}
            className="absolute h-full w-full object-cover -z-10"
          />
        ) : null}
        <LandingMenu />
      </main>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await getServerSideTranslations(locale)),
    },
  };
}
