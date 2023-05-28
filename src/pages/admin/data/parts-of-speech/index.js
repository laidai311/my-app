import Parts_of_speechAdminApp from '@/contents/Admin/Parts-of-speech';
import BaseLayout from '@/layouts/BaseLayout';
import Head from 'next/head';
import React from 'react';

export default function Parts_of_speechPage() {
    return (
        <>
            <Head>
                <title>Parts_of_speechPage</title>
            </Head>
            <Parts_of_speechAdminApp />
        </>
    );
}

Parts_of_speechPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
