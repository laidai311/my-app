import "@/styles/globals.css";
import "nprogress/nprogress.css";
import { AnimatePresence } from "framer-motion";
import { AuthUserProvider } from "@/contexts/AuthUserContext";
import BaseLayout from "@/layouts/BaseLayout";
import nProgress from "nprogress";
import Router from "next/router";
import RouteGuard from "@/components/RouteGuard";

export default function App({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    nProgress.configure({
        easing: "ease",
        speed: 500,
        showSpinner: false,
        template:
            '<div class="bar !bg-[#FC2947]" role="bar"><div class="peg !bg-[#FE6244]"></div></div>',
    });
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
                <RouteGuard>
                    <BaseLayout>
                        {getLayout(<Component {...pageProps} />)}
                    </BaseLayout>
                </RouteGuard>
            </AuthUserProvider>
        </AnimatePresence>
    );
}
