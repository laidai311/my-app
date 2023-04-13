import '@/styles/globals.css';
import 'nprogress/nprogress.css';
import { AnimatePresence } from 'framer-motion';
import { AuthUserProvider } from '@/contexts/AuthUserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BaseLayout from '@/layouts/BaseLayout';
import nProgress from 'nprogress';
import RouteGuard from '@/components/RouteGuard';
import Router from 'next/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  nProgress.configure({
    easing: 'ease',
    speed: 500,
    showSpinner: false,
    template:
      '<div class="bar !bg-[#FC2947]" role="bar"><div class="peg !bg-[#FE6244]"></div></div>',
  });
  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    <AuthUserProvider>
      <RouteGuard>
        <AnimatePresence
          mode="wait"
          initial={true}
          onExitComplete={() => {
            if (typeof window === 'object') {
              window.scrollTo({ top: 0 });
            }
          }}
        >
          <QueryClientProvider client={queryClient}>
            <BaseLayout>{getLayout(<Component {...pageProps} />)}</BaseLayout>
          </QueryClientProvider>
        </AnimatePresence>
      </RouteGuard>
    </AuthUserProvider>
  );
}
