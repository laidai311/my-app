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
                    <Button>HTML</Button>
                    <Button>PUG</Button>
                    <Button>CSS</Button>
                    <Button>SCSS</Button>
                    <Button>Javascript</Button>
                    <Button>Typescript</Button>
                    <Button>ReactJs</Button>
                    <Button>NextJs</Button>
                    <Button>SolidJS</Button>
                </Group>
            </Paper>
        </>
    );
}

Page.getLayout = (page) => <Layout>{page}</Layout>;
