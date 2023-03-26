import { routes } from "@/configs/routes";
import { useAuth } from "@/contexts/AuthUserContext";
import { useEffect, useState } from "react";
import { useResizeWindow } from "@/libs/hooks";
import { useRouter } from "next/router";
import FullPageLoader from "@/components/FullPageLoader";
import Head from "next/head";

const BaseLayout = ({ children }) => {
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
            <main>{isLoading ? <FullPageLoader /> : children}</main>
        </>
    );
};

export default BaseLayout;
