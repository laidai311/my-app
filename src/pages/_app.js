import "nprogress/nprogress.css";
import "@/styles/globals.css";
import nProgress from "nprogress";
import Router from "next/router";
import { AnimatePresence } from "framer-motion";
import BaseLayout from "@/layouts/BaseLayout";

export default function App({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    Router.events.on("routeChangeStart", nProgress.start);
    Router.events.on("routeChangeError", nProgress.done);
    Router.events.on("routeChangeComplete", nProgress.done);

    return (
        <AnimatePresence
            mode="wait"
            initial={true}
            onExitComplete={() => {
                if (typeof window === "object") {
                    window.scrollTo({ top: 0 });
                }
            }}
        >
            <BaseLayout>{getLayout(<Component {...pageProps} />)}</BaseLayout>
        </AnimatePresence>
    );
}
