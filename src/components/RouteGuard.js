import { routes } from '@/configs/routes';
import { useAuth } from './Firebase';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import FullPageLoader from './FullPageLoader';

const RouteGuard = ({ children }) => {
  const { user, isLoading, status } = useAuth();
  const [isReady, setIsReady] = useState();
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/sign-in');
  }, [router]);

  const isPublicPath = useMemo(
    () => routes.public.some((route) => router.asPath.startsWith(route)),
    [router]
  );

  useEffect(() => {
    if (!(isLoading || isPublicPath || user || status === 'no-authenticated')) {
      router.push('/sign-in');
    } else {
      if (!isLoading) {
        setIsReady(true);
      }
    }
  }, [isPublicPath, isLoading]);

  return isReady ? children : <FullPageLoader />;
};

export default RouteGuard;
