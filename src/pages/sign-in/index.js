import Head from 'next/head';
import { AuthenticationForm } from '../../contents/SignIn/AuthenticationForm';
import { Center, Container } from '@mantine/core';

export default function SignInPage() {
    return (
        <>
            <Head>
                <title>Sign in</title>
            </Head>
            <Container size="sm" px="xs">
                <Center sx={{ position: 'fixed', inset: 0 }}>
                    <AuthenticationForm />
                </Center>
            </Container>
        </>
    );
}

// SignInPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
