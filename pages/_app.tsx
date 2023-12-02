import Layout from "@/components/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import "@/styles/globals.css";
import { Provider } from "jotai";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import EditModal from "@/components/modals/EditModal";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider>
        <RegisterModal />
        <LoginModal />
        <EditModal />
        <Toaster />
        <Layout>
          <Head>
            <title>MyHub</title>
          </Head>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
