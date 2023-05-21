import { routes } from '@/configs/routes';
import { useAuth } from './AuthFirebase';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { LoadingOverlay } from '@mantine/core';

const RouteGuard = ({ children }) => {
    const { data: user, status } = useAuth();
    const [isReady, setIsReady] = useState();
    const router = useRouter();

    useEffect(() => {
        router.prefetch('/sign-in');
    }, []);

    const isPublicPath = useMemo(
        () => routes.public.some((route) => router.asPath.startsWith(route)),
        [router]
    );

    useEffect(() => {
        if (status === 'loading') return;

        if (isPublicPath || user) {
            setIsReady(true);
        } else {
            router.push('/sign-in');
        }
    }, [isPublicPath, user, status]);

    return isReady ? (
        children
    ) : (
        <LoadingOverlay visible={true} overlayBlur={2} />
    );
};

export default RouteGuard;
