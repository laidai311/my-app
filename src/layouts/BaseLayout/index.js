import {
    ActionIcon,
    Box,
    Button,
    Group,
    Header,
    Tooltip,
    useMantineColorScheme,
} from '@mantine/core';
import React from 'react';
import Head from 'next/head';
import {
    IconBrandGithub,
    IconBrightnessUp,
    IconMoon,
} from '@tabler/icons-react';
import UserMenuDropdown from '../comps/UserMenuDropdown';
import NextLink from 'next/link';
import { useAuth } from '@/components/AuthFirebase';

export default function BaseLayout({ children }) {
    const { data: user } = useAuth();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <>
            <Head>
                <title>DaiLai 9966</title>
                <meta name="description" content="Dailai9966" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box pt={60}>
                <Header height={60} px="md" fixed>
                    <Group position="apart" sx={{ height: '100%' }}>
                        {user ? (
                            <UserMenuDropdown />
                        ) : (
                            <NextLink passHref href="/sign-in">
                                <Button size="xs">Log in</Button>
                            </NextLink>
                        )}

                        <Group spacing={7}>
                            <NextLink
                                passHref
                                target="_blank"
                                href="https://github.com/laidaid/my-app"
                            >
                                <ActionIcon size="lg" radius="xl">
                                    <IconBrandGithub />
                                </ActionIcon>
                            </NextLink>
                            <Tooltip
                                position="bottom"
                                label={
                                    colorScheme === 'dark'
                                        ? 'Light mode'
                                        : 'Dark mode'
                                }
                            >
                                <ActionIcon
                                    size="lg"
                                    radius="xl"
                                    onClick={() => toggleColorScheme()}
                                >
                                    {colorScheme === 'dark' ? (
                                        <IconBrightnessUp />
                                    ) : (
                                        <IconMoon />
                                    )}
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    </Group>
                </Header>

                <Box component="main">{children}</Box>
            </Box>
        </>
    );
}
