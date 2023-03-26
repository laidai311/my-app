import "@/styles/globals.css";
import "nprogress/nprogress.css";
import { AnimatePresence } from "framer-motion";
import { AuthUserProvider } from "@/contexts/AuthUserContext";
import BaseLayout from "@/layouts/BaseLayout";
import nProgress from "nprogress";
import Router from "next/router";

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
            <AuthUserProvider>
                <BaseLayout>
                    {getLayout(<Component {...pageProps} />)}
                </BaseLayout>
            </AuthUserProvider>
        </AnimatePresence>
    );
}
