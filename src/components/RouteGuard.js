import { routes } from "@/configs/routes";
import { useAuth } from "@/contexts/AuthUserContext";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import FullPageLoader from "./FullPageLoader";

const RouteGuard = ({ children }) => {
    const { authUser, isLoading } = useAuth();
    const [isReady, setIsReady] = useState();
    const router = useRouter();

    useEffect(() => {
        router.prefetch("/sign-in");
    }, [router]);

    const isPublic = useMemo(
        () =>
            routes.public.some(
                (route) => router.asPath.split("?")[0].search(route) >= 0
            ),
        [router]
    );

    useEffect(() => {
        if (!(isLoading || isPublic || authUser)) {
            router.push("/sign-in");
        } else {
            if (!isLoading) {
                setIsReady(true);
            }
        }
    }, [isPublic, isLoading]);

    return isReady ? children : <FullPageLoader />;
};

export default RouteGuard;
