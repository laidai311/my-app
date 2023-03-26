import { routes } from "@/configs/routes";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useResizeWindow } from "@/libs/hooks";
import { useRouter } from "next/router";
import FullPageLoader from "@/components/FullPageLoader";
import Head from "next/head";

const BaseLayout = ({ children }) => {
    const [isReady, setIsReady] = useState(false);
    const { user, isLoading } = useAuth();
    const router = useRouter();
    useResizeWindow();

    useEffect(() => {
        router.prefetch("/sign-in");
    }, [router]);

    useEffect(() => {
        if (!isLoading) {
            const isPublic = routes.public.some((route) => {
                if (router.asPath.split("?")[0].search(route) >= 0) {
                    return true;
                }
            });

            if (!isPublic && !user) {
                router.push("/sign-in");
            } else {
                setIsReady(true);
            }
        }
    }, [user, isLoading]);

    return (
        <>
            <Head>
                <title>DaiLai 9966</title>
                <meta name="description" content="Dailai9966" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>{isLoading && !isReady ? <FullPageLoader /> : children}</main>
        </>
    );
};

export default BaseLayout;
