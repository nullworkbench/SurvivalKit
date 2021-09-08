import "tailwindcss/tailwind.css";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

import GlobalFooter from "@/components/GlobalFooter";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GlobalFooter />
    </>
  );
}
export default MyApp;
