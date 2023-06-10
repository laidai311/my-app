import React from 'react';
import NextLink from 'next/link';
import { Anchor } from '@mantine/core';
import BaseLayout from '@/layouts/BaseLayout';
import Editor from '@/components/Editor';

export default function AdminApp() {
    return (
        <div>
            AdminPage
            <NextLink href="/admin/data" passHref>
                <Anchor>Data</Anchor>
            </NextLink>
            <Editor />
        </div>
    );
}

AdminApp.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
