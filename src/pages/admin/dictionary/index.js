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
                <title>Dictionary</title>
            </Head>

            <Paper my={24}>
                <Flex justify="space-between" mb={24}>
                    <BackPageButton />
                </Flex>

                <Group>
                    <NextLink href="dictionary/parts-of-speech" passHref>
                        <Button>Parts Of Speech</Button>
                    </NextLink>
                    <NextLink href="dictionary/words" passHref>
                        <Button>Words</Button>
                    </NextLink>
                </Group>
            </Paper>
        </>
    );
}

Page.getLayout = (page) => <Layout>{page}</Layout>;
