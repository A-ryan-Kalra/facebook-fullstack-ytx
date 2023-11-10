import Layout from "@/components/Layout";
import RegisterModal from "@/components/modals/RegisterModal";
import "@/styles/globals.css";
import { Provider } from "jotai";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <RegisterModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
