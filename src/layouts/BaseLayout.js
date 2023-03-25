import { routes } from "@/configs/routes";
import { SpinnerWhiteIcon } from "@/components/ProviderIcon";
import { useEffect, useState } from "react";
import { useResizeWindow } from "@/libs/hooks";
import { useRouter } from "next/router";
import { useUserStore } from "@/libs/store";
import auth from "@/libs/auth";
import Head from "next/head";

const BaseLayout = ({ children }) => {
    const [isReady, setIsReady] = useState(false);
    const { user, setUser } = useUserStore();
    const router = useRouter();
    useResizeWindow();

    const isPublic = routes.public.some((route) => {
        if (router.asPath.split("?")[0].search(route) >= 0) {
            return true;
        }
    });

    useEffect(() => {
        router.prefetch("/sign-in");
    }, [router]);

    useEffect(() => {
        const unsubscribe = async () => {
            try {
                setIsReady(false);

                const res = await auth.onChanged();
                const user = await auth.formatUser(res);

                setUser(user);
                setIsReady(true);
            } catch (_error) {
                if (isPublic) {
                    setIsReady(true);
                } else {
                    router.push("/sign-in");
                }
            }
        };

        return () => {
            if (!user) {
                unsubscribe();
            } else {
                setIsReady(true);
            }
        };
    }, [user]);

    return (
        <>
            <Head>
                <title>Dai Lai 99 66</title>
                <meta name="description" content="Dailai9966" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {isReady ? (
                    children
                ) : (
                    <div className="flex justify-center items-center min-h-[var(--window-inner-height)] bg-primary-focus">
                        <SpinnerWhiteIcon className="animate-spin-steps-12 w-10 h-10" />
                    </div>
                )}
            </main>
        </>
    );
};

export default BaseLayout;
