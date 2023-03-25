import Head from "next/head";
import SignInApp from "@/contents/SignIn";

export default function SignInPage() {
    return (
        <>
            <Head>
                <title>Sign in</title>
            </Head>
            <SignInApp />
        </>
    );
}

// SignInPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
