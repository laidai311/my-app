import React from 'react';
import NextLink from 'next/link';
import {
    ActionIcon,
    Button,
    Container,
    Flex,
    Group,
    Paper,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
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
                    <Group>
                        <BackPageButton />
                        <NextLink href="/admin/data" passHref>
                            <Button>Data</Button>
                        </NextLink>
                    </Group>
                    <ActionIcon size="lg">
                        <IconPlus size="1rem" />
                    </ActionIcon>
                </Flex>
            </Paper>
        </>
    );
}

Page.getLayout = (page) => <Layout>{page}</Layout>;
