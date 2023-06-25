import React from 'react';
import NextLink from 'next/link';
import { Button, Flex, Group, Paper } from '@mantine/core';
import { BackPageButton, Layout } from '@/components';
import Head from 'next/head';

export default function Page() {
    return (
        <>
            <Head>
                <title>Admin</title>
            </Head>

            <Paper my={24}>
                <Flex justify="space-between" mb={24}>
                    <BackPageButton />
                </Flex>
                <Group>
                    <NextLink href="/admin/dictionary" passHref>
                        <Button>Dictionary</Button>
                    </NextLink>
                </Group>
            </Paper>
        </>
    );
}

Page.getLayout = (page) => <Layout>{page}</Layout>;
