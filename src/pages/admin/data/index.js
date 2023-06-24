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
import { BackPageButton, Layout } from '@/components';
import { IconPlus } from '@tabler/icons-react';
import Head from 'next/head';

export default function Page() {
    return (
        <>
            <Head>
                <title>Data</title>
            </Head>
            <Paper my={24}>
                <Flex justify="space-between" mb={24}>
                    <Group>
                        <BackPageButton />
                        <NextLink href="data/parts-of-speech" passHref>
                            <Button>Parts Of Speech</Button>
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
