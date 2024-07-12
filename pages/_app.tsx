import "../styles/globals.css";
import "../styles/freakflags.css";

import type { AppProps } from "next/app";
import { Lato } from "@next/font/google";

import "moment/locale/ru";
import "moment/locale/ro";
import "moment/locale/cs";
import "moment/locale/uk";
import { RecoilRoot } from "recoil";
import { appWithTranslation } from "next-i18next";
import LoginModal from "../components/Modal";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div className={`${lato.variable} font-sans`}>
        <LoginModal />
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}

export default appWithTranslation(App);
