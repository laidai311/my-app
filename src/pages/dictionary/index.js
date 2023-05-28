import BaseLayout from '@/layouts/BaseLayout';
import React from 'react';
import NextLink from 'next/link';
import { Anchor, Button } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function DictionaryPage() {
    const router = useRouter();
    return (
        <div>
            <Button onClick={() => router.back()}>Back</Button>
            DictionaryPage
            <NextLink
                href="/dictionary/add"
                passHref
                style={{ textDecoration: 'none' }}
            >
                <Anchor>ADD</Anchor>
            </NextLink>
        </div>
    );
}

DictionaryPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
