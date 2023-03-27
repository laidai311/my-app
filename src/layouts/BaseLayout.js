import { useResizeWindow } from "@/libs/hooks";
import Head from "next/head";

const BaseLayout = ({ children }) => {
    useResizeWindow();

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
            <main>{children}</main>
        </>
    );
};

export default BaseLayout;
