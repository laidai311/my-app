import React from 'react';
import NextLink from 'next/link';
import { Anchor } from '@mantine/core';
import BaseLayout from '@/layouts/BaseLayout';

export default function DataAdminPage() {
    return (
        <div>
            DataAdminPage
            <NextLink href="/admin/data/parts-of-speech" passHref>
                <Anchor>Parts Of Speech</Anchor>
            </NextLink>
        </div>
    );
}

DataAdminPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
