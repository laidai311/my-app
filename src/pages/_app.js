import { useWindowHeight } from '@/libs/hooks';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import React from 'react';
import { Notifications } from '@mantine/notifications';
import { AuthProvider } from '@/components/AuthFirebase';
import RouteGuard from '@/components/RouteGuard';
import { setCookie, getCookie } from 'cookies-next';
import NextApp from 'next/app';
import { RouterTransition } from '@/components/RouterTransition';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: true,
            retry: 1,
        },
    },
});

export default function App(props) {
    const { Component, pageProps } = props;
    const getLayout = Component.getLayout || ((page) => page);

    const [colorScheme, setColorScheme] = React.useState(props.colorScheme);
    const [isReady, setIsReady] = React.useState();

    useWindowHeight();
    React.useEffect(() => {
        setIsReady(true);
    }, []);

    const toggleColorScheme = (value) => {
        const nextColorScheme =
            value || (colorScheme === 'dark' ? 'light' : 'dark');
        setColorScheme(nextColorScheme);
        setCookie('mantine-color-scheme', nextColorScheme, {
            maxAge: 60 * 60 * 24 * 30,
        });
    };

    return (
        <>
            <Head>
                <title>DaiLai 9966</title>
                <meta name="description" content="Dailai9966" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        primaryColor: 'teal',
                        colorScheme,
                    }}
                >
                    <ModalsProvider>
                        <QueryClientProvider client={queryClient}>
                            <AuthProvider>
                                <RouteGuard>
                                    {isReady
                                        ? getLayout(
                                              <Component {...pageProps} />
                                          )
                                        : null}
                                    <RouterTransition />
                                    <Notifications />
                                </RouteGuard>
                            </AuthProvider>
                        </QueryClientProvider>
                    </ModalsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </>
    );
}

App.getInitialProps = async (appContext) => {
    const appProps = await NextApp.getInitialProps(appContext);
    return {
        ...appProps,
        colorScheme:
            getCookie('mantine-color-scheme', appContext.ctx) || 'light',
    };
};
