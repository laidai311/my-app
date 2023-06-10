import PartsOfSpeechAdminPage from '@/contents/Admin/Parts-of-speech';
import BaseLayout from '@/layouts/BaseLayout';
import Head from 'next/head';
import React from 'react';

export default function PartsOfSpeechAdminApp() {
    return (
        <>
            <Head>
                <title>Parts of speech</title>
            </Head>
            <PartsOfSpeechAdminPage />
        </>
    );
}

PartsOfSpeechAdminApp.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
