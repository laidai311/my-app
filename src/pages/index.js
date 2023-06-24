import Head from 'next/head';
import {
    Box,
    Center,
    Code,
    Group,
    Stack,
    ThemeIcon,
    Title,
} from '@mantine/core';
import { IconBook2 } from '@tabler/icons-react';
import React from 'react';
import NextLink from 'next/link';
import { SearchInput } from '@/components';
import { Layout } from '@/components';

export default function Page() {
    return (
        <>
            <Head>
                <title>Dictionary - Da!</title>
            </Head>
            <Center h={'calc(var(--window-height) - 60px)'} px={24} pb={230}>
                <Stack spacing={50}>
                    <Center>
                        <Group>
                            <ThemeIcon>
                                <IconBook2 />
                            </ThemeIcon>
                            <Title sx={{ userSelect: 'none' }}>
                                Dictionary
                            </Title>
                            <Code sx={{ userSelect: 'none' }} size="xs">
                                Da!
                            </Code>
                        </Group>
                    </Center>
                    <SearchInput
                        placeholder="Search"
                        radius="xl"
                        size="lg"
                        buttonProps={{ radius: 'xl', size: 'lg' }}
                    />
                </Stack>
            </Center>
            <Box
                sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
                py={12}
            >
                <Center>
                    <NextLink
                        passHref
                        target="_blank"
                        href="https://github.com/laidaid"
                    >
                        <Code color="teal">Production by Da!</Code>
                    </NextLink>
                </Center>
            </Box>
        </>
    );
}

Page.getLayout = (page) => <Layout>{page}</Layout>;
